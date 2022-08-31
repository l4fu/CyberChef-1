/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import kebabCase from "lodash/kebabCase.js";
import Operation from "../Operation.mjs";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Kebab case operation
 */
class ToKebabCase extends Operation {

    /**
     * ToKebabCase constructor
     */
    constructor() {
        super();

        this.name = "To Kebab case";
        this.module = "Code";
        this.local="";
        this.description = "将输入字符串转换为串大小写。<br><br> kebab大小写都是小写，以破折号作为单词边界。<br><br>.g.这是kebab的大小写<br><br>“尝试上下文感知”将使操作尝试很好地转换变量和函数名。Converts the input string to kebab case.<br><br>Kebab case is all lower case with dashes as word boundaries.<br><br>e.g. this-is-kebab-case<br><br>'Attempt to be context aware' will make the operation attempt to nicely transform variable and function names.";
        this.infoURL = "https://wikipedia.org/wiki/Kebab_case";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Attempt to be context aware",
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
        const smart = args[0];

        if (smart) {
            return replaceVariableNames(input, kebabCase);
        } else {
            return kebabCase(input);
        }
    }

}

export default ToKebabCase;
