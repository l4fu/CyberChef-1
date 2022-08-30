/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import r from "jsrsasign";
import Operation from "../Operation.mjs";

/**
 * Parse ASN.1 hex string operation
 */
class ParseASN1HexString extends Operation {

    /**
     * ParseASN1HexString constructor
     */
    constructor() {
        super();

        this.name = "Parse ASN.1 hex string";
        this.module = "PublicKey";
        this.local="";
        this.description = "抽象语法符号1（ASN.1）是一种标准和符号,用于描述电信和计算机网络中表示、编码、传输和解码数据的规则和结构<br><br>此操作解析任意ASN。1数据并呈现结果树。Abstract Syntax Notation One (ASN.1) is a standard and notation that describes rules and structures for representing, encoding, transmitting, and decoding data in telecommunications and computer networking.<br><br>This operation parses arbitrary ASN.1 data and presents the resulting tree.";
        this.infoURL = "https://wikipedia.org/wiki/Abstract_Syntax_Notation_One";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Starting index",
                "type": "number",
                "value": 0
            },
            {
                "name": "Truncate octet strings longer than",
                "type": "number",
                "value": 32
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [index, truncateLen] = args;
        return r.ASN1HEX.dump(input.replace(/\s/g, ""), {
            "ommitLongOctet": truncateLen
        }, index);
    }

}

export default ParseASN1HexString;
