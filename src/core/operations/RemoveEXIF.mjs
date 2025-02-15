/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import { removeEXIF } from "../vendor/remove-exif.mjs";
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Remove EXIF operation
 */
class RemoveEXIF extends Operation {

    /**
     * RemoveEXIF constructor
     */
    constructor() {
        super();

        this.name = "Remove EXIF";
        this.module = "Image";
        this.local="";
        this.description = "从JPEG图像中删除EXIF数据<br><br>嵌入在照片中的EXIF数据通常包含图像文件本身以及用于创建图像文件的设备的信息。Removes EXIF data from a JPEG image.<br><br>EXIF data embedded in photos usually contains information about the image file itself as well as the device used to create it.";
        this.infoURL = "https://wikipedia.org/wiki/Exif";
        this.inputType = "ArrayBuffer";
        this.outputType = "byteArray";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        input = new Uint8Array(input);
        // Do nothing if input is empty
        if (input.length === 0) return input;

        try {
            return removeEXIF(input);
        } catch (err) {
            // Simply return input if no EXIF data is found
            if (err === "Exif not found.") return input;
            throw new OperationError(`Could not remove EXIF data from image: ${err}`);
        }
    }

}

export default RemoveEXIF;
