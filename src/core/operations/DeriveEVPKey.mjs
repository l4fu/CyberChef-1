/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import CryptoJS from "crypto-js";

/**
 * Derive EVP key operation
 */
class DeriveEVPKey extends Operation {

    /**
     * DeriveEVPKey constructor
     */
    constructor() {
        super();

        this.name = "Derive EVP key";
        this.module = "Ciphers";
        this.local="";
        this.description = "此操作执行OpenSSL中广泛使用的基于密码的密钥导出函数（PBKDF）。在许多密码学应用中,用户安全最终取决于密码,因为密码通常不能直接用作密码密钥,因此需要进行一些处理<br><br>salt为任何给定密码提供了大量密钥集,迭代次数增加了从密码生成密钥的成本,从而也增加了攻击的难度<br><br>如果将salt参数保留为空,将生成随机salt。This operation performs a password-based key derivation function (PBKDF) used extensively in OpenSSL. In many applications of cryptography, user security is ultimately dependent on a password, and because a password usually can't be used directly as a cryptographic key, some processing is required.<br><br>A salt provides a large set of keys for any given password, and an iteration count increases the cost of producing keys from a password, thereby also increasing the difficulty of attack.<br><br>If you leave the salt argument empty, a random salt will be generated.";
        this.infoURL = "https://wikipedia.org/wiki/Key_derivation_function";
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
            keySize = args[1] / 32,
            iterations = args[2],
            hasher = args[3],
            salt = Utils.convertToByteString(args[4].string, args[4].option),
            key = CryptoJS.EvpKDF(passphrase, salt, { // lgtm [js/insufficient-password-hash]
                keySize: keySize,
                hasher: CryptoJS.algo[hasher],
                iterations: iterations,
            });

        return key.toString(CryptoJS.enc.Hex);
    }

}

export default DeriveEVPKey;

/**
 * Overwriting the CryptoJS OpenSSL key derivation function so that it is possible to not pass a
 * salt in.

 * @param {string} password - The password to derive from.
 * @param {number} keySize - The size in words of the key to generate.
 * @param {number} ivSize - The size in words of the IV to generate.
 * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be
 *                 generated randomly. If set to false, no salt will be added.
 *
 * @returns {CipherParams} A cipher params object with the key, IV, and salt.
 *
 * @static
 *
 * @example
 * // Randomly generates a salt
 * var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
 * // Uses the salt 'saltsalt'
 * var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
 * // Does not use a salt
 * var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, false);
 */
CryptoJS.kdf.OpenSSL.execute = function (password, keySize, ivSize, salt) {
    // Generate random salt if no salt specified and not set to false
    // This line changed from `if (!salt) {` to the following
    if (salt === undefined || salt === null) {
        salt = CryptoJS.lib.WordArray.random(64/8);
    }

    // Derive key and IV
    const key = CryptoJS.algo.EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

    // Separate key and IV
    const iv = CryptoJS.lib.WordArray.create(key.words.slice(keySize), ivSize * 4);
    key.sigBytes = keySize * 4;

    // Return params
    return CryptoJS.lib.CipherParams.create({ key: key, iv: iv, salt: salt });
};


/**
 * Override for the CryptoJS Hex encoding parser to remove whitespace before attempting to parse
 * the hex string.
 *
 * @param {string} hexStr
 * @returns {CryptoJS.lib.WordArray}
 */
CryptoJS.enc.Hex.parse = function (hexStr) {
    // Remove whitespace
    hexStr = hexStr.replace(/\s/g, "");

    // Shortcut
    const hexStrLength = hexStr.length;

    // Convert
    const words = [];
    for (let i = 0; i < hexStrLength; i += 2) {
        words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
    }

    return new CryptoJS.lib.WordArray.init(words, hexStrLength / 2);
};
