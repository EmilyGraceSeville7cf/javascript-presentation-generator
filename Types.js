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


/**
 * A JSON schema (draft 04).
 * 
 * @typedef Schema
 * 
 * @property {"http://json-schema.org/draft-04/schema#"} schema - A schema used for validation.
 * 
 * @property {string} title - A property title.
 * @property {string} description - A property description.
 *
 * @property {"object" | "null" | "number" | "integer" | "string" | "boolean" | "array"} type - A property type.
 * @property {number} minimum - A minimum property value.
 * @property {number} maximum - A maximum property value.
 * @property {number} exclusiveMinimum - An exclusive minimum property value.
 * @property {number} exclusiveMaximum - An exclusive maximum property value.
 * @property {number} minLength - A minimum property value length (range: 0..).
 * @property {number} maxLength - A maximum property value length (range: 0..).
 * @property {number} minLength - A minimum property value length (range: 0..).
 * @property {string} pattern - A pattern property value should match.
 * @property {"date" | "time" | "date-time" | "duration" | "regex" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "json-pointer" | "relative-json-pointer" | "uri" | "uri-reference" | "uri-template" | "uuid"} format - A format property value should match.
 * 
 * @property {number} minProperties - A minimum property count (range: 0..).
 * @property {number} maxProperties - A maximum property count (range: 0..).
 * @property {Array.<string>} required - Required properties (range: 0..).
 * @property {Object.<string, Array.<string> | Schema>} dependencies - Dependencies between properties.
 * @property {Object.<string, Schema>} properties - Nested properties.
 * @property {Object.<string, Schema>} patternProperties - Nested pattern properties.
 * @property {Object.<string, Schema>} additionalProperties - Nested additional properties or false if they are not allowed.
 * 
 * @property {number} minItems - A minimum array item count (range: 0..).
 * @property {number} maxItems - A maximum array item count (range: 0..).
 * @property {boolean} uniqueItems - Whether array items should be unique.
 * @property {Schema | Array.<Schema>} items - Array items.
 * @property {Object.<string, Schema>} additionalItems - Additional items or false if they are not allowed.
 *
 * @property {any} const - An allowed property value.
 * @property {Array} enum - Allowed property values.
 * @property {any} default - A default property value.
 * @property {Array} examples - Sample property values.
 * 
 * @property {Array.<Schema>} anyOf - Nested schemas where at least one should match.
 * @property {Array.<Schema>} oneOf - Nested schemas where one should match.
 * @property {Array.<Schema>} allOf - Nested schemas where all should match.
 * @property {Schema} not - Nested schema should not match.

 * 
 * @property {Object.<string, Schema>} definitions - Schemas.
 * @property {string} $ref - A reference.
 */

/**
 * A JSON schema validation result.
 * 
 * @typedef SchemaValidationResult
 * 
 * @property {boolean} valid - Whether validation succeeded.
 * @property {Array.<string>} errors - Validation errors.
 */
