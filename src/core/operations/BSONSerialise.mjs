/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import bson from "bson";
import OperationError from "../errors/OperationError.mjs";

/**
 * BSON serialise operation
 */
class BSONSerialise extends Operation {

    /**
     * BSONSerialise constructor
     */
    constructor() {
        super();

        this.name = "BSON serialise";
        this.module = "Serialise";
        this.local="";
        this.description = "BSON是一种计算机数据交换格式,主要用作MongoDB数据库中的数据存储和网络传输格式。它是一种二进制形式,用于表示简单的数据结构、关联数组（在MongoDB中称为对象或文档）以及MongoDB特别感兴趣的各种数据类型。名称“BSON”基于术语JSON,代表“二进制JSON”<br><br>输入数据应为有效的JSON。BSON is a computer data interchange format used mainly as a data storage and network transfer format in the MongoDB database. It is a binary form for representing simple data structures, associative arrays (called objects or documents in MongoDB), and various data types of specific interest to MongoDB. The name 'BSON' is based on the term JSON and stands for 'Binary JSON'.<br><br>Input data should be valid JSON.";
        this.infoURL = "https://wikipedia.org/wiki/BSON";
        this.inputType = "string";
        this.outputType = "ArrayBuffer";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        if (!input) return new ArrayBuffer();

        try {
            const data = JSON.parse(input);
            return bson.serialize(data).buffer;
        } catch (err) {
            throw new OperationError(err.toString());
        }
    }

}

export default BSONSerialise;
