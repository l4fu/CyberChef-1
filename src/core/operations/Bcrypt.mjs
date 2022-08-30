/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import bcrypt from "bcryptjs";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Bcrypt operation
 */
class Bcrypt extends Operation {

    /**
     * Bcrypt constructor
     */
    constructor() {
        super();

        this.name = "Bcrypt";
        this.module = "Crypto";
        this.description = "bcrypt是一种密码散列函数,由Niels Provos和David Mazi0xe8res设计,基于Blowfish密码,并于1999年在USENIX上提出。除了结合salt以防止彩虹表攻击外,bcrypt还是一种自适应函数：随着时间的推移,迭代计数（轮数）可以增加,使其变慢,因此,即使计算能力不断提高,它仍能抵抗暴力搜索攻击<br><br>在输入中输入密码以生成其散列。bcrypt is a password hashing function designed by Niels Provos and David Mazi\xe8res, based on the Blowfish cipher, and presented at USENIX in 1999. Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function: over time, the iteration count （rounds） can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power.<br><br>Enter the password in the input to generate its hash.";
        this.infoURL = "https://wikipedia.org/wiki/Bcrypt";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Rounds",
                "type": "number",
                "value": 10
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const rounds = args[0];
        const salt = await bcrypt.genSalt(rounds);

        return await bcrypt.hash(input, salt, null, p => {
            // Progress callback
            if (isWorkerEnvironment())
                self.sendStatusMessage(`Progress: ${(p * 100).toFixed(0)}%`);
        });

    }

}

export default Bcrypt;
