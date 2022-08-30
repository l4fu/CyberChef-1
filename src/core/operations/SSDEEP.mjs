/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import ssdeepjs from "ssdeep.js";

/**
 * SSDEEP operation
 */
class SSDEEP extends Operation {

    /**
     * SSDEEP constructor
     */
    constructor() {
        super();

        this.name = "SSDEEP";
        this.module = "Crypto";
        this.local="";
        this.description = "SSDEEP是一个计算上下文触发分段散列（CTPH）的程序。也称为模糊散列，CTPH可以匹配具有同源性的输入。这些输入具有相同顺序的相同字节序列，尽管这些序列之间的字节在内容和长度上可能不同<br><br>深度哈希现在广泛用于简单的标识目的（例如，VirusTotal中的“基本属性”部分）。虽然“更好”的模糊散列是可用的，但由于其速度和事实上的标准，SSDEEP仍然是主要选择之一<br><br>此操作与CTPH操作基本相同，但其输出格式不同。SSDEEP is a program for computing context triggered piecewise hashes (CTPH). Also called fuzzy hashes, CTPH can match inputs that have homologies. Such inputs have sequences of identical bytes in the same order, although bytes in between these sequences may be different in both content and length.<br><br>SSDEEP hashes are now widely used for simple identification purposes (e.g. the 'Basic Properties' section in VirusTotal). Although 'better' fuzzy hashes are available, SSDEEP is still one of the primary choices because of its speed and being a de facto standard.<br><br>This operation is fundamentally the same as the CTPH operation, however their outputs differ in format.";
        this.infoURL = "https://forensicswiki.xyz/wiki/index.php?title=Ssdeep";
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
        return ssdeepjs.digest(input);
    }

}

export default SSDEEP;
