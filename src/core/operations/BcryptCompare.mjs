/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import bcrypt from "bcryptjs";
import { isWorkerEnvironment } from "../Utils.mjs";


/**
 * Bcrypt compare operation
 */
class BcryptCompare extends Operation {

    /**
     * BcryptCompare constructor
     */
    constructor() {
        super();

        this.name = "Bcrypt compare";
        this.module = "Crypto";
        this.local="";
        this.description = "测试输入是否与给定的bcrypt哈希匹配。要测试多个可能的密码,请使用“Fork”操作。Tests whether the input matches the given bcrypt hash. To test multiple possible passwords, use the 'Fork' operation.";
        this.infoURL = "https://wikipedia.org/wiki/Bcrypt";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Hash",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const hash = args[0];

        const match = await bcrypt.compare(input, hash, null, p => {
            // Progress callback
            if (isWorkerEnvironment())
                self.sendStatusMessage(`Progress: ${(p * 100).toFixed(0)}%`);
        });

        return match ? "Match: " + input : "No match";

    }

}

export default BcryptCompare;
