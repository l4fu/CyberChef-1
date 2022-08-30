/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Decode NetBIOS Name operation
 */
class DecodeNetBIOSName extends Operation {

    /**
     * DecodeNetBIOSName constructor
     */
    constructor() {
        super();

        this.name = "Decode NetBIOS Name";
        this.module = "Default";
        this.local="";
        this.description = "在NetBIOS的客户端接口上看到的NetBIOS名称正好是16字节长。在TCP协议上的NetBIOS中，使用了更长的表示形式<br><br>有两种编码级别。第一级将NetBIOS名称映射到域系统名称。第二级将域名系统名称映射到与域名系统交互所需的“压缩”表示<br><br>此操作对第一级编码进行解码。有关详细信息，请参见RFC 1001。NetBIOS names as seen across the client interface to NetBIOS are exactly 16 bytes long. Within the NetBIOS-over-TCP protocols, a longer representation is used.<br><br>There are two levels of encoding. The first level maps a NetBIOS name into a domain system name.  The second level maps the domain system name into the 'compressed' representation required for interaction with the domain name system.<br><br>This operation decodes the first level of encoding. See RFC 1001 for full details.";
        this.infoURL = "https://wikipedia.org/wiki/NetBIOS";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Offset",
                "type": "number",
                "value": 65
            }
        ];
        this.checks = [
            {
                pattern:  "^\\s*\\S{32}$",
                flags:  "",
                args:   [65]
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const output = [],
            offset = args[0];

        if (input.length <= 32 && (input.length % 2) === 0) {
            for (let i = 0; i < input.length; i += 2) {
                output.push((((input[i] & 0xff) - offset) << 4) |
                            (((input[i + 1] & 0xff) - offset) & 0xf));
            }
            for (let i = output.length - 1; i > 0; i--) {
                if (output[i] === 32) output.splice(i, i);
                else break;
            }
        }

        return output;
    }

}

export default DecodeNetBIOSName;
