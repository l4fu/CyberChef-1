/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * SHA2 operation
 */
class SHA2 extends Operation {

    /**
     * SHA2 constructor
     */
    constructor() {
        super();

        this.name = "SHA2";
        this.module = "Crypto";
        this.local="";
        this.description = "SHA-2（安全哈希算法2）哈希函数由NSA设计。SHA-2与其前身SHA-1相比有重大变化。SHA-4系列由具有摘要（哈希值）的哈希函数组成，摘要为224、256、384或512位：SHA224、SHA256、SHA384、SHA512。<br><br><ul><li>SHA-512对64位字进行操作</li><li>SHA-256对32位字进行操作</SHA-384与SHA-512基本相同，但被截断为384字节</li><li>SHA-224与SHA-256基本相同，但被截断为224字节</li><li>SHA-512/224和SHA-512/256是SHA-510的截断版本，但初始值是使用联邦信息处理标准（FIPS）PUB 180-4中描述的方法生成的。</li></ul>SHA256变体的消息摘要算法默认由64轮组成，对于SHA512变体，默认为160轮。The SHA-2 (Secure Hash Algorithm 2) hash functions were designed by the NSA. SHA-2 includes significant changes from its predecessor, SHA-1. The SHA-2 family consists of hash functions with digests (hash values) that are 224, 256, 384 or 512 bits: SHA224, SHA256, SHA384, SHA512.<br><br><ul><li>SHA-512 operates on 64-bit words.</li><li>SHA-256 operates on 32-bit words.</li><li>SHA-384 is largely identical to SHA-512 but is truncated to 384 bytes.</li><li>SHA-224 is largely identical to SHA-256 but is truncated to 224 bytes.</li><li>SHA-512/224 and SHA-512/256 are truncated versions of SHA-512, but the initial values are generated using the method described in Federal Information Processing Standards (FIPS) PUB 180-4.</li></ul> The message digest algorithm for SHA256 variants consists, by default, of 64 rounds, and for SHA512 variants, it is, by default, 160.";
        this.infoURL = "https://wikipedia.org/wiki/SHA-2";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Size",
                type: "argSelector",
                value: [
                    {
                        name: "512",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "384",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "256",
                        on: [1],
                        off: [2]
                    },
                    {
                        name: "224",
                        on: [1],
                        off: [2]
                    },
                    {
                        name: "512/256",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "512/224",
                        on: [2],
                        off: [1]
                    }
                ]
            },
            {
                name: "Rounds", // For SHA256 variants
                type: "number",
                value: 64,
                min: 16
            },
            {
                name: "Rounds", // For SHA512 variants
                type: "number",
                value: 160,
                min: 32
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const size = args[0];
        const rounds = (size === "256" || size === "224") ? args[1] : args[2];
        return runHash("sha" + size, input, {rounds: rounds});
    }

}

export default SHA2;
