/**
 * @author dolphinOnKeys [robin@weird.io]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {toBinary} from "../lib/Binary.mjs";

/**
 * Cetacean Cipher Encode operation
 */
class CetaceanCipherEncode extends Operation {

    /**
     * CetaceanCipherEncode constructor
     */
    constructor() {
        super();

        this.name = "Cetacean Cipher Encode";
        this.module = "Ciphers";
        this.local="";
        this.description = "将任何输入转换为鲸类密码<br/><br/>例如,<code>hi</code>变成<code>eeeeeeeeee,eeeeeeEEeeeeee</code>Converts any input into Cetacean Cipher. <br/><br/>e.g. <code>hi</code> becomes <code>EEEEEEEEEeeEeEEEEEEEEEEEEeeEeEEe</code>";
        this.infoURL = "https://hitchhikers.fandom.com/wiki/Dolphins";
        this.inputType = "string";
        this.outputType = "string";
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const result = [];
        const charArray = input.split("");

        charArray.map(character => {
            if (character === " ") {
                result.push(character);
            } else {
                const binaryArray = toBinary(character.charCodeAt(0), "None", 16).split("");
                result.push(binaryArray.map(str => str === "1" ? "e" : "E").join(""));
            }
        });

        return result.join("");
    }
}

export default CetaceanCipherEncode;
