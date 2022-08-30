/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import bson from "bson";
import OperationError from "../errors/OperationError.mjs";

/**
 * BSON deserialise operation
 */
class BSONDeserialise extends Operation {

    /**
     * BSONDeserialise constructor
     */
    constructor() {
        super();

        this.name = "BSON deserialise";
        this.module = "Serialise";
        this.local="";
        this.description = "BSON是一种计算机数据交换格式,主要用作MongoDB数据库中的数据存储和网络传输格式。它是一种二进制形式,用于表示简单的数据结构、关联数组（在MongoDB中称为对象或文档）以及MongoDB特别感兴趣的各种数据类型。名称“BSON”基于术语JSON,代表“二进制JSON”<br><br>输入数据应为原始字节格式。BSON is a computer data interchange format used mainly as a data storage and network transfer format in the MongoDB database. It is a binary form for representing simple data structures, associative arrays (called objects or documents in MongoDB), and various data types of specific interest to MongoDB. The name 'BSON' is based on the term JSON and stands for 'Binary JSON'.<br><br>Input data should be in a raw bytes format.";
        this.infoURL = "https://wikipedia.org/wiki/BSON";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input.byteLength) return "";

        try {
            const data = bson.deserialize(new Buffer(input));
            return JSON.stringify(data, null, 2);
        } catch (err) {
            throw new OperationError(err.toString());
        }
    }

}

export default BSONDeserialise;
