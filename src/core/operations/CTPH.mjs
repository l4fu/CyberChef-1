/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import ctphjs from "ctph.js";

/**
 * CTPH operation
 */
class CTPH extends Operation {

    /**
     * CTPH constructor
     */
    constructor() {
        super();

        this.name = "CTPH";
        this.module = "Crypto";
        this.local="";
        this.description = "上下文触发的分段散列,也称为模糊散列,可以匹配具有同源性的输入。这些输入具有相同顺序的相同字节序列,尽管这些序列之间的字节在内容和长度上可能不同<br><br>CTPH最初基于Andrew Tridgell博士和一个名为SpamSum的垃圾邮件检测器的工作。Jesse Kornblum采用了这种方法,并在2006年的DFRWS会议上发表了一篇论文“使用上下文触发的分段散列识别几乎相同的文件”。Context Triggered Piecewise Hashing, also called Fuzzy Hashing, can match inputs that have homologies. Such inputs have sequences of identical bytes in the same order, although bytes in between these sequences may be different in both content and length.<br><br>CTPH was originally based on the work of Dr. Andrew Tridgell and a spam email detector called SpamSum. This method was adapted by Jesse Kornblum and published at the DFRWS conference in 2006 in a paper 'Identifying Almost Identical Files Using Context Triggered Piecewise Hashing'.";
        this.infoURL = "https://forensicswiki.xyz/wiki/index.php?title=Context_Triggered_Piecewise_Hashing";
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
        return ctphjs.digest(input);
    }

}

export default CTPH;
