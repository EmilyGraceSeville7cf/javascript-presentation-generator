/**
 * @param {Section} section
 */
function isEmptySection(section) {
  return section.questions.filter(question => question.show !== false).length === 0
}

/**
 * @returns {Config}
 */
function mergeDefaultConfigWithUserPreferences() {
  const configName = "generate presentation.json"
  let iterator = DriveApp.getFilesByName(configName)
  if (!iterator.hasNext())
    throw new Error(`'${configName}' config doesn't exist`)

  const configContent = JSON.parse(iterator.next().getBlob().getDataAsString())

  return mergeDeep(defaultConfig, configContent)
}

/**
 * @param {Config} config
 */
function throwIfConfigIsInvalid(config) {
  const result = JSONSchema.validate(schema, config)
  if (!result.valid)
    throw new Error(`Config is invalid: ${result.errors.join(", ")}`)

  for (const section of config.sections)
    for (const question of section.questions) {
      switch (question.type) {
        case "fill-placeholder":
          if (question.options !== undefined)
            throwMoreThanOneAnswerError(question.question)
          if (typeof question.answer !== "string")
            throwTypeMismatch(question.question, "string")
          if (!/\{\{.+\}\}/.test(question.question))
            throw new Error(`Question '${question.question}' doesn't contain a placeholder denoted as double curly braces: {{placeholder}}`)
          break

        case "understand-text":
          if (question.options !== undefined)
            throwMoreThanOneAnswerError(question.question)
          if (typeof question.answer !== "string")
            throwTypeMismatch(question.question, "string")
          break

        case "understand-picture":
          if (question.options !== undefined)
            throwMoreThanOneAnswerError(question.question)
          if (typeof question.answer !== "string")
            throwTypeMismatch(question.question, "string")
          break

        case "choose-answer":
          if (question.options === undefined)
            throw new Error(`Question '${question.question}' doesn't contain possible answers`)
          if (typeof question.answer !== "number")
            throwTypeMismatch(question.question, "number")
          if (question.answer > question.options.length)
            throw new Error(`Question '${question.question}' doesn't contain a ${question.answer} answer`)
          break
      }
    }
}

/**
 * @param {Font} style
 * @param {GoogleAppsScript.Slides.Shape} textBox
 */
function setFont(style, textBox) {
  textBox.getText()
    .getTextStyle()
    .setFontSize(style.font.size)
    .setForegroundColor(style.color.red, style.color.green, style.color.blue)
    .setBold(style.font.bold)
    .setItalic(style.font.italic)
    .setUnderline(style.font.underline)
}

/**
 * @param {GoogleAppsScript.Slides.ContentAlignment} contentAlignment
 * @param {GoogleAppsScript.Slides.ParagraphAlignment} paragraphAlignment
 * @param {GoogleAppsScript.Slides.Shape} textBox
 */
function setAlignment(contentAlignment, paragraphAlignment, textBox) {
  textBox.setContentAlignment(contentAlignment)
  textBox.getText()
    .getParagraphStyle()
    .setParagraphAlignment(paragraphAlignment)
}

/**
 * @param {Background} background
 * @param {GoogleAppsScript.Slides.Slide} slide
 */
function setBackground(background, slide) {
  const slideBackground = slide.getBackground()
  if (typeof background === "string")
    slideBackground.setPictureFill(background)
  else
    slideBackground.setSolidFill(background.red, background.green, background.blue)
}


/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {string} text
 */
