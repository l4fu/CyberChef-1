/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import XRegExp from "xregexp";

/**
 * Find / Replace operation
 */
class FindReplace extends Operation {

    /**
     * FindReplace constructor
     */
    constructor() {
        super();

        this.name = "Find / Replace";
        this.module = "Regex";
        this.local="";
        this.description = "用第二个字符串替换第一个字符串的所有匹配项<br><br>包括对正则表达式（regex）、简单字符串和扩展字符串的支持（支持00n、00r、00t、00b、00f和使用00x表示法转义的十六进制字节,例如,00x00表示空字节）。Replaces all occurrences of the first string with the second.<br><br>Includes support for regular expressions (regex), simple strings and extended strings (which support \\n, \\r, \\t, \\b, \\f and escaped hex bytes using \\x notation, e.g. \\x00 for a null byte).";
        this.infoURL = "https://wikipedia.org/wiki/Regular_expression";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Find",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Regex", "Extended (\\n, \\t, \\x...)", "Simple string"]
            },
            {
                "name": "Replace",
                "type": "binaryString",
                "value": ""
            },
            {
                "name": "Global match",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Case insensitive",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Multiline matching",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Dot matches all",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [{option: type}, replace, g, i, m, s] = args;
        let find = args[0].string,
            modifiers = "";

        if (g) modifiers += "g";
        if (i) modifiers += "i";
        if (m) modifiers += "m";
        if (s) modifiers += "s";

        if (type === "Regex") {
            find = new XRegExp(find, modifiers);
            return input.replace(find, replace);
        }

        if (type.indexOf("Extended") === 0) {
            find = Utils.parseEscapedChars(find);
        }

        find = new XRegExp(Utils.escapeRegex(find), modifiers);

        return input.replace(find, replace);
    }

}

export default FindReplace;
