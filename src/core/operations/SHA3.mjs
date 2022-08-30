/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import JSSHA3 from "js-sha3";
import OperationError from "../errors/OperationError.mjs";

/**
 * SHA3 operation
 */
class SHA3 extends Operation {

    /**
     * SHA3 constructor
     */
    constructor() {
        super();

        this.name = "SHA3";
        this.module = "Crypto";
        this.local="";
        this.description = "SHA-3（安全散列算法3）散列函数于2015年8月5日由NIST发布。虽然是同一系列标准的一部分,但SHA-1和SHA-2的类似MD5的结构在内部有很大不同。<br><br>SHA-4是由Guido Bertoni、Joan Daemen、Micha\ xebl Peeters和Gilles Van Assche设计的更广泛的密码原语家族Keccak的子集,基于Radioat的建筑\ xfan。The SHA-3 (Secure Hash Algorithm 3) hash functions were released by NIST on August 5, 2015. Although part of the same series of standards, SHA-3 is internally quite different from the MD5-like structure of SHA-1 and SHA-2.<br><br>SHA-3 is a subset of the broader cryptographic primitive family Keccak designed by Guido Bertoni, Joan Daemen, Micha\xebl Peeters, and Gilles Van Assche, building upon RadioGat\xfan.";
        this.infoURL = "https://wikipedia.org/wiki/SHA-3";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size",
                "type": "option",
                "value": ["512", "384", "256", "224"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const size = parseInt(args[0], 10);
        let algo;

        switch (size) {
            case 224:
                algo = JSSHA3.sha3_224;
                break;
            case 384:
                algo = JSSHA3.sha3_384;
                break;
            case 256:
                algo = JSSHA3.sha3_256;
                break;
            case 512:
                algo = JSSHA3.sha3_512;
                break;
            default:
                throw new OperationError("Invalid size");
        }

        return algo(input);
    }

}

export default SHA3;
