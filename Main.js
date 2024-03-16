/**
 * @type {Config}
 */
let config_ = {}

/**
 * Creates a presentation from specific user preferences.
 * 
 * @param {Config} [userPreferences]
 * 
 * @returns {string}
 */
function generate(userPreferences) {
    config_ = getPreferences_(userPreferences)
    throwIfConfigIsInvalid_(config_)

    const presentation = SlidesApp.create(config_.general.name)

    const nonEmptySections = config_.sections.filter(
        (section) => !isEmptySection_(section)
    ).length
    let sectionIndex = 1

    for (const section of config_.sections) {
        if (isEmptySection_(section)) {
            console.error(
                `Section '${section.name}' has been skipped because 'show' property is false for all of questions`
            )
            continue
        }

        addSection_(presentation, section, sectionIndex / nonEmptySections)
        sectionIndex++
        console.log(`Section '${section.name}' has been created`)
    }

    presentation.getSlides()[0].remove()
    console.log(`Presentation URL: ${presentation.getUrl()}`)

    return presentation.getUrl()
}
