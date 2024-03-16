# Presentation generator

Generates presentation from a JSON file or an JavaScript object config.

Library identifier: `1Uu21GxizeyM_XAFh4L2Lt-k26tPf8U4XcVri4V2OXXIQlhZlXqog3c1E`

## Pros and cons

- :white_check_mark: Simple configuration to create presentation-quizzes
- :white_check_mark: Easy reproducible presentations, just copy configuration
  to get the same presentation

## Introduction example

English presentation-quiz creation ([open generated presentation][presentation]):

```javascript
function main() {
  /**
   * @type {Config}
   */
  const config = {
    general: {
      name: "Past simple markers"
    },
    style: {
      titleSlide: {
        color: {
          red: 255,
          green: 255,
          blue: 255
        },
        background: "https://www.backgroundsy.com/file/preview/pink-waves.jpg",
        progressBar: {
          foreground: {
            red: 235,
            green: 52,
            blue: 143
          }
        }
      },
      questionSlide: {
        title: {
          size: {
            width: 0.95,
            height: 0.2
          },
          displacementFromTheTop: 0.05
        },
        background: "https://img.freepik.com/free-vector/elegant-flowing-pink-business-wave-background_1035-23193.jpg",
        options: {
          size: {
            width: 0.8,
            height: 0.4
          },
          relativeHeight: 0.1,
          right: {
            color: {
              red: 235,
              green: 52,
              blue: 143
            },
            prefix: "❤️"
          }
        },
        progressBar: {
          foreground: {
            red: 235,
            green: 52,
            blue: 143
          }
        }
      }
    },
    sections: [
      {
        name: "Regular verbs",
        questions: [
          {
            type: "choose-answer",
            question: "I {{play}} chess yesterday.",
            options: [
              "played",
              "did played",
              "play",
              "to play"
            ],
            answer: 1
          },
          {
            type: "choose-answer",
            question: "5 days ago she {{walk}} at night.",
            options: [
              "walk",
              "walked",
              "walkeed",
              "to walk"
            ],
            answer: 2
          },
          {
            type: "choose-answer",
            question: "He {{be}} in London last week.",
            options: [
              "has been",
              "were",
              "ben",
              "was"
            ],
            answer: 4
          },
          {
            type: "choose-answer",
            question: "She {{wash}} her face 6 minutes ago.",
            options: [
              "washed",
              "has washed",
              "wash",
              "did wash"
            ],
            answer: 1
          },
          {
            type: "choose-answer",
            question: "We {{talk}} together last morning.",
            options: [
              "talk",
              "talkked",
              "talked",
              "to talk"
            ],
            answer: 3
          }
        ]
      },
      {
        name: "Irregular verbs",
        questions: [
          {
            type: "choose-answer",
            question: "We {{eat}} in DoDo Pizza two days ago.",
            options: [
              "ate",
              "has eaten",
              "to eat",
              "eat"
            ],
            answer: 1
          },
          {
            type: "choose-answer",
            question: "They {{do}} stipid things yesterday.",
            options: [
              "have been did",
              "doed",
              "did do",
              "did"
            ],
            answer: 4
          },
          {
            type: "choose-answer",
            question: "They {{go}} to the theater two weeks ago.",
            options: [
              "did went",
              "go",
              "went",
              "goed"
            ],
            answer: 3
          },
          {
            type: "choose-answer",
            question: "I and Lana {{make}} this presentation 4 hours ago.",
            options: [
              "made",
              "does make",
              "maked",
              "to make"
            ],
            answer: 1
          },
          {
            type: "choose-answer",
            question: "He {{become}} an excellent writer in 1995.",
            options: [
              "has become",
              "became",
              "becomed",
              "did become"
            ],
            answer: 2
          }
        ]
      }
    ]
  }

  Presentation.generate(config)
}
```

[presentation]: https://docs.google.com/presentation/d/e/2PACX-1vSvzmac0Jz4Fms_McXm0hxiFlqZOKa51TuAt6Vb7CQDORRf0oYPCp_MOZzsJwvbWA-mr4uzmjD27Xn2/pub?start=false&loop=false&delayms=3000

## Syntax

See [the default config][config] for default settings and [types] for their
descriptions.

[config]: https://github.com/EmilyGraceSeville7cf/javascript-presentation-generator/blob/main/default-configs/Config.js
[types]: https://github.com/EmilyGraceSeville7cf/javascript-presentation-generator/blob/main/types/Config.js

## Type definitions

To enable IntelliSence in Google Apps Script web editor the following
JSDoc-based type definitions can be used:

```javascript
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
```
