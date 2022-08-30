/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * Whirlpool operation
 */
class Whirlpool extends Operation {

    /**
     * Whirlpool constructor
     */
    constructor() {
        super();

        this.name = "Whirlpool";
        this.module = "Crypto";
        this.local="";
        this.description = "Whirlpool是由Vincent Rijmen（AES的共同创始人）和Paulo S.L.M.Barreto设计的加密散列函数，他们在2000年首次描述了它。<br><br>存在几种变体：<ul><li>Whirlpool0是2000年发布的原始版本。</li><li>Whirlpoul-T是2001年发布的第一个版本，改进了S-box的生成</li><li>惠而浦是2003年发布的最新版本，修复了扩散矩阵中的一个缺陷。</li></ul>Whirlpool is a cryptographic hash function designed by Vincent Rijmen (co-creator of AES) and Paulo S. L. M. Barreto, who first described it in 2000.<br><br>Several variants exist:<ul><li>Whirlpool-0 is the original version released in 2000.</li><li>Whirlpool-T is the first revision, released in 2001, improving the generation of the s-box.</li><li>Whirlpool is the latest revision, released in 2003, fixing a flaw in the diffusion matrix.</li></ul>";
        this.infoURL = "https://wikipedia.org/wiki/Whirlpool_(cryptography)";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Variant",
                type: "option",
                value: ["Whirlpool", "Whirlpool-T", "Whirlpool-0"]
            },
            {
                name: "Rounds",
                type: "number",
                value: 10,
                min: 1,
                max: 10
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const variant = args[0].toLowerCase();
        return runHash(variant, input, {rounds: args[1]});
    }

}

export default Whirlpool;
