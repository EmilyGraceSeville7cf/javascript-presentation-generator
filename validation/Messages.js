/**
 * @param {string} name
 * 
 * @returns {string}
 */
function severalAnswersError_(name) {
    return `Question '${name}' can't contain possible answers as there is just one answer`
}

/**
 * @param {string} name
 * @param {string} type
 * 
 * @returns {string}
 */
function typeMismatchError_(name, type) {
    return `Question '${name}' answer should be a ${type}`
}

/**
 * @param {string} name
 * @param {boolean} expectPlaceholder
 * 
 * @returns {string}
 */
function placeholderError_(name, expectPlaceholder) {
    let verb = expectPlaceholder ? "doesn't contain" : "contains"
    let type = expectPlaceholder ? "Question" : "Answer"
    return `${type} '${name}' ${verb} a placeholder denoted as double curly braces: {{placeholder}}`
}

/**
 * @param {string} name
 * @param {"Question" | "Answer"} type
 * @param {boolean} expectUrl
 * 
 * @returns {string}
 */
function urlError_(name, type, expectUrl) {
    let verb = expectUrl ? "doesn't start with" : "starts with"
    return `${type} '${name}' ${verb} a URL: http:// or https://`
}
