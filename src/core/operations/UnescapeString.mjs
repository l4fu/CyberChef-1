/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Unescape string operation
 */
class UnescapeString extends Operation {

    /**
     * UnescapeString constructor
     */
    constructor() {
        super();

        this.name = "Unescape string";
        this.module = "Default";
        this.local="";
        this.description = "取消转义字符串中已转义的字符。例如，<code>现在不要阻止我</code>变成了<code>现在就不要阻止我。</code><br><br>支持以下转义序列：<ul><li><code>\ \ n</code>（换行/换行）</li><li><code><r</code>（回车）</li><li><code>\ \ t</code>（水平制表符）</li><li>><code>\ \ b</code>（退格）</李><li><code>\ f</code>（换行）</li<li><code>nnn</code>（八进制，其中n为0-7）</code>\ \ xnn</code>（十六进制，其中n为0-f）</li><li><code>\ \ </code>（反斜杠）</li><li><code>\ '</code>（单引号）</li><li><code>\ '</code>（双引号）</li><li><code>\ \ unnn</code>（Unicode字符）</li><li><code>\ \  u{nnnn}</code>（Unicode码点）</li></ul>Unescapes characters in a string that have been escaped. For example, <code>Don\\'t stop me now</code> becomes <code>Don't stop me now</code>.<br><br>Supports the following escape sequences:<ul><li><code>\\n</code> (Line feed/newline)</li><li><code>\\r</code> (Carriage return)</li><li><code>\\t</code> (Horizontal tab)</li><li><code>\\b</code> (Backspace)</li><li><code>\\f</code> (Form feed)</li><li><code>\\nnn</code> (Octal, where n is 0-7)</li><li><code>\\xnn</code> (Hex, where n is 0-f)</li><li><code>\\\\</code> (Backslash)</li><li><code>\\'</code> (Single quote)</li><li><code>\\&quot;</code> (Double quote)</li><li><code>\\unnnn</code> (Unicode character)</li><li><code>\\u{nnnnnn}</code> (Unicode code point)</li></ul>";
        this.infoURL = "https://wikipedia.org/wiki/Escape_sequence";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return Utils.parseEscapedChars(input);
    }

}

export default UnescapeString;
