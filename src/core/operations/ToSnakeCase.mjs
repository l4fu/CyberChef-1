/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import snakeCase from "lodash/snakeCase.js";
import Operation from "../Operation.mjs";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Snake case operation
 */
class ToSnakeCase extends Operation {

    /**
     * ToSnakeCase constructor
     */
    constructor() {
        super();

        this.name = "To Snake case";
        this.module = "Code";
        this.local="";
        this.description = "将输入字符串转换为snake大小写。\ n<br><br>\ n大小写都是小写，以下划线作为单词边界。\ n<br><br>\  n.g.this_is_snake_case\ n<br><br>\ n“尝试上下文感知”将使操作尝试很好地转换变量和函数名。Converts the input string to snake case.\n<br><br>\nSnake case is all lower case with underscores as word boundaries.\n<br><br>\ne.g. this_is_snake_case\n<br><br>\n'Attempt to be context aware' will make the operation attempt to nicely transform variable and function names.";
        this.infoURL = "https://wikipedia.org/wiki/Snake_case";
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
            return replaceVariableNames(input, snakeCase);
        } else {
            return snakeCase(input);
        }
    }
}

export default ToSnakeCase;
