/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { bitOp, xor, BITWISE_OP_DELIMS } from "../lib/BitwiseOp.mjs";

/**
 * XOR operation
 */
class XOR extends Operation {

    /**
     * XOR constructor
     */
    constructor() {
        super();

        this.name = "XOR";
        this.module = "Default";
        this.local="";
        this.description = "用给定键对输入进行异或运算。＜br＞例如，＜code＞fe023da5＜/code＞＜br＞＜strong＞选项＜/strong＞＜br＞＜u＞保留空：＜/u＞如果当前字节为0x00或与键相同，则跳过它<br><br><u>方案：</u><ul><li>标准-密钥在每一轮后保持不变。</li><li>Input differential-key设置为前一个未处理字节的值。</li><li>Output Differentity-key设置成前一个处理字节的数值。</li><li>Cascade-key设置到移位一个的输入字节XOR the input with the given key.<br>e.g. <code>fe023da5</code><br><br><strong>Options</strong><br><u>Null preserving:</u> If the current byte is 0x00 or the same as the key, skip it.<br><br><u>Scheme:</u><ul><li>Standard - key is unchanged after each round</li><li>Input differential - key is set to the value of the previous unprocessed byte</li><li>Output differential - key is set to the value of the previous processed byte</li><li>Cascade - key is set to the input byte shifted by one</li></ul>";
        this.infoURL = "https://wikipedia.org/wiki/XOR";
        this.inputType = "ArrayBuffer";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": BITWISE_OP_DELIMS
            },
            {
                "name": "Scheme",
                "type": "option",
                "value": ["Standard", "Input differential", "Output differential", "Cascade"]
            },
            {
                "name": "Null preserving",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const key = Utils.convertToByteArray(args[0].string || "", args[0].option),
            [, scheme, nullPreserving] = args;

        return bitOp(input, key, xor, nullPreserving, scheme);
    }

    /**
     * Highlight XOR
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight XOR in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default XOR;
