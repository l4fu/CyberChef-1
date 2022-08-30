/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * HAS-160 operation
 */
class HAS160 extends Operation {

    /**
     * HAS-160 constructor
     */
    constructor() {
        super();

        this.name = "HAS-160";
        this.module = "Crypto";
        this.local="";
        this.description = "HAS-160是一种加密散列函数,设计用于韩国KCDSA数字签名算法。它源于SHA-1,有各种旨在提高其安全性的更改。它产生160位输出<br><br>HAS-160的使用方式与SHA-1相同。首先,它将输入分成每个512位的块,并填充最后一个块。摘要函数通过依次处理输入块来更新中间哈希值<br><br>默认情况下,消息摘要算法由80轮组成。HAS-160 is a cryptographic hash function designed for use with the Korean KCDSA digital signature algorithm. It is derived from SHA-1, with assorted changes intended to increase its security. It produces a 160-bit output.<br><br>HAS-160 is used in the same way as SHA-1. First it divides input in blocks of 512 bits each and pads the final block. A digest function updates the intermediate hash value by processing the input blocks in turn.<br><br>The message digest algorithm consists, by default, of 80 rounds.";
        this.infoURL = "https://wikipedia.org/wiki/HAS-160";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Rounds",
                type: "number",
                value: 80,
                min: 1,
                max: 80
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("has160", input, {rounds: args[0]});
    }

}

export default HAS160;
