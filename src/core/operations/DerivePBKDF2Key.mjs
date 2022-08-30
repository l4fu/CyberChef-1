/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import forge from "node-forge";

/**
 * Derive PBKDF2 key operation
 */
class DerivePBKDF2Key extends Operation {

    /**
     * DerivePBKDF2Key constructor
     */
    constructor() {
        super();

        this.name = "Derive PBKDF2 key";
        this.module = "Ciphers";
        this.local="";
        this.description = "PBKDF2是基于密码的密钥导出函数。它是RSA实验室公钥密码标准（PKCS）系列的一部分,特别是PKCS#5 v2.0,也作为互联网工程任务组的RFC 2898发布。<br><br>在许多密码应用中,用户安全最终取决于密码,因为密码通常不能直接用作密码密钥,因此需要进行一些处理<br><br>salt为任何给定密码提供了大量密钥集,迭代次数增加了从密码生成密钥的成本,从而也增加了攻击的难度<br><br>如果将salt参数保留为空,将生成随机salt。PBKDF2 is a password-based key derivation function. It is part of RSA Laboratories' Public-Key Cryptography Standards (PKCS) series, specifically PKCS #5 v2.0, also published as Internet Engineering Task Force's RFC 2898.<br><br>In many applications of cryptography, user security is ultimately dependent on a password, and because a password usually can't be used directly as a cryptographic key, some processing is required.<br><br>A salt provides a large set of keys for any given password, and an iteration count increases the cost of producing keys from a password, thereby also increasing the difficulty of attack.<br><br>If you leave the salt argument empty, a random salt will be generated.";
        this.infoURL = "https://wikipedia.org/wiki/PBKDF2";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Passphrase",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["UTF8", "Latin1", "Hex", "Base64"]
            },
            {
                "name": "Key size",
                "type": "number",
                "value": 128
            },
            {
                "name": "Iterations",
                "type": "number",
                "value": 1
            },
            {
                "name": "Hashing function",
                "type": "option",
                "value": ["SHA1", "SHA256", "SHA384", "SHA512", "MD5"]
            },
            {
                "name": "Salt",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Hex", "UTF8", "Latin1", "Base64"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const passphrase = Utils.convertToByteString(args[0].string, args[0].option),
            keySize = args[1],
            iterations = args[2],
            hasher = args[3],
            salt = Utils.convertToByteString(args[4].string, args[4].option) ||
                forge.random.getBytesSync(keySize),
            derivedKey = forge.pkcs5.pbkdf2(passphrase, salt, iterations, keySize / 8, hasher.toLowerCase());

        return forge.util.bytesToHex(derivedKey);
    }

}

export default DerivePBKDF2Key;
