/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import GostDigest from "../vendor/gost/gostDigest.mjs";
import {toHexFast} from "../lib/Hex.mjs";

/**
 * GOST hash operation
 */
class GOSTHash extends Operation {

    /**
     * GOSTHash constructor
     */
    constructor() {
        super();

        this.name = "GOST hash";
        this.module = "Hashing";
        this.local="";
        this.description = "在标准GOST R 34.11-94和GOST 34.311-95中定义的GOST哈希函数是256位加密哈希函数。它最初在俄罗斯国家标准GOST R 34.11-94《信息技术——密码信息安全——散列函数》中定义。独联体其他成员国使用的等效标准为GOST 34.311-95。<br><br>此函数不得与标准GOST R 34.11-2012的新版本中定义的不同Streebog哈希函数混淆。<br>GOST哈希函数基于GOST分组密码。The GOST hash function, defined in the standards GOST R 34.11-94 and GOST 34.311-95 is a 256-bit cryptographic hash function. It was initially defined in the Russian national standard GOST R 34.11-94 <i>Information Technology – Cryptographic Information Security – Hash Function</i>. The equivalent standard used by other member-states of the CIS is GOST 34.311-95.<br><br>This function must not be confused with a different Streebog hash function, which is defined in the new revision of the standard GOST R 34.11-2012.<br><br>The GOST hash function is based on the GOST block cipher.";
        this.infoURL = "https://wikipedia.org/wiki/GOST_(hash_function)";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "S-Box",
                "type": "option",
                "value": [
                    "D-A",
                    "D-SC",
                    "E-TEST",
                    "E-A",
                    "E-B",
                    "E-C",
                    "E-D",
                    "E-SC",
                    "E-Z",
                    "D-TEST"
                ]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        try {
            const sBox = args[1];
            const gostDigest = new GostDigest({
                name: "GOST R 34.11",
                version: 1994,
                sBox: sBox
            });

            return toHexFast(gostDigest.digest(input));
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default GOSTHash;
