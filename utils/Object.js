/**
 * 
 * @param {any} item
 * @returns {boolean}
 */
function isObject_(item) {
    return item && typeof item === "object" && !Array.isArray(item)
}

/**
 * 
 * @param {object} target 
 * @param  {...any} sources 
 * @returns {object}
 */
function mergeDeep_(target, ...sources) {
    if (!sources.length)
        return target

    const source = sources.shift()

    if (isObject_(target) && isObject_(source)) {
        for (const key in source) {
            if (isObject_(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} })
                mergeDeep_(target[key], source[key])
            } else
                Object.assign(target, { [key]: source[key] })
        }
    }

    return mergeDeep_(target, ...sources)
}
