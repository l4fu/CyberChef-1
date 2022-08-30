/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import ExifParser from "exif-parser";
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Extract EXIF operation
 */
class ExtractEXIF extends Operation {

    /**
     * ExtractEXIF constructor
     */
    constructor() {
        super();

        this.name = "Extract EXIF";
        this.module = "Image";
        this.local="";
        this.description = "从图像中提取EXIF数据<br><br>EXIF数据是嵌入在图像（JPEG、JPG、TIFF）和音频文件中的元数据<br><br>来自照片的EXIF数据通常包含图像文件本身以及用于创建图像文件的设备的信息。Extracts EXIF data from an image.<br><br>EXIF data is metadata embedded in images (JPEG, JPG, TIFF) and audio files.<br><br>EXIF data from photos usually contains information about the image file itself as well as the device used to create it.";
        this.infoURL = "https://wikipedia.org/wiki/Exif";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        try {
            const parser = ExifParser.create(input);
            const result = parser.parse();

            const lines = [];
            for (const tagName in result.tags) {
                const value = result.tags[tagName];
                lines.push(`${tagName}: ${value}`);
            }

            const numTags = lines.length;
            lines.unshift(`Found ${numTags} tags.\n`);
            return lines.join("\n");
        } catch (err) {
            throw new OperationError(`Could not extract EXIF data from image: ${err}`);
        }
    }

}

export default ExtractEXIF;
