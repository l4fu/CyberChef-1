/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import crypto from "crypto";
import { encode } from "../lib/CipherSaber2.mjs";
import Utils from "../Utils.mjs";

/**
 * CipherSaber2 Encrypt operation
 */
class CipherSaber2Encrypt extends Operation {

    /**
     * CipherSaber2Encrypt constructor
     */
    constructor() {
        super();

        this.name = "CipherSaber2 Encrypt";
        this.module = "Crypto";
        this.local="";
        this.description = "CipherSaber是基于RC4流密码的简单对称加密协议。它对消息保密性提供了相当强的保护，但它设计得足够简单，即使是新手程序员也可以记住算法并从头开始实现。CipherSaber is a simple symmetric encryption protocol based on the RC4 stream cipher. It gives reasonably strong protection of message confidentiality, yet it's designed to be simple enough that even novice programmers can memorize the algorithm and implement it from scratch.";
        this.infoURL = "https://wikipedia.org/wiki/CipherSaber";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "Key",
                type: "toggleString",
                value: "",
                toggleValues: ["Hex", "UTF8", "Latin1", "Base64"]
            },
            {
                name: "Rounds",
                type: "number",
                value: 20
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const result = [],
            key = Utils.convertToByteArray(args[0].string, args[0].option),
            rounds = args[1];

        // Assign into initialisation vector based on cipher mode.
        const tempIVP = crypto.randomBytes(10);
        for (let m = 0; m < 10; m++)
            result.push(tempIVP[m]);

        return new Uint8Array(result.concat(encode(tempIVP, key, rounds, input))).buffer;
    }

}

export default CipherSaber2Encrypt;
