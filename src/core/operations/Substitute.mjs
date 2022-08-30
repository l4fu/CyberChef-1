/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Substitute operation
 */
class Substitute extends Operation {

    /**
     * Substitute constructor
     */
    constructor() {
        super();

        this.name = "Substitute";
        this.module = "Default";
        this.local="";
        this.description = "一种替换密码，允许您指定要用其他字节值替换的字节。这可以用于创建凯撒密码，但功能更强大，因为任何字节值都可以替换，而不仅仅是字母，而且替换值不需要按顺序排列<br><br>在明文字段中输入要替换的字节，在密文字段中输入替换它们的字节<br><br>可以使用字符串转义符号指定不可打印的字节。例如，换行符可以写成<code>\ \ n</code>或<code>\ \ \ x0a</code><br><br>可以使用连字符指定字节范围。例如，序列＜code＞0123456789</code＞可以写成＜code＞0-9</code><br><br>请注意，黑斜杠字符用于转义特殊字符，因此如果您想单独使用它们，则需要对其进行转义（例如，<code>\ \ \ </code>）。A substitution cipher allowing you to specify bytes to replace with other byte values. This can be used to create Caesar ciphers but is more powerful as any byte value can be substituted, not just letters, and the substitution values need not be in order.<br><br>Enter the bytes you want to replace in the Plaintext field and the bytes to replace them with in the Ciphertext field.<br><br>Non-printable bytes can be specified using string escape notation. For example, a line feed character can be written as either <code>\\n</code> or <code>\\x0a</code>.<br><br>Byte ranges can be specified using a hyphen. For example, the sequence <code>0123456789</code> can be written as <code>0-9</code>.<br><br>Note that blackslash characters are used to escape special characters, so will need to be escaped themselves if you want to use them on their own (e.g.<code>\\\\</code>).";
        this.infoURL = "https://wikipedia.org/wiki/Substitution_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Plaintext",
                "type": "binaryString",
                "value": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            },
            {
                "name": "Ciphertext",
                "type": "binaryString",
                "value": "XYZABCDEFGHIJKLMNOPQRSTUVW"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const plaintext = Utils.expandAlphRange([...args[0]]),
            ciphertext = Utils.expandAlphRange([...args[1]]);
        let output = "",
            index = -1;

        if (plaintext.length !== ciphertext.length) {
            output = "Warning: Plaintext and Ciphertext lengths differ\n\n";
        }

        for (const character of input) {
            index = plaintext.indexOf(character);
            output += index > -1 && index < ciphertext.length ? ciphertext[index] : character;
        }

        return output;
    }

}

export default Substitute;
