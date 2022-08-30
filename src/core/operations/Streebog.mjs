/**
 * @author mshwed [m@ttshwed.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import GostDigest from "../vendor/gost/gostDigest.mjs";
import {toHexFast} from "../lib/Hex.mjs";

/**
 * Streebog operation
 */
class Streebog extends Operation {

    /**
     * Streebog constructor
     */
    constructor() {
        super();

        this.name = "Streebog";
        this.module = "Hashing";
        this.local="";
        this.description = "Streebog是俄罗斯国家标准GOST R 34.11-2012中定义的加密散列函数。它的创建是为了取代旧标准GOST R 34.11-94中定义的过时GOST哈希函数，并作为美国国家标准与技术研究所对SHA-3竞争的非对称回复。Streebog is a cryptographic hash function defined in the Russian national standard GOST R 34.11-2012 <i>Information Technology \u2013 Cryptographic Information Security \u2013 Hash Function</i>. It was created to replace an obsolete GOST hash function defined in the old standard GOST R 34.11-94, and as an asymmetric reply to SHA-3 competition by the US National Institute of Standards and Technology.";
        this.infoURL = "https://wikipedia.org/wiki/Streebog";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size",
                "type": "option",
                "value": ["256", "512"]
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
            const length = parseInt(args[0], 10);
            const gostDigest = new GostDigest({
                name: "GOST R 34.11",
                version: 2012,
                length: length
            });

            return toHexFast(gostDigest.digest(input));
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default Streebog;
