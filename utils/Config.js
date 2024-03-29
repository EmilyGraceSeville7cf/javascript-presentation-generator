/**
 * @param {Section} section
 */
function isEmptySection_(section) {
    return section.questions.filter((question) => question.show !== false).length === 0
}

/**
 * @param {Config} [userPreferences]
 * 
 * @returns {Config}
 */
function getPreferences_(userPreferences) {
    if (typeof userPreferences !== "undefined")
        return mergeDeep_(defaultConfig_, userPreferences)

    const configName = "generate presentation.json"
    let iterator = DriveApp.getFilesByName(configName)
    if (!iterator.hasNext())
        throw new Error(`'${configName}' config doesn't exist`)

    const configContent = JSON.parse(iterator.next().getBlob().getDataAsString())
    return mergeDeep_(defaultConfig_, configContent)
}