function addTitleToTitleSlide(presentation, slide, text) {
  const style = config.style.titleSlide
  const title = slide.insertTextBox(text)
    .setWidth(presentation.getPageWidth() * style.size.width)
    .setHeight(presentation.getPageHeight() * style.size.height)
    .alignOnPage(SlidesApp.AlignmentPosition.CENTER)

  setFont(style, title)
  setAlignment(SlidesApp.ContentAlignment.MIDDLE, SlidesApp.ParagraphAlignment.CENTER, title)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {string} text
 * @param {boolean} centerVertically
 */
function addTitleToQuestionSlide(presentation, slide, text, centerVertically = false) {
  const style = config.style.questionSlide.title
  const title = slide.insertTextBox(text)
    .setWidth(presentation.getPageWidth() * style.size.width)
    .setHeight(presentation.getPageHeight() * style.size.height)
    .alignOnPage(SlidesApp.AlignmentPosition.CENTER)

  if (!centerVertically)
    title.setTop(presentation.getPageHeight() * style.displacementFromTheTop)

  setFont(style, title)
  setAlignment(SlidesApp.ContentAlignment.MIDDLE, SlidesApp.ParagraphAlignment.CENTER, title)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {string} url
 */
function addImageToQuestionSlide(presentation, slide, url) {
  const style = config.style.questionSlide.image
  const image = slide.insertImage(url)

  let boundingBoxWidth = presentation.getPageWidth() * style.size.width
  let boundingBoxHeight = presentation.getPageHeight() * style.size.height

  let width = boundingBoxWidth
  let height = boundingBoxHeight

  if (style.mode !== "full") {
    let ratio = 1

    switch (style.mode) {
      case "width":
        ratio = boundingBoxWidth / image.getWidth()
        break
      case "height":
        ratio = boundingBoxHeight / image.getHeight()
        break
      case "auto":
        if (image.getWidth() > image.getHeight())
          ratio = boundingBoxWidth / image.getWidth()
        else
          ratio = boundingBoxHeight / image.getHeight()
        break
    }

    width = image.getWidth() * ratio
    height = image.getHeight() * ratio
  }

  image.setWidth(width)
    .setHeight(height)
    .sendToBack()

  image.alignOnPage(SlidesApp.AlignmentPosition.CENTER)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {Array.<string>} options
 * @param {number} rightOptionNumber
 * @param {boolean} highlightOptions
 */
function addOptionsToQuestionSlide(presentation, slide, options, rightOptionNumber = 0, highlightOptions = false) {
  const style = config.style.questionSlide.options

  const leftCorner = presentation.getPageWidth() / 2 - presentation.getPageWidth() * style.size.width / 2
  const topCorner = presentation.getPageHeight() / 2 - presentation.getPageHeight() * style.size.height / 2

  let height = presentation.getPageHeight() * style.size.height / options.length
  if (typeof style.relativeHeight !== "undefined")
    height = presentation.getPageHeight() * style.relativeHeight

  for (let i = 0; i < options.length; i++) {
    const option = slide.insertTextBox(options[i],
      leftCorner,
      topCorner + height * i,
      presentation.getPageWidth() * style.size.width,
      height)

    let fontStyle = style.other
    if (i === rightOptionNumber - 1)
      fontStyle = style.right

    if (highlightOptions) {
      let prefix = style.right.prefix
      if (i !== rightOptionNumber - 1)
        prefix = style.other.prefix

      if (prefix.length > 0)
        option.getText().setText(`${prefix} ${option.getText().asString()}`)
    }

    setFont(fontStyle, option)

    option.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE)
      .getText()
      .getParagraphStyle()
      .setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER)
  }
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {number} value
 */
function tryAddProgressBarToTitleSlide(presentation, slide, value) {
  const style = config.style.titleSlide.progressBar

  if (!style.show)
    return

  const height = presentation.getPageHeight() * style.relativeHeight

  const background = slide.insertShape(SlidesApp.ShapeType.RECTANGLE,
    0,
    presentation.getPageHeight() - height,
    presentation.getPageWidth(),
    height)

  const indicator = slide.insertShape(SlidesApp.ShapeType.RECTANGLE,
    0,
    presentation.getPageHeight() - height,
    presentation.getPageWidth() * value,
    height)

  background.getBorder().setTransparent()
  background.getFill()
    .setSolidFill(style.background.red, style.background.green, style.background.blue)

  indicator.getBorder().setTransparent()
  indicator.getFill()
    .setSolidFill(style.foreground.red, style.foreground.green, style.foreground.blue)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {number} value
 */
function tryAddProgressBarToQuestionSlide(presentation, slide, value) {
  const style = config.style.questionSlide.progressBar

  if (!style.show)
    return

  const height = presentation.getPageHeight() * style.relativeHeight

  const background = slide.insertShape(SlidesApp.ShapeType.RECTANGLE,
    0,
    presentation.getPageHeight() - height,
    presentation.getPageWidth(),
    height)

  const indicator = slide.insertShape(SlidesApp.ShapeType.RECTANGLE,
    0,
    presentation.getPageHeight() - height,
    presentation.getPageWidth() * value,
    height)

  background.getBorder().setTransparent()
  background.getFill()
    .setSolidFill(style.background.red, style.background.green, style.background.blue)

  indicator.getBorder().setTransparent()
  indicator.getFill()
    .setSolidFill(style.foreground.red, style.foreground.green, style.foreground.blue)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Question} question
 * @param {number} value
 */
function addFillPlaceholderQuestion(presentation, question, value) {
  if (!/\{\{.+\}\}/.test(question.question))
    throw new Error(`Question '${question.question}' doesn't contain a placeholder denoted as double curly braces: {{placeholder}}`)

  const background = config.style.questionSlide.background
  const firstSlide = presentation.appendSlide()
  addTitleToQuestionSlide(presentation, firstSlide, question.question, true)
  setBackground(background, firstSlide)
  tryAddProgressBarToQuestionSlide(presentation, firstSlide, value)

  const secondSlide = presentation.appendSlide()
  addTitleToQuestionSlide(presentation, secondSlide, question.question.replace(/\{\{.+\}\}/, question.answer), true)
  setBackground(background, secondSlide)
  tryAddProgressBarToQuestionSlide(presentation, secondSlide, value)

  console.log(`Question '${question.question}' with a placeholder has been created`)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Question} question
 * @param {number} value
 */
function addUnderstandTextQuestion(presentation, question, value) {
  const background = config.style.questionSlide.background

  const firstSlide = presentation.appendSlide()
  addTitleToQuestionSlide(presentation, firstSlide, question.question, true)
  setBackground(background, firstSlide)
  tryAddProgressBarToQuestionSlide(presentation, firstSlide, value)

  const secondSlide = presentation.appendSlide()
  addTitleToQuestionSlide(presentation, secondSlide, question.question)
  addImageToQuestionSlide(presentation, secondSlide, question.answer)
  setBackground(background, secondSlide)
  tryAddProgressBarToQuestionSlide(presentation, secondSlide, value)

  console.log(`Question '${question.question}' with text has been created`)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Question} question
 * @param {number} value
 */
function addUnderstandImageQuestion(presentation, question, value) {
  const background = config.style.questionSlide.background

  const firstSlide = presentation.appendSlide()
  addTitleToQuestionSlide(presentation, firstSlide, "What is it?")
  addImageToQuestionSlide(presentation, firstSlide, question.question)
  setBackground(background, firstSlide)
  tryAddProgressBarToQuestionSlide(presentation, firstSlide, value)

  const secondSlide = presentation.appendSlide()
  addTitleToQuestionSlide(presentation, secondSlide, question.answer)
  addImageToQuestionSlide(presentation, secondSlide, question.question)
  setBackground(background, secondSlide)
  tryAddProgressBarToQuestionSlide(presentation, secondSlide, value)

  console.log(`Question '${question.answer}' (answer shown) with an image has been created`)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Question} question
 * @param {number} value
 */
function addChooseAnswerQuestion(presentation, question, value) {
  const background = config.style.questionSlide.background

  const firstSlide = presentation.appendSlide()
  addTitleToQuestionSlide(presentation, firstSlide, question.question)
  addOptionsToQuestionSlide(presentation, firstSlide, question.options)
  setBackground(background, firstSlide)
  tryAddProgressBarToQuestionSlide(presentation, firstSlide, value)

  const secondSlide = presentation.appendSlide()
  addTitleToQuestionSlide(presentation, secondSlide, question.question)
  addOptionsToQuestionSlide(presentation, secondSlide, question.options, question.answer, true)
  setBackground(background, secondSlide)
  tryAddProgressBarToQuestionSlide(presentation, secondSlide, value)

  console.log(`Question '${question.question}' with several options has been created`)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Section} section
 * @param {number} value
 */
function addSection(presentation, section, value) {
  if (typeof section.questions === "undefined")
    return

  const titleSlide = presentation.appendSlide()
  addTitleToTitleSlide(presentation, titleSlide, section.name)
  setBackground(config.style.titleSlide.background, titleSlide)
  tryAddProgressBarToTitleSlide(presentation, titleSlide, value)

  const shownQuestions = section.questions.filter(question => question.show !== false).length
  let questionIndex = 1

  for (const question of section.questions) {
    if (question.show === false) {
      console.error(`Question '${question.question}' has been skipped because 'show' property is false`)
      continue
    }

    switch (question.type) {
      case "fill-placeholder":
        addFillPlaceholderQuestion(presentation, question, questionIndex / shownQuestions)
        break
      case "understand-text":
        addUnderstandTextQuestion(presentation, question, questionIndex / shownQuestions)
        break
      case "understand-picture":
        addUnderstandImageQuestion(presentation, question, questionIndex / shownQuestions)
        break
      case "choose-answer":
        addChooseAnswerQuestion(presentation, question, questionIndex / shownQuestions)
        break
    }

    questionIndex++
  }
}
