/**
 * @author tlwr [toby@toby.codes]
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * HTML To Text operation
 */
class HTMLToText extends Operation {

    /**
     * HTMLToText constructor
     */
    constructor() {
        super();

        this.name = "HTML To Text";
        this.module = "Default";
        this.local="";
        this.description = "将操作的HTML输出转换为可读字符串,而不是在DOM中呈现。Converts an HTML output from an operation to a readable string instead of being rendered in the DOM.";
        this.infoURL = "";
        this.inputType = "html";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {html} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return input;
    }

}

export default HTMLToText;
