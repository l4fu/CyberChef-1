/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import otp from "otp";
import ToBase32 from "./ToBase32.mjs";

/**
 * Generate HOTP operation
 */
class GenerateHOTP extends Operation {

    /**
     * GenerateHOTP constructor
     */
    constructor() {
        super();

        this.name = "Generate HOTP";
        this.module = "Default";
        this.local="";
        this.description = "基于HMAC的一次性密码算法（HOTP）是一种根据共享密钥和递增计数器计算一次性密码的算法。它已被采纳为互联网工程任务组标准RFC 4226,是开放身份验证倡议（OAUTH）的基石,并在许多双因素身份验证系统中使用<br><br>输入密码作为输入,或将其保留为空白,以生成随机密码。The HMAC-based One-Time Password algorithm (HOTP) is an algorithm that computes a one-time password from a shared secret key and an incrementing counter. It has been adopted as Internet Engineering Task Force standard RFC 4226, is the cornerstone of Initiative For Open Authentication (OAUTH), and is used in a number of two-factor authentication systems.<br><br>Enter the secret as the input or leave it blank for a random secret to be generated.";
        this.infoURL = "https://wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Name",
                "type": "string",
                "value": ""
            },
            {
                "name": "Key size",
                "type": "number",
                "value": 32
            },
            {
                "name": "Code length",
                "type": "number",
                "value": 6
            },
            {
                "name": "Counter",
                "type": "number",
                "value": 0
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const otpObj = otp({
            name: args[0],
            keySize: args[1],
            codeLength: args[2],
            secret: (new ToBase32).run(input, []).split("=")[0],
        });
        const counter = args[3];
        return `URI: ${otpObj.hotpURL}\n\nPassword: ${otpObj.hotp(counter)}`;
    }

}

export default GenerateHOTP;
