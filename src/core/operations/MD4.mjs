/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * MD4 operation
 */
class MD4 extends Operation {

    /**
     * MD4 constructor
     */
    constructor() {
        super();

        this.name = "MD4";
        this.module = "Crypto";
        this.local="";
        this.description = "MD4（消息摘要4）算法是Ronald Rivest于1990年开发的一种加密哈希函数。摘要长度为128位。该算法影响了后来的设计，如MD5、SHA-1和RIPEMD算法<br><br>MD4的安全性已严重受损。The MD4 (Message-Digest 4) algorithm is a cryptographic hash function developed by Ronald Rivest in 1990. The digest length is 128 bits. The algorithm has influenced later designs, such as the MD5, SHA-1 and RIPEMD algorithms.<br><br>The security of MD4 has been severely compromised.";
        this.infoURL = "https://wikipedia.org/wiki/MD4";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("md4", input);
    }

}

export default MD4;
