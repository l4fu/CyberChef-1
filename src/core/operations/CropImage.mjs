/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isImage } from "../lib/FileType.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";
import jimplib from "jimp/es/index.js";
const jimp = jimplib.default ? jimplib.default : jimplib;

/**
 * Crop Image operation
 */
class CropImage extends Operation {

    /**
     * CropImage constructor
     */
    constructor() {
        super();

        this.name = "Crop Image";
        this.module = "Image";
        this.local="";
        this.description = "将图像裁剪到指定区域,或自动裁剪边缘<br><br><b><u>自动裁剪</u></b><br>自动裁剪图像中相同颜色的边框<br><br><u>自动渐变公差</u><br>像素之间色差公差的百分比值<br><br><u>仅自动裁剪帧</u><br>仅裁剪真实帧（所有边必须具有相同的边框）<br><br><u>对称自动裁剪</u><br>强制自动裁剪对称（上/下和左/右裁剪相同数量）<br><br>自动裁剪保持边框</u><br>图像周围的边框像素数。Crops an image to the specified region, or automatically crops edges.<br><br><b><u>Autocrop</u></b><br>Automatically crops same-colour borders from the image.<br><br><u>Autocrop tolerance</u><br>A percentage value for the tolerance of colour difference between pixels.<br><br><u>Only autocrop frames</u><br>Only crop real frames (all sides must have the same border)<br><br><u>Symmetric autocrop</u><br>Force autocrop to be symmetric (top/bottom and left/right are cropped by the same amount)<br><br><u>Autocrop keep border</u><br>The number of pixels of border to leave around the image.";
        this.infoURL = "https://wikipedia.org/wiki/Cropping_(image)";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "X Position",
                type: "number",
                value: 0,
                min: 0
            },
            {
                name: "Y Position",
                type: "number",
                value: 0,
                min: 0
            },
            {
                name: "Width",
                type: "number",
                value: 10,
                min: 1
            },
            {
                name: "Height",
                type: "number",
                value: 10,
                min: 1
            },
            {
                name: "Autocrop",
                type: "boolean",
                value: false
            },
            {
                name: "Autocrop tolerance (%)",
                type: "number",
                value: 0.02,
                min: 0,
                max: 100,
                step: 0.01
            },
            {
                name: "Only autocrop frames",
                type: "boolean",
                value: true
            },
            {
                name: "Symmetric autocrop",
                type: "boolean",
                value: false
            },
            {
                name: "Autocrop keep border (px)",
                type: "number",
                value: 0,
                min: 0
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        const [xPos, yPos, width, height, autocrop, autoTolerance, autoFrames, autoSymmetric, autoBorder] = args;
        if (!isImage(input)) {
            throw new OperationError("Invalid file type.");
        }

        let image;
        try {
            image = await jimp.read(input);
        } catch (err) {
            throw new OperationError(`Error loading image. (${err})`);
        }
        try {
            if (isWorkerEnvironment())
                self.sendStatusMessage("Cropping image...");
            if (autocrop) {
                image.autocrop({
                    tolerance: (autoTolerance / 100),
                    cropOnlyFrames: autoFrames,
                    cropSymmetric: autoSymmetric,
                    leaveBorder: autoBorder
                });
            } else {
                image.crop(xPos, yPos, width, height);
            }

            let imageBuffer;
            if (image.getMIME() === "image/gif") {
                imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            } else {
                imageBuffer = await image.getBufferAsync(jimp.AUTO);
            }
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`Error cropping image. (${err})`);
        }
    }

    /**
     * Displays the cropped image using HTML for web apps
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

export default CropImage;
