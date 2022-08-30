/**
 * @author GCHQ Contributor [3]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Protobuf from "../lib/Protobuf.mjs";

/**
 * VarInt Decode operation
 */
class VarIntDecode extends Operation {

    /**
     * VarIntDecode constructor
     */
    constructor() {
        super();

        this.name = "VarInt Decode";
        this.module = "Default";
        this.local="";
        this.description = "解码可变编码整数。VarInt是编码可变长度整数的一种有效方法，通常与Protobuf一起使用。Decodes a VarInt encoded integer. VarInt is an efficient way of encoding variable length integers and is commonly used with Protobuf.";
        this.infoURL = "https://developers.google.com/protocol-buffers/docs/encoding#varints";
        this.inputType = "byteArray";
        this.outputType = "number";
        this.args = [];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        try {
            return Protobuf.varIntDecode(input);
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default VarIntDecode;
