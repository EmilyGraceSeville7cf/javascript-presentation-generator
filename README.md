# Presentation generator

Generates presentation from a JSON file.

## Pros and cons

- :white_check_mark: Simple JSON configuration to create presentation-quizzes
- :white_check_mark: Easy reproducible presentations, just copy configuration
  to get the same presentation

## Introduction example

English presentation-quiz creation ([open generated presentation][presentation]):

```json
{
  "general": {
    "name": "Past simple markers"
  },
  "sections": [
    {
      "name": "Regular verbs",
      "questions": [
        {
          "type": "choose-answer",
          "question": "I {{play}} chess yesterday.",
          "options": [
            "played",
            "did played",
            "play",
            "to play"
          ],
          "answer": 1
        },
        {
          "type": "choose-answer",
          "question": "5 days ago she {{walk}} at night.",
          "options": [
            "walk",
            "walked",
            "walkeed",
            "to walk"
          ],
          "answer": 2
        },
        {
          "type": "choose-answer",
          "question": "He {{be}} in London last week.",
          "options": [
            "has been",
            "were",
            "ben",
            "was"
          ],
          "answer": 4
        },
        {
          "type": "choose-answer",
          "question": "She {{wash}} her face 6 minutes ago.",
          "options": [
            "washed",
            "has washed",
            "wash",
            "did wash"
          ],
          "answer": 1
        },
        {
          "type": "choose-answer",
          "question": "We {{talk}} together last morning.",
          "options": [
            "talk",
            "talkked",
            "talked",
            "to talk"
          ],
          "answer": 3
        }
      ]
    },
    {
      "name": "Irregular verbs",
      "questions": [
        {
          "type": "choose-answer",
          "question": "We {{eat}} in DoDo Pizza two days ago.",
          "options": [
            "ate",
            "has eaten",
            "to eat",
            "eat"
          ],
          "answer": 1
        },
        {
          "type": "choose-answer",
          "question": "They {{do}} stipid things yesterday.",
          "options": [
            "have been did",
            "doed",
            "did do",
            "did"
          ],
          "answer": 4
        },
        {
          "type": "choose-answer",
          "question": "They {{go}} to the theater two weeks ago.",
          "options": [
            "did went",
            "go",
            "went",
            "goed"
          ],
          "answer": 3
        },
        {
          "type": "choose-answer",
          "question": "I and Lana {{make}} this presentation 4 hours ago.",
          "options": [
            "made",
            "does make",
            "maked",
            "to make"
          ],
          "answer": 1
        },
        {
          "type": "choose-answer",
          "question": "He {{become}} an excellent writer in 1995.",
          "options": [
            "has become",
            "became",
            "becomed",
            "did become"
          ],
          "answer": 2
        }
      ]
    }
  ]
}
```

[presentation]: https://docs.google.com/presentation/d/e/2PACX-1vSvzmac0Jz4Fms_McXm0hxiFlqZOKa51TuAt6Vb7CQDORRf0oYPCp_MOZzsJwvbWA-mr4uzmjD27Xn2/pub?start=false&loop=false&delayms=3000

## Syntax

See [the default config][config] for details.

[config]: https://github.com/EmilyGraceSeville7cf/javascript-presentation-generator/blob/main/Config.js
