/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import * as LS47 from "../lib/LS47.mjs";

/**
 * LS47 Encrypt operation
 */
class LS47Encrypt extends Operation {

    /**
     * LS47Encrypt constructor
     */
    constructor() {
        super();

        this.name = "LS47 Encrypt";
        this.module = "Crypto";
        this.local="";
        this.description = "这是Alan Kaminsky所描述的ElsieFour密码的轻微改进。我们使用7x7个字符，而不是原始的（勉强合适的）6x6个字符，以便能够加密一些结构化信息。我们还描述了一个简单的密钥扩展算法，因为记住密码很流行。与ElsieFour hold类似的安全考虑<br>LS47字母表由以下字符组成：＜code＞_abcdefghijklmnopqrstuvwxyz。0123456789,-+*/:?!'（）</code><br>LS47密钥是字母表的排列，然后在用于加密或解密的7x7网格中表示。This is a slight improvement of the ElsieFour cipher as described by Alan Kaminsky. We use 7x7 characters instead of original (barely fitting) 6x6, to be able to encrypt some structured information. We also describe a simple key-expansion algorithm, because remembering passwords is popular. Similar security considerations as with ElsieFour hold.<br>The LS47 alphabet consists of following characters: <code>_abcdefghijklmnopqrstuvwxyz.0123456789,-+*/:?!'()</code><br>A LS47 key is a permutation of the alphabet that is then represented in a 7x7 grid used for the encryption or decryption.";
        this.infoURL = "https://github.com/exaexa/ls47";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Password",
                type: "string",
                value: ""
            },
            {
                name: "Padding",
                type: "number",
                value: 10
            },
            {
                name: "Signature",
                type: "string",
                value: ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        this.paddingSize = parseInt(args[1], 10);

        LS47.initTiles();

        const key = LS47.deriveKey(args[0]);
        return LS47.encryptPad(key, input, args[2], this.paddingSize);
    }

}

export default LS47Encrypt;
