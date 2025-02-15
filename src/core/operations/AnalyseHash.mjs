/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Analyse hash operation
 */
class AnalyseHash extends Operation {

    /**
     * AnalyseHash constructor
     */
    constructor() {
        super();

        this.name = "Analyse hash";
        this.module = "Crypto";
        this.local="";
        this.description = "尝试确定关于给定散列的信息,并根据其长度建议可能已使用哪个算法生成该散列。Tries to determine information about a given hash and suggests which algorithm may have been used to generate it based on its length.";
        this.infoURL = "https://wikipedia.org/wiki/Comparison_of_cryptographic_hash_functions";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        input = input.replace(/\s/g, "");

        let output = "",
            possibleHashFunctions = [];
        const byteLength = input.length / 2,
            bitLength = byteLength * 8;

        if (!/^[a-f0-9]+$/i.test(input)) {
            throw new OperationError("Invalid hash");
        }

        output += "Hash length: " + input.length + "\n" +
            "Byte length: " + byteLength + "\n" +
            "Bit length:  " + bitLength + "\n\n" +
            "Based on the length, this hash could have been generated by one of the following hashing functions:\n";

        switch (bitLength) {
            case 4:
                possibleHashFunctions = [
                    "Fletcher-4",
                    "Luhn algorithm",
                    "Verhoeff algorithm",
                ];
                break;
            case 8:
                possibleHashFunctions = [
                    "Fletcher-8",
                ];
                break;
            case 16:
                possibleHashFunctions = [
                    "BSD checksum",
                    "CRC-16",
                    "SYSV checksum",
                    "Fletcher-16"
                ];
                break;
            case 32:
                possibleHashFunctions = [
                    "CRC-32",
                    "Fletcher-32",
                    "Adler-32",
                ];
                break;
            case 64:
                possibleHashFunctions = [
                    "CRC-64",
                    "RIPEMD-64",
                    "SipHash",
                ];
                break;
            case 128:
                possibleHashFunctions = [
                    "MD5",
                    "MD4",
                    "MD2",
                    "HAVAL-128",
                    "RIPEMD-128",
                    "Snefru",
                    "Tiger-128",
                ];
                break;
            case 160:
                possibleHashFunctions = [
                    "SHA-1",
                    "SHA-0",
                    "FSB-160",
                    "HAS-160",
                    "HAVAL-160",
                    "RIPEMD-160",
                    "Tiger-160",
                ];
                break;
            case 192:
                possibleHashFunctions = [
                    "Tiger",
                    "HAVAL-192",
                ];
                break;
            case 224:
                possibleHashFunctions = [
                    "SHA-224",
                    "SHA3-224",
                    "ECOH-224",
                    "FSB-224",
                    "HAVAL-224",
                ];
                break;
            case 256:
                possibleHashFunctions = [
                    "SHA-256",
                    "SHA3-256",
                    "BLAKE-256",
                    "ECOH-256",
                    "FSB-256",
                    "GOST",
                    "Grøstl-256",
                    "HAVAL-256",
                    "PANAMA",
                    "RIPEMD-256",
                    "Snefru",
                ];
                break;
            case 320:
                possibleHashFunctions = [
                    "RIPEMD-320",
                ];
                break;
            case 384:
                possibleHashFunctions = [
                    "SHA-384",
                    "SHA3-384",
                    "ECOH-384",
                    "FSB-384",
                ];
                break;
            case 512:
                possibleHashFunctions = [
                    "SHA-512",
                    "SHA3-512",
                    "BLAKE-512",
                    "ECOH-512",
                    "FSB-512",
                    "Grøstl-512",
                    "JH",
                    "MD6",
                    "Spectral Hash",
                    "SWIFFT",
                    "Whirlpool",
                ];
                break;
            case 1024:
                possibleHashFunctions = [
                    "Fowler-Noll-Vo",
                ];
                break;
            default:
                possibleHashFunctions = [
                    "Unknown"
                ];
                break;
        }

        return output + possibleHashFunctions.join("\n");
    }

}

export default AnalyseHash;
