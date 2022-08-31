/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import camelCase from "lodash/camelCase.js";
import Operation from "../Operation.mjs";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Camel case operation
 */
class ToCamelCase extends Operation {

    /**
     * ToCamelCase constructor
     */
    constructor() {
        super();

        this.name = "To Camel case";
        this.module = "Code";
        this.local="";
        this.description = "将输入字符串转换为camel大小写。、n<br><br>、n除单词边界后的字母为大写外，所有字母均为小写。、n<br><br>、 n.g.这是一个范例、n<br><br>、n“尝试上下文感知”将使操作尝试很好地转换变量和函数名。Converts the input string to camel case.<br><br>Camel case is all lower case except letters after word boundaries which are uppercase.<br><br>e.g. thisIsCamelCase<br><br>'Attempt to be context aware' will make the operation attempt to nicely transform variable and function names.";
        this.infoURL = "https://wikipedia.org/wiki/Camel_case";
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
            return replaceVariableNames(input, camelCase);
        } else {
            return camelCase(input);
        }
    }

}

export default ToCamelCase;
