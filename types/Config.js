/**
 * A relative size.
 * 
 * @typedef RelativeSize
 * @property {number} width - A relative width (range: 0..1).
 * @property {number} height - A relative height (range: 0..1).
 */

/**
 * A font.
 * 
 * @typedef Font
 * @property {number} size - A font size (range: 1..).
 * @property {string} name - A font name (length range: 1..).
 * @property {number} bold - Whether font is bold or not.
 * @property {number} italic - Whether font is bold or not.
 * @property {number} underline - Whether font is underlined or not.
 */

/**
 * A color.
 * 
 * @typedef Color
 * @property {number} red - A red color component (range: 0..255).
 * @property {number} green - A green color component (range: 0..255).
 * @property {number} blue - A blue color component (range: 0..255).
 */

/**
 * A background.
 * 
 * @typedef {Color | string} Background
 */

/**
 * A progress bar.
 * 
 * @typedef ProgressBar
 * @property {boolean} show - Whether to show a progress bar.
 * @property {number} relativeHeight - A relative height (range: 0..).
 * @property {Color} foreground - An indicator color.
 * @property {Color} background - A background color.
 */


/**
 * General information.
 * 
 * @typedef General
 * @property {string} name - A presentation name (length range: 1..).
 */


/**
 * A question.
 * 
 * @typedef Question
 * @property {"fill-placeholder" | "understand-text" | "understand-picture" | "choose-answer"} type - A question type (one of: fill-placeholder, understand-text, understand-picture, choose-answer).
 * @property {string} question - A question text (length range: 1..).
 * @property {Array.<string>} options - Possible answers (length range: 1..).
 * @property {string} answer - A question answer which can be one of: text to fill in placeholder (length range: 1..), image url (length range: 1..), image explanation (length range: 1..), answer number (range: 1..).
 * @property {boolean} show - Whether to show this question.
 */

/**
 * Section information.
 * 
 * @typedef Section
 * @property {string} name - A section name (length range: 1..).
 * @property {Question[]} questions - A section content.
 */


/**
 * A title slide style.
 * 
 * @typedef TitleSlideStyle
 * @property {RelativeSize} size - A title size.
 * @property {Font} font - A title font.
 * @property {Color} color - A title color.
 * @property {Background} background - A background color or image.
 * @property {ProgressBar} progressBar - A progress bar style.
 */

/**
 * A question slide title style.
 * 
 * @typedef QuestionSlideTitleStyle
 * @property {RelativeSize} size - A title size.
 * @property {Font} font - A title font.
 * @property {Color} color - A title color.
 * @property {number} displacementFromTheTop - A title displacement from the top.
 */

/**
 * A question slide image style.
 * 
 * @typedef QuestionSlideImageStyle
 * @property {RelativeSize} size - An image size.
 * @property {"full" | "width" | "height" | "auto"} mode - A resize mode (one of: full, width, height, auto).
 */

/**
 * A question slide option's highlight style.
 * 
 * @typedef QuestionSlideOptionHighlightStyle
 * @property {Font} font - An option's font.
 * @property {Color} color - An option's color.
 * @property {string} prefix - An option's prefix.
 * @property {string} suffix - An option's suffix.
 */

/**
 * A question slide option's style.
 * 
 * @typedef QuestionSlideOptionStyle
 * @property {RelativeSize} size - An option's bounding box size.
 * @property {number} relativeHeight - An option's relative height (range: 0..1).
 * @property {QuestionSlideOptionHighlightStyle} right - A right option highlighting.
 * @property {QuestionSlideOptionHighlightStyle} other - Other option highlighting.
 */

/**
 * A question slide style.
 * 
 * @typedef QuestionSlideStyle
 * @property {QuestionSlideTitleStyle} title - A title size.
 * @property {QuestionSlideImageStyle} image - An image style.
 * @property {QuestionSlideOptionStyle} options - An option's style.
 * @property {Background} background - A background color or image.
 * @property {ProgressBar} progressBar - A progress bar style.
 */

/**
 * A style.
 * 
 * @typedef Style
 * @property {TitleSlideStyle} titleSlide - Title slide style.
 * @property {QuestionSlideStyle} questionSlide - Question slide style.
 */


/**
 * A configuration.
 * 
 * @typedef Config
 * @property {General} general - General information.
 * @property {Style} style - A presentation style.
 * @property {Section[]} sections - Sections.
 */
