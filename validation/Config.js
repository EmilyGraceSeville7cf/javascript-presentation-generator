/**
 * @param {Config} config
 * 
 * @returns {void}
 */
function throwIfConfigIsInvalid_(config) {
    const result = JSONSchema.validate(schema_, config)
    if (!result.valid)
        throw new Error(`Config is invalid: ${result.errors.join(", ")}`)

    for (const section of config.sections)
        for (const question of section.questions) {
            const placeholder = /\{\{.+\}\}/
            const url = /^https?:\/\//

            switch (question.type) {
                case "fill-placeholder":
                    if (question.options !== undefined)
                        throw new TypeError(severalAnswersError(question.question))
                    if (typeof question.answer !== "string")
                        throw new TypeError(typeMismatchError(question.question, "string"))

                    if (!placeholder.test(question.question))
                        throw new Error(
                            placeholderError(question.question, true))
                    if (placeholder.test(question.answer))
                        throw new Error(
                            placeholderError(question.question, false))
                    break

                case "understand-text":
                    if (question.options !== undefined)
                        throw new TypeError(severalAnswersError(question.question))
                    if (typeof question.answer !== "string")
                        throw new TypeError(typeMismatchError(question.question, "string"))

                    if (url.test(question.question))
                        throw new Error(
                            urlError(question.question, "Question", false))
                    if (!url.test(question.answer))
                        throw new Error(
                            urlError(question.question, "Answer", true))
                    break

                case "understand-picture":
                    if (question.options !== undefined)
                        throw new TypeError(severalAnswersError(question.question))
                    if (typeof question.answer !== "string")
                        throw new TypeError(typeMismatchError(question.question, "string"))

                    if (!url.test(question.question))
                        throw new Error(
                            urlError(question.question, "Question", true))
                    if (url.test(question.answer))
                        throw new Error(
                            urlError(question.question, "Answer", false))
                    break

                case "choose-answer":
                    if (question.options === undefined)
                        throw new Error(
                            `Question '${question.question}' doesn't contain possible answers`
                        )
                    if (typeof question.answer !== "number")
                        throw new TypeError(typeMismatchError(question.question, "number"))

                    if (question.answer > question.options.length)
                        throw new Error(
                            `Question '${question.question}' doesn't contain a ${question.answer} answer`
                        )
                    break
            }
        }
}
