/**
 * @param {Font} style
 * @param {GoogleAppsScript.Slides.Shape} textBox
 */
function setFont_(style, textBox) {
    textBox
        .getText()
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
function setAlignment_(contentAlignment, paragraphAlignment, textBox) {
    textBox.setContentAlignment(contentAlignment)
    textBox
        .getText()
        .getParagraphStyle()
        .setParagraphAlignment(paragraphAlignment)
}

/**
 * @param {Background} background
 * @param {GoogleAppsScript.Slides.Slide} slide
 */
function setBackground_(background, slide) {
    const slideBackground = slide.getBackground()
    if (typeof background === "string") slideBackground.setPictureFill(background)
    else
        slideBackground.setSolidFill(
            background.red,
            background.green,
            background.blue
        )
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {string} text
 */
function addTitleToTitleSlide_(presentation, slide, text) {
    const style = config_.style.titleSlide
    const title = slide
        .insertTextBox(text)
        .setWidth(presentation.getPageWidth() * style.size.width)
        .setHeight(presentation.getPageHeight() * style.size.height)
        .alignOnPage(SlidesApp.AlignmentPosition.CENTER)

    setFont_(style, title)
    setAlignment_(
        SlidesApp.ContentAlignment.MIDDLE,
        SlidesApp.ParagraphAlignment.CENTER,
        title
    )
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {string} text
 * @param {boolean} centerVertically
 */
function addTitleToQuestionSlide_(
    presentation,
    slide,
    text,
    centerVertically = false
) {
    const style = config_.style.questionSlide.title
    const title = slide
        .insertTextBox(text)
        .setWidth(presentation.getPageWidth() * style.size.width)
        .setHeight(presentation.getPageHeight() * style.size.height)
        .alignOnPage(SlidesApp.AlignmentPosition.CENTER)

    if (!centerVertically)
        title.setTop(presentation.getPageHeight() * style.displacementFromTheTop)

    setFont_(style, title)
    setAlignment_(
        SlidesApp.ContentAlignment.MIDDLE,
        SlidesApp.ParagraphAlignment.CENTER,
        title
    )
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {string} url
 */
function addImageToQuestionSlide_(presentation, slide, url) {
    const style = config_.style.questionSlide.image
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
                else ratio = boundingBoxHeight / image.getHeight()
                break
        }

        width = image.getWidth() * ratio
        height = image.getHeight() * ratio
    }

    image.setWidth(width).setHeight(height).sendToBack()

    image.alignOnPage(SlidesApp.AlignmentPosition.CENTER)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {Array.<string>} options
 * @param {number} rightOptionNumber
 * @param {boolean} highlightOptions
 */
function addOptionsToQuestionSlide_(
    presentation,
    slide,
    options,
    rightOptionNumber = 0,
    highlightOptions = false
) {
    const style = config_.style.questionSlide.options

    const leftCorner =
        presentation.getPageWidth() / 2 -
        (presentation.getPageWidth() * style.size.width) / 2
    const topCorner =
        presentation.getPageHeight() / 2 -
        (presentation.getPageHeight() * style.size.height) / 2

    let height =
        (presentation.getPageHeight() * style.size.height) / options.length
    if (typeof style.relativeHeight !== "undefined")
        height = presentation.getPageHeight() * style.relativeHeight

    for (let i = 0; i < options.length; i++) {
        const option = slide.insertTextBox(
            options[i],
            leftCorner,
            topCorner + height * i,
            presentation.getPageWidth() * style.size.width,
            height
        )

        let fontStyle = style.other
        if (i === rightOptionNumber - 1) fontStyle = style.right

        if (highlightOptions) {
            let prefix = style.right.prefix
            let suffix = style.right.suffix
            if (i !== rightOptionNumber - 1) {
                prefix = style.other.prefix
                suffix = style.other.suffix
            }

            if (prefix.length !== 0)
                prefix = `${prefix} `
            if (suffix.length !== 0)
                suffix = ` ${suffix}`

            if (prefix.length > 0)
                option.getText().setText(`${prefix}${option.getText().asString()}${suffix}`)
        }

        setFont_(fontStyle, option)

        option
            .setContentAlignment(SlidesApp.ContentAlignment.MIDDLE)
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
function tryAddProgressBarToTitleSlide_(presentation, slide, value) {
    const style = config_.style.titleSlide.progressBar

    if (!style.show) return

    const height = presentation.getPageHeight() * style.relativeHeight

    const background = slide.insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        0,
        presentation.getPageHeight() - height,
        presentation.getPageWidth(),
        height
    )

    const indicator = slide.insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        0,
        presentation.getPageHeight() - height,
        presentation.getPageWidth() * value,
        height
    )

    background.getBorder().setTransparent()
    background
        .getFill()
        .setSolidFill(
            style.background.red,
            style.background.green,
            style.background.blue
        )

    indicator.getBorder().setTransparent()
    indicator
        .getFill()
        .setSolidFill(
            style.foreground.red,
            style.foreground.green,
            style.foreground.blue
        )
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {number} value
 */
function tryAddProgressBarToQuestionSlide_(presentation, slide, value) {
    const style = config_.style.questionSlide.progressBar

    if (!style.show) return

    const height = presentation.getPageHeight() * style.relativeHeight

    const background = slide.insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        0,
        presentation.getPageHeight() - height,
        presentation.getPageWidth(),
        height
    )

    const indicator = slide.insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        0,
        presentation.getPageHeight() - height,
        presentation.getPageWidth() * value,
        height
    )

    background.getBorder().setTransparent()
    background
        .getFill()
        .setSolidFill(
            style.background.red,
            style.background.green,
            style.background.blue
        )

    indicator.getBorder().setTransparent()
    indicator
        .getFill()
        .setSolidFill(
            style.foreground.red,
            style.foreground.green,
            style.foreground.blue
        )
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Question} question
 * @param {number} value
 */
function addFillPlaceholderQuestion_(presentation, question, value) {
    if (!/\{\{.+\}\}/.test(question.question))
        throw new Error(
            `Question '${question.question}' doesn't contain a placeholder denoted as double curly braces: {{placeholder}}`
        )

    const background = config_.style.questionSlide.background
    const firstSlide = presentation.appendSlide()
    addTitleToQuestionSlide_(presentation, firstSlide, question.question, true)
    setBackground_(background, firstSlide)
    tryAddProgressBarToQuestionSlide_(presentation, firstSlide, value)

    const secondSlide = presentation.appendSlide()
    addTitleToQuestionSlide_(
        presentation,
        secondSlide,
        question.question.replace(/\{\{.+\}\}/, question.answer),
        true
    )
    setBackground_(background, secondSlide)
    tryAddProgressBarToQuestionSlide_(presentation, secondSlide, value)

    console.log(
        `Question '${question.question}' with a placeholder has been created`
    )
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Question} question
 * @param {number} value
 */
function addUnderstandTextQuestion_(presentation, question, value) {
    const background = config_.style.questionSlide.background

    const firstSlide = presentation.appendSlide()
    addTitleToQuestionSlide_(presentation, firstSlide, question.question, true)
    setBackground_(background, firstSlide)
    tryAddProgressBarToQuestionSlide_(presentation, firstSlide, value)

    const secondSlide = presentation.appendSlide()
    addTitleToQuestionSlide_(presentation, secondSlide, question.question)
    addImageToQuestionSlide_(presentation, secondSlide, question.answer)
    setBackground_(background, secondSlide)
    tryAddProgressBarToQuestionSlide_(presentation, secondSlide, value)

    console.log(`Question '${question.question}' with text has been created`)
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Question} question
 * @param {number} value
 */
function addUnderstandImageQuestion_(presentation, question, value) {
    const background = config_.style.questionSlide.background

    const firstSlide = presentation.appendSlide()
    addTitleToQuestionSlide_(presentation, firstSlide, "What is it?")
    addImageToQuestionSlide_(presentation, firstSlide, question.question)
    setBackground_(background, firstSlide)
    tryAddProgressBarToQuestionSlide_(presentation, firstSlide, value)

    const secondSlide = presentation.appendSlide()
    addTitleToQuestionSlide_(presentation, secondSlide, question.answer)
    addImageToQuestionSlide_(presentation, secondSlide, question.question)
    setBackground_(background, secondSlide)
    tryAddProgressBarToQuestionSlide_(presentation, secondSlide, value)

    console.log(
        `Question '${question.answer}' (answer shown) with an image has been created`
    )
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Question} question
 * @param {number} value
 */
function addChooseAnswerQuestion_(presentation, question, value) {
    const background = config_.style.questionSlide.background

    const firstSlide = presentation.appendSlide()
    addTitleToQuestionSlide_(presentation, firstSlide, question.question)
    addOptionsToQuestionSlide_(presentation, firstSlide, question.options)
    setBackground_(background, firstSlide)
    tryAddProgressBarToQuestionSlide_(presentation, firstSlide, value)

    const secondSlide = presentation.appendSlide()
    addTitleToQuestionSlide_(presentation, secondSlide, question.question)
    addOptionsToQuestionSlide_(
        presentation,
        secondSlide,
        question.options,
        question.answer,
        true
    )
    setBackground_(background, secondSlide)
    tryAddProgressBarToQuestionSlide_(presentation, secondSlide, value)

    console.log(
        `Question '${question.question}' with several options has been created`
    )
}

/**
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Section} section
 * @param {number} value
 */
function addSection_(presentation, section, value) {
    if (typeof section.questions === "undefined") return

    const titleSlide = presentation.appendSlide()
    addTitleToTitleSlide_(presentation, titleSlide, section.name)
    setBackground_(config_.style.titleSlide.background, titleSlide)
    tryAddProgressBarToTitleSlide_(presentation, titleSlide, value)

    const shownQuestions = section.questions.filter(
        (question) => question.show !== false
    ).length
    let questionIndex = 1

    for (const question of section.questions) {
        if (question.show === false) {
            console.error(
                `Question '${question.question}' has been skipped because 'show' property is false`
            )
            continue
        }

        switch (question.type) {
            case "fill-placeholder":
                addFillPlaceholderQuestion_(
                    presentation,
                    question,
                    questionIndex / shownQuestions
                )
                break
            case "understand-text":
                addUnderstandTextQuestion_(
                    presentation,
                    question,
                    questionIndex / shownQuestions
                )
                break
            case "understand-picture":
                addUnderstandImageQuestion_(
                    presentation,
                    question,
                    questionIndex / shownQuestions
                )
                break
            case "choose-answer":
                addChooseAnswerQuestion_(
                    presentation,
                    question,
                    questionIndex / shownQuestions
                )
                break
        }

        questionIndex++
    }
}
