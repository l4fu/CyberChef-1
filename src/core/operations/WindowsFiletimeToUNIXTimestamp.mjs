/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import BigNumber from "bignumber.js";
import OperationError from "../errors/OperationError.mjs";

/**
 * Windows Filetime to UNIX Timestamp operation
 */
class WindowsFiletimeToUNIXTimestamp extends Operation {

    /**
     * WindowsFiletimeToUNIXTimestamp constructor
     */
    constructor() {
        super();

        this.name = "Windows Filetime to UNIX Timestamp";
        this.module = "Default";
        this.local="";
        this.description = "将Windows文件时间值转换为UNIX时间戳<br><br>Windows Filetime是一个64位值，表示自1601年1月1日UTC以来的100纳秒间隔数<br><br>UNIX时间戳是一个32位值，表示自1970年1月1日UTC（UNIX纪元）以来的秒数<br><br>此操作还支持以毫秒、微秒和纳秒为单位的UNIX时间戳。Converts a Windows Filetime value to a UNIX timestamp.<br><br>A Windows Filetime is a 64-bit value representing the number of 100-nanosecond intervals since January 1, 1601 UTC.<br><br>A UNIX timestamp is a 32-bit value representing the number of seconds since January 1, 1970 UTC (the UNIX epoch).<br><br>This operation also supports UNIX timestamps in milliseconds, microseconds and nanoseconds.";
        this.infoURL = "https://msdn.microsoft.com/en-us/library/windows/desktop/ms724284(v=vs.85).aspx";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Output units",
                "type": "option",
                "value": ["Seconds (s)", "Milliseconds (ms)", "Microseconds (μs)", "Nanoseconds (ns)"]
            },
            {
                "name": "Input format",
                "type": "option",
                "value": ["Decimal", "Hex (big endian)", "Hex (little endian)"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [units, format] = args;

        if (!input) return "";

        if (format === "Hex (little endian)") {
            // Swap endianness
            let result = "";
            for (let i = input.length - 2; i >= 0; i -= 2) {
                result += input.charAt(i);
                result += input.charAt(i + 1);
            }
            input = result;
        }

        if (format.startsWith("Hex")) {
            input = new BigNumber(input, 16);
        } else {
            input = new BigNumber(input);
        }

        input = input.minus(new BigNumber("116444736000000000"));

        if (units === "Seconds (s)") {
            input = input.dividedBy(new BigNumber("10000000"));
        } else if (units === "Milliseconds (ms)") {
            input = input.dividedBy(new BigNumber("10000"));
        } else if (units === "Microseconds (μs)") {
            input = input.dividedBy(new BigNumber("10"));
        } else if (units === "Nanoseconds (ns)") {
            input = input.multipliedBy(new BigNumber("100"));
        } else {
            throw new OperationError("Unrecognised unit");
        }

        return input.toFixed();
    }

}

export default WindowsFiletimeToUNIXTimestamp;
