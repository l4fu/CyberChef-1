/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isImage } from "../lib/FileType.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import jimplib from "jimp/es/index.js";
const jimp = jimplib.default ? jimplib.default : jimplib;

/**
 * Normalise Image operation
 */
class NormaliseImage extends Operation {

    /**
     * NormaliseImage constructor
     */
    constructor() {
        super();

        this.name = "Normalise Image";
        this.module = "Image";
        this.local="";
        this.description = "使图像颜色正常化。Normalise the image colours.";
        this.infoURL = "";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType=  "html";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        if (!isImage(input)) {
            throw new OperationError("Invalid file type.");
        }

        let image;
        try {
            image = await jimp.read(input);
        } catch (err) {
            throw new OperationError(`Error opening image file. (${err})`);
        }

        try {
            image.normalize();

            let imageBuffer;
            if (image.getMIME() === "image/gif") {
                imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            } else {
                imageBuffer = await image.getBufferAsync(jimp.AUTO);
            }
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`Error normalising image. (${err})`);
        }
    }

    /**
     * Displays the normalised image using HTML for web apps
     * @param {ArrayBuffer} data
     * @returns {html}
     */
    present(data) {
        if (!data.byteLength) return "";
        const dataArray = new Uint8Array(data);

        const type = isImage(dataArray);
        if (!type) {
            throw new OperationError("Invalid file type.");
        }

        return `<img src="data:${type};base64,${toBase64(dataArray)}">`;
    }

}

export default NormaliseImage;
