/**
 * @author PenguinGeorge [george@penguingeorge.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import {alphabetName, ALPHABET_OPTIONS} from "../lib/Base85.mjs";

/**
 * To Base85 operation
 */
class ToBase85 extends Operation {

    /**
     * To Base85 constructor
     */
    constructor() {
        super();

        this.name = "To Base85";
        this.module = "Default";
        this.local="";
        this.description = "Base85（也称为ASCI85）是用于编码任意字节数据的符号。Base64通常更有效。<br><br>此操作将数据编码为ASCII字符串（使用您选择的字母表，包括预设值）。<br><br>例如，<code>hello world</code>变为<code>BOu！rD]j7BEbo7</code><br><br>Base85通常用于Adobe的PostScript和PDF文件格式<br><br><strong>选项</strong><br><u>字母表</u><ul><li>标准-标准字母表，称为ASCI85</li><li>Z85（ZeroMQ）-Base85的字符串安全变体，这避免了引号和反斜杠字符。</li><li>IPv6-Base85的一种变体，适用于编码IPv6地址（RFC 1924）</li></ul><u>包含定界符</u><br>在数据的开始和结束处添加“<~”和“~>”定界符。这是Adobe实现Base85的标准。Base85 (also called Ascii85) is a notation for encoding arbitrary byte data. It is usually more efficient that Base64.<br><br>This operation encodes data in an ASCII string (with an alphabet of your choosing, presets included).<br><br>e.g. <code>hello world</code> becomes <code>BOu!rD]j7BEbo7</code><br><br>Base85 is commonly used in Adobe's PostScript and PDF file formats.<br><br><strong>Options</strong><br><u>Alphabet</u><ul><li>Standard - The standard alphabet, referred to as Ascii85</li><li>Z85 (ZeroMQ) - A string-safe variant of Base85, which avoids quote marks and backslash characters</li><li>IPv6 - A variant of Base85 suitable for encoding IPv6 addresses (RFC 1924)</li></ul><u>Include delimiter</u><br>Adds a '<~' and '~>' delimiter to the start and end of the data. This is standard for Adobe's implementation of Base85.";
        this.infoURL = "https://wikipedia.org/wiki/Ascii85";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Alphabet",
                type: "editableOption",
                value: ALPHABET_OPTIONS
            },
            {
                name: "Include delimeter",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
    */
    run(input, args) {
        input = new Uint8Array(input);
        const alphabet = Utils.expandAlphRange(args[0]).join(""),
            encoding = alphabetName(alphabet),
            includeDelim = args[1];
        let result = "";

        if (alphabet.length !== 85 ||
            [].unique.call(alphabet).length !== 85) {
            throw new OperationError("Error: Alphabet must be of length 85");
        }

        if (input.length === 0) return "";

        let block;
        for (let i = 0; i < input.length; i += 4) {
            block = (
                ((input[i])          << 24) +
                ((input[i + 1] || 0) << 16) +
                ((input[i + 2] || 0) << 8)  +
                ((input[i + 3] || 0))
            ) >>> 0;

            if (encoding !== "Standard" || block > 0) {
                let digits = [];
                for (let j = 0; j < 5; j++) {
                    digits.push(block % 85);
                    block = Math.floor(block / 85);
                }

                digits = digits.reverse();

                if (input.length < i + 4) {
                    digits.splice(input.length - (i + 4), 4);
                }

                result += digits.map(digit => alphabet[digit]).join("");
            } else {
                result += (encoding === "Standard") ? "z" : null;
            }
        }

        return includeDelim ? `<~${result}~>` : result;
    }
}

export default ToBase85;
