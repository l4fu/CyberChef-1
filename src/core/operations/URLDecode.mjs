/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * URL Decode operation
 */
class URLDecode extends Operation {

    /**
     * URLDecode constructor
     */
    constructor() {
        super();

        this.name = "URL Decode";
        this.module = "URL";
        this.local="";
        this.description = "将URI/URL百分比编码字符转换回其原始值。<br><br>例如，<code>%3d</code>变为<code>=</code>Converts URI/URL percent-encoded characters back to their raw values.<br><br>e.g. <code>%3d</code> becomes <code>=</code>";
        this.infoURL = "https://wikipedia.org/wiki/Percent-encoding";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
        this.checks = [
            {
                pattern: ".*(?:%[\\da-f]{2}.*){4}",
                flags: "i",
                args: []
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const data = input.replace(/\+/g, "%20");
        try {
            return decodeURIComponent(data);
        } catch (err) {
            return unescape(data);
        }
    }

}

export default URLDecode;
