/**
 * Replace underscores with one space (" ")
 *
 * @param str String to run the replace on
 */
export const replaceUnderscoreWithWhitespace = (str: string) => {
    return str.replace("_", " ");
};

/**
 * Replaces all slashes with a comma followed by one space (", ")
 *
 * @param str String to run the replace on
 */
export const replaceSlashWithCommaWhitespace = (str: string) => {
    return str.replace(/\//g, ", ");
};

/**
 * This runs two functions on the input string:
 *      replaceUnderscoreWithWhitespace()
 *      replaceSlashWithCommaWhitespace()
 *
 * This results in:
 *      Underscores being replaced with a whitespace (" ")
 *      Any forward slash ("/") being replaced with a comma and then a white space (" ")
 *
 * @param str String to run the replace on
 */
export const replaceSlashAndUnderscore = (str: string) => {
    const underscoreReplaced = replaceUnderscoreWithWhitespace(str);
    return replaceSlashWithCommaWhitespace(underscoreReplaced);
};
