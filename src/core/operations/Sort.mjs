/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {INPUT_DELIM_OPTIONS} from "../lib/Delim.mjs";
import {caseInsensitiveSort, ipSort, numericSort, hexadecimalSort} from "../lib/Sort.mjs";

/**
 * Sort operation
 */
class Sort extends Operation {

    /**
     * Sort constructor
     */
    constructor() {
        super();

        this.name = "Sort";
        this.module = "Default";
        this.local="";
        this.description = "按字母顺序排列由指定分隔符分隔的字符串<br><br>IP地址选项仅支持IPv4。Alphabetically sorts strings separated by the specified delimiter.<br><br>The IP address option supports IPv4 only.";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Delimiter",
                "type": "option",
                "value": INPUT_DELIM_OPTIONS
            },
            {
                "name": "Reverse",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Order",
                "type": "option",
                "value": ["Alphabetical (case sensitive)", "Alphabetical (case insensitive)", "IP address", "Numeric", "Numeric (hexadecimal)"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const delim = Utils.charRep(args[0]),
            sortReverse = args[1],
            order = args[2];
        let sorted = input.split(delim);

        if (order === "Alphabetical (case sensitive)") {
            sorted = sorted.sort();
        } else if (order === "Alphabetical (case insensitive)") {
            sorted = sorted.sort(caseInsensitiveSort);
        } else if (order === "IP address") {
            sorted = sorted.sort(ipSort);
        } else if (order === "Numeric") {
            sorted = sorted.sort(numericSort);
        } else if (order === "Numeric (hexadecimal)") {
            sorted = sorted.sort(hexadecimalSort);
        }

        if (sortReverse) sorted.reverse();
        return sorted.join(delim);
    }

}

export default Sort;
