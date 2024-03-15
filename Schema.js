/**
 * @type {Schema}
 */
const schema = {
  definitions: {
    relativeSize: {
      description: "A relative size",
      type: "object",
      properties: {
        width: {
          title: "width",
          description: "A relative width",
          type: "number",
          minimum: 0,
          maximum: 1,
          examples: [0, 0.25, 0.5, 0.75, 1]
        },
        height: {
          title: "height",
          description: "A relative height",
          type: "number",
          minimum: 0,
          maximum: 1,
          examples: [0, 0.25, 0.5, 0.75, 1]
        }
      },
      minProperties: 2,
      additionalProperties: false
    },
    font: {
      description: "A font",
      type: "object",
      properties: {
        size: {
          title: "size",
          description: "A font size",
          type: "integer",
          minimum: 1,
          examples: [10, 20, 30, 40, 50]
        },
        name: { // new
          title: "name",
          description: "A font name",
          type: "string",
          minLength: 1,
          examples: ["Arial"]
        },
        bold: {
          title: "bold",
          description: "Whether font is bold",
          type: "boolean",
        },
        italic: {
          title: "italic",
          description: "Whether font is italic",
          type: "boolean",
        },
        underline: {
          title: "underline",
          description: "Whether font is underlined",
          type: "boolean",
        }
      },
      minProperties: 1,
      additionalProperties: false
    },
    color: {
      description: "A color",
      type: "object",
      properties: {
        red: {
          title: "red",
          description: "A red color component",
          type: "integer",
          minimum: 0,
          maximum: 255,
          examples: [0, 50, 100, 150, 200, 250]
        },
        green: {
          title: "green",
          description: "A green color component",
          type: "integer",
          minimum: 0,
          maximum: 255,
          examples: [0, 50, 100, 150, 200, 250]
        },
        blue: {
          title: "blue",
          description: "A blue color component",
          type: "integer",
          minimum: 0,
          maximum: 255,
          examples: [0, 50, 100, 150, 200, 250]
        }
      },
      minProperties: 3,
      additionalProperties: false
    },
    url: {
      description: "A url",
      type: "string",
      minLength: 1,
      pattern: "^https?://"
    },
    background: {
      description: "A background color or image",
      oneOf: [
        {
          $ref: "#/definitions/color"
        },
        {
          $ref: "#/definitions/url"
        }
      ]
    },
    decoration: {
      description: "A text decoration",
      type: "string",
      examples: ["🢂", "🢀", "♥"]
    },
    highlight: {
      description: "An option's highlight",
      type: "object",
      required: ["font"],
      properties: {
        font: {
          title: "font",
          $ref: "#/definitions/font"
        },
        color: {
          title: "color",
          $ref: "#/definitions/color"
        },
        prefix: {
          title: "prefix",
          $ref: "#/definitions/decoration"
        },
        suffix: { // new
          title: "suffix",
          $ref: "#/definitions/decoration"
        }
      },
      minProperties: 1,
      additionalProperties: false
    },
    progressBar: {
      description: "A progress bar",
      type: "object",
      properties: {
        show: {
          title: "show",
          description: "Whether to show a progress bar",
          type: "boolean"
        },
        relativeHeight: {
          title: "relative height",
          description: "A relative progress bar height",
          type: "number",
          minimum: 0,
          maximum: 1,
          examples: [0, 0.25, 0.5, 0.75, 1]
        },
        foreground: {
          title: "foreground",
          $ref: "#/definitions/color"
        },
        background: {
          title: "background",
          $ref: "#/definitions/color"
        }
      },
      additionalProperties: false
    }
  },
  title: "settings",
  description: "A presentation settings",
  type: "object",
  required: ["general", "sections"],
  properties: {
    general: {
      title: "general",
      description: "General presentation settings",
      type: "object",
      required: ["name"],
      properties: {
        name: {
          title: "name",
          description: "A presentation name",
          type: "string",
          minLength: 1,
          examples: ["English quiz"]
        }
      },
      additionalProperties: false
    },
    style: {
      title: "style",
      description: "A presentation style",
      type: "object",
      properties: {
        titleSlide: {
          title: "title style",
          description: "A title style",
          type: "object",
          properties: {
            size: {
              title: "size",
              $ref: "#/definitions/relativeSize"
            },
            font: {
              title: "font",
              $ref: "#/definitions/font"
            },
            color: {
              title: "color",
              $ref: "#/definitions/color"
            },
            background: {
              title: "background",
              $ref: "#/definitions/background"
            },
            progressBar: {
              title: "progress bar",
              $ref: "#/definitions/progressBar"
            }
          },
          minProperties: 1,
          additionalProperties: false
        },
        questionSlide: {
          title: "question style",
          description: "A question style",
          type: "object",
          properties: {
            title: {
              title: "title style",
              description: "A title style",
              type: "object",
              properties: {
                size: {
                  title: "size",
                  $ref: "#/definitions/relativeSize"
                },
                font: {
                  title: "font",
                  $ref: "#/definitions/font"
                },
                color: {
                  title: "color",
                  $ref: "#/definitions/color"
                },
                displacementFromTheTop: {
                  title: "displacement from the top",
                  type: "number",
                }
              },
              minProperties: 1,
              additionalProperties: false
            },
            image: {
              title: "image style",
              description: "An image style",
              type: "object",
              properties: {
                size: {
                  $ref: "#/definitions/relativeSize"
                },
                mode: {
                  type: "string",
                  enum: ["full", "width", "height", "auto"]
                }
              },
              minProperties: 1,
              additionalProperties: false
            },
            options: {
              title: "option style",
              description: "An option style",
              type: "object",
              properties: {
                size: {
                  title: "size",
                  $ref: "#/definitions/relativeSize"
                },
                relativeHeight: {
                  title: "relative height",
                  description: "A relative option height",
                  type: "number",
                  minimum: 0,
                  maximum: 1,
                  examples: [0, 0.25, 0.5, 0.75, 1]
                },
                right: {
                  title: "right",
                  $ref: "#/definitions/highlight"
                },
                other: {
                  title: "other",
                  $ref: "#/definitions/highlight"
                },
              },
              minProperties: 1,
              additionalProperties: false
            },
            background: {
              title: "background",
              $ref: "#/definitions/background"
            },
            progressBar: {
              title: "progress bar",
              $ref: "#/definitions/progressBar"
            }
          },
          minProperties: 1,
          additionalProperties: false
        }
      },
      additionalProperties: false
    },
    sections: {
      title: "sections",
      description: "Presentation sections",
      type: "array",
      uniqueItems: true,
      minItems: 1,
      items: {
        description: "A presentation section",
        type: "object",
        required: ["name"],
        properties: {
          name: {
            title: "name",
            description: "A section name",
            type: "string",
            minLength: 1,
            examples: ["English quiz"]
          },
          questions: {
            title: "questions",
            description: "Section questions",
            type: "array",
            uniqueItems: true,
            items: {
              description: "A section's question",
              type: "object",
              required: ["type", "question", "answer"],
              properties: {
                type: {
                  title: "type",
                  description: "A question type",
                  type: "string",
                  enum: ["fill-placeholder", "understand-text", "understand-picture", "choose-answer"]
                },
                question: {
                  title: "question",
                  description: "A question",
                  type: "string",
                  minLength: 1
                },
                options: {
                  title: "options",
                  description: "Question options",
                  type: "array",
                  minLength: 1,
                  uniqueItems: true,
                  items: {
                    description: "A question option",
                    type: "string",
                    minLength: 1
                  }
                },
                answer: {
                  title: "answer",
                  description: "A question answer",
                  oneOf: [
                    {
                      type: "string",
                      minLength: 1
                    },
                    {
                      type: "integer",
                      minimum: 1
                    }
                  ]
                },
                show: {
                  title: "show",
                  description: "Whether to show a question",
                  type: "boolean"
                }
              },
              additionalProperties: false
            }
          }
        },
        additionalProperties: false
      }
    }
  },
  additionalProperties: false
}