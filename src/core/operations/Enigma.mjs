/**
 * Emulation of the Enigma machine.
 *
 * Tested against various genuine Enigma machines using a variety of inputs
 * and settings to confirm correctness.
 *
 * @author s2224834
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import {ROTORS, LETTERS, ROTORS_FOURTH, REFLECTORS, Rotor, Reflector, Plugboard, EnigmaMachine} from "../lib/Enigma.mjs";

/**
 * Enigma operation
 */
class Enigma extends Operation {
    /**
     * Enigma constructor
     */
    constructor() {
        super();

        this.name = "Enigma";
        this.module = "Bletchley";
        this.local="";
        this.description = "使用WW2 Enigma机器进行加密/解密<br><br>Enigma在第二次世界大战期间被德国军方用作便携式密码机,用于保护敏感的军事、外交和商业通信<br><br>提供了一套标准的德国军用转子和反射器。要配置插件板,请输入一串连接的字母对,例如＜code＞AB-CD-EF＜/code＞将a连接到B、C连接到D、e连接到F。这也可用于创建您自己的反射器。要创建您自己的转子,请按顺序输入转子将A映射到Z的字母,可选后跟<code>&lt</代码>然后是步进点列表<br>与真正的Enigma相比,这在转子放置等方面是相当允许的（例如,四转子Enigma仅使用薄反射器和第四槽中的β或γ转子）<br><br>有关Enigma、Typex和Bombe操作的详细说明<a href='https://github.com/gchq/CyberChef/wiki/Enigma,-tEncipher/decipher with the WW2 Enigma machine.<br><br>Enigma was used by the German military, among others, around the WW2 era as a portable cipher machine to protect sensitive military, diplomatic and commercial communications.<br><br>The standard set of German military rotors and reflectors are provided. To configure the plugboard, enter a string of connected pairs of letters, e.g. <code>AB CD EF</code> connects A to B, C to D, and E to F. This is also used to create your own reflectors. To create your own rotor, enter the letters that the rotor maps A to Z to, in order, optionally followed by <code>&lt;</code> then a list of stepping points.<br>This is deliberately fairly permissive with rotor placements etc compared to a real Enigma (on which, for example, a four-rotor Enigma uses only the thin reflectors and the beta or gamma rotor in the 4th slot).<br><br>More detailed descriptions of the Enigma, Typex and Bombe operations <a href='https://github.com/gchq/CyberChef/wiki/Enigma,-the-Bombe,-and-Typex'>can be found here</a>.";
        this.infoURL = "https://wikipedia.org/wiki/Enigma_machine";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Model",
                type: "argSelector",
                value: [
                    {
                        name: "3-rotor",
                        off: [1, 2, 3]
                    },
                    {
                        name: "4-rotor",
                        on: [1, 2, 3]
                    }
                ]
            },
            {
                name: "Left-most (4th) rotor",
                type: "editableOption",
                value: ROTORS_FOURTH,
                defaultIndex: 0
            },
            {
                name: "Left-most rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "Left-most rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "Left-hand rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 0
            },
            {
                name: "Left-hand rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "Left-hand rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "Middle rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 1
            },
            {
                name: "Middle rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "Middle rotor initial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "Right-hand rotor",
                type: "editableOption",
                value: ROTORS,
                // Default config is the rotors I-III *left to right*
                defaultIndex: 2
            },
            {
                name: "Right-hand rotor ring setting",
                type: "option",
                value: LETTERS
            },
            {
                name: "Right-hand rotor initial value",
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
        const model = args[0];
        const reflectorstr = args[13];
        const plugboardstr = args[14];
        const removeOther = args[15];
        const rotors = [];
        for (let i=0; i<4; i++) {
            if (i === 0 && model === "3-rotor") {
                // Skip the 4th rotor settings
                continue;
            }
            const [rotorwiring, rotorsteps] = this.parseRotorStr(args[i*3 + 1], 1);
            rotors.push(new Rotor(rotorwiring, rotorsteps, args[i*3 + 2], args[i*3 + 3]));
        }
        // Rotors are handled in reverse
        rotors.reverse();
        const reflector = new Reflector(reflectorstr);
        const plugboard = new Plugboard(plugboardstr);
        if (removeOther) {
            input = input.replace(/[^A-Za-z]/g, "");
        }
        const enigma = new EnigmaMachine(rotors, reflector, plugboard);
        let result = enigma.crypt(input);
        if (removeOther) {
            // Five character cipher groups is traditional
            result = result.replace(/([A-Z]{5})(?!$)/g, "$1 ");
        }
        return result;
    }

    /**
     * Highlight Enigma
     * This is only possible if we're passing through non-alphabet characters.
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        if (args[13] === false) {
            return pos;
        }
    }

    /**
     * Highlight Enigma in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        if (args[13] === false) {
            return pos;
        }
    }

}

export default Enigma;
