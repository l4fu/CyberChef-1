/**
 * Emulation of the Typex machine.
 *
 * Tested against a genuine Typex machine using a variety of inputs
 * and settings to confirm correctness.
 *
 * @author s2224834
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import {LETTERS, Reflector} from "../lib/Enigma.mjs";
import {ROTORS, REFLECTORS, TypexMachine, Plugboard, Rotor} from "../lib/Typex.mjs";

/**
 * Typex operation
 */
class Typex extends Operation {
    /**
     * Typex constructor
     */
    constructor() {
        super();

        this.name = "Typex";
        this.module = "Bletchley";
        this.local="";
        this.description = "使用WW2 Typex机器进行加密/解密<br><br>Typex最初由英国皇家空军在第二次世界大战之前建造，基于Enigma机器，并进行了一些改进，包括使用五个具有更多步进点和可互换接线芯的转子。它在英国和英联邦军队中使用。后来产生了一些变体；在这里，我们模拟了一个二战时代的Mark 22 Typex，带有用于反射器和输入的插件板。Typex转子定期更换，没有一个是公开的：提供了随机示例集<br><br>要配置反射器插件板，请在反射器框中输入一串连接的字母对，例如，<code>AB CD EF</code>将a连接到B，C连接到D，e连接到F（您需要连接每个字母）。还有一个输入插件板：与Enigma的插件板不同，它不限于成对输入，所以它像转子一样输入（无需步进）。要创建自己的转子，请输入转子将A到Z映射到的字母，顺序为optiEncipher/decipher with the WW2 Typex machine.<br><br>Typex was originally built by the British Royal Air Force prior to WW2, and is based on the Enigma machine with some improvements made, including using five rotors with more stepping points and interchangeable wiring cores. It was used across the British and Commonwealth militaries. A number of later variants were produced; here we simulate a WW2 era Mark 22 Typex with plugboards for the reflector and input. Typex rotors were changed regularly and none are public: a random example set are provided.<br><br>To configure the reflector plugboard, enter a string of connected pairs of letters in the reflector box, e.g. <code>AB CD EF</code> connects A to B, C to D, and E to F (you'll need to connect every letter). There is also an input plugboard: unlike Enigma's plugboard, it's not restricted to pairs, so it's entered like a rotor (without stepping). To create your own rotor, enter the letters that the rotor maps A to Z to, in order, optionally followed by <code>&lt;</code> then a list of stepping points.<br><br>More detailed descriptions of the Enigma, Typex and Bombe operations <a href='https://github.com/gchq/CyberChef/wiki/Enigma,-the-Bombe,-and-Typex'>can be found here</a>.";
        this.infoURL = "https://wikipedia.org/wiki/Typex";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "1st (left-hand) rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 0
            },
            {
                name: "1st rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "1st rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "1st rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "2nd rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 1
            },
            {
                name: "2nd rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "2nd rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "2nd rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "3rd (middle) rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 2
            },
            {
                name: "3rd rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "3rd rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "3rd rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "4th (static) rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 3
            },
            {
                name: "4th rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "4th rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "4th rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "5th (right-hand, static) rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 4
            },
            {
                name: "5th rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "5th rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "5th rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "Reflector",
                type: "editableOption",
                value: REFLECTORS
            },
            {
                name: "Plugboard",
                type: "string",
                value: ""
            },
            {
                name: "Typex keyboard emulation",
                type: "option",
                value: ["None", "Encrypt", "Decrypt"]
            },
            {
                name: "Strict output",
                hint: "Remove non-alphabet letters and group output",
                type: "boolean",
                value: true
            },
        ];
    }

    /**
     * Helper - for ease of use rotors are specified as a single string; this
     * method breaks the spec string into wiring and steps parts.
     *
     * @param {string} rotor - Rotor specification string.
     * @param {number} i - For error messages, the number of this rotor.
     * @returns {string[]}
     */
    parseRotorStr(rotor, i) {
        if (rotor === "") {
            throw new OperationError(`Rotor ${i} must be provided.`);
        }
        if (!rotor.includes("<")) {
            return [rotor, ""];
        }
        return rotor.split("<", 2);
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const reflectorstr = args[20];
        const plugboardstr = args[21];
        const typexKeyboard = args[22];
        const removeOther = args[23];
        const rotors = [];
        for (let i=0; i<5; i++) {
            const [rotorwiring, rotorsteps] = this.parseRotorStr(args[i*4]);
            rotors.push(new Rotor(rotorwiring, rotorsteps, args[i*4 + 1], args[i*4+2], args[i*4+3]));
        }
        // Rotors are handled in reverse
        rotors.reverse();
        const reflector = new Reflector(reflectorstr);
        let plugboardstrMod = plugboardstr;
        if (plugboardstrMod === "") {
            plugboardstrMod = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        const plugboard = new Plugboard(plugboardstrMod);
        if (removeOther) {
            if (typexKeyboard === "Encrypt") {
                input = input.replace(/[^A-Za-z0-9 /%£()',.-]/g, "");
            } else {
                input = input.replace(/[^A-Za-z]/g, "");
            }
        }
        const typex = new TypexMachine(rotors, reflector, plugboard, typexKeyboard);
        let result = typex.crypt(input);
        if (removeOther && typexKeyboard !== "Decrypt") {
            // Five character cipher groups is traditional
            result = result.replace(/([A-Z]{5})(?!$)/g, "$1 ");
        }
        return result;
    }

    /**
     * Highlight Typex
     * This is only possible if we're passing through non-alphabet characters.
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        if (args[18] === false) {
            return pos;
        }
    }

    /**
     * Highlight Typex in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        if (args[18] === false) {
            return pos;
        }
    }

}

export default Typex;
