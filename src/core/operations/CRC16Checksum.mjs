/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import JSCRC from "js-crc";

/**
 * CRC-16 Checksum operation
 */
class CRC16Checksum extends Operation {

    /**
     * CRC16Checksum constructor
     */
    constructor() {
        super();

        this.name = "CRC-16 Checksum";
        this.module = "Crypto";
        this.local="";
        this.description = "循环冗余校验（CRC）是数字网络和存储设备中常用的错误检测码，用于检测原始数据的意外变化<br><br>CRC由W.韦斯利·彼得森于1961年发明。A cyclic redundancy check (CRC) is an error-detecting code commonly used in digital networks and storage devices to detect accidental changes to raw data.<br><br>The CRC was invented by W. Wesley Peterson in 1961.";
        this.infoURL = "https://wikipedia.org/wiki/Cyclic_redundancy_check";
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
        return JSCRC.crc16(input);
    }

}

export default CRC16Checksum;
