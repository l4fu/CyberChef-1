/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Affine Cipher Decode operation
 */
class AffineCipherDecode extends Operation {

    /**
     * AffineCipherDecode constructor
     */
    constructor() {
        super();

        this.name = "Affine Cipher Decode";
        this.module = "Ciphers";
        this.local="";
        this.description = "仿射密码是一种单字母替换密码。为了解密,字母表中的每个字母被映射到其数字等价物,由数学函数解密,并转换回字母。The Affine cipher is a type of monoalphabetic substitution cipher. To decrypt, each letter in an alphabet is mapped to its numeric equivalent, decrypted by a mathematical function, and converted back to a letter.";
        this.infoURL = "https://wikipedia.org/wiki/Affine_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "a",
                "type": "number",
                "value": 1
            },
            {
                "name": "b",
                "type": "number",
                "value": 0
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if a or b values are invalid
     */
    run(input, args) {
        const alphabet = "abcdefghijklmnopqrstuvwxyz",
            [a, b] = args,
            aModInv = Utils.modInv(a, 26); // Calculates modular inverse of a
        let output = "";

        if (!/^\+?(0|[1-9]\d*)$/.test(a) || !/^\+?(0|[1-9]\d*)$/.test(b)) {
            throw new OperationError("The values of a and b can only be integers.");
        }

        if (Utils.gcd(a, 26) !== 1) {
            throw new OperationError("The value of `a` must be coprime to 26.");
        }

        for (let i = 0; i < input.length; i++) {
            if (alphabet.indexOf(input[i]) >= 0) {
                // Uses the affine decode function (y-b * A') % m = x (where m is length of the alphabet and A' is modular inverse)
                output += alphabet[Utils.mod((alphabet.indexOf(input[i]) - b) * aModInv, 26)];
            } else if (alphabet.indexOf(input[i].toLowerCase()) >= 0) {
                // Same as above, accounting for uppercase
                output += alphabet[Utils.mod((alphabet.indexOf(input[i].toLowerCase()) - b) * aModInv, 26)].toUpperCase();
            } else {
                // Non-alphabetic characters
                output += input[i];
            }
        }
        return output;
    }

    /**
     * Highlight Affine Cipher Decode
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
     * Highlight Affine Cipher Decode in reverse
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

export default AffineCipherDecode;
