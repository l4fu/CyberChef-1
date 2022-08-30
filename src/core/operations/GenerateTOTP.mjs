/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import otp from "otp";
import ToBase32 from "./ToBase32.mjs";

/**
 * Generate TOTP operation
 */
class GenerateTOTP extends Operation {

    /**
     * GenerateTOTP constructor
     */
    constructor() {
        super();

        this.name = "Generate TOTP";
        this.module = "Default";
        this.local="";
        this.description = "基于时间的一次性密码算法（TOTP）是一种根据共享密钥和当前时间计算一次性密码的算法。它已被采纳为互联网工程任务组标准RFC 6238,是开放身份验证倡议（OAUTH）的基石,并在许多双因素身份验证系统中使用。TOTP是一种HOTP,其中计数器为当前时间<br><br>输入密码作为输入,或将其保留为空白,以生成随机密码。T0和T1以秒为单位。The Time-based One-Time Password algorithm (TOTP) is an algorithm that computes a one-time password from a shared secret key and the current time. It has been adopted as Internet Engineering Task Force standard RFC 6238, is the cornerstone of Initiative For Open Authentication (OAUTH), and is used in a number of two-factor authentication systems. A TOTP is an HOTP where the counter is the current time.<br><br>Enter the secret as the input or leave it blank for a random secret to be generated. T0 and T1 are in seconds.";
        this.infoURL = "https://wikipedia.org/wiki/Time-based_One-time_Password_algorithm";
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
                "name": "Epoch offset (T0)",
                "type": "number",
                "value": 0
            },
            {
                "name": "Interval (T1)",
                "type": "number",
                "value": 30
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
            epoch: args[3],
            timeSlice: args[4]
        });
        return `URI: ${otpObj.totpURL}\n\nPassword: ${otpObj.totp()}`;
    }

}

export default GenerateTOTP;
