/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Expand alphabet range operation
 */
class ExpandAlphabetRange extends Operation {

    /**
     * ExpandAlphabetRange constructor
     */
    constructor() {
        super();

        this.name = "Expand alphabet range";
        this.module = "Default";
        this.local="";
        this.description = "将字母表范围字符串展开为该范围内的字符列表。<br><br>例如，<code>a-z</code>变为<code>abcdefghijklmnopqrstuvwxyz</code>。Expand an alphabet range string into a list of the characters in that range.<br><br>e.g. <code>a-z</code> becomes <code>abcdefghijklmnopqrstuvwxyz</code>.";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Delimiter",
                "type": "binaryString",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return Utils.expandAlphRange(input).join(args[0]);
    }

}

export default ExpandAlphabetRange;
