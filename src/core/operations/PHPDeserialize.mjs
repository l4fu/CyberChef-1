/**
 * @author Jarmo van Lenthe [github.com/jarmovanlenthe]
 * @copyright Jarmo van Lenthe
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * PHP Deserialize operation
 */
class PHPDeserialize extends Operation {

    /**
     * PHPDeserialize constructor
     */
    constructor() {
        super();

        this.name = "PHP Deserialize";
        this.module = "Default";
        this.local="";
        this.description = "反序列化PHP序列化数据,将键控数组输出为JSON<br><br>此函数不支持<code>对象</code>标记<br><br>示例：<br><code>a:2:｛s:1:“a”i:10；i:0；a:1:｛s:2:“ab”b:1；｝</code><br>变成<br><code>{a〃：10,0:{ab〃：true}}</code><br><br><u>输出有效的JSON:</u>JSON不支持整数作为键,而PHP序列化支持。启用此选项将把这些整数转换为字符串。这也将避免反斜杠。Deserializes PHP serialized data, outputting keyed arrays as JSON.<br><br>This function does not support <code>object</code> tags.<br><br>Example:<br><code>a:2:{s:1:&quot;a&quot;;i:10;i:0;a:1:{s:2:&quot;ab&quot;;b:1;}}</code><br>becomes<br><code>{&quot;a&quot;: 10,0: {&quot;ab&quot;: true}}</code><br><br><u>Output valid JSON:</u> JSON doesn't support integers as keys, whereas PHP serialization does. Enabling this will cast these integers to strings. This will also escape backslashes.";
        this.infoURL = "http://www.phpinternalsbook.com/classes_objects/serialization.html";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Output valid JSON",
                "type": "boolean",
                "value": true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        /**
         * Recursive method for deserializing.
         * @returns {*}
         */
        function handleInput() {
            /**
             * Read `length` characters from the input, shifting them out the input.
             * @param length
             * @returns {string}
             */
            function read(length) {
                let result = "";
                for (let idx = 0; idx < length; idx++) {
                    const char = inputPart.shift();
                    if (char === undefined) {
                        throw new OperationError("End of input reached before end of script");
                    }
                    result += char;
                }
                return result;
            }

            /**
             * Read characters from the input until `until` is found.
             * @param until
             * @returns {string}
             */
            function readUntil(until) {
                let result = "";
                for (;;) {
                    const char = read(1);
                    if (char === until) {
                        break;
                    } else {
                        result += char;
                    }
                }
                return result;

            }

            /**
             * Read characters from the input that must be equal to `expect`
             * @param expect
             * @returns {string}
             */
            function expect(expect) {
                const result = read(expect.length);
                if (result !== expect) {
                    throw new OperationError("Unexpected input found");
                }
                return result;
            }

            /**
             * Helper function to handle deserialized arrays.
             * @returns {Array}
             */
            function handleArray() {
                const items = parseInt(readUntil(":"), 10) * 2;
                expect("{");
                const result = [];
                let isKey = true;
                let lastItem = null;
                for (let idx = 0; idx < items; idx++) {
                    const item = handleInput();
                    if (isKey) {
                        lastItem = item;
                        isKey = false;
                    } else {
                        const numberCheck = lastItem.match(/[0-9]+/);
                        if (args[0] && numberCheck && numberCheck[0].length === lastItem.length) {
                            result.push('"' + lastItem + '": ' + item);
                        } else {
                            result.push(lastItem + ": " + item);
                        }
                        isKey = true;
                    }
                }
                expect("}");
                return result;
            }


            const kind = read(1).toLowerCase();

            switch (kind) {
                case "n":
                    expect(";");
                    return "null";
                case "i":
                case "d":
                case "b": {
                    expect(":");
                    const data = readUntil(";");
                    if (kind === "b") {
                        return (parseInt(data, 10) !== 0);
                    }
                    return data;
                }

                case "a":
                    expect(":");
                    return "{" + handleArray() + "}";

                case "s": {
                    expect(":");
                    const length = readUntil(":");
                    expect("\"");
                    const value = read(length);
                    expect('";');
                    if (args[0]) {
                        return '"' + value.replace(/"/g, '\\"') + '"'; // lgtm [js/incomplete-sanitization]
                    } else {
                        return '"' + value + '"';
                    }
                }

                default:
                    throw new OperationError("Unknown type: " + kind);
            }
        }

        const inputPart = input.split("");
        return handleInput();
    }

}

export default PHPDeserialize;
