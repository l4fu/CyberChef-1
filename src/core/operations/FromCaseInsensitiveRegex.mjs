/**
 * @author masq [github.cyberchef@masq.cc]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * From Case Insensitive Regex operation
 */
class FromCaseInsensitiveRegex extends Operation {

    /**
     * FromCaseInsensitiveRegex constructor
     */
    constructor() {
        super();

        this.name = "From Case Insensitive Regex";
        this.module = "Default";
        this.local="";
        this.description = "将不区分大小写的正则表达式字符串转换为区分大小写正则表达式字符串（不保证它是正确的原始大小写），以防i标志当时不可用，但现在可用，或者您需要它再次区分大小写。<br><br>例如<code>[mM][oO][zZ][iI][lL][lL][aA]/[0-9]。[0-9].</code>变为<code>Mozilla/[0-1]。[0-9].</code>Converts a case-insensitive regex string to a case sensitive regex string (no guarantee on it being the proper original casing) in case the i flag wasn't available at the time but now is, or you need it to be case-sensitive again.<br><br>e.g. <code>[mM][oO][zZ][iI][lL][lL][aA]/[0-9].[0-9] .*</code> becomes <code>Mozilla/[0-9].[0-9] .*</code>";
        this.infoURL = "https://wikipedia.org/wiki/Regular_expression";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return input.replace(/\[[a-z]{2}\]/ig, m => m[1].toUpperCase() === m[2].toUpperCase() ? m[1] : m);
    }
}

export default FromCaseInsensitiveRegex;
