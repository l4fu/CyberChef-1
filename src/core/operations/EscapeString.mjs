/**
 * @author Vel0x [dalemy@microsoft.com]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import jsesc from "jsesc";

/**
 * Escape string operation
 */
class EscapeString extends Operation {

    /**
     * EscapeString constructor
     */
    constructor() {
        super();

        this.name = "Escape string";
        this.module = "Default";
        this.local="";
        this.description = "转义字符串中的特殊字符，以便它们不会引起冲突。例如，<code>现在不要阻止我</code>变成了<code>现在就不要阻止我。</code><br><br>支持以下转义序列：<ul><li><code>\ \ n</code>（换行/换行）</li><li><code><r</code>（回车）</li><li><code>\ \ t</code>（水平制表符）</li><li>><code>\ \ b</code>（退格）</李><li><code>\ f</code>（换行）<li<li><code><xnn</code>（十六进制，其中n为0-f）</>\ \ \ </code>（反斜杠）</li><li><code>\ \ '</code>（单引号）</li><li><code>\ \ </code>（双引号）</li><li><code>\ \ unnn</code>（Unicode字符）</li><li><code>\ \  u{nnnn}</code>（Unicode码点）</li></ul>Escapes special characters in a string so that they do not cause conflicts. For example, <code>Don't stop me now</code> becomes <code>Don\\'t stop me now</code>.<br><br>Supports the following escape sequences:<ul><li><code>\\n</code> (Line feed/newline)</li><li><code>\\r</code> (Carriage return)</li><li><code>\\t</code> (Horizontal tab)</li><li><code>\\b</code> (Backspace)</li><li><code>\\f</code> (Form feed)</li><li><code>\\xnn</code> (Hex, where n is 0-f)</li><li><code>\\\\</code> (Backslash)</li><li><code>\\'</code> (Single quote)</li><li><code>\\&quot;</code> (Double quote)</li><li><code>\\unnnn</code> (Unicode character)</li><li><code>\\u{nnnnnn}</code> (Unicode code point)</li></ul>";
        this.infoURL = "https://wikipedia.org/wiki/Escape_sequence";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Escape level",
                "type": "option",
                "value": ["Special chars", "Everything", "Minimal"]
            },
            {
                "name": "Escape quote",
                "type": "option",
                "value": ["Single", "Double", "Backtick"]
            },
            {
                "name": "JSON compatible",
                "type": "boolean",
                "value": false
            },
            {
                "name": "ES6 compatible",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Uppercase hex",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @example
     * EscapeString.run("Don't do that", [])
     * > "Don\'t do that"
     * EscapeString.run(`Hello
     * World`, [])
     * > "Hello\nWorld"
     */
    run(input, args) {
        const level = args[0],
            quotes = args[1],
            jsonCompat = args[2],
            es6Compat = args[3],
            lowercaseHex = !args[4];

        return jsesc(input, {
            quotes: quotes.toLowerCase(),
            es6: es6Compat,
            escapeEverything: level === "Everything",
            minimal: level === "Minimal",
            json: jsonCompat,
            lowercaseHex: lowercaseHex,
        });
    }

}

export default EscapeString;
