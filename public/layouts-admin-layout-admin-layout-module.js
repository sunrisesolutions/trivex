(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-admin-layout-admin-layout-module"],{

/***/ "./node_modules/@zxing/library/esm5/browser/BrowserBarcodeReader.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/browser/BrowserBarcodeReader.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserCodeReader_1 = __webpack_require__(/*! ./BrowserCodeReader */ "./node_modules/@zxing/library/esm5/browser/BrowserCodeReader.js");
var MultiFormatOneDReader_1 = __webpack_require__(/*! ../core/oned/MultiFormatOneDReader */ "./node_modules/@zxing/library/esm5/core/oned/MultiFormatOneDReader.js");
/**
 * Barcode reader reader to use from browser.
 *
 * @class BrowserBarcodeReader
 * @extends {BrowserCodeReader}
 */
var BrowserBarcodeReader = /** @class */ (function (_super) {
    __extends(BrowserBarcodeReader, _super);
    /**
     * Creates an instance of BrowserBarcodeReader.
     * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
     * @param {Map<DecodeHintType, any>} hints
     * @memberOf BrowserBarcodeReader
     */
    function BrowserBarcodeReader(timeBetweenScansMillis, hints) {
        if (timeBetweenScansMillis === void 0) { timeBetweenScansMillis = 500; }
        return _super.call(this, new MultiFormatOneDReader_1.default(hints), timeBetweenScansMillis, hints) || this;
    }
    return BrowserBarcodeReader;
}(BrowserCodeReader_1.BrowserCodeReader));
exports.BrowserBarcodeReader = BrowserBarcodeReader;
//# sourceMappingURL=BrowserBarcodeReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/browser/BrowserCodeReader.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/browser/BrowserCodeReader.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTMLCanvasElementLuminanceSource_1 = __webpack_require__(/*! ./HTMLCanvasElementLuminanceSource */ "./node_modules/@zxing/library/esm5/browser/HTMLCanvasElementLuminanceSource.js");
var VideoInputDevice_1 = __webpack_require__(/*! ./VideoInputDevice */ "./node_modules/@zxing/library/esm5/browser/VideoInputDevice.js");
var BinaryBitmap_1 = __webpack_require__(/*! ../core/BinaryBitmap */ "./node_modules/@zxing/library/esm5/core/BinaryBitmap.js");
var HybridBinarizer_1 = __webpack_require__(/*! ../core/common/HybridBinarizer */ "./node_modules/@zxing/library/esm5/core/common/HybridBinarizer.js");
var NotFoundException_1 = __webpack_require__(/*! ../core/NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
var ArgumentException_1 = __webpack_require__(/*! ../core/ArgumentException */ "./node_modules/@zxing/library/esm5/core/ArgumentException.js");
var ChecksumException_1 = __webpack_require__(/*! ../core/ChecksumException */ "./node_modules/@zxing/library/esm5/core/ChecksumException.js");
var FormatException_1 = __webpack_require__(/*! ../core/FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
/**
 * Base class for browser code reader.
 *
 * @export
 * @class BrowserCodeReader
 */
var BrowserCodeReader = /** @class */ (function () {
    /**
     * Creates an instance of BrowserCodeReader.
     * @param {Reader} reader The reader instance to decode the barcode
     * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
     *
     * @memberOf BrowserCodeReader
     */
    function BrowserCodeReader(reader, timeBetweenScansMillis, hints) {
        if (timeBetweenScansMillis === void 0) { timeBetweenScansMillis = 500; }
        this.reader = reader;
        this.timeBetweenScansMillis = timeBetweenScansMillis;
        this.hints = hints;
    }
    /**
     * Obtain the list of available devices with type 'videoinput'.
     *
     * @returns {Promise<VideoInputDevice[]>} an array of available video input devices
     *
     * @memberOf BrowserCodeReader
     */
    BrowserCodeReader.prototype.getVideoInputDevices = function () {
        return new Promise(function (resolve, reject) {
            navigator.mediaDevices.enumerateDevices()
                .then(function (devices) {
                var sources = new Array();
                var c = 0;
                for (var i = 0, length_1 = devices.length; i !== length_1; i++) {
                    var device = devices[i];
                    if (device.kind === 'videoinput') {
                        sources.push(new VideoInputDevice_1.VideoInputDevice(device.deviceId, device.label || "Video source " + c));
                        c++;
                    }
                }
                resolve(sources);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Decodes the barcode from the device specified by deviceId while showing the video in the specified video element.
     *
     * @param {string} [deviceId] the id of one of the devices obtained after calling getVideoInputDevices. Can be undefined, in this case it will decode from one of the available devices, preffering the main camera (environment facing) if available.
     * @param {(string|HTMLVideoElement)} [videoElement] the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
     * @returns {Promise<Result>} The decoding result.
     *
     * @memberOf BrowserCodeReader
     */
    BrowserCodeReader.prototype.decodeFromInputVideoDevice = function (deviceId, videoElement) {
        this.reset();
        this.prepareVideoElement(videoElement);
        var constraints;
        if (undefined === deviceId) {
            constraints = {
                video: { facingMode: 'environment' }
            };
        }
        else {
            constraints = {
                video: { deviceId: { exact: deviceId } }
            };
        }
        var me = this;
        return new Promise(function (resolve, reject) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {
                me.stream = stream;
                me.videoElement.srcObject = stream;
                me.videoPlayingEventListener = function () {
                    me.decodeOnceWithDelay(resolve, reject);
                };
                me.videoElement.addEventListener('playing', me.videoPlayingEventListener);
                me.videoElement.play();
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * Decodes a barcode form a video url.
     *
     * @param {string} videoUrl The video url to decode from, required.
     * @param {(string|HTMLVideoElement)} [videoElement] The video element where to play the video while decoding. Can be undefined in which case no video is shown.
     * @returns {Promise<Result>} The decoding result.
     *
     * @memberOf BrowserCodeReader
     */
    BrowserCodeReader.prototype.decodeFromVideoSource = function (videoUrl, videoElement) {
        this.reset();
        this.prepareVideoElement(videoElement);
        var me = this;
        return new Promise(function (resolve, reject) {
            me.videoPlayEndedEventListener = function () {
                me.stop();
                reject(new NotFoundException_1.default());
            };
            me.videoElement.addEventListener('ended', me.videoPlayEndedEventListener);
            me.videoPlayingEventListener = function () {
                me.decodeOnceWithDelay(resolve, reject);
            };
            me.videoElement.addEventListener('playing', me.videoPlayingEventListener);
            me.videoElement.setAttribute('autoplay', 'true');
            me.videoElement.setAttribute('src', videoUrl);
        });
    };
    BrowserCodeReader.prototype.prepareVideoElement = function (videoElement) {
        if (undefined === videoElement) {
            this.videoElement = document.createElement('video');
            this.videoElement.width = 640;
            this.videoElement.height = 480;
        }
        else if (typeof videoElement === 'string') {
            this.videoElement = this.getMediaElement(videoElement, 'video');
        }
        else {
            this.videoElement = videoElement;
        }
        // Needed for iOS 11
        this.videoElement.setAttribute('autoplay', 'true');
        this.videoElement.setAttribute('muted', 'true');
        this.videoElement.setAttribute('playsinline', 'true');
        this.videoElement.setAttribute('autofocus', 'true');
    };
    BrowserCodeReader.prototype.getMediaElement = function (mediaElementId, type) {
        var mediaElement = document.getElementById(mediaElementId);
        if (null === mediaElement) {
            throw new ArgumentException_1.default("element with id '" + mediaElementId + "' not found");
        }
        if (mediaElement.nodeName.toLowerCase() !== type.toLowerCase()) {
            console.log(mediaElement.nodeName);
            throw new ArgumentException_1.default("element with id '" + mediaElementId + "' must be an " + type + " element");
        }
        return mediaElement;
    };
    /**
     * Decodes the barcode from an image.
     *
     * @param {(string|HTMLImageElement)} [imageElement] The image element that can be either an element id or the element itself. Can be undefined in which case the decoding will be done from the imageUrl parameter.
     * @param {string} [imageUrl]
     * @returns {Promise<Result>} The decoding result.
     *
     * @memberOf BrowserCodeReader
     */
    BrowserCodeReader.prototype.decodeFromImage = function (imageElement, imageUrl) {
        var _this = this;
        this.reset();
        if (undefined === imageElement && undefined === imageUrl) {
            throw new ArgumentException_1.default('either imageElement with a src set or an url must be provided');
        }
        this.prepareImageElement(imageElement);
        var me = this;
        return new Promise(function (resolve, reject) {
            if (undefined !== imageUrl) {
                me.imageLoadedEventListener = function () {
                    me.decodeOnce(resolve, reject, false, true);
                };
                me.imageElement.addEventListener('load', me.imageLoadedEventListener);
                me.imageElement.src = imageUrl;
            }
            else if (_this.isImageLoaded(_this.imageElement)) {
                me.decodeOnce(resolve, reject, false, true);
            }
            else {
                throw new ArgumentException_1.default("either src or a loaded img should be provided");
            }
        });
    };
    BrowserCodeReader.prototype.isImageLoaded = function (img) {
        // During the onload event, IE correctly identifies any images that
        // weren’t downloaded as not complete. Others should too. Gecko-based
        // browsers act like NS4 in that they report this incorrectly.
        if (!img.complete) {
            return false;
        }
        // However, they do have two very useful properties: naturalWidth and
        // naturalHeight. These give the true size of the image. If it failed
        // to load, either of these should be zero.
        if (img.naturalWidth === 0) {
            return false;
        }
        // No other way of checking: assume it’s ok.
        return true;
    };
    BrowserCodeReader.prototype.prepareImageElement = function (imageElement) {
        if (undefined === imageElement) {
            this.imageElement = document.createElement('img');
            this.imageElement.width = 200;
            this.imageElement.height = 200;
        }
        else if (typeof imageElement === 'string') {
            this.imageElement = this.getMediaElement(imageElement, 'img');
        }
        else {
            this.imageElement = imageElement;
        }
    };
    BrowserCodeReader.prototype.decodeOnceWithDelay = function (resolve, reject) {
        this.timeoutHandler = window.setTimeout(this.decodeOnce.bind(this, resolve, reject), this.timeBetweenScansMillis);
    };
    BrowserCodeReader.prototype.decodeOnce = function (resolve, reject, retryIfNotFound, retryIfChecksumOrFormatError) {
        if (retryIfNotFound === void 0) { retryIfNotFound = true; }
        if (retryIfChecksumOrFormatError === void 0) { retryIfChecksumOrFormatError = true; }
        if (undefined === this.canvasElementContext) {
            this.prepareCaptureCanvas();
        }
        this.drawImageOnCanvas(this.canvasElementContext, this.videoElement || this.imageElement);
        var luminanceSource = new HTMLCanvasElementLuminanceSource_1.HTMLCanvasElementLuminanceSource(this.canvasElement);
        var binaryBitmap = new BinaryBitmap_1.default(new HybridBinarizer_1.default(luminanceSource));
        try {
            var result = this.readerDecode(binaryBitmap);
            resolve(result);
        }
        catch (re) {
            console.log(retryIfChecksumOrFormatError, re);
            if (retryIfNotFound && re instanceof NotFoundException_1.default) {
                console.log('not found, trying again...');
                this.decodeOnceWithDelay(resolve, reject);
            }
            else if (retryIfChecksumOrFormatError && (re instanceof ChecksumException_1.default || re instanceof FormatException_1.default)) {
                console.log('checksum or format error, trying again...', re);
                this.decodeOnceWithDelay(resolve, reject);
            }
            else {
                reject(re);
            }
        }
    };
    /**
     * This will remain protected, so who extends this class can customize this method.
     */
    BrowserCodeReader.prototype.drawImageOnCanvas = function (canvasElementContext, srcElement) {
        canvasElementContext.drawImage(srcElement, 0, 0);
    };
    BrowserCodeReader.prototype.readerDecode = function (binaryBitmap) {
        return this.reader.decode(binaryBitmap, this.hints);
    };
    BrowserCodeReader.prototype.prepareCaptureCanvas = function () {
        var canvasElement = document.createElement('canvas');
        var width, height;
        if (undefined !== this.videoElement) {
            width = this.videoElement.videoWidth;
            height = this.videoElement.videoHeight;
        }
        else {
            width = this.imageElement.naturalWidth || this.imageElement.width;
            height = this.imageElement.naturalHeight || this.imageElement.height;
        }
        canvasElement.style.width = width + "px";
        canvasElement.style.height = height + "px";
        canvasElement.width = width;
        canvasElement.height = height;
        this.canvasElement = canvasElement;
        this.canvasElementContext = canvasElement.getContext('2d');
        // this.videoElement.parentElement.appendChild(this.canvasElement)
    };
    BrowserCodeReader.prototype.stop = function () {
        if (undefined !== this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = undefined;
        }
        if (undefined !== this.stream) {
            this.stream.getTracks()[0].stop();
            this.stream = undefined;
        }
    };
    /**
     * Resets the code reader to the initial state. Cancels any ongoing barcode scanning from video or camera.
     *
     * @memberOf BrowserCodeReader
     */
    BrowserCodeReader.prototype.reset = function () {
        this.stop();
        if (undefined !== this.videoPlayEndedEventListener && undefined !== this.videoElement) {
            this.videoElement.removeEventListener('ended', this.videoPlayEndedEventListener);
        }
        if (undefined !== this.videoPlayingEventListener && undefined !== this.videoElement) {
            this.videoElement.removeEventListener('playing', this.videoPlayingEventListener);
        }
        if (undefined !== this.videoElement) {
            this.videoElement.srcObject = undefined;
            this.videoElement.removeAttribute('src');
            this.videoElement = undefined;
        }
        if (undefined !== this.videoPlayEndedEventListener && undefined !== this.imageElement) {
            this.imageElement.removeEventListener('load', this.imageLoadedEventListener);
        }
        if (undefined !== this.imageElement) {
            this.imageElement.src = undefined;
            this.imageElement.removeAttribute('src');
            this.imageElement = undefined;
        }
        this.canvasElementContext = undefined;
        this.canvasElement = undefined;
    };
    return BrowserCodeReader;
}());
exports.BrowserCodeReader = BrowserCodeReader;
//# sourceMappingURL=BrowserCodeReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/browser/BrowserDatamatrixCodeReader.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/browser/BrowserDatamatrixCodeReader.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserCodeReader_1 = __webpack_require__(/*! ./BrowserCodeReader */ "./node_modules/@zxing/library/esm5/browser/BrowserCodeReader.js");
var DataMatrixReader_1 = __webpack_require__(/*! ../core/datamatrix/DataMatrixReader */ "./node_modules/@zxing/library/esm5/core/datamatrix/DataMatrixReader.js");
/**
 * QR Code reader to use from browser.
 *
 * @class BrowserQRCodeReader
 * @extends {BrowserCodeReader}
 */
var BrowserDatamatrixCodeReader = /** @class */ (function (_super) {
    __extends(BrowserDatamatrixCodeReader, _super);
    /**
     * Creates an instance of BrowserQRCodeReader.
     * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
     *
     * @memberOf BrowserQRCodeReader
     */
    function BrowserDatamatrixCodeReader(timeBetweenScansMillis) {
        if (timeBetweenScansMillis === void 0) { timeBetweenScansMillis = 500; }
        return _super.call(this, new DataMatrixReader_1.default(), timeBetweenScansMillis) || this;
    }
    return BrowserDatamatrixCodeReader;
}(BrowserCodeReader_1.BrowserCodeReader));
exports.BrowserDatamatrixCodeReader = BrowserDatamatrixCodeReader;
//# sourceMappingURL=BrowserDatamatrixCodeReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/browser/BrowserQRCodeReader.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/browser/BrowserQRCodeReader.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserCodeReader_1 = __webpack_require__(/*! ./BrowserCodeReader */ "./node_modules/@zxing/library/esm5/browser/BrowserCodeReader.js");
var QRCodeReader_1 = __webpack_require__(/*! ../core/qrcode/QRCodeReader */ "./node_modules/@zxing/library/esm5/core/qrcode/QRCodeReader.js");
/**
 * QR Code reader to use from browser.
 *
 * @class BrowserQRCodeReader
 * @extends {BrowserCodeReader}
 */
var BrowserQRCodeReader = /** @class */ (function (_super) {
    __extends(BrowserQRCodeReader, _super);
    /**
     * Creates an instance of BrowserQRCodeReader.
     * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
     *
     * @memberOf BrowserQRCodeReader
     */
    function BrowserQRCodeReader(timeBetweenScansMillis) {
        if (timeBetweenScansMillis === void 0) { timeBetweenScansMillis = 500; }
        return _super.call(this, new QRCodeReader_1.default(), timeBetweenScansMillis) || this;
    }
    return BrowserQRCodeReader;
}(BrowserCodeReader_1.BrowserCodeReader));
exports.BrowserQRCodeReader = BrowserQRCodeReader;
//# sourceMappingURL=BrowserQRCodeReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/browser/BrowserQRCodeSvgWriter.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/browser/BrowserQRCodeSvgWriter.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EncodeHintType_1 = __webpack_require__(/*! ../core/EncodeHintType */ "./node_modules/@zxing/library/esm5/core/EncodeHintType.js");
var Encoder_1 = __webpack_require__(/*! ../core/qrcode/encoder/Encoder */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/Encoder.js");
var ErrorCorrectionLevel_1 = __webpack_require__(/*! ../core/qrcode/decoder/ErrorCorrectionLevel */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/ErrorCorrectionLevel.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../core/IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
var IllegalStateException_1 = __webpack_require__(/*! ../core/IllegalStateException */ "./node_modules/@zxing/library/esm5/core/IllegalStateException.js");
var BrowserQRCodeSvgWriter = /** @class */ (function () {
    /**
     * Constructs. 😉
     */
    function BrowserQRCodeSvgWriter(containerElement) {
        if (typeof containerElement === 'string') {
            this.containerElement = document.getElementById(containerElement);
        }
        else {
            this.containerElement = containerElement;
        }
    }
    BrowserQRCodeSvgWriter.prototype.write = function (contents, width, height, hints) {
        if (hints === void 0) { hints = null; }
        if (contents.length === 0) {
            throw new IllegalArgumentException_1.default('Found empty contents');
        }
        // if (format != BarcodeFormat.QR_CODE) {
        //   throw new IllegalArgumentException("Can only encode QR_CODE, but got " + format)
        // }
        if (width < 0 || height < 0) {
            throw new IllegalArgumentException_1.default('Requested dimensions are too small: ' + width + 'x' + height);
        }
        var errorCorrectionLevel = ErrorCorrectionLevel_1.default.L;
        var quietZone = BrowserQRCodeSvgWriter.QUIET_ZONE_SIZE;
        if (hints !== null) {
            if (undefined !== hints.get(EncodeHintType_1.default.ERROR_CORRECTION)) {
                errorCorrectionLevel = ErrorCorrectionLevel_1.default.fromString(hints.get(EncodeHintType_1.default.ERROR_CORRECTION).toString());
            }
            if (undefined !== hints.get(EncodeHintType_1.default.MARGIN)) {
                quietZone = Number.parseInt(hints.get(EncodeHintType_1.default.MARGIN).toString(), 10);
            }
        }
        var code = Encoder_1.default.encode(contents, errorCorrectionLevel, hints);
        return this.renderResult(code, width, height, quietZone);
    };
    /**
     * Note that the input matrix uses 0 == white, 1 == black.
     * The output matrix uses 0 == black, 255 == white (i.e. an 8 bit greyscale bitmap).
     */
    BrowserQRCodeSvgWriter.prototype.renderResult = function (code, width /*int*/, height /*int*/, quietZone /*int*/) {
        var input = code.getMatrix();
        if (input === null) {
            throw new IllegalStateException_1.default();
        }
        var inputWidth = input.getWidth();
        var inputHeight = input.getHeight();
        var qrWidth = inputWidth + (quietZone * 2);
        var qrHeight = inputHeight + (quietZone * 2);
        var outputWidth = Math.max(width, qrWidth);
        var outputHeight = Math.max(height, qrHeight);
        var multiple = Math.min(Math.floor(outputWidth / qrWidth), Math.floor(outputHeight / qrHeight));
        // Padding includes both the quiet zone and the extra white pixels to accommodate the requested
        // dimensions. For example, if input is 25x25 the QR will be 33x33 including the quiet zone.
        // If the requested size is 200x160, the multiple will be 4, for a QR of 132x132. These will
        // handle all the padding from 100x100 (the actual QR) up to 200x160.
        var leftPadding = Math.floor((outputWidth - (inputWidth * multiple)) / 2);
        var topPadding = Math.floor((outputHeight - (inputHeight * multiple)) / 2);
        var svgElement = this.createSVGElement(outputWidth, outputHeight);
        this.containerElement.appendChild(svgElement);
        for (var inputY = 0, outputY = topPadding; inputY < inputHeight; inputY++, outputY += multiple) {
            // Write the contents of this row of the barcode
            for (var inputX = 0, outputX = leftPadding; inputX < inputWidth; inputX++, outputX += multiple) {
                if (input.get(inputX, inputY) === 1) {
                    var svgRectElement = this.createSvgRectElement(outputX, outputY, multiple, multiple);
                    svgElement.appendChild(svgRectElement);
                }
            }
        }
        return svgElement;
    };
    BrowserQRCodeSvgWriter.prototype.createSVGElement = function (w, h) {
        var svgElement = document.createElementNS(BrowserQRCodeSvgWriter.SVG_NS, 'svg');
        svgElement.setAttributeNS(null, 'height', w.toString());
        svgElement.setAttributeNS(null, 'width', h.toString());
        return svgElement;
    };
    BrowserQRCodeSvgWriter.prototype.createSvgRectElement = function (x, y, w, h) {
        var rect = document.createElementNS(BrowserQRCodeSvgWriter.SVG_NS, 'rect');
        rect.setAttributeNS(null, 'x', x.toString());
        rect.setAttributeNS(null, 'y', y.toString());
        rect.setAttributeNS(null, 'height', w.toString());
        rect.setAttributeNS(null, 'width', h.toString());
        rect.setAttributeNS(null, 'fill', '#000000');
        return rect;
    };
    BrowserQRCodeSvgWriter.QUIET_ZONE_SIZE = 4;
    /**
     * SVG markup NameSpace
     */
    BrowserQRCodeSvgWriter.SVG_NS = 'http://www.w3.org/2000/svg';
    return BrowserQRCodeSvgWriter;
}());
exports.BrowserQRCodeSvgWriter = BrowserQRCodeSvgWriter;
//# sourceMappingURL=BrowserQRCodeSvgWriter.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/browser/HTMLCanvasElementLuminanceSource.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/browser/HTMLCanvasElementLuminanceSource.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var InvertedLuminanceSource_1 = __webpack_require__(/*! ../core/InvertedLuminanceSource */ "./node_modules/@zxing/library/esm5/core/InvertedLuminanceSource.js");
var LuminanceSource_1 = __webpack_require__(/*! ../core/LuminanceSource */ "./node_modules/@zxing/library/esm5/core/LuminanceSource.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../core/IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
var HTMLCanvasElementLuminanceSource = /** @class */ (function (_super) {
    __extends(HTMLCanvasElementLuminanceSource, _super);
    function HTMLCanvasElementLuminanceSource(canvas) {
        var _this = _super.call(this, canvas.width, canvas.height) || this;
        _this.canvas = canvas;
        _this.tempCanvasElement = null;
        _this.buffer = HTMLCanvasElementLuminanceSource.makeBufferFromCanvasImageData(canvas);
        return _this;
    }
    HTMLCanvasElementLuminanceSource.makeBufferFromCanvasImageData = function (canvas) {
        var imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        return HTMLCanvasElementLuminanceSource.toGrayscaleBuffer(imageData.data, canvas.width, canvas.height);
    };
    HTMLCanvasElementLuminanceSource.toGrayscaleBuffer = function (imageBuffer, width, height) {
        var grayscaleBuffer = new Uint8ClampedArray(width * height);
        for (var i = 0, j = 0, length_1 = imageBuffer.length; i < length_1; i += 4, j++) {
            var gray = void 0;
            var alpha = imageBuffer[i + 3];
            // The color of fully-transparent pixels is irrelevant. They are often, technically, fully-transparent
            // black (0 alpha, and then 0 RGB). They are often used, of course as the "white" area in a
            // barcode image. Force any such pixel to be white:
            if (alpha === 0) {
                gray = 0xFF;
            }
            else {
                var pixelR = imageBuffer[i];
                var pixelG = imageBuffer[i + 1];
                var pixelB = imageBuffer[i + 2];
                // .299R + 0.587G + 0.114B (YUV/YIQ for PAL and NTSC),
                // (306*R) >> 10 is approximately equal to R*0.299, and so on.
                // 0x200 >> 10 is 0.5, it implements rounding.
                gray = (306 * pixelR +
                    601 * pixelG +
                    117 * pixelB +
                    0x200) >> 10;
            }
            grayscaleBuffer[j] = gray;
        }
        return grayscaleBuffer;
    };
    HTMLCanvasElementLuminanceSource.prototype.getRow = function (y /*int*/, row) {
        if (y < 0 || y >= this.getHeight()) {
            throw new IllegalArgumentException_1.default('Requested row is outside the image: ' + y);
        }
        var width = this.getWidth();
        var start = y * width;
        if (row === null) {
            row = this.buffer.slice(start, start + width);
        }
        else {
            if (row.length < width) {
                row = new Uint8ClampedArray(width);
            }
            // The underlying raster of image consists of bytes with the luminance values
            // TODO: can avoid set/slice?
            row.set(this.buffer.slice(start, start + width));
        }
        return row;
    };
    HTMLCanvasElementLuminanceSource.prototype.getMatrix = function () {
        return this.buffer;
    };
    HTMLCanvasElementLuminanceSource.prototype.isCropSupported = function () {
        return true;
    };
    HTMLCanvasElementLuminanceSource.prototype.crop = function (left /*int*/, top /*int*/, width /*int*/, height /*int*/) {
        this.crop(left, top, width, height);
        return this;
    };
    /**
     * This is always true, since the image is a gray-scale image.
     *
     * @return true
     */
    HTMLCanvasElementLuminanceSource.prototype.isRotateSupported = function () {
        return true;
    };
    HTMLCanvasElementLuminanceSource.prototype.rotateCounterClockwise = function () {
        this.rotate(-90);
        return this;
    };
    HTMLCanvasElementLuminanceSource.prototype.rotateCounterClockwise45 = function () {
        this.rotate(-45);
        return this;
    };
    HTMLCanvasElementLuminanceSource.prototype.getTempCanvasElement = function () {
        if (null === this.tempCanvasElement) {
            var tempCanvasElement = this.canvas.ownerDocument.createElement('canvas');
            tempCanvasElement.style.width = this.canvas.width + "px";
            tempCanvasElement.style.height = this.canvas.height + "px";
            this.tempCanvasElement = tempCanvasElement;
        }
        return this.tempCanvasElement;
    };
    HTMLCanvasElementLuminanceSource.prototype.rotate = function (angle) {
        var tempCanvasElement = this.getTempCanvasElement();
        var tempContext = tempCanvasElement.getContext('2d');
        tempContext.rotate(angle * HTMLCanvasElementLuminanceSource.DEGREE_TO_RADIANS);
        tempContext.drawImage(this.canvas, 0, 0);
        this.buffer = HTMLCanvasElementLuminanceSource.makeBufferFromCanvasImageData(tempCanvasElement);
        return this;
    };
    HTMLCanvasElementLuminanceSource.prototype.invert = function () {
        return new InvertedLuminanceSource_1.default(this);
    };
    HTMLCanvasElementLuminanceSource.DEGREE_TO_RADIANS = Math.PI / 180;
    return HTMLCanvasElementLuminanceSource;
}(LuminanceSource_1.default));
exports.HTMLCanvasElementLuminanceSource = HTMLCanvasElementLuminanceSource;
//# sourceMappingURL=HTMLCanvasElementLuminanceSource.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/browser/VideoInputDevice.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/browser/VideoInputDevice.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Video input device metadata containing the id and label of the device if available.
 *
 * @export
 * @class VideoInputDevice
 */
Object.defineProperty(exports, "__esModule", { value: true });
var VideoInputDevice = /** @class */ (function () {
    /**
     * Creates an instance of VideoInputDevice.
     * @param {string} deviceId the video input device id
     * @param {string} label the label of the device if available
     *
     * @memberOf VideoInputDevice
     */
    function VideoInputDevice(deviceId, label) {
        this.deviceId = deviceId;
        this.label = label;
    }
    return VideoInputDevice;
}());
exports.VideoInputDevice = VideoInputDevice;
//# sourceMappingURL=VideoInputDevice.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/ArgumentException.js":
/*!********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/ArgumentException.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var ArgumentException = /** @class */ (function (_super) {
    __extends(ArgumentException, _super);
    function ArgumentException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ArgumentException;
}(Exception_1.default));
exports.default = ArgumentException;
//# sourceMappingURL=ArgumentException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/ArithmeticException.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/ArithmeticException.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var ArithmeticException = /** @class */ (function (_super) {
    __extends(ArithmeticException, _super);
    function ArithmeticException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ArithmeticException;
}(Exception_1.default));
exports.default = ArithmeticException;
//# sourceMappingURL=ArithmeticException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js":
/*!****************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/BarcodeFormat.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Direct port to TypeScript of ZXing by Adrian Toșcă
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*namespace com.google.zxing {*/
/**
 * Enumerates barcode formats known to this package. Please keep alphabetized.
 *
 * @author Sean Owen
 */
var BarcodeFormat;
(function (BarcodeFormat) {
    /** Aztec 2D barcode format. */
    BarcodeFormat[BarcodeFormat["AZTEC"] = 0] = "AZTEC";
    /** CODABAR 1D format. */
    BarcodeFormat[BarcodeFormat["CODABAR"] = 1] = "CODABAR";
    /** Code 39 1D format. */
    BarcodeFormat[BarcodeFormat["CODE_39"] = 2] = "CODE_39";
    /** Code 93 1D format. */
    BarcodeFormat[BarcodeFormat["CODE_93"] = 3] = "CODE_93";
    /** Code 128 1D format. */
    BarcodeFormat[BarcodeFormat["CODE_128"] = 4] = "CODE_128";
    /** Data Matrix 2D barcode format. */
    BarcodeFormat[BarcodeFormat["DATA_MATRIX"] = 5] = "DATA_MATRIX";
    /** EAN-8 1D format. */
    BarcodeFormat[BarcodeFormat["EAN_8"] = 6] = "EAN_8";
    /** EAN-13 1D format. */
    BarcodeFormat[BarcodeFormat["EAN_13"] = 7] = "EAN_13";
    /** ITF (Interleaved Two of Five) 1D format. */
    BarcodeFormat[BarcodeFormat["ITF"] = 8] = "ITF";
    /** MaxiCode 2D barcode format. */
    BarcodeFormat[BarcodeFormat["MAXICODE"] = 9] = "MAXICODE";
    /** PDF417 format. */
    BarcodeFormat[BarcodeFormat["PDF_417"] = 10] = "PDF_417";
    /** QR Code 2D barcode format. */
    BarcodeFormat[BarcodeFormat["QR_CODE"] = 11] = "QR_CODE";
    /** RSS 14 */
    BarcodeFormat[BarcodeFormat["RSS_14"] = 12] = "RSS_14";
    /** RSS EXPANDED */
    BarcodeFormat[BarcodeFormat["RSS_EXPANDED"] = 13] = "RSS_EXPANDED";
    /** UPC-A 1D format. */
    BarcodeFormat[BarcodeFormat["UPC_A"] = 14] = "UPC_A";
    /** UPC-E 1D format. */
    BarcodeFormat[BarcodeFormat["UPC_E"] = 15] = "UPC_E";
    /** UPC/EAN extension format. Not a stand-alone format. */
    BarcodeFormat[BarcodeFormat["UPC_EAN_EXTENSION"] = 16] = "UPC_EAN_EXTENSION";
})(BarcodeFormat || (BarcodeFormat = {}));
exports.default = BarcodeFormat;
//# sourceMappingURL=BarcodeFormat.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/Binarizer.js":
/*!************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/Binarizer.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class hierarchy provides a set of methods to convert luminance data to 1 bit data.
 * It allows the algorithm to vary polymorphically, for example allowing a very expensive
 * thresholding technique for servers and a fast one for mobile. It also permits the implementation
 * to vary, e.g. a JNI version for Android and a Java fallback version for other platforms.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
var Binarizer = /** @class */ (function () {
    function Binarizer(source) {
        this.source = source;
    }
    Binarizer.prototype.getLuminanceSource = function () {
        return this.source;
    };
    Binarizer.prototype.getWidth = function () {
        return this.source.getWidth();
    };
    Binarizer.prototype.getHeight = function () {
        return this.source.getHeight();
    };
    return Binarizer;
}());
exports.default = Binarizer;
//# sourceMappingURL=Binarizer.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/BinaryBitmap.js":
/*!***************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/BinaryBitmap.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentException_1 = __webpack_require__(/*! ./IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
var BinaryBitmap = /** @class */ (function () {
    function BinaryBitmap(binarizer) {
        this.binarizer = binarizer;
        if (binarizer === null) {
            throw new IllegalArgumentException_1.default('Binarizer must be non-null.');
        }
    }
    /**
     * @return The width of the bitmap.
     */
    BinaryBitmap.prototype.getWidth = function () {
        return this.binarizer.getWidth();
    };
    /**
     * @return The height of the bitmap.
     */
    BinaryBitmap.prototype.getHeight = function () {
        return this.binarizer.getHeight();
    };
    /**
     * Converts one row of luminance data to 1 bit data. May actually do the conversion, or return
     * cached data. Callers should assume this method is expensive and call it as seldom as possible.
     * This method is intended for decoding 1D barcodes and may choose to apply sharpening.
     *
     * @param y The row to fetch, which must be in [0, bitmap height)
     * @param row An optional preallocated array. If null or too small, it will be ignored.
     *            If used, the Binarizer will call BitArray.clear(). Always use the returned object.
     * @return The array of bits for this row (true means black).
     * @throws NotFoundException if row can't be binarized
     */
    BinaryBitmap.prototype.getBlackRow = function (y /*int*/, row) {
        return this.binarizer.getBlackRow(y, row);
    };
    /**
     * Converts a 2D array of luminance data to 1 bit. As above, assume this method is expensive
     * and do not call it repeatedly. This method is intended for decoding 2D barcodes and may or
     * may not apply sharpening. Therefore, a row from this matrix may not be identical to one
     * fetched using getBlackRow(), so don't mix and match between them.
     *
     * @return The 2D array of bits for the image (true means black).
     * @throws NotFoundException if image can't be binarized to make a matrix
     */
    BinaryBitmap.prototype.getBlackMatrix = function () {
        // The matrix is created on demand the first time it is requested, then cached. There are two
        // reasons for this:
        // 1. This work will never be done if the caller only installs 1D Reader objects, or if a
        //    1D Reader finds a barcode before the 2D Readers run.
        // 2. This work will only be done once even if the caller installs multiple 2D Readers.
        if (this.matrix === null || this.matrix === undefined) {
            this.matrix = this.binarizer.getBlackMatrix();
        }
        return this.matrix;
    };
    /**
     * @return Whether this bitmap can be cropped.
     */
    BinaryBitmap.prototype.isCropSupported = function () {
        return this.binarizer.getLuminanceSource().isCropSupported();
    };
    /**
     * Returns a new object with cropped image data. Implementations may keep a reference to the
     * original data rather than a copy. Only callable if isCropSupported() is true.
     *
     * @param left The left coordinate, which must be in [0,getWidth())
     * @param top The top coordinate, which must be in [0,getHeight())
     * @param width The width of the rectangle to crop.
     * @param height The height of the rectangle to crop.
     * @return A cropped version of this object.
     */
    BinaryBitmap.prototype.crop = function (left /*int*/, top /*int*/, width /*int*/, height /*int*/) {
        var newSource = this.binarizer.getLuminanceSource().crop(left, top, width, height);
        return new BinaryBitmap(this.binarizer.createBinarizer(newSource));
    };
    /**
     * @return Whether this bitmap supports counter-clockwise rotation.
     */
    BinaryBitmap.prototype.isRotateSupported = function () {
        return this.binarizer.getLuminanceSource().isRotateSupported();
    };
    /**
     * Returns a new object with rotated image data by 90 degrees counterclockwise.
     * Only callable if {@link #isRotateSupported()} is true.
     *
     * @return A rotated version of this object.
     */
    BinaryBitmap.prototype.rotateCounterClockwise = function () {
        var newSource = this.binarizer.getLuminanceSource().rotateCounterClockwise();
        return new BinaryBitmap(this.binarizer.createBinarizer(newSource));
    };
    /**
     * Returns a new object with rotated image data by 45 degrees counterclockwise.
     * Only callable if {@link #isRotateSupported()} is true.
     *
     * @return A rotated version of this object.
     */
    BinaryBitmap.prototype.rotateCounterClockwise45 = function () {
        var newSource = this.binarizer.getLuminanceSource().rotateCounterClockwise45();
        return new BinaryBitmap(this.binarizer.createBinarizer(newSource));
    };
    /*@Override*/
    BinaryBitmap.prototype.toString = function () {
        try {
            return this.getBlackMatrix().toString();
        }
        catch (e /*: NotFoundException*/) {
            return '';
        }
    };
    return BinaryBitmap;
}());
exports.default = BinaryBitmap;
//# sourceMappingURL=BinaryBitmap.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/ChecksumException.js":
/*!********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/ChecksumException.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var ChecksumException = /** @class */ (function (_super) {
    __extends(ChecksumException, _super);
    function ChecksumException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChecksumException;
}(Exception_1.default));
exports.default = ChecksumException;
//# sourceMappingURL=ChecksumException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/EncodeHintType.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/EncodeHintType.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing {*/
/**
 * These are a set of hints that you may pass to Writers to specify their behavior.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
var EncodeHintType;
(function (EncodeHintType) {
    /**
     * Specifies what degree of error correction to use, for example in QR Codes.
     * Type depends on the encoder. For example for QR codes it's type
     * {@link com.google.zxing.qrcode.decoder.ErrorCorrectionLevel ErrorCorrectionLevel}.
     * For Aztec it is of type {@link Integer}, representing the minimal percentage of error correction words.
     * For PDF417 it is of type {@link Integer}, valid values being 0 to 8.
     * In all cases, it can also be a {@link String} representation of the desired value as well.
     * Note: an Aztec symbol should have a minimum of 25% EC words.
     */
    EncodeHintType[EncodeHintType["ERROR_CORRECTION"] = 0] = "ERROR_CORRECTION";
    /**
     * Specifies what character encoding to use where applicable (type {@link String})
     */
    EncodeHintType[EncodeHintType["CHARACTER_SET"] = 1] = "CHARACTER_SET";
    /**
     * Specifies the matrix shape for Data Matrix (type {@link com.google.zxing.datamatrix.encoder.SymbolShapeHint})
     */
    EncodeHintType[EncodeHintType["DATA_MATRIX_SHAPE"] = 2] = "DATA_MATRIX_SHAPE";
    /**
     * Specifies a minimum barcode size (type {@link Dimension}). Only applicable to Data Matrix now.
     *
     * @deprecated use width/height params in
     * {@link com.google.zxing.datamatrix.DataMatrixWriter#encode(String, BarcodeFormat, int, int)}
     */
    /*@Deprecated*/
    EncodeHintType[EncodeHintType["MIN_SIZE"] = 3] = "MIN_SIZE";
    /**
     * Specifies a maximum barcode size (type {@link Dimension}). Only applicable to Data Matrix now.
     *
     * @deprecated without replacement
     */
    /*@Deprecated*/
    EncodeHintType[EncodeHintType["MAX_SIZE"] = 4] = "MAX_SIZE";
    /**
     * Specifies margin, in pixels, to use when generating the barcode. The meaning can vary
     * by format; for example it controls margin before and after the barcode horizontally for
     * most 1D formats. (Type {@link Integer}, or {@link String} representation of the integer value).
     */
    EncodeHintType[EncodeHintType["MARGIN"] = 5] = "MARGIN";
    /**
     * Specifies whether to use compact mode for PDF417 (type {@link Boolean}, or "true" or "false"
     * {@link String} value).
     */
    EncodeHintType[EncodeHintType["PDF417_COMPACT"] = 6] = "PDF417_COMPACT";
    /**
     * Specifies what compaction mode to use for PDF417 (type
     * {@link com.google.zxing.pdf417.encoder.Compaction Compaction} or {@link String} value of one of its
     * enum values).
     */
    EncodeHintType[EncodeHintType["PDF417_COMPACTION"] = 7] = "PDF417_COMPACTION";
    /**
     * Specifies the minimum and maximum number of rows and columns for PDF417 (type
     * {@link com.google.zxing.pdf417.encoder.Dimensions Dimensions}).
     */
    EncodeHintType[EncodeHintType["PDF417_DIMENSIONS"] = 8] = "PDF417_DIMENSIONS";
    /**
     * Specifies the required number of layers for an Aztec code.
     * A negative number (-1, -2, -3, -4) specifies a compact Aztec code.
     * 0 indicates to use the minimum number of layers (the default).
     * A positive number (1, 2, .. 32) specifies a normal (non-compact) Aztec code.
     * (Type {@link Integer}, or {@link String} representation of the integer value).
     */
    EncodeHintType[EncodeHintType["AZTEC_LAYERS"] = 9] = "AZTEC_LAYERS";
    /**
     * Specifies the exact version of QR code to be encoded.
     * (Type {@link Integer}, or {@link String} representation of the integer value).
     */
    EncodeHintType[EncodeHintType["QR_VERSION"] = 10] = "QR_VERSION";
})(EncodeHintType || (EncodeHintType = {}));
exports.default = EncodeHintType;
//# sourceMappingURL=EncodeHintType.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/Exception.js":
/*!************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/Exception.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts_custom_error_1 = __webpack_require__(/*! ts-custom-error */ "./node_modules/ts-custom-error/dist/custom-error.umd.js");
/**
 * Custom Error class of type Exception.
 */
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    /**
     * Allows Exception to be constructed directly
     * with some message and prototype definition.
     */
    function Exception(message) {
        if (message === void 0) { message = undefined; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    return Exception;
}(ts_custom_error_1.CustomError));
exports.default = Exception;
//# sourceMappingURL=Exception.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/FormatException.js":
/*!******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/FormatException.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var FormatException = /** @class */ (function (_super) {
    __extends(FormatException, _super);
    function FormatException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FormatException;
}(Exception_1.default));
exports.default = FormatException;
//# sourceMappingURL=FormatException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var IllegalArgumentException = /** @class */ (function (_super) {
    __extends(IllegalArgumentException, _super);
    function IllegalArgumentException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IllegalArgumentException;
}(Exception_1.default));
exports.default = IllegalArgumentException;
//# sourceMappingURL=IllegalArgumentException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/IllegalStateException.js":
/*!************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/IllegalStateException.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var IllegalStateException = /** @class */ (function (_super) {
    __extends(IllegalStateException, _super);
    function IllegalStateException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IllegalStateException;
}(Exception_1.default));
exports.default = IllegalStateException;
//# sourceMappingURL=IllegalStateException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/InvertedLuminanceSource.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/InvertedLuminanceSource.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LuminanceSource_1 = __webpack_require__(/*! ./LuminanceSource */ "./node_modules/@zxing/library/esm5/core/LuminanceSource.js");
/*namespace com.google.zxing {*/
/**
 * A wrapper implementation of {@link LuminanceSource} which inverts the luminances it returns -- black becomes
 * white and vice versa, and each value becomes (255-value).
 *
 * @author Sean Owen
 */
var InvertedLuminanceSource = /** @class */ (function (_super) {
    __extends(InvertedLuminanceSource, _super);
    function InvertedLuminanceSource(delegate) {
        var _this = _super.call(this, delegate.getWidth(), delegate.getHeight()) || this;
        _this.delegate = delegate;
        return _this;
    }
    /*@Override*/
    InvertedLuminanceSource.prototype.getRow = function (y /*int*/, row) {
        var sourceRow = this.delegate.getRow(y, row);
        var width = this.getWidth();
        for (var i = 0; i < width; i++) {
            sourceRow[i] = /*(byte)*/ (255 - (sourceRow[i] & 0xFF));
        }
        return sourceRow;
    };
    /*@Override*/
    InvertedLuminanceSource.prototype.getMatrix = function () {
        var matrix = this.delegate.getMatrix();
        var length = this.getWidth() * this.getHeight();
        var invertedMatrix = new Uint8ClampedArray(length);
        for (var i = 0; i < length; i++) {
            invertedMatrix[i] = /*(byte)*/ (255 - (matrix[i] & 0xFF));
        }
        return invertedMatrix;
    };
    /*@Override*/
    InvertedLuminanceSource.prototype.isCropSupported = function () {
        return this.delegate.isCropSupported();
    };
    /*@Override*/
    InvertedLuminanceSource.prototype.crop = function (left /*int*/, top /*int*/, width /*int*/, height /*int*/) {
        return new InvertedLuminanceSource(this.delegate.crop(left, top, width, height));
    };
    /*@Override*/
    InvertedLuminanceSource.prototype.isRotateSupported = function () {
        return this.delegate.isRotateSupported();
    };
    /**
     * @return original delegate {@link LuminanceSource} since invert undoes itself
     */
    /*@Override*/
    InvertedLuminanceSource.prototype.invert = function () {
        return this.delegate;
    };
    /*@Override*/
    InvertedLuminanceSource.prototype.rotateCounterClockwise = function () {
        return new InvertedLuminanceSource(this.delegate.rotateCounterClockwise());
    };
    /*@Override*/
    InvertedLuminanceSource.prototype.rotateCounterClockwise45 = function () {
        return new InvertedLuminanceSource(this.delegate.rotateCounterClockwise45());
    };
    return InvertedLuminanceSource;
}(LuminanceSource_1.default));
exports.default = InvertedLuminanceSource;
//# sourceMappingURL=InvertedLuminanceSource.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/LuminanceSource.js":
/*!******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/LuminanceSource.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var StringBuilder_1 = __webpack_require__(/*! ./util/StringBuilder */ "./node_modules/@zxing/library/esm5/core/util/StringBuilder.js");
var UnsupportedOperationException_1 = __webpack_require__(/*! ./UnsupportedOperationException */ "./node_modules/@zxing/library/esm5/core/UnsupportedOperationException.js");
/*namespace com.google.zxing {*/
/**
 * The purpose of this class hierarchy is to abstract different bitmap implementations across
 * platforms into a standard interface for requesting greyscale luminance values. The interface
 * only provides immutable methods; therefore crop and rotation create copies. This is to ensure
 * that one Reader does not modify the original luminance source and leave it in an unknown state
 * for other Readers in the chain.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
var LuminanceSource = /** @class */ (function () {
    function LuminanceSource(width /*int*/, height /*int*/) {
        this.width = width;
        this.height = height;
    }
    /**
     * @return The width of the bitmap.
     */
    LuminanceSource.prototype.getWidth = function () {
        return this.width;
    };
    /**
     * @return The height of the bitmap.
     */
    LuminanceSource.prototype.getHeight = function () {
        return this.height;
    };
    /**
     * @return Whether this subclass supports cropping.
     */
    LuminanceSource.prototype.isCropSupported = function () {
        return false;
    };
    /**
     * Returns a new object with cropped image data. Implementations may keep a reference to the
     * original data rather than a copy. Only callable if isCropSupported() is true.
     *
     * @param left The left coordinate, which must be in [0,getWidth())
     * @param top The top coordinate, which must be in [0,getHeight())
     * @param width The width of the rectangle to crop.
     * @param height The height of the rectangle to crop.
     * @return A cropped version of this object.
     */
    LuminanceSource.prototype.crop = function (left /*int*/, top /*int*/, width /*int*/, height /*int*/) {
        throw new UnsupportedOperationException_1.default('This luminance source does not support cropping.');
    };
    /**
     * @return Whether this subclass supports counter-clockwise rotation.
     */
    LuminanceSource.prototype.isRotateSupported = function () {
        return false;
    };
    /**
     * Returns a new object with rotated image data by 90 degrees counterclockwise.
     * Only callable if {@link #isRotateSupported()} is true.
     *
     * @return A rotated version of this object.
     */
    LuminanceSource.prototype.rotateCounterClockwise = function () {
        throw new UnsupportedOperationException_1.default('This luminance source does not support rotation by 90 degrees.');
    };
    /**
     * Returns a new object with rotated image data by 45 degrees counterclockwise.
     * Only callable if {@link #isRotateSupported()} is true.
     *
     * @return A rotated version of this object.
     */
    LuminanceSource.prototype.rotateCounterClockwise45 = function () {
        throw new UnsupportedOperationException_1.default('This luminance source does not support rotation by 45 degrees.');
    };
    /*@Override*/
    LuminanceSource.prototype.toString = function () {
        var row = new Uint8ClampedArray(this.width);
        var result = new StringBuilder_1.default();
        for (var y = 0; y < this.height; y++) {
            var sourceRow = this.getRow(y, row);
            for (var x = 0; x < this.width; x++) {
                var luminance = sourceRow[x] & 0xFF;
                var c = void 0;
                if (luminance < 0x40) {
                    c = '#';
                }
                else if (luminance < 0x80) {
                    c = '+';
                }
                else if (luminance < 0xC0) {
                    c = '.';
                }
                else {
                    c = ' ';
                }
                result.append(c);
            }
            result.append('\n');
        }
        return result.toString();
    };
    return LuminanceSource;
}());
exports.default = LuminanceSource;
//# sourceMappingURL=LuminanceSource.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/MultiFormatReader.js":
/*!********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/MultiFormatReader.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BarcodeFormat_1 = __webpack_require__(/*! ./BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var QRCodeReader_1 = __webpack_require__(/*! ./qrcode/QRCodeReader */ "./node_modules/@zxing/library/esm5/core/qrcode/QRCodeReader.js");
var MultiFormatOneDReader_1 = __webpack_require__(/*! ./oned/MultiFormatOneDReader */ "./node_modules/@zxing/library/esm5/core/oned/MultiFormatOneDReader.js");
var DataMatrixReader_1 = __webpack_require__(/*! ./datamatrix/DataMatrixReader */ "./node_modules/@zxing/library/esm5/core/datamatrix/DataMatrixReader.js");
var NotFoundException_1 = __webpack_require__(/*! ./NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
var ReaderException_1 = __webpack_require__(/*! ./ReaderException */ "./node_modules/@zxing/library/esm5/core/ReaderException.js");
/*namespace com.google.zxing {*/
/**
 * MultiFormatReader is a convenience class and the main entry point into the library for most uses.
 * By default it attempts to decode all barcode formats that the library supports. Optionally, you
 * can provide a hints object to request different behavior, for example only decoding QR codes.
 *
 * @author Sean Owen
 * @author dswitkin@google.com (Daniel Switkin)
 */
var MultiFormatReader = /** @class */ (function () {
    function MultiFormatReader() {
    }
    /**
     * This version of decode honors the intent of Reader.decode(BinaryBitmap) in that it
     * passes null as a hint to the decoders. However, that makes it inefficient to call repeatedly.
     * Use setHints() followed by decodeWithState() for continuous scan applications.
     *
     * @param image The pixel data to decode
     * @return The contents of the image
     *
     * @throws NotFoundException Any errors which occurred
     */
    /*@Override*/
    // public decode(image: BinaryBitmap): Result {
    //   setHints(null)
    //   return decodeInternal(image)
    // }
    /**
     * Decode an image using the hints provided. Does not honor existing state.
     *
     * @param image The pixel data to decode
     * @param hints The hints to use, clearing the previous state.
     * @return The contents of the image
     *
     * @throws NotFoundException Any errors which occurred
     */
    /*@Override*/
    MultiFormatReader.prototype.decode = function (image, hints) {
        this.setHints(hints);
        return this.decodeInternal(image);
    };
    /**
     * Decode an image using the state set up by calling setHints() previously. Continuous scan
     * clients will get a <b>large</b> speed increase by using this instead of decode().
     *
     * @param image The pixel data to decode
     * @return The contents of the image
     *
     * @throws NotFoundException Any errors which occurred
     */
    MultiFormatReader.prototype.decodeWithState = function (image) {
        // Make sure to set up the default state so we don't crash
        if (this.readers === null || this.readers === undefined) {
            this.setHints(null);
        }
        return this.decodeInternal(image);
    };
    /**
     * This method adds state to the MultiFormatReader. By setting the hints once, subsequent calls
     * to decodeWithState(image) can reuse the same set of readers without reallocating memory. This
     * is important for performance in continuous scan clients.
     *
     * @param hints The set of hints to use for subsequent calls to decode(image)
     */
    MultiFormatReader.prototype.setHints = function (hints) {
        this.hints = hints;
        var tryHarder = hints !== null && hints !== undefined && undefined !== hints.get(3 /* TRY_HARDER */);
        /*@SuppressWarnings("unchecked")*/
        var formats = hints === null || hints === undefined ? null : hints.get(2 /* POSSIBLE_FORMATS */);
        var readers = new Array();
        if (formats !== null && formats !== undefined) {
            var addOneDReader = formats.some(function (f) {
                return f === BarcodeFormat_1.default.UPC_A ||
                    f === BarcodeFormat_1.default.UPC_E ||
                    f === BarcodeFormat_1.default.EAN_13 ||
                    f === BarcodeFormat_1.default.EAN_8 ||
                    f === BarcodeFormat_1.default.CODABAR ||
                    f === BarcodeFormat_1.default.CODE_39 ||
                    f === BarcodeFormat_1.default.CODE_93 ||
                    f === BarcodeFormat_1.default.CODE_128 ||
                    f === BarcodeFormat_1.default.ITF ||
                    f === BarcodeFormat_1.default.RSS_14 ||
                    f === BarcodeFormat_1.default.RSS_EXPANDED;
            });
            // Put 1D readers upfront in "normal" mode
            // TYPESCRIPTPORT: TODO: uncomment below as they are ported
            if (addOneDReader && !tryHarder) {
                readers.push(new MultiFormatOneDReader_1.default(hints));
            }
            if (formats.includes(BarcodeFormat_1.default.QR_CODE)) {
                readers.push(new QRCodeReader_1.default());
            }
            if (formats.includes(BarcodeFormat_1.default.DATA_MATRIX)) {
                readers.push(new DataMatrixReader_1.default());
            }
            // if (formats.includes(BarcodeFormat.AZTEC)) {
            //   readers.push(new AztecReader())
            // }
            // if (formats.includes(BarcodeFormat.PDF_417)) {
            //    readers.push(new PDF417Reader())
            // }
            // if (formats.includes(BarcodeFormat.MAXICODE)) {
            //    readers.push(new MaxiCodeReader())
            // }
            // At end in "try harder" mode
            if (addOneDReader && tryHarder) {
                readers.push(new MultiFormatOneDReader_1.default(hints));
            }
        }
        if (readers.length === 0) {
            if (!tryHarder) {
                readers.push(new MultiFormatOneDReader_1.default(hints));
            }
            readers.push(new QRCodeReader_1.default());
            readers.push(new DataMatrixReader_1.default());
            // readers.push(new AztecReader())
            // readers.push(new PDF417Reader())
            // readers.push(new MaxiCodeReader())
            if (tryHarder) {
                readers.push(new MultiFormatOneDReader_1.default(hints));
            }
        }
        this.readers = readers; // .toArray(new Reader[readers.size()])
    };
    /*@Override*/
    MultiFormatReader.prototype.reset = function () {
        if (this.readers !== null) {
            for (var _i = 0, _a = this.readers; _i < _a.length; _i++) {
                var reader = _a[_i];
                reader.reset();
            }
        }
    };
    /**
     * @throws NotFoundException
     */
    MultiFormatReader.prototype.decodeInternal = function (image) {
        if (this.readers === null) {
            throw new ReaderException_1.default('No readers where selected, nothing can be read.');
        }
        for (var _i = 0, _a = this.readers; _i < _a.length; _i++) {
            var reader = _a[_i];
            // console.log(`Trying to decode with ${reader.constructor.name} reader.`);
            try {
                return reader.decode(image, this.hints);
            }
            catch (ex) {
                if (ex instanceof ReaderException_1.default) {
                    continue;
                }
                // Uncomment for test outputting.
                // const extra = !ex.message ? '.' : ` with the message: \n\n\t${ex.message}\n\n`;
                // console.error('[decodeInternal]', `Exception of type \`${ex.constructor.name}\` was thrown${extra}`);
            }
        }
        throw new NotFoundException_1.default('No MultiFormat Readers were able to detect the code.');
    };
    return MultiFormatReader;
}());
exports.default = MultiFormatReader;
//# sourceMappingURL=MultiFormatReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/MultiFormatWriter.js":
/*!********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/MultiFormatWriter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import DataMatrixWriter from './datamatrix/DataMatrixWriter'
// import CodaBarWriter from './oned/CodaBarWriter'
// import Code128Writer from './oned/Code128Writer'
// import Code39Writer from './oned/Code39Writer'
// import Code93Writer from './oned/Code93Writer'
// import EAN13Writer from './oned/EAN13Writer'
// import EAN8Writer from './oned/EAN8Writer'
// import ITFWriter from './oned/ITFWriter'
// import UPCAWriter from './oned/UPCAWriter'
// import UPCEWriter from './oned/UPCEWriter'
// import PDF417Writer from './pdf417/PDF417Writer'
var QRCodeWriter_1 = __webpack_require__(/*! ./qrcode/QRCodeWriter */ "./node_modules/@zxing/library/esm5/core/qrcode/QRCodeWriter.js");
var BarcodeFormat_1 = __webpack_require__(/*! ./BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ./IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/*import java.util.Map;*/
/**
 * This is a factory class which finds the appropriate Writer subclass for the BarcodeFormat
 * requested and encodes the barcode with the supplied contents.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
var MultiFormatWriter = /** @class */ (function () {
    function MultiFormatWriter() {
    }
    /*@Override*/
    // public encode(contents: string,
    //                         format: BarcodeFormat,
    //                         width: number /*int*/,
    //                         height: number /*int*/): BitMatrix /*throws WriterException */ {
    //   return encode(contents, format, width, height, null)
    // }
    /*@Override*/
    MultiFormatWriter.prototype.encode = function (contents, format, width /*int*/, height /*int*/, hints) {
        var writer;
        switch (format) {
            // case BarcodeFormat.EAN_8:
            //   writer = new EAN8Writer()
            //   break
            // case BarcodeFormat.UPC_E:
            //   writer = new UPCEWriter()
            //   break
            // case BarcodeFormat.EAN_13:
            //   writer = new EAN13Writer()
            //   break
            // case BarcodeFormat.UPC_A:
            //   writer = new UPCAWriter()
            //   break
            case BarcodeFormat_1.default.QR_CODE:
                writer = new QRCodeWriter_1.default();
                break;
            // case BarcodeFormat.CODE_39:
            //   writer = new Code39Writer()
            //   break
            // case BarcodeFormat.CODE_93:
            //   writer = new Code93Writer()
            //   break
            // case BarcodeFormat.CODE_128:
            //   writer = new Code128Writer()
            //   break
            // case BarcodeFormat.ITF:
            //   writer = new ITFWriter()
            //   break
            // case BarcodeFormat.PDF_417:
            //   writer = new PDF417Writer()
            //   break
            // case BarcodeFormat.CODABAR:
            //   writer = new CodaBarWriter()
            //   break
            // case BarcodeFormat.DATA_MATRIX:
            //   writer = new DataMatrixWriter()
            //   break
            // case BarcodeFormat.AZTEC:
            //   writer = new AztecWriter()
            //   break
            default:
                throw new IllegalArgumentException_1.default('No encoder available for format ' + format);
        }
        return writer.encode(contents, format, width, height, hints);
    };
    return MultiFormatWriter;
}());
exports.default = MultiFormatWriter;
//# sourceMappingURL=MultiFormatWriter.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/NotFoundException.js":
/*!********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/NotFoundException.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var NotFoundException = /** @class */ (function (_super) {
    __extends(NotFoundException, _super);
    function NotFoundException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotFoundException;
}(Exception_1.default));
exports.default = NotFoundException;
//# sourceMappingURL=NotFoundException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/PlanarYUVLuminanceSource.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/PlanarYUVLuminanceSource.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing {*/
var System_1 = __webpack_require__(/*! ./util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var LuminanceSource_1 = __webpack_require__(/*! ./LuminanceSource */ "./node_modules/@zxing/library/esm5/core/LuminanceSource.js");
var InvertedLuminanceSource_1 = __webpack_require__(/*! ./InvertedLuminanceSource */ "./node_modules/@zxing/library/esm5/core/InvertedLuminanceSource.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ./IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * This object extends LuminanceSource around an array of YUV data returned from the camera driver,
 * with the option to crop to a rectangle within the full data. This can be used to exclude
 * superfluous pixels around the perimeter and speed up decoding.
 *
 * It works for any pixel format where the Y channel is planar and appears first, including
 * YCbCr_420_SP and YCbCr_422_SP.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
var PlanarYUVLuminanceSource = /** @class */ (function (_super) {
    __extends(PlanarYUVLuminanceSource, _super);
    function PlanarYUVLuminanceSource(yuvData, dataWidth /*int*/, dataHeight /*int*/, left /*int*/, top /*int*/, width /*int*/, height /*int*/, reverseHorizontal) {
        var _this = _super.call(this, width, height) || this;
        _this.yuvData = yuvData;
        _this.dataWidth = dataWidth;
        _this.dataHeight = dataHeight;
        _this.left = left;
        _this.top = top;
        if (left + width > dataWidth || top + height > dataHeight) {
            throw new IllegalArgumentException_1.default('Crop rectangle does not fit within image data.');
        }
        if (reverseHorizontal) {
            _this.reverseHorizontal(width, height);
        }
        return _this;
    }
    /*@Override*/
    PlanarYUVLuminanceSource.prototype.getRow = function (y /*int*/, row) {
        if (y < 0 || y >= this.getHeight()) {
            throw new IllegalArgumentException_1.default('Requested row is outside the image: ' + y);
        }
        var width = this.getWidth();
        if (row === null || row === undefined || row.length < width) {
            row = new Uint8ClampedArray(width);
        }
        var offset = (y + this.top) * this.dataWidth + this.left;
        System_1.default.arraycopy(this.yuvData, offset, row, 0, width);
        return row;
    };
    /*@Override*/
    PlanarYUVLuminanceSource.prototype.getMatrix = function () {
        var width = this.getWidth();
        var height = this.getHeight();
        // If the caller asks for the entire underlying image, save the copy and give them the
        // original data. The docs specifically warn that result.length must be ignored.
        if (width === this.dataWidth && height === this.dataHeight) {
            return this.yuvData;
        }
        var area = width * height;
        var matrix = new Uint8ClampedArray(area);
        var inputOffset = this.top * this.dataWidth + this.left;
        // If the width matches the full width of the underlying data, perform a single copy.
        if (width === this.dataWidth) {
            System_1.default.arraycopy(this.yuvData, inputOffset, matrix, 0, area);
            return matrix;
        }
        // Otherwise copy one cropped row at a time.
        for (var y = 0; y < height; y++) {
            var outputOffset = y * width;
            System_1.default.arraycopy(this.yuvData, inputOffset, matrix, outputOffset, width);
            inputOffset += this.dataWidth;
        }
        return matrix;
    };
    /*@Override*/
    PlanarYUVLuminanceSource.prototype.isCropSupported = function () {
        return true;
    };
    /*@Override*/
    PlanarYUVLuminanceSource.prototype.crop = function (left /*int*/, top /*int*/, width /*int*/, height /*int*/) {
        return new PlanarYUVLuminanceSource(this.yuvData, this.dataWidth, this.dataHeight, this.left + left, this.top + top, width, height, false);
    };
    PlanarYUVLuminanceSource.prototype.renderThumbnail = function () {
        var width = this.getWidth() / PlanarYUVLuminanceSource.THUMBNAIL_SCALE_FACTOR;
        var height = this.getHeight() / PlanarYUVLuminanceSource.THUMBNAIL_SCALE_FACTOR;
        var pixels = new Int32Array(width * height);
        var yuv = this.yuvData;
        var inputOffset = this.top * this.dataWidth + this.left;
        for (var y = 0; y < height; y++) {
            var outputOffset = y * width;
            for (var x = 0; x < width; x++) {
                var grey = yuv[inputOffset + x * PlanarYUVLuminanceSource.THUMBNAIL_SCALE_FACTOR] & 0xff;
                pixels[outputOffset + x] = 0xFF000000 | (grey * 0x00010101);
            }
            inputOffset += this.dataWidth * PlanarYUVLuminanceSource.THUMBNAIL_SCALE_FACTOR;
        }
        return pixels;
    };
    /**
     * @return width of image from {@link #renderThumbnail()}
     */
    PlanarYUVLuminanceSource.prototype.getThumbnailWidth = function () {
        return this.getWidth() / PlanarYUVLuminanceSource.THUMBNAIL_SCALE_FACTOR;
    };
    /**
     * @return height of image from {@link #renderThumbnail()}
     */
    PlanarYUVLuminanceSource.prototype.getThumbnailHeight = function () {
        return this.getHeight() / PlanarYUVLuminanceSource.THUMBNAIL_SCALE_FACTOR;
    };
    PlanarYUVLuminanceSource.prototype.reverseHorizontal = function (width /*int*/, height /*int*/) {
        var yuvData = this.yuvData;
        for (var y = 0, rowStart = this.top * this.dataWidth + this.left; y < height; y++, rowStart += this.dataWidth) {
            var middle = rowStart + width / 2;
            for (var x1 = rowStart, x2 = rowStart + width - 1; x1 < middle; x1++, x2--) {
                var temp = yuvData[x1];
                yuvData[x1] = yuvData[x2];
                yuvData[x2] = temp;
            }
        }
    };
    PlanarYUVLuminanceSource.prototype.invert = function () {
        return new InvertedLuminanceSource_1.default(this);
    };
    PlanarYUVLuminanceSource.THUMBNAIL_SCALE_FACTOR = 2;
    return PlanarYUVLuminanceSource;
}(LuminanceSource_1.default));
exports.default = PlanarYUVLuminanceSource;
//# sourceMappingURL=PlanarYUVLuminanceSource.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/RGBLuminanceSource.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/RGBLuminanceSource.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing {*/
__webpack_require__(/*! ./InvertedLuminanceSource */ "./node_modules/@zxing/library/esm5/core/InvertedLuminanceSource.js"); // required because of circular dependencies between LuminanceSource and InvertedLuminanceSource
var InvertedLuminanceSource_1 = __webpack_require__(/*! ./InvertedLuminanceSource */ "./node_modules/@zxing/library/esm5/core/InvertedLuminanceSource.js");
var LuminanceSource_1 = __webpack_require__(/*! ./LuminanceSource */ "./node_modules/@zxing/library/esm5/core/LuminanceSource.js");
var System_1 = __webpack_require__(/*! ./util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ./IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * This class is used to help decode images from files which arrive as RGB data from
 * an ARGB pixel array. It does not support rotation.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 * @author Betaminos
 */
var RGBLuminanceSource = /** @class */ (function (_super) {
    __extends(RGBLuminanceSource, _super);
    function RGBLuminanceSource(luminances, width /*int*/, height /*int*/, dataWidth /*int*/, dataHeight /*int*/, left /*int*/, top /*int*/) {
        var _this = _super.call(this, width, height) || this;
        _this.dataWidth = dataWidth;
        _this.dataHeight = dataHeight;
        _this.left = left;
        _this.top = top;
        if (luminances.BYTES_PER_ELEMENT === 4) { // Int32Array
            var size = width * height;
            var luminancesUint8Array = new Uint8ClampedArray(size);
            for (var offset = 0; offset < size; offset++) {
                var pixel = luminances[offset];
                var r = (pixel >> 16) & 0xff; // red
                var g2 = (pixel >> 7) & 0x1fe; // 2 * green
                var b = pixel & 0xff; // blue
                // Calculate green-favouring average cheaply
                luminancesUint8Array[offset] = /*(byte) */ ((r + g2 + b) / 4) & 0xFF;
            }
            _this.luminances = luminancesUint8Array;
        }
        else {
            _this.luminances = luminances;
        }
        if (undefined === dataWidth) {
            _this.dataWidth = width;
        }
        if (undefined === dataHeight) {
            _this.dataHeight = height;
        }
        if (undefined === left) {
            _this.left = 0;
        }
        if (undefined === top) {
            _this.top = 0;
        }
        if (_this.left + width > _this.dataWidth || _this.top + height > _this.dataHeight) {
            throw new IllegalArgumentException_1.default('Crop rectangle does not fit within image data.');
        }
        return _this;
    }
    /*@Override*/
    RGBLuminanceSource.prototype.getRow = function (y /*int*/, row) {
        if (y < 0 || y >= this.getHeight()) {
            throw new IllegalArgumentException_1.default('Requested row is outside the image: ' + y);
        }
        var width = this.getWidth();
        if (row === null || row === undefined || row.length < width) {
            row = new Uint8ClampedArray(width);
        }
        var offset = (y + this.top) * this.dataWidth + this.left;
        System_1.default.arraycopy(this.luminances, offset, row, 0, width);
        return row;
    };
    /*@Override*/
    RGBLuminanceSource.prototype.getMatrix = function () {
        var width = this.getWidth();
        var height = this.getHeight();
        // If the caller asks for the entire underlying image, save the copy and give them the
        // original data. The docs specifically warn that result.length must be ignored.
        if (width === this.dataWidth && height === this.dataHeight) {
            return this.luminances;
        }
        var area = width * height;
        var matrix = new Uint8ClampedArray(area);
        var inputOffset = this.top * this.dataWidth + this.left;
        // If the width matches the full width of the underlying data, perform a single copy.
        if (width === this.dataWidth) {
            System_1.default.arraycopy(this.luminances, inputOffset, matrix, 0, area);
            return matrix;
        }
        // Otherwise copy one cropped row at a time.
        for (var y = 0; y < height; y++) {
            var outputOffset = y * width;
            System_1.default.arraycopy(this.luminances, inputOffset, matrix, outputOffset, width);
            inputOffset += this.dataWidth;
        }
        return matrix;
    };
    /*@Override*/
    RGBLuminanceSource.prototype.isCropSupported = function () {
        return true;
    };
    /*@Override*/
    RGBLuminanceSource.prototype.crop = function (left /*int*/, top /*int*/, width /*int*/, height /*int*/) {
        return new RGBLuminanceSource(this.luminances, width, height, this.dataWidth, this.dataHeight, this.left + left, this.top + top);
    };
    RGBLuminanceSource.prototype.invert = function () {
        return new InvertedLuminanceSource_1.default(this);
    };
    return RGBLuminanceSource;
}(LuminanceSource_1.default));
exports.default = RGBLuminanceSource;
//# sourceMappingURL=RGBLuminanceSource.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/ReaderException.js":
/*!******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/ReaderException.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var ReaderException = /** @class */ (function (_super) {
    __extends(ReaderException, _super);
    function ReaderException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReaderException;
}(Exception_1.default));
exports.default = ReaderException;
//# sourceMappingURL=ReaderException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/ReedSolomonException.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/ReedSolomonException.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var ReedSolomonException = /** @class */ (function (_super) {
    __extends(ReedSolomonException, _super);
    function ReedSolomonException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReedSolomonException;
}(Exception_1.default));
exports.default = ReedSolomonException;
//# sourceMappingURL=ReedSolomonException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/Result.js":
/*!*********************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/Result.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing {*/
/*import java.util.EnumMap;*/
/*import java.util.Map;*/
var ResultPoint_1 = __webpack_require__(/*! ./ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var System_1 = __webpack_require__(/*! ./util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
/**
 * <p>Encapsulates the result of decoding a barcode within an image.</p>
 *
 * @author Sean Owen
 */
var Result = /** @class */ (function () {
    // public constructor(private text: string,
    //               Uint8Array rawBytes,
    //               ResultPoconst resultPoints: Int32Array,
    //               BarcodeFormat format) {
    //   this(text, rawBytes, resultPoints, format, System.currentTimeMillis())
    // }
    // public constructor(text: string,
    //               Uint8Array rawBytes,
    //               ResultPoconst resultPoints: Int32Array,
    //               BarcodeFormat format,
    //               long timestamp) {
    //   this(text, rawBytes, rawBytes == null ? 0 : 8 * rawBytes.length,
    //        resultPoints, format, timestamp)
    // }
    function Result(text, rawBytes, numBits /*int*/, resultPoints, format, timestamp /*long*/) {
        this.text = text;
        this.rawBytes = rawBytes;
        this.numBits = numBits;
        this.resultPoints = resultPoints;
        this.format = format;
        this.timestamp = timestamp;
        this.text = text;
        this.rawBytes = rawBytes;
        if (undefined === numBits || null === numBits) {
            this.numBits = (rawBytes === null || rawBytes === undefined) ? 0 : 8 * rawBytes.length;
        }
        else {
            this.numBits = numBits;
        }
        this.resultPoints = resultPoints;
        this.format = format;
        this.resultMetadata = null;
        if (undefined === timestamp || null === timestamp) {
            this.timestamp = System_1.default.currentTimeMillis();
        }
        else {
            this.timestamp = timestamp;
        }
    }
    /**
     * @return raw text encoded by the barcode
     */
    Result.prototype.getText = function () {
        return this.text;
    };
    /**
     * @return raw bytes encoded by the barcode, if applicable, otherwise {@code null}
     */
    Result.prototype.getRawBytes = function () {
        return this.rawBytes;
    };
    /**
     * @return how many bits of {@link #getRawBytes()} are valid; typically 8 times its length
     * @since 3.3.0
     */
    Result.prototype.getNumBits = function () {
        return this.numBits;
    };
    /**
     * @return points related to the barcode in the image. These are typically points
     *         identifying finder patterns or the corners of the barcode. The exact meaning is
     *         specific to the type of barcode that was decoded.
     */
    Result.prototype.getResultPoints = function () {
        return this.resultPoints;
    };
    /**
     * @return {@link BarcodeFormat} representing the format of the barcode that was decoded
     */
    Result.prototype.getBarcodeFormat = function () {
        return this.format;
    };
    /**
     * @return {@link Map} mapping {@link ResultMetadataType} keys to values. May be
     *   {@code null}. This contains optional metadata about what was detected about the barcode,
     *   like orientation.
     */
    Result.prototype.getResultMetadata = function () {
        return this.resultMetadata;
    };
    Result.prototype.putMetadata = function (type, value) {
        if (this.resultMetadata === null) {
            this.resultMetadata = new Map();
        }
        this.resultMetadata.set(type, value);
    };
    Result.prototype.putAllMetadata = function (metadata) {
        if (metadata !== null) {
            if (this.resultMetadata === null) {
                this.resultMetadata = metadata;
            }
            else {
                this.resultMetadata = new Map(metadata);
            }
        }
    };
    Result.prototype.addResultPoints = function (newPoints) {
        var oldPoints = this.resultPoints;
        if (oldPoints === null) {
            this.resultPoints = newPoints;
        }
        else if (newPoints !== null && newPoints.length > 0) {
            var allPoints = new ResultPoint_1.default[oldPoints.length + newPoints.length];
            System_1.default.arraycopy(oldPoints, 0, allPoints, 0, oldPoints.length);
            System_1.default.arraycopy(newPoints, 0, allPoints, oldPoints.length, newPoints.length);
            this.resultPoints = allPoints;
        }
    };
    Result.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    /*@Override*/
    Result.prototype.toString = function () {
        return this.text;
    };
    return Result;
}());
exports.default = Result;
//# sourceMappingURL=Result.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/ResultMetadataType.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/ResultMetadataType.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing {*/
/**
 * Represents some type of metadata about the result of the decoding that the decoder
 * wishes to communicate back to the caller.
 *
 * @author Sean Owen
 */
var ResultMetadataType;
(function (ResultMetadataType) {
    /**
     * Unspecified, application-specific metadata. Maps to an unspecified {@link Object}.
     */
    ResultMetadataType[ResultMetadataType["OTHER"] = 0] = "OTHER";
    /**
     * Denotes the likely approximate orientation of the barcode in the image. This value
     * is given as degrees rotated clockwise from the normal, upright orientation.
     * For example a 1D barcode which was found by reading top-to-bottom would be
     * said to have orientation "90". This key maps to an {@link Integer} whose
     * value is in the range [0,360).
     */
    ResultMetadataType[ResultMetadataType["ORIENTATION"] = 1] = "ORIENTATION";
    /**
     * <p>2D barcode formats typically encode text, but allow for a sort of 'byte mode'
     * which is sometimes used to encode binary data. While {@link Result} makes available
     * the complete raw bytes in the barcode for these formats, it does not offer the bytes
     * from the byte segments alone.</p>
     *
     * <p>This maps to a {@link java.util.List} of byte arrays corresponding to the
     * raw bytes in the byte segments in the barcode, in order.</p>
     */
    ResultMetadataType[ResultMetadataType["BYTE_SEGMENTS"] = 2] = "BYTE_SEGMENTS";
    /**
     * Error correction level used, if applicable. The value type depends on the
     * format, but is typically a String.
     */
    ResultMetadataType[ResultMetadataType["ERROR_CORRECTION_LEVEL"] = 3] = "ERROR_CORRECTION_LEVEL";
    /**
     * For some periodicals, indicates the issue number as an {@link Integer}.
     */
    ResultMetadataType[ResultMetadataType["ISSUE_NUMBER"] = 4] = "ISSUE_NUMBER";
    /**
     * For some products, indicates the suggested retail price in the barcode as a
     * formatted {@link String}.
     */
    ResultMetadataType[ResultMetadataType["SUGGESTED_PRICE"] = 5] = "SUGGESTED_PRICE";
    /**
     * For some products, the possible country of manufacture as a {@link String} denoting the
     * ISO country code. Some map to multiple possible countries, like "US/CA".
     */
    ResultMetadataType[ResultMetadataType["POSSIBLE_COUNTRY"] = 6] = "POSSIBLE_COUNTRY";
    /**
     * For some products, the extension text
     */
    ResultMetadataType[ResultMetadataType["UPC_EAN_EXTENSION"] = 7] = "UPC_EAN_EXTENSION";
    /**
     * PDF417-specific metadata
     */
    ResultMetadataType[ResultMetadataType["PDF417_EXTRA_METADATA"] = 8] = "PDF417_EXTRA_METADATA";
    /**
     * If the code format supports structured append and the current scanned code is part of one then the
     * sequence number is given with it.
     */
    ResultMetadataType[ResultMetadataType["STRUCTURED_APPEND_SEQUENCE"] = 9] = "STRUCTURED_APPEND_SEQUENCE";
    /**
     * If the code format supports structured append and the current scanned code is part of one then the
     * parity is given with it.
     */
    ResultMetadataType[ResultMetadataType["STRUCTURED_APPEND_PARITY"] = 10] = "STRUCTURED_APPEND_PARITY";
})(ResultMetadataType || (ResultMetadataType = {}));
exports.default = ResultMetadataType;
//# sourceMappingURL=ResultMetadataType.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/ResultPoint.js":
/*!**************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/ResultPoint.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing {*/
var MathUtils_1 = __webpack_require__(/*! ./common/detector/MathUtils */ "./node_modules/@zxing/library/esm5/core/common/detector/MathUtils.js");
var Float_1 = __webpack_require__(/*! ./util/Float */ "./node_modules/@zxing/library/esm5/core/util/Float.js");
/**
 * <p>Encapsulates a point of interest in an image containing a barcode. Typically, this
 * would be the location of a finder pattern or the corner of the barcode, for example.</p>
 *
 * @author Sean Owen
 */
var ResultPoint = /** @class */ (function () {
    function ResultPoint(x /*float*/, y /*float*/) {
        this.x = x;
        this.y = y;
    }
    ResultPoint.prototype.getX = function () {
        return this.x;
    };
    ResultPoint.prototype.getY = function () {
        return this.y;
    };
    /*@Override*/
    ResultPoint.prototype.equals = function (other) {
        if (other instanceof ResultPoint) {
            var otherPoint = other;
            return this.x === otherPoint.x && this.y === otherPoint.y;
        }
        return false;
    };
    /*@Override*/
    ResultPoint.prototype.hashCode = function () {
        return 31 * Float_1.default.floatToIntBits(this.x) + Float_1.default.floatToIntBits(this.y);
    };
    /*@Override*/
    ResultPoint.prototype.toString = function () {
        return '(' + this.x + ',' + this.y + ')';
    };
    /**
     * Orders an array of three ResultPoints in an order [A,B,C] such that AB is less than AC
     * and BC is less than AC, and the angle between BC and BA is less than 180 degrees.
     *
     * @param patterns array of three {@code ResultPoint} to order
     */
    ResultPoint.orderBestPatterns = function (patterns) {
        // Find distances between pattern centers
        var zeroOneDistance = this.distance(patterns[0], patterns[1]);
        var oneTwoDistance = this.distance(patterns[1], patterns[2]);
        var zeroTwoDistance = this.distance(patterns[0], patterns[2]);
        var pointA;
        var pointB;
        var pointC;
        // Assume one closest to other two is B; A and C will just be guesses at first
        if (oneTwoDistance >= zeroOneDistance && oneTwoDistance >= zeroTwoDistance) {
            pointB = patterns[0];
            pointA = patterns[1];
            pointC = patterns[2];
        }
        else if (zeroTwoDistance >= oneTwoDistance && zeroTwoDistance >= zeroOneDistance) {
            pointB = patterns[1];
            pointA = patterns[0];
            pointC = patterns[2];
        }
        else {
            pointB = patterns[2];
            pointA = patterns[0];
            pointC = patterns[1];
        }
        // Use cross product to figure out whether A and C are correct or flipped.
        // This asks whether BC x BA has a positive z component, which is the arrangement
        // we want for A, B, C. If it's negative, then we've got it flipped around and
        // should swap A and C.
        if (this.crossProductZ(pointA, pointB, pointC) < 0.0) {
            var temp = pointA;
            pointA = pointC;
            pointC = temp;
        }
        patterns[0] = pointA;
        patterns[1] = pointB;
        patterns[2] = pointC;
    };
    /**
     * @param pattern1 first pattern
     * @param pattern2 second pattern
     * @return distance between two points
     */
    ResultPoint.distance = function (pattern1, pattern2) {
        return MathUtils_1.default.distance(pattern1.x, pattern1.y, pattern2.x, pattern2.y);
    };
    /**
     * Returns the z component of the cross product between vectors BC and BA.
     */
    ResultPoint.crossProductZ = function (pointA, pointB, pointC) {
        var bX = pointB.x;
        var bY = pointB.y;
        return ((pointC.x - bX) * (pointA.y - bY)) - ((pointC.y - bY) * (pointA.x - bX));
    };
    return ResultPoint;
}());
exports.default = ResultPoint;
//# sourceMappingURL=ResultPoint.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/UnsupportedOperationException.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/UnsupportedOperationException.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var UnsupportedOperationException = /** @class */ (function (_super) {
    __extends(UnsupportedOperationException, _super);
    function UnsupportedOperationException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnsupportedOperationException;
}(Exception_1.default));
exports.default = UnsupportedOperationException;
//# sourceMappingURL=UnsupportedOperationException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/WriterException.js":
/*!******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/WriterException.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __webpack_require__(/*! ./Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
/**
 * Custom Error class of type Exception.
 */
var WriterException = /** @class */ (function (_super) {
    __extends(WriterException, _super);
    function WriterException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WriterException;
}(Exception_1.default));
exports.default = WriterException;
//# sourceMappingURL=WriterException.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/BitArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/BitArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common {*/
/*import java.util.Arrays;*/
var System_1 = __webpack_require__(/*! ../util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var Integer_1 = __webpack_require__(/*! ../util/Integer */ "./node_modules/@zxing/library/esm5/core/util/Integer.js");
var Arrays_1 = __webpack_require__(/*! ../util/Arrays */ "./node_modules/@zxing/library/esm5/core/util/Arrays.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * <p>A simple, fast array of bits, represented compactly by an array of ints internally.</p>
 *
 * @author Sean Owen
 */
var BitArray /*implements Cloneable*/ = /** @class */ (function () {
    // public constructor() {
    //   this.size = 0
    //   this.bits = new Int32Array(1)
    // }
    // public constructor(size?: number /*int*/) {
    //   if (undefined === size) {
    //     this.size = 0
    //   } else {
    //     this.size = size
    //   }
    //   this.bits = this.makeArray(size)
    // }
    // For testing only
    function BitArray(size /*int*/, bits) {
        if (undefined === size) {
            this.size = 0;
            this.bits = new Int32Array(1);
        }
        else {
            this.size = size;
            if (undefined === bits || null === bits) {
                this.bits = BitArray.makeArray(size);
            }
            else {
                this.bits = bits;
            }
        }
    }
    BitArray.prototype.getSize = function () {
        return this.size;
    };
    BitArray.prototype.getSizeInBytes = function () {
        return Math.floor((this.size + 7) / 8);
    };
    BitArray.prototype.ensureCapacity = function (size /*int*/) {
        if (size > this.bits.length * 32) {
            var newBits = BitArray.makeArray(size);
            System_1.default.arraycopy(this.bits, 0, newBits, 0, this.bits.length);
            this.bits = newBits;
        }
    };
    /**
     * @param i bit to get
     * @return true iff bit i is set
     */
    BitArray.prototype.get = function (i /*int*/) {
        return (this.bits[Math.floor(i / 32)] & (1 << (i & 0x1F))) !== 0;
    };
    /**
     * Sets bit i.
     *
     * @param i bit to set
     */
    BitArray.prototype.set = function (i /*int*/) {
        this.bits[Math.floor(i / 32)] |= 1 << (i & 0x1F);
    };
    /**
     * Flips bit i.
     *
     * @param i bit to set
     */
    BitArray.prototype.flip = function (i /*int*/) {
        this.bits[Math.floor(i / 32)] ^= 1 << (i & 0x1F);
    };
    /**
     * @param from first bit to check
     * @return index of first bit that is set, starting from the given index, or size if none are set
     *  at or beyond this given index
     * @see #getNextUnset(int)
     */
    BitArray.prototype.getNextSet = function (from /*int*/) {
        var size = this.size;
        if (from >= size) {
            return size;
        }
        var bits = this.bits;
        var bitsOffset = Math.floor(from / 32);
        var currentBits = bits[bitsOffset];
        // mask off lesser bits first
        currentBits &= ~((1 << (from & 0x1F)) - 1);
        var length = bits.length;
        while (currentBits === 0) {
            if (++bitsOffset === length) {
                return size;
            }
            currentBits = bits[bitsOffset];
        }
        var result = (bitsOffset * 32) + Integer_1.default.numberOfTrailingZeros(currentBits);
        return result > size ? size : result;
    };
    /**
     * @param from index to start looking for unset bit
     * @return index of next unset bit, or {@code size} if none are unset until the end
     * @see #getNextSet(int)
     */
    BitArray.prototype.getNextUnset = function (from /*int*/) {
        var size = this.size;
        if (from >= size) {
            return size;
        }
        var bits = this.bits;
        var bitsOffset = Math.floor(from / 32);
        var currentBits = ~bits[bitsOffset];
        // mask off lesser bits first
        currentBits &= ~((1 << (from & 0x1F)) - 1);
        var length = bits.length;
        while (currentBits === 0) {
            if (++bitsOffset === length) {
                return size;
            }
            currentBits = ~bits[bitsOffset];
        }
        var result = (bitsOffset * 32) + Integer_1.default.numberOfTrailingZeros(currentBits);
        return result > size ? size : result;
    };
    /**
     * Sets a block of 32 bits, starting at bit i.
     *
     * @param i first bit to set
     * @param newBits the new value of the next 32 bits. Note again that the least-significant bit
     * corresponds to bit i, the next-least-significant to i+1, and so on.
     */
    BitArray.prototype.setBulk = function (i /*int*/, newBits /*int*/) {
        this.bits[Math.floor(i / 32)] = newBits;
    };
    /**
     * Sets a range of bits.
     *
     * @param start start of range, inclusive.
     * @param end end of range, exclusive
     */
    BitArray.prototype.setRange = function (start /*int*/, end /*int*/) {
        if (end < start || start < 0 || end > this.size) {
            throw new IllegalArgumentException_1.default();
        }
        if (end === start) {
            return;
        }
        end--; // will be easier to treat this as the last actually set bit -- inclusive
        var firstInt = Math.floor(start / 32);
        var lastInt = Math.floor(end / 32);
        var bits = this.bits;
        for (var i = firstInt; i <= lastInt; i++) {
            var firstBit = i > firstInt ? 0 : start & 0x1F;
            var lastBit = i < lastInt ? 31 : end & 0x1F;
            // Ones from firstBit to lastBit, inclusive
            var mask = (2 << lastBit) - (1 << firstBit);
            bits[i] |= mask;
        }
    };
    /**
     * Clears all bits (sets to false).
     */
    BitArray.prototype.clear = function () {
        var max = this.bits.length;
        var bits = this.bits;
        for (var i = 0; i < max; i++) {
            bits[i] = 0;
        }
    };
    /**
     * Efficient method to check if a range of bits is set, or not set.
     *
     * @param start start of range, inclusive.
     * @param end end of range, exclusive
     * @param value if true, checks that bits in range are set, otherwise checks that they are not set
     * @return true iff all bits are set or not set in range, according to value argument
     * @throws IllegalArgumentException if end is less than start or the range is not contained in the array
     */
    BitArray.prototype.isRange = function (start /*int*/, end /*int*/, value) {
        if (end < start || start < 0 || end > this.size) {
            throw new IllegalArgumentException_1.default();
        }
        if (end === start) {
            return true; // empty range matches
        }
        end--; // will be easier to treat this as the last actually set bit -- inclusive
        var firstInt = Math.floor(start / 32);
        var lastInt = Math.floor(end / 32);
        var bits = this.bits;
        for (var i = firstInt; i <= lastInt; i++) {
            var firstBit = i > firstInt ? 0 : start & 0x1F;
            var lastBit = i < lastInt ? 31 : end & 0x1F;
            // Ones from firstBit to lastBit, inclusive
            var mask = (2 << lastBit) - (1 << firstBit) & 0xFFFFFFFF;
            // TYPESCRIPTPORT: & 0xFFFFFFFF added to discard anything after 32 bits, as ES has 53 bits
            // Return false if we're looking for 1s and the masked bits[i] isn't all 1s (is: that,
            // equals the mask, or we're looking for 0s and the masked portion is not all 0s
            if ((bits[i] & mask) !== (value ? mask : 0)) {
                return false;
            }
        }
        return true;
    };
    BitArray.prototype.appendBit = function (bit) {
        this.ensureCapacity(this.size + 1);
        if (bit) {
            this.bits[Math.floor(this.size / 32)] |= 1 << (this.size & 0x1F);
        }
        this.size++;
    };
    /**
     * Appends the least-significant bits, from value, in order from most-significant to
     * least-significant. For example, appending 6 bits from 0x000001E will append the bits
     * 0, 1, 1, 1, 1, 0 in that order.
     *
     * @param value {@code int} containing bits to append
     * @param numBits bits from value to append
     */
    BitArray.prototype.appendBits = function (value /*int*/, numBits /*int*/) {
        if (numBits < 0 || numBits > 32) {
            throw new IllegalArgumentException_1.default('Num bits must be between 0 and 32');
        }
        this.ensureCapacity(this.size + numBits);
        var appendBit = this.appendBit;
        for (var numBitsLeft = numBits; numBitsLeft > 0; numBitsLeft--) {
            this.appendBit(((value >> (numBitsLeft - 1)) & 0x01) === 1);
        }
    };
    BitArray.prototype.appendBitArray = function (other) {
        var otherSize = other.size;
        this.ensureCapacity(this.size + otherSize);
        var appendBit = this.appendBit;
        for (var i = 0; i < otherSize; i++) {
            this.appendBit(other.get(i));
        }
    };
    BitArray.prototype.xor = function (other) {
        if (this.size !== other.size) {
            throw new IllegalArgumentException_1.default('Sizes don\'t match');
        }
        var bits = this.bits;
        for (var i = 0, length_1 = bits.length; i < length_1; i++) {
            // The last int could be incomplete (i.e. not have 32 bits in
            // it) but there is no problem since 0 XOR 0 == 0.
            bits[i] ^= other.bits[i];
        }
    };
    /**
     *
     * @param bitOffset first bit to start writing
     * @param array array to write into. Bytes are written most-significant byte first. This is the opposite
     *  of the internal representation, which is exposed by {@link #getBitArray()}
     * @param offset position in array to start writing
     * @param numBytes how many bytes to write
     */
    BitArray.prototype.toBytes = function (bitOffset /*int*/, array, offset /*int*/, numBytes /*int*/) {
        for (var i = 0; i < numBytes; i++) {
            var theByte = 0;
            for (var j = 0; j < 8; j++) {
                if (this.get(bitOffset)) {
                    theByte |= 1 << (7 - j);
                }
                bitOffset++;
            }
            array[offset + i] = /*(byte)*/ theByte;
        }
    };
    /**
     * @return underlying array of ints. The first element holds the first 32 bits, and the least
     *         significant bit is bit 0.
     */
    BitArray.prototype.getBitArray = function () {
        return this.bits;
    };
    /**
     * Reverses all bits in the array.
     */
    BitArray.prototype.reverse = function () {
        var newBits = new Int32Array(this.bits.length);
        // reverse all int's first
        var len = Math.floor((this.size - 1) / 32);
        var oldBitsLen = len + 1;
        var bits = this.bits;
        for (var i = 0; i < oldBitsLen; i++) {
            var x = bits[i];
            x = ((x >> 1) & 0x55555555) | ((x & 0x55555555) << 1);
            x = ((x >> 2) & 0x33333333) | ((x & 0x33333333) << 2);
            x = ((x >> 4) & 0x0f0f0f0f) | ((x & 0x0f0f0f0f) << 4);
            x = ((x >> 8) & 0x00ff00ff) | ((x & 0x00ff00ff) << 8);
            x = ((x >> 16) & 0x0000ffff) | ((x & 0x0000ffff) << 16);
            newBits[len - i] = /*(int)*/ x;
        }
        // now correct the int's if the bit size isn't a multiple of 32
        if (this.size !== oldBitsLen * 32) {
            var leftOffset = oldBitsLen * 32 - this.size;
            var currentInt = newBits[0] >>> leftOffset;
            for (var i = 1; i < oldBitsLen; i++) {
                var nextInt = newBits[i];
                currentInt |= nextInt << (32 - leftOffset);
                newBits[i - 1] = currentInt;
                currentInt = nextInt >>> leftOffset;
            }
            newBits[oldBitsLen - 1] = currentInt;
        }
        this.bits = newBits;
    };
    BitArray.makeArray = function (size /*int*/) {
        return new Int32Array(Math.floor((size + 31) / 32));
    };
    /*@Override*/
    BitArray.prototype.equals = function (o) {
        if (!(o instanceof BitArray)) {
            return false;
        }
        var other = o;
        return this.size === other.size && Arrays_1.default.equals(this.bits, other.bits);
    };
    /*@Override*/
    BitArray.prototype.hashCode = function () {
        return 31 * this.size + Arrays_1.default.hashCode(this.bits);
    };
    /*@Override*/
    BitArray.prototype.toString = function () {
        var result = '';
        for (var i = 0, size = this.size; i < size; i++) {
            if ((i & 0x07) === 0) {
                result += ' ';
            }
            result += this.get(i) ? 'X' : '.';
        }
        return result;
    };
    /*@Override*/
    BitArray.prototype.clone = function () {
        return new BitArray(this.size, this.bits.slice());
    };
    return BitArray;
}());
exports.default = BitArray;
//# sourceMappingURL=BitArray.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/BitMatrix.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common {*/
/*import java.util.Arrays;*/
var BitArray_1 = __webpack_require__(/*! ./BitArray */ "./node_modules/@zxing/library/esm5/core/common/BitArray.js");
var System_1 = __webpack_require__(/*! ../util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var Arrays_1 = __webpack_require__(/*! ../util/Arrays */ "./node_modules/@zxing/library/esm5/core/util/Arrays.js");
var StringBuilder_1 = __webpack_require__(/*! ../util/StringBuilder */ "./node_modules/@zxing/library/esm5/core/util/StringBuilder.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * <p>Represents a 2D matrix of bits. In function arguments below, and throughout the common
 * module, x is the column position, and y is the row position. The ordering is always x, y.
 * The origin is at the top-left.</p>
 *
 * <p>Internally the bits are represented in a 1-D array of 32-bit ints. However, each row begins
 * with a new int. This is done intentionally so that we can copy out a row into a BitArray very
 * efficiently.</p>
 *
 * <p>The ordering of bits is row-major. Within each int, the least significant bits are used first,
 * meaning they represent lower x values. This is compatible with BitArray's implementation.</p>
 *
 * @author Sean Owen
 * @author dswitkin@google.com (Daniel Switkin)
 */
var BitMatrix /*implements Cloneable*/ = /** @class */ (function () {
    /**
     * Creates an empty square {@link BitMatrix}.
     *
     * @param dimension height and width
     */
    // public constructor(dimension: number /*int*/) {
    //   this(dimension, dimension)
    // }
    /**
     * Creates an empty {@link BitMatrix}.
     *
     * @param width bit matrix width
     * @param height bit matrix height
     */
    // public constructor(width: number /*int*/, height: number /*int*/) {
    //   if (width < 1 || height < 1) {
    //     throw new IllegalArgumentException("Both dimensions must be greater than 0")
    //   }
    //   this.width = width
    //   this.height = height
    //   this.rowSize = (width + 31) / 32
    //   bits = new int[rowSize * height];
    // }
    function BitMatrix(width /*int*/, height /*int*/, rowSize /*int*/, bits) {
        this.width = width;
        this.height = height;
        this.rowSize = rowSize;
        this.bits = bits;
        if (undefined === height || null === height) {
            height = width;
        }
        this.height = height;
        if (width < 1 || height < 1) {
            throw new IllegalArgumentException_1.default('Both dimensions must be greater than 0');
        }
        if (undefined === rowSize || null === rowSize) {
            rowSize = Math.floor((width + 31) / 32);
        }
        this.rowSize = rowSize;
        if (undefined === bits || null === bits) {
            this.bits = new Int32Array(this.rowSize * this.height);
        }
    }
    /**
     * Interprets a 2D array of booleans as a {@link BitMatrix}, where "true" means an "on" bit.
     *
     * @param image bits of the image, as a row-major 2D array. Elements are arrays representing rows
     * @return {@link BitMatrix} representation of image
     */
    BitMatrix.parseFromBooleanArray = function (image) {
        var height = image.length;
        var width = image[0].length;
        var bits = new BitMatrix(width, height);
        for (var i = 0; i < height; i++) {
            var imageI = image[i];
            for (var j = 0; j < width; j++) {
                if (imageI[j]) {
                    bits.set(j, i);
                }
            }
        }
        return bits;
    };
    BitMatrix.parseFromString = function (stringRepresentation, setString, unsetString) {
        if (stringRepresentation === null) {
            throw new IllegalArgumentException_1.default('stringRepresentation cannot be null');
        }
        var bits = new Array(stringRepresentation.length);
        var bitsPos = 0;
        var rowStartPos = 0;
        var rowLength = -1;
        var nRows = 0;
        var pos = 0;
        while (pos < stringRepresentation.length) {
            if (stringRepresentation.charAt(pos) === '\n' ||
                stringRepresentation.charAt(pos) === '\r') {
                if (bitsPos > rowStartPos) {
                    if (rowLength === -1) {
                        rowLength = bitsPos - rowStartPos;
                    }
                    else if (bitsPos - rowStartPos !== rowLength) {
                        throw new IllegalArgumentException_1.default('row lengths do not match');
                    }
                    rowStartPos = bitsPos;
                    nRows++;
                }
                pos++;
            }
            else if (stringRepresentation.substring(pos, pos + setString.length) === setString) {
                pos += setString.length;
                bits[bitsPos] = true;
                bitsPos++;
            }
            else if (stringRepresentation.substring(pos, pos + unsetString.length) === unsetString) {
                pos += unsetString.length;
                bits[bitsPos] = false;
                bitsPos++;
            }
            else {
                throw new IllegalArgumentException_1.default('illegal character encountered: ' + stringRepresentation.substring(pos));
            }
        }
        // no EOL at end?
        if (bitsPos > rowStartPos) {
            if (rowLength === -1) {
                rowLength = bitsPos - rowStartPos;
            }
            else if (bitsPos - rowStartPos !== rowLength) {
                throw new IllegalArgumentException_1.default('row lengths do not match');
            }
            nRows++;
        }
        var matrix = new BitMatrix(rowLength, nRows);
        for (var i = 0; i < bitsPos; i++) {
            if (bits[i]) {
                matrix.set(Math.floor(i % rowLength), Math.floor(i / rowLength));
            }
        }
        return matrix;
    };
    /**
     * <p>Gets the requested bit, where true means black.</p>
     *
     * @param x The horizontal component (i.e. which column)
     * @param y The vertical component (i.e. which row)
     * @return value of given bit in matrix
     */
    BitMatrix.prototype.get = function (x /*int*/, y /*int*/) {
        var offset = y * this.rowSize + Math.floor(x / 32);
        return ((this.bits[offset] >>> (x & 0x1f)) & 1) !== 0;
    };
    /**
     * <p>Sets the given bit to true.</p>
     *
     * @param x The horizontal component (i.e. which column)
     * @param y The vertical component (i.e. which row)
     */
    BitMatrix.prototype.set = function (x /*int*/, y /*int*/) {
        var offset = y * this.rowSize + Math.floor(x / 32);
        this.bits[offset] |= (1 << (x & 0x1f)) & 0xFFFFFFFF;
    };
    BitMatrix.prototype.unset = function (x /*int*/, y /*int*/) {
        var offset = y * this.rowSize + Math.floor(x / 32);
        this.bits[offset] &= ~((1 << (x & 0x1f)) & 0xFFFFFFFF);
    };
    /**
     * <p>Flips the given bit.</p>
     *
     * @param x The horizontal component (i.e. which column)
     * @param y The vertical component (i.e. which row)
     */
    BitMatrix.prototype.flip = function (x /*int*/, y /*int*/) {
        var offset = y * this.rowSize + Math.floor(x / 32);
        this.bits[offset] ^= ((1 << (x & 0x1f)) & 0xFFFFFFFF);
    };
    /**
     * Exclusive-or (XOR): Flip the bit in this {@code BitMatrix} if the corresponding
     * mask bit is set.
     *
     * @param mask XOR mask
     */
    BitMatrix.prototype.xor = function (mask) {
        if (this.width !== mask.getWidth() || this.height !== mask.getHeight()
            || this.rowSize !== mask.getRowSize()) {
            throw new IllegalArgumentException_1.default('input matrix dimensions do not match');
        }
        var rowArray = new BitArray_1.default(Math.floor(this.width / 32) + 1);
        var rowSize = this.rowSize;
        var bits = this.bits;
        for (var y = 0, height = this.height; y < height; y++) {
            var offset = y * rowSize;
            var row = mask.getRow(y, rowArray).getBitArray();
            for (var x = 0; x < rowSize; x++) {
                bits[offset + x] ^= row[x];
            }
        }
    };
    /**
     * Clears all bits (sets to false).
     */
    BitMatrix.prototype.clear = function () {
        var bits = this.bits;
        var max = bits.length;
        for (var i = 0; i < max; i++) {
            bits[i] = 0;
        }
    };
    /**
     * <p>Sets a square region of the bit matrix to true.</p>
     *
     * @param left The horizontal position to begin at (inclusive)
     * @param top The vertical position to begin at (inclusive)
     * @param width The width of the region
     * @param height The height of the region
     */
    BitMatrix.prototype.setRegion = function (left /*int*/, top /*int*/, width /*int*/, height /*int*/) {
        if (top < 0 || left < 0) {
            throw new IllegalArgumentException_1.default('Left and top must be nonnegative');
        }
        if (height < 1 || width < 1) {
            throw new IllegalArgumentException_1.default('Height and width must be at least 1');
        }
        var right = left + width;
        var bottom = top + height;
        if (bottom > this.height || right > this.width) {
            throw new IllegalArgumentException_1.default('The region must fit inside the matrix');
        }
        var rowSize = this.rowSize;
        var bits = this.bits;
        for (var y = top; y < bottom; y++) {
            var offset = y * rowSize;
            for (var x = left; x < right; x++) {
                bits[offset + Math.floor(x / 32)] |= ((1 << (x & 0x1f)) & 0xFFFFFFFF);
            }
        }
    };
    /**
     * A fast method to retrieve one row of data from the matrix as a BitArray.
     *
     * @param y The row to retrieve
     * @param row An optional caller-allocated BitArray, will be allocated if null or too small
     * @return The resulting BitArray - this reference should always be used even when passing
     *         your own row
     */
    BitMatrix.prototype.getRow = function (y /*int*/, row) {
        if (row === null || row === undefined || row.getSize() < this.width) {
            row = new BitArray_1.default(this.width);
        }
        else {
            row.clear();
        }
        var rowSize = this.rowSize;
        var bits = this.bits;
        var offset = y * rowSize;
        for (var x = 0; x < rowSize; x++) {
            row.setBulk(x * 32, bits[offset + x]);
        }
        return row;
    };
    /**
     * @param y row to set
     * @param row {@link BitArray} to copy from
     */
    BitMatrix.prototype.setRow = function (y /*int*/, row) {
        System_1.default.arraycopy(row.getBitArray(), 0, this.bits, y * this.rowSize, this.rowSize);
    };
    /**
     * Modifies this {@code BitMatrix} to represent the same but rotated 180 degrees
     */
    BitMatrix.prototype.rotate180 = function () {
        var width = this.getWidth();
        var height = this.getHeight();
        var topRow = new BitArray_1.default(width);
        var bottomRow = new BitArray_1.default(width);
        for (var i = 0, length_1 = Math.floor((height + 1) / 2); i < length_1; i++) {
            topRow = this.getRow(i, topRow);
            bottomRow = this.getRow(height - 1 - i, bottomRow);
            topRow.reverse();
            bottomRow.reverse();
            this.setRow(i, bottomRow);
            this.setRow(height - 1 - i, topRow);
        }
    };
    /**
     * This is useful in detecting the enclosing rectangle of a 'pure' barcode.
     *
     * @return {@code left,top,width,height} enclosing rectangle of all 1 bits, or null if it is all white
     */
    BitMatrix.prototype.getEnclosingRectangle = function () {
        var width = this.width;
        var height = this.height;
        var rowSize = this.rowSize;
        var bits = this.bits;
        var left = width;
        var top = height;
        var right = -1;
        var bottom = -1;
        for (var y = 0; y < height; y++) {
            for (var x32 = 0; x32 < rowSize; x32++) {
                var theBits = bits[y * rowSize + x32];
                if (theBits !== 0) {
                    if (y < top) {
                        top = y;
                    }
                    if (y > bottom) {
                        bottom = y;
                    }
                    if (x32 * 32 < left) {
                        var bit = 0;
                        while (((theBits << (31 - bit)) & 0xFFFFFFFF) === 0) {
                            bit++;
                        }
                        if ((x32 * 32 + bit) < left) {
                            left = x32 * 32 + bit;
                        }
                    }
                    if (x32 * 32 + 31 > right) {
                        var bit = 31;
                        while ((theBits >>> bit) === 0) {
                            bit--;
                        }
                        if ((x32 * 32 + bit) > right) {
                            right = x32 * 32 + bit;
                        }
                    }
                }
            }
        }
        if (right < left || bottom < top) {
            return null;
        }
        return Int32Array.from([left, top, right - left + 1, bottom - top + 1]);
    };
    /**
     * This is useful in detecting a corner of a 'pure' barcode.
     *
     * @return {@code x,y} coordinate of top-left-most 1 bit, or null if it is all white
     */
    BitMatrix.prototype.getTopLeftOnBit = function () {
        var rowSize = this.rowSize;
        var bits = this.bits;
        var bitsOffset = 0;
        while (bitsOffset < bits.length && bits[bitsOffset] === 0) {
            bitsOffset++;
        }
        if (bitsOffset === bits.length) {
            return null;
        }
        var y = bitsOffset / rowSize;
        var x = (bitsOffset % rowSize) * 32;
        var theBits = bits[bitsOffset];
        var bit = 0;
        while (((theBits << (31 - bit)) & 0xFFFFFFFF) === 0) {
            bit++;
        }
        x += bit;
        return Int32Array.from([x, y]);
    };
    BitMatrix.prototype.getBottomRightOnBit = function () {
        var rowSize = this.rowSize;
        var bits = this.bits;
        var bitsOffset = bits.length - 1;
        while (bitsOffset >= 0 && bits[bitsOffset] === 0) {
            bitsOffset--;
        }
        if (bitsOffset < 0) {
            return null;
        }
        var y = Math.floor(bitsOffset / rowSize);
        var x = Math.floor(bitsOffset % rowSize) * 32;
        var theBits = bits[bitsOffset];
        var bit = 31;
        while ((theBits >>> bit) === 0) {
            bit--;
        }
        x += bit;
        return Int32Array.from([x, y]);
    };
    /**
     * @return The width of the matrix
     */
    BitMatrix.prototype.getWidth = function () {
        return this.width;
    };
    /**
     * @return The height of the matrix
     */
    BitMatrix.prototype.getHeight = function () {
        return this.height;
    };
    /**
     * @return The row size of the matrix
     */
    BitMatrix.prototype.getRowSize = function () {
        return this.rowSize;
    };
    /*@Override*/
    BitMatrix.prototype.equals = function (o) {
        if (!(o instanceof BitMatrix)) {
            return false;
        }
        var other = o;
        return this.width === other.width && this.height === other.height && this.rowSize === other.rowSize &&
            Arrays_1.default.equals(this.bits, other.bits);
    };
    /*@Override*/
    BitMatrix.prototype.hashCode = function () {
        var hash = this.width;
        hash = 31 * hash + this.width;
        hash = 31 * hash + this.height;
        hash = 31 * hash + this.rowSize;
        hash = 31 * hash + Arrays_1.default.hashCode(this.bits);
        return hash;
    };
    /**
     * @return string representation using "X" for set and " " for unset bits
     */
    /*@Override*/
    // public toString(): string {
    //   return toString(": "X, "  ")
    // }
    /**
     * @param setString representation of a set bit
     * @param unsetString representation of an unset bit
     * @return string representation of entire matrix utilizing given strings
     */
    // public toString(setString: string = "X ", unsetString: string = "  "): string {
    //   return this.buildToString(setString, unsetString, "\n")
    // }
    /**
     * @param setString representation of a set bit
     * @param unsetString representation of an unset bit
     * @param lineSeparator newline character in string representation
     * @return string representation of entire matrix utilizing given strings and line separator
     * @deprecated call {@link #toString(String,String)} only, which uses \n line separator always
     */
    // @Deprecated
    BitMatrix.prototype.toString = function (setString, unsetString, lineSeparator) {
        if (setString === void 0) { setString = 'x'; }
        if (unsetString === void 0) { unsetString = ' '; }
        if (lineSeparator === void 0) { lineSeparator = '\n'; }
        return this.buildToString(setString, unsetString, lineSeparator);
    };
    BitMatrix.prototype.buildToString = function (setString, unsetString, lineSeparator) {
        var result = new StringBuilder_1.default();
        result.append(lineSeparator);
        for (var y = 0, height = this.height; y < height; y++) {
            for (var x = 0, width = this.width; x < width; x++) {
                result.append(this.get(x, y) ? setString : unsetString);
            }
            result.append(lineSeparator);
        }
        return result.toString();
    };
    /*@Override*/
    BitMatrix.prototype.clone = function () {
        return new BitMatrix(this.width, this.height, this.rowSize, this.bits.slice());
    };
    return BitMatrix;
}());
exports.default = BitMatrix;
//# sourceMappingURL=BitMatrix.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/BitSource.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/BitSource.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common {*/
var IllegalArgumentException_1 = __webpack_require__(/*! ../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * <p>This provides an easy abstraction to read bits at a time from a sequence of bytes, where the
 * number of bits read is not often a multiple of 8.</p>
 *
 * <p>This class is thread-safe but not reentrant -- unless the caller modifies the bytes array
 * it passed in, in which case all bets are off.</p>
 *
 * @author Sean Owen
 */
var BitSource = /** @class */ (function () {
    /**
     * @param bytes bytes from which this will read bits. Bits will be read from the first byte first.
     * Bits are read within a byte from most-significant to least-significant bit.
     */
    function BitSource(bytes) {
        this.bytes = bytes;
        this.byteOffset = 0;
        this.bitOffset = 0;
    }
    /**
     * @return index of next bit in current byte which would be read by the next call to {@link #readBits(int)}.
     */
    BitSource.prototype.getBitOffset = function () {
        return this.bitOffset;
    };
    /**
     * @return index of next byte in input byte array which would be read by the next call to {@link #readBits(int)}.
     */
    BitSource.prototype.getByteOffset = function () {
        return this.byteOffset;
    };
    /**
     * @param numBits number of bits to read
     * @return int representing the bits read. The bits will appear as the least-significant
     *         bits of the int
     * @throws IllegalArgumentException if numBits isn't in [1,32] or more than is available
     */
    BitSource.prototype.readBits = function (numBits /*int*/) {
        if (numBits < 1 || numBits > 32 || numBits > this.available()) {
            throw new IllegalArgumentException_1.default('' + numBits);
        }
        var result = 0;
        var bitOffset = this.bitOffset;
        var byteOffset = this.byteOffset;
        var bytes = this.bytes;
        // First, read remainder from current byte
        if (bitOffset > 0) {
            var bitsLeft = 8 - bitOffset;
            var toRead = numBits < bitsLeft ? numBits : bitsLeft;
            var bitsToNotRead = bitsLeft - toRead;
            var mask = (0xFF >> (8 - toRead)) << bitsToNotRead;
            result = (bytes[byteOffset] & mask) >> bitsToNotRead;
            numBits -= toRead;
            bitOffset += toRead;
            if (bitOffset === 8) {
                bitOffset = 0;
                byteOffset++;
            }
        }
        // Next read whole bytes
        if (numBits > 0) {
            while (numBits >= 8) {
                result = (result << 8) | (bytes[byteOffset] & 0xFF);
                byteOffset++;
                numBits -= 8;
            }
            // Finally read a partial byte
            if (numBits > 0) {
                var bitsToNotRead = 8 - numBits;
                var mask = (0xFF >> bitsToNotRead) << bitsToNotRead;
                result = (result << numBits) | ((bytes[byteOffset] & mask) >> bitsToNotRead);
                bitOffset += numBits;
            }
        }
        this.bitOffset = bitOffset;
        this.byteOffset = byteOffset;
        return result;
    };
    /**
     * @return number of bits that can be read successfully
     */
    BitSource.prototype.available = function () {
        return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
    };
    return BitSource;
}());
exports.default = BitSource;
//# sourceMappingURL=BitSource.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/CharacterSetECI.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/CharacterSetECI.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common {*/
var FormatException_1 = __webpack_require__(/*! ../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
/**
 * Encapsulates a Character Set ECI, according to "Extended Channel Interpretations" 5.3.1.1
 * of ISO 18004.
 *
 * @author Sean Owen
 */
var CharacterSetECI = /** @class */ (function () {
    function CharacterSetECI(valueIdentifier, valuesParam, name) {
        var otherEncodingNames = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            otherEncodingNames[_i - 3] = arguments[_i];
        }
        this.valueIdentifier = valueIdentifier;
        this.name = name;
        if (typeof valuesParam === 'number') {
            this.values = Int32Array.from([valuesParam]);
        }
        else {
            this.values = valuesParam;
        }
        this.otherEncodingNames = otherEncodingNames;
        CharacterSetECI.VALUE_IDENTIFIER_TO_ECI.set(valueIdentifier, this);
        CharacterSetECI.NAME_TO_ECI.set(name, this);
        var values = this.values;
        for (var i = 0, length_1 = values.length; i !== length_1; i++) {
            var v = values[i];
            CharacterSetECI.VALUES_TO_ECI.set(v, this);
        }
        for (var _a = 0, otherEncodingNames_1 = otherEncodingNames; _a < otherEncodingNames_1.length; _a++) {
            var otherName = otherEncodingNames_1[_a];
            CharacterSetECI.NAME_TO_ECI.set(otherName, this);
        }
    }
    // CharacterSetECI(value: number /*int*/) {
    //   this(new Int32Array {value})
    // }
    // CharacterSetECI(value: number /*int*/, String... otherEncodingNames) {
    //   this.values = new Int32Array {value}
    //   this.otherEncodingNames = otherEncodingNames
    // }
    // CharacterSetECI(values: Int32Array, String... otherEncodingNames) {
    //   this.values = values
    //   this.otherEncodingNames = otherEncodingNames
    // }
    CharacterSetECI.prototype.getValueIdentifier = function () {
        return this.valueIdentifier;
    };
    CharacterSetECI.prototype.getName = function () {
        return this.name;
    };
    CharacterSetECI.prototype.getValue = function () {
        return this.values[0];
    };
    /**
     * @param value character set ECI value
     * @return {@code CharacterSetECI} representing ECI of given value, or null if it is legal but
     *   unsupported
     * @throws FormatException if ECI value is invalid
     */
    CharacterSetECI.getCharacterSetECIByValue = function (value /*int*/) {
        if (value < 0 || value >= 900) {
            throw new FormatException_1.default('incorect value');
        }
        var characterSet = CharacterSetECI.VALUES_TO_ECI.get(value);
        if (undefined === characterSet) {
            throw new FormatException_1.default('incorect value');
        }
        return characterSet;
    };
    /**
     * @param name character set ECI encoding name
     * @return CharacterSetECI representing ECI for character encoding, or null if it is legal
     *   but unsupported
     */
    CharacterSetECI.getCharacterSetECIByName = function (name) {
        var characterSet = CharacterSetECI.NAME_TO_ECI.get(name);
        if (undefined === characterSet) {
            throw new FormatException_1.default('incorect value');
        }
        return characterSet;
    };
    CharacterSetECI.prototype.equals = function (o) {
        if (!(o instanceof CharacterSetECI)) {
            return false;
        }
        var other = o;
        return this.getName() === other.getName();
    };
    CharacterSetECI.VALUE_IDENTIFIER_TO_ECI = new Map();
    CharacterSetECI.VALUES_TO_ECI = new Map();
    CharacterSetECI.NAME_TO_ECI = new Map();
    // Enum name is a Java encoding valid for java.lang and java.io
    // TYPESCRIPTPORT: changed the main label for ISO as the TextEncoder did not recognized them in the form from java
    // (eg ISO8859_1 must be ISO88591 or ISO8859-1 or ISO-8859-1)
    // later on: well, except 16 wich does not work with ISO885916 so used ISO-8859-1 form for default
    CharacterSetECI.Cp437 = new CharacterSetECI(0 /* Cp437 */, Int32Array.from([0, 2]), 'Cp437');
    CharacterSetECI.ISO8859_1 = new CharacterSetECI(1 /* ISO8859_1 */, Int32Array.from([1, 3]), 'ISO-8859-1', 'ISO88591', 'ISO8859_1');
    CharacterSetECI.ISO8859_2 = new CharacterSetECI(2 /* ISO8859_2 */, 4, 'ISO-8859-2', 'ISO88592', 'ISO8859_2');
    CharacterSetECI.ISO8859_3 = new CharacterSetECI(3 /* ISO8859_3 */, 5, 'ISO-8859-3', 'ISO88593', 'ISO8859_3');
    CharacterSetECI.ISO8859_4 = new CharacterSetECI(4 /* ISO8859_4 */, 6, 'ISO-8859-4', 'ISO88594', 'ISO8859_4');
    CharacterSetECI.ISO8859_5 = new CharacterSetECI(5 /* ISO8859_5 */, 7, 'ISO-8859-5', 'ISO88595', 'ISO8859_5');
    CharacterSetECI.ISO8859_6 = new CharacterSetECI(6 /* ISO8859_6 */, 8, 'ISO-8859-6', 'ISO88596', 'ISO8859_6');
    CharacterSetECI.ISO8859_7 = new CharacterSetECI(7 /* ISO8859_7 */, 9, 'ISO-8859-7', 'ISO88597', 'ISO8859_7');
    CharacterSetECI.ISO8859_8 = new CharacterSetECI(8 /* ISO8859_8 */, 10, 'ISO-8859-8', 'ISO88598', 'ISO8859_8');
    CharacterSetECI.ISO8859_9 = new CharacterSetECI(9 /* ISO8859_9 */, 11, 'ISO-8859-9', 'ISO88599', 'ISO8859_9');
    CharacterSetECI.ISO8859_10 = new CharacterSetECI(10 /* ISO8859_10 */, 12, 'ISO-8859-10', 'ISO885910', 'ISO8859_10');
    CharacterSetECI.ISO8859_11 = new CharacterSetECI(11 /* ISO8859_11 */, 13, 'ISO-8859-11', 'ISO885911', 'ISO8859_11');
    CharacterSetECI.ISO8859_13 = new CharacterSetECI(12 /* ISO8859_13 */, 15, 'ISO-8859-13', 'ISO885913', 'ISO8859_13');
    CharacterSetECI.ISO8859_14 = new CharacterSetECI(13 /* ISO8859_14 */, 16, 'ISO-8859-14', 'ISO885914', 'ISO8859_14');
    CharacterSetECI.ISO8859_15 = new CharacterSetECI(14 /* ISO8859_15 */, 17, 'ISO-8859-15', 'ISO885915', 'ISO8859_15');
    CharacterSetECI.ISO8859_16 = new CharacterSetECI(15 /* ISO8859_16 */, 18, 'ISO-8859-16', 'ISO885916', 'ISO8859_16');
    CharacterSetECI.SJIS = new CharacterSetECI(16 /* SJIS */, 20, 'SJIS', 'Shift_JIS');
    CharacterSetECI.Cp1250 = new CharacterSetECI(17 /* Cp1250 */, 21, 'Cp1250', 'windows-1250');
    CharacterSetECI.Cp1251 = new CharacterSetECI(18 /* Cp1251 */, 22, 'Cp1251', 'windows-1251');
    CharacterSetECI.Cp1252 = new CharacterSetECI(19 /* Cp1252 */, 23, 'Cp1252', 'windows-1252');
    CharacterSetECI.Cp1256 = new CharacterSetECI(20 /* Cp1256 */, 24, 'Cp1256', 'windows-1256');
    CharacterSetECI.UnicodeBigUnmarked = new CharacterSetECI(21 /* UnicodeBigUnmarked */, 25, 'UnicodeBigUnmarked', 'UTF-16BE', 'UnicodeBig');
    CharacterSetECI.UTF8 = new CharacterSetECI(22 /* UTF8 */, 26, 'UTF8', 'UTF-8');
    CharacterSetECI.ASCII = new CharacterSetECI(23 /* ASCII */, Int32Array.from([27, 170]), 'ASCII', 'US-ASCII');
    CharacterSetECI.Big5 = new CharacterSetECI(24 /* Big5 */, 28, 'Big5');
    CharacterSetECI.GB18030 = new CharacterSetECI(25 /* GB18030 */, 29, 'GB18030', 'GB2312', 'EUC_CN', 'GBK');
    CharacterSetECI.EUC_KR = new CharacterSetECI(26 /* EUC_KR */, 30, 'EUC_KR', 'EUC-KR');
    return CharacterSetECI;
}());
exports.default = CharacterSetECI;
//# sourceMappingURL=CharacterSetECI.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/DecoderResult.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/DecoderResult.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common {*/
/*import java.util.List;*/
/**
 * <p>Encapsulates the result of decoding a matrix of bits. This typically
 * applies to 2D barcode formats. For now it contains the raw bytes obtained,
 * as well as a String interpretation of those bytes, if applicable.</p>
 *
 * @author Sean Owen
 */
var DecoderResult = /** @class */ (function () {
    // public constructor(rawBytes: Uint8Array,
    //                      text: string,
    //                      List<Uint8Array> byteSegments,
    //                      String ecLevel) {
    //   this(rawBytes, text, byteSegments, ecLevel, -1, -1)
    // }
    function DecoderResult(rawBytes, text, byteSegments, ecLevel, structuredAppendSequenceNumber, structuredAppendParity) {
        if (structuredAppendSequenceNumber === void 0) { structuredAppendSequenceNumber = -1; }
        if (structuredAppendParity === void 0) { structuredAppendParity = -1; }
        this.rawBytes = rawBytes;
        this.text = text;
        this.byteSegments = byteSegments;
        this.ecLevel = ecLevel;
        this.structuredAppendSequenceNumber = structuredAppendSequenceNumber;
        this.structuredAppendParity = structuredAppendParity;
        this.numBits = (rawBytes === undefined || rawBytes === null) ? 0 : 8 * rawBytes.length;
    }
    /**
     * @return raw bytes representing the result, or {@code null} if not applicable
     */
    DecoderResult.prototype.getRawBytes = function () {
        return this.rawBytes;
    };
    /**
     * @return how many bits of {@link #getRawBytes()} are valid; typically 8 times its length
     * @since 3.3.0
     */
    DecoderResult.prototype.getNumBits = function () {
        return this.numBits;
    };
    /**
     * @param numBits overrides the number of bits that are valid in {@link #getRawBytes()}
     * @since 3.3.0
     */
    DecoderResult.prototype.setNumBits = function (numBits /*int*/) {
        this.numBits = numBits;
    };
    /**
     * @return text representation of the result
     */
    DecoderResult.prototype.getText = function () {
        return this.text;
    };
    /**
     * @return list of byte segments in the result, or {@code null} if not applicable
     */
    DecoderResult.prototype.getByteSegments = function () {
        return this.byteSegments;
    };
    /**
     * @return name of error correction level used, or {@code null} if not applicable
     */
    DecoderResult.prototype.getECLevel = function () {
        return this.ecLevel;
    };
    /**
     * @return number of errors corrected, or {@code null} if not applicable
     */
    DecoderResult.prototype.getErrorsCorrected = function () {
        return this.errorsCorrected;
    };
    DecoderResult.prototype.setErrorsCorrected = function (errorsCorrected /*Integer*/) {
        this.errorsCorrected = errorsCorrected;
    };
    /**
     * @return number of erasures corrected, or {@code null} if not applicable
     */
    DecoderResult.prototype.getErasures = function () {
        return this.erasures;
    };
    DecoderResult.prototype.setErasures = function (erasures /*Integer*/) {
        this.erasures = erasures;
    };
    /**
     * @return arbitrary additional metadata
     */
    DecoderResult.prototype.getOther = function () {
        return this.other;
    };
    DecoderResult.prototype.setOther = function (other) {
        this.other = other;
    };
    DecoderResult.prototype.hasStructuredAppend = function () {
        return this.structuredAppendParity >= 0 && this.structuredAppendSequenceNumber >= 0;
    };
    DecoderResult.prototype.getStructuredAppendParity = function () {
        return this.structuredAppendParity;
    };
    DecoderResult.prototype.getStructuredAppendSequenceNumber = function () {
        return this.structuredAppendSequenceNumber;
    };
    return DecoderResult;
}());
exports.default = DecoderResult;
//# sourceMappingURL=DecoderResult.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/DefaultGridSampler.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/DefaultGridSampler.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common {*/
var GridSampler_1 = __webpack_require__(/*! ./GridSampler */ "./node_modules/@zxing/library/esm5/core/common/GridSampler.js");
var BitMatrix_1 = __webpack_require__(/*! ./BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
var PerspectiveTransform_1 = __webpack_require__(/*! ./PerspectiveTransform */ "./node_modules/@zxing/library/esm5/core/common/PerspectiveTransform.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * @author Sean Owen
 */
var DefaultGridSampler = /** @class */ (function (_super) {
    __extends(DefaultGridSampler, _super);
    function DefaultGridSampler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*@Override*/
    DefaultGridSampler.prototype.sampleGrid = function (image, dimensionX /*int*/, dimensionY /*int*/, p1ToX /*float*/, p1ToY /*float*/, p2ToX /*float*/, p2ToY /*float*/, p3ToX /*float*/, p3ToY /*float*/, p4ToX /*float*/, p4ToY /*float*/, p1FromX /*float*/, p1FromY /*float*/, p2FromX /*float*/, p2FromY /*float*/, p3FromX /*float*/, p3FromY /*float*/, p4FromX /*float*/, p4FromY /*float*/) {
        var transform = PerspectiveTransform_1.default.quadrilateralToQuadrilateral(p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY);
        return this.sampleGridWithTransform(image, dimensionX, dimensionY, transform);
    };
    /*@Override*/
    DefaultGridSampler.prototype.sampleGridWithTransform = function (image, dimensionX /*int*/, dimensionY /*int*/, transform) {
        if (dimensionX <= 0 || dimensionY <= 0) {
            throw new NotFoundException_1.default();
        }
        var bits = new BitMatrix_1.default(dimensionX, dimensionY);
        var points = new Float32Array(2 * dimensionX);
        for (var y = 0; y < dimensionY; y++) {
            var max = points.length;
            var iValue = y + 0.5;
            for (var x = 0; x < max; x += 2) {
                points[x] = /*(float)*/ (x / 2) + 0.5;
                points[x + 1] = iValue;
            }
            transform.transformPoints(points);
            // Quick check to see if points transformed to something inside the image
            // sufficient to check the endpoints
            GridSampler_1.default.checkAndNudgePoints(image, points);
            try {
                for (var x = 0; x < max; x += 2) {
                    if (image.get(Math.floor(points[x]), Math.floor(points[x + 1]))) {
                        // Black(-ish) pixel
                        bits.set(x / 2, y);
                    }
                }
            }
            catch (aioobe /*: ArrayIndexOutOfBoundsException*/) {
                // This feels wrong, but, sometimes if the finder patterns are misidentified, the resulting
                // transform gets "twisted" such that it maps a straight line of points to a set of points
                // whose endpoints are in bounds, but others are not. There is probably some mathematical
                // way to detect this about the transformation that I don't know yet.
                // This results in an ugly runtime exception despite our clever checks above -- can't have
                // that. We could check each point's coordinates but that feels duplicative. We settle for
                // catching and wrapping ArrayIndexOutOfBoundsException.
                throw new NotFoundException_1.default();
            }
        }
        return bits;
    };
    return DefaultGridSampler;
}(GridSampler_1.default));
exports.default = DefaultGridSampler;
//# sourceMappingURL=DefaultGridSampler.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/DetectorResult.js":
/*!************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/DetectorResult.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * <p>Encapsulates the result of detecting a barcode in an image. This includes the raw
 * matrix of black/white pixels corresponding to the barcode, and possibly points of interest
 * in the image, like the location of finder patterns or corners of the barcode in the image.</p>
 *
 * @author Sean Owen
 */
var DetectorResult = /** @class */ (function () {
    function DetectorResult(bits, points) {
        this.bits = bits;
        this.points = points;
    }
    DetectorResult.prototype.getBits = function () {
        return this.bits;
    };
    DetectorResult.prototype.getPoints = function () {
        return this.points;
    };
    return DetectorResult;
}());
exports.default = DetectorResult;
//# sourceMappingURL=DetectorResult.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/GlobalHistogramBinarizer.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/GlobalHistogramBinarizer.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common {*/
var Binarizer_1 = __webpack_require__(/*! ../Binarizer */ "./node_modules/@zxing/library/esm5/core/Binarizer.js");
var BitArray_1 = __webpack_require__(/*! ./BitArray */ "./node_modules/@zxing/library/esm5/core/common/BitArray.js");
var BitMatrix_1 = __webpack_require__(/*! ./BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * This Binarizer implementation uses the old ZXing global histogram approach. It is suitable
 * for low-end mobile devices which don't have enough CPU or memory to use a local thresholding
 * algorithm. However, because it picks a global black point, it cannot handle difficult shadows
 * and gradients.
 *
 * Faster mobile devices and all desktop applications should probably use HybridBinarizer instead.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 * @author Sean Owen
 */
var GlobalHistogramBinarizer = /** @class */ (function (_super) {
    __extends(GlobalHistogramBinarizer, _super);
    function GlobalHistogramBinarizer(source) {
        var _this = _super.call(this, source) || this;
        _this.luminances = GlobalHistogramBinarizer.EMPTY;
        _this.buckets = new Int32Array(GlobalHistogramBinarizer.LUMINANCE_BUCKETS);
        return _this;
    }
    // Applies simple sharpening to the row data to improve performance of the 1D Readers.
    /*@Override*/
    GlobalHistogramBinarizer.prototype.getBlackRow = function (y /*int*/, row) {
        var source = this.getLuminanceSource();
        var width = source.getWidth();
        if (row === undefined || row === null || row.getSize() < width) {
            row = new BitArray_1.default(width);
        }
        else {
            row.clear();
        }
        this.initArrays(width);
        var localLuminances = source.getRow(y, this.luminances);
        var localBuckets = this.buckets;
        for (var x = 0; x < width; x++) {
            localBuckets[(localLuminances[x] & 0xff) >> GlobalHistogramBinarizer.LUMINANCE_SHIFT]++;
        }
        var blackPoint = GlobalHistogramBinarizer.estimateBlackPoint(localBuckets);
        if (width < 3) {
            // Special case for very small images
            for (var x = 0; x < width; x++) {
                if ((localLuminances[x] & 0xff) < blackPoint) {
                    row.set(x);
                }
            }
        }
        else {
            var left = localLuminances[0] & 0xff;
            var center = localLuminances[1] & 0xff;
            for (var x = 1; x < width - 1; x++) {
                var right = localLuminances[x + 1] & 0xff;
                // A simple -1 4 -1 box filter with a weight of 2.
                if (((center * 4) - left - right) / 2 < blackPoint) {
                    row.set(x);
                }
                left = center;
                center = right;
            }
        }
        return row;
    };
    // Does not sharpen the data, as this call is intended to only be used by 2D Readers.
    /*@Override*/
    GlobalHistogramBinarizer.prototype.getBlackMatrix = function () {
        var source = this.getLuminanceSource();
        var width = source.getWidth();
        var height = source.getHeight();
        var matrix = new BitMatrix_1.default(width, height);
        // Quickly calculates the histogram by sampling four rows from the image. This proved to be
        // more robust on the blackbox tests than sampling a diagonal as we used to do.
        this.initArrays(width);
        var localBuckets = this.buckets;
        for (var y = 1; y < 5; y++) {
            var row = height * y / 5;
            var localLuminances_1 = source.getRow(row, this.luminances);
            var right = Math.floor((width * 4) / 5);
            for (var x = Math.floor(width / 5); x < right; x++) {
                var pixel = localLuminances_1[x] & 0xff;
                localBuckets[pixel >> GlobalHistogramBinarizer.LUMINANCE_SHIFT]++;
            }
        }
        var blackPoint = GlobalHistogramBinarizer.estimateBlackPoint(localBuckets);
        // We delay reading the entire image luminance until the black point estimation succeeds.
        // Although we end up reading four rows twice, it is consistent with our motto of
        // "fail quickly" which is necessary for continuous scanning.
        var localLuminances = source.getMatrix();
        for (var y = 0; y < height; y++) {
            var offset = y * width;
            for (var x = 0; x < width; x++) {
                var pixel = localLuminances[offset + x] & 0xff;
                if (pixel < blackPoint) {
                    matrix.set(x, y);
                }
            }
        }
        return matrix;
    };
    /*@Override*/
    GlobalHistogramBinarizer.prototype.createBinarizer = function (source) {
        return new GlobalHistogramBinarizer(source);
    };
    GlobalHistogramBinarizer.prototype.initArrays = function (luminanceSize /*int*/) {
        if (this.luminances.length < luminanceSize) {
            this.luminances = new Uint8ClampedArray(luminanceSize);
        }
        var buckets = this.buckets;
        for (var x = 0; x < GlobalHistogramBinarizer.LUMINANCE_BUCKETS; x++) {
            buckets[x] = 0;
        }
    };
    GlobalHistogramBinarizer.estimateBlackPoint = function (buckets) {
        // Find the tallest peak in the histogram.
        var numBuckets = buckets.length;
        var maxBucketCount = 0;
        var firstPeak = 0;
        var firstPeakSize = 0;
        for (var x = 0; x < numBuckets; x++) {
            if (buckets[x] > firstPeakSize) {
                firstPeak = x;
                firstPeakSize = buckets[x];
            }
            if (buckets[x] > maxBucketCount) {
                maxBucketCount = buckets[x];
            }
        }
        // Find the second-tallest peak which is somewhat far from the tallest peak.
        var secondPeak = 0;
        var secondPeakScore = 0;
        for (var x = 0; x < numBuckets; x++) {
            var distanceToBiggest = x - firstPeak;
            // Encourage more distant second peaks by multiplying by square of distance.
            var score = buckets[x] * distanceToBiggest * distanceToBiggest;
            if (score > secondPeakScore) {
                secondPeak = x;
                secondPeakScore = score;
            }
        }
        // Make sure firstPeak corresponds to the black peak.
        if (firstPeak > secondPeak) {
            var temp = firstPeak;
            firstPeak = secondPeak;
            secondPeak = temp;
        }
        // If there is too little contrast in the image to pick a meaningful black point, throw rather
        // than waste time trying to decode the image, and risk false positives.
        if (secondPeak - firstPeak <= numBuckets / 16) {
            throw new NotFoundException_1.default();
        }
        // Find a valley between them that is low and closer to the white peak.
        var bestValley = secondPeak - 1;
        var bestValleyScore = -1;
        for (var x = secondPeak - 1; x > firstPeak; x--) {
            var fromFirst = x - firstPeak;
            var score = fromFirst * fromFirst * (secondPeak - x) * (maxBucketCount - buckets[x]);
            if (score > bestValleyScore) {
                bestValley = x;
                bestValleyScore = score;
            }
        }
        return bestValley << GlobalHistogramBinarizer.LUMINANCE_SHIFT;
    };
    GlobalHistogramBinarizer.LUMINANCE_BITS = 5;
    GlobalHistogramBinarizer.LUMINANCE_SHIFT = 8 - GlobalHistogramBinarizer.LUMINANCE_BITS;
    GlobalHistogramBinarizer.LUMINANCE_BUCKETS = 1 << GlobalHistogramBinarizer.LUMINANCE_BITS;
    GlobalHistogramBinarizer.EMPTY = Uint8ClampedArray.from([0]);
    return GlobalHistogramBinarizer;
}(Binarizer_1.default));
exports.default = GlobalHistogramBinarizer;
//# sourceMappingURL=GlobalHistogramBinarizer.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/GridSampler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/GridSampler.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * Implementations of this class can, given locations of finder patterns for a QR code in an
 * image, sample the right points in the image to reconstruct the QR code, accounting for
 * perspective distortion. It is abstracted since it is relatively expensive and should be allowed
 * to take advantage of platform-specific optimized implementations, like Sun's Java Advanced
 * Imaging library, but which may not be available in other environments such as J2ME, and vice
 * versa.
 *
 * The implementation used can be controlled by calling {@link #setGridSampler(GridSampler)}
 * with an instance of a class which implements this interface.
 *
 * @author Sean Owen
 */
var GridSampler = /** @class */ (function () {
    function GridSampler() {
    }
    /**
     * <p>Checks a set of points that have been transformed to sample points on an image against
     * the image's dimensions to see if the point are even within the image.</p>
     *
     * <p>This method will actually "nudge" the endpoints back onto the image if they are found to be
     * barely (less than 1 pixel) off the image. This accounts for imperfect detection of finder
     * patterns in an image where the QR Code runs all the way to the image border.</p>
     *
     * <p>For efficiency, the method will check points from either end of the line until one is found
     * to be within the image. Because the set of points are assumed to be linear, this is valid.</p>
     *
     * @param image image into which the points should map
     * @param points actual points in x1,y1,...,xn,yn form
     * @throws NotFoundException if an endpoint is lies outside the image boundaries
     */
    GridSampler.checkAndNudgePoints = function (image, points) {
        var width = image.getWidth();
        var height = image.getHeight();
        // Check and nudge points from start until we see some that are OK:
        var nudged = true;
        for (var offset = 0; offset < points.length && nudged; offset += 2) {
            var x = Math.floor(points[offset]);
            var y = Math.floor(points[offset + 1]);
            if (x < -1 || x > width || y < -1 || y > height) {
                throw new NotFoundException_1.default();
            }
            nudged = false;
            if (x === -1) {
                points[offset] = 0.0;
                nudged = true;
            }
            else if (x === width) {
                points[offset] = width - 1;
                nudged = true;
            }
            if (y === -1) {
                points[offset + 1] = 0.0;
                nudged = true;
            }
            else if (y === height) {
                points[offset + 1] = height - 1;
                nudged = true;
            }
        }
        // Check and nudge points from end:
        nudged = true;
        for (var offset = points.length - 2; offset >= 0 && nudged; offset -= 2) {
            var x = Math.floor(points[offset]);
            var y = Math.floor(points[offset + 1]);
            if (x < -1 || x > width || y < -1 || y > height) {
                throw new NotFoundException_1.default();
            }
            nudged = false;
            if (x === -1) {
                points[offset] = 0.0;
                nudged = true;
            }
            else if (x === width) {
                points[offset] = width - 1;
                nudged = true;
            }
            if (y === -1) {
                points[offset + 1] = 0.0;
                nudged = true;
            }
            else if (y === height) {
                points[offset + 1] = height - 1;
                nudged = true;
            }
        }
    };
    return GridSampler;
}());
exports.default = GridSampler;
//# sourceMappingURL=GridSampler.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/GridSamplerInstance.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/GridSamplerInstance.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DefaultGridSampler_1 = __webpack_require__(/*! ./DefaultGridSampler */ "./node_modules/@zxing/library/esm5/core/common/DefaultGridSampler.js");
var GridSamplerInstance = /** @class */ (function () {
    function GridSamplerInstance() {
    }
    /**
     * Sets the implementation of GridSampler used by the library. One global
     * instance is stored, which may sound problematic. But, the implementation provided
     * ought to be appropriate for the entire platform, and all uses of this library
     * in the whole lifetime of the JVM. For instance, an Android activity can swap in
     * an implementation that takes advantage of native platform libraries.
     *
     * @param newGridSampler The platform-specific object to install.
     */
    GridSamplerInstance.setGridSampler = function (newGridSampler) {
        GridSamplerInstance.gridSampler = newGridSampler;
    };
    /**
     * @return the current implementation of GridSampler
     */
    GridSamplerInstance.getInstance = function () {
        return GridSamplerInstance.gridSampler;
    };
    GridSamplerInstance.gridSampler = new DefaultGridSampler_1.default();
    return GridSamplerInstance;
}());
exports.default = GridSamplerInstance;
//# sourceMappingURL=GridSamplerInstance.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/HybridBinarizer.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/HybridBinarizer.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalHistogramBinarizer_1 = __webpack_require__(/*! ./GlobalHistogramBinarizer */ "./node_modules/@zxing/library/esm5/core/common/GlobalHistogramBinarizer.js");
var BitMatrix_1 = __webpack_require__(/*! ./BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
/**
 * This class implements a local thresholding algorithm, which while slower than the
 * GlobalHistogramBinarizer, is fairly efficient for what it does. It is designed for
 * high frequency images of barcodes with black data on white backgrounds. For this application,
 * it does a much better job than a global blackpoint with severe shadows and gradients.
 * However it tends to produce artifacts on lower frequency images and is therefore not
 * a good general purpose binarizer for uses outside ZXing.
 *
 * This class extends GlobalHistogramBinarizer, using the older histogram approach for 1D readers,
 * and the newer local approach for 2D readers. 1D decoding using a per-row histogram is already
 * inherently local, and only fails for horizontal gradients. We can revisit that problem later,
 * but for now it was not a win to use local blocks for 1D.
 *
 * This Binarizer is the default for the unit tests and the recommended class for library users.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
var HybridBinarizer = /** @class */ (function (_super) {
    __extends(HybridBinarizer, _super);
    function HybridBinarizer(source) {
        var _this = _super.call(this, source) || this;
        _this.matrix = null;
        return _this;
    }
    /**
     * Calculates the final BitMatrix once for all requests. This could be called once from the
     * constructor instead, but there are some advantages to doing it lazily, such as making
     * profiling easier, and not doing heavy lifting when callers don't expect it.
     */
    /*@Override*/
    HybridBinarizer.prototype.getBlackMatrix = function () {
        if (this.matrix !== null) {
            return this.matrix;
        }
        var source = this.getLuminanceSource();
        var width = source.getWidth();
        var height = source.getHeight();
        if (width >= HybridBinarizer.MINIMUM_DIMENSION && height >= HybridBinarizer.MINIMUM_DIMENSION) {
            var luminances = source.getMatrix();
            var subWidth = width >> HybridBinarizer.BLOCK_SIZE_POWER;
            if ((width & HybridBinarizer.BLOCK_SIZE_MASK) !== 0) {
                subWidth++;
            }
            var subHeight = height >> HybridBinarizer.BLOCK_SIZE_POWER;
            if ((height & HybridBinarizer.BLOCK_SIZE_MASK) !== 0) {
                subHeight++;
            }
            var blackPoints = HybridBinarizer.calculateBlackPoints(luminances, subWidth, subHeight, width, height);
            var newMatrix = new BitMatrix_1.default(width, height);
            HybridBinarizer.calculateThresholdForBlock(luminances, subWidth, subHeight, width, height, blackPoints, newMatrix);
            this.matrix = newMatrix;
        }
        else {
            // If the image is too small, fall back to the global histogram approach.
            this.matrix = _super.prototype.getBlackMatrix.call(this);
        }
        return this.matrix;
    };
    /*@Override*/
    HybridBinarizer.prototype.createBinarizer = function (source) {
        return new HybridBinarizer(source);
    };
    /**
     * For each block in the image, calculate the average black point using a 5x5 grid
     * of the blocks around it. Also handles the corner cases (fractional blocks are computed based
     * on the last pixels in the row/column which are also used in the previous block).
     */
    HybridBinarizer.calculateThresholdForBlock = function (luminances, subWidth /*int*/, subHeight /*int*/, width /*int*/, height /*int*/, blackPoints, matrix) {
        var maxYOffset = height - HybridBinarizer.BLOCK_SIZE;
        var maxXOffset = width - HybridBinarizer.BLOCK_SIZE;
        for (var y = 0; y < subHeight; y++) {
            var yoffset = y << HybridBinarizer.BLOCK_SIZE_POWER;
            if (yoffset > maxYOffset) {
                yoffset = maxYOffset;
            }
            var top_1 = HybridBinarizer.cap(y, 2, subHeight - 3);
            for (var x = 0; x < subWidth; x++) {
                var xoffset = x << HybridBinarizer.BLOCK_SIZE_POWER;
                if (xoffset > maxXOffset) {
                    xoffset = maxXOffset;
                }
                var left = HybridBinarizer.cap(x, 2, subWidth - 3);
                var sum = 0;
                for (var z = -2; z <= 2; z++) {
                    var blackRow = blackPoints[top_1 + z];
                    sum += blackRow[left - 2] + blackRow[left - 1] + blackRow[left] + blackRow[left + 1] + blackRow[left + 2];
                }
                var average = sum / 25;
                HybridBinarizer.thresholdBlock(luminances, xoffset, yoffset, average, width, matrix);
            }
        }
    };
    HybridBinarizer.cap = function (value /*int*/, min /*int*/, max /*int*/) {
        return value < min ? min : value > max ? max : value;
    };
    /**
     * Applies a single threshold to a block of pixels.
     */
    HybridBinarizer.thresholdBlock = function (luminances, xoffset /*int*/, yoffset /*int*/, threshold /*int*/, stride /*int*/, matrix) {
        for (var y = 0, offset = yoffset * stride + xoffset; y < HybridBinarizer.BLOCK_SIZE; y++, offset += stride) {
            for (var x = 0; x < HybridBinarizer.BLOCK_SIZE; x++) {
                // Comparison needs to be <= so that black == 0 pixels are black even if the threshold is 0.
                if ((luminances[offset + x] & 0xFF) <= threshold) {
                    matrix.set(xoffset + x, yoffset + y);
                }
            }
        }
    };
    /**
     * Calculates a single black point for each block of pixels and saves it away.
     * See the following thread for a discussion of this algorithm:
     *  http://groups.google.com/group/zxing/browse_thread/thread/d06efa2c35a7ddc0
     */
    HybridBinarizer.calculateBlackPoints = function (luminances, subWidth /*int*/, subHeight /*int*/, width /*int*/, height /*int*/) {
        var maxYOffset = height - HybridBinarizer.BLOCK_SIZE;
        var maxXOffset = width - HybridBinarizer.BLOCK_SIZE;
        // tslint:disable-next-line:whitespace
        var blackPoints = new Array(subHeight); // subWidth
        for (var y = 0; y < subHeight; y++) {
            blackPoints[y] = new Int32Array(subWidth);
            var yoffset = y << HybridBinarizer.BLOCK_SIZE_POWER;
            if (yoffset > maxYOffset) {
                yoffset = maxYOffset;
            }
            for (var x = 0; x < subWidth; x++) {
                var xoffset = x << HybridBinarizer.BLOCK_SIZE_POWER;
                if (xoffset > maxXOffset) {
                    xoffset = maxXOffset;
                }
                var sum = 0;
                var min = 0xFF;
                var max = 0;
                for (var yy = 0, offset = yoffset * width + xoffset; yy < HybridBinarizer.BLOCK_SIZE; yy++, offset += width) {
                    for (var xx = 0; xx < HybridBinarizer.BLOCK_SIZE; xx++) {
                        var pixel = luminances[offset + xx] & 0xFF;
                        sum += pixel;
                        // still looking for good contrast
                        if (pixel < min) {
                            min = pixel;
                        }
                        if (pixel > max) {
                            max = pixel;
                        }
                    }
                    // short-circuit min/max tests once dynamic range is met
                    if (max - min > HybridBinarizer.MIN_DYNAMIC_RANGE) {
                        // finish the rest of the rows quickly
                        for (yy++, offset += width; yy < HybridBinarizer.BLOCK_SIZE; yy++, offset += width) {
                            for (var xx = 0; xx < HybridBinarizer.BLOCK_SIZE; xx++) {
                                sum += luminances[offset + xx] & 0xFF;
                            }
                        }
                    }
                }
                // The default estimate is the average of the values in the block.
                var average = sum >> (HybridBinarizer.BLOCK_SIZE_POWER * 2);
                if (max - min <= HybridBinarizer.MIN_DYNAMIC_RANGE) {
                    // If variation within the block is low, assume this is a block with only light or only
                    // dark pixels. In that case we do not want to use the average, as it would divide this
                    // low contrast area into black and white pixels, essentially creating data out of noise.
                    //
                    // The default assumption is that the block is light/background. Since no estimate for
                    // the level of dark pixels exists locally, use half the min for the block.
                    average = min / 2;
                    if (y > 0 && x > 0) {
                        // Correct the "white background" assumption for blocks that have neighbors by comparing
                        // the pixels in this block to the previously calculated black points. This is based on
                        // the fact that dark barcode symbology is always surrounded by some amount of light
                        // background for which reasonable black point estimates were made. The bp estimated at
                        // the boundaries is used for the interior.
                        // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                        var averageNeighborBlackPoint = (blackPoints[y - 1][x] + (2 * blackPoints[y][x - 1]) + blackPoints[y - 1][x - 1]) / 4;
                        if (min < averageNeighborBlackPoint) {
                            average = averageNeighborBlackPoint;
                        }
                    }
                }
                blackPoints[y][x] = average;
            }
        }
        return blackPoints;
    };
    // This class uses 5x5 blocks to compute local luminance, where each block is 8x8 pixels.
    // So this is the smallest dimension in each axis we can accept.
    HybridBinarizer.BLOCK_SIZE_POWER = 3;
    HybridBinarizer.BLOCK_SIZE = 1 << HybridBinarizer.BLOCK_SIZE_POWER; // ...0100...00
    HybridBinarizer.BLOCK_SIZE_MASK = HybridBinarizer.BLOCK_SIZE - 1; // ...0011...11
    HybridBinarizer.MINIMUM_DIMENSION = HybridBinarizer.BLOCK_SIZE * 5;
    HybridBinarizer.MIN_DYNAMIC_RANGE = 24;
    return HybridBinarizer;
}(GlobalHistogramBinarizer_1.default));
exports.default = HybridBinarizer;
//# sourceMappingURL=HybridBinarizer.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/PerspectiveTransform.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/PerspectiveTransform.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common {*/
/**
 * <p>This class implements a perspective transform in two dimensions. Given four source and four
 * destination points, it will compute the transformation implied between them. The code is based
 * directly upon section 3.4.2 of George Wolberg's "Digital Image Warping"; see pages 54-56.</p>
 *
 * @author Sean Owen
 */
var PerspectiveTransform = /** @class */ (function () {
    function PerspectiveTransform(a11 /*float*/, a21 /*float*/, a31 /*float*/, a12 /*float*/, a22 /*float*/, a32 /*float*/, a13 /*float*/, a23 /*float*/, a33 /*float*/) {
        this.a11 = a11;
        this.a21 = a21;
        this.a31 = a31;
        this.a12 = a12;
        this.a22 = a22;
        this.a32 = a32;
        this.a13 = a13;
        this.a23 = a23;
        this.a33 = a33;
    }
    PerspectiveTransform.quadrilateralToQuadrilateral = function (x0 /*float*/, y0 /*float*/, x1 /*float*/, y1 /*float*/, x2 /*float*/, y2 /*float*/, x3 /*float*/, y3 /*float*/, x0p /*float*/, y0p /*float*/, x1p /*float*/, y1p /*float*/, x2p /*float*/, y2p /*float*/, x3p /*float*/, y3p /*float*/) {
        var qToS = PerspectiveTransform.quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3);
        var sToQ = PerspectiveTransform.squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);
        return sToQ.times(qToS);
    };
    PerspectiveTransform.prototype.transformPoints = function (points) {
        var max = points.length;
        var a11 = this.a11;
        var a12 = this.a12;
        var a13 = this.a13;
        var a21 = this.a21;
        var a22 = this.a22;
        var a23 = this.a23;
        var a31 = this.a31;
        var a32 = this.a32;
        var a33 = this.a33;
        for (var i = 0; i < max; i += 2) {
            var x = points[i];
            var y = points[i + 1];
            var denominator = a13 * x + a23 * y + a33;
            points[i] = (a11 * x + a21 * y + a31) / denominator;
            points[i + 1] = (a12 * x + a22 * y + a32) / denominator;
        }
    };
    PerspectiveTransform.prototype.transformPointsWithValues = function (xValues, yValues) {
        var a11 = this.a11;
        var a12 = this.a12;
        var a13 = this.a13;
        var a21 = this.a21;
        var a22 = this.a22;
        var a23 = this.a23;
        var a31 = this.a31;
        var a32 = this.a32;
        var a33 = this.a33;
        var n = xValues.length;
        for (var i = 0; i < n; i++) {
            var x = xValues[i];
            var y = yValues[i];
            var denominator = a13 * x + a23 * y + a33;
            xValues[i] = (a11 * x + a21 * y + a31) / denominator;
            yValues[i] = (a12 * x + a22 * y + a32) / denominator;
        }
    };
    PerspectiveTransform.squareToQuadrilateral = function (x0 /*float*/, y0 /*float*/, x1 /*float*/, y1 /*float*/, x2 /*float*/, y2 /*float*/, x3 /*float*/, y3 /*float*/) {
        var dx3 = x0 - x1 + x2 - x3;
        var dy3 = y0 - y1 + y2 - y3;
        if (dx3 === 0.0 && dy3 === 0.0) {
            // Affine
            return new PerspectiveTransform(x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0.0, 0.0, 1.0);
        }
        else {
            var dx1 = x1 - x2;
            var dx2 = x3 - x2;
            var dy1 = y1 - y2;
            var dy2 = y3 - y2;
            var denominator = dx1 * dy2 - dx2 * dy1;
            var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
            var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
            return new PerspectiveTransform(x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1.0);
        }
    };
    PerspectiveTransform.quadrilateralToSquare = function (x0 /*float*/, y0 /*float*/, x1 /*float*/, y1 /*float*/, x2 /*float*/, y2 /*float*/, x3 /*float*/, y3 /*float*/) {
        // Here, the adjoint serves as the inverse:
        return PerspectiveTransform.squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3).buildAdjoint();
    };
    PerspectiveTransform.prototype.buildAdjoint = function () {
        // Adjoint is the transpose of the cofactor matrix:
        return new PerspectiveTransform(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21);
    };
    PerspectiveTransform.prototype.times = function (other) {
        return new PerspectiveTransform(this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * other.a22 + this.a31 * other.a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * other.a33, this.a12 * other.a11 + this.a22 * other.a12 + this.a32 * other.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * other.a31 + this.a22 * other.a32 + this.a32 * other.a33, this.a13 * other.a11 + this.a23 * other.a12 + this.a33 * other.a13, this.a13 * other.a21 + this.a23 * other.a22 + this.a33 * other.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33);
    };
    return PerspectiveTransform;
}());
exports.default = PerspectiveTransform;
//# sourceMappingURL=PerspectiveTransform.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/StringUtils.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/StringUtils.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2010 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterSetECI_1 = __webpack_require__(/*! ./CharacterSetECI */ "./node_modules/@zxing/library/esm5/core/common/CharacterSetECI.js");
/**
 * Common string-related functions.
 *
 * @author Sean Owen
 * @author Alex Dupre
 */
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    // SHIFT_JIS.equalsIgnoreCase(PLATFORM_DEFAULT_ENCODING) ||
    // EUC_JP.equalsIgnoreCase(PLATFORM_DEFAULT_ENCODING);
    StringUtils.prototype.StringUtils = function () { };
    /**
     * @param bytes bytes encoding a string, whose encoding should be guessed
     * @param hints decode hints if applicable
     * @return name of guessed encoding; at the moment will only guess one of:
     *  {@link #SHIFT_JIS}, {@link #UTF8}, {@link #ISO88591}, or the platform
     *  default encoding if none of these can possibly be correct
     */
    StringUtils.guessEncoding = function (bytes, hints) {
        if (hints !== null && hints !== undefined && undefined !== hints.get(4 /* CHARACTER_SET */)) {
            return hints.get(4 /* CHARACTER_SET */).toString();
        }
        // For now, merely tries to distinguish ISO-8859-1, UTF-8 and Shift_JIS,
        // which should be by far the most common encodings.
        var length = bytes.length;
        var canBeISO88591 = true;
        var canBeShiftJIS = true;
        var canBeUTF8 = true;
        var utf8BytesLeft = 0;
        // int utf8LowChars = 0
        var utf2BytesChars = 0;
        var utf3BytesChars = 0;
        var utf4BytesChars = 0;
        var sjisBytesLeft = 0;
        // int sjisLowChars = 0
        var sjisKatakanaChars = 0;
        // int sjisDoubleBytesChars = 0
        var sjisCurKatakanaWordLength = 0;
        var sjisCurDoubleBytesWordLength = 0;
        var sjisMaxKatakanaWordLength = 0;
        var sjisMaxDoubleBytesWordLength = 0;
        // int isoLowChars = 0
        // int isoHighChars = 0
        var isoHighOther = 0;
        var utf8bom = bytes.length > 3 &&
            bytes[0] === /*(byte) */ 0xEF &&
            bytes[1] === /*(byte) */ 0xBB &&
            bytes[2] === /*(byte) */ 0xBF;
        for (var i = 0; i < length && (canBeISO88591 || canBeShiftJIS || canBeUTF8); i++) {
            var value = bytes[i] & 0xFF;
            // UTF-8 stuff
            if (canBeUTF8) {
                if (utf8BytesLeft > 0) {
                    if ((value & 0x80) === 0) {
                        canBeUTF8 = false;
                    }
                    else {
                        utf8BytesLeft--;
                    }
                }
                else if ((value & 0x80) !== 0) {
                    if ((value & 0x40) === 0) {
                        canBeUTF8 = false;
                    }
                    else {
                        utf8BytesLeft++;
                        if ((value & 0x20) === 0) {
                            utf2BytesChars++;
                        }
                        else {
                            utf8BytesLeft++;
                            if ((value & 0x10) === 0) {
                                utf3BytesChars++;
                            }
                            else {
                                utf8BytesLeft++;
                                if ((value & 0x08) === 0) {
                                    utf4BytesChars++;
                                }
                                else {
                                    canBeUTF8 = false;
                                }
                            }
                        }
                    }
                } // else {
                // utf8LowChars++
                // }
            }
            // ISO-8859-1 stuff
            if (canBeISO88591) {
                if (value > 0x7F && value < 0xA0) {
                    canBeISO88591 = false;
                }
                else if (value > 0x9F) {
                    if (value < 0xC0 || value === 0xD7 || value === 0xF7) {
                        isoHighOther++;
                    } // else {
                    // isoHighChars++
                    // }
                } // else {
                // isoLowChars++
                // }
            }
            // Shift_JIS stuff
            if (canBeShiftJIS) {
                if (sjisBytesLeft > 0) {
                    if (value < 0x40 || value === 0x7F || value > 0xFC) {
                        canBeShiftJIS = false;
                    }
                    else {
                        sjisBytesLeft--;
                    }
                }
                else if (value === 0x80 || value === 0xA0 || value > 0xEF) {
                    canBeShiftJIS = false;
                }
                else if (value > 0xA0 && value < 0xE0) {
                    sjisKatakanaChars++;
                    sjisCurDoubleBytesWordLength = 0;
                    sjisCurKatakanaWordLength++;
                    if (sjisCurKatakanaWordLength > sjisMaxKatakanaWordLength) {
                        sjisMaxKatakanaWordLength = sjisCurKatakanaWordLength;
                    }
                }
                else if (value > 0x7F) {
                    sjisBytesLeft++;
                    // sjisDoubleBytesChars++
                    sjisCurKatakanaWordLength = 0;
                    sjisCurDoubleBytesWordLength++;
                    if (sjisCurDoubleBytesWordLength > sjisMaxDoubleBytesWordLength) {
                        sjisMaxDoubleBytesWordLength = sjisCurDoubleBytesWordLength;
                    }
                }
                else {
                    // sjisLowChars++
                    sjisCurKatakanaWordLength = 0;
                    sjisCurDoubleBytesWordLength = 0;
                }
            }
        }
        if (canBeUTF8 && utf8BytesLeft > 0) {
            canBeUTF8 = false;
        }
        if (canBeShiftJIS && sjisBytesLeft > 0) {
            canBeShiftJIS = false;
        }
        // Easy -- if there is BOM or at least 1 valid not-single byte character (and no evidence it can't be UTF-8), done
        if (canBeUTF8 && (utf8bom || utf2BytesChars + utf3BytesChars + utf4BytesChars > 0)) {
            return StringUtils.UTF8;
        }
        // Easy -- if assuming Shift_JIS or at least 3 valid consecutive not-ascii characters (and no evidence it can't be), done
        if (canBeShiftJIS && (StringUtils.ASSUME_SHIFT_JIS || sjisMaxKatakanaWordLength >= 3 || sjisMaxDoubleBytesWordLength >= 3)) {
            return StringUtils.SHIFT_JIS;
        }
        // Distinguishing Shift_JIS and ISO-8859-1 can be a little tough for short words. The crude heuristic is:
        // - If we saw
        //   - only two consecutive katakana chars in the whole text, or
        //   - at least 10% of bytes that could be "upper" not-alphanumeric Latin1,
        // - then we conclude Shift_JIS, else ISO-8859-1
        if (canBeISO88591 && canBeShiftJIS) {
            return (sjisMaxKatakanaWordLength === 2 && sjisKatakanaChars === 2) || isoHighOther * 10 >= length
                ? StringUtils.SHIFT_JIS : StringUtils.ISO88591;
        }
        // Otherwise, try in order ISO-8859-1, Shift JIS, UTF-8 and fall back to default platform encoding
        if (canBeISO88591) {
            return StringUtils.ISO88591;
        }
        if (canBeShiftJIS) {
            return StringUtils.SHIFT_JIS;
        }
        if (canBeUTF8) {
            return StringUtils.UTF8;
        }
        // Otherwise, we take a wild guess with platform encoding
        return StringUtils.PLATFORM_DEFAULT_ENCODING;
    };
    StringUtils.SHIFT_JIS = CharacterSetECI_1.default.SJIS.getName(); // "SJIS"
    StringUtils.GB2312 = 'GB2312';
    StringUtils.ISO88591 = CharacterSetECI_1.default.ISO8859_1.getName(); // "ISO8859_1"
    StringUtils.EUC_JP = 'EUC_JP';
    StringUtils.UTF8 = CharacterSetECI_1.default.UTF8.getName(); // "UTF8"
    StringUtils.PLATFORM_DEFAULT_ENCODING = StringUtils.UTF8; // "UTF8"//Charset.defaultCharset().name()
    StringUtils.ASSUME_SHIFT_JIS = false;
    return StringUtils;
}());
exports.default = StringUtils;
//# sourceMappingURL=StringUtils.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/detector/MathUtils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/detector/MathUtils.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2012 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common.detector {*/
/**
 * General math-related and numeric utility functions.
 */
var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    MathUtils.prototype.MathUtils = function () {
    };
    /**
     * Ends up being a bit faster than {@link Math#round(float)}. This merely rounds its
     * argument to the nearest int, where x.5 rounds up to x+1. Semantics of this shortcut
     * differ slightly from {@link Math#round(float)} in that half rounds down for negative
     * values. -2.5 rounds to -3, not -2. For purposes here it makes no difference.
     *
     * @param d real value to round
     * @return nearest {@code int}
     */
    MathUtils.round = function (d /*float*/) {
        if (NaN === d)
            return 0;
        if (d <= Number.MIN_SAFE_INTEGER)
            return Number.MIN_SAFE_INTEGER;
        if (d >= Number.MAX_SAFE_INTEGER)
            return Number.MAX_SAFE_INTEGER;
        return /*(int) */ (d + (d < 0.0 ? -0.5 : 0.5)) | 0;
    };
    // TYPESCRIPTPORT: maybe remove round method and call directly Math.round, it looks like it doesn't make sense for js
    /**
     * @param aX point A x coordinate
     * @param aY point A y coordinate
     * @param bX point B x coordinate
     * @param bY point B y coordinate
     * @return Euclidean distance between points A and B
     */
    MathUtils.distance = function (aX /*float|int*/, aY /*float|int*/, bX /*float|int*/, bY /*float|int*/) {
        var xDiff = aX - bX;
        var yDiff = aY - bY;
        return /*(float) */ Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    };
    /**
     * @param aX point A x coordinate
     * @param aY point A y coordinate
     * @param bX point B x coordinate
     * @param bY point B y coordinate
     * @return Euclidean distance between points A and B
     */
    // public static distance(aX: number /*int*/, aY: number /*int*/, bX: number /*int*/, bY: number /*int*/): float {
    //   const xDiff = aX - bX
    //   const yDiff = aY - bY
    //   return (float) Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    // }
    /**
     * @param array values to sum
     * @return sum of values in array
     */
    MathUtils.sum = function (array) {
        var count = 0;
        for (var i = 0, length_1 = array.length; i !== length_1; i++) {
            var a = array[i];
            count += a;
        }
        return count;
    };
    return MathUtils;
}());
exports.default = MathUtils;
//# sourceMappingURL=MathUtils.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/detector/WhiteRectangleDetector.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/detector/WhiteRectangleDetector.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2010 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common.detector {*/
var ResultPoint_1 = __webpack_require__(/*! ../../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var MathUtils_1 = __webpack_require__(/*! ./MathUtils */ "./node_modules/@zxing/library/esm5/core/common/detector/MathUtils.js");
var NotFoundException_1 = __webpack_require__(/*! ../../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * <p>
 * Detects a candidate barcode-like rectangular region within an image. It
 * starts around the center of the image, increases the size of the candidate
 * region until it finds a white rectangular region. By keeping track of the
 * last black points it encountered, it determines the corners of the barcode.
 * </p>
 *
 * @author David Olivier
 */
var WhiteRectangleDetector = /** @class */ (function () {
    // public constructor(private image: BitMatrix) /*throws NotFoundException*/ {
    //   this(image, INIT_SIZE, image.getWidth() / 2, image.getHeight() / 2)
    // }
    /**
     * @param image barcode image to find a rectangle in
     * @param initSize initial size of search area around center
     * @param x x position of search center
     * @param y y position of search center
     * @throws NotFoundException if image is too small to accommodate {@code initSize}
     */
    function WhiteRectangleDetector(image, initSize /*int*/, x /*int*/, y /*int*/) {
        this.image = image;
        this.height = image.getHeight();
        this.width = image.getWidth();
        if (undefined === initSize || null === initSize) {
            initSize = WhiteRectangleDetector.INIT_SIZE;
        }
        if (undefined === x || null === x) {
            x = image.getWidth() / 2 | 0;
        }
        if (undefined === y || null === y) {
            y = image.getHeight() / 2 | 0;
        }
        var halfsize = initSize / 2 | 0;
        this.leftInit = x - halfsize;
        this.rightInit = x + halfsize;
        this.upInit = y - halfsize;
        this.downInit = y + halfsize;
        if (this.upInit < 0 || this.leftInit < 0 || this.downInit >= this.height || this.rightInit >= this.width) {
            throw new NotFoundException_1.default();
        }
    }
    /**
     * <p>
     * Detects a candidate barcode-like rectangular region within an image. It
     * starts around the center of the image, increases the size of the candidate
     * region until it finds a white rectangular region.
     * </p>
     *
     * @return {@link ResultPoint}[] describing the corners of the rectangular
     *         region. The first and last points are opposed on the diagonal, as
     *         are the second and third. The first point will be the topmost
     *         point and the last, the bottommost. The second point will be
     *         leftmost and the third, the rightmost
     * @throws NotFoundException if no Data Matrix Code can be found
     */
    WhiteRectangleDetector.prototype.detect = function () {
        var left = this.leftInit;
        var right = this.rightInit;
        var up = this.upInit;
        var down = this.downInit;
        var sizeExceeded = false;
        var aBlackPointFoundOnBorder = true;
        var atLeastOneBlackPointFoundOnBorder = false;
        var atLeastOneBlackPointFoundOnRight = false;
        var atLeastOneBlackPointFoundOnBottom = false;
        var atLeastOneBlackPointFoundOnLeft = false;
        var atLeastOneBlackPointFoundOnTop = false;
        var width = this.width;
        var height = this.height;
        while (aBlackPointFoundOnBorder) {
            aBlackPointFoundOnBorder = false;
            // .....
            // .   |
            // .....
            var rightBorderNotWhite = true;
            while ((rightBorderNotWhite || !atLeastOneBlackPointFoundOnRight) && right < width) {
                rightBorderNotWhite = this.containsBlackPoint(up, down, right, false);
                if (rightBorderNotWhite) {
                    right++;
                    aBlackPointFoundOnBorder = true;
                    atLeastOneBlackPointFoundOnRight = true;
                }
                else if (!atLeastOneBlackPointFoundOnRight) {
                    right++;
                }
            }
            if (right >= width) {
                sizeExceeded = true;
                break;
            }
            // .....
            // .   .
            // .___.
            var bottomBorderNotWhite = true;
            while ((bottomBorderNotWhite || !atLeastOneBlackPointFoundOnBottom) && down < height) {
                bottomBorderNotWhite = this.containsBlackPoint(left, right, down, true);
                if (bottomBorderNotWhite) {
                    down++;
                    aBlackPointFoundOnBorder = true;
                    atLeastOneBlackPointFoundOnBottom = true;
                }
                else if (!atLeastOneBlackPointFoundOnBottom) {
                    down++;
                }
            }
            if (down >= height) {
                sizeExceeded = true;
                break;
            }
            // .....
            // |   .
            // .....
            var leftBorderNotWhite = true;
            while ((leftBorderNotWhite || !atLeastOneBlackPointFoundOnLeft) && left >= 0) {
                leftBorderNotWhite = this.containsBlackPoint(up, down, left, false);
                if (leftBorderNotWhite) {
                    left--;
                    aBlackPointFoundOnBorder = true;
                    atLeastOneBlackPointFoundOnLeft = true;
                }
                else if (!atLeastOneBlackPointFoundOnLeft) {
                    left--;
                }
            }
            if (left < 0) {
                sizeExceeded = true;
                break;
            }
            // .___.
            // .   .
            // .....
            var topBorderNotWhite = true;
            while ((topBorderNotWhite || !atLeastOneBlackPointFoundOnTop) && up >= 0) {
                topBorderNotWhite = this.containsBlackPoint(left, right, up, true);
                if (topBorderNotWhite) {
                    up--;
                    aBlackPointFoundOnBorder = true;
                    atLeastOneBlackPointFoundOnTop = true;
                }
                else if (!atLeastOneBlackPointFoundOnTop) {
                    up--;
                }
            }
            if (up < 0) {
                sizeExceeded = true;
                break;
            }
            if (aBlackPointFoundOnBorder) {
                atLeastOneBlackPointFoundOnBorder = true;
            }
        }
        if (!sizeExceeded && atLeastOneBlackPointFoundOnBorder) {
            var maxSize = right - left;
            var z = null;
            for (var i = 1; z === null && i < maxSize; i++) {
                z = this.getBlackPointOnSegment(left, down - i, left + i, down);
            }
            if (z == null) {
                throw new NotFoundException_1.default();
            }
            var t = null;
            // go down right
            for (var i = 1; t === null && i < maxSize; i++) {
                t = this.getBlackPointOnSegment(left, up + i, left + i, up);
            }
            if (t == null) {
                throw new NotFoundException_1.default();
            }
            var x = null;
            // go down left
            for (var i = 1; x === null && i < maxSize; i++) {
                x = this.getBlackPointOnSegment(right, up + i, right - i, up);
            }
            if (x == null) {
                throw new NotFoundException_1.default();
            }
            var y = null;
            // go up left
            for (var i = 1; y === null && i < maxSize; i++) {
                y = this.getBlackPointOnSegment(right, down - i, right - i, down);
            }
            if (y == null) {
                throw new NotFoundException_1.default();
            }
            return this.centerEdges(y, z, x, t);
        }
        else {
            throw new NotFoundException_1.default();
        }
    };
    WhiteRectangleDetector.prototype.getBlackPointOnSegment = function (aX /*float*/, aY /*float*/, bX /*float*/, bY /*float*/) {
        var dist = MathUtils_1.default.round(MathUtils_1.default.distance(aX, aY, bX, bY));
        var xStep = (bX - aX) / dist;
        var yStep = (bY - aY) / dist;
        var image = this.image;
        for (var i = 0; i < dist; i++) {
            var x = MathUtils_1.default.round(aX + i * xStep);
            var y = MathUtils_1.default.round(aY + i * yStep);
            if (image.get(x, y)) {
                return new ResultPoint_1.default(x, y);
            }
        }
        return null;
    };
    /**
     * recenters the points of a constant distance towards the center
     *
     * @param y bottom most point
     * @param z left most point
     * @param x right most point
     * @param t top most point
     * @return {@link ResultPoint}[] describing the corners of the rectangular
     *         region. The first and last points are opposed on the diagonal, as
     *         are the second and third. The first point will be the topmost
     *         point and the last, the bottommost. The second point will be
     *         leftmost and the third, the rightmost
     */
    WhiteRectangleDetector.prototype.centerEdges = function (y, z, x, t) {
        //
        //       t            t
        //  z                      x
        //        x    OR    z
        //   y                    y
        //
        var yi = y.getX();
        var yj = y.getY();
        var zi = z.getX();
        var zj = z.getY();
        var xi = x.getX();
        var xj = x.getY();
        var ti = t.getX();
        var tj = t.getY();
        var CORR = WhiteRectangleDetector.CORR;
        if (yi < this.width / 2.0) {
            return [
                new ResultPoint_1.default(ti - CORR, tj + CORR),
                new ResultPoint_1.default(zi + CORR, zj + CORR),
                new ResultPoint_1.default(xi - CORR, xj - CORR),
                new ResultPoint_1.default(yi + CORR, yj - CORR)
            ];
        }
        else {
            return [
                new ResultPoint_1.default(ti + CORR, tj + CORR),
                new ResultPoint_1.default(zi + CORR, zj - CORR),
                new ResultPoint_1.default(xi - CORR, xj + CORR),
                new ResultPoint_1.default(yi - CORR, yj - CORR)
            ];
        }
    };
    /**
     * Determines whether a segment contains a black point
     *
     * @param a          min value of the scanned coordinate
     * @param b          max value of the scanned coordinate
     * @param fixed      value of fixed coordinate
     * @param horizontal set to true if scan must be horizontal, false if vertical
     * @return true if a black point has been found, else false.
     */
    WhiteRectangleDetector.prototype.containsBlackPoint = function (a /*int*/, b /*int*/, fixed /*int*/, horizontal) {
        var image = this.image;
        if (horizontal) {
            for (var x = a; x <= b; x++) {
                if (image.get(x, fixed)) {
                    return true;
                }
            }
        }
        else {
            for (var y = a; y <= b; y++) {
                if (image.get(fixed, y)) {
                    return true;
                }
            }
        }
        return false;
    };
    WhiteRectangleDetector.INIT_SIZE = 10;
    WhiteRectangleDetector.CORR = 1;
    return WhiteRectangleDetector;
}());
exports.default = WhiteRectangleDetector;
//# sourceMappingURL=WhiteRectangleDetector.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGF.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGF.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common.reedsolomon {*/
var GenericGFPoly_1 = __webpack_require__(/*! ./GenericGFPoly */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGFPoly.js");
var Integer_1 = __webpack_require__(/*! ../../util/Integer */ "./node_modules/@zxing/library/esm5/core/util/Integer.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
var ArithmeticException_1 = __webpack_require__(/*! ../../ArithmeticException */ "./node_modules/@zxing/library/esm5/core/ArithmeticException.js");
/**
 * <p>This class contains utility methods for performing mathematical operations over
 * the Galois Fields. Operations use a given primitive polynomial in calculations.</p>
 *
 * <p>Throughout this package, elements of the GF are represented as an {@code int}
 * for convenience and speed (but at the cost of memory).
 * </p>
 *
 * @author Sean Owen
 * @author David Olivier
 */
var GenericGF = /** @class */ (function () {
    /**
     * Create a representation of GF(size) using the given primitive polynomial.
     *
     * @param primitive irreducible polynomial whose coefficients are represented by
     *  the bits of an int, where the least-significant bit represents the constant
     *  coefficient
     * @param size the size of the field
     * @param b the factor b in the generator polynomial can be 0- or 1-based
     *  (g(x) = (x+a^b)(x+a^(b+1))...(x+a^(b+2t-1))).
     *  In most cases it should be 1, but for QR code it is 0.
     */
    function GenericGF(primitive /*int*/, size /*int*/, generatorBase /*int*/) {
        this.primitive = primitive;
        this.size = size;
        this.generatorBase = generatorBase;
        var expTable = new Int32Array(size);
        var x = 1;
        for (var i = 0; i < size; i++) {
            expTable[i] = x;
            x *= 2; // we're assuming the generator alpha is 2
            if (x >= size) {
                x ^= primitive;
                x &= size - 1;
            }
        }
        this.expTable = expTable;
        var logTable = new Int32Array(size);
        for (var i = 0; i < size - 1; i++) {
            logTable[expTable[i]] = i;
        }
        this.logTable = logTable;
        // logTable[0] == 0 but this should never be used
        this.zero = new GenericGFPoly_1.default(this, Int32Array.from([0]));
        this.one = new GenericGFPoly_1.default(this, Int32Array.from([1]));
    }
    GenericGF.prototype.getZero = function () {
        return this.zero;
    };
    GenericGF.prototype.getOne = function () {
        return this.one;
    };
    /**
     * @return the monomial representing coefficient * x^degree
     */
    GenericGF.prototype.buildMonomial = function (degree /*int*/, coefficient /*int*/) {
        if (degree < 0) {
            throw new IllegalArgumentException_1.default();
        }
        if (coefficient === 0) {
            return this.zero;
        }
        var coefficients = new Int32Array(degree + 1);
        coefficients[0] = coefficient;
        return new GenericGFPoly_1.default(this, coefficients);
    };
    /**
     * Implements both addition and subtraction -- they are the same in GF(size).
     *
     * @return sum/difference of a and b
     */
    GenericGF.addOrSubtract = function (a /*int*/, b /*int*/) {
        return a ^ b;
    };
    /**
     * @return 2 to the power of a in GF(size)
     */
    GenericGF.prototype.exp = function (a /*int*/) {
        return this.expTable[a];
    };
    /**
     * @return base 2 log of a in GF(size)
     */
    GenericGF.prototype.log = function (a /*int*/) {
        if (a === 0) {
            throw new IllegalArgumentException_1.default();
        }
        return this.logTable[a];
    };
    /**
     * @return multiplicative inverse of a
     */
    GenericGF.prototype.inverse = function (a /*int*/) {
        if (a === 0) {
            throw new ArithmeticException_1.default();
        }
        return this.expTable[this.size - this.logTable[a] - 1];
    };
    /**
     * @return product of a and b in GF(size)
     */
    GenericGF.prototype.multiply = function (a /*int*/, b /*int*/) {
        if (a === 0 || b === 0) {
            return 0;
        }
        return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
    };
    GenericGF.prototype.getSize = function () {
        return this.size;
    };
    GenericGF.prototype.getGeneratorBase = function () {
        return this.generatorBase;
    };
    /*@Override*/
    GenericGF.prototype.toString = function () {
        return 'GF(0x' + Integer_1.default.toHexString(this.primitive) + ',' + this.size + ')';
    };
    GenericGF.prototype.equals = function (o) {
        return o === this;
    };
    GenericGF.AZTEC_DATA_12 = new GenericGF(0x1069, 4096, 1); // x^12 + x^6 + x^5 + x^3 + 1
    GenericGF.AZTEC_DATA_10 = new GenericGF(0x409, 1024, 1); // x^10 + x^3 + 1
    GenericGF.AZTEC_DATA_6 = new GenericGF(0x43, 64, 1); // x^6 + x + 1
    GenericGF.AZTEC_PARAM = new GenericGF(0x13, 16, 1); // x^4 + x + 1
    GenericGF.QR_CODE_FIELD_256 = new GenericGF(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
    GenericGF.DATA_MATRIX_FIELD_256 = new GenericGF(0x012D, 256, 1); // x^8 + x^5 + x^3 + x^2 + 1
    GenericGF.AZTEC_DATA_8 = GenericGF.DATA_MATRIX_FIELD_256;
    GenericGF.MAXICODE_FIELD_64 = GenericGF.AZTEC_DATA_6;
    return GenericGF;
}());
exports.default = GenericGF;
//# sourceMappingURL=GenericGF.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGFPoly.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGFPoly.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common.reedsolomon {*/
var GenericGF_1 = __webpack_require__(/*! ./GenericGF */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGF.js");
var System_1 = __webpack_require__(/*! ../../util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * <p>Represents a polynomial whose coefficients are elements of a GF.
 * Instances of this class are immutable.</p>
 *
 * <p>Much credit is due to William Rucklidge since portions of this code are an indirect
 * port of his C++ Reed-Solomon implementation.</p>
 *
 * @author Sean Owen
 */
var GenericGFPoly = /** @class */ (function () {
    /**
     * @param field the {@link GenericGF} instance representing the field to use
     * to perform computations
     * @param coefficients coefficients as ints representing elements of GF(size), arranged
     * from most significant (highest-power term) coefficient to least significant
     * @throws IllegalArgumentException if argument is null or empty,
     * or if leading coefficient is 0 and this is not a
     * constant polynomial (that is, it is not the monomial "0")
     */
    function GenericGFPoly(field, coefficients) {
        if (coefficients.length === 0) {
            throw new IllegalArgumentException_1.default();
        }
        this.field = field;
        var coefficientsLength = coefficients.length;
        if (coefficientsLength > 1 && coefficients[0] === 0) {
            // Leading term must be non-zero for anything except the constant polynomial "0"
            var firstNonZero = 1;
            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
                firstNonZero++;
            }
            if (firstNonZero === coefficientsLength) {
                this.coefficients = Int32Array.from([0]);
            }
            else {
                this.coefficients = new Int32Array(coefficientsLength - firstNonZero);
                System_1.default.arraycopy(coefficients, firstNonZero, this.coefficients, 0, this.coefficients.length);
            }
        }
        else {
            this.coefficients = coefficients;
        }
    }
    GenericGFPoly.prototype.getCoefficients = function () {
        return this.coefficients;
    };
    /**
     * @return degree of this polynomial
     */
    GenericGFPoly.prototype.getDegree = function () {
        return this.coefficients.length - 1;
    };
    /**
     * @return true iff this polynomial is the monomial "0"
     */
    GenericGFPoly.prototype.isZero = function () {
        return this.coefficients[0] === 0;
    };
    /**
     * @return coefficient of x^degree term in this polynomial
     */
    GenericGFPoly.prototype.getCoefficient = function (degree /*int*/) {
        return this.coefficients[this.coefficients.length - 1 - degree];
    };
    /**
     * @return evaluation of this polynomial at a given point
     */
    GenericGFPoly.prototype.evaluateAt = function (a /*int*/) {
        if (a === 0) {
            // Just return the x^0 coefficient
            return this.getCoefficient(0);
        }
        var coefficients = this.coefficients;
        var result;
        if (a === 1) {
            // Just the sum of the coefficients
            result = 0;
            for (var i = 0, length_1 = coefficients.length; i !== length_1; i++) {
                var coefficient = coefficients[i];
                result = GenericGF_1.default.addOrSubtract(result, coefficient);
            }
            return result;
        }
        result = coefficients[0];
        var size = coefficients.length;
        var field = this.field;
        for (var i = 1; i < size; i++) {
            result = GenericGF_1.default.addOrSubtract(field.multiply(a, result), coefficients[i]);
        }
        return result;
    };
    GenericGFPoly.prototype.addOrSubtract = function (other) {
        if (!this.field.equals(other.field)) {
            throw new IllegalArgumentException_1.default('GenericGFPolys do not have same GenericGF field');
        }
        if (this.isZero()) {
            return other;
        }
        if (other.isZero()) {
            return this;
        }
        var smallerCoefficients = this.coefficients;
        var largerCoefficients = other.coefficients;
        if (smallerCoefficients.length > largerCoefficients.length) {
            var temp = smallerCoefficients;
            smallerCoefficients = largerCoefficients;
            largerCoefficients = temp;
        }
        var sumDiff = new Int32Array(largerCoefficients.length);
        var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
        // Copy high-order terms only found in higher-degree polynomial's coefficients
        System_1.default.arraycopy(largerCoefficients, 0, sumDiff, 0, lengthDiff);
        for (var i = lengthDiff; i < largerCoefficients.length; i++) {
            sumDiff[i] = GenericGF_1.default.addOrSubtract(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
        }
        return new GenericGFPoly(this.field, sumDiff);
    };
    GenericGFPoly.prototype.multiply = function (other) {
        if (!this.field.equals(other.field)) {
            throw new IllegalArgumentException_1.default('GenericGFPolys do not have same GenericGF field');
        }
        if (this.isZero() || other.isZero()) {
            return this.field.getZero();
        }
        var aCoefficients = this.coefficients;
        var aLength = aCoefficients.length;
        var bCoefficients = other.coefficients;
        var bLength = bCoefficients.length;
        var product = new Int32Array(aLength + bLength - 1);
        var field = this.field;
        for (var i = 0; i < aLength; i++) {
            var aCoeff = aCoefficients[i];
            for (var j = 0; j < bLength; j++) {
                product[i + j] = GenericGF_1.default.addOrSubtract(product[i + j], field.multiply(aCoeff, bCoefficients[j]));
            }
        }
        return new GenericGFPoly(field, product);
    };
    GenericGFPoly.prototype.multiplyScalar = function (scalar /*int*/) {
        if (scalar === 0) {
            return this.field.getZero();
        }
        if (scalar === 1) {
            return this;
        }
        var size = this.coefficients.length;
        var field = this.field;
        var product = new Int32Array(size);
        var coefficients = this.coefficients;
        for (var i = 0; i < size; i++) {
            product[i] = field.multiply(coefficients[i], scalar);
        }
        return new GenericGFPoly(field, product);
    };
    GenericGFPoly.prototype.multiplyByMonomial = function (degree /*int*/, coefficient /*int*/) {
        if (degree < 0) {
            throw new IllegalArgumentException_1.default();
        }
        if (coefficient === 0) {
            return this.field.getZero();
        }
        var coefficients = this.coefficients;
        var size = coefficients.length;
        var product = new Int32Array(size + degree);
        var field = this.field;
        for (var i = 0; i < size; i++) {
            product[i] = field.multiply(coefficients[i], coefficient);
        }
        return new GenericGFPoly(field, product);
    };
    GenericGFPoly.prototype.divide = function (other) {
        if (!this.field.equals(other.field)) {
            throw new IllegalArgumentException_1.default('GenericGFPolys do not have same GenericGF field');
        }
        if (other.isZero()) {
            throw new IllegalArgumentException_1.default('Divide by 0');
        }
        var field = this.field;
        var quotient = field.getZero();
        var remainder = this;
        var denominatorLeadingTerm = other.getCoefficient(other.getDegree());
        var inverseDenominatorLeadingTerm = field.inverse(denominatorLeadingTerm);
        while (remainder.getDegree() >= other.getDegree() && !remainder.isZero()) {
            var degreeDifference = remainder.getDegree() - other.getDegree();
            var scale = field.multiply(remainder.getCoefficient(remainder.getDegree()), inverseDenominatorLeadingTerm);
            var term = other.multiplyByMonomial(degreeDifference, scale);
            var iterationQuotient = field.buildMonomial(degreeDifference, scale);
            quotient = quotient.addOrSubtract(iterationQuotient);
            remainder = remainder.addOrSubtract(term);
        }
        return [quotient, remainder];
    };
    /*@Override*/
    GenericGFPoly.prototype.toString = function () {
        var result = '';
        for (var degree = this.getDegree(); degree >= 0; degree--) {
            var coefficient = this.getCoefficient(degree);
            if (coefficient !== 0) {
                if (coefficient < 0) {
                    result += ' - ';
                    coefficient = -coefficient;
                }
                else {
                    if (result.length > 0) {
                        result += ' + ';
                    }
                }
                if (degree === 0 || coefficient !== 1) {
                    var alphaPower = this.field.log(coefficient);
                    if (alphaPower === 0) {
                        result += '1';
                    }
                    else if (alphaPower === 1) {
                        result += 'a';
                    }
                    else {
                        result += 'a^';
                        result += alphaPower;
                    }
                }
                if (degree !== 0) {
                    if (degree === 1) {
                        result += 'x';
                    }
                    else {
                        result += 'x^';
                        result += degree;
                    }
                }
            }
        }
        return result;
    };
    return GenericGFPoly;
}());
exports.default = GenericGFPoly;
//# sourceMappingURL=GenericGFPoly.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonDecoder.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonDecoder.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.common.reedsolomon {*/
var GenericGF_1 = __webpack_require__(/*! ./GenericGF */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGF.js");
var GenericGFPoly_1 = __webpack_require__(/*! ./GenericGFPoly */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGFPoly.js");
var ReedSolomonException_1 = __webpack_require__(/*! ../../ReedSolomonException */ "./node_modules/@zxing/library/esm5/core/ReedSolomonException.js");
var IllegalStateException_1 = __webpack_require__(/*! ../../IllegalStateException */ "./node_modules/@zxing/library/esm5/core/IllegalStateException.js");
/**
 * <p>Implements Reed-Solomon decoding, as the name implies.</p>
 *
 * <p>The algorithm will not be explained here, but the following references were helpful
 * in creating this implementation:</p>
 *
 * <ul>
 * <li>Bruce Maggs.
 * <a href="http://www.cs.cmu.edu/afs/cs.cmu.edu/project/pscico-guyb/realworld/www/rs_decode.ps">
 * "Decoding Reed-Solomon Codes"</a> (see discussion of Forney's Formula)</li>
 * <li>J.I. Hall. <a href="www.mth.msu.edu/~jhall/classes/codenotes/GRS.pdf">
 * "Chapter 5. Generalized Reed-Solomon Codes"</a>
 * (see discussion of Euclidean algorithm)</li>
 * </ul>
 *
 * <p>Much credit is due to William Rucklidge since portions of this code are an indirect
 * port of his C++ Reed-Solomon implementation.</p>
 *
 * @author Sean Owen
 * @author William Rucklidge
 * @author sanfordsquires
 */
var ReedSolomonDecoder = /** @class */ (function () {
    function ReedSolomonDecoder(field) {
        this.field = field;
    }
    /**
     * <p>Decodes given set of received codewords, which include both data and error-correction
     * codewords. Really, this means it uses Reed-Solomon to detect and correct errors, in-place,
     * in the input.</p>
     *
     * @param received data and error-correction codewords
     * @param twoS number of error-correction codewords available
     * @throws ReedSolomonException if decoding fails for any reason
     */
    ReedSolomonDecoder.prototype.decode = function (received, twoS /*int*/) {
        var field = this.field;
        var poly = new GenericGFPoly_1.default(field, received);
        var syndromeCoefficients = new Int32Array(twoS);
        var noError = true;
        for (var i = 0; i < twoS; i++) {
            var evalResult = poly.evaluateAt(field.exp(i + field.getGeneratorBase()));
            syndromeCoefficients[syndromeCoefficients.length - 1 - i] = evalResult;
            if (evalResult !== 0) {
                noError = false;
            }
        }
        if (noError) {
            return;
        }
        var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
        var sigmaOmega = this.runEuclideanAlgorithm(field.buildMonomial(twoS, 1), syndrome, twoS);
        var sigma = sigmaOmega[0];
        var omega = sigmaOmega[1];
        var errorLocations = this.findErrorLocations(sigma);
        var errorMagnitudes = this.findErrorMagnitudes(omega, errorLocations);
        for (var i = 0; i < errorLocations.length; i++) {
            var position = received.length - 1 - field.log(errorLocations[i]);
            if (position < 0) {
                throw new ReedSolomonException_1.default('Bad error location');
            }
            received[position] = GenericGF_1.default.addOrSubtract(received[position], errorMagnitudes[i]);
        }
    };
    ReedSolomonDecoder.prototype.runEuclideanAlgorithm = function (a, b, R /*int*/) {
        // Assume a's degree is >= b's
        if (a.getDegree() < b.getDegree()) {
            var temp = a;
            a = b;
            b = temp;
        }
        var field = this.field;
        var rLast = a;
        var r = b;
        var tLast = field.getZero();
        var t = field.getOne();
        // Run Euclidean algorithm until r's degree is less than R/2
        while (r.getDegree() >= (R / 2 | 0)) {
            var rLastLast = rLast;
            var tLastLast = tLast;
            rLast = r;
            tLast = t;
            // Divide rLastLast by rLast, with quotient in q and remainder in r
            if (rLast.isZero()) {
                // Oops, Euclidean algorithm already terminated?
                throw new ReedSolomonException_1.default('r_{i-1} was zero');
            }
            r = rLastLast;
            var q = field.getZero();
            var denominatorLeadingTerm = rLast.getCoefficient(rLast.getDegree());
            var dltInverse = field.inverse(denominatorLeadingTerm);
            while (r.getDegree() >= rLast.getDegree() && !r.isZero()) {
                var degreeDiff = r.getDegree() - rLast.getDegree();
                var scale = field.multiply(r.getCoefficient(r.getDegree()), dltInverse);
                q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
                r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
            }
            t = q.multiply(tLast).addOrSubtract(tLastLast);
            if (r.getDegree() >= rLast.getDegree()) {
                throw new IllegalStateException_1.default('Division algorithm failed to reduce polynomial?');
            }
        }
        var sigmaTildeAtZero = t.getCoefficient(0);
        if (sigmaTildeAtZero === 0) {
            throw new ReedSolomonException_1.default('sigmaTilde(0) was zero');
        }
        var inverse = field.inverse(sigmaTildeAtZero);
        var sigma = t.multiplyScalar(inverse);
        var omega = r.multiplyScalar(inverse);
        return [sigma, omega];
    };
    ReedSolomonDecoder.prototype.findErrorLocations = function (errorLocator) {
        // This is a direct application of Chien's search
        var numErrors = errorLocator.getDegree();
        if (numErrors === 1) { // shortcut
            return Int32Array.from([errorLocator.getCoefficient(1)]);
        }
        var result = new Int32Array(numErrors);
        var e = 0;
        var field = this.field;
        for (var i = 1; i < field.getSize() && e < numErrors; i++) {
            if (errorLocator.evaluateAt(i) === 0) {
                result[e] = field.inverse(i);
                e++;
            }
        }
        if (e !== numErrors) {
            throw new ReedSolomonException_1.default('Error locator degree does not match number of roots');
        }
        return result;
    };
    ReedSolomonDecoder.prototype.findErrorMagnitudes = function (errorEvaluator, errorLocations) {
        // This is directly applying Forney's Formula
        var s = errorLocations.length;
        var result = new Int32Array(s);
        var field = this.field;
        for (var i = 0; i < s; i++) {
            var xiInverse = field.inverse(errorLocations[i]);
            var denominator = 1;
            for (var j = 0; j < s; j++) {
                if (i !== j) {
                    // denominator = field.multiply(denominator,
                    //    GenericGF.addOrSubtract(1, field.multiply(errorLocations[j], xiInverse)))
                    // Above should work but fails on some Apple and Linux JDKs due to a Hotspot bug.
                    // Below is a funny-looking workaround from Steven Parkes
                    var term = field.multiply(errorLocations[j], xiInverse);
                    var termPlus1 = (term & 0x1) === 0 ? term | 1 : term & ~1;
                    denominator = field.multiply(denominator, termPlus1);
                }
            }
            result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
            if (field.getGeneratorBase() !== 0) {
                result[i] = field.multiply(result[i], xiInverse);
            }
        }
        return result;
    };
    return ReedSolomonDecoder;
}());
exports.default = ReedSolomonDecoder;
//# sourceMappingURL=ReedSolomonDecoder.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonEncoder.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonEncoder.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var GenericGFPoly_1 = __webpack_require__(/*! ./GenericGFPoly */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGFPoly.js");
var System_1 = __webpack_require__(/*! ../../util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * <p>Implements Reed-Solomon encoding, as the name implies.</p>
 *
 * @author Sean Owen
 * @author William Rucklidge
 */
var ReedSolomonEncoder = /** @class */ (function () {
    function ReedSolomonEncoder(field) {
        this.field = field;
        this.cachedGenerators = [];
        this.cachedGenerators.push(new GenericGFPoly_1.default(field, Int32Array.from([1])));
    }
    ReedSolomonEncoder.prototype.buildGenerator = function (degree /*int*/) {
        var cachedGenerators = this.cachedGenerators;
        if (degree >= cachedGenerators.length) {
            var lastGenerator = cachedGenerators[cachedGenerators.length - 1];
            var field = this.field;
            for (var d = cachedGenerators.length; d <= degree; d++) {
                var nextGenerator = lastGenerator.multiply(new GenericGFPoly_1.default(field, Int32Array.from([1, field.exp(d - 1 + field.getGeneratorBase())])));
                cachedGenerators.push(nextGenerator);
                lastGenerator = nextGenerator;
            }
        }
        return cachedGenerators[degree];
    };
    ReedSolomonEncoder.prototype.encode = function (toEncode, ecBytes /*int*/) {
        if (ecBytes === 0) {
            throw new IllegalArgumentException_1.default('No error correction bytes');
        }
        var dataBytes = toEncode.length - ecBytes;
        if (dataBytes <= 0) {
            throw new IllegalArgumentException_1.default('No data bytes provided');
        }
        var generator = this.buildGenerator(ecBytes);
        var infoCoefficients = new Int32Array(dataBytes);
        System_1.default.arraycopy(toEncode, 0, infoCoefficients, 0, dataBytes);
        var info = new GenericGFPoly_1.default(this.field, infoCoefficients);
        info = info.multiplyByMonomial(ecBytes, 1);
        var remainder = info.divide(generator)[1];
        var coefficients = remainder.getCoefficients();
        var numZeroCoefficients = ecBytes - coefficients.length;
        for (var i = 0; i < numZeroCoefficients; i++) {
            toEncode[dataBytes + i] = 0;
        }
        System_1.default.arraycopy(coefficients, 0, toEncode, dataBytes + numZeroCoefficients, coefficients.length);
    };
    return ReedSolomonEncoder;
}());
exports.default = ReedSolomonEncoder;
//# sourceMappingURL=ReedSolomonEncoder.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/datamatrix/DataMatrixReader.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/datamatrix/DataMatrixReader.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Decoder_1 = __webpack_require__(/*! ./decoder/Decoder */ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/Decoder.js");
var Result_1 = __webpack_require__(/*! ../Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var ResultMetadataType_1 = __webpack_require__(/*! ../ResultMetadataType */ "./node_modules/@zxing/library/esm5/core/ResultMetadataType.js");
var BitMatrix_1 = __webpack_require__(/*! ../common/BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
var Detector_1 = __webpack_require__(/*! ./detector/Detector */ "./node_modules/@zxing/library/esm5/core/datamatrix/detector/Detector.js");
var System_1 = __webpack_require__(/*! ../util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This implementation can detect and decode Data Matrix codes in an image.
 *
 * @author bbrown@google.com (Brian Brown)
 */
var DataMatrixReader = /** @class */ (function () {
    function DataMatrixReader() {
        this.decoder = new Decoder_1.default();
    }
    /**
     * Locates and decodes a Data Matrix code in an image.
     *
     * @return a String representing the content encoded by the Data Matrix code
     * @throws NotFoundException if a Data Matrix code cannot be found
     * @throws FormatException if a Data Matrix code cannot be decoded
     * @throws ChecksumException if error correction fails
     */
    // @Override
    // public Result decode(BinaryBitmap image) throws NotFoundException, ChecksumException, FormatException {
    //   return decode(image, null);
    // }
    // @Override
    DataMatrixReader.prototype.decode = function (image, hints) {
        if (hints === void 0) { hints = null; }
        var decoderResult;
        var points;
        if (hints != null && hints.has(1 /* PURE_BARCODE */)) {
            var bits = DataMatrixReader.extractPureBits(image.getBlackMatrix());
            decoderResult = this.decoder.decode(bits);
            points = DataMatrixReader.NO_POINTS;
        }
        else {
            var detectorResult = new Detector_1.default(image.getBlackMatrix()).detect();
            decoderResult = this.decoder.decode(detectorResult.getBits());
            points = detectorResult.getPoints();
        }
        var rawBytes = decoderResult.getRawBytes();
        var result = new Result_1.default(decoderResult.getText(), rawBytes, 8 * rawBytes.length, points, BarcodeFormat_1.default.DATA_MATRIX, System_1.default.currentTimeMillis());
        var byteSegments = decoderResult.getByteSegments();
        if (byteSegments != null) {
            result.putMetadata(ResultMetadataType_1.default.BYTE_SEGMENTS, byteSegments);
        }
        var ecLevel = decoderResult.getECLevel();
        if (ecLevel != null) {
            result.putMetadata(ResultMetadataType_1.default.ERROR_CORRECTION_LEVEL, ecLevel);
        }
        return result;
    };
    // @Override
    DataMatrixReader.prototype.reset = function () {
        // do nothing
    };
    /**
     * This method detects a code in a "pure" image -- that is, pure monochrome image
     * which contains only an unrotated, unskewed, image of a code, with some white border
     * around it. This is a specialized method that works exceptionally fast in this special
     * case.
     *
     * @see com.google.zxing.qrcode.QRCodeReader#extractPureBits(BitMatrix)
     */
    DataMatrixReader.extractPureBits = function (image) {
        var leftTopBlack = image.getTopLeftOnBit();
        var rightBottomBlack = image.getBottomRightOnBit();
        if (leftTopBlack == null || rightBottomBlack == null) {
            throw new NotFoundException_1.default();
        }
        var moduleSize = this.moduleSize(leftTopBlack, image);
        var top = leftTopBlack[1];
        var bottom = rightBottomBlack[1];
        var left = leftTopBlack[0];
        var right = rightBottomBlack[0];
        var matrixWidth = (right - left + 1) / moduleSize;
        var matrixHeight = (bottom - top + 1) / moduleSize;
        if (matrixWidth <= 0 || matrixHeight <= 0) {
            throw new NotFoundException_1.default();
        }
        // Push in the "border" by half the module width so that we start
        // sampling in the middle of the module. Just in case the image is a
        // little off, this will help recover.
        var nudge = moduleSize / 2;
        top += nudge;
        left += nudge;
        // Now just read off the bits
        var bits = new BitMatrix_1.default(matrixWidth, matrixHeight);
        for (var y = 0; y < matrixHeight; y++) {
            var iOffset = top + y * moduleSize;
            for (var x = 0; x < matrixWidth; x++) {
                if (image.get(left + x * moduleSize, iOffset)) {
                    bits.set(x, y);
                }
            }
        }
        return bits;
    };
    DataMatrixReader.moduleSize = function (leftTopBlack, image) {
        var width = image.getWidth();
        var x = leftTopBlack[0];
        var y = leftTopBlack[1];
        while (x < width && image.get(x, y)) {
            x++;
        }
        if (x === width) {
            throw new NotFoundException_1.default();
        }
        var moduleSize = x - leftTopBlack[0];
        if (moduleSize === 0) {
            throw new NotFoundException_1.default();
        }
        return moduleSize;
    };
    DataMatrixReader.NO_POINTS = [];
    return DataMatrixReader;
}());
exports.default = DataMatrixReader;
//# sourceMappingURL=DataMatrixReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/BitMatrixParser.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/datamatrix/decoder/BitMatrixParser.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __webpack_require__(/*! ../../common/BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
var Version_1 = __webpack_require__(/*! ./Version */ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/Version.js");
var FormatException_1 = __webpack_require__(/*! ../../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author bbrown@google.com (Brian Brown)
 */
var BitMatrixParser = /** @class */ (function () {
    /**
     * @param bitMatrix {@link BitMatrix} to parse
     * @throws FormatException if dimension is < 8 or > 144 or not 0 mod 2
     */
    function BitMatrixParser(bitMatrix) {
        var dimension = bitMatrix.getHeight();
        if (dimension < 8 || dimension > 144 || (dimension & 0x01) !== 0) {
            throw new FormatException_1.default();
        }
        this.version = BitMatrixParser.readVersion(bitMatrix);
        this.mappingBitMatrix = this.extractDataRegion(bitMatrix);
        this.readMappingMatrix = new BitMatrix_1.default(this.mappingBitMatrix.getWidth(), this.mappingBitMatrix.getHeight());
    }
    BitMatrixParser.prototype.getVersion = function () {
        return this.version;
    };
    /**
     * <p>Creates the version object based on the dimension of the original bit matrix from
     * the datamatrix code.</p>
     *
     * <p>See ISO 16022:2006 Table 7 - ECC 200 symbol attributes</p>
     *
     * @param bitMatrix Original {@link BitMatrix} including alignment patterns
     * @return {@link Version} encapsulating the Data Matrix Code's "version"
     * @throws FormatException if the dimensions of the mapping matrix are not valid
     * Data Matrix dimensions.
     */
    BitMatrixParser.readVersion = function (bitMatrix) {
        var numRows = bitMatrix.getHeight();
        var numColumns = bitMatrix.getWidth();
        return Version_1.default.getVersionForDimensions(numRows, numColumns);
    };
    /**
     * <p>Reads the bits in the {@link BitMatrix} representing the mapping matrix (No alignment patterns)
     * in the correct order in order to reconstitute the codewords bytes contained within the
     * Data Matrix Code.</p>
     *
     * @return bytes encoded within the Data Matrix Code
     * @throws FormatException if the exact number of bytes expected is not read
     */
    BitMatrixParser.prototype.readCodewords = function () {
        var result = new Int8Array(this.version.getTotalCodewords());
        var resultOffset = 0;
        var row = 4;
        var column = 0;
        var numRows = this.mappingBitMatrix.getHeight();
        var numColumns = this.mappingBitMatrix.getWidth();
        var corner1Read = false;
        var corner2Read = false;
        var corner3Read = false;
        var corner4Read = false;
        // Read all of the codewords
        do {
            // Check the four corner cases
            if ((row === numRows) && (column === 0) && !corner1Read) {
                result[resultOffset++] = this.readCorner1(numRows, numColumns) & 0xff;
                row -= 2;
                column += 2;
                corner1Read = true;
            }
            else if ((row === numRows - 2) && (column === 0) && ((numColumns & 0x03) !== 0) && !corner2Read) {
                result[resultOffset++] = this.readCorner2(numRows, numColumns) & 0xff;
                row -= 2;
                column += 2;
                corner2Read = true;
            }
            else if ((row === numRows + 4) && (column === 2) && ((numColumns & 0x07) === 0) && !corner3Read) {
                result[resultOffset++] = this.readCorner3(numRows, numColumns) & 0xff;
                row -= 2;
                column += 2;
                corner3Read = true;
            }
            else if ((row === numRows - 2) && (column === 0) && ((numColumns & 0x07) === 4) && !corner4Read) {
                result[resultOffset++] = this.readCorner4(numRows, numColumns) & 0xff;
                row -= 2;
                column += 2;
                corner4Read = true;
            }
            else {
                // Sweep upward diagonally to the right
                do {
                    if ((row < numRows) && (column >= 0) && !this.readMappingMatrix.get(column, row)) {
                        result[resultOffset++] = this.readUtah(row, column, numRows, numColumns) & 0xff;
                    }
                    row -= 2;
                    column += 2;
                } while ((row >= 0) && (column < numColumns));
                row += 1;
                column += 3;
                // Sweep downward diagonally to the left
                do {
                    if ((row >= 0) && (column < numColumns) && !this.readMappingMatrix.get(column, row)) {
                        result[resultOffset++] = this.readUtah(row, column, numRows, numColumns) & 0xff;
                    }
                    row += 2;
                    column -= 2;
                } while ((row < numRows) && (column >= 0));
                row += 3;
                column += 1;
            }
        } while ((row < numRows) || (column < numColumns));
        if (resultOffset !== this.version.getTotalCodewords()) {
            throw new FormatException_1.default();
        }
        return result;
    };
    /**
     * <p>Reads a bit of the mapping matrix accounting for boundary wrapping.</p>
     *
     * @param row Row to read in the mapping matrix
     * @param column Column to read in the mapping matrix
     * @param numRows Number of rows in the mapping matrix
     * @param numColumns Number of columns in the mapping matrix
     * @return value of the given bit in the mapping matrix
     */
    BitMatrixParser.prototype.readModule = function (row, column, numRows, numColumns) {
        // Adjust the row and column indices based on boundary wrapping
        if (row < 0) {
            row += numRows;
            column += 4 - ((numRows + 4) & 0x07);
        }
        if (column < 0) {
            column += numColumns;
            row += 4 - ((numColumns + 4) & 0x07);
        }
        this.readMappingMatrix.set(column, row);
        return this.mappingBitMatrix.get(column, row);
    };
    /**
     * <p>Reads the 8 bits of the standard Utah-shaped pattern.</p>
     *
     * <p>See ISO 16022:2006, 5.8.1 Figure 6</p>
     *
     * @param row Current row in the mapping matrix, anchored at the 8th bit (LSB) of the pattern
     * @param column Current column in the mapping matrix, anchored at the 8th bit (LSB) of the pattern
     * @param numRows Number of rows in the mapping matrix
     * @param numColumns Number of columns in the mapping matrix
     * @return byte from the utah shape
     */
    BitMatrixParser.prototype.readUtah = function (row, column, numRows, numColumns) {
        var currentByte = 0;
        if (this.readModule(row - 2, column - 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(row - 2, column - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(row - 1, column - 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(row - 1, column - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(row - 1, column, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(row, column - 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(row, column - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(row, column, numRows, numColumns)) {
            currentByte |= 1;
        }
        return currentByte;
    };
    /**
     * <p>Reads the 8 bits of the special corner condition 1.</p>
     *
     * <p>See ISO 16022:2006, Figure F.3</p>
     *
     * @param numRows Number of rows in the mapping matrix
     * @param numColumns Number of columns in the mapping matrix
     * @return byte from the Corner condition 1
     */
    BitMatrixParser.prototype.readCorner1 = function (numRows, numColumns) {
        var currentByte = 0;
        if (this.readModule(numRows - 1, 0, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(numRows - 1, 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(numRows - 1, 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(1, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(2, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(3, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        return currentByte;
    };
    /**
     * <p>Reads the 8 bits of the special corner condition 2.</p>
     *
     * <p>See ISO 16022:2006, Figure F.4</p>
     *
     * @param numRows Number of rows in the mapping matrix
     * @param numColumns Number of columns in the mapping matrix
     * @return byte from the Corner condition 2
     */
    BitMatrixParser.prototype.readCorner2 = function (numRows, numColumns) {
        var currentByte = 0;
        if (this.readModule(numRows - 3, 0, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(numRows - 2, 0, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(numRows - 1, 0, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 4, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 3, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(1, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        return currentByte;
    };
    /**
     * <p>Reads the 8 bits of the special corner condition 3.</p>
     *
     * <p>See ISO 16022:2006, Figure F.5</p>
     *
     * @param numRows Number of rows in the mapping matrix
     * @param numColumns Number of columns in the mapping matrix
     * @return byte from the Corner condition 3
     */
    BitMatrixParser.prototype.readCorner3 = function (numRows, numColumns) {
        var currentByte = 0;
        if (this.readModule(numRows - 1, 0, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(numRows - 1, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 3, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(1, numColumns - 3, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(1, numColumns - 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(1, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        return currentByte;
    };
    /**
     * <p>Reads the 8 bits of the special corner condition 4.</p>
     *
     * <p>See ISO 16022:2006, Figure F.6</p>
     *
     * @param numRows Number of rows in the mapping matrix
     * @param numColumns Number of columns in the mapping matrix
     * @return byte from the Corner condition 4
     */
    BitMatrixParser.prototype.readCorner4 = function (numRows, numColumns) {
        var currentByte = 0;
        if (this.readModule(numRows - 3, 0, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(numRows - 2, 0, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(numRows - 1, 0, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 2, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(0, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(1, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(2, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        currentByte <<= 1;
        if (this.readModule(3, numColumns - 1, numRows, numColumns)) {
            currentByte |= 1;
        }
        return currentByte;
    };
    /**
     * <p>Extracts the data region from a {@link BitMatrix} that contains
     * alignment patterns.</p>
     *
     * @param bitMatrix Original {@link BitMatrix} with alignment patterns
     * @return BitMatrix that has the alignment patterns removed
     */
    BitMatrixParser.prototype.extractDataRegion = function (bitMatrix) {
        var symbolSizeRows = this.version.getSymbolSizeRows();
        var symbolSizeColumns = this.version.getSymbolSizeColumns();
        if (bitMatrix.getHeight() !== symbolSizeRows) {
            throw new IllegalArgumentException_1.default('Dimension of bitMatrix must match the version size');
        }
        var dataRegionSizeRows = this.version.getDataRegionSizeRows();
        var dataRegionSizeColumns = this.version.getDataRegionSizeColumns();
        var numDataRegionsRow = symbolSizeRows / dataRegionSizeRows | 0;
        var numDataRegionsColumn = symbolSizeColumns / dataRegionSizeColumns | 0;
        var sizeDataRegionRow = numDataRegionsRow * dataRegionSizeRows;
        var sizeDataRegionColumn = numDataRegionsColumn * dataRegionSizeColumns;
        var bitMatrixWithoutAlignment = new BitMatrix_1.default(sizeDataRegionColumn, sizeDataRegionRow);
        for (var dataRegionRow = 0; dataRegionRow < numDataRegionsRow; ++dataRegionRow) {
            var dataRegionRowOffset = dataRegionRow * dataRegionSizeRows;
            for (var dataRegionColumn = 0; dataRegionColumn < numDataRegionsColumn; ++dataRegionColumn) {
                var dataRegionColumnOffset = dataRegionColumn * dataRegionSizeColumns;
                for (var i = 0; i < dataRegionSizeRows; ++i) {
                    var readRowOffset = dataRegionRow * (dataRegionSizeRows + 2) + 1 + i;
                    var writeRowOffset = dataRegionRowOffset + i;
                    for (var j = 0; j < dataRegionSizeColumns; ++j) {
                        var readColumnOffset = dataRegionColumn * (dataRegionSizeColumns + 2) + 1 + j;
                        if (bitMatrix.get(readColumnOffset, readRowOffset)) {
                            var writeColumnOffset = dataRegionColumnOffset + j;
                            bitMatrixWithoutAlignment.set(writeColumnOffset, writeRowOffset);
                        }
                    }
                }
            }
        }
        return bitMatrixWithoutAlignment;
    };
    return BitMatrixParser;
}());
exports.default = BitMatrixParser;
//# sourceMappingURL=BitMatrixParser.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/DataBlock.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/datamatrix/decoder/DataBlock.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * <p>Encapsulates a block of data within a Data Matrix Code. Data Matrix Codes may split their data into
 * multiple blocks, each of which is a unit of data and error-correction codewords. Each
 * is represented by an instance of this class.</p>
 *
 * @author bbrown@google.com (Brian Brown)
 */
var DataBlock = /** @class */ (function () {
    function DataBlock(numDataCodewords, codewords) {
        this.numDataCodewords = numDataCodewords;
        this.codewords = codewords;
    }
    /**
     * <p>When Data Matrix Codes use multiple data blocks, they actually interleave the bytes of each of them.
     * That is, the first byte of data block 1 to n is written, then the second bytes, and so on. This
     * method will separate the data into original blocks.</p>
     *
     * @param rawCodewords bytes as read directly from the Data Matrix Code
     * @param version version of the Data Matrix Code
     * @return DataBlocks containing original bytes, "de-interleaved" from representation in the
     *         Data Matrix Code
     */
    DataBlock.getDataBlocks = function (rawCodewords, version) {
        // Figure out the number and size of data blocks used by this version
        var ecBlocks = version.getECBlocks();
        // First count the total number of data blocks
        var totalBlocks = 0;
        var ecBlockArray = ecBlocks.getECBlocks();
        for (var _i = 0, ecBlockArray_1 = ecBlockArray; _i < ecBlockArray_1.length; _i++) {
            var ecBlock = ecBlockArray_1[_i];
            totalBlocks += ecBlock.getCount();
        }
        // Now establish DataBlocks of the appropriate size and number of data codewords
        var result = new Array(totalBlocks);
        var numResultBlocks = 0;
        for (var _a = 0, ecBlockArray_2 = ecBlockArray; _a < ecBlockArray_2.length; _a++) {
            var ecBlock = ecBlockArray_2[_a];
            for (var i = 0; i < ecBlock.getCount(); i++) {
                var numDataCodewords = ecBlock.getDataCodewords();
                var numBlockCodewords = ecBlocks.getECCodewords() + numDataCodewords;
                result[numResultBlocks++] = new DataBlock(numDataCodewords, new Uint8Array(numBlockCodewords));
            }
        }
        // All blocks have the same amount of data, except that the last n
        // (where n may be 0) have 1 less byte. Figure out where these start.
        // TODO(bbrown): There is only one case where there is a difference for Data Matrix for size 144
        var longerBlocksTotalCodewords = result[0].codewords.length;
        // int shorterBlocksTotalCodewords = longerBlocksTotalCodewords - 1;
        var longerBlocksNumDataCodewords = longerBlocksTotalCodewords - ecBlocks.getECCodewords();
        var shorterBlocksNumDataCodewords = longerBlocksNumDataCodewords - 1;
        // The last elements of result may be 1 element shorter for 144 matrix
        // first fill out as many elements as all of them have minus 1
        var rawCodewordsOffset = 0;
        for (var i = 0; i < shorterBlocksNumDataCodewords; i++) {
            for (var j = 0; j < numResultBlocks; j++) {
                result[j].codewords[i] = rawCodewords[rawCodewordsOffset++];
            }
        }
        // Fill out the last data block in the longer ones
        var specialVersion = version.getVersionNumber() === 24;
        var numLongerBlocks = specialVersion ? 8 : numResultBlocks;
        for (var j = 0; j < numLongerBlocks; j++) {
            result[j].codewords[longerBlocksNumDataCodewords - 1] = rawCodewords[rawCodewordsOffset++];
        }
        // Now add in error correction blocks
        var max = result[0].codewords.length;
        for (var i = longerBlocksNumDataCodewords; i < max; i++) {
            for (var j = 0; j < numResultBlocks; j++) {
                var jOffset = specialVersion ? (j + 8) % numResultBlocks : j;
                var iOffset = specialVersion && jOffset > 7 ? i - 1 : i;
                result[jOffset].codewords[iOffset] = rawCodewords[rawCodewordsOffset++];
            }
        }
        if (rawCodewordsOffset !== rawCodewords.length) {
            throw new IllegalArgumentException_1.default();
        }
        return result;
    };
    DataBlock.prototype.getNumDataCodewords = function () {
        return this.numDataCodewords;
    };
    DataBlock.prototype.getCodewords = function () {
        return this.codewords;
    };
    return DataBlock;
}());
exports.default = DataBlock;
//# sourceMappingURL=DataBlock.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/DecodedBitStreamParser.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/datamatrix/decoder/DecodedBitStreamParser.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DecoderResult_1 = __webpack_require__(/*! ../../common/DecoderResult */ "./node_modules/@zxing/library/esm5/core/common/DecoderResult.js");
var BitSource_1 = __webpack_require__(/*! ../../common/BitSource */ "./node_modules/@zxing/library/esm5/core/common/BitSource.js");
var StringBuilder_1 = __webpack_require__(/*! ../../util/StringBuilder */ "./node_modules/@zxing/library/esm5/core/util/StringBuilder.js");
var StringEncoding_1 = __webpack_require__(/*! ../../util/StringEncoding */ "./node_modules/@zxing/library/esm5/core/util/StringEncoding.js");
var __1 = __webpack_require__(/*! ../../.. */ "./node_modules/@zxing/library/esm5/index.js");
var FormatException_1 = __webpack_require__(/*! ../../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
var IllegalStateException_1 = __webpack_require__(/*! ../../IllegalStateException */ "./node_modules/@zxing/library/esm5/core/IllegalStateException.js");
/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Mode;
(function (Mode) {
    Mode[Mode["PAD_ENCODE"] = 0] = "PAD_ENCODE";
    Mode[Mode["ASCII_ENCODE"] = 1] = "ASCII_ENCODE";
    Mode[Mode["C40_ENCODE"] = 2] = "C40_ENCODE";
    Mode[Mode["TEXT_ENCODE"] = 3] = "TEXT_ENCODE";
    Mode[Mode["ANSIX12_ENCODE"] = 4] = "ANSIX12_ENCODE";
    Mode[Mode["EDIFACT_ENCODE"] = 5] = "EDIFACT_ENCODE";
    Mode[Mode["BASE256_ENCODE"] = 6] = "BASE256_ENCODE";
})(Mode || (Mode = {}));
/**
 * <p>Data Matrix Codes can encode text as bits in one of several modes, and can use multiple modes
 * in one Data Matrix Code. This class decodes the bits back into text.</p>
 *
 * <p>See ISO 16022:2006, 5.2.1 - 5.2.9.2</p>
 *
 * @author bbrown@google.com (Brian Brown)
 * @author Sean Owen
 */
var DecodedBitStreamParser = /** @class */ (function () {
    function DecodedBitStreamParser() {
    }
    DecodedBitStreamParser.decode = function (bytes) {
        var bits = new BitSource_1.default(bytes);
        var result = new StringBuilder_1.default();
        var resultTrailer = new StringBuilder_1.default();
        var byteSegments = new Array();
        var mode = Mode.ASCII_ENCODE;
        do {
            if (mode === Mode.ASCII_ENCODE) {
                mode = this.decodeAsciiSegment(bits, result, resultTrailer);
            }
            else {
                switch (mode) {
                    case Mode.C40_ENCODE:
                        this.decodeC40Segment(bits, result);
                        break;
                    case Mode.TEXT_ENCODE:
                        this.decodeTextSegment(bits, result);
                        break;
                    case Mode.ANSIX12_ENCODE:
                        this.decodeAnsiX12Segment(bits, result);
                        break;
                    case Mode.EDIFACT_ENCODE:
                        this.decodeEdifactSegment(bits, result);
                        break;
                    case Mode.BASE256_ENCODE:
                        this.decodeBase256Segment(bits, result, byteSegments);
                        break;
                    default:
                        throw new FormatException_1.default();
                }
                mode = Mode.ASCII_ENCODE;
            }
        } while (mode !== Mode.PAD_ENCODE && bits.available() > 0);
        if (resultTrailer.length() > 0) {
            result.append(resultTrailer.toString());
        }
        return new DecoderResult_1.default(bytes, result.toString(), byteSegments.length === 0 ? null : byteSegments, null);
    };
    /**
     * See ISO 16022:2006, 5.2.3 and Annex C, Table C.2
     */
    DecodedBitStreamParser.decodeAsciiSegment = function (bits, result, resultTrailer) {
        var upperShift = false;
        do {
            var oneByte = bits.readBits(8);
            if (oneByte === 0) {
                throw new FormatException_1.default();
            }
            else if (oneByte <= 128) { // ASCII data (ASCII value + 1)
                if (upperShift) {
                    oneByte += 128;
                    // upperShift = false;
                }
                result.append(String.fromCharCode(oneByte - 1));
                return Mode.ASCII_ENCODE;
            }
            else if (oneByte === 129) { // Pad
                return Mode.PAD_ENCODE;
            }
            else if (oneByte <= 229) { // 2-digit data 00-99 (Numeric Value + 130)
                var value = oneByte - 130;
                if (value < 10) { // pad with '0' for single digit values
                    result.append('0');
                }
                result.append('' + value);
            }
            else {
                switch (oneByte) {
                    case 230: // Latch to C40 encodation
                        return Mode.C40_ENCODE;
                    case 231: // Latch to Base 256 encodation
                        return Mode.BASE256_ENCODE;
                    case 232: // FNC1
                        result.append(String.fromCharCode(29)); // translate as ASCII 29
                        break;
                    case 233: // Structured Append
                    case 234: // Reader Programming
                        // Ignore these symbols for now
                        // throw ReaderException.getInstance();
                        break;
                    case 235: // Upper Shift (shift to Extended ASCII)
                        upperShift = true;
                        break;
                    case 236: // 05 Macro
                        result.append('[)>\u001E05\u001D');
                        resultTrailer.insert(0, '\u001E\u0004');
                        break;
                    case 237: // 06 Macro
                        result.append('[)>\u001E06\u001D');
                        resultTrailer.insert(0, '\u001E\u0004');
                        break;
                    case 238: // Latch to ANSI X12 encodation
                        return Mode.ANSIX12_ENCODE;
                    case 239: // Latch to Text encodation
                        return Mode.TEXT_ENCODE;
                    case 240: // Latch to EDIFACT encodation
                        return Mode.EDIFACT_ENCODE;
                    case 241: // ECI Character
                        // TODO(bbrown): I think we need to support ECI
                        // throw ReaderException.getInstance();
                        // Ignore this symbol for now
                        break;
                    default:
                        // Not to be used in ASCII encodation
                        // but work around encoders that end with 254, latch back to ASCII
                        if (oneByte !== 254 || bits.available() !== 0) {
                            throw new FormatException_1.default();
                        }
                        break;
                }
            }
        } while (bits.available() > 0);
        return Mode.ASCII_ENCODE;
    };
    /**
     * See ISO 16022:2006, 5.2.5 and Annex C, Table C.1
     */
    DecodedBitStreamParser.decodeC40Segment = function (bits, result) {
        // Three C40 values are encoded in a 16-bit value as
        // (1600 * C1) + (40 * C2) + C3 + 1
        // TODO(bbrown): The Upper Shift with C40 doesn't work in the 4 value scenario all the time
        var upperShift = false;
        var cValues = [];
        var shift = 0;
        do {
            // If there is only one byte left then it will be encoded as ASCII
            if (bits.available() === 8) {
                return;
            }
            var firstByte = bits.readBits(8);
            if (firstByte === 254) { // Unlatch codeword
                return;
            }
            this.parseTwoBytes(firstByte, bits.readBits(8), cValues);
            for (var i = 0; i < 3; i++) {
                var cValue = cValues[i];
                switch (shift) {
                    case 0:
                        if (cValue < 3) {
                            shift = cValue + 1;
                        }
                        else if (cValue < this.C40_BASIC_SET_CHARS.length) {
                            var c40char = this.C40_BASIC_SET_CHARS[cValue];
                            if (upperShift) {
                                result.append(String.fromCharCode(c40char.charCodeAt(0) + 128));
                                upperShift = false;
                            }
                            else {
                                result.append(c40char);
                            }
                        }
                        else {
                            throw new FormatException_1.default();
                        }
                        break;
                    case 1:
                        if (upperShift) {
                            result.append(String.fromCharCode(cValue + 128));
                            upperShift = false;
                        }
                        else {
                            result.append(String.fromCharCode(cValue));
                        }
                        shift = 0;
                        break;
                    case 2:
                        if (cValue < this.C40_SHIFT2_SET_CHARS.length) {
                            var c40char = this.C40_SHIFT2_SET_CHARS[cValue];
                            if (upperShift) {
                                result.append(String.fromCharCode(c40char.charCodeAt(0) + 128));
                                upperShift = false;
                            }
                            else {
                                result.append(c40char);
                            }
                        }
                        else {
                            switch (cValue) {
                                case 27: // FNC1
                                    result.append(String.fromCharCode(29)); // translate as ASCII 29
                                    break;
                                case 30: // Upper Shift
                                    upperShift = true;
                                    break;
                                default:
                                    throw new FormatException_1.default();
                            }
                        }
                        shift = 0;
                        break;
                    case 3:
                        if (upperShift) {
                            result.append(String.fromCharCode(cValue + 224));
                            upperShift = false;
                        }
                        else {
                            result.append(String.fromCharCode(cValue + 96));
                        }
                        shift = 0;
                        break;
                    default:
                        throw new FormatException_1.default();
                }
            }
        } while (bits.available() > 0);
    };
    /**
     * See ISO 16022:2006, 5.2.6 and Annex C, Table C.2
     */
    DecodedBitStreamParser.decodeTextSegment = function (bits, result) {
        // Three Text values are encoded in a 16-bit value as
        // (1600 * C1) + (40 * C2) + C3 + 1
        // TODO(bbrown): The Upper Shift with Text doesn't work in the 4 value scenario all the time
        var upperShift = false;
        var cValues = [];
        var shift = 0;
        do {
            // If there is only one byte left then it will be encoded as ASCII
            if (bits.available() === 8) {
                return;
            }
            var firstByte = bits.readBits(8);
            if (firstByte === 254) { // Unlatch codeword
                return;
            }
            this.parseTwoBytes(firstByte, bits.readBits(8), cValues);
            for (var i = 0; i < 3; i++) {
                var cValue = cValues[i];
                switch (shift) {
                    case 0:
                        if (cValue < 3) {
                            shift = cValue + 1;
                        }
                        else if (cValue < this.TEXT_BASIC_SET_CHARS.length) {
                            var textChar = this.TEXT_BASIC_SET_CHARS[cValue];
                            if (upperShift) {
                                result.append(String.fromCharCode(textChar.charCodeAt(0) + 128));
                                upperShift = false;
                            }
                            else {
                                result.append(textChar);
                            }
                        }
                        else {
                            throw new FormatException_1.default();
                        }
                        break;
                    case 1:
                        if (upperShift) {
                            result.append(String.fromCharCode(cValue + 128));
                            upperShift = false;
                        }
                        else {
                            result.append(String.fromCharCode(cValue));
                        }
                        shift = 0;
                        break;
                    case 2:
                        // Shift 2 for Text is the same encoding as C40
                        if (cValue < this.TEXT_SHIFT2_SET_CHARS.length) {
                            var textChar = this.TEXT_SHIFT2_SET_CHARS[cValue];
                            if (upperShift) {
                                result.append(String.fromCharCode(textChar.charCodeAt(0) + 128));
                                upperShift = false;
                            }
                            else {
                                result.append(textChar);
                            }
                        }
                        else {
                            switch (cValue) {
                                case 27: // FNC1
                                    result.append(String.fromCharCode(29)); // translate as ASCII 29
                                    break;
                                case 30: // Upper Shift
                                    upperShift = true;
                                    break;
                                default:
                                    throw new FormatException_1.default();
                            }
                        }
                        shift = 0;
                        break;
                    case 3:
                        if (cValue < this.TEXT_SHIFT3_SET_CHARS.length) {
                            var textChar = this.TEXT_SHIFT3_SET_CHARS[cValue];
                            if (upperShift) {
                                result.append(String.fromCharCode(textChar.charCodeAt(0) + 128));
                                upperShift = false;
                            }
                            else {
                                result.append(textChar);
                            }
                            shift = 0;
                        }
                        else {
                            throw new FormatException_1.default();
                        }
                        break;
                    default:
                        throw new FormatException_1.default();
                }
            }
        } while (bits.available() > 0);
    };
    /**
     * See ISO 16022:2006, 5.2.7
     */
    DecodedBitStreamParser.decodeAnsiX12Segment = function (bits, result) {
        // Three ANSI X12 values are encoded in a 16-bit value as
        // (1600 * C1) + (40 * C2) + C3 + 1
        var cValues = [];
        do {
            // If there is only one byte left then it will be encoded as ASCII
            if (bits.available() === 8) {
                return;
            }
            var firstByte = bits.readBits(8);
            if (firstByte === 254) { // Unlatch codeword
                return;
            }
            this.parseTwoBytes(firstByte, bits.readBits(8), cValues);
            for (var i = 0; i < 3; i++) {
                var cValue = cValues[i];
                switch (cValue) {
                    case 0: // X12 segment terminator <CR>
                        result.append('\r');
                        break;
                    case 1: // X12 segment separator *
                        result.append('*');
                        break;
                    case 2: // X12 sub-element separator >
                        result.append('>');
                        break;
                    case 3: // space
                        result.append(' ');
                        break;
                    default:
                        if (cValue < 14) { // 0 - 9
                            result.append(String.fromCharCode(cValue + 44));
                        }
                        else if (cValue < 40) { // A - Z
                            result.append(String.fromCharCode(cValue + 51));
                        }
                        else {
                            throw new FormatException_1.default();
                        }
                        break;
                }
            }
        } while (bits.available() > 0);
    };
    DecodedBitStreamParser.parseTwoBytes = function (firstByte, secondByte, result) {
        var fullBitValue = (firstByte << 8) + secondByte - 1;
        var temp = Math.floor(fullBitValue / 1600);
        result[0] = temp;
        fullBitValue -= temp * 1600;
        temp = Math.floor(fullBitValue / 40);
        result[1] = temp;
        result[2] = fullBitValue - temp * 40;
    };
    /**
     * See ISO 16022:2006, 5.2.8 and Annex C Table C.3
     */
    DecodedBitStreamParser.decodeEdifactSegment = function (bits, result) {
        do {
            // If there is only two or less bytes left then it will be encoded as ASCII
            if (bits.available() <= 16) {
                return;
            }
            for (var i = 0; i < 4; i++) {
                var edifactValue = bits.readBits(6);
                // Check for the unlatch character
                if (edifactValue === 0x1F) { // 011111
                    // Read rest of byte, which should be 0, and stop
                    var bitsLeft = 8 - bits.getBitOffset();
                    if (bitsLeft !== 8) {
                        bits.readBits(bitsLeft);
                    }
                    return;
                }
                if ((edifactValue & 0x20) === 0) { // no 1 in the leading (6th) bit
                    edifactValue |= 0x40; // Add a leading 01 to the 6 bit binary value
                }
                result.append(String.fromCharCode(edifactValue));
            }
        } while (bits.available() > 0);
    };
    /**
     * See ISO 16022:2006, 5.2.9 and Annex B, B.2
     */
    DecodedBitStreamParser.decodeBase256Segment = function (bits, result, byteSegments) {
        // Figure out how long the Base 256 Segment is.
        var codewordPosition = 1 + bits.getByteOffset(); // position is 1-indexed
        var d1 = this.unrandomize255State(bits.readBits(8), codewordPosition++);
        var count;
        if (d1 === 0) { // Read the remainder of the symbol
            count = bits.available() / 8 | 0;
        }
        else if (d1 < 250) {
            count = d1;
        }
        else {
            count = 250 * (d1 - 249) + this.unrandomize255State(bits.readBits(8), codewordPosition++);
        }
        // We're seeing NegativeArraySizeException errors from users.
        if (count < 0) {
            throw new FormatException_1.default();
        }
        var bytes = new Uint8Array(count);
        for (var i = 0; i < count; i++) {
            // Have seen this particular error in the wild, such as at
            // http://www.bcgen.com/demo/IDAutomationStreamingDataMatrix.aspx?MODE=3&D=Fred&PFMT=3&PT=F&X=0.3&O=0&LM=0.2
            if (bits.available() < 8) {
                throw new FormatException_1.default();
            }
            bytes[i] = this.unrandomize255State(bits.readBits(8), codewordPosition++);
        }
        byteSegments.push(bytes);
        try {
            result.append(StringEncoding_1.default.decode(bytes, __1.StringUtils.ISO88591));
        }
        catch (uee) {
            throw new IllegalStateException_1.default('Platform does not support required encoding: ' + uee.message);
        }
    };
    /**
     * See ISO 16022:2006, Annex B, B.2
     */
    DecodedBitStreamParser.unrandomize255State = function (randomizedBase256Codeword, base256CodewordPosition) {
        var pseudoRandomNumber = ((149 * base256CodewordPosition) % 255) + 1;
        var tempVariable = randomizedBase256Codeword - pseudoRandomNumber;
        return tempVariable >= 0 ? tempVariable : tempVariable + 256;
    };
    /**
     * See ISO 16022:2006, Annex C Table C.1
     * The C40 Basic Character Set (*'s used for placeholders for the shift values)
     */
    DecodedBitStreamParser.C40_BASIC_SET_CHARS = [
        '*', '*', '*', ' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    DecodedBitStreamParser.C40_SHIFT2_SET_CHARS = [
        '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.',
        '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_'
    ];
    /**
     * See ISO 16022:2006, Annex C Table C.2
     * The Text Basic Character Set (*'s used for placeholders for the shift values)
     */
    DecodedBitStreamParser.TEXT_BASIC_SET_CHARS = [
        '*', '*', '*', ' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    // Shift 2 for Text is the same encoding as C40
    DecodedBitStreamParser.TEXT_SHIFT2_SET_CHARS = DecodedBitStreamParser.C40_SHIFT2_SET_CHARS;
    DecodedBitStreamParser.TEXT_SHIFT3_SET_CHARS = [
        '`', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '{', '|', '}', '~', String.fromCharCode(127)
    ];
    return DecodedBitStreamParser;
}());
exports.default = DecodedBitStreamParser;
//# sourceMappingURL=DecodedBitStreamParser.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/Decoder.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/datamatrix/decoder/Decoder.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReedSolomonDecoder_1 = __webpack_require__(/*! ../../common/reedsolomon/ReedSolomonDecoder */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonDecoder.js");
var GenericGF_1 = __webpack_require__(/*! ../../common/reedsolomon/GenericGF */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGF.js");
var BitMatrixParser_1 = __webpack_require__(/*! ./BitMatrixParser */ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/BitMatrixParser.js");
var DataBlock_1 = __webpack_require__(/*! ./DataBlock */ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/DataBlock.js");
var DecodedBitStreamParser_1 = __webpack_require__(/*! ./DecodedBitStreamParser */ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/DecodedBitStreamParser.js");
var ChecksumException_1 = __webpack_require__(/*! ../../ChecksumException */ "./node_modules/@zxing/library/esm5/core/ChecksumException.js");
/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * <p>The main class which implements Data Matrix Code decoding -- as opposed to locating and extracting
 * the Data Matrix Code from an image.</p>
 *
 * @author bbrown@google.com (Brian Brown)
 */
var Decoder = /** @class */ (function () {
    function Decoder() {
        this.rsDecoder = new ReedSolomonDecoder_1.default(GenericGF_1.default.DATA_MATRIX_FIELD_256);
    }
    /**
     * <p>Decodes a Data Matrix Code represented as a {@link BitMatrix}. A 1 or "true" is taken
     * to mean a black module.</p>
     *
     * @param bits booleans representing white/black Data Matrix Code modules
     * @return text and bytes encoded within the Data Matrix Code
     * @throws FormatException if the Data Matrix Code cannot be decoded
     * @throws ChecksumException if error correction fails
     */
    Decoder.prototype.decode = function (bits) {
        // Construct a parser and read version, error-correction level
        var parser = new BitMatrixParser_1.default(bits);
        var version = parser.getVersion();
        // Read codewords
        var codewords = parser.readCodewords();
        // Separate into data blocks
        var dataBlocks = DataBlock_1.default.getDataBlocks(codewords, version);
        // Count total number of data bytes
        var totalBytes = 0;
        for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
            var db = dataBlocks_1[_i];
            totalBytes += db.getNumDataCodewords();
        }
        var resultBytes = new Uint8Array(totalBytes);
        var dataBlocksCount = dataBlocks.length;
        // Error-correct and copy data blocks together into a stream of bytes
        for (var j = 0; j < dataBlocksCount; j++) {
            var dataBlock = dataBlocks[j];
            var codewordBytes = dataBlock.getCodewords();
            var numDataCodewords = dataBlock.getNumDataCodewords();
            this.correctErrors(codewordBytes, numDataCodewords);
            for (var i = 0; i < numDataCodewords; i++) {
                // De-interlace data blocks.
                resultBytes[i * dataBlocksCount + j] = codewordBytes[i];
            }
        }
        // Decode the contents of that stream of bytes
        return DecodedBitStreamParser_1.default.decode(resultBytes);
    };
    /**
     * <p>Given data and error-correction codewords received, possibly corrupted by errors, attempts to
     * correct the errors in-place using Reed-Solomon error correction.</p>
     *
     * @param codewordBytes data and error correction codewords
     * @param numDataCodewords number of codewords that are data bytes
     * @throws ChecksumException if error correction fails
     */
    Decoder.prototype.correctErrors = function (codewordBytes, numDataCodewords) {
        var numCodewords = codewordBytes.length;
        // First read into an array of ints
        var codewordsInts = new Int32Array(codewordBytes);
        // for (let i = 0; i < numCodewords; i++) {
        //   codewordsInts[i] = codewordBytes[i] & 0xFF;
        // }
        try {
            this.rsDecoder.decode(codewordsInts, codewordBytes.length - numDataCodewords);
        }
        catch (ignored /* ReedSolomonException */) {
            throw new ChecksumException_1.default();
        }
        // Copy back into array of bytes -- only need to worry about the bytes that were data
        // We don't care about errors in the error-correction codewords
        for (var i = 0; i < numDataCodewords; i++) {
            codewordBytes[i] = codewordsInts[i];
        }
    };
    return Decoder;
}());
exports.default = Decoder;
//# sourceMappingURL=Decoder.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/datamatrix/decoder/Version.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/datamatrix/decoder/Version.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FormatException_1 = __webpack_require__(/*! ../../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * <p>Encapsulates a set of error-correction blocks in one symbol version. Most versions will
 * use blocks of differing sizes within one version, so, this encapsulates the parameters for
 * each set of blocks. It also holds the number of error-correction codewords per block since it
 * will be the same across all blocks within one version.</p>
 */
var ECBlocks = /** @class */ (function () {
    function ECBlocks(ecCodewords, ecBlocks1, ecBlocks2) {
        this.ecCodewords = ecCodewords;
        this.ecBlocks = [ecBlocks1];
        ecBlocks2 && this.ecBlocks.push(ecBlocks2);
    }
    ECBlocks.prototype.getECCodewords = function () {
        return this.ecCodewords;
    };
    ECBlocks.prototype.getECBlocks = function () {
        return this.ecBlocks;
    };
    return ECBlocks;
}());
exports.ECBlocks = ECBlocks;
/**
 * <p>Encapsulates the parameters for one error-correction block in one symbol version.
 * This includes the number of data codewords, and the number of times a block with these
 * parameters is used consecutively in the Data Matrix code version's format.</p>
 */
var ECB = /** @class */ (function () {
    function ECB(count, dataCodewords) {
        this.count = count;
        this.dataCodewords = dataCodewords;
    }
    ECB.prototype.getCount = function () {
        return this.count;
    };
    ECB.prototype.getDataCodewords = function () {
        return this.dataCodewords;
    };
    return ECB;
}());
exports.ECB = ECB;
/**
 * The Version object encapsulates attributes about a particular
 * size Data Matrix Code.
 *
 * @author bbrown@google.com (Brian Brown)
 */
var Version = /** @class */ (function () {
    function Version(versionNumber, symbolSizeRows, symbolSizeColumns, dataRegionSizeRows, dataRegionSizeColumns, ecBlocks) {
        this.versionNumber = versionNumber;
        this.symbolSizeRows = symbolSizeRows;
        this.symbolSizeColumns = symbolSizeColumns;
        this.dataRegionSizeRows = dataRegionSizeRows;
        this.dataRegionSizeColumns = dataRegionSizeColumns;
        this.ecBlocks = ecBlocks;
        // Calculate the total number of codewords
        var total = 0;
        var ecCodewords = ecBlocks.getECCodewords();
        var ecbArray = ecBlocks.getECBlocks();
        for (var _i = 0, ecbArray_1 = ecbArray; _i < ecbArray_1.length; _i++) {
            var ecBlock = ecbArray_1[_i];
            total += ecBlock.getCount() * (ecBlock.getDataCodewords() + ecCodewords);
        }
        this.totalCodewords = total;
    }
    Version.prototype.getVersionNumber = function () {
        return this.versionNumber;
    };
    Version.prototype.getSymbolSizeRows = function () {
        return this.symbolSizeRows;
    };
    Version.prototype.getSymbolSizeColumns = function () {
        return this.symbolSizeColumns;
    };
    Version.prototype.getDataRegionSizeRows = function () {
        return this.dataRegionSizeRows;
    };
    Version.prototype.getDataRegionSizeColumns = function () {
        return this.dataRegionSizeColumns;
    };
    Version.prototype.getTotalCodewords = function () {
        return this.totalCodewords;
    };
    Version.prototype.getECBlocks = function () {
        return this.ecBlocks;
    };
    /**
     * <p>Deduces version information from Data Matrix dimensions.</p>
     *
     * @param numRows Number of rows in modules
     * @param numColumns Number of columns in modules
     * @return Version for a Data Matrix Code of those dimensions
     * @throws FormatException if dimensions do correspond to a valid Data Matrix size
     */
    Version.getVersionForDimensions = function (numRows, numColumns) {
        if ((numRows & 0x01) !== 0 || (numColumns & 0x01) !== 0) {
            throw new FormatException_1.default();
        }
        for (var _i = 0, _a = Version.VERSIONS; _i < _a.length; _i++) {
            var version = _a[_i];
            if (version.symbolSizeRows === numRows && version.symbolSizeColumns === numColumns) {
                return version;
            }
        }
        throw new FormatException_1.default();
    };
    //  @Override
    Version.prototype.toString = function () {
        return '' + this.versionNumber;
    };
    /**
     * See ISO 16022:2006 5.5.1 Table 7
     */
    Version.buildVersions = function () {
        return [
            new Version(1, 10, 10, 8, 8, new ECBlocks(5, new ECB(1, 3))),
            new Version(2, 12, 12, 10, 10, new ECBlocks(7, new ECB(1, 5))),
            new Version(3, 14, 14, 12, 12, new ECBlocks(10, new ECB(1, 8))),
            new Version(4, 16, 16, 14, 14, new ECBlocks(12, new ECB(1, 12))),
            new Version(5, 18, 18, 16, 16, new ECBlocks(14, new ECB(1, 18))),
            new Version(6, 20, 20, 18, 18, new ECBlocks(18, new ECB(1, 22))),
            new Version(7, 22, 22, 20, 20, new ECBlocks(20, new ECB(1, 30))),
            new Version(8, 24, 24, 22, 22, new ECBlocks(24, new ECB(1, 36))),
            new Version(9, 26, 26, 24, 24, new ECBlocks(28, new ECB(1, 44))),
            new Version(10, 32, 32, 14, 14, new ECBlocks(36, new ECB(1, 62))),
            new Version(11, 36, 36, 16, 16, new ECBlocks(42, new ECB(1, 86))),
            new Version(12, 40, 40, 18, 18, new ECBlocks(48, new ECB(1, 114))),
            new Version(13, 44, 44, 20, 20, new ECBlocks(56, new ECB(1, 144))),
            new Version(14, 48, 48, 22, 22, new ECBlocks(68, new ECB(1, 174))),
            new Version(15, 52, 52, 24, 24, new ECBlocks(42, new ECB(2, 102))),
            new Version(16, 64, 64, 14, 14, new ECBlocks(56, new ECB(2, 140))),
            new Version(17, 72, 72, 16, 16, new ECBlocks(36, new ECB(4, 92))),
            new Version(18, 80, 80, 18, 18, new ECBlocks(48, new ECB(4, 114))),
            new Version(19, 88, 88, 20, 20, new ECBlocks(56, new ECB(4, 144))),
            new Version(20, 96, 96, 22, 22, new ECBlocks(68, new ECB(4, 174))),
            new Version(21, 104, 104, 24, 24, new ECBlocks(56, new ECB(6, 136))),
            new Version(22, 120, 120, 18, 18, new ECBlocks(68, new ECB(6, 175))),
            new Version(23, 132, 132, 20, 20, new ECBlocks(62, new ECB(8, 163))),
            new Version(24, 144, 144, 22, 22, new ECBlocks(62, new ECB(8, 156), new ECB(2, 155))),
            new Version(25, 8, 18, 6, 16, new ECBlocks(7, new ECB(1, 5))),
            new Version(26, 8, 32, 6, 14, new ECBlocks(11, new ECB(1, 10))),
            new Version(27, 12, 26, 10, 24, new ECBlocks(14, new ECB(1, 16))),
            new Version(28, 12, 36, 10, 16, new ECBlocks(18, new ECB(1, 22))),
            new Version(29, 16, 36, 14, 16, new ECBlocks(24, new ECB(1, 32))),
            new Version(30, 16, 48, 14, 22, new ECBlocks(28, new ECB(1, 49)))
        ];
    };
    Version.VERSIONS = Version.buildVersions();
    return Version;
}());
exports.default = Version;
//# sourceMappingURL=Version.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/datamatrix/detector/Detector.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/datamatrix/detector/Detector.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResultPoint_1 = __webpack_require__(/*! ../../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var DetectorResult_1 = __webpack_require__(/*! ../../common/DetectorResult */ "./node_modules/@zxing/library/esm5/core/common/DetectorResult.js");
var GridSamplerInstance_1 = __webpack_require__(/*! ../../common/GridSamplerInstance */ "./node_modules/@zxing/library/esm5/core/common/GridSamplerInstance.js");
var MathUtils_1 = __webpack_require__(/*! ../../common/detector/MathUtils */ "./node_modules/@zxing/library/esm5/core/common/detector/MathUtils.js");
var WhiteRectangleDetector_1 = __webpack_require__(/*! ../../common/detector/WhiteRectangleDetector */ "./node_modules/@zxing/library/esm5/core/common/detector/WhiteRectangleDetector.js");
var NotFoundException_1 = __webpack_require__(/*! ../../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * <p>Encapsulates logic that can detect a Data Matrix Code in an image, even if the Data Matrix Code
 * is rotated or skewed, or partially obscured.</p>
 *
 * @author Sean Owen
 */
var Detector = /** @class */ (function () {
    function Detector(image) {
        this.image = image;
        this.rectangleDetector = new WhiteRectangleDetector_1.default(image);
    }
    /**
     * <p>Detects a Data Matrix Code in an image.</p>
     *
     * @return {@link DetectorResult} encapsulating results of detecting a Data Matrix Code
     * @throws NotFoundException if no Data Matrix Code can be found
     */
    Detector.prototype.detect = function () {
        var cornerPoints = this.rectangleDetector.detect();
        var pointA = cornerPoints[0];
        var pointB = cornerPoints[1];
        var pointC = cornerPoints[2];
        var pointD = cornerPoints[3];
        // Point A and D are across the diagonal from one another,
        // as are B and C. Figure out which are the solid black lines
        // by counting transitions
        var transitions = [];
        transitions.push(this.transitionsBetween(pointA, pointB));
        transitions.push(this.transitionsBetween(pointA, pointC));
        transitions.push(this.transitionsBetween(pointB, pointD));
        transitions.push(this.transitionsBetween(pointC, pointD));
        transitions.sort(ResultPointsAndTransitions.resultPointsAndTransitionsComparator);
        // Sort by number of transitions. First two will be the two solid sides; last two
        // will be the two alternating black/white sides
        var lSideOne = transitions[0];
        var lSideTwo = transitions[1];
        // Figure out which point is their intersection by tallying up the number of times we see the
        // endpoints in the four endpoints. One will show up twice.
        var pointCount = new Map();
        Detector.increment(pointCount, lSideOne.getFrom());
        Detector.increment(pointCount, lSideOne.getTo());
        Detector.increment(pointCount, lSideTwo.getFrom());
        Detector.increment(pointCount, lSideTwo.getTo());
        var maybeTopLeft = null;
        var bottomLeft = null;
        var maybeBottomRight = null;
        for (var _i = 0, _a = Array.from(pointCount.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], point = _b[0], value = _b[1];
            if (value === 2) {
                bottomLeft = point; // this is definitely the bottom left, then -- end of two L sides
            }
            else {
                // Otherwise it's either top left or bottom right -- just assign the two arbitrarily now
                if (maybeTopLeft == null) {
                    maybeTopLeft = point;
                }
                else {
                    maybeBottomRight = point;
                }
            }
        }
        if (maybeTopLeft == null || bottomLeft == null || maybeBottomRight == null) {
            throw new NotFoundException_1.default();
        }
        // Bottom left is correct but top left and bottom right might be switched
        var corners = [maybeTopLeft, bottomLeft, maybeBottomRight];
        // Use the dot product trick to sort them out
        ResultPoint_1.default.orderBestPatterns(corners);
        // Now we know which is which:
        var bottomRight = corners[0];
        bottomLeft = corners[1];
        var topLeft = corners[2];
        // Which point didn't we find in relation to the "L" sides? that's the top right corner
        var topRight;
        if (!pointCount.has(pointA)) {
            topRight = pointA;
        }
        else if (!pointCount.has(pointB)) {
            topRight = pointB;
        }
        else if (!pointCount.has(pointC)) {
            topRight = pointC;
        }
        else {
            topRight = pointD;
        }
        // Next determine the dimension by tracing along the top or right side and counting black/white
        // transitions. Since we start inside a black module, we should see a number of transitions
        // equal to 1 less than the code dimension. Well, actually 2 less, because we are going to
        // end on a black module:
        // The top right point is actually the corner of a module, which is one of the two black modules
        // adjacent to the white module at the top right. Tracing to that corner from either the top left
        // or bottom right should work here.
        var dimensionTop = this.transitionsBetween(topLeft, topRight).getTransitions();
        var dimensionRight = this.transitionsBetween(bottomRight, topRight).getTransitions();
        if ((dimensionTop & 0x01) === 1) {
            // it can't be odd, so, round... up?
            dimensionTop++;
        }
        dimensionTop += 2;
        if ((dimensionRight & 0x01) === 1) {
            // it can't be odd, so, round... up?
            dimensionRight++;
        }
        dimensionRight += 2;
        var bits;
        var correctedTopRight;
        // Rectangular symbols are 6x16, 6x28, 10x24, 10x32, 14x32, or 14x44. If one dimension is more
        // than twice the other, it's certainly rectangular, but to cut a bit more slack we accept it as
        // rectangular if the bigger side is at least 7/4 times the other:
        if (4 * dimensionTop >= 7 * dimensionRight || 4 * dimensionRight >= 7 * dimensionTop) {
            // The matrix is rectangular
            correctedTopRight =
                this.correctTopRightRectangular(bottomLeft, bottomRight, topLeft, topRight, dimensionTop, dimensionRight);
            if (correctedTopRight == null) {
                correctedTopRight = topRight;
            }
            dimensionTop = this.transitionsBetween(topLeft, correctedTopRight).getTransitions();
            dimensionRight = this.transitionsBetween(bottomRight, correctedTopRight).getTransitions();
            if ((dimensionTop & 0x01) === 1) {
                // it can't be odd, so, round... up?
                dimensionTop++;
            }
            if ((dimensionRight & 0x01) === 1) {
                // it can't be odd, so, round... up?
                dimensionRight++;
            }
            bits = Detector.sampleGrid(this.image, topLeft, bottomLeft, bottomRight, correctedTopRight, dimensionTop, dimensionRight);
        }
        else {
            // The matrix is square
            var dimension = Math.min(dimensionRight, dimensionTop);
            // correct top right point to match the white module
            correctedTopRight = this.correctTopRight(bottomLeft, bottomRight, topLeft, topRight, dimension);
            if (correctedTopRight == null) {
                correctedTopRight = topRight;
            }
            // Redetermine the dimension using the corrected top right point
            var dimensionCorrected = Math.max(this.transitionsBetween(topLeft, correctedTopRight).getTransitions(), this.transitionsBetween(bottomRight, correctedTopRight).getTransitions());
            dimensionCorrected++;
            if ((dimensionCorrected & 0x01) === 1) {
                dimensionCorrected++;
            }
            bits = Detector.sampleGrid(this.image, topLeft, bottomLeft, bottomRight, correctedTopRight, dimensionCorrected, dimensionCorrected);
        }
        return new DetectorResult_1.default(bits, [topLeft, bottomLeft, bottomRight, correctedTopRight]);
    };
    /**
     * Calculates the position of the white top right module using the output of the rectangle detector
     * for a rectangular matrix
     */
    Detector.prototype.correctTopRightRectangular = function (bottomLeft, bottomRight, topLeft, topRight, dimensionTop, dimensionRight) {
        var corr = Detector.distance(bottomLeft, bottomRight) / dimensionTop;
        var norm = Detector.distance(topLeft, topRight);
        var cos = (topRight.getX() - topLeft.getX()) / norm;
        var sin = (topRight.getY() - topLeft.getY()) / norm;
        var c1 = new ResultPoint_1.default(topRight.getX() + corr * cos, topRight.getY() + corr * sin);
        corr = Detector.distance(bottomLeft, topLeft) / dimensionRight;
        norm = Detector.distance(bottomRight, topRight);
        cos = (topRight.getX() - bottomRight.getX()) / norm;
        sin = (topRight.getY() - bottomRight.getY()) / norm;
        var c2 = new ResultPoint_1.default(topRight.getX() + corr * cos, topRight.getY() + corr * sin);
        if (!this.isValid(c1)) {
            if (this.isValid(c2)) {
                return c2;
            }
            return null;
        }
        if (!this.isValid(c2)) {
            return c1;
        }
        var l1 = Math.abs(dimensionTop - this.transitionsBetween(topLeft, c1).getTransitions()) +
            Math.abs(dimensionRight - this.transitionsBetween(bottomRight, c1).getTransitions());
        var l2 = Math.abs(dimensionTop - this.transitionsBetween(topLeft, c2).getTransitions()) +
            Math.abs(dimensionRight - this.transitionsBetween(bottomRight, c2).getTransitions());
        if (l1 <= l2) {
            return c1;
        }
        return c2;
    };
    /**
     * Calculates the position of the white top right module using the output of the rectangle detector
     * for a square matrix
     */
    Detector.prototype.correctTopRight = function (bottomLeft, bottomRight, topLeft, topRight, dimension) {
        var corr = Detector.distance(bottomLeft, bottomRight) / dimension;
        var norm = Detector.distance(topLeft, topRight);
        var cos = (topRight.getX() - topLeft.getX()) / norm;
        var sin = (topRight.getY() - topLeft.getY()) / norm;
        var c1 = new ResultPoint_1.default(topRight.getX() + corr * cos, topRight.getY() + corr * sin);
        corr = Detector.distance(bottomLeft, topLeft) / dimension;
        norm = Detector.distance(bottomRight, topRight);
        cos = (topRight.getX() - bottomRight.getX()) / norm;
        sin = (topRight.getY() - bottomRight.getY()) / norm;
        var c2 = new ResultPoint_1.default(topRight.getX() + corr * cos, topRight.getY() + corr * sin);
        if (!this.isValid(c1)) {
            if (this.isValid(c2)) {
                return c2;
            }
            return null;
        }
        if (!this.isValid(c2)) {
            return c1;
        }
        var l1 = Math.abs(this.transitionsBetween(topLeft, c1).getTransitions() -
            this.transitionsBetween(bottomRight, c1).getTransitions());
        var l2 = Math.abs(this.transitionsBetween(topLeft, c2).getTransitions() -
            this.transitionsBetween(bottomRight, c2).getTransitions());
        return l1 <= l2 ? c1 : c2;
    };
    Detector.prototype.isValid = function (p) {
        return p.getX() >= 0 && p.getX() < this.image.getWidth() && p.getY() > 0 && p.getY() < this.image.getHeight();
    };
    Detector.distance = function (a, b) {
        return MathUtils_1.default.round(ResultPoint_1.default.distance(a, b));
    };
    /**
     * Increments the Integer associated with a key by one.
     */
    Detector.increment = function (table, key) {
        var value = table.get(key);
        table.set(key, value == null ? 1 : value + 1);
    };
    Detector.sampleGrid = function (image, topLeft, bottomLeft, bottomRight, topRight, dimensionX, dimensionY) {
        var sampler = GridSamplerInstance_1.default.getInstance();
        return sampler.sampleGrid(image, dimensionX, dimensionY, 0.5, 0.5, dimensionX - 0.5, 0.5, dimensionX - 0.5, dimensionY - 0.5, 0.5, dimensionY - 0.5, topLeft.getX(), topLeft.getY(), topRight.getX(), topRight.getY(), bottomRight.getX(), bottomRight.getY(), bottomLeft.getX(), bottomLeft.getY());
    };
    /**
     * Counts the number of black/white transitions between two points, using something like Bresenham's algorithm.
     */
    Detector.prototype.transitionsBetween = function (from, to) {
        // See QR Code Detector, sizeOfBlackWhiteBlackRun()
        var fromX = from.getX() | 0;
        var fromY = from.getY() | 0;
        var toX = to.getX() | 0;
        var toY = to.getY() | 0;
        var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
        if (steep) {
            var temp = fromX;
            fromX = fromY;
            fromY = temp;
            temp = toX;
            toX = toY;
            toY = temp;
        }
        var dx = Math.abs(toX - fromX);
        var dy = Math.abs(toY - fromY);
        var error = -dx / 2;
        var ystep = fromY < toY ? 1 : -1;
        var xstep = fromX < toX ? 1 : -1;
        var transitions = 0;
        var inBlack = this.image.get(steep ? fromY : fromX, steep ? fromX : fromY);
        for (var x = fromX, y = fromY; x !== toX; x += xstep) {
            var isBlack = this.image.get(steep ? y : x, steep ? x : y);
            if (isBlack !== inBlack) {
                transitions++;
                inBlack = isBlack;
            }
            error += dy;
            if (error > 0) {
                if (y === toY) {
                    break;
                }
                y += ystep;
                error -= dx;
            }
        }
        return new ResultPointsAndTransitions(from, to, transitions);
    };
    return Detector;
}());
exports.default = Detector;
var ResultPointsAndTransitions = /** @class */ (function () {
    function ResultPointsAndTransitions(from, to, transitions) {
        this.from = from;
        this.to = to;
        this.transitions = transitions;
    }
    ResultPointsAndTransitions.prototype.getFrom = function () {
        return this.from;
    };
    ResultPointsAndTransitions.prototype.getTo = function () {
        return this.to;
    };
    ResultPointsAndTransitions.prototype.getTransitions = function () {
        return this.transitions;
    };
    // @Override
    ResultPointsAndTransitions.prototype.toString = function () {
        return this.from + '/' + this.to + '/' + this.transitions;
    };
    ResultPointsAndTransitions.resultPointsAndTransitionsComparator = function (o1, o2) {
        return o1.getTransitions() - o2.getTransitions();
    };
    return ResultPointsAndTransitions;
}());
//# sourceMappingURL=Detector.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/Code128Reader.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/Code128Reader.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.oned {*/
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var Result_1 = __webpack_require__(/*! ../Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
var ResultPoint_1 = __webpack_require__(/*! ../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var OneDReader_1 = __webpack_require__(/*! ./OneDReader */ "./node_modules/@zxing/library/esm5/core/oned/OneDReader.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
var FormatException_1 = __webpack_require__(/*! ../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
var ChecksumException_1 = __webpack_require__(/*! ../ChecksumException */ "./node_modules/@zxing/library/esm5/core/ChecksumException.js");
/**
 * <p>Decodes Code 128 barcodes.</p>
 *
 * @author Sean Owen
 */
var Code128Reader = /** @class */ (function (_super) {
    __extends(Code128Reader, _super);
    function Code128Reader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Code128Reader.findStartPattern = function (row) {
        var width = row.getSize();
        var rowOffset = row.getNextSet(0);
        var counterPosition = 0;
        var counters = [0, 0, 0, 0, 0, 0];
        var patternStart = rowOffset;
        var isWhite = false;
        var patternLength = 6;
        for (var i = rowOffset; i < width; i++) {
            if (row.get(i) !== isWhite) {
                counters[counterPosition]++;
            }
            else {
                if (counterPosition === (patternLength - 1)) {
                    var bestVariance = Code128Reader.MAX_AVG_VARIANCE;
                    var bestMatch = -1;
                    for (var startCode = Code128Reader.CODE_START_A; startCode <= Code128Reader.CODE_START_C; startCode++) {
                        var variance = OneDReader_1.default.patternMatchVariance(counters, Code128Reader.CODE_PATTERNS[startCode], Code128Reader.MAX_INDIVIDUAL_VARIANCE);
                        if (variance < bestVariance) {
                            bestVariance = variance;
                            bestMatch = startCode;
                        }
                    }
                    // Look for whitespace before start pattern, >= 50% of width of start pattern
                    if (bestMatch >= 0 &&
                        row.isRange(Math.max(0, patternStart - (i - patternStart) / 2), patternStart, false)) {
                        return [patternStart, i, bestMatch];
                    }
                    patternStart += counters[0] + counters[1];
                    counters.splice(0, 2);
                    counters[counterPosition - 1] = 0;
                    counters[counterPosition] = 0;
                    counterPosition--;
                }
                else {
                    counterPosition++;
                }
                counters[counterPosition] = 1;
                isWhite = !isWhite;
            }
        }
        throw new NotFoundException_1.default();
    };
    Code128Reader.decodeCode = function (row, counters, rowOffset) {
        OneDReader_1.default.recordPattern(row, rowOffset, counters);
        var bestVariance = Code128Reader.MAX_AVG_VARIANCE; // worst variance we'll accept
        var bestMatch = -1;
        for (var d = 0; d < Code128Reader.CODE_PATTERNS.length; d++) {
            var pattern = Code128Reader.CODE_PATTERNS[d];
            var variance = this.patternMatchVariance(counters, pattern, Code128Reader.MAX_INDIVIDUAL_VARIANCE);
            if (variance < bestVariance) {
                bestVariance = variance;
                bestMatch = d;
            }
        }
        // TODO We're overlooking the fact that the STOP pattern has 7 values, not 6.
        if (bestMatch >= 0) {
            return bestMatch;
        }
        else {
            throw new NotFoundException_1.default();
        }
    };
    Code128Reader.prototype.decodeRow = function (rowNumber, row, hints) {
        var convertFNC1 = hints && (hints.get(7 /* ASSUME_GS1 */) === true);
        var startPatternInfo = Code128Reader.findStartPattern(row);
        var startCode = startPatternInfo[2];
        var currentRawCodesIndex = 0;
        var rawCodes = new Uint8Array(20);
        rawCodes[currentRawCodesIndex++] = startCode;
        var codeSet;
        switch (startCode) {
            case Code128Reader.CODE_START_A:
                codeSet = Code128Reader.CODE_CODE_A;
                break;
            case Code128Reader.CODE_START_B:
                codeSet = Code128Reader.CODE_CODE_B;
                break;
            case Code128Reader.CODE_START_C:
                codeSet = Code128Reader.CODE_CODE_C;
                break;
            default:
                throw new FormatException_1.default();
        }
        var done = false;
        var isNextShifted = false;
        var result = '';
        var lastStart = startPatternInfo[0];
        var nextStart = startPatternInfo[1];
        var counters = [0, 0, 0, 0, 0, 0];
        var lastCode = 0;
        var code = 0;
        var checksumTotal = startCode;
        var multiplier = 0;
        var lastCharacterWasPrintable = true;
        var upperMode = false;
        var shiftUpperMode = false;
        while (!done) {
            var unshift = isNextShifted;
            isNextShifted = false;
            // Save off last code
            lastCode = code;
            // Decode another code from image
            code = Code128Reader.decodeCode(row, counters, nextStart);
            rawCodes[currentRawCodesIndex++] = code;
            // Remember whether the last code was printable or not (excluding CODE_STOP)
            if (code !== Code128Reader.CODE_STOP) {
                lastCharacterWasPrintable = true;
            }
            // Add to checksum computation (if not CODE_STOP of course)
            if (code !== Code128Reader.CODE_STOP) {
                multiplier++;
                checksumTotal += multiplier * code;
            }
            // Advance to where the next code will to start
            lastStart = nextStart;
            nextStart += counters.reduce(function (previous, current) { return previous + current; }, 0);
            // Take care of illegal start codes
            switch (code) {
                case Code128Reader.CODE_START_A:
                case Code128Reader.CODE_START_B:
                case Code128Reader.CODE_START_C:
                    throw new FormatException_1.default();
            }
            switch (codeSet) {
                case Code128Reader.CODE_CODE_A:
                    if (code < 64) {
                        if (shiftUpperMode === upperMode) {
                            result += String.fromCharCode((' '.charCodeAt(0) + code));
                        }
                        else {
                            result += String.fromCharCode((' '.charCodeAt(0) + code + 128));
                        }
                        shiftUpperMode = false;
                    }
                    else if (code < 96) {
                        if (shiftUpperMode === upperMode) {
                            result += String.fromCharCode((code - 64));
                        }
                        else {
                            result += String.fromCharCode((code + 64));
                        }
                        shiftUpperMode = false;
                    }
                    else {
                        // Don't let CODE_STOP, which always appears, affect whether whether we think the last
                        // code was printable or not.
                        if (code !== Code128Reader.CODE_STOP) {
                            lastCharacterWasPrintable = false;
                        }
                        switch (code) {
                            case Code128Reader.CODE_FNC_1:
                                if (convertFNC1) {
                                    if (result.length === 0) {
                                        // GS1 specification 5.4.3.7. and 5.4.6.4. If the first char after the start code
                                        // is FNC1 then this is GS1-128. We add the symbology identifier.
                                        result += ']C1';
                                    }
                                    else {
                                        // GS1 specification 5.4.7.5. Every subsequent FNC1 is returned as ASCII 29 (GS)
                                        result += String.fromCharCode(29);
                                    }
                                }
                                break;
                            case Code128Reader.CODE_FNC_2:
                            case Code128Reader.CODE_FNC_3:
                                // do nothing?
                                break;
                            case Code128Reader.CODE_FNC_4_A:
                                if (!upperMode && shiftUpperMode) {
                                    upperMode = true;
                                    shiftUpperMode = false;
                                }
                                else if (upperMode && shiftUpperMode) {
                                    upperMode = false;
                                    shiftUpperMode = false;
                                }
                                else {
                                    shiftUpperMode = true;
                                }
                                break;
                            case Code128Reader.CODE_SHIFT:
                                isNextShifted = true;
                                codeSet = Code128Reader.CODE_CODE_B;
                                break;
                            case Code128Reader.CODE_CODE_B:
                                codeSet = Code128Reader.CODE_CODE_B;
                                break;
                            case Code128Reader.CODE_CODE_C:
                                codeSet = Code128Reader.CODE_CODE_C;
                                break;
                            case Code128Reader.CODE_STOP:
                                done = true;
                                break;
                        }
                    }
                    break;
                case Code128Reader.CODE_CODE_B:
                    if (code < 96) {
                        if (shiftUpperMode === upperMode) {
                            result += String.fromCharCode((' '.charCodeAt(0) + code));
                        }
                        else {
                            result += String.fromCharCode((' '.charCodeAt(0) + code + 128));
                        }
                        shiftUpperMode = false;
                    }
                    else {
                        if (code !== Code128Reader.CODE_STOP) {
                            lastCharacterWasPrintable = false;
                        }
                        switch (code) {
                            case Code128Reader.CODE_FNC_1:
                                if (convertFNC1) {
                                    if (result.length === 0) {
                                        // GS1 specification 5.4.3.7. and 5.4.6.4. If the first char after the start code
                                        // is FNC1 then this is GS1-128. We add the symbology identifier.
                                        result += ']C1';
                                    }
                                    else {
                                        // GS1 specification 5.4.7.5. Every subsequent FNC1 is returned as ASCII 29 (GS)
                                        result += String.fromCharCode(29);
                                    }
                                }
                                break;
                            case Code128Reader.CODE_FNC_2:
                            case Code128Reader.CODE_FNC_3:
                                // do nothing?
                                break;
                            case Code128Reader.CODE_FNC_4_B:
                                if (!upperMode && shiftUpperMode) {
                                    upperMode = true;
                                    shiftUpperMode = false;
                                }
                                else if (upperMode && shiftUpperMode) {
                                    upperMode = false;
                                    shiftUpperMode = false;
                                }
                                else {
                                    shiftUpperMode = true;
                                }
                                break;
                            case Code128Reader.CODE_SHIFT:
                                isNextShifted = true;
                                codeSet = Code128Reader.CODE_CODE_A;
                                break;
                            case Code128Reader.CODE_CODE_A:
                                codeSet = Code128Reader.CODE_CODE_A;
                                break;
                            case Code128Reader.CODE_CODE_C:
                                codeSet = Code128Reader.CODE_CODE_C;
                                break;
                            case Code128Reader.CODE_STOP:
                                done = true;
                                break;
                        }
                    }
                    break;
                case Code128Reader.CODE_CODE_C:
                    if (code < 100) {
                        if (code < 10) {
                            result += '0';
                        }
                        result += code;
                    }
                    else {
                        if (code !== Code128Reader.CODE_STOP) {
                            lastCharacterWasPrintable = false;
                        }
                        switch (code) {
                            case Code128Reader.CODE_FNC_1:
                                if (convertFNC1) {
                                    if (result.length === 0) {
                                        // GS1 specification 5.4.3.7. and 5.4.6.4. If the first char after the start code
                                        // is FNC1 then this is GS1-128. We add the symbology identifier.
                                        result += ']C1';
                                    }
                                    else {
                                        // GS1 specification 5.4.7.5. Every subsequent FNC1 is returned as ASCII 29 (GS)
                                        result += String.fromCharCode(29);
                                    }
                                }
                                break;
                            case Code128Reader.CODE_CODE_A:
                                codeSet = Code128Reader.CODE_CODE_A;
                                break;
                            case Code128Reader.CODE_CODE_B:
                                codeSet = Code128Reader.CODE_CODE_B;
                                break;
                            case Code128Reader.CODE_STOP:
                                done = true;
                                break;
                        }
                    }
                    break;
            }
            // Unshift back to another code set if we were shifted
            if (unshift) {
                codeSet = codeSet === Code128Reader.CODE_CODE_A ? Code128Reader.CODE_CODE_B : Code128Reader.CODE_CODE_A;
            }
        }
        var lastPatternSize = nextStart - lastStart;
        // Check for ample whitespace following pattern, but, to do this we first need to remember that
        // we fudged decoding CODE_STOP since it actually has 7 bars, not 6. There is a black bar left
        // to read off. Would be slightly better to properly read. Here we just skip it:
        nextStart = row.getNextUnset(nextStart);
        if (!row.isRange(nextStart, Math.min(row.getSize(), nextStart + (nextStart - lastStart) / 2), false)) {
            throw new NotFoundException_1.default();
        }
        // Pull out from sum the value of the penultimate check code
        checksumTotal -= multiplier * lastCode;
        // lastCode is the checksum then:
        if (checksumTotal % 103 !== lastCode) {
            throw new ChecksumException_1.default();
        }
        // Need to pull out the check digits from string
        var resultLength = result.length;
        if (resultLength === 0) {
            // false positive
            throw new NotFoundException_1.default();
        }
        // Only bother if the result had at least one character, and if the checksum digit happened to
        // be a printable character. If it was just interpreted as a control code, nothing to remove.
        if (resultLength > 0 && lastCharacterWasPrintable) {
            if (codeSet === Code128Reader.CODE_CODE_C) {
                result = result.substring(0, resultLength - 2);
            }
            else {
                result = result.substring(0, resultLength - 1);
            }
        }
        var left = (startPatternInfo[1] + startPatternInfo[0]) / 2.0;
        var right = lastStart + lastPatternSize / 2.0;
        var rawCodesSize = rawCodes.length;
        var rawBytes = new Uint8Array(rawCodesSize);
        for (var i = 0; i < rawCodesSize; i++) {
            rawBytes[i] = rawCodes[i];
        }
        var points = [new ResultPoint_1.default(left, rowNumber), new ResultPoint_1.default(right, rowNumber)];
        return new Result_1.default(result, rawBytes, 0, points, BarcodeFormat_1.default.CODE_128, new Date().getTime());
    };
    Code128Reader.CODE_PATTERNS = [
        [2, 1, 2, 2, 2, 2],
        [2, 2, 2, 1, 2, 2],
        [2, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 2, 3],
        [1, 2, 1, 3, 2, 2],
        [1, 3, 1, 2, 2, 2],
        [1, 2, 2, 2, 1, 3],
        [1, 2, 2, 3, 1, 2],
        [1, 3, 2, 2, 1, 2],
        [2, 2, 1, 2, 1, 3],
        [2, 2, 1, 3, 1, 2],
        [2, 3, 1, 2, 1, 2],
        [1, 1, 2, 2, 3, 2],
        [1, 2, 2, 1, 3, 2],
        [1, 2, 2, 2, 3, 1],
        [1, 1, 3, 2, 2, 2],
        [1, 2, 3, 1, 2, 2],
        [1, 2, 3, 2, 2, 1],
        [2, 2, 3, 2, 1, 1],
        [2, 2, 1, 1, 3, 2],
        [2, 2, 1, 2, 3, 1],
        [2, 1, 3, 2, 1, 2],
        [2, 2, 3, 1, 1, 2],
        [3, 1, 2, 1, 3, 1],
        [3, 1, 1, 2, 2, 2],
        [3, 2, 1, 1, 2, 2],
        [3, 2, 1, 2, 2, 1],
        [3, 1, 2, 2, 1, 2],
        [3, 2, 2, 1, 1, 2],
        [3, 2, 2, 2, 1, 1],
        [2, 1, 2, 1, 2, 3],
        [2, 1, 2, 3, 2, 1],
        [2, 3, 2, 1, 2, 1],
        [1, 1, 1, 3, 2, 3],
        [1, 3, 1, 1, 2, 3],
        [1, 3, 1, 3, 2, 1],
        [1, 1, 2, 3, 1, 3],
        [1, 3, 2, 1, 1, 3],
        [1, 3, 2, 3, 1, 1],
        [2, 1, 1, 3, 1, 3],
        [2, 3, 1, 1, 1, 3],
        [2, 3, 1, 3, 1, 1],
        [1, 1, 2, 1, 3, 3],
        [1, 1, 2, 3, 3, 1],
        [1, 3, 2, 1, 3, 1],
        [1, 1, 3, 1, 2, 3],
        [1, 1, 3, 3, 2, 1],
        [1, 3, 3, 1, 2, 1],
        [3, 1, 3, 1, 2, 1],
        [2, 1, 1, 3, 3, 1],
        [2, 3, 1, 1, 3, 1],
        [2, 1, 3, 1, 1, 3],
        [2, 1, 3, 3, 1, 1],
        [2, 1, 3, 1, 3, 1],
        [3, 1, 1, 1, 2, 3],
        [3, 1, 1, 3, 2, 1],
        [3, 3, 1, 1, 2, 1],
        [3, 1, 2, 1, 1, 3],
        [3, 1, 2, 3, 1, 1],
        [3, 3, 2, 1, 1, 1],
        [3, 1, 4, 1, 1, 1],
        [2, 2, 1, 4, 1, 1],
        [4, 3, 1, 1, 1, 1],
        [1, 1, 1, 2, 2, 4],
        [1, 1, 1, 4, 2, 2],
        [1, 2, 1, 1, 2, 4],
        [1, 2, 1, 4, 2, 1],
        [1, 4, 1, 1, 2, 2],
        [1, 4, 1, 2, 2, 1],
        [1, 1, 2, 2, 1, 4],
        [1, 1, 2, 4, 1, 2],
        [1, 2, 2, 1, 1, 4],
        [1, 2, 2, 4, 1, 1],
        [1, 4, 2, 1, 1, 2],
        [1, 4, 2, 2, 1, 1],
        [2, 4, 1, 2, 1, 1],
        [2, 2, 1, 1, 1, 4],
        [4, 1, 3, 1, 1, 1],
        [2, 4, 1, 1, 1, 2],
        [1, 3, 4, 1, 1, 1],
        [1, 1, 1, 2, 4, 2],
        [1, 2, 1, 1, 4, 2],
        [1, 2, 1, 2, 4, 1],
        [1, 1, 4, 2, 1, 2],
        [1, 2, 4, 1, 1, 2],
        [1, 2, 4, 2, 1, 1],
        [4, 1, 1, 2, 1, 2],
        [4, 2, 1, 1, 1, 2],
        [4, 2, 1, 2, 1, 1],
        [2, 1, 2, 1, 4, 1],
        [2, 1, 4, 1, 2, 1],
        [4, 1, 2, 1, 2, 1],
        [1, 1, 1, 1, 4, 3],
        [1, 1, 1, 3, 4, 1],
        [1, 3, 1, 1, 4, 1],
        [1, 1, 4, 1, 1, 3],
        [1, 1, 4, 3, 1, 1],
        [4, 1, 1, 1, 1, 3],
        [4, 1, 1, 3, 1, 1],
        [1, 1, 3, 1, 4, 1],
        [1, 1, 4, 1, 3, 1],
        [3, 1, 1, 1, 4, 1],
        [4, 1, 1, 1, 3, 1],
        [2, 1, 1, 4, 1, 2],
        [2, 1, 1, 2, 1, 4],
        [2, 1, 1, 2, 3, 2],
        [2, 3, 3, 1, 1, 1, 2]
    ];
    Code128Reader.MAX_AVG_VARIANCE = 0.25;
    Code128Reader.MAX_INDIVIDUAL_VARIANCE = 0.7;
    Code128Reader.CODE_SHIFT = 98;
    Code128Reader.CODE_CODE_C = 99;
    Code128Reader.CODE_CODE_B = 100;
    Code128Reader.CODE_CODE_A = 101;
    Code128Reader.CODE_FNC_1 = 102;
    Code128Reader.CODE_FNC_2 = 97;
    Code128Reader.CODE_FNC_3 = 96;
    Code128Reader.CODE_FNC_4_A = 101;
    Code128Reader.CODE_FNC_4_B = 100;
    Code128Reader.CODE_START_A = 103;
    Code128Reader.CODE_START_B = 104;
    Code128Reader.CODE_START_C = 105;
    Code128Reader.CODE_STOP = 106;
    return Code128Reader;
}(OneDReader_1.default));
exports.default = Code128Reader;
//# sourceMappingURL=Code128Reader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/Code39Reader.js":
/*!********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/Code39Reader.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.oned {*/
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var ChecksumException_1 = __webpack_require__(/*! ../ChecksumException */ "./node_modules/@zxing/library/esm5/core/ChecksumException.js");
var FormatException_1 = __webpack_require__(/*! ../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
var OneDReader_1 = __webpack_require__(/*! ./OneDReader */ "./node_modules/@zxing/library/esm5/core/oned/OneDReader.js");
var Result_1 = __webpack_require__(/*! ../Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
var ResultPoint_1 = __webpack_require__(/*! ../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
/**
 * <p>Decodes Code 39 barcodes. Supports "Full ASCII Code 39" if USE_CODE_39_EXTENDED_MODE is set.</p>
 *
 * @author Sean Owen
 * @see Code93Reader
 */
var Code39Reader = /** @class */ (function (_super) {
    __extends(Code39Reader, _super);
    /**
     * Creates a reader that assumes all encoded data is data, and does not treat the final
     * character as a check digit. It will not decoded "extended Code 39" sequences.
     */
    // public Code39Reader() {
    //   this(false);
    // }
    /**
     * Creates a reader that can be configured to check the last character as a check digit.
     * It will not decoded "extended Code 39" sequences.
     *
     * @param usingCheckDigit if true, treat the last data character as a check digit, not
     * data, and verify that the checksum passes.
     */
    // public Code39Reader(boolean usingCheckDigit) {
    //   this(usingCheckDigit, false);
    // }
    /**
     * Creates a reader that can be configured to check the last character as a check digit,
     * or optionally attempt to decode "extended Code 39" sequences that are used to encode
     * the full ASCII character set.
     *
     * @param usingCheckDigit if true, treat the last data character as a check digit, not
     * data, and verify that the checksum passes.
     * @param extendedMode if true, will attempt to decode extended Code 39 sequences in the
     * text.
     */
    function Code39Reader(usingCheckDigit, extendedMode) {
        if (usingCheckDigit === void 0) { usingCheckDigit = false; }
        if (extendedMode === void 0) { extendedMode = false; }
        var _this = _super.call(this) || this;
        _this.usingCheckDigit = usingCheckDigit;
        _this.extendedMode = extendedMode;
        _this.decodeRowResult = '';
        _this.counters = new Array(9);
        return _this;
    }
    Code39Reader.prototype.decodeRow = function (rowNumber, row, hints) {
        var theCounters = this.counters;
        theCounters.fill(0);
        this.decodeRowResult = '';
        var start = Code39Reader.findAsteriskPattern(row, theCounters);
        // Read off white space
        var nextStart = row.getNextSet(start[1]);
        var end = row.getSize();
        var decodedChar;
        var lastStart;
        do {
            Code39Reader.recordPattern(row, nextStart, theCounters);
            var pattern = Code39Reader.toNarrowWidePattern(theCounters);
            if (pattern < 0) {
                throw new NotFoundException_1.default();
            }
            decodedChar = Code39Reader.patternToChar(pattern);
            this.decodeRowResult += decodedChar;
            lastStart = nextStart;
            for (var _i = 0, theCounters_1 = theCounters; _i < theCounters_1.length; _i++) {
                var counter = theCounters_1[_i];
                nextStart += counter;
            }
            // Read off white space
            nextStart = row.getNextSet(nextStart);
        } while (decodedChar !== '*');
        this.decodeRowResult = this.decodeRowResult.substring(0, this.decodeRowResult.length - 1); // remove asterisk
        // Look for whitespace after pattern:
        var lastPatternSize = 0;
        for (var _a = 0, theCounters_2 = theCounters; _a < theCounters_2.length; _a++) {
            var counter = theCounters_2[_a];
            lastPatternSize += counter;
        }
        var whiteSpaceAfterEnd = nextStart - lastStart - lastPatternSize;
        // If 50% of last pattern size, following last pattern, is not whitespace, fail
        // (but if it's whitespace to the very end of the image, that's OK)
        if (nextStart !== end && (whiteSpaceAfterEnd * 2) < lastPatternSize) {
            throw new NotFoundException_1.default();
        }
        if (this.usingCheckDigit) {
            var max = this.decodeRowResult.length - 1;
            var total = 0;
            for (var i = 0; i < max; i++) {
                total += Code39Reader.ALPHABET_STRING.indexOf(this.decodeRowResult.charAt(i));
            }
            if (this.decodeRowResult.charAt(max) !== Code39Reader.ALPHABET_STRING.charAt(total % 43)) {
                throw new ChecksumException_1.default();
            }
            this.decodeRowResult = this.decodeRowResult.substring(0, max);
        }
        if (this.decodeRowResult.length === 0) {
            // false positive
            throw new NotFoundException_1.default();
        }
        var resultString;
        if (this.extendedMode) {
            resultString = Code39Reader.decodeExtended(this.decodeRowResult);
        }
        else {
            resultString = this.decodeRowResult;
        }
        var left = (start[1] + start[0]) / 2.0;
        var right = lastStart + lastPatternSize / 2.0;
        return new Result_1.default(resultString, null, 0, [new ResultPoint_1.default(left, rowNumber), new ResultPoint_1.default(right, rowNumber)], BarcodeFormat_1.default.CODE_39, new Date().getTime());
    };
    Code39Reader.findAsteriskPattern = function (row, counters) {
        var width = row.getSize();
        var rowOffset = row.getNextSet(0);
        var counterPosition = 0;
        var patternStart = rowOffset;
        var isWhite = false;
        var patternLength = counters.length;
        for (var i = rowOffset; i < width; i++) {
            if (row.get(i) !== isWhite) {
                counters[counterPosition]++;
            }
            else {
                if (counterPosition === patternLength - 1) {
                    // Look for whitespace before start pattern, >= 50% of width of start pattern
                    if (this.toNarrowWidePattern(counters) === Code39Reader.ASTERISK_ENCODING &&
                        row.isRange(Math.max(0, patternStart - Math.floor((i - patternStart) / 2)), patternStart, false)) {
                        return [patternStart, i];
                    }
                    patternStart += counters[0] + counters[1];
                    counters.copyWithin(0, 2, 2 + counterPosition - 1);
                    counters[counterPosition - 1] = 0;
                    counters[counterPosition] = 0;
                    counterPosition--;
                }
                else {
                    counterPosition++;
                }
                counters[counterPosition] = 1;
                isWhite = !isWhite;
            }
        }
        throw new NotFoundException_1.default();
    };
    // For efficiency, returns -1 on failure. Not throwing here saved as many as 700 exceptions
    // per image when using some of our blackbox images.
    Code39Reader.toNarrowWidePattern = function (counters) {
        var numCounters = counters.length;
        var maxNarrowCounter = 0;
        var wideCounters;
        do {
            var minCounter = 0x7fffffff;
            for (var _i = 0, counters_1 = counters; _i < counters_1.length; _i++) {
                var counter = counters_1[_i];
                if (counter < minCounter && counter > maxNarrowCounter) {
                    minCounter = counter;
                }
            }
            maxNarrowCounter = minCounter;
            wideCounters = 0;
            var totalWideCountersWidth = 0;
            var pattern = 0;
            for (var i = 0; i < numCounters; i++) {
                var counter = counters[i];
                if (counter > maxNarrowCounter) {
                    pattern |= 1 << (numCounters - 1 - i);
                    wideCounters++;
                    totalWideCountersWidth += counter;
                }
            }
            if (wideCounters === 3) {
                // Found 3 wide counters, but are they close enough in width?
                // We can perform a cheap, conservative check to see if any individual
                // counter is more than 1.5 times the average:
                for (var i = 0; i < numCounters && wideCounters > 0; i++) {
                    var counter = counters[i];
                    if (counter > maxNarrowCounter) {
                        wideCounters--;
                        // totalWideCountersWidth = 3 * average, so this checks if counter >= 3/2 * average
                        if ((counter * 2) >= totalWideCountersWidth) {
                            return -1;
                        }
                    }
                }
                return pattern;
            }
        } while (wideCounters > 3);
        return -1;
    };
    Code39Reader.patternToChar = function (pattern) {
        for (var i = 0; i < Code39Reader.CHARACTER_ENCODINGS.length; i++) {
            if (Code39Reader.CHARACTER_ENCODINGS[i] === pattern) {
                return Code39Reader.ALPHABET_STRING.charAt(i);
            }
        }
        if (pattern === Code39Reader.ASTERISK_ENCODING) {
            return '*';
        }
        throw new NotFoundException_1.default();
    };
    Code39Reader.decodeExtended = function (encoded) {
        var length = encoded.length;
        var decoded = '';
        for (var i = 0; i < length; i++) {
            var c = encoded.charAt(i);
            if (c === '+' || c === '$' || c === '%' || c === '/') {
                var next = encoded.charAt(i + 1);
                var decodedChar = '\0';
                switch (c) {
                    case '+':
                        // +A to +Z map to a to z
                        if (next >= 'A' && next <= 'Z') {
                            decodedChar = String.fromCharCode(next.charCodeAt(0) + 32);
                        }
                        else {
                            throw new FormatException_1.default();
                        }
                        break;
                    case '$':
                        // $A to $Z map to control codes SH to SB
                        if (next >= 'A' && next <= 'Z') {
                            decodedChar = String.fromCharCode(next.charCodeAt(0) - 64);
                        }
                        else {
                            throw new FormatException_1.default();
                        }
                        break;
                    case '%':
                        // %A to %E map to control codes ESC to US
                        if (next >= 'A' && next <= 'E') {
                            decodedChar = String.fromCharCode(next.charCodeAt(0) - 38);
                        }
                        else if (next >= 'F' && next <= 'J') {
                            decodedChar = String.fromCharCode(next.charCodeAt(0) - 11);
                        }
                        else if (next >= 'K' && next <= 'O') {
                            decodedChar = String.fromCharCode(next.charCodeAt(0) + 16);
                        }
                        else if (next >= 'P' && next <= 'T') {
                            decodedChar = String.fromCharCode(next.charCodeAt(0) + 43);
                        }
                        else if (next === 'U') {
                            decodedChar = '\0';
                        }
                        else if (next === 'V') {
                            decodedChar = '@';
                        }
                        else if (next === 'W') {
                            decodedChar = '`';
                        }
                        else if (next === 'X' || next === 'Y' || next === 'Z') {
                            decodedChar = '\x7f';
                        }
                        else {
                            throw new FormatException_1.default();
                        }
                        break;
                    case '/':
                        // /A to /O map to ! to , and /Z maps to :
                        if (next >= 'A' && next <= 'O') {
                            decodedChar = String.fromCharCode(next.charCodeAt(0) - 32);
                        }
                        else if (next === 'Z') {
                            decodedChar = ':';
                        }
                        else {
                            throw new FormatException_1.default();
                        }
                        break;
                }
                decoded += decodedChar;
                // bump up i again since we read two characters
                i++;
            }
            else {
                decoded += c;
            }
        }
        return decoded;
    };
    Code39Reader.ALPHABET_STRING = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%';
    /**
     * These represent the encodings of characters, as patterns of wide and narrow bars.
     * The 9 least-significant bits of each int correspond to the pattern of wide and narrow,
     * with 1s representing "wide" and 0s representing narrow.
     */
    Code39Reader.CHARACTER_ENCODINGS = [
        0x034, 0x121, 0x061, 0x160, 0x031, 0x130, 0x070, 0x025, 0x124, 0x064,
        0x109, 0x049, 0x148, 0x019, 0x118, 0x058, 0x00D, 0x10C, 0x04C, 0x01C,
        0x103, 0x043, 0x142, 0x013, 0x112, 0x052, 0x007, 0x106, 0x046, 0x016,
        0x181, 0x0C1, 0x1C0, 0x091, 0x190, 0x0D0, 0x085, 0x184, 0x0C4, 0x0A8,
        0x0A2, 0x08A, 0x02A // /-%
    ];
    Code39Reader.ASTERISK_ENCODING = 0x094;
    return Code39Reader;
}(OneDReader_1.default));
exports.default = Code39Reader;
//# sourceMappingURL=Code39Reader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/EAN13Reader.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/EAN13Reader.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var UPCEANReader_1 = __webpack_require__(/*! ./UPCEANReader */ "./node_modules/@zxing/library/esm5/core/oned/UPCEANReader.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * <p>Implements decoding of the EAN-13 format.</p>
 *
 * @author dswitkin@google.com (Daniel Switkin)
 * @author Sean Owen
 * @author alasdair@google.com (Alasdair Mackintosh)
 */
var EAN13Reader = /** @class */ (function (_super) {
    __extends(EAN13Reader, _super);
    function EAN13Reader() {
        var _this = _super.call(this) || this;
        _this.decodeMiddleCounters = [0, 0, 0, 0];
        return _this;
    }
    EAN13Reader.prototype.decodeMiddle = function (row, startRange, resultString) {
        var counters = this.decodeMiddleCounters;
        counters[0] = 0;
        counters[1] = 0;
        counters[2] = 0;
        counters[3] = 0;
        var end = row.getSize();
        var rowOffset = startRange[1];
        var lgPatternFound = 0;
        for (var x = 0; x < 6 && rowOffset < end; x++) {
            var bestMatch = UPCEANReader_1.default.decodeDigit(row, counters, rowOffset, UPCEANReader_1.default.L_AND_G_PATTERNS);
            resultString += String.fromCharCode(('0'.charCodeAt(0) + bestMatch % 10));
            for (var _i = 0, counters_1 = counters; _i < counters_1.length; _i++) {
                var counter = counters_1[_i];
                rowOffset += counter;
            }
            if (bestMatch >= 10) {
                lgPatternFound |= 1 << (5 - x);
            }
        }
        resultString = EAN13Reader.determineFirstDigit(resultString, lgPatternFound);
        var middleRange = UPCEANReader_1.default.findGuardPattern(row, rowOffset, true, UPCEANReader_1.default.MIDDLE_PATTERN, new Array(UPCEANReader_1.default.MIDDLE_PATTERN.length).fill(0));
        rowOffset = middleRange[1];
        for (var x = 0; x < 6 && rowOffset < end; x++) {
            var bestMatch = UPCEANReader_1.default.decodeDigit(row, counters, rowOffset, UPCEANReader_1.default.L_PATTERNS);
            resultString += String.fromCharCode(('0'.charCodeAt(0) + bestMatch));
            for (var _a = 0, counters_2 = counters; _a < counters_2.length; _a++) {
                var counter = counters_2[_a];
                rowOffset += counter;
            }
        }
        return { rowOffset: rowOffset, resultString: resultString };
    };
    EAN13Reader.prototype.getBarcodeFormat = function () {
        return BarcodeFormat_1.default.EAN_13;
    };
    EAN13Reader.determineFirstDigit = function (resultString, lgPatternFound) {
        for (var d = 0; d < 10; d++) {
            if (lgPatternFound === this.FIRST_DIGIT_ENCODINGS[d]) {
                resultString = String.fromCharCode(('0'.charCodeAt(0) + d)) + resultString;
                return resultString;
            }
        }
        throw new NotFoundException_1.default();
    };
    EAN13Reader.FIRST_DIGIT_ENCODINGS = [0x00, 0x0B, 0x0D, 0xE, 0x13, 0x19, 0x1C, 0x15, 0x16, 0x1A];
    return EAN13Reader;
}(UPCEANReader_1.default));
exports.default = EAN13Reader;
//# sourceMappingURL=EAN13Reader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/ITFReader.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/ITFReader.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.oned {*/
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var Result_1 = __webpack_require__(/*! ../Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
var ResultPoint_1 = __webpack_require__(/*! ../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var OneDReader_1 = __webpack_require__(/*! ./OneDReader */ "./node_modules/@zxing/library/esm5/core/oned/OneDReader.js");
var StringBuilder_1 = __webpack_require__(/*! ../util/StringBuilder */ "./node_modules/@zxing/library/esm5/core/util/StringBuilder.js");
var System_1 = __webpack_require__(/*! ../util/System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var FormatException_1 = __webpack_require__(/*! ../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * <p>Decodes ITF barcodes.</p>
 *
 * @author Tjieco
 */
var ITFReader = /** @class */ (function (_super) {
    __extends(ITFReader, _super);
    function ITFReader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Stores the actual narrow line width of the image being decoded.
        _this.narrowLineWidth = -1;
        return _this;
    }
    // See ITFWriter.PATTERNS
    /*

    /!**
     * Patterns of Wide / Narrow lines to indicate each digit
     *!/
    */
    ITFReader.prototype.decodeRow = function (rowNumber, row, hints) {
        // Find out where the Middle section (payload) starts & ends
        var startRange = this.decodeStart(row);
        var endRange = this.decodeEnd(row);
        var result = new StringBuilder_1.default();
        ITFReader.decodeMiddle(row, startRange[1], endRange[0], result);
        var resultString = result.toString();
        var allowedLengths = null;
        if (hints != null) {
            allowedLengths = hints.get(5 /* ALLOWED_LENGTHS */);
        }
        if (allowedLengths == null) {
            allowedLengths = ITFReader.DEFAULT_ALLOWED_LENGTHS;
        }
        // To avoid false positives with 2D barcodes (and other patterns), make
        // an assumption that the decoded string must be a 'standard' length if it's short
        var length = resultString.length;
        var lengthOK = false;
        var maxAllowedLength = 0;
        for (var _i = 0, allowedLengths_1 = allowedLengths; _i < allowedLengths_1.length; _i++) {
            var value = allowedLengths_1[_i];
            if (length === value) {
                lengthOK = true;
                break;
            }
            if (value > maxAllowedLength) {
                maxAllowedLength = value;
            }
        }
        if (!lengthOK && length > maxAllowedLength) {
            lengthOK = true;
        }
        if (!lengthOK) {
            throw new FormatException_1.default();
        }
        var points = [new ResultPoint_1.default(startRange[1], rowNumber), new ResultPoint_1.default(endRange[0], rowNumber)];
        var resultReturn = new Result_1.default(resultString, null, // no natural byte representation for these barcodes
        0, points, BarcodeFormat_1.default.ITF, new Date().getTime());
        return resultReturn;
    };
    /*
    /!**
     * @param row          row of black/white values to search
     * @param payloadStart offset of start pattern
     * @param resultString {@link StringBuilder} to append decoded chars to
     * @throws NotFoundException if decoding could not complete successfully
     *!/*/
    ITFReader.decodeMiddle = function (row, payloadStart, payloadEnd, resultString) {
        // Digits are interleaved in pairs - 5 black lines for one digit, and the
        // 5
        // interleaved white lines for the second digit.
        // Therefore, need to scan 10 lines and then
        // split these into two arrays
        var counterDigitPair = new Array(10); // 10
        var counterBlack = new Array(5); // 5
        var counterWhite = new Array(5); // 5
        counterDigitPair.fill(0);
        counterBlack.fill(0);
        counterWhite.fill(0);
        while (payloadStart < payloadEnd) {
            // Get 10 runs of black/white.
            OneDReader_1.default.recordPattern(row, payloadStart, counterDigitPair);
            // Split them into each array
            for (var k = 0; k < 5; k++) {
                var twoK = 2 * k;
                counterBlack[k] = counterDigitPair[twoK];
                counterWhite[k] = counterDigitPair[twoK + 1];
            }
            var bestMatch = ITFReader.decodeDigit(counterBlack);
            resultString.append(bestMatch.toString());
            bestMatch = this.decodeDigit(counterWhite);
            resultString.append(bestMatch.toString());
            counterDigitPair.forEach(function (counterDigit) {
                payloadStart += counterDigit;
            });
        }
    };
    /*/!**
     * Identify where the start of the middle / payload section starts.
     *
     * @param row row of black/white values to search
     * @return Array, containing index of start of 'start block' and end of
     *         'start block'
     *!/*/
    ITFReader.prototype.decodeStart = function (row) {
        var endStart = ITFReader.skipWhiteSpace(row);
        var startPattern = ITFReader.findGuardPattern(row, endStart, ITFReader.START_PATTERN);
        // Determine the width of a narrow line in pixels. We can do this by
        // getting the width of the start pattern and dividing by 4 because its
        // made up of 4 narrow lines.
        this.narrowLineWidth = (startPattern[1] - startPattern[0]) / 4;
        this.validateQuietZone(row, startPattern[0]);
        return startPattern;
    };
    /*/!**
     * The start & end patterns must be pre/post fixed by a quiet zone. This
     * zone must be at least 10 times the width of a narrow line.  Scan back until
     * we either get to the start of the barcode or match the necessary number of
     * quiet zone pixels.
     *
     * Note: Its assumed the row is reversed when using this method to find
     * quiet zone after the end pattern.
     *
     * ref: http://www.barcode-1.net/i25code.html
     *
     * @param row bit array representing the scanned barcode.
     * @param startPattern index into row of the start or end pattern.
     * @throws NotFoundException if the quiet zone cannot be found
     *!/*/
    ITFReader.prototype.validateQuietZone = function (row, startPattern) {
        var quietCount = this.narrowLineWidth * 10; // expect to find this many pixels of quiet zone
        // if there are not so many pixel at all let's try as many as possible
        quietCount = quietCount < startPattern ? quietCount : startPattern;
        for (var i = startPattern - 1; quietCount > 0 && i >= 0; i--) {
            if (row.get(i)) {
                break;
            }
            quietCount--;
        }
        if (quietCount !== 0) {
            // Unable to find the necessary number of quiet zone pixels.
            throw new NotFoundException_1.default();
        }
    };
    /*
    /!**
     * Skip all whitespace until we get to the first black line.
     *
     * @param row row of black/white values to search
     * @return index of the first black line.
     * @throws NotFoundException Throws exception if no black lines are found in the row
     *!/*/
    ITFReader.skipWhiteSpace = function (row) {
        var width = row.getSize();
        var endStart = row.getNextSet(0);
        if (endStart === width) {
            throw new NotFoundException_1.default();
        }
        return endStart;
    };
    /*/!**
     * Identify where the end of the middle / payload section ends.
     *
     * @param row row of black/white values to search
     * @return Array, containing index of start of 'end block' and end of 'end
     *         block'
     *!/*/
    ITFReader.prototype.decodeEnd = function (row) {
        // For convenience, reverse the row and then
        // search from 'the start' for the end block
        row.reverse();
        try {
            var endStart = ITFReader.skipWhiteSpace(row);
            var endPattern = void 0;
            try {
                endPattern = ITFReader.findGuardPattern(row, endStart, ITFReader.END_PATTERN_REVERSED[0]);
            }
            catch (NotFoundException) {
                endPattern = ITFReader.findGuardPattern(row, endStart, ITFReader.END_PATTERN_REVERSED[1]);
            }
            // The start & end patterns must be pre/post fixed by a quiet zone. This
            // zone must be at least 10 times the width of a narrow line.
            // ref: http://www.barcode-1.net/i25code.html
            this.validateQuietZone(row, endPattern[0]);
            // Now recalculate the indices of where the 'endblock' starts & stops to
            // accommodate
            // the reversed nature of the search
            var temp = endPattern[0];
            endPattern[0] = row.getSize() - endPattern[1];
            endPattern[1] = row.getSize() - temp;
            return endPattern;
        }
        finally {
            // Put the row back the right way.
            row.reverse();
        }
    };
    /*
    /!**
     * @param row       row of black/white values to search
     * @param rowOffset position to start search
     * @param pattern   pattern of counts of number of black and white pixels that are
     *                  being searched for as a pattern
     * @return start/end horizontal offset of guard pattern, as an array of two
     *         ints
     * @throws NotFoundException if pattern is not found
     *!/*/
    ITFReader.findGuardPattern = function (row, rowOffset, pattern) {
        var patternLength = pattern.length;
        var counters = new Array(patternLength);
        var width = row.getSize();
        var isWhite = false;
        var counterPosition = 0;
        var patternStart = rowOffset;
        counters.fill(0);
        for (var x = rowOffset; x < width; x++) {
            if (row.get(x) !== isWhite) {
                counters[counterPosition]++;
            }
            else {
                if (counterPosition === patternLength - 1) {
                    if (OneDReader_1.default.patternMatchVariance(counters, pattern, ITFReader.MAX_INDIVIDUAL_VARIANCE) < ITFReader.MAX_AVG_VARIANCE) {
                        return [patternStart, x];
                    }
                    patternStart += counters[0] + counters[1];
                    System_1.default.arraycopy(counters, 2, counters, 0, counterPosition - 1);
                    counters[counterPosition - 1] = 0;
                    counters[counterPosition] = 0;
                    counterPosition--;
                }
                else {
                    counterPosition++;
                }
                counters[counterPosition] = 1;
                isWhite = !isWhite;
            }
        }
        throw new NotFoundException_1.default();
    };
    /*/!**
     * Attempts to decode a sequence of ITF black/white lines into single
     * digit.
     *
     * @param counters the counts of runs of observed black/white/black/... values
     * @return The decoded digit
     * @throws NotFoundException if digit cannot be decoded
     *!/*/
    ITFReader.decodeDigit = function (counters) {
        var bestVariance = ITFReader.MAX_AVG_VARIANCE; // worst variance we'll accept
        var bestMatch = -1;
        var max = ITFReader.PATTERNS.length;
        for (var i = 0; i < max; i++) {
            var pattern = ITFReader.PATTERNS[i];
            var variance = OneDReader_1.default.patternMatchVariance(counters, pattern, ITFReader.MAX_INDIVIDUAL_VARIANCE);
            if (variance < bestVariance) {
                bestVariance = variance;
                bestMatch = i;
            }
            else if (variance === bestVariance) {
                // if we find a second 'best match' with the same variance, we can not reliably report to have a suitable match
                bestMatch = -1;
            }
        }
        if (bestMatch >= 0) {
            return bestMatch % 10;
        }
        else {
            throw new NotFoundException_1.default();
        }
    };
    ITFReader.W = 3; // Pixel width of a 3x wide line
    ITFReader.w = 2; // Pixel width of a 2x wide line
    ITFReader.N = 1; // Pixed width of a narrow line
    ITFReader.PATTERNS = [
        [1, 1, 2, 2, 1],
        [2, 1, 1, 1, 2],
        [1, 2, 1, 1, 2],
        [2, 2, 1, 1, 1],
        [1, 1, 2, 1, 2],
        [2, 1, 2, 1, 1],
        [1, 2, 2, 1, 1],
        [1, 1, 1, 2, 2],
        [2, 1, 1, 2, 1],
        [1, 2, 1, 2, 1],
        [1, 1, 3, 3, 1],
        [3, 1, 1, 1, 3],
        [1, 3, 1, 1, 3],
        [3, 3, 1, 1, 1],
        [1, 1, 3, 1, 3],
        [3, 1, 3, 1, 1],
        [1, 3, 3, 1, 1],
        [1, 1, 1, 3, 3],
        [3, 1, 1, 3, 1],
        [1, 3, 1, 3, 1] // 9
    ];
    ITFReader.MAX_AVG_VARIANCE = 0.38;
    ITFReader.MAX_INDIVIDUAL_VARIANCE = 0.5;
    /* /!** Valid ITF lengths. Anything longer than the largest value is also allowed. *!/*/
    ITFReader.DEFAULT_ALLOWED_LENGTHS = [6, 8, 10, 12, 14];
    /*/!**
     * Start/end guard pattern.
     *
     * Note: The end pattern is reversed because the row is reversed before
     * searching for the END_PATTERN
     *!/*/
    ITFReader.START_PATTERN = [1, 1, 1, 1];
    ITFReader.END_PATTERN_REVERSED = [
        [1, 1, 2],
        [1, 1, 3] // 3x
    ];
    return ITFReader;
}(OneDReader_1.default));
exports.default = ITFReader;
//# sourceMappingURL=ITFReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/MultiFormatOneDReader.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/MultiFormatOneDReader.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.oned {*/
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var Code39Reader_1 = __webpack_require__(/*! ./Code39Reader */ "./node_modules/@zxing/library/esm5/core/oned/Code39Reader.js");
var Code128Reader_1 = __webpack_require__(/*! ./Code128Reader */ "./node_modules/@zxing/library/esm5/core/oned/Code128Reader.js");
var ITFReader_1 = __webpack_require__(/*! ./ITFReader */ "./node_modules/@zxing/library/esm5/core/oned/ITFReader.js");
var MultiFormatUPCEANReader_1 = __webpack_require__(/*! ./MultiFormatUPCEANReader */ "./node_modules/@zxing/library/esm5/core/oned/MultiFormatUPCEANReader.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
var OneDReader_1 = __webpack_require__(/*! ./OneDReader */ "./node_modules/@zxing/library/esm5/core/oned/OneDReader.js");
/**
 * @author Daniel Switkin <dswitkin@google.com>
 * @author Sean Owen
 */
var MultiFormatOneDReader = /** @class */ (function (_super) {
    __extends(MultiFormatOneDReader, _super);
    function MultiFormatOneDReader(hints) {
        var _this = _super.call(this) || this;
        _this.readers = [];
        var possibleFormats = !hints ? null : hints.get(2 /* POSSIBLE_FORMATS */);
        var useCode39CheckDigit = hints && hints.get(6 /* ASSUME_CODE_39_CHECK_DIGIT */) !== undefined;
        if (possibleFormats) {
            if (possibleFormats.includes(BarcodeFormat_1.default.EAN_13)) {
                _this.readers.push(new MultiFormatUPCEANReader_1.default(hints));
            }
            // if (possibleFormats.includes(BarcodeFormat.EAN_13) ||
            //     possibleFormats.includes(BarcodeFormat.UPC_A) ||
            //     possibleFormats.includes(BarcodeFormat.EAN_8) ||
            //     possibleFormats.includes(BarcodeFormat.UPC_E)) {
            //   readers.push(new MultiFormatUPCEANReader(hints));
            // }
            if (possibleFormats.includes(BarcodeFormat_1.default.CODE_39)) {
                _this.readers.push(new Code39Reader_1.default(useCode39CheckDigit));
            }
            // if (possibleFormats.includes(BarcodeFormat.CODE_93)) {
            //    this.readers.push(new Code93Reader());
            // }
            if (possibleFormats.includes(BarcodeFormat_1.default.CODE_128)) {
                _this.readers.push(new Code128Reader_1.default());
            }
            if (possibleFormats.includes(BarcodeFormat_1.default.ITF)) {
                _this.readers.push(new ITFReader_1.default());
            }
            // if (possibleFormats.includes(BarcodeFormat.CODABAR)) {
            //    this.readers.push(new CodaBarReader());
            // }
            // if (possibleFormats.includes(BarcodeFormat.RSS_14)) {
            //    this.readers.push(new RSS14Reader());
            // }
            // if (possibleFormats.includes(BarcodeFormat.RSS_EXPANDED)) {
            //   this.readers.push(new RSSExpandedReader());
            // }
        }
        if (_this.readers.length === 0) {
            // this.readers.push(new MultiFormatUPCEANReader(hints));
            _this.readers.push(new Code39Reader_1.default());
            // this.readers.push(new CodaBarReader());
            // this.readers.push(new Code93Reader());
            _this.readers.push(new MultiFormatUPCEANReader_1.default(hints));
            _this.readers.push(new Code128Reader_1.default());
            _this.readers.push(new ITFReader_1.default());
            // this.readers.push(new RSS14Reader());
            // this.readers.push(new RSSExpandedReader());
        }
        return _this;
    }
    // @Override
    MultiFormatOneDReader.prototype.decodeRow = function (rowNumber, row, hints) {
        for (var i = 0; i < this.readers.length; i++) {
            try {
                return this.readers[i].decodeRow(rowNumber, row, hints);
            }
            catch (re) {
                // continue
            }
        }
        throw new NotFoundException_1.default();
    };
    // @Override
    MultiFormatOneDReader.prototype.reset = function () {
        this.readers.forEach(function (reader) { return reader.reset(); });
    };
    return MultiFormatOneDReader;
}(OneDReader_1.default));
exports.default = MultiFormatOneDReader;
//# sourceMappingURL=MultiFormatOneDReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/MultiFormatUPCEANReader.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/MultiFormatUPCEANReader.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var OneDReader_1 = __webpack_require__(/*! ./OneDReader */ "./node_modules/@zxing/library/esm5/core/oned/OneDReader.js");
var EAN13Reader_1 = __webpack_require__(/*! ./EAN13Reader */ "./node_modules/@zxing/library/esm5/core/oned/EAN13Reader.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * <p>A reader that can read all available UPC/EAN formats. If a caller wants to try to
 * read all such formats, it is most efficient to use this implementation rather than invoke
 * individual readers.</p>
 *
 * @author Sean Owen
 */
var MultiFormatUPCEANReader = /** @class */ (function (_super) {
    __extends(MultiFormatUPCEANReader, _super);
    function MultiFormatUPCEANReader(hints) {
        var _this = _super.call(this) || this;
        var possibleFormats = hints == null ? null : hints.get(2 /* POSSIBLE_FORMATS */);
        var readers = [];
        if (possibleFormats != null) {
            if (possibleFormats.indexOf(BarcodeFormat_1.default.EAN_13) > -1) {
                readers.push(new EAN13Reader_1.default());
            }
            // todo add UPC_A, EAN_8, UPC_E
        }
        if (readers.length === 0) {
            readers.push(new EAN13Reader_1.default());
            // todo add UPC_A, EAN_8, UPC_E
        }
        _this.readers = readers;
        return _this;
    }
    MultiFormatUPCEANReader.prototype.decodeRow = function (rowNumber, row, hints) {
        for (var _i = 0, _a = this.readers; _i < _a.length; _i++) {
            var reader = _a[_i];
            try {
                return reader.decodeRow(rowNumber, row, hints);
                // TODO ean13MayBeUPCA
            }
            catch (err) {
                // continue;
            }
        }
        throw new NotFoundException_1.default();
    };
    MultiFormatUPCEANReader.prototype.reset = function () {
        for (var _i = 0, _a = this.readers; _i < _a.length; _i++) {
            var reader = _a[_i];
            reader.reset();
        }
    };
    return MultiFormatUPCEANReader;
}(OneDReader_1.default));
exports.default = MultiFormatUPCEANReader;
//# sourceMappingURL=MultiFormatUPCEANReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/OneDReader.js":
/*!******************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/OneDReader.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BitArray_1 = __webpack_require__(/*! ../common/BitArray */ "./node_modules/@zxing/library/esm5/core/common/BitArray.js");
var ResultMetadataType_1 = __webpack_require__(/*! ../ResultMetadataType */ "./node_modules/@zxing/library/esm5/core/ResultMetadataType.js");
var ResultPoint_1 = __webpack_require__(/*! ../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * Encapsulates functionality and implementation that is common to all families
 * of one-dimensional barcodes.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 * @author Sean Owen
 */
var OneDReader = /** @class */ (function () {
    function OneDReader() {
    }
    /*
    @Override
    public Result decode(BinaryBitmap image) throws NotFoundException, FormatException {
      return decode(image, null);
    }
    */
    // Note that we don't try rotation without the try harder flag, even if rotation was supported.
    // @Override
    OneDReader.prototype.decode = function (image, hints) {
        try {
            return this.doDecode(image, hints);
        }
        catch (nfe) {
            var tryHarder = hints && (hints.get(3 /* TRY_HARDER */) === true);
            if (tryHarder && image.isRotateSupported()) {
                var rotatedImage = image.rotateCounterClockwise();
                var result = this.doDecode(rotatedImage, hints);
                // Record that we found it rotated 90 degrees CCW / 270 degrees CW
                var metadata = result.getResultMetadata();
                var orientation_1 = 270;
                if (metadata !== null && (metadata.get(ResultMetadataType_1.default.ORIENTATION) === true)) {
                    // But if we found it reversed in doDecode(), add in that result here:
                    orientation_1 = (orientation_1 + metadata.get(ResultMetadataType_1.default.ORIENTATION) % 360);
                }
                result.putMetadata(ResultMetadataType_1.default.ORIENTATION, orientation_1);
                // Update result points
                var points = result.getResultPoints();
                if (points !== null) {
                    var height = rotatedImage.getHeight();
                    for (var i = 0; i < points.length; i++) {
                        points[i] = new ResultPoint_1.default(height - points[i].getY() - 1, points[i].getX());
                    }
                }
                return result;
            }
            else {
                throw new NotFoundException_1.default();
            }
        }
    };
    // @Override
    OneDReader.prototype.reset = function () {
        // do nothing
    };
    /**
     * We're going to examine rows from the middle outward, searching alternately above and below the
     * middle, and farther out each time. rowStep is the number of rows between each successive
     * attempt above and below the middle. So we'd scan row middle, then middle - rowStep, then
     * middle + rowStep, then middle - (2 * rowStep), etc.
     * rowStep is bigger as the image is taller, but is always at least 1. We've somewhat arbitrarily
     * decided that moving up and down by about 1/16 of the image is pretty good; we try more of the
     * image if "trying harder".
     *
     * @param image The image to decode
     * @param hints Any hints that were requested
     * @return The contents of the decoded barcode
     * @throws NotFoundException Any spontaneous errors which occur
     */
    OneDReader.prototype.doDecode = function (image, hints) {
        var width = image.getWidth();
        var height = image.getHeight();
        var row = new BitArray_1.default(width);
        var tryHarder = hints && (hints.get(3 /* TRY_HARDER */) === true);
        var rowStep = Math.max(1, height >> (tryHarder ? 8 : 5));
        var maxLines;
        if (tryHarder) {
            maxLines = height; // Look at the whole image, not just the center
        }
        else {
            maxLines = 15; // 15 rows spaced 1/32 apart is roughly the middle half of the image
        }
        var middle = Math.trunc(height / 2);
        for (var x = 0; x < maxLines; x++) {
            // Scanning from the middle out. Determine which row we're looking at next:
            var rowStepsAboveOrBelow = Math.trunc((x + 1) / 2);
            var isAbove = (x & 0x01) === 0; // i.e. is x even?
            var rowNumber = middle + rowStep * (isAbove ? rowStepsAboveOrBelow : -rowStepsAboveOrBelow);
            if (rowNumber < 0 || rowNumber >= height) {
                // Oops, if we run off the top or bottom, stop
                break;
            }
            // Estimate black point for this row and load it:
            try {
                row = image.getBlackRow(rowNumber, row);
            }
            catch (ignored) {
                continue;
            }
            var _loop_1 = function (attempt) {
                if (attempt === 1) { // trying again?
                    row.reverse(); // reverse the row and continue
                    // This means we will only ever draw result points *once* in the life of this method
                    // since we want to avoid drawing the wrong points after flipping the row, and,
                    // don't want to clutter with noise from every single row scan -- just the scans
                    // that start on the center line.
                    if (hints && (hints.get(9 /* NEED_RESULT_POINT_CALLBACK */) === true)) {
                        var newHints_1 = new Map();
                        hints.forEach(function (hint, key) { return newHints_1.set(key, hint); });
                        newHints_1.delete(9 /* NEED_RESULT_POINT_CALLBACK */);
                        hints = newHints_1;
                    }
                }
                try {
                    // Look for a barcode
                    var result = this_1.decodeRow(rowNumber, row, hints);
                    // We found our barcode
                    if (attempt === 1) {
                        // But it was upside down, so note that
                        result.putMetadata(ResultMetadataType_1.default.ORIENTATION, 180);
                        // And remember to flip the result points horizontally.
                        var points = result.getResultPoints();
                        if (points !== null) {
                            points[0] = new ResultPoint_1.default(width - points[0].getX() - 1, points[0].getY());
                            points[1] = new ResultPoint_1.default(width - points[1].getX() - 1, points[1].getY());
                        }
                    }
                    return { value: result };
                }
                catch (re) {
                    // continue -- just couldn't decode this row
                }
            };
            var this_1 = this;
            // While we have the image data in a BitArray, it's fairly cheap to reverse it in place to
            // handle decoding upside down barcodes.
            for (var attempt = 0; attempt < 2; attempt++) {
                var state_1 = _loop_1(attempt);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        throw new NotFoundException_1.default();
    };
    /**
     * Records the size of successive runs of white and black pixels in a row, starting at a given point.
     * The values are recorded in the given array, and the number of runs recorded is equal to the size
     * of the array. If the row starts on a white pixel at the given start point, then the first count
     * recorded is the run of white pixels starting from that point; likewise it is the count of a run
     * of black pixels if the row begin on a black pixels at that point.
     *
     * @param row row to count from
     * @param start offset into row to start at
     * @param counters array into which to record counts
     * @throws NotFoundException if counters cannot be filled entirely from row before running out
     *  of pixels
     */
    OneDReader.recordPattern = function (row, start, counters) {
        var numCounters = counters.length;
        for (var index = 0; index < numCounters; index++)
            counters[index] = 0;
        var end = row.getSize();
        if (start >= end) {
            throw new NotFoundException_1.default();
        }
        var isWhite = !row.get(start);
        var counterPosition = 0;
        var i = start;
        while (i < end) {
            if (row.get(i) !== isWhite) {
                counters[counterPosition]++;
            }
            else {
                if (++counterPosition === numCounters) {
                    break;
                }
                else {
                    counters[counterPosition] = 1;
                    isWhite = !isWhite;
                }
            }
            i++;
        }
        // If we read fully the last section of pixels and filled up our counters -- or filled
        // the last counter but ran off the side of the image, OK. Otherwise, a problem.
        if (!(counterPosition === numCounters || (counterPosition === numCounters - 1 && i === end))) {
            throw new NotFoundException_1.default();
        }
    };
    OneDReader.recordPatternInReverse = function (row, start, counters) {
        // This could be more efficient I guess
        var numTransitionsLeft = counters.length;
        var last = row.get(start);
        while (start > 0 && numTransitionsLeft >= 0) {
            if (row.get(--start) !== last) {
                numTransitionsLeft--;
                last = !last;
            }
        }
        if (numTransitionsLeft >= 0) {
            throw new NotFoundException_1.default();
        }
        OneDReader.recordPattern(row, start + 1, counters);
    };
    /**
     * Determines how closely a set of observed counts of runs of black/white values matches a given
     * target pattern. This is reported as the ratio of the total variance from the expected pattern
     * proportions across all pattern elements, to the length of the pattern.
     *
     * @param counters observed counters
     * @param pattern expected pattern
     * @param maxIndividualVariance The most any counter can differ before we give up
     * @return ratio of total variance between counters and pattern compared to total pattern size
     */
    OneDReader.patternMatchVariance = function (counters, pattern, maxIndividualVariance) {
        var numCounters = counters.length;
        var total = 0;
        var patternLength = 0;
        for (var i = 0; i < numCounters; i++) {
            total += counters[i];
            patternLength += pattern[i];
        }
        if (total < patternLength) {
            // If we don't even have one pixel per unit of bar width, assume this is too small
            // to reliably match, so fail:
            return Number.POSITIVE_INFINITY;
        }
        var unitBarWidth = total / patternLength;
        maxIndividualVariance *= unitBarWidth;
        var totalVariance = 0.0;
        for (var x = 0; x < numCounters; x++) {
            var counter = counters[x];
            var scaledPattern = pattern[x] * unitBarWidth;
            var variance = counter > scaledPattern ? counter - scaledPattern : scaledPattern - counter;
            if (variance > maxIndividualVariance) {
                return Number.POSITIVE_INFINITY;
            }
            totalVariance += variance;
        }
        return totalVariance / total;
    };
    return OneDReader;
}());
exports.default = OneDReader;
//# sourceMappingURL=OneDReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/UPCEANExtension2Support.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/UPCEANExtension2Support.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2012 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var UPCEANReader_1 = __webpack_require__(/*! ./UPCEANReader */ "./node_modules/@zxing/library/esm5/core/oned/UPCEANReader.js");
var Result_1 = __webpack_require__(/*! ../Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
var ResultPoint_1 = __webpack_require__(/*! ../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var ResultMetadataType_1 = __webpack_require__(/*! ../ResultMetadataType */ "./node_modules/@zxing/library/esm5/core/ResultMetadataType.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * @see UPCEANExtension5Support
 */
var UPCEANExtension2Support = /** @class */ (function () {
    function UPCEANExtension2Support() {
        this.decodeMiddleCounters = [0, 0, 0, 0];
        this.decodeRowStringBuffer = '';
    }
    UPCEANExtension2Support.prototype.decodeRow = function (rowNumber, row, extensionStartRange) {
        var result = this.decodeRowStringBuffer;
        var end = this.decodeMiddle(row, extensionStartRange, result);
        var resultString = result.toString();
        var extensionData = UPCEANExtension2Support.parseExtensionString(resultString);
        var resultPoints = [
            new ResultPoint_1.default((extensionStartRange[0] + extensionStartRange[1]) / 2.0, rowNumber),
            new ResultPoint_1.default(end, rowNumber)
        ];
        var extensionResult = new Result_1.default(resultString, null, 0, resultPoints, BarcodeFormat_1.default.UPC_EAN_EXTENSION, new Date().getTime());
        if (extensionData != null) {
            extensionResult.putAllMetadata(extensionData);
        }
        return extensionResult;
    };
    UPCEANExtension2Support.prototype.decodeMiddle = function (row, startRange, resultString) {
        var counters = this.decodeMiddleCounters;
        counters[0] = 0;
        counters[1] = 0;
        counters[2] = 0;
        counters[3] = 0;
        var end = row.getSize();
        var rowOffset = startRange[1];
        var checkParity = 0;
        for (var x = 0; x < 2 && rowOffset < end; x++) {
            var bestMatch = UPCEANReader_1.default.decodeDigit(row, counters, rowOffset, UPCEANReader_1.default.L_AND_G_PATTERNS);
            resultString += String.fromCharCode(('0'.charCodeAt(0) + bestMatch % 10));
            for (var _i = 0, counters_1 = counters; _i < counters_1.length; _i++) {
                var counter = counters_1[_i];
                rowOffset += counter;
            }
            if (bestMatch >= 10) {
                checkParity |= 1 << (1 - x);
            }
            if (x !== 1) {
                // Read off separator if not last
                rowOffset = row.getNextSet(rowOffset);
                rowOffset = row.getNextUnset(rowOffset);
            }
        }
        if (resultString.length !== 2) {
            throw new NotFoundException_1.default();
        }
        if (parseInt(resultString.toString()) % 4 !== checkParity) {
            throw new NotFoundException_1.default();
        }
        return rowOffset;
    };
    UPCEANExtension2Support.parseExtensionString = function (raw) {
        if (raw.length !== 2) {
            return null;
        }
        return new Map([[ResultMetadataType_1.default.ISSUE_NUMBER, parseInt(raw)]]);
    };
    return UPCEANExtension2Support;
}());
exports.default = UPCEANExtension2Support;
//# sourceMappingURL=UPCEANExtension2Support.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/UPCEANExtension5Support.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/UPCEANExtension5Support.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2010 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var UPCEANReader_1 = __webpack_require__(/*! ./UPCEANReader */ "./node_modules/@zxing/library/esm5/core/oned/UPCEANReader.js");
var Result_1 = __webpack_require__(/*! ../Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
var ResultPoint_1 = __webpack_require__(/*! ../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var ResultMetadataType_1 = __webpack_require__(/*! ../ResultMetadataType */ "./node_modules/@zxing/library/esm5/core/ResultMetadataType.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/**
 * @see UPCEANExtension2Support
 */
var UPCEANExtension5Support = /** @class */ (function () {
    function UPCEANExtension5Support() {
        this.CHECK_DIGIT_ENCODINGS = [0x18, 0x14, 0x12, 0x11, 0x0C, 0x06, 0x03, 0x0A, 0x09, 0x05];
        this.decodeMiddleCounters = [0, 0, 0, 0];
        this.decodeRowStringBuffer = '';
    }
    UPCEANExtension5Support.prototype.decodeRow = function (rowNumber, row, extensionStartRange) {
        var result = this.decodeRowStringBuffer;
        var end = this.decodeMiddle(row, extensionStartRange, result);
        var resultString = result.toString();
        var extensionData = UPCEANExtension5Support.parseExtensionString(resultString);
        var resultPoints = [
            new ResultPoint_1.default((extensionStartRange[0] + extensionStartRange[1]) / 2.0, rowNumber),
            new ResultPoint_1.default(end, rowNumber)
        ];
        var extensionResult = new Result_1.default(resultString, null, 0, resultPoints, BarcodeFormat_1.default.UPC_EAN_EXTENSION, new Date().getTime());
        if (extensionData != null) {
            extensionResult.putAllMetadata(extensionData);
        }
        return extensionResult;
    };
    UPCEANExtension5Support.prototype.decodeMiddle = function (row, startRange, resultString) {
        var counters = this.decodeMiddleCounters;
        counters[0] = 0;
        counters[1] = 0;
        counters[2] = 0;
        counters[3] = 0;
        var end = row.getSize();
        var rowOffset = startRange[1];
        var lgPatternFound = 0;
        for (var x = 0; x < 5 && rowOffset < end; x++) {
            var bestMatch = UPCEANReader_1.default.decodeDigit(row, counters, rowOffset, UPCEANReader_1.default.L_AND_G_PATTERNS);
            resultString += String.fromCharCode(('0'.charCodeAt(0) + bestMatch % 10));
            for (var _i = 0, counters_1 = counters; _i < counters_1.length; _i++) {
                var counter = counters_1[_i];
                rowOffset += counter;
            }
            if (bestMatch >= 10) {
                lgPatternFound |= 1 << (4 - x);
            }
            if (x !== 4) {
                // Read off separator if not last
                rowOffset = row.getNextSet(rowOffset);
                rowOffset = row.getNextUnset(rowOffset);
            }
        }
        if (resultString.length !== 5) {
            throw new NotFoundException_1.default();
        }
        var checkDigit = this.determineCheckDigit(lgPatternFound);
        if (UPCEANExtension5Support.extensionChecksum(resultString.toString()) !== checkDigit) {
            throw new NotFoundException_1.default();
        }
        return rowOffset;
    };
    UPCEANExtension5Support.extensionChecksum = function (s) {
        var length = s.length;
        var sum = 0;
        for (var i = length - 2; i >= 0; i -= 2) {
            sum += s.charAt(i).charCodeAt(0) - '0'.charCodeAt(0);
        }
        sum *= 3;
        for (var i = length - 1; i >= 0; i -= 2) {
            sum += s.charAt(i).charCodeAt(0) - '0'.charCodeAt(0);
        }
        sum *= 3;
        return sum % 10;
    };
    UPCEANExtension5Support.prototype.determineCheckDigit = function (lgPatternFound) {
        for (var d = 0; d < 10; d++) {
            if (lgPatternFound === this.CHECK_DIGIT_ENCODINGS[d]) {
                return d;
            }
        }
        throw new NotFoundException_1.default();
    };
    UPCEANExtension5Support.parseExtensionString = function (raw) {
        if (raw.length !== 5) {
            return null;
        }
        var value = UPCEANExtension5Support.parseExtension5String(raw);
        if (value == null) {
            return null;
        }
        return new Map([[ResultMetadataType_1.default.SUGGESTED_PRICE, value]]);
    };
    UPCEANExtension5Support.parseExtension5String = function (raw) {
        var currency;
        switch (raw.charAt(0)) {
            case '0':
                currency = '£';
                break;
            case '5':
                currency = '$';
                break;
            case '9':
                // Reference: http://www.jollytech.com
                switch (raw) {
                    case '90000':
                        // No suggested retail price
                        return null;
                    case '99991':
                        // Complementary
                        return '0.00';
                    case '99990':
                        return 'Used';
                }
                // Otherwise... unknown currency?
                currency = '';
                break;
            default:
                currency = '';
                break;
        }
        var rawAmount = parseInt(raw.substring(1));
        var unitsString = (rawAmount / 100).toString();
        var hundredths = rawAmount % 100;
        var hundredthsString = hundredths < 10 ? '0' + hundredths : hundredths.toString(); // fixme
        return currency + unitsString + '.' + hundredthsString;
    };
    return UPCEANExtension5Support;
}());
exports.default = UPCEANExtension5Support;
//# sourceMappingURL=UPCEANExtension5Support.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/UPCEANExtensionSupport.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/UPCEANExtensionSupport.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (C) 2010 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var UPCEANReader_1 = __webpack_require__(/*! ./UPCEANReader */ "./node_modules/@zxing/library/esm5/core/oned/UPCEANReader.js");
var UPCEANExtension5Support_1 = __webpack_require__(/*! ./UPCEANExtension5Support */ "./node_modules/@zxing/library/esm5/core/oned/UPCEANExtension5Support.js");
var UPCEANExtension2Support_1 = __webpack_require__(/*! ./UPCEANExtension2Support */ "./node_modules/@zxing/library/esm5/core/oned/UPCEANExtension2Support.js");
var UPCEANExtensionSupport = /** @class */ (function () {
    function UPCEANExtensionSupport() {
    }
    UPCEANExtensionSupport.decodeRow = function (rowNumber, row, rowOffset) {
        var extensionStartRange = UPCEANReader_1.default.findGuardPattern(row, rowOffset, false, this.EXTENSION_START_PATTERN, new Array(this.EXTENSION_START_PATTERN.length).fill(0));
        try {
            var fiveSupport = new UPCEANExtension5Support_1.default();
            return fiveSupport.decodeRow(rowNumber, row, extensionStartRange);
        }
        catch (err) {
            var twoSupport = new UPCEANExtension2Support_1.default();
            return twoSupport.decodeRow(rowNumber, row, extensionStartRange);
        }
    };
    UPCEANExtensionSupport.EXTENSION_START_PATTERN = [1, 1, 2];
    return UPCEANExtensionSupport;
}());
exports.default = UPCEANExtensionSupport;
//# sourceMappingURL=UPCEANExtensionSupport.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/oned/UPCEANReader.js":
/*!********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/oned/UPCEANReader.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var Result_1 = __webpack_require__(/*! ../Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
var ResultMetadataType_1 = __webpack_require__(/*! ../ResultMetadataType */ "./node_modules/@zxing/library/esm5/core/ResultMetadataType.js");
var ResultPoint_1 = __webpack_require__(/*! ../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var OneDReader_1 = __webpack_require__(/*! ./OneDReader */ "./node_modules/@zxing/library/esm5/core/oned/OneDReader.js");
var UPCEANExtensionSupport_1 = __webpack_require__(/*! ./UPCEANExtensionSupport */ "./node_modules/@zxing/library/esm5/core/oned/UPCEANExtensionSupport.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
var FormatException_1 = __webpack_require__(/*! ../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
var ChecksumException_1 = __webpack_require__(/*! ../ChecksumException */ "./node_modules/@zxing/library/esm5/core/ChecksumException.js");
/**
 * <p>Encapsulates functionality and implementation that is common to UPC and EAN families
 * of one-dimensional barcodes.</p>
 *
 * @author dswitkin@google.com (Daniel Switkin)
 * @author Sean Owen
 * @author alasdair@google.com (Alasdair Mackintosh)
 */
var UPCEANReader = /** @class */ (function (_super) {
    __extends(UPCEANReader, _super);
    // private final UPCEANExtensionSupport extensionReader;
    // private final EANManufacturerOrgSupport eanManSupport;
    function UPCEANReader() {
        var _this = _super.call(this) || this;
        _this.decodeRowStringBuffer = '';
        _this.decodeRowStringBuffer = '';
        UPCEANReader.L_AND_G_PATTERNS = UPCEANReader.L_PATTERNS.map(function (arr) {
            return arr.slice();
        });
        for (var i = 10; i < 20; i++) {
            var widths = UPCEANReader.L_PATTERNS[i - 10];
            var reversedWidths = new Array(widths.length);
            for (var j = 0; j < widths.length; j++) {
                reversedWidths[j] = widths[widths.length - j - 1];
            }
            UPCEANReader.L_AND_G_PATTERNS[i] = reversedWidths;
        }
        return _this;
    }
    /*
    protected UPCEANReader() {
        decodeRowStringBuffer = new StringBuilder(20);
        extensionReader = new UPCEANExtensionSupport();
        eanManSupport = new EANManufacturerOrgSupport();
    }
    */
    UPCEANReader.findStartGuardPattern = function (row) {
        var foundStart = false;
        var startRange = null;
        var nextStart = 0;
        var counters = [0, 0, 0];
        while (!foundStart) {
            counters = [0, 0, 0];
            startRange = UPCEANReader.findGuardPattern(row, nextStart, false, this.START_END_PATTERN, counters);
            var start = startRange[0];
            nextStart = startRange[1];
            var quietStart = start - (nextStart - start);
            if (quietStart >= 0) {
                foundStart = row.isRange(quietStart, start, false);
            }
        }
        return startRange;
    };
    UPCEANReader.prototype.decodeRow = function (rowNumber, row, hints) {
        var startGuardRange = UPCEANReader.findStartGuardPattern(row);
        var resultPointCallback = hints == null ? null : hints.get(9 /* NEED_RESULT_POINT_CALLBACK */);
        if (resultPointCallback != null) {
            var resultPoint_1 = new ResultPoint_1.default((startGuardRange[0] + startGuardRange[1]) / 2.0, rowNumber);
            resultPointCallback.foundPossibleResultPoint(resultPoint_1);
        }
        var budello = this.decodeMiddle(row, startGuardRange, this.decodeRowStringBuffer);
        var endStart = budello.rowOffset;
        var result = budello.resultString;
        if (resultPointCallback != null) {
            var resultPoint_2 = new ResultPoint_1.default(endStart, rowNumber);
            resultPointCallback.foundPossibleResultPoint(resultPoint_2);
        }
        var endRange = UPCEANReader.decodeEnd(row, endStart);
        if (resultPointCallback != null) {
            var resultPoint_3 = new ResultPoint_1.default((endRange[0] + endRange[1]) / 2.0, rowNumber);
            resultPointCallback.foundPossibleResultPoint(resultPoint_3);
        }
        // Make sure there is a quiet zone at least as big as the end pattern after the barcode. The
        // spec might want more whitespace, but in practice this is the maximum we can count on.
        var end = endRange[1];
        var quietEnd = end + (end - endRange[0]);
        if (quietEnd >= row.getSize() || !row.isRange(end, quietEnd, false)) {
            throw new NotFoundException_1.default();
        }
        var resultString = result.toString();
        // UPC/EAN should never be less than 8 chars anyway
        if (resultString.length < 8) {
            throw new FormatException_1.default();
        }
        if (!UPCEANReader.checkChecksum(resultString)) {
            throw new ChecksumException_1.default();
        }
        var left = (startGuardRange[1] + startGuardRange[0]) / 2.0;
        var right = (endRange[1] + endRange[0]) / 2.0;
        var format = this.getBarcodeFormat();
        var resultPoint = [new ResultPoint_1.default(left, rowNumber), new ResultPoint_1.default(right, rowNumber)];
        var decodeResult = new Result_1.default(resultString, null, 0, resultPoint, format, new Date().getTime());
        var extensionLength = 0;
        try {
            var extensionResult = UPCEANExtensionSupport_1.default.decodeRow(rowNumber, row, endRange[1]);
            decodeResult.putMetadata(ResultMetadataType_1.default.UPC_EAN_EXTENSION, extensionResult.getText());
            decodeResult.putAllMetadata(extensionResult.getResultMetadata());
            decodeResult.addResultPoints(extensionResult.getResultPoints());
            extensionLength = extensionResult.getText().length;
        }
        catch (err) {
        }
        var allowedExtensions = hints == null ? null : hints.get(10 /* ALLOWED_EAN_EXTENSIONS */);
        if (allowedExtensions != null) {
            var valid = false;
            for (var length_1 in allowedExtensions) {
                if (extensionLength.toString() === length_1) { // check me
                    valid = true;
                    break;
                }
            }
            if (!valid) {
                throw new NotFoundException_1.default();
            }
        }
        if (format === BarcodeFormat_1.default.EAN_13 || format === BarcodeFormat_1.default.UPC_A) {
            // let countryID = eanManSupport.lookupContryIdentifier(resultString); todo
            // if (countryID != null) {
            //     decodeResult.putMetadata(ResultMetadataType.POSSIBLE_COUNTRY, countryID);
            // }
        }
        return decodeResult;
    };
    UPCEANReader.checkChecksum = function (s) {
        return UPCEANReader.checkStandardUPCEANChecksum(s);
    };
    UPCEANReader.checkStandardUPCEANChecksum = function (s) {
        var length = s.length;
        if (length === 0)
            return false;
        var check = parseInt(s.charAt(length - 1), 10);
        return UPCEANReader.getStandardUPCEANChecksum(s.substring(0, length - 1)) === check;
    };
    UPCEANReader.getStandardUPCEANChecksum = function (s) {
        var length = s.length;
        var sum = 0;
        for (var i = length - 1; i >= 0; i -= 2) {
            var digit = s.charAt(i).charCodeAt(0) - '0'.charCodeAt(0);
            if (digit < 0 || digit > 9) {
                throw new FormatException_1.default();
            }
            sum += digit;
        }
        sum *= 3;
        for (var i = length - 2; i >= 0; i -= 2) {
            var digit = s.charAt(i).charCodeAt(0) - '0'.charCodeAt(0);
            if (digit < 0 || digit > 9) {
                throw new FormatException_1.default();
            }
            sum += digit;
        }
        return (1000 - sum) % 10;
    };
    UPCEANReader.decodeEnd = function (row, endStart) {
        return UPCEANReader.findGuardPattern(row, endStart, false, UPCEANReader.START_END_PATTERN, new Array(UPCEANReader.START_END_PATTERN.length).fill(0));
    };
    UPCEANReader.findGuardPattern = function (row, rowOffset, whiteFirst, pattern, counters) {
        var width = row.getSize();
        rowOffset = whiteFirst ? row.getNextUnset(rowOffset) : row.getNextSet(rowOffset);
        var counterPosition = 0;
        var patternStart = rowOffset;
        var patternLength = pattern.length;
        var isWhite = whiteFirst;
        for (var x = rowOffset; x < width; x++) {
            if (row.get(x) !== isWhite) {
                counters[counterPosition]++;
            }
            else {
                if (counterPosition === patternLength - 1) {
                    if (OneDReader_1.default.patternMatchVariance(counters, pattern, UPCEANReader.MAX_INDIVIDUAL_VARIANCE) < UPCEANReader.MAX_AVG_VARIANCE) {
                        return [patternStart, x];
                    }
                    patternStart += counters[0] + counters[1];
                    var slice = counters.slice(2, counters.length);
                    for (var i = 0; i < counterPosition - 1; i++) {
                        counters[i] = slice[i];
                    }
                    counters[counterPosition - 1] = 0;
                    counters[counterPosition] = 0;
                    counterPosition--;
                }
                else {
                    counterPosition++;
                }
                counters[counterPosition] = 1;
                isWhite = !isWhite;
            }
        }
        throw new NotFoundException_1.default();
    };
    UPCEANReader.decodeDigit = function (row, counters, rowOffset, patterns) {
        this.recordPattern(row, rowOffset, counters);
        var bestVariance = this.MAX_AVG_VARIANCE;
        var bestMatch = -1;
        var max = patterns.length;
        for (var i = 0; i < max; i++) {
            var pattern = patterns[i];
            var variance = OneDReader_1.default.patternMatchVariance(counters, pattern, UPCEANReader.MAX_INDIVIDUAL_VARIANCE);
            if (variance < bestVariance) {
                bestVariance = variance;
                bestMatch = i;
            }
        }
        if (bestMatch >= 0) {
            return bestMatch;
        }
        else {
            throw new NotFoundException_1.default();
        }
    };
    // These two values are critical for determining how permissive the decoding will be.
    // We've arrived at these values through a lot of trial and error. Setting them any higher
    // lets false positives creep in quickly.
    UPCEANReader.MAX_AVG_VARIANCE = 0.48;
    UPCEANReader.MAX_INDIVIDUAL_VARIANCE = 0.7;
    /**
     * Start/end guard pattern.
     */
    UPCEANReader.START_END_PATTERN = [1, 1, 1];
    /**
     * Pattern marking the middle of a UPC/EAN pattern, separating the two halves.
     */
    UPCEANReader.MIDDLE_PATTERN = [1, 1, 1, 1, 1];
    /**
     * end guard pattern.
     */
    UPCEANReader.END_PATTERN = [1, 1, 1, 1, 1, 1];
    /**
     * "Odd", or "L" patterns used to encode UPC/EAN digits.
     */
    UPCEANReader.L_PATTERNS = [
        [3, 2, 1, 1],
        [2, 2, 2, 1],
        [2, 1, 2, 2],
        [1, 4, 1, 1],
        [1, 1, 3, 2],
        [1, 2, 3, 1],
        [1, 1, 1, 4],
        [1, 3, 1, 2],
        [1, 2, 1, 3],
        [3, 1, 1, 2],
    ];
    return UPCEANReader;
}(OneDReader_1.default));
exports.default = UPCEANReader;
//# sourceMappingURL=UPCEANReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/QRCodeReader.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/QRCodeReader.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode {*/
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var Result_1 = __webpack_require__(/*! ../Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
var ResultMetadataType_1 = __webpack_require__(/*! ../ResultMetadataType */ "./node_modules/@zxing/library/esm5/core/ResultMetadataType.js");
var BitMatrix_1 = __webpack_require__(/*! ../common/BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
var Decoder_1 = __webpack_require__(/*! ./decoder/Decoder */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Decoder.js");
var QRCodeDecoderMetaData_1 = __webpack_require__(/*! ./decoder/QRCodeDecoderMetaData */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/QRCodeDecoderMetaData.js");
var Detector_1 = __webpack_require__(/*! ./detector/Detector */ "./node_modules/@zxing/library/esm5/core/qrcode/detector/Detector.js");
var NotFoundException_1 = __webpack_require__(/*! ../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/*import java.util.List;*/
/*import java.util.Map;*/
/**
 * This implementation can detect and decode QR Codes in an image.
 *
 * @author Sean Owen
 */
var QRCodeReader = /** @class */ (function () {
    function QRCodeReader() {
        this.decoder = new Decoder_1.default();
    }
    QRCodeReader.prototype.getDecoder = function () {
        return this.decoder;
    };
    /**
     * Locates and decodes a QR code in an image.
     *
     * @return a representing: string the content encoded by the QR code
     * @throws NotFoundException if a QR code cannot be found
     * @throws FormatException if a QR code cannot be decoded
     * @throws ChecksumException if error correction fails
     */
    /*@Override*/
    // public decode(image: BinaryBitmap): Result /*throws NotFoundException, ChecksumException, FormatException */ {
    //   return this.decode(image, null)
    // }
    /*@Override*/
    QRCodeReader.prototype.decode = function (image, hints) {
        var decoderResult;
        var points;
        if (hints !== undefined && hints !== null && undefined !== hints.get(1 /* PURE_BARCODE */)) {
            var bits = QRCodeReader.extractPureBits(image.getBlackMatrix());
            decoderResult = this.decoder.decodeBitMatrix(bits, hints);
            points = QRCodeReader.NO_POINTS;
        }
        else {
            var detectorResult = new Detector_1.default(image.getBlackMatrix()).detect(hints);
            decoderResult = this.decoder.decodeBitMatrix(detectorResult.getBits(), hints);
            points = detectorResult.getPoints();
        }
        // If the code was mirrored: swap the bottom-left and the top-right points.
        if (decoderResult.getOther() instanceof QRCodeDecoderMetaData_1.default) {
            decoderResult.getOther().applyMirroredCorrection(points);
        }
        var result = new Result_1.default(decoderResult.getText(), decoderResult.getRawBytes(), undefined, points, BarcodeFormat_1.default.QR_CODE, undefined);
        var byteSegments = decoderResult.getByteSegments();
        if (byteSegments !== null) {
            result.putMetadata(ResultMetadataType_1.default.BYTE_SEGMENTS, byteSegments);
        }
        var ecLevel = decoderResult.getECLevel();
        if (ecLevel !== null) {
            result.putMetadata(ResultMetadataType_1.default.ERROR_CORRECTION_LEVEL, ecLevel);
        }
        if (decoderResult.hasStructuredAppend()) {
            result.putMetadata(ResultMetadataType_1.default.STRUCTURED_APPEND_SEQUENCE, decoderResult.getStructuredAppendSequenceNumber());
            result.putMetadata(ResultMetadataType_1.default.STRUCTURED_APPEND_PARITY, decoderResult.getStructuredAppendParity());
        }
        return result;
    };
    /*@Override*/
    QRCodeReader.prototype.reset = function () {
        // do nothing
    };
    /**
     * This method detects a code in a "pure" image -- that is, pure monochrome image
     * which contains only an unrotated, unskewed, image of a code, with some white border
     * around it. This is a specialized method that works exceptionally fast in this special
     * case.
     *
     * @see com.google.zxing.datamatrix.DataMatrixReader#extractPureBits(BitMatrix)
     */
    QRCodeReader.extractPureBits = function (image) {
        var leftTopBlack = image.getTopLeftOnBit();
        var rightBottomBlack = image.getBottomRightOnBit();
        if (leftTopBlack === null || rightBottomBlack === null) {
            throw new NotFoundException_1.default();
        }
        var moduleSize = this.moduleSize(leftTopBlack, image);
        var top = leftTopBlack[1];
        var bottom = rightBottomBlack[1];
        var left = leftTopBlack[0];
        var right = rightBottomBlack[0];
        // Sanity check!
        if (left >= right || top >= bottom) {
            throw new NotFoundException_1.default();
        }
        if (bottom - top !== right - left) {
            // Special case, where bottom-right module wasn't black so we found something else in the last row
            // Assume it's a square, so use height as the width
            right = left + (bottom - top);
            if (right >= image.getWidth()) {
                // Abort if that would not make sense -- off image
                throw new NotFoundException_1.default();
            }
        }
        var matrixWidth = Math.round((right - left + 1) / moduleSize);
        var matrixHeight = Math.round((bottom - top + 1) / moduleSize);
        if (matrixWidth <= 0 || matrixHeight <= 0) {
            throw new NotFoundException_1.default();
        }
        if (matrixHeight !== matrixWidth) {
            // Only possibly decode square regions
            throw new NotFoundException_1.default();
        }
        // Push in the "border" by half the module width so that we start
        // sampling in the middle of the module. Just in case the image is a
        // little off, this will help recover.
        var nudge = /*(int) */ Math.floor(moduleSize / 2.0);
        top += nudge;
        left += nudge;
        // But careful that this does not sample off the edge
        // "right" is the farthest-right valid pixel location -- right+1 is not necessarily
        // This is positive by how much the inner x loop below would be too large
        var nudgedTooFarRight = left + /*(int) */ Math.floor((matrixWidth - 1) * moduleSize) - right;
        if (nudgedTooFarRight > 0) {
            if (nudgedTooFarRight > nudge) {
                // Neither way fits; abort
                throw new NotFoundException_1.default();
            }
            left -= nudgedTooFarRight;
        }
        // See logic above
        var nudgedTooFarDown = top + /*(int) */ Math.floor((matrixHeight - 1) * moduleSize) - bottom;
        if (nudgedTooFarDown > 0) {
            if (nudgedTooFarDown > nudge) {
                // Neither way fits; abort
                throw new NotFoundException_1.default();
            }
            top -= nudgedTooFarDown;
        }
        // Now just read off the bits
        var bits = new BitMatrix_1.default(matrixWidth, matrixHeight);
        for (var y = 0; y < matrixHeight; y++) {
            var iOffset = top + /*(int) */ Math.floor(y * moduleSize);
            for (var x = 0; x < matrixWidth; x++) {
                if (image.get(left + /*(int) */ Math.floor(x * moduleSize), iOffset)) {
                    bits.set(x, y);
                }
            }
        }
        return bits;
    };
    QRCodeReader.moduleSize = function (leftTopBlack, image) {
        var height = image.getHeight();
        var width = image.getWidth();
        var x = leftTopBlack[0];
        var y = leftTopBlack[1];
        var inBlack = true;
        var transitions = 0;
        while (x < width && y < height) {
            if (inBlack !== image.get(x, y)) {
                if (++transitions === 5) {
                    break;
                }
                inBlack = !inBlack;
            }
            x++;
            y++;
        }
        if (x === width || y === height) {
            throw new NotFoundException_1.default();
        }
        return (x - leftTopBlack[0]) / 7.0;
    };
    QRCodeReader.NO_POINTS = new Array();
    return QRCodeReader;
}());
exports.default = QRCodeReader;
//# sourceMappingURL=QRCodeReader.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/QRCodeWriter.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/QRCodeWriter.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode {*/
var BarcodeFormat_1 = __webpack_require__(/*! ../BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
var EncodeHintType_1 = __webpack_require__(/*! ../EncodeHintType */ "./node_modules/@zxing/library/esm5/core/EncodeHintType.js");
var BitMatrix_1 = __webpack_require__(/*! ../common/BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
var ErrorCorrectionLevel_1 = __webpack_require__(/*! ./decoder/ErrorCorrectionLevel */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/ErrorCorrectionLevel.js");
var Encoder_1 = __webpack_require__(/*! ./encoder/Encoder */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/Encoder.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
var IllegalStateException_1 = __webpack_require__(/*! ../IllegalStateException */ "./node_modules/@zxing/library/esm5/core/IllegalStateException.js");
/*import java.util.Map;*/
/**
 * This object renders a QR Code as a BitMatrix 2D array of greyscale values.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
var QRCodeWriter = /** @class */ (function () {
    function QRCodeWriter() {
    }
    /*@Override*/
    // public encode(contents: string, format: BarcodeFormat, width: number /*int*/, height: number /*int*/): BitMatrix
    //     /*throws WriterException */ {
    //   return encode(contents, format, width, height, null)
    // }
    /*@Override*/
    QRCodeWriter.prototype.encode = function (contents, format, width /*int*/, height /*int*/, hints) {
        if (contents.length === 0) {
            throw new IllegalArgumentException_1.default('Found empty contents');
        }
        if (format !== BarcodeFormat_1.default.QR_CODE) {
            throw new IllegalArgumentException_1.default('Can only encode QR_CODE, but got ' + format);
        }
        if (width < 0 || height < 0) {
            throw new IllegalArgumentException_1.default("Requested dimensions are too small: " + width + "x" + height);
        }
        var errorCorrectionLevel = ErrorCorrectionLevel_1.default.L;
        var quietZone = QRCodeWriter.QUIET_ZONE_SIZE;
        if (hints !== null) {
            if (undefined !== hints.get(EncodeHintType_1.default.ERROR_CORRECTION)) {
                errorCorrectionLevel = ErrorCorrectionLevel_1.default.fromString(hints.get(EncodeHintType_1.default.ERROR_CORRECTION).toString());
            }
            if (undefined !== hints.get(EncodeHintType_1.default.MARGIN)) {
                quietZone = Number.parseInt(hints.get(EncodeHintType_1.default.MARGIN).toString(), 10);
            }
        }
        var code = Encoder_1.default.encode(contents, errorCorrectionLevel, hints);
        return QRCodeWriter.renderResult(code, width, height, quietZone);
    };
    // Note that the input matrix uses 0 == white, 1 == black, while the output matrix uses
    // 0 == black, 255 == white (i.e. an 8 bit greyscale bitmap).
    QRCodeWriter.renderResult = function (code, width /*int*/, height /*int*/, quietZone /*int*/) {
        var input = code.getMatrix();
        if (input === null) {
            throw new IllegalStateException_1.default();
        }
        var inputWidth = input.getWidth();
        var inputHeight = input.getHeight();
        var qrWidth = inputWidth + (quietZone * 2);
        var qrHeight = inputHeight + (quietZone * 2);
        var outputWidth = Math.max(width, qrWidth);
        var outputHeight = Math.max(height, qrHeight);
        var multiple = Math.min(Math.floor(outputWidth / qrWidth), Math.floor(outputHeight / qrHeight));
        // Padding includes both the quiet zone and the extra white pixels to accommodate the requested
        // dimensions. For example, if input is 25x25 the QR will be 33x33 including the quiet zone.
        // If the requested size is 200x160, the multiple will be 4, for a QR of 132x132. These will
        // handle all the padding from 100x100 (the actual QR) up to 200x160.
        var leftPadding = Math.floor((outputWidth - (inputWidth * multiple)) / 2);
        var topPadding = Math.floor((outputHeight - (inputHeight * multiple)) / 2);
        var output = new BitMatrix_1.default(outputWidth, outputHeight);
        for (var inputY = 0, outputY = topPadding; inputY < inputHeight; inputY++, outputY += multiple) {
            // Write the contents of this row of the barcode
            for (var inputX = 0, outputX = leftPadding; inputX < inputWidth; inputX++, outputX += multiple) {
                if (input.get(inputX, inputY) === 1) {
                    output.setRegion(outputX, outputY, multiple, multiple);
                }
            }
        }
        return output;
    };
    QRCodeWriter.QUIET_ZONE_SIZE = 4;
    return QRCodeWriter;
}());
exports.default = QRCodeWriter;
//# sourceMappingURL=QRCodeWriter.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/BitMatrixParser.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/BitMatrixParser.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Version_1 = __webpack_require__(/*! ./Version */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Version.js");
var FormatInformation_1 = __webpack_require__(/*! ./FormatInformation */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/FormatInformation.js");
var DataMask_1 = __webpack_require__(/*! ./DataMask */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/DataMask.js");
var FormatException_1 = __webpack_require__(/*! ../../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
/**
 * @author Sean Owen
 */
var BitMatrixParser = /** @class */ (function () {
    /**
     * @param bitMatrix {@link BitMatrix} to parse
     * @throws FormatException if dimension is not >= 21 and 1 mod 4
     */
    function BitMatrixParser(bitMatrix) {
        var dimension = bitMatrix.getHeight();
        if (dimension < 21 || (dimension & 0x03) !== 1) {
            throw new FormatException_1.default();
        }
        this.bitMatrix = bitMatrix;
    }
    /**
     * <p>Reads format information from one of its two locations within the QR Code.</p>
     *
     * @return {@link FormatInformation} encapsulating the QR Code's format info
     * @throws FormatException if both format information locations cannot be parsed as
     * the valid encoding of format information
     */
    BitMatrixParser.prototype.readFormatInformation = function () {
        if (this.parsedFormatInfo !== null && this.parsedFormatInfo !== undefined) {
            return this.parsedFormatInfo;
        }
        // Read top-left format info bits
        var formatInfoBits1 = 0;
        for (var i = 0; i < 6; i++) {
            formatInfoBits1 = this.copyBit(i, 8, formatInfoBits1);
        }
        // .. and skip a bit in the timing pattern ...
        formatInfoBits1 = this.copyBit(7, 8, formatInfoBits1);
        formatInfoBits1 = this.copyBit(8, 8, formatInfoBits1);
        formatInfoBits1 = this.copyBit(8, 7, formatInfoBits1);
        // .. and skip a bit in the timing pattern ...
        for (var j = 5; j >= 0; j--) {
            formatInfoBits1 = this.copyBit(8, j, formatInfoBits1);
        }
        // Read the top-right/bottom-left pattern too
        var dimension = this.bitMatrix.getHeight();
        var formatInfoBits2 = 0;
        var jMin = dimension - 7;
        for (var j = dimension - 1; j >= jMin; j--) {
            formatInfoBits2 = this.copyBit(8, j, formatInfoBits2);
        }
        for (var i = dimension - 8; i < dimension; i++) {
            formatInfoBits2 = this.copyBit(i, 8, formatInfoBits2);
        }
        this.parsedFormatInfo = FormatInformation_1.default.decodeFormatInformation(formatInfoBits1, formatInfoBits2);
        if (this.parsedFormatInfo !== null) {
            return this.parsedFormatInfo;
        }
        throw new FormatException_1.default();
    };
    /**
     * <p>Reads version information from one of its two locations within the QR Code.</p>
     *
     * @return {@link Version} encapsulating the QR Code's version
     * @throws FormatException if both version information locations cannot be parsed as
     * the valid encoding of version information
     */
    BitMatrixParser.prototype.readVersion = function () {
        if (this.parsedVersion !== null && this.parsedVersion !== undefined) {
            return this.parsedVersion;
        }
        var dimension = this.bitMatrix.getHeight();
        var provisionalVersion = Math.floor((dimension - 17) / 4);
        if (provisionalVersion <= 6) {
            return Version_1.default.getVersionForNumber(provisionalVersion);
        }
        // Read top-right version info: 3 wide by 6 tall
        var versionBits = 0;
        var ijMin = dimension - 11;
        for (var j = 5; j >= 0; j--) {
            for (var i = dimension - 9; i >= ijMin; i--) {
                versionBits = this.copyBit(i, j, versionBits);
            }
        }
        var theParsedVersion = Version_1.default.decodeVersionInformation(versionBits);
        if (theParsedVersion !== null && theParsedVersion.getDimensionForVersion() === dimension) {
            this.parsedVersion = theParsedVersion;
            return theParsedVersion;
        }
        // Hmm, failed. Try bottom left: 6 wide by 3 tall
        versionBits = 0;
        for (var i = 5; i >= 0; i--) {
            for (var j = dimension - 9; j >= ijMin; j--) {
                versionBits = this.copyBit(i, j, versionBits);
            }
        }
        theParsedVersion = Version_1.default.decodeVersionInformation(versionBits);
        if (theParsedVersion !== null && theParsedVersion.getDimensionForVersion() === dimension) {
            this.parsedVersion = theParsedVersion;
            return theParsedVersion;
        }
        throw new FormatException_1.default();
    };
    BitMatrixParser.prototype.copyBit = function (i /*int*/, j /*int*/, versionBits /*int*/) {
        var bit = this.isMirror ? this.bitMatrix.get(j, i) : this.bitMatrix.get(i, j);
        return bit ? (versionBits << 1) | 0x1 : versionBits << 1;
    };
    /**
     * <p>Reads the bits in the {@link BitMatrix} representing the finder pattern in the
     * correct order in order to reconstruct the codewords bytes contained within the
     * QR Code.</p>
     *
     * @return bytes encoded within the QR Code
     * @throws FormatException if the exact number of bytes expected is not read
     */
    BitMatrixParser.prototype.readCodewords = function () {
        var formatInfo = this.readFormatInformation();
        var version = this.readVersion();
        // Get the data mask for the format used in this QR Code. This will exclude
        // some bits from reading as we wind through the bit matrix.
        var dataMask = DataMask_1.default.values.get(formatInfo.getDataMask());
        var dimension = this.bitMatrix.getHeight();
        dataMask.unmaskBitMatrix(this.bitMatrix, dimension);
        var functionPattern = version.buildFunctionPattern();
        var readingUp = true;
        var result = new Uint8Array(version.getTotalCodewords());
        var resultOffset = 0;
        var currentByte = 0;
        var bitsRead = 0;
        // Read columns in pairs, from right to left
        for (var j = dimension - 1; j > 0; j -= 2) {
            if (j === 6) {
                // Skip whole column with vertical alignment pattern
                // saves time and makes the other code proceed more cleanly
                j--;
            }
            // Read alternatingly from bottom to top then top to bottom
            for (var count = 0; count < dimension; count++) {
                var i = readingUp ? dimension - 1 - count : count;
                for (var col = 0; col < 2; col++) {
                    // Ignore bits covered by the function pattern
                    if (!functionPattern.get(j - col, i)) {
                        // Read a bit
                        bitsRead++;
                        currentByte <<= 1;
                        if (this.bitMatrix.get(j - col, i)) {
                            currentByte |= 1;
                        }
                        // If we've made a whole byte, save it off
                        if (bitsRead === 8) {
                            result[resultOffset++] = /*(byte) */ currentByte;
                            bitsRead = 0;
                            currentByte = 0;
                        }
                    }
                }
            }
            readingUp = !readingUp; // readingUp ^= true; // readingUp = !readingUp; // switch directions
        }
        if (resultOffset !== version.getTotalCodewords()) {
            throw new FormatException_1.default();
        }
        return result;
    };
    /**
     * Revert the mask removal done while reading the code words. The bit matrix should revert to its original state.
     */
    BitMatrixParser.prototype.remask = function () {
        if (this.parsedFormatInfo === null) {
            return; // We have no format information, and have no data mask
        }
        var dataMask = DataMask_1.default.values[this.parsedFormatInfo.getDataMask()];
        var dimension = this.bitMatrix.getHeight();
        dataMask.unmaskBitMatrix(this.bitMatrix, dimension);
    };
    /**
     * Prepare the parser for a mirrored operation.
     * This flag has effect only on the {@link #readFormatInformation()} and the
     * {@link #readVersion()}. Before proceeding with {@link #readCodewords()} the
     * {@link #mirror()} method should be called.
     *
     * @param mirror Whether to read version and format information mirrored.
     */
    BitMatrixParser.prototype.setMirror = function (isMirror) {
        this.parsedVersion = null;
        this.parsedFormatInfo = null;
        this.isMirror = isMirror;
    };
    /** Mirror the bit matrix in order to attempt a second reading. */
    BitMatrixParser.prototype.mirror = function () {
        var bitMatrix = this.bitMatrix;
        for (var x = 0, width = bitMatrix.getWidth(); x < width; x++) {
            for (var y = x + 1, height = bitMatrix.getHeight(); y < height; y++) {
                if (bitMatrix.get(x, y) !== bitMatrix.get(y, x)) {
                    bitMatrix.flip(y, x);
                    bitMatrix.flip(x, y);
                }
            }
        }
    };
    return BitMatrixParser;
}());
exports.default = BitMatrixParser;
//# sourceMappingURL=BitMatrixParser.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/DataBlock.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/DataBlock.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * <p>Encapsulates a block of data within a QR Code. QR Codes may split their data into
 * multiple blocks, each of which is a unit of data and error-correction codewords. Each
 * is represented by an instance of this class.</p>
 *
 * @author Sean Owen
 */
var DataBlock = /** @class */ (function () {
    function DataBlock(numDataCodewords /*int*/, codewords) {
        this.numDataCodewords = numDataCodewords;
        this.codewords = codewords;
    }
    /**
     * <p>When QR Codes use multiple data blocks, they are actually interleaved.
     * That is, the first byte of data block 1 to n is written, then the second bytes, and so on. This
     * method will separate the data into original blocks.</p>
     *
     * @param rawCodewords bytes as read directly from the QR Code
     * @param version version of the QR Code
     * @param ecLevel error-correction level of the QR Code
     * @return DataBlocks containing original bytes, "de-interleaved" from representation in the
     *         QR Code
     */
    DataBlock.getDataBlocks = function (rawCodewords, version, ecLevel) {
        if (rawCodewords.length !== version.getTotalCodewords()) {
            throw new IllegalArgumentException_1.default();
        }
        // Figure out the number and size of data blocks used by this version and
        // error correction level
        var ecBlocks = version.getECBlocksForLevel(ecLevel);
        // First count the total number of data blocks
        var totalBlocks = 0;
        var ecBlockArray = ecBlocks.getECBlocks();
        for (var _i = 0, ecBlockArray_1 = ecBlockArray; _i < ecBlockArray_1.length; _i++) {
            var ecBlock = ecBlockArray_1[_i];
            totalBlocks += ecBlock.getCount();
        }
        // Now establish DataBlocks of the appropriate size and number of data codewords
        var result = new Array(totalBlocks);
        var numResultBlocks = 0;
        for (var _a = 0, ecBlockArray_2 = ecBlockArray; _a < ecBlockArray_2.length; _a++) {
            var ecBlock = ecBlockArray_2[_a];
            for (var i = 0; i < ecBlock.getCount(); i++) {
                var numDataCodewords = ecBlock.getDataCodewords();
                var numBlockCodewords = ecBlocks.getECCodewordsPerBlock() + numDataCodewords;
                result[numResultBlocks++] = new DataBlock(numDataCodewords, new Uint8Array(numBlockCodewords));
            }
        }
        // All blocks have the same amount of data, except that the last n
        // (where n may be 0) have 1 more byte. Figure out where these start.
        var shorterBlocksTotalCodewords = result[0].codewords.length;
        var longerBlocksStartAt = result.length - 1;
        // TYPESCRIPTPORT: check length is correct here
        while (longerBlocksStartAt >= 0) {
            var numCodewords = result[longerBlocksStartAt].codewords.length;
            if (numCodewords === shorterBlocksTotalCodewords) {
                break;
            }
            longerBlocksStartAt--;
        }
        longerBlocksStartAt++;
        var shorterBlocksNumDataCodewords = shorterBlocksTotalCodewords - ecBlocks.getECCodewordsPerBlock();
        // The last elements of result may be 1 element longer
        // first fill out as many elements as all of them have
        var rawCodewordsOffset = 0;
        for (var i = 0; i < shorterBlocksNumDataCodewords; i++) {
            for (var j = 0; j < numResultBlocks; j++) {
                result[j].codewords[i] = rawCodewords[rawCodewordsOffset++];
            }
        }
        // Fill out the last data block in the longer ones
        for (var j = longerBlocksStartAt; j < numResultBlocks; j++) {
            result[j].codewords[shorterBlocksNumDataCodewords] = rawCodewords[rawCodewordsOffset++];
        }
        // Now add in error correction blocks
        var max = result[0].codewords.length;
        for (var i = shorterBlocksNumDataCodewords; i < max; i++) {
            for (var j = 0; j < numResultBlocks; j++) {
                var iOffset = j < longerBlocksStartAt ? i : i + 1;
                result[j].codewords[iOffset] = rawCodewords[rawCodewordsOffset++];
            }
        }
        return result;
    };
    DataBlock.prototype.getNumDataCodewords = function () {
        return this.numDataCodewords;
    };
    DataBlock.prototype.getCodewords = function () {
        return this.codewords;
    };
    return DataBlock;
}());
exports.default = DataBlock;
//# sourceMappingURL=DataBlock.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/DataMask.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/DataMask.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * <p>Encapsulates data masks for the data bits in a QR code, per ISO 18004:2006 6.8. Implementations
 * of this class can un-mask a raw BitMatrix. For simplicity, they will unmask the entire BitMatrix,
 * including areas used for finder patterns, timing patterns, etc. These areas should be unused
 * after the point they are unmasked anyway.</p>
 *
 * <p>Note that the diagram in section 6.8.1 is misleading since it indicates that i is column position
 * and j is row position. In fact, as the text says, i is row position and j is column position.</p>
 *
 * @author Sean Owen
 */
var DataMask = /** @class */ (function () {
    // See ISO 18004:2006 6.8.1
    function DataMask(value, isMasked) {
        this.value = value;
        this.isMasked = isMasked;
    }
    // End of enum constants.
    /**
     * <p>Implementations of this method reverse the data masking process applied to a QR Code and
     * make its bits ready to read.</p>
     *
     * @param bits representation of QR Code bits
     * @param dimension dimension of QR Code, represented by bits, being unmasked
     */
    DataMask.prototype.unmaskBitMatrix = function (bits, dimension /*int*/) {
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (this.isMasked(i, j)) {
                    bits.flip(j, i);
                }
            }
        }
    };
    DataMask.values = new Map([
        /**
         * 000: mask bits for which (x + y) mod 2 == 0
         */
        [0 /* DATA_MASK_000 */, new DataMask(0 /* DATA_MASK_000 */, function (i /*int*/, j /*int*/) { return ((i + j) & 0x01) === 0; })],
        /**
         * 001: mask bits for which x mod 2 == 0
         */
        [1 /* DATA_MASK_001 */, new DataMask(1 /* DATA_MASK_001 */, function (i /*int*/, j /*int*/) { return (i & 0x01) === 0; })],
        /**
         * 010: mask bits for which y mod 3 == 0
         */
        [2 /* DATA_MASK_010 */, new DataMask(2 /* DATA_MASK_010 */, function (i /*int*/, j /*int*/) { return j % 3 === 0; })],
        /**
         * 011: mask bits for which (x + y) mod 3 == 0
         */
        [3 /* DATA_MASK_011 */, new DataMask(3 /* DATA_MASK_011 */, function (i /*int*/, j /*int*/) { return (i + j) % 3 === 0; })],
        /**
         * 100: mask bits for which (x/2 + y/3) mod 2 == 0
         */
        [4 /* DATA_MASK_100 */, new DataMask(4 /* DATA_MASK_100 */, function (i /*int*/, j /*int*/) { return ((Math.floor(i / 2) + Math.floor(j / 3)) & 0x01) === 0; })],
        /**
         * 101: mask bits for which xy mod 2 + xy mod 3 == 0
         * equivalently, such that xy mod 6 == 0
         */
        [5 /* DATA_MASK_101 */, new DataMask(5 /* DATA_MASK_101 */, function (i /*int*/, j /*int*/) { return (i * j) % 6 === 0; })],
        /**
         * 110: mask bits for which (xy mod 2 + xy mod 3) mod 2 == 0
         * equivalently, such that xy mod 6 < 3
         */
        [6 /* DATA_MASK_110 */, new DataMask(6 /* DATA_MASK_110 */, function (i /*int*/, j /*int*/) { return ((i * j) % 6) < 3; })],
        /**
         * 111: mask bits for which ((x+y)mod 2 + xy mod 3) mod 2 == 0
         * equivalently, such that (x + y + xy mod 3) mod 2 == 0
         */
        [7 /* DATA_MASK_111 */, new DataMask(7 /* DATA_MASK_111 */, function (i /*int*/, j /*int*/) { return ((i + j + ((i * j) % 3)) & 0x01) === 0; })],
    ]);
    return DataMask;
}());
exports.default = DataMask;
//# sourceMappingURL=DataMask.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/DecodedBitStreamParser.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/DecodedBitStreamParser.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BitSource_1 = __webpack_require__(/*! ../../common/BitSource */ "./node_modules/@zxing/library/esm5/core/common/BitSource.js");
var CharacterSetECI_1 = __webpack_require__(/*! ../../common/CharacterSetECI */ "./node_modules/@zxing/library/esm5/core/common/CharacterSetECI.js");
var DecoderResult_1 = __webpack_require__(/*! ../../common/DecoderResult */ "./node_modules/@zxing/library/esm5/core/common/DecoderResult.js");
var StringUtils_1 = __webpack_require__(/*! ../../common/StringUtils */ "./node_modules/@zxing/library/esm5/core/common/StringUtils.js");
var Mode_1 = __webpack_require__(/*! ./Mode */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Mode.js");
var StringBuilder_1 = __webpack_require__(/*! ../../util/StringBuilder */ "./node_modules/@zxing/library/esm5/core/util/StringBuilder.js");
var StringEncoding_1 = __webpack_require__(/*! ../../util/StringEncoding */ "./node_modules/@zxing/library/esm5/core/util/StringEncoding.js");
var FormatException_1 = __webpack_require__(/*! ../../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
/*import java.io.UnsupportedEncodingException;*/
/*import java.util.ArrayList;*/
/*import java.util.Collection;*/
/*import java.util.List;*/
/*import java.util.Map;*/
/**
 * <p>QR Codes can encode text as bits in one of several modes, and can use multiple modes
 * in one QR Code. This class decodes the bits back into text.</p>
 *
 * <p>See ISO 18004:2006, 6.4.3 - 6.4.7</p>
 *
 * @author Sean Owen
 */
var DecodedBitStreamParser = /** @class */ (function () {
    function DecodedBitStreamParser() {
    }
    DecodedBitStreamParser.decode = function (bytes, version, ecLevel, hints) {
        var bits = new BitSource_1.default(bytes);
        var result = new StringBuilder_1.default();
        var byteSegments = new Array(); // 1
        // TYPESCRIPTPORT: I do not use constructor with size 1 as in original Java means capacity and the array length is checked below
        var symbolSequence = -1;
        var parityData = -1;
        try {
            var currentCharacterSetECI = null;
            var fc1InEffect = false;
            var mode = void 0;
            do {
                // While still another segment to read...
                if (bits.available() < 4) {
                    // OK, assume we're done. Really, a TERMINATOR mode should have been recorded here
                    mode = Mode_1.default.TERMINATOR;
                }
                else {
                    var modeBits = bits.readBits(4);
                    mode = Mode_1.default.forBits(modeBits); // mode is encoded by 4 bits
                }
                switch (mode) {
                    case Mode_1.default.TERMINATOR:
                        break;
                    case Mode_1.default.FNC1_FIRST_POSITION:
                    case Mode_1.default.FNC1_SECOND_POSITION:
                        // We do little with FNC1 except alter the parsed result a bit according to the spec
                        fc1InEffect = true;
                        break;
                    case Mode_1.default.STRUCTURED_APPEND:
                        if (bits.available() < 16) {
                            throw new FormatException_1.default();
                        }
                        // sequence number and parity is added later to the result metadata
                        // Read next 8 bits (symbol sequence #) and 8 bits (data: parity), then continue
                        symbolSequence = bits.readBits(8);
                        parityData = bits.readBits(8);
                        break;
                    case Mode_1.default.ECI:
                        // Count doesn't apply to ECI
                        var value = DecodedBitStreamParser.parseECIValue(bits);
                        currentCharacterSetECI = CharacterSetECI_1.default.getCharacterSetECIByValue(value);
                        if (currentCharacterSetECI === null) {
                            throw new FormatException_1.default();
                        }
                        break;
                    case Mode_1.default.HANZI:
                        // First handle Hanzi mode which does not start with character count
                        // Chinese mode contains a sub set indicator right after mode indicator
                        var subset = bits.readBits(4);
                        var countHanzi = bits.readBits(mode.getCharacterCountBits(version));
                        if (subset === DecodedBitStreamParser.GB2312_SUBSET) {
                            DecodedBitStreamParser.decodeHanziSegment(bits, result, countHanzi);
                        }
                        break;
                    default:
                        // "Normal" QR code modes:
                        // How many characters will follow, encoded in this mode?
                        var count = bits.readBits(mode.getCharacterCountBits(version));
                        switch (mode) {
                            case Mode_1.default.NUMERIC:
                                DecodedBitStreamParser.decodeNumericSegment(bits, result, count);
                                break;
                            case Mode_1.default.ALPHANUMERIC:
                                DecodedBitStreamParser.decodeAlphanumericSegment(bits, result, count, fc1InEffect);
                                break;
                            case Mode_1.default.BYTE:
                                DecodedBitStreamParser.decodeByteSegment(bits, result, count, currentCharacterSetECI, byteSegments, hints);
                                break;
                            case Mode_1.default.KANJI:
                                DecodedBitStreamParser.decodeKanjiSegment(bits, result, count);
                                break;
                            default:
                                throw new FormatException_1.default();
                        }
                        break;
                }
            } while (mode !== Mode_1.default.TERMINATOR);
        }
        catch (iae /*: IllegalArgumentException*/) {
            // from readBits() calls
            throw new FormatException_1.default();
        }
        return new DecoderResult_1.default(bytes, result.toString(), byteSegments.length === 0 ? null : byteSegments, ecLevel === null ? null : ecLevel.toString(), symbolSequence, parityData);
    };
    /**
     * See specification GBT 18284-2000
     */
    DecodedBitStreamParser.decodeHanziSegment = function (bits, result, count /*int*/) {
        // Don't crash trying to read more bits than we have available.
        if (count * 13 > bits.available()) {
            throw new FormatException_1.default();
        }
        // Each character will require 2 bytes. Read the characters as 2-byte pairs
        // and decode as GB2312 afterwards
        var buffer = new Uint8Array(2 * count);
        var offset = 0;
        while (count > 0) {
            // Each 13 bits encodes a 2-byte character
            var twoBytes = bits.readBits(13);
            var assembledTwoBytes = (((twoBytes / 0x060) << 8) & 0xFFFFFFFF) | (twoBytes % 0x060);
            if (assembledTwoBytes < 0x003BF) {
                // In the 0xA1A1 to 0xAAFE range
                assembledTwoBytes += 0x0A1A1;
            }
            else {
                // In the 0xB0A1 to 0xFAFE range
                assembledTwoBytes += 0x0A6A1;
            }
            buffer[offset] = /*(byte) */ ((assembledTwoBytes >> 8) & 0xFF);
            buffer[offset + 1] = /*(byte) */ (assembledTwoBytes & 0xFF);
            offset += 2;
            count--;
        }
        try {
            result.append(StringEncoding_1.default.decode(buffer, StringUtils_1.default.GB2312));
            // TYPESCRIPTPORT: TODO: implement GB2312 decode. StringView from MDN could be a starting point
        }
        catch (ignored /*: UnsupportedEncodingException*/) {
            throw new FormatException_1.default(ignored);
        }
    };
    DecodedBitStreamParser.decodeKanjiSegment = function (bits, result, count /*int*/) {
        // Don't crash trying to read more bits than we have available.
        if (count * 13 > bits.available()) {
            throw new FormatException_1.default();
        }
        // Each character will require 2 bytes. Read the characters as 2-byte pairs
        // and decode as Shift_JIS afterwards
        var buffer = new Uint8Array(2 * count);
        var offset = 0;
        while (count > 0) {
            // Each 13 bits encodes a 2-byte character
            var twoBytes = bits.readBits(13);
            var assembledTwoBytes = (((twoBytes / 0x0C0) << 8) & 0xFFFFFFFF) | (twoBytes % 0x0C0);
            if (assembledTwoBytes < 0x01F00) {
                // In the 0x8140 to 0x9FFC range
                assembledTwoBytes += 0x08140;
            }
            else {
                // In the 0xE040 to 0xEBBF range
                assembledTwoBytes += 0x0C140;
            }
            buffer[offset] = /*(byte) */ (assembledTwoBytes >> 8);
            buffer[offset + 1] = /*(byte) */ assembledTwoBytes;
            offset += 2;
            count--;
        }
        // Shift_JIS may not be supported in some environments:
        try {
            result.append(StringEncoding_1.default.decode(buffer, StringUtils_1.default.SHIFT_JIS));
            // TYPESCRIPTPORT: TODO: implement SHIFT_JIS decode. StringView from MDN could be a starting point
        }
        catch (ignored /*: UnsupportedEncodingException*/) {
            throw new FormatException_1.default(ignored);
        }
    };
    DecodedBitStreamParser.decodeByteSegment = function (bits, result, count /*int*/, currentCharacterSetECI, byteSegments, hints) {
        // Don't crash trying to read more bits than we have available.
        if (8 * count > bits.available()) {
            throw new FormatException_1.default();
        }
        var readBytes = new Uint8Array(count);
        for (var i = 0; i < count; i++) {
            readBytes[i] = /*(byte) */ bits.readBits(8);
        }
        var encoding;
        if (currentCharacterSetECI === null) {
            // The spec isn't clear on this mode; see
            // section 6.4.5: t does not say which encoding to assuming
            // upon decoding. I have seen ISO-8859-1 used as well as
            // Shift_JIS -- without anything like an ECI designator to
            // give a hint.
            encoding = StringUtils_1.default.guessEncoding(readBytes, hints);
        }
        else {
            encoding = currentCharacterSetECI.getName();
        }
        try {
            result.append(StringEncoding_1.default.decode(readBytes, encoding));
        }
        catch (ignored /*: UnsupportedEncodingException*/) {
            throw new FormatException_1.default(ignored);
        }
        byteSegments.push(readBytes);
    };
    DecodedBitStreamParser.toAlphaNumericChar = function (value /*int*/) {
        if (value >= DecodedBitStreamParser.ALPHANUMERIC_CHARS.length) {
            throw new FormatException_1.default();
        }
        return DecodedBitStreamParser.ALPHANUMERIC_CHARS[value];
    };
    DecodedBitStreamParser.decodeAlphanumericSegment = function (bits, result, count /*int*/, fc1InEffect) {
        // Read two characters at a time
        var start = result.length();
        while (count > 1) {
            if (bits.available() < 11) {
                throw new FormatException_1.default();
            }
            var nextTwoCharsBits = bits.readBits(11);
            result.append(DecodedBitStreamParser.toAlphaNumericChar(Math.floor(nextTwoCharsBits / 45)));
            result.append(DecodedBitStreamParser.toAlphaNumericChar(nextTwoCharsBits % 45));
            count -= 2;
        }
        if (count === 1) {
            // special case: one character left
            if (bits.available() < 6) {
                throw new FormatException_1.default();
            }
            result.append(DecodedBitStreamParser.toAlphaNumericChar(bits.readBits(6)));
        }
        // See section 6.4.8.1, 6.4.8.2
        if (fc1InEffect) {
            // We need to massage the result a bit if in an FNC1 mode:
            for (var i = start; i < result.length(); i++) {
                if (result.charAt(i) === '%') {
                    if (i < result.length() - 1 && result.charAt(i + 1) === '%') {
                        // %% is rendered as %
                        result.deleteCharAt(i + 1);
                    }
                    else {
                        // In alpha mode, % should be converted to FNC1 separator 0x1D
                        result.setCharAt(i, String.fromCharCode(0x1D));
                    }
                }
            }
        }
    };
    DecodedBitStreamParser.decodeNumericSegment = function (bits, result, count /*int*/) {
        // Read three digits at a time
        while (count >= 3) {
            // Each 10 bits encodes three digits
            if (bits.available() < 10) {
                throw new FormatException_1.default();
            }
            var threeDigitsBits = bits.readBits(10);
            if (threeDigitsBits >= 1000) {
                throw new FormatException_1.default();
            }
            result.append(DecodedBitStreamParser.toAlphaNumericChar(Math.floor(threeDigitsBits / 100)));
            result.append(DecodedBitStreamParser.toAlphaNumericChar(Math.floor(threeDigitsBits / 10) % 10));
            result.append(DecodedBitStreamParser.toAlphaNumericChar(threeDigitsBits % 10));
            count -= 3;
        }
        if (count === 2) {
            // Two digits left over to read, encoded in 7 bits
            if (bits.available() < 7) {
                throw new FormatException_1.default();
            }
            var twoDigitsBits = bits.readBits(7);
            if (twoDigitsBits >= 100) {
                throw new FormatException_1.default();
            }
            result.append(DecodedBitStreamParser.toAlphaNumericChar(Math.floor(twoDigitsBits / 10)));
            result.append(DecodedBitStreamParser.toAlphaNumericChar(twoDigitsBits % 10));
        }
        else if (count === 1) {
            // One digit left over to read
            if (bits.available() < 4) {
                throw new FormatException_1.default();
            }
            var digitBits = bits.readBits(4);
            if (digitBits >= 10) {
                throw new FormatException_1.default();
            }
            result.append(DecodedBitStreamParser.toAlphaNumericChar(digitBits));
        }
    };
    DecodedBitStreamParser.parseECIValue = function (bits) {
        var firstByte = bits.readBits(8);
        if ((firstByte & 0x80) === 0) {
            // just one byte
            return firstByte & 0x7F;
        }
        if ((firstByte & 0xC0) === 0x80) {
            // two bytes
            var secondByte = bits.readBits(8);
            return (((firstByte & 0x3F) << 8) & 0xFFFFFFFF) | secondByte;
        }
        if ((firstByte & 0xE0) === 0xC0) {
            // three bytes
            var secondThirdBytes = bits.readBits(16);
            return (((firstByte & 0x1F) << 16) & 0xFFFFFFFF) | secondThirdBytes;
        }
        throw new FormatException_1.default();
    };
    /**
     * See ISO 18004:2006, 6.4.4 Table 5
     */
    DecodedBitStreamParser.ALPHANUMERIC_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
    DecodedBitStreamParser.GB2312_SUBSET = 1;
    return DecodedBitStreamParser;
}());
exports.default = DecodedBitStreamParser;
function Uint8ArrayToString(a) {
    var CHUNK_SZ = 0x8000;
    var c = new StringBuilder_1.default();
    for (var i = 0, length_1 = a.length; i < length_1; i += CHUNK_SZ) {
        c.append(String.fromCharCode.apply(null, a.subarray(i, i + CHUNK_SZ)));
    }
    return c.toString();
}
//# sourceMappingURL=DecodedBitStreamParser.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Decoder.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/Decoder.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __webpack_require__(/*! ../../common/BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
var GenericGF_1 = __webpack_require__(/*! ../../common/reedsolomon/GenericGF */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGF.js");
var ReedSolomonDecoder_1 = __webpack_require__(/*! ../../common/reedsolomon/ReedSolomonDecoder */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonDecoder.js");
var BitMatrixParser_1 = __webpack_require__(/*! ./BitMatrixParser */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/BitMatrixParser.js");
var QRCodeDecoderMetaData_1 = __webpack_require__(/*! ./QRCodeDecoderMetaData */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/QRCodeDecoderMetaData.js");
var DataBlock_1 = __webpack_require__(/*! ./DataBlock */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/DataBlock.js");
var DecodedBitStreamParser_1 = __webpack_require__(/*! ./DecodedBitStreamParser */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/DecodedBitStreamParser.js");
var ChecksumException_1 = __webpack_require__(/*! ../../ChecksumException */ "./node_modules/@zxing/library/esm5/core/ChecksumException.js");
/*import java.util.Map;*/
/**
 * <p>The main class which implements QR Code decoding -- as opposed to locating and extracting
 * the QR Code from an image.</p>
 *
 * @author Sean Owen
 */
var Decoder = /** @class */ (function () {
    function Decoder() {
        this.rsDecoder = new ReedSolomonDecoder_1.default(GenericGF_1.default.QR_CODE_FIELD_256);
    }
    // public decode(image: boolean[][]): DecoderResult /*throws ChecksumException, FormatException*/ {
    //   return decode(image, null)
    // }
    /**
     * <p>Convenience method that can decode a QR Code represented as a 2D array of booleans.
     * "true" is taken to mean a black module.</p>
     *
     * @param image booleans representing white/black QR Code modules
     * @param hints decoding hints that should be used to influence decoding
     * @return text and bytes encoded within the QR Code
     * @throws FormatException if the QR Code cannot be decoded
     * @throws ChecksumException if error correction fails
     */
    Decoder.prototype.decodeBooleanArray = function (image, hints) {
        return this.decodeBitMatrix(BitMatrix_1.default.parseFromBooleanArray(image), hints);
    };
    // public decodeBitMatrix(bits: BitMatrix): DecoderResult /*throws ChecksumException, FormatException*/ {
    //   return decode(bits, null)
    // }
    /**
     * <p>Decodes a QR Code represented as a {@link BitMatrix}. A 1 or "true" is taken to mean a black module.</p>
     *
     * @param bits booleans representing white/black QR Code modules
     * @param hints decoding hints that should be used to influence decoding
     * @return text and bytes encoded within the QR Code
     * @throws FormatException if the QR Code cannot be decoded
     * @throws ChecksumException if error correction fails
     */
    Decoder.prototype.decodeBitMatrix = function (bits, hints) {
        // Construct a parser and read version, error-correction level
        var parser = new BitMatrixParser_1.default(bits);
        var ex = null;
        try {
            return this.decodeBitMatrixParser(parser, hints);
        }
        catch (e /*: FormatException, ChecksumException*/) {
            ex = e;
        }
        try {
            // Revert the bit matrix
            parser.remask();
            // Will be attempting a mirrored reading of the version and format info.
            parser.setMirror(true);
            // Preemptively read the version.
            parser.readVersion();
            // Preemptively read the format information.
            parser.readFormatInformation();
            /*
             * Since we're here, this means we have successfully detected some kind
             * of version and format information when mirrored. This is a good sign,
             * that the QR code may be mirrored, and we should try once more with a
             * mirrored content.
             */
            // Prepare for a mirrored reading.
            parser.mirror();
            var result = this.decodeBitMatrixParser(parser, hints);
            // Success! Notify the caller that the code was mirrored.
            result.setOther(new QRCodeDecoderMetaData_1.default(true));
            return result;
        }
        catch (e /*FormatException | ChecksumException*/) {
            // Throw the exception from the original reading
            if (ex !== null) {
                throw ex;
            }
            throw e;
        }
    };
    Decoder.prototype.decodeBitMatrixParser = function (parser, hints) {
        var version = parser.readVersion();
        var ecLevel = parser.readFormatInformation().getErrorCorrectionLevel();
        // Read codewords
        var codewords = parser.readCodewords();
        // Separate into data blocks
        var dataBlocks = DataBlock_1.default.getDataBlocks(codewords, version, ecLevel);
        // Count total number of data bytes
        var totalBytes = 0;
        for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
            var dataBlock = dataBlocks_1[_i];
            totalBytes += dataBlock.getNumDataCodewords();
        }
        var resultBytes = new Uint8Array(totalBytes);
        var resultOffset = 0;
        // Error-correct and copy data blocks together into a stream of bytes
        for (var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++) {
            var dataBlock = dataBlocks_2[_a];
            var codewordBytes = dataBlock.getCodewords();
            var numDataCodewords = dataBlock.getNumDataCodewords();
            this.correctErrors(codewordBytes, numDataCodewords);
            for (var i = 0; i < numDataCodewords; i++) {
                resultBytes[resultOffset++] = codewordBytes[i];
            }
        }
        // Decode the contents of that stream of bytes
        return DecodedBitStreamParser_1.default.decode(resultBytes, version, ecLevel, hints);
    };
    /**
     * <p>Given data and error-correction codewords received, possibly corrupted by errors, attempts to
     * correct the errors in-place using Reed-Solomon error correction.</p>
     *
     * @param codewordBytes data and error correction codewords
     * @param numDataCodewords number of codewords that are data bytes
     * @throws ChecksumException if error correction fails
     */
    Decoder.prototype.correctErrors = function (codewordBytes, numDataCodewords /*int*/) {
        var numCodewords = codewordBytes.length;
        // First read into an array of ints
        var codewordsInts = new Int32Array(codewordBytes);
        // TYPESCRIPTPORT: not realy necessary to transform to ints? could redesign everything to work with unsigned bytes?
        // const codewordsInts = new Int32Array(numCodewords)
        // for (let i = 0; i < numCodewords; i++) {
        //   codewordsInts[i] = codewordBytes[i] & 0xFF
        // }
        try {
            this.rsDecoder.decode(codewordsInts, codewordBytes.length - numDataCodewords);
        }
        catch (ignored /*: ReedSolomonException*/) {
            throw new ChecksumException_1.default();
        }
        // Copy back into array of bytes -- only need to worry about the bytes that were data
        // We don't care about errors in the error-correction codewords
        for (var i = 0; i < numDataCodewords; i++) {
            codewordBytes[i] = /*(byte) */ codewordsInts[i];
        }
    };
    return Decoder;
}());
exports.default = Decoder;
//# sourceMappingURL=Decoder.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/ECB.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/ECB.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * <p>Encapsulates the parameters for one error-correction block in one symbol version.
 * This includes the number of data codewords, and the number of times a block with these
 * parameters is used consecutively in the QR code version's format.</p>
 */
var ECB = /** @class */ (function () {
    function ECB(count /*int*/, dataCodewords /*int*/) {
        this.count = count;
        this.dataCodewords = dataCodewords;
    }
    ECB.prototype.getCount = function () {
        return this.count;
    };
    ECB.prototype.getDataCodewords = function () {
        return this.dataCodewords;
    };
    return ECB;
}());
exports.default = ECB;
//# sourceMappingURL=ECB.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/ECBlocks.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/ECBlocks.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * <p>Encapsulates a set of error-correction blocks in one symbol version. Most versions will
 * use blocks of differing sizes within one version, so, this encapsulates the parameters for
 * each set of blocks. It also holds the number of error-correction codewords per block since it
 * will be the same across all blocks within one version.</p>
 */
var ECBlocks = /** @class */ (function () {
    function ECBlocks(ecCodewordsPerBlock /*int*/) {
        var ecBlocks = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ecBlocks[_i - 1] = arguments[_i];
        }
        this.ecCodewordsPerBlock = ecCodewordsPerBlock;
        this.ecBlocks = ecBlocks;
    }
    ECBlocks.prototype.getECCodewordsPerBlock = function () {
        return this.ecCodewordsPerBlock;
    };
    ECBlocks.prototype.getNumBlocks = function () {
        var total = 0;
        var ecBlocks = this.ecBlocks;
        for (var _i = 0, ecBlocks_1 = ecBlocks; _i < ecBlocks_1.length; _i++) {
            var ecBlock = ecBlocks_1[_i];
            total += ecBlock.getCount();
        }
        return total;
    };
    ECBlocks.prototype.getTotalECCodewords = function () {
        return this.ecCodewordsPerBlock * this.getNumBlocks();
    };
    ECBlocks.prototype.getECBlocks = function () {
        return this.ecBlocks;
    };
    return ECBlocks;
}());
exports.default = ECBlocks;
//# sourceMappingURL=ECBlocks.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/ErrorCorrectionLevel.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/ErrorCorrectionLevel.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.decoder {*/
var ArgumentException_1 = __webpack_require__(/*! ../../ArgumentException */ "./node_modules/@zxing/library/esm5/core/ArgumentException.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * <p>See ISO 18004:2006, 6.5.1. This enum encapsulates the four error correction levels
 * defined by the QR code standard.</p>
 *
 * @author Sean Owen
 */
var ErrorCorrectionLevel = /** @class */ (function () {
    function ErrorCorrectionLevel(value, stringValue, bits /*int*/) {
        this.value = value;
        this.stringValue = stringValue;
        this.bits = bits;
        ErrorCorrectionLevel.FOR_BITS.set(bits, this);
        ErrorCorrectionLevel.FOR_VALUE.set(value, this);
    }
    ErrorCorrectionLevel.prototype.getValue = function () {
        return this.value;
    };
    ErrorCorrectionLevel.prototype.getBits = function () {
        return this.bits;
    };
    ErrorCorrectionLevel.fromString = function (s) {
        switch (s) {
            case 'L': return ErrorCorrectionLevel.L;
            case 'M': return ErrorCorrectionLevel.M;
            case 'Q': return ErrorCorrectionLevel.Q;
            case 'H': return ErrorCorrectionLevel.H;
            default: throw new ArgumentException_1.default(s + 'not available');
        }
    };
    ErrorCorrectionLevel.prototype.toString = function () {
        return this.stringValue;
    };
    ErrorCorrectionLevel.prototype.equals = function (o) {
        if (!(o instanceof ErrorCorrectionLevel)) {
            return false;
        }
        var other = o;
        return this.value === other.value;
    };
    /**
     * @param bits int containing the two bits encoding a QR Code's error correction level
     * @return ErrorCorrectionLevel representing the encoded error correction level
     */
    ErrorCorrectionLevel.forBits = function (bits /*int*/) {
        if (bits < 0 || bits >= ErrorCorrectionLevel.FOR_BITS.size) {
            throw new IllegalArgumentException_1.default();
        }
        return ErrorCorrectionLevel.FOR_BITS.get(bits);
    };
    ErrorCorrectionLevel.FOR_BITS = new Map();
    ErrorCorrectionLevel.FOR_VALUE = new Map();
    /** L = ~7% correction */
    ErrorCorrectionLevel.L = new ErrorCorrectionLevel(0 /* L */, 'L', 0x01);
    /** M = ~15% correction */
    ErrorCorrectionLevel.M = new ErrorCorrectionLevel(1 /* M */, 'M', 0x00);
    /** Q = ~25% correction */
    ErrorCorrectionLevel.Q = new ErrorCorrectionLevel(2 /* Q */, 'Q', 0x03);
    /** H = ~30% correction */
    ErrorCorrectionLevel.H = new ErrorCorrectionLevel(3 /* H */, 'H', 0x02);
    return ErrorCorrectionLevel;
}());
exports.default = ErrorCorrectionLevel;
//# sourceMappingURL=ErrorCorrectionLevel.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/FormatInformation.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/FormatInformation.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.decoder {*/
var ErrorCorrectionLevel_1 = __webpack_require__(/*! ./ErrorCorrectionLevel */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/ErrorCorrectionLevel.js");
var Integer_1 = __webpack_require__(/*! ../../util/Integer */ "./node_modules/@zxing/library/esm5/core/util/Integer.js");
/**
 * <p>Encapsulates a QR Code's format information, including the data mask used and
 * error correction level.</p>
 *
 * @author Sean Owen
 * @see DataMask
 * @see ErrorCorrectionLevel
 */
var FormatInformation = /** @class */ (function () {
    function FormatInformation(formatInfo /*int*/) {
        // Bits 3,4
        this.errorCorrectionLevel = ErrorCorrectionLevel_1.default.forBits((formatInfo >> 3) & 0x03);
        // Bottom 3 bits
        this.dataMask = /*(byte) */ (formatInfo & 0x07);
    }
    FormatInformation.numBitsDiffering = function (a /*int*/, b /*int*/) {
        return Integer_1.default.bitCount(a ^ b);
    };
    /**
     * @param maskedFormatInfo1 format info indicator, with mask still applied
     * @param maskedFormatInfo2 second copy of same info; both are checked at the same time
     *  to establish best match
     * @return information about the format it specifies, or {@code null}
     *  if doesn't seem to match any known pattern
     */
    FormatInformation.decodeFormatInformation = function (maskedFormatInfo1 /*int*/, maskedFormatInfo2 /*int*/) {
        var formatInfo = FormatInformation.doDecodeFormatInformation(maskedFormatInfo1, maskedFormatInfo2);
        if (formatInfo !== null) {
            return formatInfo;
        }
        // Should return null, but, some QR codes apparently
        // do not mask this info. Try again by actually masking the pattern
        // first
        return FormatInformation.doDecodeFormatInformation(maskedFormatInfo1 ^ FormatInformation.FORMAT_INFO_MASK_QR, maskedFormatInfo2 ^ FormatInformation.FORMAT_INFO_MASK_QR);
    };
    FormatInformation.doDecodeFormatInformation = function (maskedFormatInfo1 /*int*/, maskedFormatInfo2 /*int*/) {
        // Find the int in FORMAT_INFO_DECODE_LOOKUP with fewest bits differing
        var bestDifference = Number.MAX_SAFE_INTEGER;
        var bestFormatInfo = 0;
        for (var _i = 0, _a = FormatInformation.FORMAT_INFO_DECODE_LOOKUP; _i < _a.length; _i++) {
            var decodeInfo = _a[_i];
            var targetInfo = decodeInfo[0];
            if (targetInfo === maskedFormatInfo1 || targetInfo === maskedFormatInfo2) {
                // Found an exact match
                return new FormatInformation(decodeInfo[1]);
            }
            var bitsDifference = FormatInformation.numBitsDiffering(maskedFormatInfo1, targetInfo);
            if (bitsDifference < bestDifference) {
                bestFormatInfo = decodeInfo[1];
                bestDifference = bitsDifference;
            }
            if (maskedFormatInfo1 !== maskedFormatInfo2) {
                // also try the other option
                bitsDifference = FormatInformation.numBitsDiffering(maskedFormatInfo2, targetInfo);
                if (bitsDifference < bestDifference) {
                    bestFormatInfo = decodeInfo[1];
                    bestDifference = bitsDifference;
                }
            }
        }
        // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits
        // differing means we found a match
        if (bestDifference <= 3) {
            return new FormatInformation(bestFormatInfo);
        }
        return null;
    };
    FormatInformation.prototype.getErrorCorrectionLevel = function () {
        return this.errorCorrectionLevel;
    };
    FormatInformation.prototype.getDataMask = function () {
        return this.dataMask;
    };
    /*@Override*/
    FormatInformation.prototype.hashCode = function () {
        return (this.errorCorrectionLevel.getBits() << 3) | this.dataMask;
    };
    /*@Override*/
    FormatInformation.prototype.equals = function (o) {
        if (!(o instanceof FormatInformation)) {
            return false;
        }
        var other = o;
        return this.errorCorrectionLevel === other.errorCorrectionLevel &&
            this.dataMask === other.dataMask;
    };
    FormatInformation.FORMAT_INFO_MASK_QR = 0x5412;
    /**
     * See ISO 18004:2006, Annex C, Table C.1
     */
    FormatInformation.FORMAT_INFO_DECODE_LOOKUP = [
        Int32Array.from([0x5412, 0x00]),
        Int32Array.from([0x5125, 0x01]),
        Int32Array.from([0x5E7C, 0x02]),
        Int32Array.from([0x5B4B, 0x03]),
        Int32Array.from([0x45F9, 0x04]),
        Int32Array.from([0x40CE, 0x05]),
        Int32Array.from([0x4F97, 0x06]),
        Int32Array.from([0x4AA0, 0x07]),
        Int32Array.from([0x77C4, 0x08]),
        Int32Array.from([0x72F3, 0x09]),
        Int32Array.from([0x7DAA, 0x0A]),
        Int32Array.from([0x789D, 0x0B]),
        Int32Array.from([0x662F, 0x0C]),
        Int32Array.from([0x6318, 0x0D]),
        Int32Array.from([0x6C41, 0x0E]),
        Int32Array.from([0x6976, 0x0F]),
        Int32Array.from([0x1689, 0x10]),
        Int32Array.from([0x13BE, 0x11]),
        Int32Array.from([0x1CE7, 0x12]),
        Int32Array.from([0x19D0, 0x13]),
        Int32Array.from([0x0762, 0x14]),
        Int32Array.from([0x0255, 0x15]),
        Int32Array.from([0x0D0C, 0x16]),
        Int32Array.from([0x083B, 0x17]),
        Int32Array.from([0x355F, 0x18]),
        Int32Array.from([0x3068, 0x19]),
        Int32Array.from([0x3F31, 0x1A]),
        Int32Array.from([0x3A06, 0x1B]),
        Int32Array.from([0x24B4, 0x1C]),
        Int32Array.from([0x2183, 0x1D]),
        Int32Array.from([0x2EDA, 0x1E]),
        Int32Array.from([0x2BED, 0x1F]),
    ];
    return FormatInformation;
}());
exports.default = FormatInformation;
//# sourceMappingURL=FormatInformation.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Mode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/Mode.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * <p>See ISO 18004:2006, 6.4.1, Tables 2 and 3. This enum encapsulates the various modes in which
 * data can be encoded to bits in the QR code standard.</p>
 *
 * @author Sean Owen
 */
var Mode = /** @class */ (function () {
    function Mode(value, stringValue, characterCountBitsForVersions, bits /*int*/) {
        this.value = value;
        this.stringValue = stringValue;
        this.characterCountBitsForVersions = characterCountBitsForVersions;
        this.bits = bits;
        Mode.FOR_BITS.set(bits, this);
        Mode.FOR_VALUE.set(value, this);
    }
    /**
     * @param bits four bits encoding a QR Code data mode
     * @return Mode encoded by these bits
     * @throws IllegalArgumentException if bits do not correspond to a known mode
     */
    Mode.forBits = function (bits /*int*/) {
        var mode = Mode.FOR_BITS.get(bits);
        if (undefined === mode) {
            throw new IllegalArgumentException_1.default();
        }
        return mode;
    };
    /**
     * @param version version in question
     * @return number of bits used, in this QR Code symbol {@link Version}, to encode the
     *         count of characters that will follow encoded in this Mode
     */
    Mode.prototype.getCharacterCountBits = function (version) {
        var versionNumber = version.getVersionNumber();
        var offset;
        if (versionNumber <= 9) {
            offset = 0;
        }
        else if (versionNumber <= 26) {
            offset = 1;
        }
        else {
            offset = 2;
        }
        return this.characterCountBitsForVersions[offset];
    };
    Mode.prototype.getValue = function () {
        return this.value;
    };
    Mode.prototype.getBits = function () {
        return this.bits;
    };
    Mode.prototype.equals = function (o) {
        if (!(o instanceof Mode)) {
            return false;
        }
        var other = o;
        return this.value === other.value;
    };
    Mode.prototype.toString = function () {
        return this.stringValue;
    };
    Mode.FOR_BITS = new Map();
    Mode.FOR_VALUE = new Map();
    Mode.TERMINATOR = new Mode(0 /* TERMINATOR */, 'TERMINATOR', Int32Array.from([0, 0, 0]), 0x00); // Not really a mode...
    Mode.NUMERIC = new Mode(1 /* NUMERIC */, 'NUMERIC', Int32Array.from([10, 12, 14]), 0x01);
    Mode.ALPHANUMERIC = new Mode(2 /* ALPHANUMERIC */, 'ALPHANUMERIC', Int32Array.from([9, 11, 13]), 0x02);
    Mode.STRUCTURED_APPEND = new Mode(3 /* STRUCTURED_APPEND */, 'STRUCTURED_APPEND', Int32Array.from([0, 0, 0]), 0x03); // Not supported
    Mode.BYTE = new Mode(4 /* BYTE */, 'BYTE', Int32Array.from([8, 16, 16]), 0x04);
    Mode.ECI = new Mode(5 /* ECI */, 'ECI', Int32Array.from([0, 0, 0]), 0x07); // character counts don't apply
    Mode.KANJI = new Mode(6 /* KANJI */, 'KANJI', Int32Array.from([8, 10, 12]), 0x08);
    Mode.FNC1_FIRST_POSITION = new Mode(7 /* FNC1_FIRST_POSITION */, 'FNC1_FIRST_POSITION', Int32Array.from([0, 0, 0]), 0x05);
    Mode.FNC1_SECOND_POSITION = new Mode(8 /* FNC1_SECOND_POSITION */, 'FNC1_SECOND_POSITION', Int32Array.from([0, 0, 0]), 0x09);
    /** See GBT 18284-2000; "Hanzi" is a transliteration of this mode name. */
    Mode.HANZI = new Mode(9 /* HANZI */, 'HANZI', Int32Array.from([8, 10, 12]), 0x0D);
    return Mode;
}());
exports.default = Mode;
//# sourceMappingURL=Mode.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/QRCodeDecoderMetaData.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/QRCodeDecoderMetaData.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2013 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Meta-data container for QR Code decoding. Instances of this class may be used to convey information back to the
 * decoding caller. Callers are expected to process this.
 *
 * @see com.google.zxing.common.DecoderResult#getOther()
 */
var QRCodeDecoderMetaData = /** @class */ (function () {
    function QRCodeDecoderMetaData(mirrored) {
        this.mirrored = mirrored;
    }
    /**
     * @return true if the QR Code was mirrored.
     */
    QRCodeDecoderMetaData.prototype.isMirrored = function () {
        return this.mirrored;
    };
    /**
     * Apply the result points' order correction due to mirroring.
     *
     * @param points Array of points to apply mirror correction to.
     */
    QRCodeDecoderMetaData.prototype.applyMirroredCorrection = function (points) {
        if (!this.mirrored || points === null || points.length < 3) {
            return;
        }
        var bottomLeft = points[0];
        points[0] = points[2];
        points[2] = bottomLeft;
        // No need to 'fix' top-left and alignment pattern.
    };
    return QRCodeDecoderMetaData;
}());
exports.default = QRCodeDecoderMetaData;
//# sourceMappingURL=QRCodeDecoderMetaData.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Version.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/decoder/Version.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.decoder {*/
var BitMatrix_1 = __webpack_require__(/*! ../../common/BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
var FormatInformation_1 = __webpack_require__(/*! ./FormatInformation */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/FormatInformation.js");
var ECBlocks_1 = __webpack_require__(/*! ./ECBlocks */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/ECBlocks.js");
var ECB_1 = __webpack_require__(/*! ./ECB */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/ECB.js");
var FormatException_1 = __webpack_require__(/*! ../../FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * See ISO 18004:2006 Annex D
 *
 * @author Sean Owen
 */
var Version = /** @class */ (function () {
    function Version(versionNumber /*int*/, alignmentPatternCenters) {
        var ecBlocks = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            ecBlocks[_i - 2] = arguments[_i];
        }
        this.versionNumber = versionNumber;
        this.alignmentPatternCenters = alignmentPatternCenters;
        this.ecBlocks = ecBlocks;
        var total = 0;
        var ecCodewords = ecBlocks[0].getECCodewordsPerBlock();
        var ecbArray = ecBlocks[0].getECBlocks();
        for (var _a = 0, ecbArray_1 = ecbArray; _a < ecbArray_1.length; _a++) {
            var ecBlock = ecbArray_1[_a];
            total += ecBlock.getCount() * (ecBlock.getDataCodewords() + ecCodewords);
        }
        this.totalCodewords = total;
    }
    Version.prototype.getVersionNumber = function () {
        return this.versionNumber;
    };
    Version.prototype.getAlignmentPatternCenters = function () {
        return this.alignmentPatternCenters;
    };
    Version.prototype.getTotalCodewords = function () {
        return this.totalCodewords;
    };
    Version.prototype.getDimensionForVersion = function () {
        return 17 + 4 * this.versionNumber;
    };
    Version.prototype.getECBlocksForLevel = function (ecLevel) {
        return this.ecBlocks[ecLevel.getValue()];
        // TYPESCRIPTPORT: original was using ordinal, and using the order of levels as defined in ErrorCorrectionLevel enum (LMQH)
        // I will use the direct value from ErrorCorrectionLevelValues enum which in typescript goes to a number
    };
    /**
     * <p>Deduces version information purely from QR Code dimensions.</p>
     *
     * @param dimension dimension in modules
     * @return Version for a QR Code of that dimension
     * @throws FormatException if dimension is not 1 mod 4
     */
    Version.getProvisionalVersionForDimension = function (dimension /*int*/) {
        if (dimension % 4 !== 1) {
            throw new FormatException_1.default();
        }
        try {
            return this.getVersionForNumber((dimension - 17) / 4);
        }
        catch (ignored /*: IllegalArgumentException*/) {
            throw new FormatException_1.default();
        }
    };
    Version.getVersionForNumber = function (versionNumber /*int*/) {
        if (versionNumber < 1 || versionNumber > 40) {
            throw new IllegalArgumentException_1.default();
        }
        return Version.VERSIONS[versionNumber - 1];
    };
    Version.decodeVersionInformation = function (versionBits /*int*/) {
        var bestDifference = Number.MAX_SAFE_INTEGER;
        var bestVersion = 0;
        for (var i = 0; i < Version.VERSION_DECODE_INFO.length; i++) {
            var targetVersion = Version.VERSION_DECODE_INFO[i];
            // Do the version info bits match exactly? done.
            if (targetVersion === versionBits) {
                return Version.getVersionForNumber(i + 7);
            }
            // Otherwise see if this is the closest to a real version info bit string
            // we have seen so far
            var bitsDifference = FormatInformation_1.default.numBitsDiffering(versionBits, targetVersion);
            if (bitsDifference < bestDifference) {
                bestVersion = i + 7;
                bestDifference = bitsDifference;
            }
        }
        // We can tolerate up to 3 bits of error since no two version info codewords will
        // differ in less than 8 bits.
        if (bestDifference <= 3) {
            return Version.getVersionForNumber(bestVersion);
        }
        // If we didn't find a close enough match, fail
        return null;
    };
    /**
     * See ISO 18004:2006 Annex E
     */
    Version.prototype.buildFunctionPattern = function () {
        var dimension = this.getDimensionForVersion();
        var bitMatrix = new BitMatrix_1.default(dimension);
        // Top left finder pattern + separator + format
        bitMatrix.setRegion(0, 0, 9, 9);
        // Top right finder pattern + separator + format
        bitMatrix.setRegion(dimension - 8, 0, 8, 9);
        // Bottom left finder pattern + separator + format
        bitMatrix.setRegion(0, dimension - 8, 9, 8);
        // Alignment patterns
        var max = this.alignmentPatternCenters.length;
        for (var x = 0; x < max; x++) {
            var i = this.alignmentPatternCenters[x] - 2;
            for (var y = 0; y < max; y++) {
                if ((x === 0 && (y === 0 || y === max - 1)) || (x === max - 1 && y === 0)) {
                    // No alignment patterns near the three finder patterns
                    continue;
                }
                bitMatrix.setRegion(this.alignmentPatternCenters[y] - 2, i, 5, 5);
            }
        }
        // Vertical timing pattern
        bitMatrix.setRegion(6, 9, 1, dimension - 17);
        // Horizontal timing pattern
        bitMatrix.setRegion(9, 6, dimension - 17, 1);
        if (this.versionNumber > 6) {
            // Version info, top right
            bitMatrix.setRegion(dimension - 11, 0, 3, 6);
            // Version info, bottom left
            bitMatrix.setRegion(0, dimension - 11, 6, 3);
        }
        return bitMatrix;
    };
    /*@Override*/
    Version.prototype.toString = function () {
        return '' + this.versionNumber;
    };
    /**
       * See ISO 18004:2006 Annex D.
       * Element i represents the raw version bits that specify version i + 7
       */
    Version.VERSION_DECODE_INFO = Int32Array.from([
        0x07C94, 0x085BC, 0x09A99, 0x0A4D3, 0x0BBF6,
        0x0C762, 0x0D847, 0x0E60D, 0x0F928, 0x10B78,
        0x1145D, 0x12A17, 0x13532, 0x149A6, 0x15683,
        0x168C9, 0x177EC, 0x18EC4, 0x191E1, 0x1AFAB,
        0x1B08E, 0x1CC1A, 0x1D33F, 0x1ED75, 0x1F250,
        0x209D5, 0x216F0, 0x228BA, 0x2379F, 0x24B0B,
        0x2542E, 0x26A64, 0x27541, 0x28C69
    ]);
    /**
       * See ISO 18004:2006 6.5.1 Table 9
       */
    Version.VERSIONS = [
        new Version(1, new Int32Array(0), new ECBlocks_1.default(7, new ECB_1.default(1, 19)), new ECBlocks_1.default(10, new ECB_1.default(1, 16)), new ECBlocks_1.default(13, new ECB_1.default(1, 13)), new ECBlocks_1.default(17, new ECB_1.default(1, 9))),
        new Version(2, Int32Array.from([6, 18]), new ECBlocks_1.default(10, new ECB_1.default(1, 34)), new ECBlocks_1.default(16, new ECB_1.default(1, 28)), new ECBlocks_1.default(22, new ECB_1.default(1, 22)), new ECBlocks_1.default(28, new ECB_1.default(1, 16))),
        new Version(3, Int32Array.from([6, 22]), new ECBlocks_1.default(15, new ECB_1.default(1, 55)), new ECBlocks_1.default(26, new ECB_1.default(1, 44)), new ECBlocks_1.default(18, new ECB_1.default(2, 17)), new ECBlocks_1.default(22, new ECB_1.default(2, 13))),
        new Version(4, Int32Array.from([6, 26]), new ECBlocks_1.default(20, new ECB_1.default(1, 80)), new ECBlocks_1.default(18, new ECB_1.default(2, 32)), new ECBlocks_1.default(26, new ECB_1.default(2, 24)), new ECBlocks_1.default(16, new ECB_1.default(4, 9))),
        new Version(5, Int32Array.from([6, 30]), new ECBlocks_1.default(26, new ECB_1.default(1, 108)), new ECBlocks_1.default(24, new ECB_1.default(2, 43)), new ECBlocks_1.default(18, new ECB_1.default(2, 15), new ECB_1.default(2, 16)), new ECBlocks_1.default(22, new ECB_1.default(2, 11), new ECB_1.default(2, 12))),
        new Version(6, Int32Array.from([6, 34]), new ECBlocks_1.default(18, new ECB_1.default(2, 68)), new ECBlocks_1.default(16, new ECB_1.default(4, 27)), new ECBlocks_1.default(24, new ECB_1.default(4, 19)), new ECBlocks_1.default(28, new ECB_1.default(4, 15))),
        new Version(7, Int32Array.from([6, 22, 38]), new ECBlocks_1.default(20, new ECB_1.default(2, 78)), new ECBlocks_1.default(18, new ECB_1.default(4, 31)), new ECBlocks_1.default(18, new ECB_1.default(2, 14), new ECB_1.default(4, 15)), new ECBlocks_1.default(26, new ECB_1.default(4, 13), new ECB_1.default(1, 14))),
        new Version(8, Int32Array.from([6, 24, 42]), new ECBlocks_1.default(24, new ECB_1.default(2, 97)), new ECBlocks_1.default(22, new ECB_1.default(2, 38), new ECB_1.default(2, 39)), new ECBlocks_1.default(22, new ECB_1.default(4, 18), new ECB_1.default(2, 19)), new ECBlocks_1.default(26, new ECB_1.default(4, 14), new ECB_1.default(2, 15))),
        new Version(9, Int32Array.from([6, 26, 46]), new ECBlocks_1.default(30, new ECB_1.default(2, 116)), new ECBlocks_1.default(22, new ECB_1.default(3, 36), new ECB_1.default(2, 37)), new ECBlocks_1.default(20, new ECB_1.default(4, 16), new ECB_1.default(4, 17)), new ECBlocks_1.default(24, new ECB_1.default(4, 12), new ECB_1.default(4, 13))),
        new Version(10, Int32Array.from([6, 28, 50]), new ECBlocks_1.default(18, new ECB_1.default(2, 68), new ECB_1.default(2, 69)), new ECBlocks_1.default(26, new ECB_1.default(4, 43), new ECB_1.default(1, 44)), new ECBlocks_1.default(24, new ECB_1.default(6, 19), new ECB_1.default(2, 20)), new ECBlocks_1.default(28, new ECB_1.default(6, 15), new ECB_1.default(2, 16))),
        new Version(11, Int32Array.from([6, 30, 54]), new ECBlocks_1.default(20, new ECB_1.default(4, 81)), new ECBlocks_1.default(30, new ECB_1.default(1, 50), new ECB_1.default(4, 51)), new ECBlocks_1.default(28, new ECB_1.default(4, 22), new ECB_1.default(4, 23)), new ECBlocks_1.default(24, new ECB_1.default(3, 12), new ECB_1.default(8, 13))),
        new Version(12, Int32Array.from([6, 32, 58]), new ECBlocks_1.default(24, new ECB_1.default(2, 92), new ECB_1.default(2, 93)), new ECBlocks_1.default(22, new ECB_1.default(6, 36), new ECB_1.default(2, 37)), new ECBlocks_1.default(26, new ECB_1.default(4, 20), new ECB_1.default(6, 21)), new ECBlocks_1.default(28, new ECB_1.default(7, 14), new ECB_1.default(4, 15))),
        new Version(13, Int32Array.from([6, 34, 62]), new ECBlocks_1.default(26, new ECB_1.default(4, 107)), new ECBlocks_1.default(22, new ECB_1.default(8, 37), new ECB_1.default(1, 38)), new ECBlocks_1.default(24, new ECB_1.default(8, 20), new ECB_1.default(4, 21)), new ECBlocks_1.default(22, new ECB_1.default(12, 11), new ECB_1.default(4, 12))),
        new Version(14, Int32Array.from([6, 26, 46, 66]), new ECBlocks_1.default(30, new ECB_1.default(3, 115), new ECB_1.default(1, 116)), new ECBlocks_1.default(24, new ECB_1.default(4, 40), new ECB_1.default(5, 41)), new ECBlocks_1.default(20, new ECB_1.default(11, 16), new ECB_1.default(5, 17)), new ECBlocks_1.default(24, new ECB_1.default(11, 12), new ECB_1.default(5, 13))),
        new Version(15, Int32Array.from([6, 26, 48, 70]), new ECBlocks_1.default(22, new ECB_1.default(5, 87), new ECB_1.default(1, 88)), new ECBlocks_1.default(24, new ECB_1.default(5, 41), new ECB_1.default(5, 42)), new ECBlocks_1.default(30, new ECB_1.default(5, 24), new ECB_1.default(7, 25)), new ECBlocks_1.default(24, new ECB_1.default(11, 12), new ECB_1.default(7, 13))),
        new Version(16, Int32Array.from([6, 26, 50, 74]), new ECBlocks_1.default(24, new ECB_1.default(5, 98), new ECB_1.default(1, 99)), new ECBlocks_1.default(28, new ECB_1.default(7, 45), new ECB_1.default(3, 46)), new ECBlocks_1.default(24, new ECB_1.default(15, 19), new ECB_1.default(2, 20)), new ECBlocks_1.default(30, new ECB_1.default(3, 15), new ECB_1.default(13, 16))),
        new Version(17, Int32Array.from([6, 30, 54, 78]), new ECBlocks_1.default(28, new ECB_1.default(1, 107), new ECB_1.default(5, 108)), new ECBlocks_1.default(28, new ECB_1.default(10, 46), new ECB_1.default(1, 47)), new ECBlocks_1.default(28, new ECB_1.default(1, 22), new ECB_1.default(15, 23)), new ECBlocks_1.default(28, new ECB_1.default(2, 14), new ECB_1.default(17, 15))),
        new Version(18, Int32Array.from([6, 30, 56, 82]), new ECBlocks_1.default(30, new ECB_1.default(5, 120), new ECB_1.default(1, 121)), new ECBlocks_1.default(26, new ECB_1.default(9, 43), new ECB_1.default(4, 44)), new ECBlocks_1.default(28, new ECB_1.default(17, 22), new ECB_1.default(1, 23)), new ECBlocks_1.default(28, new ECB_1.default(2, 14), new ECB_1.default(19, 15))),
        new Version(19, Int32Array.from([6, 30, 58, 86]), new ECBlocks_1.default(28, new ECB_1.default(3, 113), new ECB_1.default(4, 114)), new ECBlocks_1.default(26, new ECB_1.default(3, 44), new ECB_1.default(11, 45)), new ECBlocks_1.default(26, new ECB_1.default(17, 21), new ECB_1.default(4, 22)), new ECBlocks_1.default(26, new ECB_1.default(9, 13), new ECB_1.default(16, 14))),
        new Version(20, Int32Array.from([6, 34, 62, 90]), new ECBlocks_1.default(28, new ECB_1.default(3, 107), new ECB_1.default(5, 108)), new ECBlocks_1.default(26, new ECB_1.default(3, 41), new ECB_1.default(13, 42)), new ECBlocks_1.default(30, new ECB_1.default(15, 24), new ECB_1.default(5, 25)), new ECBlocks_1.default(28, new ECB_1.default(15, 15), new ECB_1.default(10, 16))),
        new Version(21, Int32Array.from([6, 28, 50, 72, 94]), new ECBlocks_1.default(28, new ECB_1.default(4, 116), new ECB_1.default(4, 117)), new ECBlocks_1.default(26, new ECB_1.default(17, 42)), new ECBlocks_1.default(28, new ECB_1.default(17, 22), new ECB_1.default(6, 23)), new ECBlocks_1.default(30, new ECB_1.default(19, 16), new ECB_1.default(6, 17))),
        new Version(22, Int32Array.from([6, 26, 50, 74, 98]), new ECBlocks_1.default(28, new ECB_1.default(2, 111), new ECB_1.default(7, 112)), new ECBlocks_1.default(28, new ECB_1.default(17, 46)), new ECBlocks_1.default(30, new ECB_1.default(7, 24), new ECB_1.default(16, 25)), new ECBlocks_1.default(24, new ECB_1.default(34, 13))),
        new Version(23, Int32Array.from([6, 30, 54, 78, 102]), new ECBlocks_1.default(30, new ECB_1.default(4, 121), new ECB_1.default(5, 122)), new ECBlocks_1.default(28, new ECB_1.default(4, 47), new ECB_1.default(14, 48)), new ECBlocks_1.default(30, new ECB_1.default(11, 24), new ECB_1.default(14, 25)), new ECBlocks_1.default(30, new ECB_1.default(16, 15), new ECB_1.default(14, 16))),
        new Version(24, Int32Array.from([6, 28, 54, 80, 106]), new ECBlocks_1.default(30, new ECB_1.default(6, 117), new ECB_1.default(4, 118)), new ECBlocks_1.default(28, new ECB_1.default(6, 45), new ECB_1.default(14, 46)), new ECBlocks_1.default(30, new ECB_1.default(11, 24), new ECB_1.default(16, 25)), new ECBlocks_1.default(30, new ECB_1.default(30, 16), new ECB_1.default(2, 17))),
        new Version(25, Int32Array.from([6, 32, 58, 84, 110]), new ECBlocks_1.default(26, new ECB_1.default(8, 106), new ECB_1.default(4, 107)), new ECBlocks_1.default(28, new ECB_1.default(8, 47), new ECB_1.default(13, 48)), new ECBlocks_1.default(30, new ECB_1.default(7, 24), new ECB_1.default(22, 25)), new ECBlocks_1.default(30, new ECB_1.default(22, 15), new ECB_1.default(13, 16))),
        new Version(26, Int32Array.from([6, 30, 58, 86, 114]), new ECBlocks_1.default(28, new ECB_1.default(10, 114), new ECB_1.default(2, 115)), new ECBlocks_1.default(28, new ECB_1.default(19, 46), new ECB_1.default(4, 47)), new ECBlocks_1.default(28, new ECB_1.default(28, 22), new ECB_1.default(6, 23)), new ECBlocks_1.default(30, new ECB_1.default(33, 16), new ECB_1.default(4, 17))),
        new Version(27, Int32Array.from([6, 34, 62, 90, 118]), new ECBlocks_1.default(30, new ECB_1.default(8, 122), new ECB_1.default(4, 123)), new ECBlocks_1.default(28, new ECB_1.default(22, 45), new ECB_1.default(3, 46)), new ECBlocks_1.default(30, new ECB_1.default(8, 23), new ECB_1.default(26, 24)), new ECBlocks_1.default(30, new ECB_1.default(12, 15), new ECB_1.default(28, 16))),
        new Version(28, Int32Array.from([6, 26, 50, 74, 98, 122]), new ECBlocks_1.default(30, new ECB_1.default(3, 117), new ECB_1.default(10, 118)), new ECBlocks_1.default(28, new ECB_1.default(3, 45), new ECB_1.default(23, 46)), new ECBlocks_1.default(30, new ECB_1.default(4, 24), new ECB_1.default(31, 25)), new ECBlocks_1.default(30, new ECB_1.default(11, 15), new ECB_1.default(31, 16))),
        new Version(29, Int32Array.from([6, 30, 54, 78, 102, 126]), new ECBlocks_1.default(30, new ECB_1.default(7, 116), new ECB_1.default(7, 117)), new ECBlocks_1.default(28, new ECB_1.default(21, 45), new ECB_1.default(7, 46)), new ECBlocks_1.default(30, new ECB_1.default(1, 23), new ECB_1.default(37, 24)), new ECBlocks_1.default(30, new ECB_1.default(19, 15), new ECB_1.default(26, 16))),
        new Version(30, Int32Array.from([6, 26, 52, 78, 104, 130]), new ECBlocks_1.default(30, new ECB_1.default(5, 115), new ECB_1.default(10, 116)), new ECBlocks_1.default(28, new ECB_1.default(19, 47), new ECB_1.default(10, 48)), new ECBlocks_1.default(30, new ECB_1.default(15, 24), new ECB_1.default(25, 25)), new ECBlocks_1.default(30, new ECB_1.default(23, 15), new ECB_1.default(25, 16))),
        new Version(31, Int32Array.from([6, 30, 56, 82, 108, 134]), new ECBlocks_1.default(30, new ECB_1.default(13, 115), new ECB_1.default(3, 116)), new ECBlocks_1.default(28, new ECB_1.default(2, 46), new ECB_1.default(29, 47)), new ECBlocks_1.default(30, new ECB_1.default(42, 24), new ECB_1.default(1, 25)), new ECBlocks_1.default(30, new ECB_1.default(23, 15), new ECB_1.default(28, 16))),
        new Version(32, Int32Array.from([6, 34, 60, 86, 112, 138]), new ECBlocks_1.default(30, new ECB_1.default(17, 115)), new ECBlocks_1.default(28, new ECB_1.default(10, 46), new ECB_1.default(23, 47)), new ECBlocks_1.default(30, new ECB_1.default(10, 24), new ECB_1.default(35, 25)), new ECBlocks_1.default(30, new ECB_1.default(19, 15), new ECB_1.default(35, 16))),
        new Version(33, Int32Array.from([6, 30, 58, 86, 114, 142]), new ECBlocks_1.default(30, new ECB_1.default(17, 115), new ECB_1.default(1, 116)), new ECBlocks_1.default(28, new ECB_1.default(14, 46), new ECB_1.default(21, 47)), new ECBlocks_1.default(30, new ECB_1.default(29, 24), new ECB_1.default(19, 25)), new ECBlocks_1.default(30, new ECB_1.default(11, 15), new ECB_1.default(46, 16))),
        new Version(34, Int32Array.from([6, 34, 62, 90, 118, 146]), new ECBlocks_1.default(30, new ECB_1.default(13, 115), new ECB_1.default(6, 116)), new ECBlocks_1.default(28, new ECB_1.default(14, 46), new ECB_1.default(23, 47)), new ECBlocks_1.default(30, new ECB_1.default(44, 24), new ECB_1.default(7, 25)), new ECBlocks_1.default(30, new ECB_1.default(59, 16), new ECB_1.default(1, 17))),
        new Version(35, Int32Array.from([6, 30, 54, 78, 102, 126, 150]), new ECBlocks_1.default(30, new ECB_1.default(12, 121), new ECB_1.default(7, 122)), new ECBlocks_1.default(28, new ECB_1.default(12, 47), new ECB_1.default(26, 48)), new ECBlocks_1.default(30, new ECB_1.default(39, 24), new ECB_1.default(14, 25)), new ECBlocks_1.default(30, new ECB_1.default(22, 15), new ECB_1.default(41, 16))),
        new Version(36, Int32Array.from([6, 24, 50, 76, 102, 128, 154]), new ECBlocks_1.default(30, new ECB_1.default(6, 121), new ECB_1.default(14, 122)), new ECBlocks_1.default(28, new ECB_1.default(6, 47), new ECB_1.default(34, 48)), new ECBlocks_1.default(30, new ECB_1.default(46, 24), new ECB_1.default(10, 25)), new ECBlocks_1.default(30, new ECB_1.default(2, 15), new ECB_1.default(64, 16))),
        new Version(37, Int32Array.from([6, 28, 54, 80, 106, 132, 158]), new ECBlocks_1.default(30, new ECB_1.default(17, 122), new ECB_1.default(4, 123)), new ECBlocks_1.default(28, new ECB_1.default(29, 46), new ECB_1.default(14, 47)), new ECBlocks_1.default(30, new ECB_1.default(49, 24), new ECB_1.default(10, 25)), new ECBlocks_1.default(30, new ECB_1.default(24, 15), new ECB_1.default(46, 16))),
        new Version(38, Int32Array.from([6, 32, 58, 84, 110, 136, 162]), new ECBlocks_1.default(30, new ECB_1.default(4, 122), new ECB_1.default(18, 123)), new ECBlocks_1.default(28, new ECB_1.default(13, 46), new ECB_1.default(32, 47)), new ECBlocks_1.default(30, new ECB_1.default(48, 24), new ECB_1.default(14, 25)), new ECBlocks_1.default(30, new ECB_1.default(42, 15), new ECB_1.default(32, 16))),
        new Version(39, Int32Array.from([6, 26, 54, 82, 110, 138, 166]), new ECBlocks_1.default(30, new ECB_1.default(20, 117), new ECB_1.default(4, 118)), new ECBlocks_1.default(28, new ECB_1.default(40, 47), new ECB_1.default(7, 48)), new ECBlocks_1.default(30, new ECB_1.default(43, 24), new ECB_1.default(22, 25)), new ECBlocks_1.default(30, new ECB_1.default(10, 15), new ECB_1.default(67, 16))),
        new Version(40, Int32Array.from([6, 30, 58, 86, 114, 142, 170]), new ECBlocks_1.default(30, new ECB_1.default(19, 118), new ECB_1.default(6, 119)), new ECBlocks_1.default(28, new ECB_1.default(18, 47), new ECB_1.default(31, 48)), new ECBlocks_1.default(30, new ECB_1.default(34, 24), new ECB_1.default(34, 25)), new ECBlocks_1.default(30, new ECB_1.default(20, 15), new ECB_1.default(61, 16)))
    ];
    return Version;
}());
exports.default = Version;
//# sourceMappingURL=Version.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/detector/AlignmentPattern.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/detector/AlignmentPattern.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.detector {*/
var ResultPoint_1 = __webpack_require__(/*! ../../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
/**
 * <p>Encapsulates an alignment pattern, which are the smaller square patterns found in
 * all but the simplest QR Codes.</p>
 *
 * @author Sean Owen
 */
var AlignmentPattern = /** @class */ (function (_super) {
    __extends(AlignmentPattern, _super);
    function AlignmentPattern(posX /*float*/, posY /*float*/, estimatedModuleSize /*float*/) {
        var _this = _super.call(this, posX, posY) || this;
        _this.estimatedModuleSize = estimatedModuleSize;
        return _this;
    }
    /**
     * <p>Determines if this alignment pattern "about equals" an alignment pattern at the stated
     * position and size -- meaning, it is at nearly the same center with nearly the same size.</p>
     */
    AlignmentPattern.prototype.aboutEquals = function (moduleSize /*float*/, i /*float*/, j /*float*/) {
        if (Math.abs(i - this.getY()) <= moduleSize && Math.abs(j - this.getX()) <= moduleSize) {
            var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
            return moduleSizeDiff <= 1.0 || moduleSizeDiff <= this.estimatedModuleSize;
        }
        return false;
    };
    /**
     * Combines this object's current estimate of a finder pattern position and module size
     * with a new estimate. It returns a new {@code FinderPattern} containing an average of the two.
     */
    AlignmentPattern.prototype.combineEstimate = function (i /*float*/, j /*float*/, newModuleSize /*float*/) {
        var combinedX = (this.getX() + j) / 2.0;
        var combinedY = (this.getY() + i) / 2.0;
        var combinedModuleSize = (this.estimatedModuleSize + newModuleSize) / 2.0;
        return new AlignmentPattern(combinedX, combinedY, combinedModuleSize);
    };
    return AlignmentPattern;
}(ResultPoint_1.default));
exports.default = AlignmentPattern;
//# sourceMappingURL=AlignmentPattern.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/detector/AlignmentPatternFinder.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/detector/AlignmentPatternFinder.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AlignmentPattern_1 = __webpack_require__(/*! ./AlignmentPattern */ "./node_modules/@zxing/library/esm5/core/qrcode/detector/AlignmentPattern.js");
var NotFoundException_1 = __webpack_require__(/*! ../../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/*import java.util.ArrayList;*/
/*import java.util.List;*/
/**
 * <p>This class attempts to find alignment patterns in a QR Code. Alignment patterns look like finder
 * patterns but are smaller and appear at regular intervals throughout the image.</p>
 *
 * <p>At the moment this only looks for the bottom-right alignment pattern.</p>
 *
 * <p>This is mostly a simplified copy of {@link FinderPatternFinder}. It is copied,
 * pasted and stripped down here for maximum performance but does unfortunately duplicate
 * some code.</p>
 *
 * <p>This class is thread-safe but not reentrant. Each thread must allocate its own object.</p>
 *
 * @author Sean Owen
 */
var AlignmentPatternFinder = /** @class */ (function () {
    /**
     * <p>Creates a finder that will look in a portion of the whole image.</p>
     *
     * @param image image to search
     * @param startX left column from which to start searching
     * @param startY top row from which to start searching
     * @param width width of region to search
     * @param height height of region to search
     * @param moduleSize estimated module size so far
     */
    function AlignmentPatternFinder(image, startX /*int*/, startY /*int*/, width /*int*/, height /*int*/, moduleSize /*float*/, resultPointCallback) {
        this.image = image;
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.moduleSize = moduleSize;
        this.resultPointCallback = resultPointCallback;
        this.possibleCenters = []; // new Array<any>(5))
        // TYPESCRIPTPORT: array initialization without size as the length is checked below
        this.crossCheckStateCount = new Int32Array(3);
    }
    /**
     * <p>This method attempts to find the bottom-right alignment pattern in the image. It is a bit messy since
     * it's pretty performance-critical and so is written to be fast foremost.</p>
     *
     * @return {@link AlignmentPattern} if found
     * @throws NotFoundException if not found
     */
    AlignmentPatternFinder.prototype.find = function () {
        var startX = this.startX;
        var height = this.height;
        var width = this.width;
        var maxJ = startX + width;
        var middleI = this.startY + (height / 2);
        // We are looking for black/white/black modules in 1:1:1 ratio
        // this tracks the number of black/white/black modules seen so far
        var stateCount = new Int32Array(3);
        var image = this.image;
        for (var iGen = 0; iGen < height; iGen++) {
            // Search from middle outwards
            var i = middleI + ((iGen & 0x01) === 0 ? Math.floor((iGen + 1) / 2) : -Math.floor((iGen + 1) / 2));
            stateCount[0] = 0;
            stateCount[1] = 0;
            stateCount[2] = 0;
            var j = startX;
            // Burn off leading white pixels before anything else; if we start in the middle of
            // a white run, it doesn't make sense to count its length, since we don't know if the
            // white run continued to the left of the start point
            while (j < maxJ && !image.get(j, i)) {
                j++;
            }
            var currentState = 0;
            while (j < maxJ) {
                if (image.get(j, i)) {
                    // Black pixel
                    if (currentState === 1) { // Counting black pixels
                        stateCount[1]++;
                    }
                    else { // Counting white pixels
                        if (currentState === 2) { // A winner?
                            if (this.foundPatternCross(stateCount)) { // Yes
                                var confirmed = this.handlePossibleCenter(stateCount, i, j);
                                if (confirmed !== null) {
                                    return confirmed;
                                }
                            }
                            stateCount[0] = stateCount[2];
                            stateCount[1] = 1;
                            stateCount[2] = 0;
                            currentState = 1;
                        }
                        else {
                            stateCount[++currentState]++;
                        }
                    }
                }
                else { // White pixel
                    if (currentState === 1) { // Counting black pixels
                        currentState++;
                    }
                    stateCount[currentState]++;
                }
                j++;
            }
            if (this.foundPatternCross(stateCount)) {
                var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
                if (confirmed !== null) {
                    return confirmed;
                }
            }
        }
        // Hmm, nothing we saw was observed and confirmed twice. If we had
        // any guess at all, return it.
        if (this.possibleCenters.length !== 0) {
            return this.possibleCenters[0];
        }
        throw new NotFoundException_1.default();
    };
    /**
     * Given a count of black/white/black pixels just seen and an end position,
     * figures the location of the center of this black/white/black run.
     */
    AlignmentPatternFinder.centerFromEnd = function (stateCount, end /*int*/) {
        return (end - stateCount[2]) - stateCount[1] / 2.0;
    };
    /**
     * @param stateCount count of black/white/black pixels just read
     * @return true iff the proportions of the counts is close enough to the 1/1/1 ratios
     *         used by alignment patterns to be considered a match
     */
    AlignmentPatternFinder.prototype.foundPatternCross = function (stateCount) {
        var moduleSize = this.moduleSize;
        var maxVariance = moduleSize / 2.0;
        for (var i = 0; i < 3; i++) {
            if (Math.abs(moduleSize - stateCount[i]) >= maxVariance) {
                return false;
            }
        }
        return true;
    };
    /**
     * <p>After a horizontal scan finds a potential alignment pattern, this method
     * "cross-checks" by scanning down vertically through the center of the possible
     * alignment pattern to see if the same proportion is detected.</p>
     *
     * @param startI row where an alignment pattern was detected
     * @param centerJ center of the section that appears to cross an alignment pattern
     * @param maxCount maximum reasonable number of modules that should be
     * observed in any reading state, based on the results of the horizontal scan
     * @return vertical center of alignment pattern, or {@link Float#NaN} if not found
     */
    AlignmentPatternFinder.prototype.crossCheckVertical = function (startI /*int*/, centerJ /*int*/, maxCount /*int*/, originalStateCountTotal /*int*/) {
        var image = this.image;
        var maxI = image.getHeight();
        var stateCount = this.crossCheckStateCount;
        stateCount[0] = 0;
        stateCount[1] = 0;
        stateCount[2] = 0;
        // Start counting up from center
        var i = startI;
        while (i >= 0 && image.get(centerJ, i) && stateCount[1] <= maxCount) {
            stateCount[1]++;
            i--;
        }
        // If already too many modules in this state or ran off the edge:
        if (i < 0 || stateCount[1] > maxCount) {
            return NaN;
        }
        while (i >= 0 && !image.get(centerJ, i) && stateCount[0] <= maxCount) {
            stateCount[0]++;
            i--;
        }
        if (stateCount[0] > maxCount) {
            return NaN;
        }
        // Now also count down from center
        i = startI + 1;
        while (i < maxI && image.get(centerJ, i) && stateCount[1] <= maxCount) {
            stateCount[1]++;
            i++;
        }
        if (i === maxI || stateCount[1] > maxCount) {
            return NaN;
        }
        while (i < maxI && !image.get(centerJ, i) && stateCount[2] <= maxCount) {
            stateCount[2]++;
            i++;
        }
        if (stateCount[2] > maxCount) {
            return NaN;
        }
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
        if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
            return NaN;
        }
        return this.foundPatternCross(stateCount) ? AlignmentPatternFinder.centerFromEnd(stateCount, i) : NaN;
    };
    /**
     * <p>This is called when a horizontal scan finds a possible alignment pattern. It will
     * cross check with a vertical scan, and if successful, will see if this pattern had been
     * found on a previous horizontal scan. If so, we consider it confirmed and conclude we have
     * found the alignment pattern.</p>
     *
     * @param stateCount reading state module counts from horizontal scan
     * @param i row where alignment pattern may be found
     * @param j end of possible alignment pattern in row
     * @return {@link AlignmentPattern} if we have found the same pattern twice, or null if not
     */
    AlignmentPatternFinder.prototype.handlePossibleCenter = function (stateCount, i /*int*/, j /*int*/) {
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
        var centerJ = AlignmentPatternFinder.centerFromEnd(stateCount, j);
        var centerI = this.crossCheckVertical(i, /*(int) */ centerJ, 2 * stateCount[1], stateCountTotal);
        if (!isNaN(centerI)) {
            var estimatedModuleSize = (stateCount[0] + stateCount[1] + stateCount[2]) / 3.0;
            for (var _i = 0, _a = this.possibleCenters; _i < _a.length; _i++) {
                var center = _a[_i];
                // Look for about the same center and module size:
                if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
                    return center.combineEstimate(centerI, centerJ, estimatedModuleSize);
                }
            }
            // Hadn't found this before; save it
            var point = new AlignmentPattern_1.default(centerJ, centerI, estimatedModuleSize);
            this.possibleCenters.push(point);
            if (this.resultPointCallback !== null && this.resultPointCallback !== undefined) {
                this.resultPointCallback.foundPossibleResultPoint(point);
            }
        }
        return null;
    };
    return AlignmentPatternFinder;
}());
exports.default = AlignmentPatternFinder;
//# sourceMappingURL=AlignmentPatternFinder.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/detector/Detector.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/detector/Detector.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ResultPoint_1 = __webpack_require__(/*! ../../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var DetectorResult_1 = __webpack_require__(/*! ../../common/DetectorResult */ "./node_modules/@zxing/library/esm5/core/common/DetectorResult.js");
var GridSamplerInstance_1 = __webpack_require__(/*! ../../common/GridSamplerInstance */ "./node_modules/@zxing/library/esm5/core/common/GridSamplerInstance.js");
var PerspectiveTransform_1 = __webpack_require__(/*! ../../common/PerspectiveTransform */ "./node_modules/@zxing/library/esm5/core/common/PerspectiveTransform.js");
var MathUtils_1 = __webpack_require__(/*! ../../common/detector/MathUtils */ "./node_modules/@zxing/library/esm5/core/common/detector/MathUtils.js");
var Version_1 = __webpack_require__(/*! ../decoder/Version */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Version.js");
var FinderPatternFinder_1 = __webpack_require__(/*! ./FinderPatternFinder */ "./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPatternFinder.js");
var AlignmentPatternFinder_1 = __webpack_require__(/*! ./AlignmentPatternFinder */ "./node_modules/@zxing/library/esm5/core/qrcode/detector/AlignmentPatternFinder.js");
var NotFoundException_1 = __webpack_require__(/*! ../../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/*import java.util.Map;*/
/**
 * <p>Encapsulates logic that can detect a QR Code in an image, even if the QR Code
 * is rotated or skewed, or partially obscured.</p>
 *
 * @author Sean Owen
 */
var Detector = /** @class */ (function () {
    function Detector(image) {
        this.image = image;
    }
    Detector.prototype.getImage = function () {
        return this.image;
    };
    Detector.prototype.getResultPointCallback = function () {
        return this.resultPointCallback;
    };
    /**
     * <p>Detects a QR Code in an image.</p>
     *
     * @return {@link DetectorResult} encapsulating results of detecting a QR Code
     * @throws NotFoundException if QR Code cannot be found
     * @throws FormatException if a QR Code cannot be decoded
     */
    // public detect(): DetectorResult /*throws NotFoundException, FormatException*/ {
    //   return detect(null)
    // }
    /**
     * <p>Detects a QR Code in an image.</p>
     *
     * @param hints optional hints to detector
     * @return {@link DetectorResult} encapsulating results of detecting a QR Code
     * @throws NotFoundException if QR Code cannot be found
     * @throws FormatException if a QR Code cannot be decoded
     */
    Detector.prototype.detect = function (hints) {
        this.resultPointCallback = (hints === null || hints === undefined) ? null :
            /*(ResultPointCallback) */ hints.get(9 /* NEED_RESULT_POINT_CALLBACK */);
        var finder = new FinderPatternFinder_1.default(this.image, this.resultPointCallback);
        var info = finder.find(hints);
        return this.processFinderPatternInfo(info);
    };
    Detector.prototype.processFinderPatternInfo = function (info) {
        var topLeft = info.getTopLeft();
        var topRight = info.getTopRight();
        var bottomLeft = info.getBottomLeft();
        var moduleSize = this.calculateModuleSize(topLeft, topRight, bottomLeft);
        if (moduleSize < 1.0) {
            throw new NotFoundException_1.default('No pattern found in proccess finder.');
        }
        var dimension = Detector.computeDimension(topLeft, topRight, bottomLeft, moduleSize);
        var provisionalVersion = Version_1.default.getProvisionalVersionForDimension(dimension);
        var modulesBetweenFPCenters = provisionalVersion.getDimensionForVersion() - 7;
        var alignmentPattern = null;
        // Anything above version 1 has an alignment pattern
        if (provisionalVersion.getAlignmentPatternCenters().length > 0) {
            // Guess where a "bottom right" finder pattern would have been
            var bottomRightX = topRight.getX() - topLeft.getX() + bottomLeft.getX();
            var bottomRightY = topRight.getY() - topLeft.getY() + bottomLeft.getY();
            // Estimate that alignment pattern is closer by 3 modules
            // from "bottom right" to known top left location
            var correctionToTopLeft = 1.0 - 3.0 / modulesBetweenFPCenters;
            var estAlignmentX = /*(int) */ Math.floor(topLeft.getX() + correctionToTopLeft * (bottomRightX - topLeft.getX()));
            var estAlignmentY = /*(int) */ Math.floor(topLeft.getY() + correctionToTopLeft * (bottomRightY - topLeft.getY()));
            // Kind of arbitrary -- expand search radius before giving up
            for (var i = 4; i <= 16; i <<= 1) {
                try {
                    alignmentPattern = this.findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY, i);
                    break;
                }
                catch (re /*NotFoundException*/) {
                    if (!(re instanceof NotFoundException_1.default)) {
                        throw re;
                    }
                    // try next round
                }
            }
            // If we didn't find alignment pattern... well try anyway without it
        }
        var transform = Detector.createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension);
        var bits = Detector.sampleGrid(this.image, transform, dimension);
        var points;
        if (alignmentPattern === null) {
            points = [bottomLeft, topLeft, topRight];
        }
        else {
            points = [bottomLeft, topLeft, topRight, alignmentPattern];
        }
        return new DetectorResult_1.default(bits, points);
    };
    Detector.createTransform = function (topLeft, topRight, bottomLeft, alignmentPattern, dimension /*int*/) {
        var dimMinusThree = dimension - 3.5;
        var bottomRightX; /*float*/
        var bottomRightY; /*float*/
        var sourceBottomRightX; /*float*/
        var sourceBottomRightY; /*float*/
        if (alignmentPattern !== null) {
            bottomRightX = alignmentPattern.getX();
            bottomRightY = alignmentPattern.getY();
            sourceBottomRightX = dimMinusThree - 3.0;
            sourceBottomRightY = sourceBottomRightX;
        }
        else {
            // Don't have an alignment pattern, just make up the bottom-right point
            bottomRightX = (topRight.getX() - topLeft.getX()) + bottomLeft.getX();
            bottomRightY = (topRight.getY() - topLeft.getY()) + bottomLeft.getY();
            sourceBottomRightX = dimMinusThree;
            sourceBottomRightY = dimMinusThree;
        }
        return PerspectiveTransform_1.default.quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.getX(), topLeft.getY(), topRight.getX(), topRight.getY(), bottomRightX, bottomRightY, bottomLeft.getX(), bottomLeft.getY());
    };
    Detector.sampleGrid = function (image, transform, dimension /*int*/) {
        var sampler = GridSamplerInstance_1.default.getInstance();
        return sampler.sampleGridWithTransform(image, dimension, dimension, transform);
    };
    /**
     * <p>Computes the dimension (number of modules on a size) of the QR Code based on the position
     * of the finder patterns and estimated module size.</p>
     */
    Detector.computeDimension = function (topLeft, topRight, bottomLeft, moduleSize /*float*/) {
        var tltrCentersDimension = MathUtils_1.default.round(ResultPoint_1.default.distance(topLeft, topRight) / moduleSize);
        var tlblCentersDimension = MathUtils_1.default.round(ResultPoint_1.default.distance(topLeft, bottomLeft) / moduleSize);
        var dimension = Math.floor((tltrCentersDimension + tlblCentersDimension) / 2) + 7;
        switch (dimension & 0x03) { // mod 4
            case 0:
                dimension++;
                break;
            // 1? do nothing
            case 2:
                dimension--;
                break;
            case 3:
                throw new NotFoundException_1.default('Dimensions could be not found.');
        }
        return dimension;
    };
    /**
     * <p>Computes an average estimated module size based on estimated derived from the positions
     * of the three finder patterns.</p>
     *
     * @param topLeft detected top-left finder pattern center
     * @param topRight detected top-right finder pattern center
     * @param bottomLeft detected bottom-left finder pattern center
     * @return estimated module size
     */
    Detector.prototype.calculateModuleSize = function (topLeft, topRight, bottomLeft) {
        // Take the average
        return (this.calculateModuleSizeOneWay(topLeft, topRight) +
            this.calculateModuleSizeOneWay(topLeft, bottomLeft)) / 2.0;
    };
    /**
     * <p>Estimates module size based on two finder patterns -- it uses
     * {@link #sizeOfBlackWhiteBlackRunBothWays(int, int, int, int)} to figure the
     * width of each, measuring along the axis between their centers.</p>
     */
    Detector.prototype.calculateModuleSizeOneWay = function (pattern, otherPattern) {
        var moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays(/*(int) */ Math.floor(pattern.getX()), 
        /*(int) */ Math.floor(pattern.getY()), 
        /*(int) */ Math.floor(otherPattern.getX()), 
        /*(int) */ Math.floor(otherPattern.getY()));
        var moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays(/*(int) */ Math.floor(otherPattern.getX()), 
        /*(int) */ Math.floor(otherPattern.getY()), 
        /*(int) */ Math.floor(pattern.getX()), 
        /*(int) */ Math.floor(pattern.getY()));
        if (isNaN(moduleSizeEst1)) {
            return moduleSizeEst2 / 7.0;
        }
        if (isNaN(moduleSizeEst2)) {
            return moduleSizeEst1 / 7.0;
        }
        // Average them, and divide by 7 since we've counted the width of 3 black modules,
        // and 1 white and 1 black module on either side. Ergo, divide sum by 14.
        return (moduleSizeEst1 + moduleSizeEst2) / 14.0;
    };
    /**
     * See {@link #sizeOfBlackWhiteBlackRun(int, int, int, int)}; computes the total width of
     * a finder pattern by looking for a black-white-black run from the center in the direction
     * of another point (another finder pattern center), and in the opposite direction too.
     */
    Detector.prototype.sizeOfBlackWhiteBlackRunBothWays = function (fromX /*int*/, fromY /*int*/, toX /*int*/, toY /*int*/) {
        var result = this.sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY);
        // Now count other way -- don't run off image though of course
        var scale = 1.0;
        var otherToX = fromX - (toX - fromX);
        if (otherToX < 0) {
            scale = fromX / /*(float) */ (fromX - otherToX);
            otherToX = 0;
        }
        else if (otherToX >= this.image.getWidth()) {
            scale = (this.image.getWidth() - 1 - fromX) / /*(float) */ (otherToX - fromX);
            otherToX = this.image.getWidth() - 1;
        }
        var otherToY = /*(int) */ Math.floor(fromY - (toY - fromY) * scale);
        scale = 1.0;
        if (otherToY < 0) {
            scale = fromY / /*(float) */ (fromY - otherToY);
            otherToY = 0;
        }
        else if (otherToY >= this.image.getHeight()) {
            scale = (this.image.getHeight() - 1 - fromY) / /*(float) */ (otherToY - fromY);
            otherToY = this.image.getHeight() - 1;
        }
        otherToX = /*(int) */ Math.floor(fromX + (otherToX - fromX) * scale);
        result += this.sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY);
        // Middle pixel is double-counted this way; subtract 1
        return result - 1.0;
    };
    /**
     * <p>This method traces a line from a point in the image, in the direction towards another point.
     * It begins in a black region, and keeps going until it finds white, then black, then white again.
     * It reports the distance from the start to this point.</p>
     *
     * <p>This is used when figuring out how wide a finder pattern is, when the finder pattern
     * may be skewed or rotated.</p>
     */
    Detector.prototype.sizeOfBlackWhiteBlackRun = function (fromX /*int*/, fromY /*int*/, toX /*int*/, toY /*int*/) {
        // Mild variant of Bresenham's algorithm
        // see http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
        var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
        if (steep) {
            var temp = fromX;
            fromX = fromY;
            fromY = temp;
            temp = toX;
            toX = toY;
            toY = temp;
        }
        var dx = Math.abs(toX - fromX);
        var dy = Math.abs(toY - fromY);
        var error = -dx / 2;
        var xstep = fromX < toX ? 1 : -1;
        var ystep = fromY < toY ? 1 : -1;
        // In black pixels, looking for white, first or second time.
        var state = 0;
        // Loop up until x == toX, but not beyond
        var xLimit = toX + xstep;
        for (var x = fromX, y = fromY; x !== xLimit; x += xstep) {
            var realX = steep ? y : x;
            var realY = steep ? x : y;
            // Does current pixel mean we have moved white to black or vice versa?
            // Scanning black in state 0,2 and white in state 1, so if we find the wrong
            // color, advance to next state or end if we are in state 2 already
            if ((state === 1) === this.image.get(realX, realY)) {
                if (state === 2) {
                    return MathUtils_1.default.distance(x, y, fromX, fromY);
                }
                state++;
            }
            error += dy;
            if (error > 0) {
                if (y === toY) {
                    break;
                }
                y += ystep;
                error -= dx;
            }
        }
        // Found black-white-black; give the benefit of the doubt that the next pixel outside the image
        // is "white" so this last point at (toX+xStep,toY) is the right ending. This is really a
        // small approximation; (toX+xStep,toY+yStep) might be really correct. Ignore this.
        if (state === 2) {
            return MathUtils_1.default.distance(toX + xstep, toY, fromX, fromY);
        }
        // else we didn't find even black-white-black; no estimate is really possible
        return NaN;
    };
    /**
     * <p>Attempts to locate an alignment pattern in a limited region of the image, which is
     * guessed to contain it. This method uses {@link AlignmentPattern}.</p>
     *
     * @param overallEstModuleSize estimated module size so far
     * @param estAlignmentX x coordinate of center of area probably containing alignment pattern
     * @param estAlignmentY y coordinate of above
     * @param allowanceFactor number of pixels in all directions to search from the center
     * @return {@link AlignmentPattern} if found, or null otherwise
     * @throws NotFoundException if an unexpected error occurs during detection
     */
    Detector.prototype.findAlignmentInRegion = function (overallEstModuleSize /*float*/, estAlignmentX /*int*/, estAlignmentY /*int*/, allowanceFactor /*float*/) {
        // Look for an alignment pattern (3 modules in size) around where it
        // should be
        var allowance = /*(int) */ Math.floor(allowanceFactor * overallEstModuleSize);
        var alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance);
        var alignmentAreaRightX = Math.min(this.image.getWidth() - 1, estAlignmentX + allowance);
        if (alignmentAreaRightX - alignmentAreaLeftX < overallEstModuleSize * 3) {
            throw new NotFoundException_1.default('Alignment top exceeds estimated module size.');
        }
        var alignmentAreaTopY = Math.max(0, estAlignmentY - allowance);
        var alignmentAreaBottomY = Math.min(this.image.getHeight() - 1, estAlignmentY + allowance);
        if (alignmentAreaBottomY - alignmentAreaTopY < overallEstModuleSize * 3) {
            throw new NotFoundException_1.default('Alignment bottom exceeds estimated module size.');
        }
        var alignmentFinder = new AlignmentPatternFinder_1.default(this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.resultPointCallback);
        return alignmentFinder.find();
    };
    return Detector;
}());
exports.default = Detector;
//# sourceMappingURL=Detector.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPattern.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPattern.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.detector {*/
var ResultPoint_1 = __webpack_require__(/*! ../../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
/**
 * <p>Encapsulates a finder pattern, which are the three square patterns found in
 * the corners of QR Codes. It also encapsulates a count of similar finder patterns,
 * as a convenience to the finder's bookkeeping.</p>
 *
 * @author Sean Owen
 */
var FinderPattern = /** @class */ (function (_super) {
    __extends(FinderPattern, _super);
    // FinderPattern(posX: number/*float*/, posY: number/*float*/, estimatedModuleSize: number/*float*/) {
    //   this(posX, posY, estimatedModuleSize, 1)
    // }
    function FinderPattern(posX /*float*/, posY /*float*/, estimatedModuleSize /*float*/, count /*int*/) {
        var _this = _super.call(this, posX, posY) || this;
        _this.estimatedModuleSize = estimatedModuleSize;
        _this.count = count;
        if (undefined === count) {
            _this.count = 1;
        }
        return _this;
    }
    FinderPattern.prototype.getEstimatedModuleSize = function () {
        return this.estimatedModuleSize;
    };
    FinderPattern.prototype.getCount = function () {
        return this.count;
    };
    /*
    void incrementCount() {
      this.count++
    }
     */
    /**
     * <p>Determines if this finder pattern "about equals" a finder pattern at the stated
     * position and size -- meaning, it is at nearly the same center with nearly the same size.</p>
     */
    FinderPattern.prototype.aboutEquals = function (moduleSize /*float*/, i /*float*/, j /*float*/) {
        if (Math.abs(i - this.getY()) <= moduleSize && Math.abs(j - this.getX()) <= moduleSize) {
            var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
            return moduleSizeDiff <= 1.0 || moduleSizeDiff <= this.estimatedModuleSize;
        }
        return false;
    };
    /**
     * Combines this object's current estimate of a finder pattern position and module size
     * with a new estimate. It returns a new {@code FinderPattern} containing a weighted average
     * based on count.
     */
    FinderPattern.prototype.combineEstimate = function (i /*float*/, j /*float*/, newModuleSize /*float*/) {
        var combinedCount = this.count + 1;
        var combinedX = (this.count * this.getX() + j) / combinedCount;
        var combinedY = (this.count * this.getY() + i) / combinedCount;
        var combinedModuleSize = (this.count * this.estimatedModuleSize + newModuleSize) / combinedCount;
        return new FinderPattern(combinedX, combinedY, combinedModuleSize, combinedCount);
    };
    return FinderPattern;
}(ResultPoint_1.default));
exports.default = FinderPattern;
//# sourceMappingURL=FinderPattern.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPatternFinder.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPatternFinder.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ResultPoint_1 = __webpack_require__(/*! ../../ResultPoint */ "./node_modules/@zxing/library/esm5/core/ResultPoint.js");
var FinderPattern_1 = __webpack_require__(/*! ./FinderPattern */ "./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPattern.js");
var FinderPatternInfo_1 = __webpack_require__(/*! ./FinderPatternInfo */ "./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPatternInfo.js");
var NotFoundException_1 = __webpack_require__(/*! ../../NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
/*import java.io.Serializable;*/
/*import java.util.ArrayList;*/
/*import java.util.Collections;*/
/*import java.util.Comparator;*/
/*import java.util.List;*/
/*import java.util.Map;*/
/**
 * <p>This class attempts to find finder patterns in a QR Code. Finder patterns are the square
 * markers at three corners of a QR Code.</p>
 *
 * <p>This class is thread-safe but not reentrant. Each thread must allocate its own object.
 *
 * @author Sean Owen
 */
var FinderPatternFinder = /** @class */ (function () {
    /**
     * <p>Creates a finder that will search the image for three finder patterns.</p>
     *
     * @param image image to search
     */
    // public constructor(image: BitMatrix) {
    //   this(image, null)
    // }
    function FinderPatternFinder(image, resultPointCallback) {
        this.image = image;
        this.resultPointCallback = resultPointCallback;
        this.possibleCenters = [];
        this.crossCheckStateCount = new Int32Array(5);
        this.resultPointCallback = resultPointCallback;
    }
    FinderPatternFinder.prototype.getImage = function () {
        return this.image;
    };
    FinderPatternFinder.prototype.getPossibleCenters = function () {
        return this.possibleCenters;
    };
    FinderPatternFinder.prototype.find = function (hints) {
        var tryHarder = (hints !== null && hints !== undefined) && undefined !== hints.get(3 /* TRY_HARDER */);
        var pureBarcode = (hints !== null && hints !== undefined) && undefined !== hints.get(1 /* PURE_BARCODE */);
        var image = this.image;
        var maxI = image.getHeight();
        var maxJ = image.getWidth();
        // We are looking for black/white/black/white/black modules in
        // 1:1:3:1:1 ratio; this tracks the number of such modules seen so far
        // Let's assume that the maximum version QR Code we support takes up 1/4 the height of the
        // image, and then account for the center being 3 modules in size. This gives the smallest
        // number of pixels the center could be, so skip this often. When trying harder, look for all
        // QR versions regardless of how dense they are.
        var iSkip = Math.floor((3 * maxI) / (4 * FinderPatternFinder.MAX_MODULES));
        if (iSkip < FinderPatternFinder.MIN_SKIP || tryHarder) {
            iSkip = FinderPatternFinder.MIN_SKIP;
        }
        var done = false;
        var stateCount = new Int32Array(5);
        for (var i = iSkip - 1; i < maxI && !done; i += iSkip) {
            // Get a row of black/white values
            stateCount[0] = 0;
            stateCount[1] = 0;
            stateCount[2] = 0;
            stateCount[3] = 0;
            stateCount[4] = 0;
            var currentState = 0;
            for (var j = 0; j < maxJ; j++) {
                if (image.get(j, i)) {
                    // Black pixel
                    if ((currentState & 1) === 1) { // Counting white pixels
                        currentState++;
                    }
                    stateCount[currentState]++;
                }
                else { // White pixel
                    if ((currentState & 1) === 0) { // Counting black pixels
                        if (currentState === 4) { // A winner?
                            if (FinderPatternFinder.foundPatternCross(stateCount)) { // Yes
                                var confirmed = this.handlePossibleCenter(stateCount, i, j, pureBarcode);
                                if (confirmed === true) {
                                    // Start examining every other line. Checking each line turned out to be too
                                    // expensive and didn't improve performance.
                                    iSkip = 2;
                                    if (this.hasSkipped === true) {
                                        done = this.haveMultiplyConfirmedCenters();
                                    }
                                    else {
                                        var rowSkip = this.findRowSkip();
                                        if (rowSkip > stateCount[2]) {
                                            // Skip rows between row of lower confirmed center
                                            // and top of presumed third confirmed center
                                            // but back up a bit to get a full chance of detecting
                                            // it, entire width of center of finder pattern
                                            // Skip by rowSkip, but back off by stateCount[2] (size of last center
                                            // of pattern we saw) to be conservative, and also back off by iSkip which
                                            // is about to be re-added
                                            i += rowSkip - stateCount[2] - iSkip;
                                            j = maxJ - 1;
                                        }
                                    }
                                }
                                else {
                                    stateCount[0] = stateCount[2];
                                    stateCount[1] = stateCount[3];
                                    stateCount[2] = stateCount[4];
                                    stateCount[3] = 1;
                                    stateCount[4] = 0;
                                    currentState = 3;
                                    continue;
                                }
                                // Clear state to start looking again
                                currentState = 0;
                                stateCount[0] = 0;
                                stateCount[1] = 0;
                                stateCount[2] = 0;
                                stateCount[3] = 0;
                                stateCount[4] = 0;
                            }
                            else { // No, shift counts back by two
                                stateCount[0] = stateCount[2];
                                stateCount[1] = stateCount[3];
                                stateCount[2] = stateCount[4];
                                stateCount[3] = 1;
                                stateCount[4] = 0;
                                currentState = 3;
                            }
                        }
                        else {
                            stateCount[++currentState]++;
                        }
                    }
                    else { // Counting white pixels
                        stateCount[currentState]++;
                    }
                }
            }
            if (FinderPatternFinder.foundPatternCross(stateCount)) {
                var confirmed = this.handlePossibleCenter(stateCount, i, maxJ, pureBarcode);
                if (confirmed === true) {
                    iSkip = stateCount[0];
                    if (this.hasSkipped) {
                        // Found a third one
                        done = this.haveMultiplyConfirmedCenters();
                    }
                }
            }
        }
        var patternInfo = this.selectBestPatterns();
        ResultPoint_1.default.orderBestPatterns(patternInfo);
        return new FinderPatternInfo_1.default(patternInfo);
    };
    /**
     * Given a count of black/white/black/white/black pixels just seen and an end position,
     * figures the location of the center of this run.
     */
    FinderPatternFinder.centerFromEnd = function (stateCount, end /*int*/) {
        return (end - stateCount[4] - stateCount[3]) - stateCount[2] / 2.0;
    };
    /**
     * @param stateCount count of black/white/black/white/black pixels just read
     * @return true iff the proportions of the counts is close enough to the 1/1/3/1/1 ratios
     *         used by finder patterns to be considered a match
     */
    FinderPatternFinder.foundPatternCross = function (stateCount) {
        var totalModuleSize = 0;
        for (var i = 0; i < 5; i++) {
            var count = stateCount[i];
            if (count === 0) {
                return false;
            }
            totalModuleSize += count;
        }
        if (totalModuleSize < 7) {
            return false;
        }
        var moduleSize = totalModuleSize / 7.0;
        var maxVariance = moduleSize / 2.0;
        // Allow less than 50% variance from 1-1-3-1-1 proportions
        return Math.abs(moduleSize - stateCount[0]) < maxVariance &&
            Math.abs(moduleSize - stateCount[1]) < maxVariance &&
            Math.abs(3.0 * moduleSize - stateCount[2]) < 3 * maxVariance &&
            Math.abs(moduleSize - stateCount[3]) < maxVariance &&
            Math.abs(moduleSize - stateCount[4]) < maxVariance;
    };
    FinderPatternFinder.prototype.getCrossCheckStateCount = function () {
        var crossCheckStateCount = this.crossCheckStateCount;
        crossCheckStateCount[0] = 0;
        crossCheckStateCount[1] = 0;
        crossCheckStateCount[2] = 0;
        crossCheckStateCount[3] = 0;
        crossCheckStateCount[4] = 0;
        return crossCheckStateCount;
    };
    /**
     * After a vertical and horizontal scan finds a potential finder pattern, this method
     * "cross-cross-cross-checks" by scanning down diagonally through the center of the possible
     * finder pattern to see if the same proportion is detected.
     *
     * @param startI row where a finder pattern was detected
     * @param centerJ center of the section that appears to cross a finder pattern
     * @param maxCount maximum reasonable number of modules that should be
     *  observed in any reading state, based on the results of the horizontal scan
     * @param originalStateCountTotal The original state count total.
     * @return true if proportions are withing expected limits
     */
    FinderPatternFinder.prototype.crossCheckDiagonal = function (startI /*int*/, centerJ /*int*/, maxCount /*int*/, originalStateCountTotal /*int*/) {
        var stateCount = this.getCrossCheckStateCount();
        // Start counting up, left from center finding black center mass
        var i = 0;
        var image = this.image;
        while (startI >= i && centerJ >= i && image.get(centerJ - i, startI - i)) {
            stateCount[2]++;
            i++;
        }
        if (startI < i || centerJ < i) {
            return false;
        }
        // Continue up, left finding white space
        while (startI >= i && centerJ >= i && !image.get(centerJ - i, startI - i) &&
            stateCount[1] <= maxCount) {
            stateCount[1]++;
            i++;
        }
        // If already too many modules in this state or ran off the edge:
        if (startI < i || centerJ < i || stateCount[1] > maxCount) {
            return false;
        }
        // Continue up, left finding black border
        while (startI >= i && centerJ >= i && image.get(centerJ - i, startI - i) &&
            stateCount[0] <= maxCount) {
            stateCount[0]++;
            i++;
        }
        if (stateCount[0] > maxCount) {
            return false;
        }
        var maxI = image.getHeight();
        var maxJ = image.getWidth();
        // Now also count down, right from center
        i = 1;
        while (startI + i < maxI && centerJ + i < maxJ && image.get(centerJ + i, startI + i)) {
            stateCount[2]++;
            i++;
        }
        // Ran off the edge?
        if (startI + i >= maxI || centerJ + i >= maxJ) {
            return false;
        }
        while (startI + i < maxI && centerJ + i < maxJ && !image.get(centerJ + i, startI + i) &&
            stateCount[3] < maxCount) {
            stateCount[3]++;
            i++;
        }
        if (startI + i >= maxI || centerJ + i >= maxJ || stateCount[3] >= maxCount) {
            return false;
        }
        while (startI + i < maxI && centerJ + i < maxJ && image.get(centerJ + i, startI + i) &&
            stateCount[4] < maxCount) {
            stateCount[4]++;
            i++;
        }
        if (stateCount[4] >= maxCount) {
            return false;
        }
        // If we found a finder-pattern-like section, but its size is more than 100% different than
        // the original, assume it's a false positive
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
        return Math.abs(stateCountTotal - originalStateCountTotal) < 2 * originalStateCountTotal &&
            FinderPatternFinder.foundPatternCross(stateCount);
    };
    /**
     * <p>After a horizontal scan finds a potential finder pattern, this method
     * "cross-checks" by scanning down vertically through the center of the possible
     * finder pattern to see if the same proportion is detected.</p>
     *
     * @param startI row where a finder pattern was detected
     * @param centerJ center of the section that appears to cross a finder pattern
     * @param maxCount maximum reasonable number of modules that should be
     * observed in any reading state, based on the results of the horizontal scan
     * @return vertical center of finder pattern, or {@link Float#NaN} if not found
     */
    FinderPatternFinder.prototype.crossCheckVertical = function (startI /*int*/, centerJ /*int*/, maxCount /*int*/, originalStateCountTotal /*int*/) {
        var image = this.image;
        var maxI = image.getHeight();
        var stateCount = this.getCrossCheckStateCount();
        // Start counting up from center
        var i = startI;
        while (i >= 0 && image.get(centerJ, i)) {
            stateCount[2]++;
            i--;
        }
        if (i < 0) {
            return NaN;
        }
        while (i >= 0 && !image.get(centerJ, i) && stateCount[1] <= maxCount) {
            stateCount[1]++;
            i--;
        }
        // If already too many modules in this state or ran off the edge:
        if (i < 0 || stateCount[1] > maxCount) {
            return NaN;
        }
        while (i >= 0 && image.get(centerJ, i) && stateCount[0] <= maxCount) {
            stateCount[0]++;
            i--;
        }
        if (stateCount[0] > maxCount) {
            return NaN;
        }
        // Now also count down from center
        i = startI + 1;
        while (i < maxI && image.get(centerJ, i)) {
            stateCount[2]++;
            i++;
        }
        if (i === maxI) {
            return NaN;
        }
        while (i < maxI && !image.get(centerJ, i) && stateCount[3] < maxCount) {
            stateCount[3]++;
            i++;
        }
        if (i === maxI || stateCount[3] >= maxCount) {
            return NaN;
        }
        while (i < maxI && image.get(centerJ, i) && stateCount[4] < maxCount) {
            stateCount[4]++;
            i++;
        }
        if (stateCount[4] >= maxCount) {
            return NaN;
        }
        // If we found a finder-pattern-like section, but its size is more than 40% different than
        // the original, assume it's a false positive
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] +
            stateCount[4];
        if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
            return NaN;
        }
        return FinderPatternFinder.foundPatternCross(stateCount) ? FinderPatternFinder.centerFromEnd(stateCount, i) : NaN;
    };
    /**
     * <p>Like {@link #crossCheckVertical(int, int, int, int)}, and in fact is basically identical,
     * except it reads horizontally instead of vertically. This is used to cross-cross
     * check a vertical cross check and locate the real center of the alignment pattern.</p>
     */
    FinderPatternFinder.prototype.crossCheckHorizontal = function (startJ /*int*/, centerI /*int*/, maxCount /*int*/, originalStateCountTotal /*int*/) {
        var image = this.image;
        var maxJ = image.getWidth();
        var stateCount = this.getCrossCheckStateCount();
        var j = startJ;
        while (j >= 0 && image.get(j, centerI)) {
            stateCount[2]++;
            j--;
        }
        if (j < 0) {
            return NaN;
        }
        while (j >= 0 && !image.get(j, centerI) && stateCount[1] <= maxCount) {
            stateCount[1]++;
            j--;
        }
        if (j < 0 || stateCount[1] > maxCount) {
            return NaN;
        }
        while (j >= 0 && image.get(j, centerI) && stateCount[0] <= maxCount) {
            stateCount[0]++;
            j--;
        }
        if (stateCount[0] > maxCount) {
            return NaN;
        }
        j = startJ + 1;
        while (j < maxJ && image.get(j, centerI)) {
            stateCount[2]++;
            j++;
        }
        if (j === maxJ) {
            return NaN;
        }
        while (j < maxJ && !image.get(j, centerI) && stateCount[3] < maxCount) {
            stateCount[3]++;
            j++;
        }
        if (j === maxJ || stateCount[3] >= maxCount) {
            return NaN;
        }
        while (j < maxJ && image.get(j, centerI) && stateCount[4] < maxCount) {
            stateCount[4]++;
            j++;
        }
        if (stateCount[4] >= maxCount) {
            return NaN;
        }
        // If we found a finder-pattern-like section, but its size is significantly different than
        // the original, assume it's a false positive
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] +
            stateCount[4];
        if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= originalStateCountTotal) {
            return NaN;
        }
        return FinderPatternFinder.foundPatternCross(stateCount) ? FinderPatternFinder.centerFromEnd(stateCount, j) : NaN;
    };
    /**
     * <p>This is called when a horizontal scan finds a possible alignment pattern. It will
     * cross check with a vertical scan, and if successful, will, ah, cross-cross-check
     * with another horizontal scan. This is needed primarily to locate the real horizontal
     * center of the pattern in cases of extreme skew.
     * And then we cross-cross-cross check with another diagonal scan.</p>
     *
     * <p>If that succeeds the finder pattern location is added to a list that tracks
     * the number of times each location has been nearly-matched as a finder pattern.
     * Each additional find is more evidence that the location is in fact a finder
     * pattern center
     *
     * @param stateCount reading state module counts from horizontal scan
     * @param i row where finder pattern may be found
     * @param j end of possible finder pattern in row
     * @param pureBarcode true if in "pure barcode" mode
     * @return true if a finder pattern candidate was found this time
     */
    FinderPatternFinder.prototype.handlePossibleCenter = function (stateCount, i /*int*/, j /*int*/, pureBarcode) {
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] +
            stateCount[4];
        var centerJ = FinderPatternFinder.centerFromEnd(stateCount, j);
        var centerI = this.crossCheckVertical(i, /*(int) */ Math.floor(centerJ), stateCount[2], stateCountTotal);
        if (!isNaN(centerI)) {
            // Re-cross check
            centerJ = this.crossCheckHorizontal(/*(int) */ Math.floor(centerJ), /*(int) */ Math.floor(centerI), stateCount[2], stateCountTotal);
            if (!isNaN(centerJ) &&
                (!pureBarcode || this.crossCheckDiagonal(/*(int) */ Math.floor(centerI), /*(int) */ Math.floor(centerJ), stateCount[2], stateCountTotal))) {
                var estimatedModuleSize = stateCountTotal / 7.0;
                var found = false;
                var possibleCenters = this.possibleCenters;
                for (var index = 0, length_1 = possibleCenters.length; index < length_1; index++) {
                    var center = possibleCenters[index];
                    // Look for about the same center and module size:
                    if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
                        possibleCenters[index] = center.combineEstimate(centerI, centerJ, estimatedModuleSize);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    var point = new FinderPattern_1.default(centerJ, centerI, estimatedModuleSize);
                    possibleCenters.push(point);
                    if (this.resultPointCallback !== null && this.resultPointCallback !== undefined) {
                        this.resultPointCallback.foundPossibleResultPoint(point);
                    }
                }
                return true;
            }
        }
        return false;
    };
    /**
     * @return number of rows we could safely skip during scanning, based on the first
     *         two finder patterns that have been located. In some cases their position will
     *         allow us to infer that the third pattern must lie below a certain point farther
     *         down in the image.
     */
    FinderPatternFinder.prototype.findRowSkip = function () {
        var max = this.possibleCenters.length;
        if (max <= 1) {
            return 0;
        }
        var firstConfirmedCenter = null;
        for (var _i = 0, _a = this.possibleCenters; _i < _a.length; _i++) {
            var center = _a[_i];
            if (center.getCount() >= FinderPatternFinder.CENTER_QUORUM) {
                if (firstConfirmedCenter == null) {
                    firstConfirmedCenter = center;
                }
                else {
                    // We have two confirmed centers
                    // How far down can we skip before resuming looking for the next
                    // pattern? In the worst case, only the difference between the
                    // difference in the x / y coordinates of the two centers.
                    // This is the case where you find top left last.
                    this.hasSkipped = true;
                    return /*(int) */ Math.floor((Math.abs(firstConfirmedCenter.getX() - center.getX()) -
                        Math.abs(firstConfirmedCenter.getY() - center.getY())) / 2);
                }
            }
        }
        return 0;
    };
    /**
     * @return true iff we have found at least 3 finder patterns that have been detected
     *         at least {@link #CENTER_QUORUM} times each, and, the estimated module size of the
     *         candidates is "pretty similar"
     */
    FinderPatternFinder.prototype.haveMultiplyConfirmedCenters = function () {
        var confirmedCount = 0;
        var totalModuleSize = 0.0;
        var max = this.possibleCenters.length;
        for (var _i = 0, _a = this.possibleCenters; _i < _a.length; _i++) {
            var pattern = _a[_i];
            if (pattern.getCount() >= FinderPatternFinder.CENTER_QUORUM) {
                confirmedCount++;
                totalModuleSize += pattern.getEstimatedModuleSize();
            }
        }
        if (confirmedCount < 3) {
            return false;
        }
        // OK, we have at least 3 confirmed centers, but, it's possible that one is a "false positive"
        // and that we need to keep looking. We detect this by asking if the estimated module sizes
        // vary too much. We arbitrarily say that when the total deviation from average exceeds
        // 5% of the total module size estimates, it's too much.
        var average = totalModuleSize / max;
        var totalDeviation = 0.0;
        for (var _b = 0, _c = this.possibleCenters; _b < _c.length; _b++) {
            var pattern = _c[_b];
            totalDeviation += Math.abs(pattern.getEstimatedModuleSize() - average);
        }
        return totalDeviation <= 0.05 * totalModuleSize;
    };
    /**
     * @return the 3 best {@link FinderPattern}s from our list of candidates. The "best" are
     *         those that have been detected at least {@link #CENTER_QUORUM} times, and whose module
     *         size differs from the average among those patterns the least
     * @throws NotFoundException if 3 such finder patterns do not exist
     */
    FinderPatternFinder.prototype.selectBestPatterns = function () {
        var startSize = this.possibleCenters.length;
        if (startSize < 3) {
            // Couldn't find enough finder patterns
            throw new NotFoundException_1.default();
        }
        var possibleCenters = this.possibleCenters;
        var average; /*float*/
        // Filter outlier possibilities whose module size is too different
        if (startSize > 3) {
            // But we can only afford to do so if we have at least 4 possibilities to choose from
            var totalModuleSize = 0.0;
            var square = 0.0;
            for (var _i = 0, _a = this.possibleCenters; _i < _a.length; _i++) {
                var center = _a[_i];
                var size = center.getEstimatedModuleSize();
                totalModuleSize += size;
                square += size * size;
            }
            average = totalModuleSize / startSize;
            var stdDev = Math.sqrt(square / startSize - average * average);
            possibleCenters.sort(
            /**
             * <p>Orders by furthest from average</p>
             */
            // FurthestFromAverageComparator implements Comparator<FinderPattern>
            function (center1, center2) {
                var dA = Math.abs(center2.getEstimatedModuleSize() - average);
                var dB = Math.abs(center1.getEstimatedModuleSize() - average);
                return dA < dB ? -1 : dA > dB ? 1 : 0;
            });
            var limit = Math.max(0.2 * average, stdDev);
            for (var i = 0; i < possibleCenters.length && possibleCenters.length > 3; i++) {
                var pattern = possibleCenters[i];
                if (Math.abs(pattern.getEstimatedModuleSize() - average) > limit) {
                    possibleCenters.splice(i, 1);
                    i--;
                }
            }
        }
        if (possibleCenters.length > 3) {
            // Throw away all but those first size candidate points we found.
            var totalModuleSize = 0.0;
            for (var _b = 0, possibleCenters_1 = possibleCenters; _b < possibleCenters_1.length; _b++) {
                var possibleCenter = possibleCenters_1[_b];
                totalModuleSize += possibleCenter.getEstimatedModuleSize();
            }
            average = totalModuleSize / possibleCenters.length;
            possibleCenters.sort(
            /**
             * <p>Orders by {@link FinderPattern#getCount()}, descending.</p>
             */
            // CenterComparator implements Comparator<FinderPattern>
            function (center1, center2) {
                if (center2.getCount() === center1.getCount()) {
                    var dA = Math.abs(center2.getEstimatedModuleSize() - average);
                    var dB = Math.abs(center1.getEstimatedModuleSize() - average);
                    return dA < dB ? 1 : dA > dB ? -1 : 0;
                }
                else {
                    return center2.getCount() - center1.getCount();
                }
            });
            possibleCenters.splice(3); // this is not realy necessary as we only return first 3 anyway
        }
        return [
            possibleCenters[0],
            possibleCenters[1],
            possibleCenters[2]
        ];
    };
    FinderPatternFinder.CENTER_QUORUM = 2;
    FinderPatternFinder.MIN_SKIP = 3; // 1 pixel/module times 3 modules/center
    FinderPatternFinder.MAX_MODULES = 57; // support up to version 10 for mobile clients
    return FinderPatternFinder;
}());
exports.default = FinderPatternFinder;
//# sourceMappingURL=FinderPatternFinder.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPatternInfo.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/detector/FinderPatternInfo.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * <p>Encapsulates information about finder patterns in an image, including the location of
 * the three finder patterns, and their estimated module size.</p>
 *
 * @author Sean Owen
 */
var FinderPatternInfo = /** @class */ (function () {
    function FinderPatternInfo(patternCenters) {
        this.bottomLeft = patternCenters[0];
        this.topLeft = patternCenters[1];
        this.topRight = patternCenters[2];
    }
    FinderPatternInfo.prototype.getBottomLeft = function () {
        return this.bottomLeft;
    };
    FinderPatternInfo.prototype.getTopLeft = function () {
        return this.topLeft;
    };
    FinderPatternInfo.prototype.getTopRight = function () {
        return this.topRight;
    };
    return FinderPatternInfo;
}());
exports.default = FinderPatternInfo;
//# sourceMappingURL=FinderPatternInfo.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/BlockPair.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/encoder/BlockPair.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.encoder {*/
var BlockPair = /** @class */ (function () {
    function BlockPair(dataBytes, errorCorrectionBytes) {
        this.dataBytes = dataBytes;
        this.errorCorrectionBytes = errorCorrectionBytes;
    }
    BlockPair.prototype.getDataBytes = function () {
        return this.dataBytes;
    };
    BlockPair.prototype.getErrorCorrectionBytes = function () {
        return this.errorCorrectionBytes;
    };
    return BlockPair;
}());
exports.default = BlockPair;
//# sourceMappingURL=BlockPair.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/ByteMatrix.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/encoder/ByteMatrix.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.encoder {*/
/*import java.util.Arrays;*/
var Arrays_1 = __webpack_require__(/*! ../../util/Arrays */ "./node_modules/@zxing/library/esm5/core/util/Arrays.js");
var StringBuilder_1 = __webpack_require__(/*! ../../util/StringBuilder */ "./node_modules/@zxing/library/esm5/core/util/StringBuilder.js");
/**
 * JAVAPORT: The original code was a 2D array of ints, but since it only ever gets assigned
 * -1, 0, and 1, I'm going to use less memory and go with bytes.
 *
 * @author dswitkin@google.com (Daniel Switkin)
 */
var ByteMatrix = /** @class */ (function () {
    function ByteMatrix(width /*int*/, height /*int*/) {
        this.width = width;
        this.height = height;
        var bytes = new Array(height); // [height][width]
        for (var i = 0; i !== height; i++) {
            bytes[i] = new Uint8Array(width);
        }
        this.bytes = bytes;
    }
    ByteMatrix.prototype.getHeight = function () {
        return this.height;
    };
    ByteMatrix.prototype.getWidth = function () {
        return this.width;
    };
    ByteMatrix.prototype.get = function (x /*int*/, y /*int*/) {
        return this.bytes[y][x];
    };
    /**
     * @return an internal representation as bytes, in row-major order. array[y][x] represents point (x,y)
     */
    ByteMatrix.prototype.getArray = function () {
        return this.bytes;
    };
    // TYPESCRIPTPORT: preffer to let two methods instead of override to avoid type comparison inside
    ByteMatrix.prototype.setNumber = function (x /*int*/, y /*int*/, value /*byte|int*/) {
        this.bytes[y][x] = value;
    };
    // public set(x: number /*int*/, y: number /*int*/, value: number /*int*/): void {
    //   bytes[y][x] = (byte) value
    // }
    ByteMatrix.prototype.setBoolean = function (x /*int*/, y /*int*/, value) {
        this.bytes[y][x] = /*(byte) */ (value ? 1 : 0);
    };
    ByteMatrix.prototype.clear = function (value /*byte*/) {
        for (var _i = 0, _a = this.bytes; _i < _a.length; _i++) {
            var aByte = _a[_i];
            Arrays_1.default.fillUint8Array(aByte, value);
        }
    };
    ByteMatrix.prototype.equals = function (o) {
        if (!(o instanceof ByteMatrix)) {
            return false;
        }
        var other = o;
        if (this.width !== other.width) {
            return false;
        }
        if (this.height !== other.height) {
            return false;
        }
        for (var y = 0, height = this.height; y < height; ++y) {
            var bytesY = this.bytes[y];
            var otherBytesY = other.bytes[y];
            for (var x = 0, width = this.width; x < width; ++x) {
                if (bytesY[x] !== otherBytesY[x]) {
                    return false;
                }
            }
        }
        return true;
    };
    /*@Override*/
    ByteMatrix.prototype.toString = function () {
        var result = new StringBuilder_1.default(); // (2 * width * height + 2)
        for (var y = 0, height = this.height; y < height; ++y) {
            var bytesY = this.bytes[y];
            for (var x = 0, width = this.width; x < width; ++x) {
                switch (bytesY[x]) {
                    case 0:
                        result.append(' 0');
                        break;
                    case 1:
                        result.append(' 1');
                        break;
                    default:
                        result.append('  ');
                        break;
                }
            }
            result.append('\n');
        }
        return result.toString();
    };
    return ByteMatrix;
}());
exports.default = ByteMatrix;
//# sourceMappingURL=ByteMatrix.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/Encoder.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/encoder/Encoder.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.encoder {*/
var EncodeHintType_1 = __webpack_require__(/*! ../../EncodeHintType */ "./node_modules/@zxing/library/esm5/core/EncodeHintType.js");
var BitArray_1 = __webpack_require__(/*! ../../common/BitArray */ "./node_modules/@zxing/library/esm5/core/common/BitArray.js");
var CharacterSetECI_1 = __webpack_require__(/*! ../../common/CharacterSetECI */ "./node_modules/@zxing/library/esm5/core/common/CharacterSetECI.js");
var GenericGF_1 = __webpack_require__(/*! ../../common/reedsolomon/GenericGF */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGF.js");
var ReedSolomonEncoder_1 = __webpack_require__(/*! ../../common/reedsolomon/ReedSolomonEncoder */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonEncoder.js");
var Mode_1 = __webpack_require__(/*! ../decoder/Mode */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Mode.js");
var Version_1 = __webpack_require__(/*! ../decoder/Version */ "./node_modules/@zxing/library/esm5/core/qrcode/decoder/Version.js");
var MaskUtil_1 = __webpack_require__(/*! ./MaskUtil */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/MaskUtil.js");
var ByteMatrix_1 = __webpack_require__(/*! ./ByteMatrix */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/ByteMatrix.js");
var QRCode_1 = __webpack_require__(/*! ./QRCode */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/QRCode.js");
var MatrixUtil_1 = __webpack_require__(/*! ./MatrixUtil */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/MatrixUtil.js");
var StringEncoding_1 = __webpack_require__(/*! ../../util/StringEncoding */ "./node_modules/@zxing/library/esm5/core/util/StringEncoding.js");
var BlockPair_1 = __webpack_require__(/*! ./BlockPair */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/BlockPair.js");
var WriterException_1 = __webpack_require__(/*! ../../WriterException */ "./node_modules/@zxing/library/esm5/core/WriterException.js");
/*import java.io.UnsupportedEncodingException;*/
/*import java.util.ArrayList;*/
/*import java.util.Collection;*/
/*import java.util.Map;*/
/**
 * @author satorux@google.com (Satoru Takabayashi) - creator
 * @author dswitkin@google.com (Daniel Switkin) - ported from C++
 */
var Encoder = /** @class */ (function () {
    // TYPESCRIPTPORT: changed to UTF8, the default for js
    function Encoder() {
    }
    // The mask penalty calculation is complicated.  See Table 21 of JISX0510:2004 (p.45) for details.
    // Basically it applies four rules and summate all penalties.
    Encoder.calculateMaskPenalty = function (matrix) {
        return MaskUtil_1.default.applyMaskPenaltyRule1(matrix)
            + MaskUtil_1.default.applyMaskPenaltyRule2(matrix)
            + MaskUtil_1.default.applyMaskPenaltyRule3(matrix)
            + MaskUtil_1.default.applyMaskPenaltyRule4(matrix);
    };
    /**
     * @param content text to encode
     * @param ecLevel error correction level to use
     * @return {@link QRCode} representing the encoded QR code
     * @throws WriterException if encoding can't succeed, because of for example invalid content
     *   or configuration
     */
    // public static encode(content: string, ecLevel: ErrorCorrectionLevel): QRCode /*throws WriterException*/ {
    //   return encode(content, ecLevel, null)
    // }
    Encoder.encode = function (content, ecLevel, hints) {
        if (hints === void 0) { hints = null; }
        // Determine what character encoding has been specified by the caller, if any
        var encoding = Encoder.DEFAULT_BYTE_MODE_ENCODING;
        var hasEncodingHint = hints !== null && undefined !== hints.get(EncodeHintType_1.default.CHARACTER_SET);
        if (hasEncodingHint) {
            encoding = hints.get(EncodeHintType_1.default.CHARACTER_SET).toString();
        }
        // Pick an encoding mode appropriate for the content. Note that this will not attempt to use
        // multiple modes / segments even if that were more efficient. Twould be nice.
        var mode = this.chooseMode(content, encoding);
        // This will store the header information, like mode and
        // length, as well as "header" segments like an ECI segment.
        var headerBits = new BitArray_1.default();
        // Append ECI segment if applicable
        if (mode === Mode_1.default.BYTE && (hasEncodingHint || Encoder.DEFAULT_BYTE_MODE_ENCODING !== encoding)) {
            var eci = CharacterSetECI_1.default.getCharacterSetECIByName(encoding);
            if (eci !== undefined) {
                this.appendECI(eci, headerBits);
            }
        }
        // (With ECI in place,) Write the mode marker
        this.appendModeInfo(mode, headerBits);
        // Collect data within the main segment, separately, to count its size if needed. Don't add it to
        // main payload yet.
        var dataBits = new BitArray_1.default();
        this.appendBytes(content, mode, dataBits, encoding);
        var version;
        if (hints !== null && undefined !== hints.get(EncodeHintType_1.default.QR_VERSION)) {
            var versionNumber = Number.parseInt(hints.get(EncodeHintType_1.default.QR_VERSION).toString(), 10);
            version = Version_1.default.getVersionForNumber(versionNumber);
            var bitsNeeded = this.calculateBitsNeeded(mode, headerBits, dataBits, version);
            if (!this.willFit(bitsNeeded, version, ecLevel)) {
                throw new WriterException_1.default('Data too big for requested version');
            }
        }
        else {
            version = this.recommendVersion(ecLevel, mode, headerBits, dataBits);
        }
        var headerAndDataBits = new BitArray_1.default();
        headerAndDataBits.appendBitArray(headerBits);
        // Find "length" of main segment and write it
        var numLetters = mode === Mode_1.default.BYTE ? dataBits.getSizeInBytes() : content.length;
        this.appendLengthInfo(numLetters, version, mode, headerAndDataBits);
        // Put data together into the overall payload
        headerAndDataBits.appendBitArray(dataBits);
        var ecBlocks = version.getECBlocksForLevel(ecLevel);
        var numDataBytes = version.getTotalCodewords() - ecBlocks.getTotalECCodewords();
        // Terminate the bits properly.
        this.terminateBits(numDataBytes, headerAndDataBits);
        // Interleave data bits with error correction code.
        var finalBits = this.interleaveWithECBytes(headerAndDataBits, version.getTotalCodewords(), numDataBytes, ecBlocks.getNumBlocks());
        var qrCode = new QRCode_1.default();
        qrCode.setECLevel(ecLevel);
        qrCode.setMode(mode);
        qrCode.setVersion(version);
        //  Choose the mask pattern and set to "qrCode".
        var dimension = version.getDimensionForVersion();
        var matrix = new ByteMatrix_1.default(dimension, dimension);
        var maskPattern = this.chooseMaskPattern(finalBits, ecLevel, version, matrix);
        qrCode.setMaskPattern(maskPattern);
        // Build the matrix and set it to "qrCode".
        MatrixUtil_1.default.buildMatrix(finalBits, ecLevel, version, maskPattern, matrix);
        qrCode.setMatrix(matrix);
        return qrCode;
    };
    /**
     * Decides the smallest version of QR code that will contain all of the provided data.
     *
     * @throws WriterException if the data cannot fit in any version
     */
    Encoder.recommendVersion = function (ecLevel, mode, headerBits, dataBits) {
        // Hard part: need to know version to know how many bits length takes. But need to know how many
        // bits it takes to know version. First we take a guess at version by assuming version will be
        // the minimum, 1:
        var provisionalBitsNeeded = this.calculateBitsNeeded(mode, headerBits, dataBits, Version_1.default.getVersionForNumber(1));
        var provisionalVersion = this.chooseVersion(provisionalBitsNeeded, ecLevel);
        // Use that guess to calculate the right version. I am still not sure this works in 100% of cases.
        var bitsNeeded = this.calculateBitsNeeded(mode, headerBits, dataBits, provisionalVersion);
        return this.chooseVersion(bitsNeeded, ecLevel);
    };
    Encoder.calculateBitsNeeded = function (mode, headerBits, dataBits, version) {
        return headerBits.getSize() + mode.getCharacterCountBits(version) + dataBits.getSize();
    };
    /**
     * @return the code point of the table used in alphanumeric mode or
     *  -1 if there is no corresponding code in the table.
     */
    Encoder.getAlphanumericCode = function (code /*int*/) {
        if (code < Encoder.ALPHANUMERIC_TABLE.length) {
            return Encoder.ALPHANUMERIC_TABLE[code];
        }
        return -1;
    };
    // public static chooseMode(content: string): Mode {
    //   return chooseMode(content, null);
    // }
    /**
     * Choose the best mode by examining the content. Note that 'encoding' is used as a hint;
     * if it is Shift_JIS, and the input is only double-byte Kanji, then we return {@link Mode#KANJI}.
     */
    Encoder.chooseMode = function (content, encoding) {
        if (encoding === void 0) { encoding = null; }
        if (CharacterSetECI_1.default.SJIS.getName() === encoding && this.isOnlyDoubleByteKanji(content)) {
            // Choose Kanji mode if all input are double-byte characters
            return Mode_1.default.KANJI;
        }
        var hasNumeric = false;
        var hasAlphanumeric = false;
        for (var i = 0, length_1 = content.length; i < length_1; ++i) {
            var c = content.charAt(i);
            if (Encoder.isDigit(c)) {
                hasNumeric = true;
            }
            else if (this.getAlphanumericCode(c.charCodeAt(0)) !== -1) {
                hasAlphanumeric = true;
            }
            else {
                return Mode_1.default.BYTE;
            }
        }
        if (hasAlphanumeric) {
            return Mode_1.default.ALPHANUMERIC;
        }
        if (hasNumeric) {
            return Mode_1.default.NUMERIC;
        }
        return Mode_1.default.BYTE;
    };
    Encoder.isOnlyDoubleByteKanji = function (content) {
        var bytes;
        try {
            bytes = StringEncoding_1.default.encode(content, CharacterSetECI_1.default.SJIS); // content.getBytes("Shift_JIS"))
        }
        catch (ignored /*: UnsupportedEncodingException*/) {
            return false;
        }
        var length = bytes.length;
        if (length % 2 !== 0) {
            return false;
        }
        for (var i = 0; i < length; i += 2) {
            var byte1 = bytes[i] & 0xFF;
            if ((byte1 < 0x81 || byte1 > 0x9F) && (byte1 < 0xE0 || byte1 > 0xEB)) {
                return false;
            }
        }
        return true;
    };
    Encoder.chooseMaskPattern = function (bits, ecLevel, version, matrix) {
        var minPenalty = Number.MAX_SAFE_INTEGER; // Lower penalty is better.
        var bestMaskPattern = -1;
        // We try all mask patterns to choose the best one.
        for (var maskPattern = 0; maskPattern < QRCode_1.default.NUM_MASK_PATTERNS; maskPattern++) {
            MatrixUtil_1.default.buildMatrix(bits, ecLevel, version, maskPattern, matrix);
            var penalty = this.calculateMaskPenalty(matrix);
            if (penalty < minPenalty) {
                minPenalty = penalty;
                bestMaskPattern = maskPattern;
            }
        }
        return bestMaskPattern;
    };
    Encoder.chooseVersion = function (numInputBits /*int*/, ecLevel) {
        for (var versionNum = 1; versionNum <= 40; versionNum++) {
            var version = Version_1.default.getVersionForNumber(versionNum);
            if (Encoder.willFit(numInputBits, version, ecLevel)) {
                return version;
            }
        }
        throw new WriterException_1.default('Data too big');
    };
    /**
     * @return true if the number of input bits will fit in a code with the specified version and
     * error correction level.
     */
    Encoder.willFit = function (numInputBits /*int*/, version, ecLevel) {
        // In the following comments, we use numbers of Version 7-H.
        // numBytes = 196
        var numBytes = version.getTotalCodewords();
        // getNumECBytes = 130
        var ecBlocks = version.getECBlocksForLevel(ecLevel);
        var numEcBytes = ecBlocks.getTotalECCodewords();
        // getNumDataBytes = 196 - 130 = 66
        var numDataBytes = numBytes - numEcBytes;
        var totalInputBytes = (numInputBits + 7) / 8;
        return numDataBytes >= totalInputBytes;
    };
    /**
     * Terminate bits as described in 8.4.8 and 8.4.9 of JISX0510:2004 (p.24).
     */
    Encoder.terminateBits = function (numDataBytes /*int*/, bits) {
        var capacity = numDataBytes * 8;
        if (bits.getSize() > capacity) {
            throw new WriterException_1.default('data bits cannot fit in the QR Code' + bits.getSize() + ' > ' +
                capacity);
        }
        for (var i = 0; i < 4 && bits.getSize() < capacity; ++i) {
            bits.appendBit(false);
        }
        // Append termination bits. See 8.4.8 of JISX0510:2004 (p.24) for details.
        // If the last byte isn't 8-bit aligned, we'll add padding bits.
        var numBitsInLastByte = bits.getSize() & 0x07;
        if (numBitsInLastByte > 0) {
            for (var i = numBitsInLastByte; i < 8; i++) {
                bits.appendBit(false);
            }
        }
        // If we have more space, we'll fill the space with padding patterns defined in 8.4.9 (p.24).
        var numPaddingBytes = numDataBytes - bits.getSizeInBytes();
        for (var i = 0; i < numPaddingBytes; ++i) {
            bits.appendBits((i & 0x01) === 0 ? 0xEC : 0x11, 8);
        }
        if (bits.getSize() !== capacity) {
            throw new WriterException_1.default('Bits size does not equal capacity');
        }
    };
    /**
     * Get number of data bytes and number of error correction bytes for block id "blockID". Store
     * the result in "numDataBytesInBlock", and "numECBytesInBlock". See table 12 in 8.5.1 of
     * JISX0510:2004 (p.30)
     */
    Encoder.getNumDataBytesAndNumECBytesForBlockID = function (numTotalBytes /*int*/, numDataBytes /*int*/, numRSBlocks /*int*/, blockID /*int*/, numDataBytesInBlock, numECBytesInBlock) {
        if (blockID >= numRSBlocks) {
            throw new WriterException_1.default('Block ID too large');
        }
        // numRsBlocksInGroup2 = 196 % 5 = 1
        var numRsBlocksInGroup2 = numTotalBytes % numRSBlocks;
        // numRsBlocksInGroup1 = 5 - 1 = 4
        var numRsBlocksInGroup1 = numRSBlocks - numRsBlocksInGroup2;
        // numTotalBytesInGroup1 = 196 / 5 = 39
        var numTotalBytesInGroup1 = Math.floor(numTotalBytes / numRSBlocks);
        // numTotalBytesInGroup2 = 39 + 1 = 40
        var numTotalBytesInGroup2 = numTotalBytesInGroup1 + 1;
        // numDataBytesInGroup1 = 66 / 5 = 13
        var numDataBytesInGroup1 = Math.floor(numDataBytes / numRSBlocks);
        // numDataBytesInGroup2 = 13 + 1 = 14
        var numDataBytesInGroup2 = numDataBytesInGroup1 + 1;
        // numEcBytesInGroup1 = 39 - 13 = 26
        var numEcBytesInGroup1 = numTotalBytesInGroup1 - numDataBytesInGroup1;
        // numEcBytesInGroup2 = 40 - 14 = 26
        var numEcBytesInGroup2 = numTotalBytesInGroup2 - numDataBytesInGroup2;
        // Sanity checks.
        // 26 = 26
        if (numEcBytesInGroup1 !== numEcBytesInGroup2) {
            throw new WriterException_1.default('EC bytes mismatch');
        }
        // 5 = 4 + 1.
        if (numRSBlocks !== numRsBlocksInGroup1 + numRsBlocksInGroup2) {
            throw new WriterException_1.default('RS blocks mismatch');
        }
        // 196 = (13 + 26) * 4 + (14 + 26) * 1
        if (numTotalBytes !==
            ((numDataBytesInGroup1 + numEcBytesInGroup1) *
                numRsBlocksInGroup1) +
                ((numDataBytesInGroup2 + numEcBytesInGroup2) *
                    numRsBlocksInGroup2)) {
            throw new WriterException_1.default('Total bytes mismatch');
        }
        if (blockID < numRsBlocksInGroup1) {
            numDataBytesInBlock[0] = numDataBytesInGroup1;
            numECBytesInBlock[0] = numEcBytesInGroup1;
        }
        else {
            numDataBytesInBlock[0] = numDataBytesInGroup2;
            numECBytesInBlock[0] = numEcBytesInGroup2;
        }
    };
    /**
     * Interleave "bits" with corresponding error correction bytes. On success, store the result in
     * "result". The interleave rule is complicated. See 8.6 of JISX0510:2004 (p.37) for details.
     */
    Encoder.interleaveWithECBytes = function (bits, numTotalBytes /*int*/, numDataBytes /*int*/, numRSBlocks /*int*/) {
        // "bits" must have "getNumDataBytes" bytes of data.
        if (bits.getSizeInBytes() !== numDataBytes) {
            throw new WriterException_1.default('Number of bits and data bytes does not match');
        }
        // Step 1.  Divide data bytes into blocks and generate error correction bytes for them. We'll
        // store the divided data bytes blocks and error correction bytes blocks into "blocks".
        var dataBytesOffset = 0;
        var maxNumDataBytes = 0;
        var maxNumEcBytes = 0;
        // Since, we know the number of reedsolmon blocks, we can initialize the vector with the number.
        var blocks = new Array(); // new Array<BlockPair>(numRSBlocks)
        for (var i = 0; i < numRSBlocks; ++i) {
            var numDataBytesInBlock = new Int32Array(1);
            var numEcBytesInBlock = new Int32Array(1);
            Encoder.getNumDataBytesAndNumECBytesForBlockID(numTotalBytes, numDataBytes, numRSBlocks, i, numDataBytesInBlock, numEcBytesInBlock);
            var size = numDataBytesInBlock[0];
            var dataBytes = new Uint8Array(size);
            bits.toBytes(8 * dataBytesOffset, dataBytes, 0, size);
            var ecBytes = Encoder.generateECBytes(dataBytes, numEcBytesInBlock[0]);
            blocks.push(new BlockPair_1.default(dataBytes, ecBytes));
            maxNumDataBytes = Math.max(maxNumDataBytes, size);
            maxNumEcBytes = Math.max(maxNumEcBytes, ecBytes.length);
            dataBytesOffset += numDataBytesInBlock[0];
        }
        if (numDataBytes !== dataBytesOffset) {
            throw new WriterException_1.default('Data bytes does not match offset');
        }
        var result = new BitArray_1.default();
        // First, place data blocks.
        for (var i = 0; i < maxNumDataBytes; ++i) {
            for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
                var block = blocks_1[_i];
                var dataBytes = block.getDataBytes();
                if (i < dataBytes.length) {
                    result.appendBits(dataBytes[i], 8);
                }
            }
        }
        // Then, place error correction blocks.
        for (var i = 0; i < maxNumEcBytes; ++i) {
            for (var _a = 0, blocks_2 = blocks; _a < blocks_2.length; _a++) {
                var block = blocks_2[_a];
                var ecBytes = block.getErrorCorrectionBytes();
                if (i < ecBytes.length) {
                    result.appendBits(ecBytes[i], 8);
                }
            }
        }
        if (numTotalBytes !== result.getSizeInBytes()) { // Should be same.
            throw new WriterException_1.default('Interleaving error: ' + numTotalBytes + ' and ' +
                result.getSizeInBytes() + ' differ.');
        }
        return result;
    };
    Encoder.generateECBytes = function (dataBytes, numEcBytesInBlock /*int*/) {
        var numDataBytes = dataBytes.length;
        var toEncode = new Int32Array(numDataBytes + numEcBytesInBlock); // int[numDataBytes + numEcBytesInBlock]
        for (var i = 0; i < numDataBytes; i++) {
            toEncode[i] = dataBytes[i] & 0xFF;
        }
        new ReedSolomonEncoder_1.default(GenericGF_1.default.QR_CODE_FIELD_256).encode(toEncode, numEcBytesInBlock);
        var ecBytes = new Uint8Array(numEcBytesInBlock);
        for (var i = 0; i < numEcBytesInBlock; i++) {
            ecBytes[i] = /*(byte) */ toEncode[numDataBytes + i];
        }
        return ecBytes;
    };
    /**
     * Append mode info. On success, store the result in "bits".
     */
    Encoder.appendModeInfo = function (mode, bits) {
        bits.appendBits(mode.getBits(), 4);
    };
    /**
     * Append length info. On success, store the result in "bits".
     */
    Encoder.appendLengthInfo = function (numLetters /*int*/, version, mode, bits) {
        var numBits = mode.getCharacterCountBits(version);
        if (numLetters >= (1 << numBits)) {
            throw new WriterException_1.default(numLetters + ' is bigger than ' + ((1 << numBits) - 1));
        }
        bits.appendBits(numLetters, numBits);
    };
    /**
     * Append "bytes" in "mode" mode (encoding) into "bits". On success, store the result in "bits".
     */
    Encoder.appendBytes = function (content, mode, bits, encoding) {
        switch (mode) {
            case Mode_1.default.NUMERIC:
                Encoder.appendNumericBytes(content, bits);
                break;
            case Mode_1.default.ALPHANUMERIC:
                Encoder.appendAlphanumericBytes(content, bits);
                break;
            case Mode_1.default.BYTE:
                Encoder.append8BitBytes(content, bits, encoding);
                break;
            case Mode_1.default.KANJI:
                Encoder.appendKanjiBytes(content, bits);
                break;
            default:
                throw new WriterException_1.default('Invalid mode: ' + mode);
        }
    };
    Encoder.getDigit = function (singleCharacter) {
        return singleCharacter.charCodeAt(0) - 48;
    };
    Encoder.isDigit = function (singleCharacter) {
        var cn = Encoder.getDigit(singleCharacter);
        return cn >= 0 && cn <= 9;
    };
    Encoder.appendNumericBytes = function (content, bits) {
        var length = content.length;
        var i = 0;
        while (i < length) {
            var num1 = Encoder.getDigit(content.charAt(i));
            if (i + 2 < length) {
                // Encode three numeric letters in ten bits.
                var num2 = Encoder.getDigit(content.charAt(i + 1));
                var num3 = Encoder.getDigit(content.charAt(i + 2));
                bits.appendBits(num1 * 100 + num2 * 10 + num3, 10);
                i += 3;
            }
            else if (i + 1 < length) {
                // Encode two numeric letters in seven bits.
                var num2 = Encoder.getDigit(content.charAt(i + 1));
                bits.appendBits(num1 * 10 + num2, 7);
                i += 2;
            }
            else {
                // Encode one numeric letter in four bits.
                bits.appendBits(num1, 4);
                i++;
            }
        }
    };
    Encoder.appendAlphanumericBytes = function (content, bits) {
        var length = content.length;
        var i = 0;
        while (i < length) {
            var code1 = Encoder.getAlphanumericCode(content.charCodeAt(i));
            if (code1 === -1) {
                throw new WriterException_1.default();
            }
            if (i + 1 < length) {
                var code2 = Encoder.getAlphanumericCode(content.charCodeAt(i + 1));
                if (code2 === -1) {
                    throw new WriterException_1.default();
                }
                // Encode two alphanumeric letters in 11 bits.
                bits.appendBits(code1 * 45 + code2, 11);
                i += 2;
            }
            else {
                // Encode one alphanumeric letter in six bits.
                bits.appendBits(code1, 6);
                i++;
            }
        }
    };
    Encoder.append8BitBytes = function (content, bits, encoding) {
        var bytes;
        try {
            bytes = StringEncoding_1.default.encode(content, encoding);
        }
        catch (uee /*: UnsupportedEncodingException*/) {
            throw new WriterException_1.default(uee);
        }
        for (var i = 0, length_2 = bytes.length; i !== length_2; i++) {
            var b = bytes[i];
            bits.appendBits(b, 8);
        }
    };
    /**
     * @throws WriterException
     */
    Encoder.appendKanjiBytes = function (content, bits) {
        var bytes;
        try {
            bytes = StringEncoding_1.default.encode(content, CharacterSetECI_1.default.SJIS);
        }
        catch (uee /*: UnsupportedEncodingException*/) {
            throw new WriterException_1.default(uee);
        }
        var length = bytes.length;
        for (var i = 0; i < length; i += 2) {
            var byte1 = bytes[i] & 0xFF;
            var byte2 = bytes[i + 1] & 0xFF;
            var code = ((byte1 << 8) & 0xFFFFFFFF) | byte2;
            var subtracted = -1;
            if (code >= 0x8140 && code <= 0x9ffc) {
                subtracted = code - 0x8140;
            }
            else if (code >= 0xe040 && code <= 0xebbf) {
                subtracted = code - 0xc140;
            }
            if (subtracted === -1) {
                throw new WriterException_1.default('Invalid byte sequence');
            }
            var encoded = ((subtracted >> 8) * 0xc0) + (subtracted & 0xff);
            bits.appendBits(encoded, 13);
        }
    };
    Encoder.appendECI = function (eci, bits) {
        bits.appendBits(Mode_1.default.ECI.getBits(), 4);
        // This is correct for values up to 127, which is all we need now.
        bits.appendBits(eci.getValue(), 8);
    };
    // The original table is defined in the table 5 of JISX0510:2004 (p.19).
    Encoder.ALPHANUMERIC_TABLE = Int32Array.from([
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        36, -1, -1, -1, 37, 38, -1, -1, -1, -1, 39, 40, -1, 41, 42, 43,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 44, -1, -1, -1, -1, -1,
        -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1, -1, -1,
    ]);
    Encoder.DEFAULT_BYTE_MODE_ENCODING = CharacterSetECI_1.default.UTF8.getName(); // "ISO-8859-1"
    return Encoder;
}());
exports.default = Encoder;
//# sourceMappingURL=Encoder.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/MaskUtil.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/encoder/MaskUtil.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * @author Satoru Takabayashi
 * @author Daniel Switkin
 * @author Sean Owen
 */
var MaskUtil = /** @class */ (function () {
    function MaskUtil() {
        // do nothing
    }
    /**
     * Apply mask penalty rule 1 and return the penalty. Find repetitive cells with the same color and
     * give penalty to them. Example: 00000 or 11111.
     */
    MaskUtil.applyMaskPenaltyRule1 = function (matrix) {
        return MaskUtil.applyMaskPenaltyRule1Internal(matrix, true) + MaskUtil.applyMaskPenaltyRule1Internal(matrix, false);
    };
    /**
     * Apply mask penalty rule 2 and return the penalty. Find 2x2 blocks with the same color and give
     * penalty to them. This is actually equivalent to the spec's rule, which is to find MxN blocks and give a
     * penalty proportional to (M-1)x(N-1), because this is the number of 2x2 blocks inside such a block.
     */
    MaskUtil.applyMaskPenaltyRule2 = function (matrix) {
        var penalty = 0;
        var array = matrix.getArray();
        var width = matrix.getWidth();
        var height = matrix.getHeight();
        for (var y = 0; y < height - 1; y++) {
            var arrayY = array[y];
            for (var x = 0; x < width - 1; x++) {
                var value = arrayY[x];
                if (value === arrayY[x + 1] && value === array[y + 1][x] && value === array[y + 1][x + 1]) {
                    penalty++;
                }
            }
        }
        return MaskUtil.N2 * penalty;
    };
    /**
     * Apply mask penalty rule 3 and return the penalty. Find consecutive runs of 1:1:3:1:1:4
     * starting with black, or 4:1:1:3:1:1 starting with white, and give penalty to them.  If we
     * find patterns like 000010111010000, we give penalty once.
     */
    MaskUtil.applyMaskPenaltyRule3 = function (matrix) {
        var numPenalties = 0;
        var array = matrix.getArray();
        var width = matrix.getWidth();
        var height = matrix.getHeight();
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var arrayY = array[y]; // We can at least optimize this access
                if (x + 6 < width &&
                    arrayY[x] === 1 &&
                    arrayY[x + 1] === 0 &&
                    arrayY[x + 2] === 1 &&
                    arrayY[x + 3] === 1 &&
                    arrayY[x + 4] === 1 &&
                    arrayY[x + 5] === 0 &&
                    arrayY[x + 6] === 1 &&
                    (MaskUtil.isWhiteHorizontal(arrayY, x - 4, x) || MaskUtil.isWhiteHorizontal(arrayY, x + 7, x + 11))) {
                    numPenalties++;
                }
                if (y + 6 < height &&
                    array[y][x] === 1 &&
                    array[y + 1][x] === 0 &&
                    array[y + 2][x] === 1 &&
                    array[y + 3][x] === 1 &&
                    array[y + 4][x] === 1 &&
                    array[y + 5][x] === 0 &&
                    array[y + 6][x] === 1 &&
                    (MaskUtil.isWhiteVertical(array, x, y - 4, y) || MaskUtil.isWhiteVertical(array, x, y + 7, y + 11))) {
                    numPenalties++;
                }
            }
        }
        return numPenalties * MaskUtil.N3;
    };
    MaskUtil.isWhiteHorizontal = function (rowArray, from /*int*/, to /*int*/) {
        from = Math.max(from, 0);
        to = Math.min(to, rowArray.length);
        for (var i = from; i < to; i++) {
            if (rowArray[i] === 1) {
                return false;
            }
        }
        return true;
    };
    MaskUtil.isWhiteVertical = function (array, col /*int*/, from /*int*/, to /*int*/) {
        from = Math.max(from, 0);
        to = Math.min(to, array.length);
        for (var i = from; i < to; i++) {
            if (array[i][col] === 1) {
                return false;
            }
        }
        return true;
    };
    /**
     * Apply mask penalty rule 4 and return the penalty. Calculate the ratio of dark cells and give
     * penalty if the ratio is far from 50%. It gives 10 penalty for 5% distance.
     */
    MaskUtil.applyMaskPenaltyRule4 = function (matrix) {
        var numDarkCells = 0;
        var array = matrix.getArray();
        var width = matrix.getWidth();
        var height = matrix.getHeight();
        for (var y = 0; y < height; y++) {
            var arrayY = array[y];
            for (var x = 0; x < width; x++) {
                if (arrayY[x] === 1) {
                    numDarkCells++;
                }
            }
        }
        var numTotalCells = matrix.getHeight() * matrix.getWidth();
        var fivePercentVariances = Math.floor(Math.abs(numDarkCells * 2 - numTotalCells) * 10 / numTotalCells);
        return fivePercentVariances * MaskUtil.N4;
    };
    /**
     * Return the mask bit for "getMaskPattern" at "x" and "y". See 8.8 of JISX0510:2004 for mask
     * pattern conditions.
     */
    MaskUtil.getDataMaskBit = function (maskPattern /*int*/, x /*int*/, y /*int*/) {
        var intermediate; /*int*/
        var temp; /*int*/
        switch (maskPattern) {
            case 0:
                intermediate = (y + x) & 0x1;
                break;
            case 1:
                intermediate = y & 0x1;
                break;
            case 2:
                intermediate = x % 3;
                break;
            case 3:
                intermediate = (y + x) % 3;
                break;
            case 4:
                intermediate = (Math.floor(y / 2) + Math.floor(x / 3)) & 0x1;
                break;
            case 5:
                temp = y * x;
                intermediate = (temp & 0x1) + (temp % 3);
                break;
            case 6:
                temp = y * x;
                intermediate = ((temp & 0x1) + (temp % 3)) & 0x1;
                break;
            case 7:
                temp = y * x;
                intermediate = ((temp % 3) + ((y + x) & 0x1)) & 0x1;
                break;
            default:
                throw new IllegalArgumentException_1.default('Invalid mask pattern: ' + maskPattern);
        }
        return intermediate === 0;
    };
    /**
     * Helper function for applyMaskPenaltyRule1. We need this for doing this calculation in both
     * vertical and horizontal orders respectively.
     */
    MaskUtil.applyMaskPenaltyRule1Internal = function (matrix, isHorizontal) {
        var penalty = 0;
        var iLimit = isHorizontal ? matrix.getHeight() : matrix.getWidth();
        var jLimit = isHorizontal ? matrix.getWidth() : matrix.getHeight();
        var array = matrix.getArray();
        for (var i = 0; i < iLimit; i++) {
            var numSameBitCells = 0;
            var prevBit = -1;
            for (var j = 0; j < jLimit; j++) {
                var bit = isHorizontal ? array[i][j] : array[j][i];
                if (bit === prevBit) {
                    numSameBitCells++;
                }
                else {
                    if (numSameBitCells >= 5) {
                        penalty += MaskUtil.N1 + (numSameBitCells - 5);
                    }
                    numSameBitCells = 1; // Include the cell itself.
                    prevBit = bit;
                }
            }
            if (numSameBitCells >= 5) {
                penalty += MaskUtil.N1 + (numSameBitCells - 5);
            }
        }
        return penalty;
    };
    // Penalty weights from section 6.8.2.1
    MaskUtil.N1 = 3;
    MaskUtil.N2 = 3;
    MaskUtil.N3 = 40;
    MaskUtil.N4 = 10;
    return MaskUtil;
}());
exports.default = MaskUtil;
//# sourceMappingURL=MaskUtil.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/MatrixUtil.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/encoder/MatrixUtil.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*namespace com.google.zxing.qrcode.encoder {*/
var BitArray_1 = __webpack_require__(/*! ../../common/BitArray */ "./node_modules/@zxing/library/esm5/core/common/BitArray.js");
var Integer_1 = __webpack_require__(/*! ../../util/Integer */ "./node_modules/@zxing/library/esm5/core/util/Integer.js");
var QRCode_1 = __webpack_require__(/*! ./QRCode */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/QRCode.js");
var MaskUtil_1 = __webpack_require__(/*! ./MaskUtil */ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/MaskUtil.js");
var WriterException_1 = __webpack_require__(/*! ../../WriterException */ "./node_modules/@zxing/library/esm5/core/WriterException.js");
var IllegalArgumentException_1 = __webpack_require__(/*! ../../IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
/**
 * @author satorux@google.com (Satoru Takabayashi) - creator
 * @author dswitkin@google.com (Daniel Switkin) - ported from C++
 */
var MatrixUtil = /** @class */ (function () {
    function MatrixUtil() {
        // do nothing
    }
    // Set all cells to -1 (TYPESCRIPTPORT: 255).  -1 (TYPESCRIPTPORT: 255) means that the cell is empty (not set yet).
    //
    // JAVAPORT: We shouldn't need to do this at all. The code should be rewritten to begin encoding
    // with the ByteMatrix initialized all to zero.
    MatrixUtil.clearMatrix = function (matrix) {
        // TYPESCRIPTPORT: we use UintArray se changed here from -1 to 255
        matrix.clear(/*(byte) */ /*-1*/ 255);
    };
    // Build 2D matrix of QR Code from "dataBits" with "ecLevel", "version" and "getMaskPattern". On
    // success, store the result in "matrix" and return true.
    MatrixUtil.buildMatrix = function (dataBits, ecLevel, version, maskPattern /*int*/, matrix) {
        MatrixUtil.clearMatrix(matrix);
        MatrixUtil.embedBasicPatterns(version, matrix);
        // Type information appear with any version.
        MatrixUtil.embedTypeInfo(ecLevel, maskPattern, matrix);
        // Version info appear if version >= 7.
        MatrixUtil.maybeEmbedVersionInfo(version, matrix);
        // Data should be embedded at end.
        MatrixUtil.embedDataBits(dataBits, maskPattern, matrix);
    };
    // Embed basic patterns. On success, modify the matrix and return true.
    // The basic patterns are:
    // - Position detection patterns
    // - Timing patterns
    // - Dark dot at the left bottom corner
    // - Position adjustment patterns, if need be
    MatrixUtil.embedBasicPatterns = function (version, matrix) {
        // Let's get started with embedding big squares at corners.
        MatrixUtil.embedPositionDetectionPatternsAndSeparators(matrix);
        // Then, embed the dark dot at the left bottom corner.
        MatrixUtil.embedDarkDotAtLeftBottomCorner(matrix);
        // Position adjustment patterns appear if version >= 2.
        MatrixUtil.maybeEmbedPositionAdjustmentPatterns(version, matrix);
        // Timing patterns should be embedded after position adj. patterns.
        MatrixUtil.embedTimingPatterns(matrix);
    };
    // Embed type information. On success, modify the matrix.
    MatrixUtil.embedTypeInfo = function (ecLevel, maskPattern /*int*/, matrix) {
        var typeInfoBits = new BitArray_1.default();
        MatrixUtil.makeTypeInfoBits(ecLevel, maskPattern, typeInfoBits);
        for (var i = 0, size = typeInfoBits.getSize(); i < size; ++i) {
            // Place bits in LSB to MSB order.  LSB (least significant bit) is the last value in
            // "typeInfoBits".
            var bit = typeInfoBits.get(typeInfoBits.getSize() - 1 - i);
            // Type info bits at the left top corner. See 8.9 of JISX0510:2004 (p.46).
            var coordinates = MatrixUtil.TYPE_INFO_COORDINATES[i];
            var x1 = coordinates[0];
            var y1 = coordinates[1];
            matrix.setBoolean(x1, y1, bit);
            if (i < 8) {
                // Right top corner.
                var x2 = matrix.getWidth() - i - 1;
                var y2 = 8;
                matrix.setBoolean(x2, y2, bit);
            }
            else {
                // Left bottom corner.
                var x2 = 8;
                var y2 = matrix.getHeight() - 7 + (i - 8);
                matrix.setBoolean(x2, y2, bit);
            }
        }
    };
    // Embed version information if need be. On success, modify the matrix and return true.
    // See 8.10 of JISX0510:2004 (p.47) for how to embed version information.
    MatrixUtil.maybeEmbedVersionInfo = function (version, matrix) {
        if (version.getVersionNumber() < 7) { // Version info is necessary if version >= 7.
            return; // Don't need version info.
        }
        var versionInfoBits = new BitArray_1.default();
        MatrixUtil.makeVersionInfoBits(version, versionInfoBits);
        var bitIndex = 6 * 3 - 1; // It will decrease from 17 to 0.
        for (var i = 0; i < 6; ++i) {
            for (var j = 0; j < 3; ++j) {
                // Place bits in LSB (least significant bit) to MSB order.
                var bit = versionInfoBits.get(bitIndex);
                bitIndex--;
                // Left bottom corner.
                matrix.setBoolean(i, matrix.getHeight() - 11 + j, bit);
                // Right bottom corner.
                matrix.setBoolean(matrix.getHeight() - 11 + j, i, bit);
            }
        }
    };
    // Embed "dataBits" using "getMaskPattern". On success, modify the matrix and return true.
    // For debugging purposes, it skips masking process if "getMaskPattern" is -1(TYPESCRIPTPORT: 255).
    // See 8.7 of JISX0510:2004 (p.38) for how to embed data bits.
    MatrixUtil.embedDataBits = function (dataBits, maskPattern /*int*/, matrix) {
        var bitIndex = 0;
        var direction = -1;
        // Start from the right bottom cell.
        var x = matrix.getWidth() - 1;
        var y = matrix.getHeight() - 1;
        while (x > 0) {
            // Skip the vertical timing pattern.
            if (x === 6) {
                x -= 1;
            }
            while (y >= 0 && y < matrix.getHeight()) {
                for (var i = 0; i < 2; ++i) {
                    var xx = x - i;
                    // Skip the cell if it's not empty.
                    if (!MatrixUtil.isEmpty(matrix.get(xx, y))) {
                        continue;
                    }
                    var bit = void 0;
                    if (bitIndex < dataBits.getSize()) {
                        bit = dataBits.get(bitIndex);
                        ++bitIndex;
                    }
                    else {
                        // Padding bit. If there is no bit left, we'll fill the left cells with 0, as described
                        // in 8.4.9 of JISX0510:2004 (p. 24).
                        bit = false;
                    }
                    // Skip masking if mask_pattern is -1 (TYPESCRIPTPORT: 255).
                    if (maskPattern !== 255 && MaskUtil_1.default.getDataMaskBit(maskPattern, xx, y)) {
                        bit = !bit;
                    }
                    matrix.setBoolean(xx, y, bit);
                }
                y += direction;
            }
            direction = -direction; // Reverse the direction.
            y += direction;
            x -= 2; // Move to the left.
        }
        // All bits should be consumed.
        if (bitIndex !== dataBits.getSize()) {
            throw new WriterException_1.default('Not all bits consumed: ' + bitIndex + '/' + dataBits.getSize());
        }
    };
    // Return the position of the most significant bit set (one: to) in the "value". The most
    // significant bit is position 32. If there is no bit set, return 0. Examples:
    // - findMSBSet(0) => 0
    // - findMSBSet(1) => 1
    // - findMSBSet(255) => 8
    MatrixUtil.findMSBSet = function (value /*int*/) {
        return 32 - Integer_1.default.numberOfLeadingZeros(value);
    };
    // Calculate BCH (Bose-Chaudhuri-Hocquenghem) code for "value" using polynomial "poly". The BCH
    // code is used for encoding type information and version information.
    // Example: Calculation of version information of 7.
    // f(x) is created from 7.
    //   - 7 = 000111 in 6 bits
    //   - f(x) = x^2 + x^1 + x^0
    // g(x) is given by the standard (p. 67)
    //   - g(x) = x^12 + x^11 + x^10 + x^9 + x^8 + x^5 + x^2 + 1
    // Multiply f(x) by x^(18 - 6)
    //   - f'(x) = f(x) * x^(18 - 6)
    //   - f'(x) = x^14 + x^13 + x^12
    // Calculate the remainder of f'(x) / g(x)
    //         x^2
    //         __________________________________________________
    //   g(x) )x^14 + x^13 + x^12
    //         x^14 + x^13 + x^12 + x^11 + x^10 + x^7 + x^4 + x^2
    //         --------------------------------------------------
    //                              x^11 + x^10 + x^7 + x^4 + x^2
    //
    // The remainder is x^11 + x^10 + x^7 + x^4 + x^2
    // Encode it in binary: 110010010100
    // The return value is 0xc94 (1100 1001 0100)
    //
    // Since all coefficients in the polynomials are 1 or 0, we can do the calculation by bit
    // operations. We don't care if coefficients are positive or negative.
    MatrixUtil.calculateBCHCode = function (value /*int*/, poly /*int*/) {
        if (poly === 0) {
            throw new IllegalArgumentException_1.default('0 polynomial');
        }
        // If poly is "1 1111 0010 0101" (version info poly), msbSetInPoly is 13. We'll subtract 1
        // from 13 to make it 12.
        var msbSetInPoly = MatrixUtil.findMSBSet(poly);
        value <<= msbSetInPoly - 1;
        // Do the division business using exclusive-or operations.
        while (MatrixUtil.findMSBSet(value) >= msbSetInPoly) {
            value ^= poly << (MatrixUtil.findMSBSet(value) - msbSetInPoly);
        }
        // Now the "value" is the remainder (i.e. the BCH code)
        return value;
    };
    // Make bit vector of type information. On success, store the result in "bits" and return true.
    // Encode error correction level and mask pattern. See 8.9 of
    // JISX0510:2004 (p.45) for details.
    MatrixUtil.makeTypeInfoBits = function (ecLevel, maskPattern /*int*/, bits) {
        if (!QRCode_1.default.isValidMaskPattern(maskPattern)) {
            throw new WriterException_1.default('Invalid mask pattern');
        }
        var typeInfo = (ecLevel.getBits() << 3) | maskPattern;
        bits.appendBits(typeInfo, 5);
        var bchCode = MatrixUtil.calculateBCHCode(typeInfo, MatrixUtil.TYPE_INFO_POLY);
        bits.appendBits(bchCode, 10);
        var maskBits = new BitArray_1.default();
        maskBits.appendBits(MatrixUtil.TYPE_INFO_MASK_PATTERN, 15);
        bits.xor(maskBits);
        if (bits.getSize() !== 15) { // Just in case.
            throw new WriterException_1.default('should not happen but we got: ' + bits.getSize());
        }
    };
    // Make bit vector of version information. On success, store the result in "bits" and return true.
    // See 8.10 of JISX0510:2004 (p.45) for details.
    MatrixUtil.makeVersionInfoBits = function (version, bits) {
        bits.appendBits(version.getVersionNumber(), 6);
        var bchCode = MatrixUtil.calculateBCHCode(version.getVersionNumber(), MatrixUtil.VERSION_INFO_POLY);
        bits.appendBits(bchCode, 12);
        if (bits.getSize() !== 18) { // Just in case.
            throw new WriterException_1.default('should not happen but we got: ' + bits.getSize());
        }
    };
    // Check if "value" is empty.
    MatrixUtil.isEmpty = function (value /*int*/) {
        return value === 255; // -1
    };
    MatrixUtil.embedTimingPatterns = function (matrix) {
        // -8 is for skipping position detection patterns (7: size), and two horizontal/vertical
        // separation patterns (1: size). Thus, 8 = 7 + 1.
        for (var i = 8; i < matrix.getWidth() - 8; ++i) {
            var bit = (i + 1) % 2;
            // Horizontal line.
            if (MatrixUtil.isEmpty(matrix.get(i, 6))) {
                matrix.setNumber(i, 6, bit);
            }
            // Vertical line.
            if (MatrixUtil.isEmpty(matrix.get(6, i))) {
                matrix.setNumber(6, i, bit);
            }
        }
    };
    // Embed the lonely dark dot at left bottom corner. JISX0510:2004 (p.46)
    MatrixUtil.embedDarkDotAtLeftBottomCorner = function (matrix) {
        if (matrix.get(8, matrix.getHeight() - 8) === 0) {
            throw new WriterException_1.default();
        }
        matrix.setNumber(8, matrix.getHeight() - 8, 1);
    };
    MatrixUtil.embedHorizontalSeparationPattern = function (xStart /*int*/, yStart /*int*/, matrix) {
        for (var x = 0; x < 8; ++x) {
            if (!MatrixUtil.isEmpty(matrix.get(xStart + x, yStart))) {
                throw new WriterException_1.default();
            }
            matrix.setNumber(xStart + x, yStart, 0);
        }
    };
    MatrixUtil.embedVerticalSeparationPattern = function (xStart /*int*/, yStart /*int*/, matrix) {
        for (var y = 0; y < 7; ++y) {
            if (!MatrixUtil.isEmpty(matrix.get(xStart, yStart + y))) {
                throw new WriterException_1.default();
            }
            matrix.setNumber(xStart, yStart + y, 0);
        }
    };
    MatrixUtil.embedPositionAdjustmentPattern = function (xStart /*int*/, yStart /*int*/, matrix) {
        for (var y = 0; y < 5; ++y) {
            var patternY = MatrixUtil.POSITION_ADJUSTMENT_PATTERN[y];
            for (var x = 0; x < 5; ++x) {
                matrix.setNumber(xStart + x, yStart + y, patternY[x]);
            }
        }
    };
    MatrixUtil.embedPositionDetectionPattern = function (xStart /*int*/, yStart /*int*/, matrix) {
        for (var y = 0; y < 7; ++y) {
            var patternY = MatrixUtil.POSITION_DETECTION_PATTERN[y];
            for (var x = 0; x < 7; ++x) {
                matrix.setNumber(xStart + x, yStart + y, patternY[x]);
            }
        }
    };
    // Embed position detection patterns and surrounding vertical/horizontal separators.
    MatrixUtil.embedPositionDetectionPatternsAndSeparators = function (matrix) {
        // Embed three big squares at corners.
        var pdpWidth = MatrixUtil.POSITION_DETECTION_PATTERN[0].length;
        // Left top corner.
        MatrixUtil.embedPositionDetectionPattern(0, 0, matrix);
        // Right top corner.
        MatrixUtil.embedPositionDetectionPattern(matrix.getWidth() - pdpWidth, 0, matrix);
        // Left bottom corner.
        MatrixUtil.embedPositionDetectionPattern(0, matrix.getWidth() - pdpWidth, matrix);
        // Embed horizontal separation patterns around the squares.
        var hspWidth = 8;
        // Left top corner.
        MatrixUtil.embedHorizontalSeparationPattern(0, hspWidth - 1, matrix);
        // Right top corner.
        MatrixUtil.embedHorizontalSeparationPattern(matrix.getWidth() - hspWidth, hspWidth - 1, matrix);
        // Left bottom corner.
        MatrixUtil.embedHorizontalSeparationPattern(0, matrix.getWidth() - hspWidth, matrix);
        // Embed vertical separation patterns around the squares.
        var vspSize = 7;
        // Left top corner.
        MatrixUtil.embedVerticalSeparationPattern(vspSize, 0, matrix);
        // Right top corner.
        MatrixUtil.embedVerticalSeparationPattern(matrix.getHeight() - vspSize - 1, 0, matrix);
        // Left bottom corner.
        MatrixUtil.embedVerticalSeparationPattern(vspSize, matrix.getHeight() - vspSize, matrix);
    };
    // Embed position adjustment patterns if need be.
    MatrixUtil.maybeEmbedPositionAdjustmentPatterns = function (version, matrix) {
        if (version.getVersionNumber() < 2) { // The patterns appear if version >= 2
            return;
        }
        var index = version.getVersionNumber() - 1;
        var coordinates = MatrixUtil.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE[index];
        for (var i = 0, length_1 = coordinates.length; i !== length_1; i++) {
            var y = coordinates[i];
            if (y >= 0) {
                for (var j = 0; j !== length_1; j++) {
                    var x = coordinates[j];
                    if (x >= 0 && MatrixUtil.isEmpty(matrix.get(x, y))) {
                        // If the cell is unset, we embed the position adjustment pattern here.
                        // -2 is necessary since the x/y coordinates point to the center of the pattern, not the
                        // left top corner.
                        MatrixUtil.embedPositionAdjustmentPattern(x - 2, y - 2, matrix);
                    }
                }
            }
        }
    };
    MatrixUtil.POSITION_DETECTION_PATTERN = Array.from([
        Int32Array.from([1, 1, 1, 1, 1, 1, 1]),
        Int32Array.from([1, 0, 0, 0, 0, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 0, 0, 0, 0, 1]),
        Int32Array.from([1, 1, 1, 1, 1, 1, 1]),
    ]);
    MatrixUtil.POSITION_ADJUSTMENT_PATTERN = Array.from([
        Int32Array.from([1, 1, 1, 1, 1]),
        Int32Array.from([1, 0, 0, 0, 1]),
        Int32Array.from([1, 0, 1, 0, 1]),
        Int32Array.from([1, 0, 0, 0, 1]),
        Int32Array.from([1, 1, 1, 1, 1]),
    ]);
    // From Appendix E. Table 1, JIS0510X:2004 (71: p). The table was double-checked by komatsu.
    MatrixUtil.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE = Array.from([
        Int32Array.from([-1, -1, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 18, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 22, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 26, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 30, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 34, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 22, 38, -1, -1, -1, -1]),
        Int32Array.from([6, 24, 42, -1, -1, -1, -1]),
        Int32Array.from([6, 26, 46, -1, -1, -1, -1]),
        Int32Array.from([6, 28, 50, -1, -1, -1, -1]),
        Int32Array.from([6, 30, 54, -1, -1, -1, -1]),
        Int32Array.from([6, 32, 58, -1, -1, -1, -1]),
        Int32Array.from([6, 34, 62, -1, -1, -1, -1]),
        Int32Array.from([6, 26, 46, 66, -1, -1, -1]),
        Int32Array.from([6, 26, 48, 70, -1, -1, -1]),
        Int32Array.from([6, 26, 50, 74, -1, -1, -1]),
        Int32Array.from([6, 30, 54, 78, -1, -1, -1]),
        Int32Array.from([6, 30, 56, 82, -1, -1, -1]),
        Int32Array.from([6, 30, 58, 86, -1, -1, -1]),
        Int32Array.from([6, 34, 62, 90, -1, -1, -1]),
        Int32Array.from([6, 28, 50, 72, 94, -1, -1]),
        Int32Array.from([6, 26, 50, 74, 98, -1, -1]),
        Int32Array.from([6, 30, 54, 78, 102, -1, -1]),
        Int32Array.from([6, 28, 54, 80, 106, -1, -1]),
        Int32Array.from([6, 32, 58, 84, 110, -1, -1]),
        Int32Array.from([6, 30, 58, 86, 114, -1, -1]),
        Int32Array.from([6, 34, 62, 90, 118, -1, -1]),
        Int32Array.from([6, 26, 50, 74, 98, 122, -1]),
        Int32Array.from([6, 30, 54, 78, 102, 126, -1]),
        Int32Array.from([6, 26, 52, 78, 104, 130, -1]),
        Int32Array.from([6, 30, 56, 82, 108, 134, -1]),
        Int32Array.from([6, 34, 60, 86, 112, 138, -1]),
        Int32Array.from([6, 30, 58, 86, 114, 142, -1]),
        Int32Array.from([6, 34, 62, 90, 118, 146, -1]),
        Int32Array.from([6, 30, 54, 78, 102, 126, 150]),
        Int32Array.from([6, 24, 50, 76, 102, 128, 154]),
        Int32Array.from([6, 28, 54, 80, 106, 132, 158]),
        Int32Array.from([6, 32, 58, 84, 110, 136, 162]),
        Int32Array.from([6, 26, 54, 82, 110, 138, 166]),
        Int32Array.from([6, 30, 58, 86, 114, 142, 170]),
    ]);
    // Type info cells at the left top corner.
    MatrixUtil.TYPE_INFO_COORDINATES = Array.from([
        Int32Array.from([8, 0]),
        Int32Array.from([8, 1]),
        Int32Array.from([8, 2]),
        Int32Array.from([8, 3]),
        Int32Array.from([8, 4]),
        Int32Array.from([8, 5]),
        Int32Array.from([8, 7]),
        Int32Array.from([8, 8]),
        Int32Array.from([7, 8]),
        Int32Array.from([5, 8]),
        Int32Array.from([4, 8]),
        Int32Array.from([3, 8]),
        Int32Array.from([2, 8]),
        Int32Array.from([1, 8]),
        Int32Array.from([0, 8]),
    ]);
    // From Appendix D in JISX0510:2004 (p. 67)
    MatrixUtil.VERSION_INFO_POLY = 0x1f25; // 1 1111 0010 0101
    // From Appendix C in JISX0510:2004 (p.65).
    MatrixUtil.TYPE_INFO_POLY = 0x537;
    MatrixUtil.TYPE_INFO_MASK_PATTERN = 0x5412;
    return MatrixUtil;
}());
exports.default = MatrixUtil;
//# sourceMappingURL=MatrixUtil.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/qrcode/encoder/QRCode.js":
/*!************************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/qrcode/encoder/QRCode.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var StringBuilder_1 = __webpack_require__(/*! ../../util/StringBuilder */ "./node_modules/@zxing/library/esm5/core/util/StringBuilder.js");
/**
 * @author satorux@google.com (Satoru Takabayashi) - creator
 * @author dswitkin@google.com (Daniel Switkin) - ported from C++
 */
var QRCode = /** @class */ (function () {
    function QRCode() {
        this.maskPattern = -1;
    }
    QRCode.prototype.getMode = function () {
        return this.mode;
    };
    QRCode.prototype.getECLevel = function () {
        return this.ecLevel;
    };
    QRCode.prototype.getVersion = function () {
        return this.version;
    };
    QRCode.prototype.getMaskPattern = function () {
        return this.maskPattern;
    };
    QRCode.prototype.getMatrix = function () {
        return this.matrix;
    };
    /*@Override*/
    QRCode.prototype.toString = function () {
        var result = new StringBuilder_1.default(); // (200)
        result.append('<<\n');
        result.append(' mode: ');
        result.append(this.mode ? this.mode.toString() : 'null');
        result.append('\n ecLevel: ');
        result.append(this.ecLevel ? this.ecLevel.toString() : 'null');
        result.append('\n version: ');
        result.append(this.version ? this.version.toString() : 'null');
        result.append('\n maskPattern: ');
        result.append(this.maskPattern.toString());
        if (this.matrix) {
            result.append('\n matrix:\n');
            result.append(this.matrix.toString());
        }
        else {
            result.append('\n matrix: null\n');
        }
        result.append('>>\n');
        return result.toString();
    };
    QRCode.prototype.setMode = function (value) {
        this.mode = value;
    };
    QRCode.prototype.setECLevel = function (value) {
        this.ecLevel = value;
    };
    QRCode.prototype.setVersion = function (version) {
        this.version = version;
    };
    QRCode.prototype.setMaskPattern = function (value /*int*/) {
        this.maskPattern = value;
    };
    QRCode.prototype.setMatrix = function (value) {
        this.matrix = value;
    };
    // Check if "mask_pattern" is valid.
    QRCode.isValidMaskPattern = function (maskPattern /*int*/) {
        return maskPattern >= 0 && maskPattern < QRCode.NUM_MASK_PATTERNS;
    };
    QRCode.NUM_MASK_PATTERNS = 8;
    return QRCode;
}());
exports.default = QRCode;
//# sourceMappingURL=QRCode.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/util/Arrays.js":
/*!**************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/util/Arrays.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var System_1 = __webpack_require__(/*! ./System */ "./node_modules/@zxing/library/esm5/core/util/System.js");
var Arrays = /** @class */ (function () {
    function Arrays() {
    }
    Arrays.equals = function (first, second) {
        if (!first) {
            return false;
        }
        if (!second) {
            return false;
        }
        if (!first.length) {
            return false;
        }
        if (!second.length) {
            return false;
        }
        if (first.length !== second.length) {
            return false;
        }
        for (var i = 0, length_1 = first.length; i < length_1; i++) {
            if (first[i] !== second[i]) {
                return false;
            }
        }
        return true;
    };
    Arrays.hashCode = function (a) {
        if (a === null) {
            return 0;
        }
        var result = 1;
        for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
            var element = a_1[_i];
            result = 31 * result + element;
        }
        return result;
    };
    Arrays.fillUint8Array = function (a, value) {
        for (var i = 0; i !== a.length; i++) {
            a[i] = value;
        }
    };
    Arrays.copyOf = function (original, newLength) {
        var copy = new Int32Array(newLength);
        System_1.default.arraycopy(original, 0, copy, 0, Math.min(original.length, newLength));
        return copy;
    };
    /*
    * Returns the index of of the element in a sorted array or (-n-1) where n is the insertion point
    * for the new element.
    * Parameters:
    *     ar - A sorted array
    *     el - An element to search for
    *     comparator - A comparator function. The function takes two arguments: (a, b) and returns:
    *        a negative number  if a is less than b;
    *        0 if a is equal to b;
    *        a positive number of a is greater than b.
    * The array may contain duplicate elements. If there are more than one equal elements in the array,
    * the returned value can be the index of any one of the equal elements.
    *
    * http://jsfiddle.net/aryzhov/pkfst550/
    */
    Arrays.binarySearch = function (ar, el, comparator) {
        if (undefined === comparator) {
            comparator = Arrays.numberComparator;
        }
        var m = 0;
        var n = ar.length - 1;
        while (m <= n) {
            var k = (n + m) >> 1;
            var cmp = comparator(el, ar[k]);
            if (cmp > 0) {
                m = k + 1;
            }
            else if (cmp < 0) {
                n = k - 1;
            }
            else {
                return k;
            }
        }
        return -m - 1;
    };
    Arrays.numberComparator = function (a, b) {
        return a - b;
    };
    return Arrays;
}());
exports.default = Arrays;
//# sourceMappingURL=Arrays.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/util/Float.js":
/*!*************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/util/Float.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Float = /** @class */ (function () {
    function Float() {
    }
    Float.floatToIntBits = function (f) {
        return f;
    };
    return Float;
}());
exports.default = Float;
//# sourceMappingURL=Float.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/util/Integer.js":
/*!***************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/util/Integer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Integer = /** @class */ (function () {
    function Integer() {
    }
    Integer.numberOfTrailingZeros = function (i) {
        var y;
        if (i === 0)
            return 32;
        var n = 31;
        y = i << 16;
        if (y !== 0) {
            n -= 16;
            i = y;
        }
        y = i << 8;
        if (y !== 0) {
            n -= 8;
            i = y;
        }
        y = i << 4;
        if (y !== 0) {
            n -= 4;
            i = y;
        }
        y = i << 2;
        if (y !== 0) {
            n -= 2;
            i = y;
        }
        return n - ((i << 1) >>> 31);
    };
    Integer.numberOfLeadingZeros = function (i) {
        // HD, Figure 5-6
        if (i === 0) {
            return 32;
        }
        var n = 1;
        if (i >>> 16 === 0) {
            n += 16;
            i <<= 16;
        }
        if (i >>> 24 === 0) {
            n += 8;
            i <<= 8;
        }
        if (i >>> 28 === 0) {
            n += 4;
            i <<= 4;
        }
        if (i >>> 30 === 0) {
            n += 2;
            i <<= 2;
        }
        n -= i >>> 31;
        return n;
    };
    Integer.toHexString = function (i) {
        return i.toString(16);
    };
    // Returns the number of one-bits in the two's complement binary representation of the specified int value. This function is sometimes referred to as the population count.
    // Returns:
    // the number of one-bits in the two's complement binary representation of the specified int value.
    Integer.bitCount = function (i) {
        // HD, Figure 5-2
        i = i - ((i >>> 1) & 0x55555555);
        i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
        i = (i + (i >>> 4)) & 0x0f0f0f0f;
        i = i + (i >>> 8);
        i = i + (i >>> 16);
        return i & 0x3f;
    };
    Integer.MIN_VALUE_32_BITS = -2147483648;
    return Integer;
}());
exports.default = Integer;
//# sourceMappingURL=Integer.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/util/StringBuilder.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/util/StringBuilder.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringBuilder = /** @class */ (function () {
    function StringBuilder(value) {
        if (value === void 0) { value = ''; }
        this.value = value;
    }
    StringBuilder.prototype.append = function (s) {
        if (typeof s === 'string') {
            this.value += s.toString();
        }
        else {
            this.value += String.fromCharCode(s);
        }
        return this;
    };
    StringBuilder.prototype.length = function () {
        return this.value.length;
    };
    StringBuilder.prototype.charAt = function (n) {
        return this.value.charAt(n);
    };
    StringBuilder.prototype.deleteCharAt = function (n) {
        this.value = this.value.substr(0, n) + this.value.substring(n + 1);
    };
    StringBuilder.prototype.setCharAt = function (n, c) {
        this.value = this.value.substr(0, n) + c + this.value.substr(n + 1);
    };
    StringBuilder.prototype.toString = function () {
        return this.value;
    };
    StringBuilder.prototype.insert = function (n, c) {
        this.value = this.value.substr(0, n) + c + this.value.substr(n + c.length);
    };
    return StringBuilder;
}());
exports.default = StringBuilder;
//# sourceMappingURL=StringBuilder.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/util/StringEncoding.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/util/StringEncoding.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UnsupportedOperationException_1 = __webpack_require__(/*! ../UnsupportedOperationException */ "./node_modules/@zxing/library/esm5/core/UnsupportedOperationException.js");
var CharacterSetECI_1 = __webpack_require__(/*! ../common/CharacterSetECI */ "./node_modules/@zxing/library/esm5/core/common/CharacterSetECI.js");
/**
 * Responsible for en/decoding strings.
 */
var StringEncoding = /** @class */ (function () {
    function StringEncoding() {
    }
    /**
     * Decodes some Uint8Array to a string format.
     */
    StringEncoding.decode = function (bytes, encoding) {
        var encodingName = this.encodingName(encoding);
        // Increases browser support.
        if (typeof TextDecoder === 'undefined') {
            return this.decodeFallback(bytes, encodingName);
        }
        return new TextDecoder(encodingName).decode(bytes);
    };
    /**
     * Encodes some string into a Uint8Array.
     *
     * @todo natively support other string formats than UTF-8.
     */
    StringEncoding.encode = function (s, encoding) {
        // Uses `text-encoding` package.
        if (!StringEncoding.isBrowser()) {
            // SEE: https://nodejs.org/api/buffer.html#buffer_class_buffer
            // SEE: https://github.com/polygonplanet/encoding.js/
            // SEE: https://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
            var EncoderConstructor = TextEncoder;
            return new EncoderConstructor(this.encodingName(encoding), { NONSTANDARD_allowLegacyEncoding: true }).encode(s);
        }
        // Increases browser support.
        if (typeof TextEncoder === 'undefined') {
            return this.encodeFallback(s);
        }
        // TextEncoder only encodes to UTF8 by default as specified by encoding.spec.whatwg.org
        return new TextEncoder().encode(s);
    };
    StringEncoding.isBrowser = function () {
        return (typeof window !== 'undefined' && {}.toString.call(window) === '[object Window]');
    };
    /**
     * Returns the string value from some encoding character set.
     */
    StringEncoding.encodingName = function (encoding) {
        return typeof encoding === 'string'
            ? encoding
            : encoding.getName();
    };
    /**
     * Returns character set from some encoding character set.
     */
    StringEncoding.encodingCharacterSet = function (encoding) {
        return CharacterSetECI_1.default.getCharacterSetECIByName(this.encodingName(encoding));
    };
    /**
     * Runs a fallback for the native decoding funcion.
     */
    StringEncoding.decodeFallback = function (bytes, encoding) {
        var characterSet = this.encodingCharacterSet(encoding);
        if (characterSet.equals(CharacterSetECI_1.default.UTF8) ||
            characterSet.equals(CharacterSetECI_1.default.ISO8859_1) ||
            characterSet.equals(CharacterSetECI_1.default.ASCII)) {
            var s = '';
            for (var i = 0, length_1 = bytes.length; i < length_1; i++) {
                var h = bytes[i].toString(16);
                if (h.length < 2) {
                    h = '0' + h;
                }
                s += '%' + h;
            }
            return decodeURIComponent(s);
        }
        if (characterSet.equals(CharacterSetECI_1.default.UnicodeBigUnmarked)) {
            return String.fromCharCode.apply(null, new Uint16Array(bytes.buffer));
        }
        throw new UnsupportedOperationException_1.default("Encoding " + this.encodingName(encoding) + " not supported by fallback.");
    };
    /**
     * Runs a fallback for the native encoding funcion.
     *
     * @see https://stackoverflow.com/a/17192845/4367683
     */
    StringEncoding.encodeFallback = function (s) {
        var encodedURIstring = btoa(unescape(encodeURIComponent(s)));
        var charList = encodedURIstring.split('');
        var uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint8Array(uintArray);
    };
    return StringEncoding;
}());
exports.default = StringEncoding;
//# sourceMappingURL=StringEncoding.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/core/util/System.js":
/*!**************************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/core/util/System.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var System = /** @class */ (function () {
    function System() {
    }
    // public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
    /**
     * Makes a copy of a array.
     */
    System.arraycopy = function (src, srcPos, dest, destPos, length) {
        // TODO: better use split or set?
        while (length--) {
            dest[destPos++] = src[srcPos++];
        }
    };
    /**
     * Returns the current time in milliseconds.
     */
    System.currentTimeMillis = function () {
        return Date.now();
    };
    return System;
}());
exports.default = System;
//# sourceMappingURL=System.js.map

/***/ }),

/***/ "./node_modules/@zxing/library/esm5/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@zxing/library/esm5/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// browser
__export(__webpack_require__(/*! ./browser/BrowserQRCodeReader */ "./node_modules/@zxing/library/esm5/browser/BrowserQRCodeReader.js"));
__export(__webpack_require__(/*! ./browser/BrowserDatamatrixCodeReader */ "./node_modules/@zxing/library/esm5/browser/BrowserDatamatrixCodeReader.js"));
__export(__webpack_require__(/*! ./browser/BrowserQRCodeSvgWriter */ "./node_modules/@zxing/library/esm5/browser/BrowserQRCodeSvgWriter.js"));
__export(__webpack_require__(/*! ./browser/BrowserBarcodeReader */ "./node_modules/@zxing/library/esm5/browser/BrowserBarcodeReader.js"));
__export(__webpack_require__(/*! ./browser/BrowserCodeReader */ "./node_modules/@zxing/library/esm5/browser/BrowserCodeReader.js"));
__export(__webpack_require__(/*! ./browser/HTMLCanvasElementLuminanceSource */ "./node_modules/@zxing/library/esm5/browser/HTMLCanvasElementLuminanceSource.js"));
__export(__webpack_require__(/*! ./browser/VideoInputDevice */ "./node_modules/@zxing/library/esm5/browser/VideoInputDevice.js"));
// Exceptions
var Exception_1 = __webpack_require__(/*! ./core/Exception */ "./node_modules/@zxing/library/esm5/core/Exception.js");
exports.Exception = Exception_1.default;
var ArgumentException_1 = __webpack_require__(/*! ./core/ArgumentException */ "./node_modules/@zxing/library/esm5/core/ArgumentException.js");
exports.ArgumentException = ArgumentException_1.default;
var ArithmeticException_1 = __webpack_require__(/*! ./core/ArithmeticException */ "./node_modules/@zxing/library/esm5/core/ArithmeticException.js");
exports.ArithmeticException = ArithmeticException_1.default;
var ChecksumException_1 = __webpack_require__(/*! ./core/ChecksumException */ "./node_modules/@zxing/library/esm5/core/ChecksumException.js");
exports.ChecksumException = ChecksumException_1.default;
var FormatException_1 = __webpack_require__(/*! ./core/FormatException */ "./node_modules/@zxing/library/esm5/core/FormatException.js");
exports.FormatException = FormatException_1.default;
var IllegalArgumentException_1 = __webpack_require__(/*! ./core/IllegalArgumentException */ "./node_modules/@zxing/library/esm5/core/IllegalArgumentException.js");
exports.IllegalArgumentException = IllegalArgumentException_1.default;
var IllegalStateException_1 = __webpack_require__(/*! ./core/IllegalStateException */ "./node_modules/@zxing/library/esm5/core/IllegalStateException.js");
exports.IllegalStateException = IllegalStateException_1.default;
var NotFoundException_1 = __webpack_require__(/*! ./core/NotFoundException */ "./node_modules/@zxing/library/esm5/core/NotFoundException.js");
exports.NotFoundException = NotFoundException_1.default;
var ReaderException_1 = __webpack_require__(/*! ./core/ReaderException */ "./node_modules/@zxing/library/esm5/core/ReaderException.js");
exports.ReaderException = ReaderException_1.default;
var ReedSolomonException_1 = __webpack_require__(/*! ./core/ReedSolomonException */ "./node_modules/@zxing/library/esm5/core/ReedSolomonException.js");
exports.ReedSolomonException = ReedSolomonException_1.default;
var UnsupportedOperationException_1 = __webpack_require__(/*! ./core/UnsupportedOperationException */ "./node_modules/@zxing/library/esm5/core/UnsupportedOperationException.js");
exports.UnsupportedOperationException = UnsupportedOperationException_1.default;
var WriterException_1 = __webpack_require__(/*! ./core/WriterException */ "./node_modules/@zxing/library/esm5/core/WriterException.js");
exports.WriterException = WriterException_1.default;
// core
var BarcodeFormat_1 = __webpack_require__(/*! ./core/BarcodeFormat */ "./node_modules/@zxing/library/esm5/core/BarcodeFormat.js");
exports.BarcodeFormat = BarcodeFormat_1.default;
var Binarizer_1 = __webpack_require__(/*! ./core/Binarizer */ "./node_modules/@zxing/library/esm5/core/Binarizer.js");
exports.Binarizer = Binarizer_1.default;
var BinaryBitmap_1 = __webpack_require__(/*! ./core/BinaryBitmap */ "./node_modules/@zxing/library/esm5/core/BinaryBitmap.js");
exports.BinaryBitmap = BinaryBitmap_1.default;
var InvertedLuminanceSource_1 = __webpack_require__(/*! ./core/InvertedLuminanceSource */ "./node_modules/@zxing/library/esm5/core/InvertedLuminanceSource.js");
exports.InvertedLuminanceSource = InvertedLuminanceSource_1.default;
var LuminanceSource_1 = __webpack_require__(/*! ./core/LuminanceSource */ "./node_modules/@zxing/library/esm5/core/LuminanceSource.js");
exports.LuminanceSource = LuminanceSource_1.default;
var MultiFormatReader_1 = __webpack_require__(/*! ./core/MultiFormatReader */ "./node_modules/@zxing/library/esm5/core/MultiFormatReader.js");
exports.MultiFormatReader = MultiFormatReader_1.default;
var MultiFormatWriter_1 = __webpack_require__(/*! ./core/MultiFormatWriter */ "./node_modules/@zxing/library/esm5/core/MultiFormatWriter.js");
exports.MultiFormatWriter = MultiFormatWriter_1.default;
var PlanarYUVLuminanceSource_1 = __webpack_require__(/*! ./core/PlanarYUVLuminanceSource */ "./node_modules/@zxing/library/esm5/core/PlanarYUVLuminanceSource.js");
exports.PlanarYUVLuminanceSource = PlanarYUVLuminanceSource_1.default;
var Result_1 = __webpack_require__(/*! ./core/Result */ "./node_modules/@zxing/library/esm5/core/Result.js");
exports.Result = Result_1.default;
var ResultMetadataType_1 = __webpack_require__(/*! ./core/ResultMetadataType */ "./node_modules/@zxing/library/esm5/core/ResultMetadataType.js");
exports.ResultMetadataType = ResultMetadataType_1.default;
var RGBLuminanceSource_1 = __webpack_require__(/*! ./core/RGBLuminanceSource */ "./node_modules/@zxing/library/esm5/core/RGBLuminanceSource.js");
exports.RGBLuminanceSource = RGBLuminanceSource_1.default;
// core/common
var BitArray_1 = __webpack_require__(/*! ./core/common/BitArray */ "./node_modules/@zxing/library/esm5/core/common/BitArray.js");
exports.BitArray = BitArray_1.default;
var BitMatrix_1 = __webpack_require__(/*! ./core/common/BitMatrix */ "./node_modules/@zxing/library/esm5/core/common/BitMatrix.js");
exports.BitMatrix = BitMatrix_1.default;
var BitSource_1 = __webpack_require__(/*! ./core/common/BitSource */ "./node_modules/@zxing/library/esm5/core/common/BitSource.js");
exports.BitSource = BitSource_1.default;
var CharacterSetECI_1 = __webpack_require__(/*! ./core/common/CharacterSetECI */ "./node_modules/@zxing/library/esm5/core/common/CharacterSetECI.js");
exports.CharacterSetECI = CharacterSetECI_1.default;
var DecoderResult_1 = __webpack_require__(/*! ./core/common/DecoderResult */ "./node_modules/@zxing/library/esm5/core/common/DecoderResult.js");
exports.DecoderResult = DecoderResult_1.default;
var DefaultGridSampler_1 = __webpack_require__(/*! ./core/common/DefaultGridSampler */ "./node_modules/@zxing/library/esm5/core/common/DefaultGridSampler.js");
exports.DefaultGridSampler = DefaultGridSampler_1.default;
var DetectorResult_1 = __webpack_require__(/*! ./core/common/DetectorResult */ "./node_modules/@zxing/library/esm5/core/common/DetectorResult.js");
exports.DetectorResult = DetectorResult_1.default;
var GlobalHistogramBinarizer_1 = __webpack_require__(/*! ./core/common/GlobalHistogramBinarizer */ "./node_modules/@zxing/library/esm5/core/common/GlobalHistogramBinarizer.js");
exports.GlobalHistogramBinarizer = GlobalHistogramBinarizer_1.default;
var GridSampler_1 = __webpack_require__(/*! ./core/common/GridSampler */ "./node_modules/@zxing/library/esm5/core/common/GridSampler.js");
exports.GridSampler = GridSampler_1.default;
var GridSamplerInstance_1 = __webpack_require__(/*! ./core/common/GridSamplerInstance */ "./node_modules/@zxing/library/esm5/core/common/GridSamplerInstance.js");
exports.GridSamplerInstance = GridSamplerInstance_1.default;
var HybridBinarizer_1 = __webpack_require__(/*! ./core/common/HybridBinarizer */ "./node_modules/@zxing/library/esm5/core/common/HybridBinarizer.js");
exports.HybridBinarizer = HybridBinarizer_1.default;
var PerspectiveTransform_1 = __webpack_require__(/*! ./core/common/PerspectiveTransform */ "./node_modules/@zxing/library/esm5/core/common/PerspectiveTransform.js");
exports.PerspectiveTransform = PerspectiveTransform_1.default;
var StringUtils_1 = __webpack_require__(/*! ./core/common/StringUtils */ "./node_modules/@zxing/library/esm5/core/common/StringUtils.js");
exports.StringUtils = StringUtils_1.default;
// core/common/detector
var MathUtils_1 = __webpack_require__(/*! ./core/common/detector/MathUtils */ "./node_modules/@zxing/library/esm5/core/common/detector/MathUtils.js");
exports.MathUtils = MathUtils_1.default;
// export { default as MonochromeRectangleDetector } from './core/common/detector/MonochromeRectangleDetector';
var WhiteRectangleDetector_1 = __webpack_require__(/*! ./core/common/detector/WhiteRectangleDetector */ "./node_modules/@zxing/library/esm5/core/common/detector/WhiteRectangleDetector.js");
exports.WhiteRectangleDetector = WhiteRectangleDetector_1.default;
// core/common/reedsolomon
var GenericGF_1 = __webpack_require__(/*! ./core/common/reedsolomon/GenericGF */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGF.js");
exports.GenericGF = GenericGF_1.default;
var GenericGFPoly_1 = __webpack_require__(/*! ./core/common/reedsolomon/GenericGFPoly */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/GenericGFPoly.js");
exports.GenericGFPoly = GenericGFPoly_1.default;
var ReedSolomonDecoder_1 = __webpack_require__(/*! ./core/common/reedsolomon/ReedSolomonDecoder */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonDecoder.js");
exports.ReedSolomonDecoder = ReedSolomonDecoder_1.default;
var ReedSolomonEncoder_1 = __webpack_require__(/*! ./core/common/reedsolomon/ReedSolomonEncoder */ "./node_modules/@zxing/library/esm5/core/common/reedsolomon/ReedSolomonEncoder.js");
exports.ReedSolomonEncoder = ReedSolomonEncoder_1.default;
// core/twod/qrcode
var QRCodeReader_1 = __webpack_require__(/*! ./core/qrcode/QRCodeReader */ "./node_modules/@zxing/library/esm5/core/qrcode/QRCodeReader.js");
exports.QRCodeReader = QRCodeReader_1.default;
var QRCodeWriter_1 = __webpack_require__(/*! ./core/qrcode/QRCodeWriter */ "./node_modules/@zxing/library/esm5/core/qrcode/QRCodeWriter.js");
exports.QRCodeWriter = QRCodeWriter_1.default;
// core/oned
var OneDReader_1 = __webpack_require__(/*! ./core/oned/OneDReader */ "./node_modules/@zxing/library/esm5/core/oned/OneDReader.js");
exports.OneDReader = OneDReader_1.default;
var EAN13Reader_1 = __webpack_require__(/*! ./core/oned/EAN13Reader */ "./node_modules/@zxing/library/esm5/core/oned/EAN13Reader.js");
exports.EAN13Reader = EAN13Reader_1.default;
var Code128Reader_1 = __webpack_require__(/*! ./core/oned/Code128Reader */ "./node_modules/@zxing/library/esm5/core/oned/Code128Reader.js");
exports.Code128Reader = Code128Reader_1.default;
var ITFReader_1 = __webpack_require__(/*! ./core/oned/ITFReader */ "./node_modules/@zxing/library/esm5/core/oned/ITFReader.js");
exports.ITFReader = ITFReader_1.default;
var Code39Reader_1 = __webpack_require__(/*! ./core/oned/Code39Reader */ "./node_modules/@zxing/library/esm5/core/oned/Code39Reader.js");
exports.Code39Reader = Code39Reader_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@zxing/ngx-scanner/esm5/zxing-ngx-scanner.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@zxing/ngx-scanner/esm5/zxing-ngx-scanner.js ***!
  \*******************************************************************/
/*! exports provided: ZXingScannerModule, ZXingScannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZXingScannerModule", function() { return ZXingScannerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZXingScannerComponent", function() { return ZXingScannerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _zxing_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zxing/library */ "./node_modules/@zxing/library/esm5/index.js");
/* harmony import */ var _zxing_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_zxing_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");








var BrowserCodeReader = /** @class */ (function () {
    function BrowserCodeReader(reader, timeBetweenScans) {
        if (timeBetweenScans === void 0) { timeBetweenScans = 500; }
        this.reader = reader;
        this.timeBetweenScans = timeBetweenScans;
        this.torchCompatible = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
    }
    BrowserCodeReader.prototype.decodeFromInputVideoDevice = function (callbackFn, deviceId, videoElement) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var video, constraints, stream, err_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.reset();
                        this.prepareVideoElement(videoElement);
                        if (typeof deviceId !== 'undefined') {
                            this.deviceId = deviceId;
                        }
                        video = typeof deviceId === 'undefined'
                            ? { facingMode: { exact: 'environment' } }
                            : { deviceId: { exact: deviceId } };
                        constraints = {
                            audio: false,
                            video: video
                        };
                        if (typeof navigator === 'undefined') {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator
                                .mediaDevices
                                .getUserMedia(constraints)];
                    case 2:
                        stream = _a.sent();
                        this.startDecodeFromStream(stream, callbackFn);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BrowserCodeReader.prototype.startDecodeFromStream = function (stream, callbackFn) {
        this.stream = stream;
        this.checkTorchCompatibility(this.stream);
        this.bindVideoSrc(this.videoElement, this.stream);
        this.bindEvents(this.videoElement, callbackFn);
    };
    BrowserCodeReader.prototype.bindVideoSrc = function (videoElement, stream) {
        try {
            videoElement.srcObject = stream;
        }
        catch (err) {
            videoElement.src = window.URL.createObjectURL(stream);
        }
    };
    BrowserCodeReader.prototype.unbindVideoSrc = function (videoElement) {
        try {
            videoElement.srcObject = null;
        }
        catch (err) {
            videoElement.src = '';
        }
    };
    BrowserCodeReader.prototype.bindEvents = function (videoElement, callbackFn) {
        var _this = this;
        if (typeof callbackFn !== 'undefined') {
            this.videoPlayingEventListener = function () { return _this.decodingStream = _this.decodeWithDelay(_this.timeBetweenScans)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (e, x) { return _this.handleDecodeStreamError(e, x); }))
                .subscribe(function (x) { return callbackFn(x); }); };
        }
        videoElement.addEventListener('playing', this.videoPlayingEventListener);
        this.videoLoadedMetadataEventListener = function () { return videoElement.play(); };
        videoElement.addEventListener('loadedmetadata', this.videoLoadedMetadataEventListener);
    };
    BrowserCodeReader.prototype.checkTorchCompatibility = function (stream) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var imageCapture, capabilities, compatible, err_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.track = stream.getVideoTracks()[0];
                        imageCapture = new ImageCapture(this.track);
                        return [4 /*yield*/, imageCapture.getPhotoCapabilities()];
                    case 1:
                        capabilities = _a.sent();
                        compatible = !!capabilities.torch || ('fillLightMode' in capabilities && capabilities.fillLightMode.length !== 0);
                        this.torchCompatible.next(compatible);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        this.torchCompatible.next(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BrowserCodeReader.prototype.setTorch = function (on) {
        if (!this.torchCompatible.value) {
            return;
        }
        if (on) {
            this.track.applyConstraints({
                advanced: [(({ torch: true }))]
            });
        }
        else {
            this.restart();
        }
    };
    Object.defineProperty(BrowserCodeReader.prototype, "torchAvailable", {
        get: function () {
            return this.torchCompatible.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    BrowserCodeReader.prototype.prepareVideoElement = function (videoElement) {
        if (!videoElement && typeof document !== 'undefined') {
            videoElement = document.createElement('video');
            videoElement.width = 200;
            videoElement.height = 200;
        }
        this.videoElement = videoElement;
    };
    BrowserCodeReader.prototype.decodeWithDelay = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 500; }
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            var intervalId = setInterval(function () {
                try {
                    observer.next(_this.decode());
                }
                catch (err) {
                    observer.error(err);
                }
            }, delay);
            return function () { return clearInterval(intervalId); };
        });
    };
    BrowserCodeReader.prototype.decode = function () {
        var binaryBitmap = this.createBinaryBitmap(this.videoElement || this.imageElement);
        return this.decodeBitmap(binaryBitmap);
    };
    BrowserCodeReader.prototype.decodeBitmap = function (binaryBitmap) {
        return this.reader.decode(binaryBitmap);
    };
    BrowserCodeReader.prototype.handleDecodeStreamError = function (err, caught) {
        if (err instanceof _zxing_library__WEBPACK_IMPORTED_MODULE_1__["NotFoundException"] ||
            err instanceof _zxing_library__WEBPACK_IMPORTED_MODULE_1__["ChecksumException"] ||
            err instanceof _zxing_library__WEBPACK_IMPORTED_MODULE_1__["FormatException"]) {
            return caught;
        }
        throw err;
    };
    BrowserCodeReader.prototype.createBinaryBitmap = function (mediaElement) {
        if (undefined === this.canvasElementContext) {
            this.prepareCaptureCanvas();
        }
        this.canvasElementContext.drawImage(mediaElement, 0, 0);
        var luminanceSource = new _zxing_library__WEBPACK_IMPORTED_MODULE_1__["HTMLCanvasElementLuminanceSource"](this.canvasElement);
        var hybridBinarizer = new _zxing_library__WEBPACK_IMPORTED_MODULE_1__["HybridBinarizer"](luminanceSource);
        return new _zxing_library__WEBPACK_IMPORTED_MODULE_1__["BinaryBitmap"](hybridBinarizer);
    };
    BrowserCodeReader.prototype.prepareCaptureCanvas = function () {
        if (typeof document === 'undefined') {
            this.canvasElement = undefined;
            this.canvasElementContext = undefined;
            return;
        }
        var canvasElement = document.createElement('canvas');
        var width;
        var height;
        if (typeof this.videoElement !== 'undefined') {
            width = this.videoElement.videoWidth;
            height = this.videoElement.videoHeight;
        }
        if (typeof this.imageElement !== 'undefined') {
            width = this.imageElement.naturalWidth || this.imageElement.width;
            height = this.imageElement.naturalHeight || this.imageElement.height;
        }
        canvasElement.style.width = width + 'px';
        canvasElement.style.height = height + 'px';
        canvasElement.width = width;
        canvasElement.height = height;
        this.canvasElement = canvasElement;
        this.canvasElementContext = canvasElement.getContext('2d');
    };
    BrowserCodeReader.prototype.stop = function () {
        if (this.decodingStream) {
            this.decodingStream.unsubscribe();
        }
        if (this.stream) {
            this.stream.getVideoTracks().forEach(function (t) { return t.stop(); });
            this.stream = undefined;
        }
    };
    BrowserCodeReader.prototype.reset = function () {
        this.stop();
        if (this.videoElement) {
            if (typeof this.videoPlayEndedEventListener !== 'undefined') {
                this.videoElement.removeEventListener('ended', this.videoPlayEndedEventListener);
            }
            if (typeof this.videoPlayingEventListener !== 'undefined') {
                this.videoElement.removeEventListener('playing', this.videoPlayingEventListener);
            }
            if (typeof this.videoLoadedMetadataEventListener !== 'undefined') {
                this.videoElement.removeEventListener('loadedmetadata', this.videoLoadedMetadataEventListener);
            }
            this.unbindVideoSrc(this.videoElement);
            this.videoElement.removeAttribute('src');
            this.videoElement = undefined;
        }
        if (this.imageElement) {
            if (undefined !== this.videoPlayEndedEventListener) {
                this.imageElement.removeEventListener('load', this.imageLoadedEventListener);
            }
            this.imageElement.src = undefined;
            this.imageElement.removeAttribute('src');
            this.imageElement = undefined;
        }
        this.canvasElementContext = undefined;
        this.canvasElement = undefined;
    };
    BrowserCodeReader.prototype.restart = function () {
        this.decodeFromInputVideoDevice(undefined, this.deviceId, this.videoElement);
    };
    return BrowserCodeReader;
}());
var BrowserMultiFormatReader = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(BrowserMultiFormatReader, _super);
    function BrowserMultiFormatReader(hints, timeBetweenScansMillis) {
        if (hints === void 0) { hints = null; }
        if (timeBetweenScansMillis === void 0) { timeBetweenScansMillis = 500; }
        var _this = this;
        var reader = new _zxing_library__WEBPACK_IMPORTED_MODULE_1__["MultiFormatReader"]();
        reader.setHints(hints);
        _this = _super.call(this, reader, timeBetweenScansMillis) || this;
        return _this;
    }
    BrowserMultiFormatReader.prototype.decodeBitmap = function (binaryBitmap) {
        return this.reader.decodeWithState(binaryBitmap);
    };
    return BrowserMultiFormatReader;
}(BrowserCodeReader));
var ZXingScannerComponent = /** @class */ (function () {
    function ZXingScannerComponent() {
        this.scannerEnabled = true;
        this.autofocusEnabled = true;
        this.previewFitMode = 'cover';
        this.torchCompatible = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.scanSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.scanFailure = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.scanError = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.scanComplete = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.camerasFound = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.camerasNotFound = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.permissionResponse = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.hasDevices = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this._hints = new Map();
        this.hasNavigator = typeof navigator !== 'undefined';
        this.isMediaDevicesSuported = this.hasNavigator && !!navigator.mediaDevices;
        this.isEnumerateDevicesSuported = !!(this.isMediaDevicesSuported && navigator.mediaDevices.enumerateDevices);
        this.formats = [_zxing_library__WEBPACK_IMPORTED_MODULE_1__["BarcodeFormat"].QR_CODE];
    }
    Object.defineProperty(ZXingScannerComponent.prototype, "_hasDevices", {
        set: function (hasDevice) {
            this.hasDevices.next(hasDevice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZXingScannerComponent.prototype, "formats", {
        get: function () {
            return this.hints.get(2);
        },
        set: function (input) {
            var _this = this;
            if (typeof input === 'string') {
                throw new Error('Invalid formats, make sure the [formats] input is a binding.');
            }
            var formats = input.map(function (f) { return _this.getBarcodeFormat(f); });
            this.hints.set(2, formats);
            this.refreshCodeReader();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZXingScannerComponent.prototype, "hints", {
        get: function () {
            return this._hints;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZXingScannerComponent.prototype, "torch", {
        set: function (on) {
            this.codeReader.setTorch(on);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZXingScannerComponent.prototype, "tryHarder", {
        get: function () {
            return this.hints.get(3);
        },
        set: function (enable) {
            if (enable) {
                this.hints.set(3, true);
            }
            else {
                this.hints.delete(3);
            }
            this.refreshCodeReader();
        },
        enumerable: true,
        configurable: true
    });
    ZXingScannerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.scannerEnabled) {
            if (!this.scannerEnabled) {
                this.resetCodeReader();
            }
            else if (this.videoInputDevice) {
                this.scan(this.videoInputDevice.deviceId);
            }
        }
        if (changes.device) {
            if (this.device) {
                this.changeDevice(this.device);
            }
            else {
                console.warn('zxing-scanner', 'device', 'Unselected device.');
                this.resetCodeReader();
            }
        }
    };
    ZXingScannerComponent.prototype.ngAfterViewInit = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var hasPermission;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.previewElemRef) {
                            console.warn('zxing-scanner', 'Preview element not found!');
                            return [2 /*return*/];
                        }
                        this.previewElemRef.nativeElement.setAttribute('autoplay', false);
                        this.previewElemRef.nativeElement.setAttribute('muted', true);
                        this.previewElemRef.nativeElement.setAttribute('playsinline', true);
                        this.previewElemRef.nativeElement.setAttribute('autofocus', this.autofocusEnabled);
                        return [4 /*yield*/, this.askForPermission()];
                    case 1:
                        hasPermission = _a.sent();
                        this.enumarateVideoDevices().then(function (videoInputDevices) {
                            if (videoInputDevices && videoInputDevices.length > 0) {
                                _this._hasDevices = true;
                                _this.camerasFound.next(videoInputDevices);
                            }
                            else {
                                _this._hasDevices = false;
                                _this.camerasNotFound.next();
                            }
                        });
                        if (hasPermission !== true) {
                            return [2 /*return*/];
                        }
                        this.startScan(this.videoInputDevice);
                        this.codeReader.torchAvailable.subscribe(function (value) {
                            _this.torchCompatible.emit(value);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ZXingScannerComponent.prototype.ngOnDestroy = function () {
        this.resetCodeReader();
    };
    ZXingScannerComponent.prototype.changeDevice = function (device) {
        this.resetCodeReader();
        this.videoInputDevice = device;
        this.startScan(device);
    };
    ZXingScannerComponent.prototype.changeDeviceById = function (deviceId) {
        this.changeDevice(this.getDeviceById(deviceId));
    };
    ZXingScannerComponent.prototype.getDeviceById = function (deviceId) {
        return this.videoInputDevices.find(function (device) { return device.deviceId === deviceId; });
    };
    ZXingScannerComponent.prototype.setPermission = function (hasPermission) {
        this.hasPermission = hasPermission;
        this.permissionResponse.next(hasPermission);
        return this.permissionResponse;
    };
    ZXingScannerComponent.prototype.askForPermission = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var stream, err_3, permission;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasNavigator) {
                            console.error('zxing-scanner', 'askForPermission', 'Can\'t ask permission, navigator is not present.');
                            this.setPermission(null);
                            return [2 /*return*/, this.hasPermission];
                        }
                        if (!this.isMediaDevicesSuported) {
                            console.error('zxing-scanner', 'askForPermission', 'Can\'t get user media, this is not supported.');
                            this.setPermission(null);
                            return [2 /*return*/, this.hasPermission];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ audio: false, video: true })];
                    case 2:
                        stream = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, this.handlePermissionException(err_3)];
                    case 4:
                        try {
                            this.codeReader.bindVideoSrc(this.previewElemRef.nativeElement, stream);
                            stream.getVideoTracks().forEach(function (track) {
                                track.stop();
                            });
                            this.codeReader.unbindVideoSrc(this.previewElemRef.nativeElement);
                            permission = true;
                            this.setPermission(permission);
                        }
                        catch (err) {
                            console.error('zxing-scanner', 'askForPermission', err);
                            permission = null;
                            this.setPermission(permission);
                        }
                        return [2 /*return*/, permission];
                }
            });
        });
    };
    ZXingScannerComponent.prototype.handlePermissionException = function (err) {
        console.warn('zxing-scanner', 'askForPermission', err);
        var permission;
        switch (err.name) {
            case 'NotSupportedError':
                console.warn('@zxing/ngx-scanner', err.message);
                permission = null;
                this._hasDevices = null;
                break;
            case 'NotAllowedError':
                console.warn('@zxing/ngx-scanner', err.message);
                permission = false;
                this._hasDevices = true;
                break;
            case 'NotFoundError':
                console.warn('@zxing/ngx-scanner', err.message);
                permission = null;
                this._hasDevices = false;
                this.camerasNotFound.next(err);
                break;
            case 'NotReadableError':
                console.warn('@zxing/ngx-scanner', 'Couldn\'t read the device(s)\'s stream, it\'s probably in use by another app.');
                permission = null;
                this._hasDevices = false;
                this.camerasNotFound.next(err);
                break;
            default:
                console.warn('@zxing/ngx-scanner', 'I was not able to define if I have permissions for camera or not.', err);
                permission = null;
                break;
        }
        this.setPermission(permission);
        this.permissionResponse.error(err);
        return permission;
    };
    ZXingScannerComponent.prototype.scan = function (deviceId) {
        var _this = this;
        try {
            this.codeReader.decodeFromInputVideoDevice(function (result) {
                if (result) {
                    _this.dispatchScanSuccess(result);
                }
                else {
                    _this.dispatchScanFailure();
                }
                _this.dispatchScanComplete(result);
            }, deviceId, this.previewElemRef.nativeElement);
        }
        catch (err) {
            this.dispatchScanError(err);
            this.dispatchScanComplete(undefined);
        }
    };
    ZXingScannerComponent.prototype.startScan = function (device) {
        if (this.scannerEnabled && device) {
            this.scan(device.deviceId);
        }
    };
    ZXingScannerComponent.prototype.resetCodeReader = function () {
        if (this.codeReader) {
            this.codeReader.reset();
        }
    };
    ZXingScannerComponent.prototype.restartScan = function () {
        this.resetCodeReader();
        this.startScan(this.device);
    };
    ZXingScannerComponent.prototype.refreshCodeReader = function () {
        this.resetCodeReader();
        this.codeReader = new BrowserMultiFormatReader(this.hints);
        this.startScan(this.device);
    };
    ZXingScannerComponent.prototype.dispatchScanSuccess = function (result) {
        this.scanSuccess.next(result.getText());
    };
    ZXingScannerComponent.prototype.dispatchScanFailure = function () {
        this.scanFailure.next();
    };
    ZXingScannerComponent.prototype.dispatchScanError = function (error) {
        this.scanError.next(error);
    };
    ZXingScannerComponent.prototype.dispatchScanComplete = function (result) {
        this.scanComplete.next(result);
    };
    ZXingScannerComponent.prototype.enumarateVideoDevices = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var e_1, _a, devices, devices_1, devices_1_1, device, videoDevice, key;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.hasNavigator) {
                            console.error('zxing-scanner', 'enumarateVideoDevices', 'Can\'t enumerate devices, navigator is not present.');
                            return [2 /*return*/];
                        }
                        if (!this.isEnumerateDevicesSuported) {
                            console.error('zxing-scanner', 'enumarateVideoDevices', 'Can\'t enumerate devices, method not supported.');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()];
                    case 1:
                        devices = _b.sent();
                        this.videoInputDevices = [];
                        try {
                            for (devices_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(devices), devices_1_1 = devices_1.next(); !devices_1_1.done; devices_1_1 = devices_1.next()) {
                                device = devices_1_1.value;
                                videoDevice = {};
                                for (key in device) {
                                    videoDevice[key] = device[key];
                                }
                                if (videoDevice.kind === 'video') {
                                    videoDevice.kind = 'videoinput';
                                }
                                if (!videoDevice.deviceId) {
                                    videoDevice.deviceId = (((videoDevice))).id;
                                }
                                if (!videoDevice.label) {
                                    videoDevice.label = 'Camera (no permission 🚫)';
                                }
                                if (videoDevice.kind === 'videoinput') {
                                    this.videoInputDevices.push(videoDevice);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (devices_1_1 && !devices_1_1.done && (_a = devices_1.return)) _a.call(devices_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, this.videoInputDevices];
                }
            });
        });
    };
    ZXingScannerComponent.prototype.getBarcodeFormat = function (format) {
        return typeof format === 'string'
            ? _zxing_library__WEBPACK_IMPORTED_MODULE_1__["BarcodeFormat"][format.trim().toUpperCase()]
            : format;
    };
    return ZXingScannerComponent;
}());
ZXingScannerComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                selector: 'zxing-scanner',
                template: "<video #preview [style.object-fit]=\"previewFitMode\">\n  <p>\n    Your browser does not support this feature, please try to upgrade it.\n  </p>\n  <p>\n    Seu navegador n\u00E3o suporta este recurso, por favor tente atualiz\u00E1-lo.\n  </p>\n</video>\n",
                styles: [":host{display:block}video{width:100%;height:auto;-o-object-fit:contain;object-fit:contain}"],
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ChangeDetectionStrategy"].OnPush
            },] },
];
ZXingScannerComponent.ctorParameters = function () { return []; };
ZXingScannerComponent.propDecorators = {
    previewElemRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: ['preview',] }],
    scannerEnabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
    device: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
    autofocusEnabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
    previewFitMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
    torchCompatible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    scanSuccess: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    scanFailure: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    scanError: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    scanComplete: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    camerasFound: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    camerasNotFound: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    permissionResponse: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    hasDevices: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
    formats: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
    torch: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
    tryHarder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }]
};
var ZXingScannerModule = /** @class */ (function () {
    function ZXingScannerModule() {
    }
    ZXingScannerModule.forRoot = function () {
        return {
            ngModule: ZXingScannerModule
        };
    };
    return ZXingScannerModule;
}());
ZXingScannerModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"], args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"]
                ],
                declarations: [ZXingScannerComponent],
                exports: [ZXingScannerComponent],
            },] },
];


//# sourceMappingURL=zxing-ngx-scanner.js.map


/***/ }),

/***/ "./node_modules/ngx-clipboard/fesm5/ngx-clipboard.js":
/*!***********************************************************!*\
  !*** ./node_modules/ngx-clipboard/fesm5/ngx-clipboard.js ***!
  \***********************************************************/
/*! exports provided: CLIPBOARD_SERVICE_PROVIDER_FACTORY, ClipboardService, CLIPBOARD_SERVICE_PROVIDER, ClipboardDirective, ClipboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLIPBOARD_SERVICE_PROVIDER_FACTORY", function() { return CLIPBOARD_SERVICE_PROVIDER_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardService", function() { return ClipboardService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLIPBOARD_SERVICE_PROVIDER", function() { return CLIPBOARD_SERVICE_PROVIDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardDirective", function() { return ClipboardDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardModule", function() { return ClipboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var ngx_window_token__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-window-token */ "./node_modules/ngx-window-token/fesm5/ngx-window-token.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClipboardService = /** @class */ (function () {
    function ClipboardService(document, window) {
        this.document = document;
        this.window = window;
    }
    Object.defineProperty(ClipboardService.prototype, "isSupported", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} element
     * @return {?}
     */
    ClipboardService.prototype.isTargetValid = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    };
    /**
     * copyFromInputElement
     * @param {?} targetElm
     * @return {?}
     */
    ClipboardService.prototype.copyFromInputElement = /**
     * copyFromInputElement
     * @param {?} targetElm
     * @return {?}
     */
    function (targetElm) {
        try {
            this.selectTarget(targetElm);
            /** @type {?} */
            var re = this.copyText();
            this.clearSelection(targetElm, this.window);
            return re && this.isCopySuccessInIE11();
        }
        catch (error) {
            return false;
        }
    };
    // this is for IE11 return true even if copy fail
    /**
     * @return {?}
     */
    ClipboardService.prototype.isCopySuccessInIE11 = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clipboardData = this.window['clipboardData'];
        if (clipboardData && clipboardData.getData) {
            if (!clipboardData.getData('Text')) {
                return false;
            }
        }
        return true;
    };
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     * @param {?} content
     * @param {?=} container
     * @return {?}
     */
    ClipboardService.prototype.copyFromContent = /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     * @param {?} content
     * @param {?=} container
     * @return {?}
     */
    function (content, container) {
        if (container === void 0) { container = this.window.document.body; }
        // check if the temp textarea is still belong the current container.
        // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
        if (this.tempTextArea && !container.contains(this.tempTextArea)) {
            this.destroy(this.tempTextArea.parentElement);
        }
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document, this.window);
            try {
                container.appendChild(this.tempTextArea);
            }
            catch (error) {
                throw new Error('Container should be a Dom element');
            }
        }
        this.tempTextArea.value = content;
        return this.copyFromInputElement(this.tempTextArea);
    };
    /**
     * @param {?=} container
     * @return {?}
     */
    ClipboardService.prototype.destroy = /**
     * @param {?=} container
     * @return {?}
     */
    function (container) {
        if (container === void 0) { container = this.window.document.body; }
        if (this.tempTextArea) {
            container.removeChild(this.tempTextArea);
            // removeChild doesn't remove the reference from memory
            this.tempTextArea = undefined;
        }
    };
    /**
     * @param {?} inputElement
     * @return {?}
     */
    ClipboardService.prototype.selectTarget = /**
     * @param {?} inputElement
     * @return {?}
     */
    function (inputElement) {
        inputElement.select();
        inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    };
    /**
     * @return {?}
     */
    ClipboardService.prototype.copyText = /**
     * @return {?}
     */
    function () {
        return this.document.execCommand('copy');
    };
    /**
     * @param {?} inputElement
     * @param {?} window
     * @return {?}
     */
    ClipboardService.prototype.clearSelection = /**
     * @param {?} inputElement
     * @param {?} window
     * @return {?}
     */
    function (inputElement, window) {
        // tslint:disable-next-line:no-unused-expression
        inputElement && inputElement.blur();
        window.getSelection().removeAllRanges();
    };
    /**
     * @param {?} doc
     * @param {?} window
     * @return {?}
     */
    ClipboardService.prototype.createTempTextArea = /**
     * @param {?} doc
     * @param {?} window
     * @return {?}
     */
    function (doc, window) {
        /** @type {?} */
        var isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        /** @type {?} */
        var ta;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        /** @type {?} */
        var yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    };
    ClipboardService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    ClipboardService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [ngx_window_token__WEBPACK_IMPORTED_MODULE_2__["WINDOW"],] }] }
    ]; };
    return ClipboardService;
}());
/**
 * @param {?} doc
 * @param {?} win
 * @param {?} parentDispatcher
 * @return {?}
 */
function CLIPBOARD_SERVICE_PROVIDER_FACTORY(doc, win, parentDispatcher) {
    return parentDispatcher || new ClipboardService(doc, win);
}
/** @type {?} */
var CLIPBOARD_SERVICE_PROVIDER = {
    deps: [/** @type {?} */ (_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]), /** @type {?} */ (ngx_window_token__WEBPACK_IMPORTED_MODULE_2__["WINDOW"]), [new _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"](), ClipboardService]],
    provide: ClipboardService,
    useFactory: CLIPBOARD_SERVICE_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClipboardDirective = /** @class */ (function () {
    function ClipboardDirective(clipboardSrv) {
        this.clipboardSrv = clipboardSrv;
        this.cbOnSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cbOnError = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.clipboardSrv.destroy(this.container);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ClipboardDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined, event);
        }
        else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
        }
        else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
        }
    };
    /**
     * Fires an event based on the copy operation result.
     * @param {?} succeeded
     * @param {?} copiedContent
     * @param {?} event
     * @return {?}
     */
    ClipboardDirective.prototype.handleResult = /**
     * Fires an event based on the copy operation result.
     * @param {?} succeeded
     * @param {?} copiedContent
     * @param {?} event
     * @return {?}
     */
    function (succeeded, copiedContent, event) {
        if (succeeded) {
            this.cbOnSuccess.emit({ isSuccess: true, content: copiedContent, event: event });
        }
        else {
            this.cbOnError.emit({ isSuccess: false, event: event });
        }
    };
    ClipboardDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[ngxClipboard]'
                },] },
    ];
    /** @nocollapse */
    ClipboardDirective.ctorParameters = function () { return [
        { type: ClipboardService }
    ]; };
    ClipboardDirective.propDecorators = {
        targetElm: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['ngxClipboard',] }],
        container: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cbContent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cbOnSuccess: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        cbOnError: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        onClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click', ['$event.target'],] }]
    };
    return ClipboardDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ClipboardModule = /** @class */ (function () {
    function ClipboardModule() {
    }
    ClipboardModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], ngx_window_token__WEBPACK_IMPORTED_MODULE_2__["NgxWindowTokenModule"]],
                    // tslint:disable-next-line:object-literal-sort-keys
                    declarations: [ClipboardDirective],
                    exports: [ClipboardDirective],
                    providers: [CLIPBOARD_SERVICE_PROVIDER]
                },] },
    ];
    return ClipboardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWNsaXBib2FyZC9saWIvbmd4LWNsaXBib2FyZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtY2xpcGJvYXJkL2xpYi9uZ3gtY2xpcGJvYXJkLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWNsaXBib2FyZC9saWIvbmd4LWNsaXBib2FyZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJ25neC13aW5kb3ctdG9rZW4nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHRlbXBUZXh0QXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHB1YmxpYyBkb2N1bWVudDogYW55LCBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW5kb3c6IGFueSkge31cclxuICAgIHB1YmxpYyBnZXQgaXNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5kb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQgJiYgISF0aGlzLmRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCgnY29weScpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1RhcmdldFZhbGlkKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgYXR0cmlidXRlLiBQbGVhc2UgdXNlIFwicmVhZG9ubHlcIiBpbnN0ZWFkIG9mIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgc2hvdWxkIGJlIGlucHV0IG9yIHRleHRhcmVhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3B5RnJvbUlucHV0RWxlbWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29weUZyb21JbnB1dEVsZW1lbnQodGFyZ2V0RWxtOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFyZ2V0KHRhcmdldEVsbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlID0gdGhpcy5jb3B5VGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKHRhcmdldEVsbSwgdGhpcy53aW5kb3cpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmUgJiYgdGhpcy5pc0NvcHlTdWNjZXNzSW5JRTExKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIGlzIGZvciBJRTExIHJldHVybiB0cnVlIGV2ZW4gaWYgY29weSBmYWlsXHJcbiAgICBpc0NvcHlTdWNjZXNzSW5JRTExKCkge1xyXG4gICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSB0aGlzLndpbmRvd1snY2xpcGJvYXJkRGF0YSddO1xyXG4gICAgICAgIGlmIChjbGlwYm9hcmREYXRhICYmIGNsaXBib2FyZERhdGEuZ2V0RGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIWNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgZmFrZSB0ZXh0YXJlYSBlbGVtZW50LCBzZXRzIGl0cyB2YWx1ZSBmcm9tIGB0ZXh0YCBwcm9wZXJ0eSxcclxuICAgICAqIGFuZCBtYWtlcyBhIHNlbGVjdGlvbiBvbiBpdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvcHlGcm9tQ29udGVudChjb250ZW50OiBzdHJpbmcsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLndpbmRvdy5kb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHRlbXAgdGV4dGFyZWEgaXMgc3RpbGwgYmVsb25nIHRoZSBjdXJyZW50IGNvbnRhaW5lci5cclxuICAgICAgICAvLyBJbiBjYXNlIHdlIGhhdmUgbXVsdGlwbGUgcGxhY2VzIHVzaW5nIG5neC1jbGlwYm9hcmQsIG9uZSBpcyBpbiBhIG1vZGFsIHVzaW5nIGNvbnRhaW5lciBidXQgdGhlIG90aGVyIG9uZSBpcyBub3QuXHJcbiAgICAgICAgaWYgKHRoaXMudGVtcFRleHRBcmVhICYmICFjb250YWluZXIuY29udGFpbnModGhpcy50ZW1wVGV4dEFyZWEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSh0aGlzLnRlbXBUZXh0QXJlYS5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy50ZW1wVGV4dEFyZWEpIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wVGV4dEFyZWEgPSB0aGlzLmNyZWF0ZVRlbXBUZXh0QXJlYSh0aGlzLmRvY3VtZW50LCB0aGlzLndpbmRvdyk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50ZW1wVGV4dEFyZWEpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgc2hvdWxkIGJlIGEgRG9tIGVsZW1lbnQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlbXBUZXh0QXJlYS52YWx1ZSA9IGNvbnRlbnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29weUZyb21JbnB1dEVsZW1lbnQodGhpcy50ZW1wVGV4dEFyZWEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSB0ZW1wb3JhcnkgdGV4dGFyZWEgaWYgYW55XHJcbiAgICBwdWJsaWMgZGVzdHJveShjb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy53aW5kb3cuZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRlbXBUZXh0QXJlYSkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy50ZW1wVGV4dEFyZWEpO1xyXG4gICAgICAgICAgICAvLyByZW1vdmVDaGlsZCBkb2Vzbid0IHJlbW92ZSB0aGUgcmVmZXJlbmNlIGZyb20gbWVtb3J5XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFRleHRBcmVhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzZWxlY3QgdGhlIHRhcmdldCBodG1sIGlucHV0IGVsZW1lbnRcclxuICAgIHByaXZhdGUgc2VsZWN0VGFyZ2V0KGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZWxlY3QoKTtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgaW5wdXRFbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb3B5VGV4dCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgfVxyXG4gICAgLy8gUmVtb3ZlcyBjdXJyZW50IHNlbGVjdGlvbiBhbmQgZm9jdXMgZnJvbSBgdGFyZ2V0YCBlbGVtZW50LlxyXG4gICAgcHJpdmF0ZSBjbGVhclNlbGVjdGlvbihpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50LCB3aW5kb3c6IFdpbmRvdykge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICAgIGlucHV0RWxlbWVudCAmJiBpbnB1dEVsZW1lbnQuYmx1cigpO1xyXG4gICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgYSBmYWtlIHRleHRhcmVhIGZvciBjb3B5IGNvbW1hbmRcclxuICAgIHByaXZhdGUgY3JlYXRlVGVtcFRleHRBcmVhKGRvYzogRG9jdW1lbnQsIHdpbmRvdzogV2luZG93KTogSFRNTFRleHRBcmVhRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgaXNSVEwgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGlyJykgPT09ICdydGwnO1xyXG4gICAgICAgIGxldCB0YTogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICAgICAgICB0YSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgICAgIC8vIFByZXZlbnQgem9vbWluZyBvbiBpT1NcclxuICAgICAgICB0YS5zdHlsZS5mb250U2l6ZSA9ICcxMnB0JztcclxuICAgICAgICAvLyBSZXNldCBib3ggbW9kZWxcclxuICAgICAgICB0YS5zdHlsZS5ib3JkZXIgPSAnMCc7XHJcbiAgICAgICAgdGEuc3R5bGUucGFkZGluZyA9ICcwJztcclxuICAgICAgICB0YS5zdHlsZS5tYXJnaW4gPSAnMCc7XHJcbiAgICAgICAgLy8gTW92ZSBlbGVtZW50IG91dCBvZiBzY3JlZW4gaG9yaXpvbnRhbGx5XHJcbiAgICAgICAgdGEuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIHRhLnN0eWxlW2lzUlRMID8gJ3JpZ2h0JyA6ICdsZWZ0J10gPSAnLTk5OTlweCc7XHJcbiAgICAgICAgLy8gTW92ZSBlbGVtZW50IHRvIHRoZSBzYW1lIHBvc2l0aW9uIHZlcnRpY2FsbHlcclxuICAgICAgICBjb25zdCB5UG9zaXRpb24gPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICAgICAgdGEuc3R5bGUudG9wID0geVBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICB0YS5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJycpO1xyXG4gICAgICAgIHJldHVybiB0YTtcclxuICAgIH1cclxufVxyXG4vLyB0aGlzIHBhdHRlcm4gaXMgbWVudGlvbmVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEzODU0IGluICM0M1xyXG5leHBvcnQgZnVuY3Rpb24gQ0xJUEJPQVJEX1NFUlZJQ0VfUFJPVklERVJfRkFDVE9SWShkb2M6IERvY3VtZW50LCB3aW46IFdpbmRvdywgcGFyZW50RGlzcGF0Y2hlcjogQ2xpcGJvYXJkU2VydmljZSkge1xyXG4gICAgcmV0dXJuIHBhcmVudERpc3BhdGNoZXIgfHwgbmV3IENsaXBib2FyZFNlcnZpY2UoZG9jLCB3aW4pO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ0xJUEJPQVJEX1NFUlZJQ0VfUFJPVklERVIgPSB7XHJcbiAgICBkZXBzOiBbRE9DVU1FTlQgYXMgSW5qZWN0aW9uVG9rZW48RG9jdW1lbnQ+LCBXSU5ET1cgYXMgSW5qZWN0aW9uVG9rZW48V2luZG93PiwgW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgQ2xpcGJvYXJkU2VydmljZV1dLFxyXG4gICAgcHJvdmlkZTogQ2xpcGJvYXJkU2VydmljZSxcclxuICAgIHVzZUZhY3Rvcnk6IENMSVBCT0FSRF9TRVJWSUNFX1BST1ZJREVSX0ZBQ1RPUllcclxufTtcclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENsaXBib2FyZFNlcnZpY2UgfSBmcm9tICcuL25neC1jbGlwYm9hcmQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnW25neENsaXBib2FyZF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgICBASW5wdXQoJ25neENsaXBib2FyZCcpXHJcbiAgICBwdWJsaWMgdGFyZ2V0RWxtOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBjb250YWluZXI6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBjYkNvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHB1YmxpYyBjYk9uU3VjY2VzczogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHB1YmxpYyBjYk9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaXBib2FyZFNydjogQ2xpcGJvYXJkU2VydmljZSkge31cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuY2xpcGJvYXJkU3J2LmRlc3Ryb3kodGhpcy5jb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQudGFyZ2V0J10pXHJcbiAgICBwdWJsaWMgb25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xpcGJvYXJkU3J2LmlzU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KGZhbHNlLCB1bmRlZmluZWQsIGV2ZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0RWxtICYmIHRoaXMuY2xpcGJvYXJkU3J2LmlzVGFyZ2V0VmFsaWQodGhpcy50YXJnZXRFbG0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHRoaXMuY2xpcGJvYXJkU3J2LmNvcHlGcm9tSW5wdXRFbGVtZW50KHRoaXMudGFyZ2V0RWxtKSwgdGhpcy50YXJnZXRFbG0udmFsdWUsIGV2ZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2JDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHRoaXMuY2xpcGJvYXJkU3J2LmNvcHlGcm9tQ29udGVudCh0aGlzLmNiQ29udGVudCwgdGhpcy5jb250YWluZXIpLCB0aGlzLmNiQ29udGVudCwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIGFuIGV2ZW50IGJhc2VkIG9uIHRoZSBjb3B5IG9wZXJhdGlvbiByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0gc3VjY2VlZGVkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlUmVzdWx0KHN1Y2NlZWRlZDogYm9vbGVhbiwgY29waWVkQ29udGVudDogc3RyaW5nIHwgdW5kZWZpbmVkLCBldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoc3VjY2VlZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JPblN1Y2Nlc3MuZW1pdCh7IGlzU3VjY2VzczogdHJ1ZSwgY29udGVudDogY29waWVkQ29udGVudCwgZXZlbnQ6IGV2ZW50IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JPbkVycm9yLmVtaXQoeyBpc1N1Y2Nlc3M6IGZhbHNlLCBldmVudDogZXZlbnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENsaXBib2FyZERpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LWNsaXBib2FyZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ0xJUEJPQVJEX1NFUlZJQ0VfUFJPVklERVIgfSBmcm9tICcuL25neC1jbGlwYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFdpbmRvd1Rva2VuTW9kdWxlIH0gZnJvbSAnbmd4LXdpbmRvdy10b2tlbic7XG5leHBvcnQgKiBmcm9tICcuL25neC1jbGlwYm9hcmQuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbmd4LWNsaXBib2FyZC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmd4V2luZG93VG9rZW5Nb2R1bGVdLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gIGRlY2xhcmF0aW9uczogW0NsaXBib2FyZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtDbGlwYm9hcmREaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtDTElQQk9BUkRfU0VSVklDRV9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkTW9kdWxlIHt9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7SUFPSSwwQkFBcUMsUUFBYSxFQUEwQixNQUFXO1FBQWxELGFBQVEsR0FBUixRQUFRLENBQUs7UUFBMEIsV0FBTSxHQUFOLE1BQU0sQ0FBSztLQUFJOzBCQUNoRix5Q0FBVzs7Ozs7WUFDbEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBRzNGLHdDQUFhOzs7O2NBQUMsT0FBK0M7UUFDaEUsSUFBSSxPQUFPLFlBQVksZ0JBQWdCLElBQUksT0FBTyxZQUFZLG1CQUFtQixFQUFFO1lBQy9FLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO2FBQ3hHO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzs7Ozs7OztJQU1uRCwrQ0FBb0I7Ozs7O2NBQUMsU0FBaUQ7UUFDekUsSUFBSTtZQUNBLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBQzdCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDM0M7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sS0FBSyxDQUFDO1NBQ2hCOzs7Ozs7SUFJTCw4Q0FBbUI7OztJQUFuQjs7UUFDSSxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7OztJQU1NLDBDQUFlOzs7Ozs7O2NBQUMsT0FBZSxFQUFFLFNBQWtEO1FBQWxELDBCQUFBLEVBQUEsWUFBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSTs7O1FBR3RGLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLElBQUk7Z0JBQ0EsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDNUM7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7YUFDeEQ7U0FDSjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7OztJQUlqRCxrQ0FBTzs7OztjQUFDLFNBQWtEO1FBQWxELDBCQUFBLEVBQUEsWUFBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSTtRQUM3RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O1lBRXpDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQ2pDOzs7Ozs7SUFJRyx1Q0FBWTs7OztjQUFDLFlBQW9EO1FBQ3JFLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0QixZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7Ozs7SUFHN0IsbUNBQVE7Ozs7UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0lBR3JDLHlDQUFjOzs7OztjQUFDLFlBQW9ELEVBQUUsTUFBYzs7UUFFdkYsWUFBWSxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7Ozs7Ozs7SUFJcEMsNkNBQWtCOzs7OztjQUFDLEdBQWEsRUFBRSxNQUFjOztRQUNwRCxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7O1FBQ2hFLElBQUksRUFBRSxDQUFzQjtRQUM1QixFQUFFLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7UUFFbkMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDOztRQUUzQixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzs7UUFFdEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUM7O1FBRS9DLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDdEUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNoQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsQ0FBQzs7O2dCQTlHakIsVUFBVTs7OztnREFHTSxNQUFNLFNBQUMsUUFBUTtnREFBeUIsTUFBTSxTQUFDLE1BQU07OzJCQVB0RTs7Ozs7Ozs7QUFzSEEsNENBQW1ELEdBQWEsRUFBRSxHQUFXLEVBQUUsZ0JBQWtDO0lBQzdHLE9BQU8sZ0JBQWdCLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDN0Q7O0FBRUQsSUFBYSwwQkFBMEIsR0FBRztJQUN0QyxJQUFJLEVBQUUsbUJBQUMsUUFBb0MscUJBQUUsTUFBZ0MsR0FBRSxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xJLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsVUFBVSxFQUFFLGtDQUFrQztDQUNqRDs7Ozs7O0FDOUhEO0lBdUJJLDRCQUFvQixZQUE4QjtRQUE5QixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7MkJBSlYsSUFBSSxZQUFZLEVBQU87eUJBR3pCLElBQUksWUFBWSxFQUFPO0tBQ1A7Ozs7SUFHL0MscUNBQVE7Ozs7Ozs7SUFFUix3Q0FBVzs7OztRQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7O0lBSXZDLG9DQUFPOzs7O0lBRGQsVUFDZSxLQUFZO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUM7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUc7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9HO0tBQ0o7Ozs7Ozs7O0lBTU8seUNBQVk7Ozs7Ozs7Y0FBQyxTQUFrQixFQUFFLGFBQWlDLEVBQUUsS0FBWTtRQUNwRixJQUFJLFNBQVMsRUFBRTtZQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3BGO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDM0Q7OztnQkFoRFIsU0FBUyxTQUFDOztvQkFFUCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUM3Qjs7OztnQkFMUSxnQkFBZ0I7Ozs0QkFRcEIsS0FBSyxTQUFDLGNBQWM7NEJBRXBCLEtBQUs7NEJBR0wsS0FBSzs4QkFHTCxNQUFNOzRCQUdOLE1BQU07MEJBV04sWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQzs7NkJBaEM1Qzs7Ozs7OztBQ0FBOzs7O2dCQVFDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7O29CQUU3QyxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDbEMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUN4Qzs7MEJBZEQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ }),

/***/ "./node_modules/ngx-window-token/fesm5/ngx-window-token.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ngx-window-token/fesm5/ngx-window-token.js ***!
  \*****************************************************************/
/*! exports provided: WINDOW, _window, NgxWindowTokenModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WINDOW", function() { return WINDOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_window", function() { return _window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxWindowTokenModule", function() { return NgxWindowTokenModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('WindowToken');
/**
 * @return {?}
 */
function _window() {
    return window;
}
var NgxWindowTokenModule = /** @class */ (function () {
    function NgxWindowTokenModule() {
    }
    NgxWindowTokenModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    providers: [{
                            provide: WINDOW,
                            useFactory: _window
                        }]
                },] },
    ];
    return NgxWindowTokenModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXdpbmRvdy10b2tlbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXdpbmRvdy10b2tlbi9saWIvbmd4LXdpbmRvdy10b2tlbi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW48V2luZG93PignV2luZG93VG9rZW4nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIF93aW5kb3coKTogV2luZG93IHtcbiAgICByZXR1cm4gd2luZG93O1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogV0lORE9XLFxuICAgICAgICB1c2VGYWN0b3J5OiBfd2luZG93XG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4V2luZG93VG9rZW5Nb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUJBR2EsTUFBTSxHQUFHLElBQUksY0FBYyxDQUFTLGFBQWEsQ0FBQyxDQUFDOzs7O0FBRWhFO0lBQ0ksT0FBTyxNQUFNLENBQUM7Q0FDakI7Ozs7O2dCQUVBLFFBQVEsU0FBQztvQkFDTixTQUFTLEVBQUUsQ0FBQzs0QkFDUixPQUFPLEVBQUUsTUFBTTs0QkFDZixVQUFVLEVBQUUsT0FBTzt5QkFDdEIsQ0FBQztpQkFDTDs7K0JBZEQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ }),

/***/ "./node_modules/ts-custom-error/dist/custom-error.umd.js":
/*!***************************************************************!*\
  !*** ./node_modules/ts-custom-error/dist/custom-error.umd.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? factory(exports) :
    undefined;
}(this, (function (exports) {
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function fixProto(target, prototype) {
        var setPrototypeOf = Object.setPrototypeOf;
        setPrototypeOf ? setPrototypeOf(target, prototype) : (target.__proto__ = prototype);
    }

    function fixStack(target, fn) {
        if (fn === void 0) {
            fn = target.constructor;
        }
        var captureStackTrace = Error.captureStackTrace;
        captureStackTrace && captureStackTrace(target, fn);
    }



    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLnRzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsU0FBUyxNQUFRLEVBQUEsV0FBVztJQUN4QyxHQUFBLENBQUksaUJBQWlCLE1BQUEsQ0FBTztJQUM1QixjQUFBLEdBQ00sY0FBQSxDQUFlLFFBQVEsY0FDdEIsTUFBQSxDQUFPLFNBQVAsQ0FBQSxDQUFBLENBQW1CO0FBQzlCOztBQUNBLE9BQU8sU0FBUyxTQUFTLE1BQVEsRUFBQSxJQUFJO0lBQ2pDLElBQUksRUFBQSxDQUFBLEdBQUEsQ0FBTyxJQUFBLENBQUssR0FBRztRQUFFLEVBQUEsQ0FBQSxDQUFBLENBQUssTUFBQSxDQUFPO0lBQXJDO0lBQ0ksR0FBQSxDQUFJLG9CQUFvQixLQUFBLENBQU07SUFDOUIsaUJBQUEsQ0FBQSxFQUFBLENBQXFCLGlCQUFBLENBQWtCLFFBQVE7QUFDbkQ7O0FBVkEiLCJmaWxlIjoidXRpbHMudHMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGZpeFByb3RvKHRhcmdldCwgcHJvdG90eXBlKSB7XHJcbiAgICB2YXIgc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Y7XHJcbiAgICBzZXRQcm90b3R5cGVPZlxyXG4gICAgICAgID8gc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90b3R5cGUpXHJcbiAgICAgICAgOiAodGFyZ2V0Ll9fcHJvdG9fXyA9IHByb3RvdHlwZSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpeFN0YWNrKHRhcmdldCwgZm4pIHtcclxuICAgIGlmIChmbiA9PT0gdm9pZCAwKSB7IGZuID0gdGFyZ2V0LmNvbnN0cnVjdG9yOyB9XHJcbiAgICB2YXIgY2FwdHVyZVN0YWNrVHJhY2UgPSBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZTtcclxuICAgIGNhcHR1cmVTdGFja1RyYWNlICYmIGNhcHR1cmVTdGFja1RyYWNlKHRhcmdldCwgZm4pO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCJdfQ==

    var CustomError = (function (_super) {
        __extends(CustomError, _super);
        function CustomError(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            _this.name = _newTarget.name;
            fixProto(_this, _newTarget.prototype);
            fixStack(_this);
            return _this;
        }
        
        return CustomError;
    })(Error);


    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbS1lcnJvci50cyhvcmlnaW5hbCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxhQUFhO0FBQ3pCLFFBQVMsVUFBVSxlQUFnQjtBQUNuQyxHQUFBLENBQUksZUFBZSxVQUFVLFFBQVE7SUFDakMsT0FBQSxDQUFRLFNBQVIsQ0FBa0IsYUFBYTtJQUMvQixTQUFTLFlBQVksU0FBUztRQUMxQixHQUFBLENBQUksYUFBYSxJQUFBLENBQUs7UUFDdEIsR0FBQSxDQUFJLFFBQVEsTUFBQSxDQUFPLElBQVAsQ0FBWSxNQUFNLFFBQWxCLENBQUEsRUFBQSxDQUE4QjtRQUMxQyxLQUFBLENBQU0sSUFBTixDQUFBLENBQUEsQ0FBYSxVQUFBLENBQVc7UUFDeEIsUUFBQSxDQUFTLE9BQU8sVUFBQSxDQUFXO1FBQzNCLFFBQUEsQ0FBUztRQUNULE9BQU87SUFDZjs7SUFDSSxPQUFPO0FBQ1gsRUFYbUIsQ0FXakI7QUFDRixPQUFBLENBQVM7QUFkVCIsImZpbGUiOiJjdXN0b20tZXJyb3IudHMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcclxuaW1wb3J0IHsgZml4UHJvdG8sIGZpeFN0YWNrIH0gZnJvbSAnLi91dGlscyc7XHJcbnZhciBDdXN0b21FcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhDdXN0b21FcnJvciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEN1c3RvbUVycm9yKG1lc3NhZ2UpIHtcclxuICAgICAgICB2YXIgX25ld1RhcmdldCA9IHRoaXMuY29uc3RydWN0b3I7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5uYW1lID0gX25ld1RhcmdldC5uYW1lO1xyXG4gICAgICAgIGZpeFByb3RvKF90aGlzLCBfbmV3VGFyZ2V0LnByb3RvdHlwZSk7XHJcbiAgICAgICAgZml4U3RhY2soX3RoaXMpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBDdXN0b21FcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnQgeyBDdXN0b21FcnJvciB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jdXN0b20tZXJyb3IuanMubWFwIl19

    function customErrorFactory(fn, parent) {
        if (parent === void 0) {
            parent = Error;
        }
        function CustomError() {
            var args = [];
            for (var _i = 0;_i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!(this instanceof CustomError)) 
                return new (CustomError.bind.apply(CustomError, [void 0].concat(args)))();
            parent.apply(this, args);
            fn.apply(this, args);
            this.name = fn.name || parent.name;
            fixStack(this, CustomError);
        }
        
        return Object.defineProperties(CustomError, {
            prototype: {
                value: Object.create(parent.prototype, {
                    constructor: {
                        value: CustomError,
                        writable: true,
                        configurable: true
                    }
                })
            }
        });
    }



    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY3RvcnkudHMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVMsZUFBZ0I7QUFDekIsT0FBTyxTQUFTLG1CQUFtQixFQUFJLEVBQUEsUUFBUTtJQUMzQyxJQUFJLE1BQUEsQ0FBQSxHQUFBLENBQVcsSUFBQSxDQUFLLEdBQUc7UUFBRSxNQUFBLENBQUEsQ0FBQSxDQUFTO0lBQXRDO0lBQ0ksU0FBUyxjQUFjO1FBQ25CLEdBQUEsQ0FBSSxPQUFPO1FBQ1gsS0FBSyxHQUFBLENBQUksS0FBSyxFQUFHLEVBQUEsQ0FBQSxDQUFBLENBQUssU0FBQSxDQUFVLFFBQVEsRUFBQSxJQUFNO1lBQzFDLElBQUEsQ0FBSyxHQUFMLENBQUEsQ0FBQSxDQUFXLFNBQUEsQ0FBVTtRQUNqQztRQUNRLElBQUksRUFBRSxJQUFBLENBQUEsVUFBQSxDQUFnQjtZQUNsQixPQUFPLEtBQUssV0FBQSxDQUFZLElBQVosQ0FBaUIsS0FBakIsQ0FBdUIsYUFBYSxDQUFDLElBQUEsQ0FBSyxFQUFOLENBQVMsTUFBVCxDQUFnQixPQUF6RDtRQUNYLE1BQUEsQ0FBTyxLQUFQLENBQWEsTUFBTTtRQUNuQixFQUFBLENBQUcsS0FBSCxDQUFTLE1BQU07UUFDZixJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWSxFQUFBLENBQUcsSUFBSCxDQUFBLEVBQUEsQ0FBVyxNQUFBLENBQU87UUFDOUIsUUFBQSxDQUFTLE1BQU07SUFDdkI7O0lBQ0ksT0FBTyxNQUFBLENBQU8sZ0JBQVAsQ0FBd0IsYUFBYTtRQUN4QyxXQUFXO1lBQ1AsT0FBTyxNQUFBLENBQU8sTUFBUCxDQUFjLE1BQUEsQ0FBTyxXQUFXO2dCQUNuQyxhQUFhO29CQUNULE9BQU8sV0FERSxDQUFBO29CQUVULFVBQVUsSUFGRCxDQUFBO29CQUdULGNBQWM7Ozs7O0FBS2xDOztBQTFCQSIsImZpbGUiOiJmYWN0b3J5LnRzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpeFN0YWNrIH0gZnJvbSAnLi91dGlscyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21FcnJvckZhY3RvcnkoZm4sIHBhcmVudCkge1xyXG4gICAgaWYgKHBhcmVudCA9PT0gdm9pZCAwKSB7IHBhcmVudCA9IEVycm9yOyB9XHJcbiAgICBmdW5jdGlvbiBDdXN0b21FcnJvcigpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEN1c3RvbUVycm9yKSlcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyAoQ3VzdG9tRXJyb3IuYmluZC5hcHBseShDdXN0b21FcnJvciwgW3ZvaWQgMF0uY29uY2F0KGFyZ3MpKSkoKTtcclxuICAgICAgICBwYXJlbnQuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgZm4uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gZm4ubmFtZSB8fCBwYXJlbnQubmFtZTtcclxuICAgICAgICBmaXhTdGFjayh0aGlzLCBDdXN0b21FcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ3VzdG9tRXJyb3IsIHtcclxuICAgICAgICBwcm90b3R5cGU6IHtcclxuICAgICAgICAgICAgdmFsdWU6IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSwge1xyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogQ3VzdG9tRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZhY3RvcnkuanMubWFwIl19

    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjLGdCQUFBO0FBQ2QsY0FBYyxXQUFBO0FBRGQiLCJmaWxlIjoiaW5kZXgudHMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9jdXN0b20tZXJyb3InO1xyXG5leHBvcnQgKiBmcm9tICcuL2ZhY3RvcnknO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXX0=

    exports.CustomError = CustomError;
    exports.customErrorFactory = customErrorFactory;

})));
//# sourceMappingURL=custom-error.umd.js.map


/***/ }),

/***/ "./src/app/components/job/job.component.html":
/*!***************************************************!*\
  !*** ./src/app/components/job/job.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"a-job text-left my-4\">\n  <div class=\"job-action\">\n    <div *ngIf=\"!selected\" (click)=\"writeValue(true)\">\n        <i class=\"green ni ni-fat-add\"></i>\n        <div>ADD</div>\n    </div>\n    <div *ngIf=\"selected\" (click)=\"writeValue(false)\">\n        <i class=\"red ni ni-fat-delete\"></i>\n        <div>REM</div>\n    </div>\n  </div>\n  <div class=\"job-description\">\n    <button type=\"button\" (click)=\"expanded = !expanded\" class=\"btn btn-block {{expanded ? 'btn-info' : ''}}\">{{name}}</button>\n    <div *ngIf=\"expanded\" class=\"card\">\n      <div class=\"card-body\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/job/job.component.scss":
/*!***************************************************!*\
  !*** ./src/app/components/job/job.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".green {\n  background: #6bd098; }\n\n.red {\n  background: #f5365c; }\n\n.a-job {\n  cursor: pointer; }\n\n.a-job .job-description {\n    width: calc(100% - 50px); }\n\n.a-job .job-action {\n    float: right; }\n\n.a-job .job-action i {\n      border-radius: 100%;\n      font-size: 30px;\n      color: white; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25ndXllbmhvbmdwaGF0MC9EZXNrdG9wL2dpdGh1Yi90cml2ZXgvc3JjL2FwcC9jb21wb25lbnRzL2pvYi9qb2IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBbUIsRUFBQTs7QUFFdkI7RUFDSSxtQkFBbUIsRUFBQTs7QUFFdkI7RUFDSSxlQUFlLEVBQUE7O0FBRG5CO0lBSVEsd0JBQXdCLEVBQUE7O0FBSmhDO0lBT1EsWUFBWSxFQUFBOztBQVBwQjtNQVVZLG1CQUFtQjtNQUNuQixlQUFlO01BQ2YsWUFBWSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9qb2Ivam9iLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdyZWVuIHtcbiAgICBiYWNrZ3JvdW5kOiAjNmJkMDk4O1xufVxuLnJlZCB7XG4gICAgYmFja2dyb3VuZDogI2Y1MzY1Yztcbn1cbi5hLWpvYiB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIFxuICAgIC5qb2ItZGVzY3JpcHRpb24ge1xuICAgICAgICB3aWR0aDogY2FsYygxMDAlIC0gNTBweCk7XG4gICAgfVxuICAgIC5qb2ItYWN0aW9uIHtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICBcbiAgICAgICAgaSB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICAgICAgZm9udC1zaXplOiAzMHB4O1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/job/job.component.ts":
/*!*************************************************!*\
  !*** ./src/app/components/job/job.component.ts ***!
  \*************************************************/
/*! exports provided: JobComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobComponent", function() { return JobComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JobComponent = /** @class */ (function () {
    function JobComponent() {
        this.expanded = false;
        this.selected = false;
        this.isDisabled = false;
    }
    JobComponent_1 = JobComponent;
    JobComponent.prototype.writeValue = function (value) {
        this.selected = value;
        if (this.onChange) {
            this.onChange(value);
        }
    };
    JobComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    JobComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    JobComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    var JobComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], JobComponent.prototype, "name", void 0);
    JobComponent = JobComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-job',
            template: __webpack_require__(/*! ./job.component.html */ "./src/app/components/job/job.component.html"),
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                    multi: true,
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return JobComponent_1; }),
                }
            ],
            styles: [__webpack_require__(/*! ./job.component.scss */ "./src/app/components/job/job.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], JobComponent);
    return JobComponent;
}());



/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.module.ts ***!
  \*************************************************************/
/*! exports provided: AdminLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutModule", function() { return AdminLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm5/ngx-clipboard.js");
/* harmony import */ var _admin_layout_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-layout.routing */ "./src/app/layouts/admin-layout/admin-layout.routing.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var src_app_pages_club_members_club_members_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/pages/club-members/club-members.component */ "./src/app/pages/club-members/club-members.component.ts");
/* harmony import */ var src_app_pages_member_connect_member_connect_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/pages/member-connect/member-connect.component */ "./src/app/pages/member-connect/member-connect.component.ts");
/* harmony import */ var src_app_pages_club_members_memberid_memberid_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/pages/club-members/memberid/memberid.component */ "./src/app/pages/club-members/memberid/memberid.component.ts");
/* harmony import */ var src_app_pages_login_qr_code_qr_code_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/pages/login/qr-code/qr-code.component */ "./src/app/pages/login/qr-code/qr-code.component.ts");
/* harmony import */ var _pages_qr_scanner_qr_scanner_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../pages/qr-scanner/qr-scanner.component */ "./src/app/pages/qr-scanner/qr-scanner.component.ts");
/* harmony import */ var _pages_qr_start_qr_start_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../pages/qr-start/qr-start.component */ "./src/app/pages/qr-start/qr-start.component.ts");
/* harmony import */ var _components_job_job_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/job/job.component */ "./src/app/components/job/job.component.ts");
/* harmony import */ var _zxing_ngx_scanner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @zxing/ngx-scanner */ "./node_modules/@zxing/ngx-scanner/esm5/zxing-ngx-scanner.js");
/* harmony import */ var _pages_club_members_connect_connect_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../pages/club-members/connect/connect.component */ "./src/app/pages/club-members/connect/connect.component.ts");
/* harmony import */ var _pages_club_members_send_email_send_email_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../pages/club-members/send-email/send-email.component */ "./src/app/pages/club-members/send-email/send-email.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















// import { ToastrModule } from 'ngx-toastr';
var AdminLayoutModule = /** @class */ (function () {
    function AdminLayoutModule() {
    }
    AdminLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_admin_layout_routing__WEBPACK_IMPORTED_MODULE_6__["AdminLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"],
                ngx_clipboard__WEBPACK_IMPORTED_MODULE_5__["ClipboardModule"],
                _zxing_ngx_scanner__WEBPACK_IMPORTED_MODULE_15__["ZXingScannerModule"].forRoot()
            ],
            declarations: [
                src_app_pages_club_members_club_members_component__WEBPACK_IMPORTED_MODULE_8__["ClubMembersComponent"],
                src_app_pages_member_connect_member_connect_component__WEBPACK_IMPORTED_MODULE_9__["MemberConnectComponent"],
                _pages_qr_scanner_qr_scanner_component__WEBPACK_IMPORTED_MODULE_12__["QrScannerComponent"],
                src_app_pages_login_qr_code_qr_code_component__WEBPACK_IMPORTED_MODULE_11__["QrCodeComponent"],
                _pages_qr_start_qr_start_component__WEBPACK_IMPORTED_MODULE_13__["QrStartComponent"],
                _components_job_job_component__WEBPACK_IMPORTED_MODULE_14__["JobComponent"],
                src_app_pages_club_members_memberid_memberid_component__WEBPACK_IMPORTED_MODULE_10__["MemberidComponent"],
                _pages_club_members_connect_connect_component__WEBPACK_IMPORTED_MODULE_16__["ConnectComponent"],
                _pages_club_members_send_email_send_email_component__WEBPACK_IMPORTED_MODULE_17__["SendEmailComponent"]
            ]
        })
    ], AdminLayoutModule);
    return AdminLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.routing.ts":
/*!**************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.routing.ts ***!
  \**************************************************************/
/*! exports provided: AdminLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutRoutes", function() { return AdminLayoutRoutes; });
/* harmony import */ var _pages_login_qr_code_qr_code_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../pages/login/qr-code/qr-code.component */ "./src/app/pages/login/qr-code/qr-code.component.ts");
/* harmony import */ var src_app_pages_club_members_club_members_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/pages/club-members/club-members.component */ "./src/app/pages/club-members/club-members.component.ts");
/* harmony import */ var src_app_pages_member_connect_member_connect_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/pages/member-connect/member-connect.component */ "./src/app/pages/member-connect/member-connect.component.ts");
/* harmony import */ var src_app_pages_club_members_memberid_memberid_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/pages/club-members/memberid/memberid.component */ "./src/app/pages/club-members/memberid/memberid.component.ts");
/* harmony import */ var _pages_qr_start_qr_start_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/qr-start/qr-start.component */ "./src/app/pages/qr-start/qr-start.component.ts");
/* harmony import */ var _pages_qr_scanner_qr_scanner_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/qr-scanner/qr-scanner.component */ "./src/app/pages/qr-scanner/qr-scanner.component.ts");
/* harmony import */ var _pages_club_members_connect_connect_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/club-members/connect/connect.component */ "./src/app/pages/club-members/connect/connect.component.ts");
/* harmony import */ var _pages_club_members_send_email_send_email_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages/club-members/send-email/send-email.component */ "./src/app/pages/club-members/send-email/send-email.component.ts");








var AdminLayoutRoutes = [
    { path: 'club-members', component: src_app_pages_club_members_club_members_component__WEBPACK_IMPORTED_MODULE_1__["ClubMembersComponent"] },
    { path: 'member-connect', component: src_app_pages_member_connect_member_connect_component__WEBPACK_IMPORTED_MODULE_2__["MemberConnectComponent"] },
    { path: 'club-members/:id/info', component: src_app_pages_club_members_memberid_memberid_component__WEBPACK_IMPORTED_MODULE_3__["MemberidComponent"] },
    { path: 'club-members/:id/connect', component: _pages_club_members_connect_connect_component__WEBPACK_IMPORTED_MODULE_6__["ConnectComponent"] },
    { path: 'club-members/individual_members/:id/connect', component: _pages_club_members_connect_connect_component__WEBPACK_IMPORTED_MODULE_6__["ConnectComponent"] },
    { path: 'club-members/:id/qr-code', component: _pages_login_qr_code_qr_code_component__WEBPACK_IMPORTED_MODULE_0__["QrCodeComponent"] },
    { path: 'club-members/:id/send-email', component: _pages_club_members_send_email_send_email_component__WEBPACK_IMPORTED_MODULE_7__["SendEmailComponent"] },
    { path: "qr-code", component: _pages_login_qr_code_qr_code_component__WEBPACK_IMPORTED_MODULE_0__["QrCodeComponent"] },
    { path: "qr-start", component: _pages_qr_start_qr_start_component__WEBPACK_IMPORTED_MODULE_4__["QrStartComponent"] },
    { path: "qr-scanner", component: _pages_qr_scanner_qr_scanner_component__WEBPACK_IMPORTED_MODULE_5__["QrScannerComponent"] }
];


/***/ }),

/***/ "./src/app/pages/club-members/club-members.component.html":
/*!****************************************************************!*\
  !*** ./src/app/pages/club-members/club-members.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <!-- Card stats -->\n      <div class=\"row\">\n        <div [hidden]=\"dec == member.uuid\" *ngFor=\"let member of members\" class=\"col-12\">\n          <div class=\"card card-stats mb-2\">\n            <div class=\"card-body\">\n              <div class=\"row\">\n                <div class=\"col-auto\">\n                  <img class=\"icon bg-warning text-white rounded-circle shadow\" [src]=member.profilePicture alt=\"\">\n                </div>\n                <div class=\"col text-muted\">\n                  <h2 class=\"h2 font-weight-bold\">{{member.personData.name}}</h2>\n                  <span>{{member.personData.jobTitle}}</span><br>\n                  <span>{{member.personData.employerName}}</span><br>\n                </div>\n              </div>\n              <p class=\"mt-2 mb-0 text-sm text-right\">\n                <a [routerLink]=\"'/club-members/' + injectNumber(member['@id']) + '/send-email'\" class=\"text-uppercase btn btn-primary text-white mr-2\"><i\n                    class=\"ni ni-send\"></i>CONNECT</a>\n              </p>\n            </div>\n          </div>\n        </div>\n        <!-- <div class=\"col-12 mb-2\">\n          <div class=\"card card-stats my-4 mb-xl-0\">\n            \n          </div>\n        </div> -->\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/club-members/club-members.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/club-members/club-members.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NsdWItbWVtYmVycy9jbHViLW1lbWJlcnMuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/club-members/club-members.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/club-members/club-members.component.ts ***!
  \**************************************************************/
/*! exports provided: ClubMembersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClubMembersComponent", function() { return ClubMembersComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClubMembersComponent = /** @class */ (function () {
    function ClubMembersComponent(service, router) {
        this.service = service;
        this.router = router;
        this.members = [];
        this.uHide = false;
    }
    ClubMembersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getDataAPI().subscribe(function (res) {
            var token = localStorage.getItem("token");
            var decoded = jwt_decode__WEBPACK_IMPORTED_MODULE_3__(token);
            _this.dec = decoded.im;
            var getMem = res.json()["hydra:member"];
            _this.members = getMem;
        });
    };
    ClubMembersComponent.prototype.injectNumber = function (s) {
        return s.substring(s.lastIndexOf('/') + 1);
    };
    ClubMembersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-club-members",
            template: __webpack_require__(/*! ./club-members.component.html */ "./src/app/pages/club-members/club-members.component.html"),
            styles: [__webpack_require__(/*! ./club-members.component.scss */ "./src/app/pages/club-members/club-members.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_post_service__WEBPACK_IMPORTED_MODULE_1__["PostService"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], ClubMembersComponent);
    return ClubMembersComponent;
}());



/***/ }),

/***/ "./src/app/pages/club-members/connect/connect.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/pages/club-members/connect/connect.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pb-8 pt-8 d-flex\"\n  style=\"min-height: 1200px; background-image: url(assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;\">\n  <!-- Mask -->\n  <span class=\"mask bg-gradient-danger opacity-8\"></span>\n  <!-- Header container -->\n  <div class=\"container\">\n    <div class=\"row text-center\">\n      <div class=\"col col-md-12\">\n        <h1 *ngFor=\"let member of members\" class=\"display-3 text-white\">{{member.personData.name}}</h1>\n      </div>\n    </div>\n    <div *ngFor=\"let member of members\" class=\"row justify-content-center mt-6\">\n      <div class=\"col-12 col-md-5 order-xl-2 mb-5 mb-xl-0\">\n        <div class=\"card card-profile shadow\">\n          <div class=\"row justify-content-center\">\n            <div class=\"col-lg-3 order-lg-2\">\n              <div class=\"card-profile-image\">\n                <a (click)=\"toClubMem()\" href=\"javascript:void(0)\">\n                  <img [src]=member.profilePicture class=\"rounded-circle\">\n                </a>\n              </div>\n            </div>\n          </div>\n          <div class=\"card-header border-0 pt-md-4 pb-0 pb-md-4\">\n            <div class=\"d-flex justify-content-center mt-8 mb-0\">\n              <a hidden href=\"javascript:void(0)\" class=\"btn btn-sm btn-info mr-4\">Connect</a>\n              <div [hidden]=\"tokenRes\" href=\"javascript:void(0)\" class=\"btn btn-sm btn-default\">Message</div>\n            </div>\n          </div>\n          <div class=\"card-body pt-md-2 ml-2\">\n\n            <!-- <div class=\"row\">\n              <div hidden class=\"col\">\n                <div class=\"card-profile-stats d-flex justify-content-center mt-md-5\">\n                  <div>\n                    <span class=\"heading\">22</span>\n                    <span class=\"description\">Friends</span>\n                  </div>\n                  <div>\n                    <span class=\"heading\">10</span>\n                    <span class=\"description\">Photos</span>\n                  </div>\n                  <div>\n                    <span class=\"heading\">89</span>\n                    <span class=\"description\">Comments</span>\n                  </div>\n                </div>\n              </div>\n            </div> -->\n            <div *ngFor=\"let member of members\" class=\"d-flex flex-column text-center \">\n              <h1 class=\"font-weight-bold ml-2\">\n                {{member.personData.name}}<span class=\"font-weight-light\">, 27</span>\n              </h1>\n              <div class=\"h3\">\n                <i class=\"ni business_briefcase-24 mr-2\"></i>{{member.personData.jobTitle}}\n              </div>\n              <div class=\"h3\">\n                <i class=\"ni education_hat mr-2\"></i>{{member.personData.employerName}}\n              </div>\n              <hr class=\"my-2\" />\n              <p hidden>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and\n                records\n                all of his own music.</p>\n              <a hidden href=\"javascript:void(0)\">Show more</a>\n              <label class=\"text-success h3\">{{status}}</label>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/club-members/connect/connect.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/club-members/connect/connect.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NsdWItbWVtYmVycy9jb25uZWN0L2Nvbm5lY3QuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/club-members/connect/connect.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/club-members/connect/connect.component.ts ***!
  \*****************************************************************/
/*! exports provided: ConnectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectComponent", function() { return ConnectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_app_services_post_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConnectComponent = /** @class */ (function () {
    function ConnectComponent(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.tokenRes = false;
    }
    ConnectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cToken = localStorage.getItem("token");
        if (this.cToken == localStorage.getItem("token")) {
            this.tokenRes = true;
        }
        var id = +this.route.snapshot.paramMap.get('id');
        this.service.getRootID(id).subscribe(function (res) {
            var getInfo = res.json();
            _this.members = [getInfo];
            console.log("info user", res.json());
        });
        this.onConnect();
    };
    ConnectComponent.prototype.onConnect = function () {
        var _this = this;
        var id = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        id.set("toMember", JSON.stringify(this.id));
        this.service.uConnect(id).subscribe(function (response) {
            console.log(response);
            if (response.status === 201) {
                _this.status = "You have connected to this person.";
            }
        });
    };
    ConnectComponent.prototype.toClubMem = function () {
        this.router.navigate(['club-members']);
    };
    ConnectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-connect",
            template: __webpack_require__(/*! ./connect.component.html */ "./src/app/pages/club-members/connect/connect.component.html"),
            styles: [__webpack_require__(/*! ./connect.component.scss */ "./src/app/pages/club-members/connect/connect.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_post_service__WEBPACK_IMPORTED_MODULE_2__["PostService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ConnectComponent);
    return ConnectComponent;
}());



/***/ }),

/***/ "./src/app/pages/club-members/memberid/memberid.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/pages/club-members/memberid/memberid.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header pb-8 pt-8 d-flex align-items-center\" style=\"min-height: 600px; background-image: url(assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;\">\n  <!-- Mask -->\n  <span class=\"mask bg-gradient-danger opacity-8\"></span>\n  <!-- Header container -->\n  <div class=\"container\">\n    <div class=\"row text-center\">\n      <div class=\"col col-md-12\">\n        <h1 *ngFor=\"let member of members\" class=\"display-2 text-white\">{{member.personData.name}}</h1>\n      </div>\n    </div>\n    <div *ngFor=\"let member of members\" class=\"row justify-content-center mt-6\">\n      <div class=\"col-12 col-md-5 order-xl-2 mb-5 mb-xl-0\">\n        <div class=\"card card-profile shadow\">\n          <div class=\"row justify-content-center\">\n            <div class=\"col-lg-3 order-lg-2\">\n              <div class=\"card-profile-image\">\n                <a (click)=\"toClubMem()\" href=\"javascript:void(0)\">\n                  <img [src]=member.profilePicture class=\"rounded-circle\">\n                </a>\n              </div>\n            </div>\n          </div>\n          <div class=\"card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4\">\n            <div class=\"d-flex justify-content-center mt-8 mb-0\">\n              <a hidden href=\"javascript:void(0)\" class=\"btn btn-sm btn-info mr-4\">Connect</a>\n              <div [hidden]=\"tokenRes\" href=\"javascript:void(0)\" class=\"btn btn-sm btn-default\">Message</div>\n            </div>\n          </div>\n          <div class=\"card-body pt-0 pt-md-4 ml-2\">\n            <div class=\"row\">\n              <div hidden class=\"col\">\n                <div class=\"card-profile-stats d-flex justify-content-center mt-md-5\">\n                  <div>\n                    <span class=\"heading\">22</span>\n                    <span class=\"description\">Friends</span>\n                  </div>\n                  <div>\n                    <span class=\"heading\">10</span>\n                    <span class=\"description\">Photos</span>\n                  </div>\n                  <div>\n                    <span class=\"heading\">89</span>\n                    <span class=\"description\">Comments</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"d-flex flex-column text-center \">\n              <h1 class=\"font-weight-bold\">\n                {{member.personData.name}}<span class=\"font-weight-light\">, 27</span>\n              </h1>\n              <div class=\"h2 mt-4\">\n                <i class=\"ni business_briefcase-24 mr-2\"></i>{{member.personData.jobTitle}}\n              </div>\n              <div class=\"h2\">\n                <i class=\"ni education_hat mr-2\"></i>{{member.personData.employerName}}\n              </div>\n              <hr class=\"my-4\" />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/club-members/memberid/memberid.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/pages/club-members/memberid/memberid.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NsdWItbWVtYmVycy9tZW1iZXJpZC9tZW1iZXJpZC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/club-members/memberid/memberid.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/club-members/memberid/memberid.component.ts ***!
  \*******************************************************************/
/*! exports provided: MemberidComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberidComponent", function() { return MemberidComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_post_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MemberidComponent = /** @class */ (function () {
    function MemberidComponent(service, router, routes) {
        this.service = service;
        this.router = router;
        this.routes = routes;
        this.tokenRes = false;
    }
    MemberidComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cToken = localStorage.getItem("token");
        if (this.cToken == localStorage.getItem("token")) {
            this.tokenRes = true;
        }
        var id = +this.routes.snapshot.paramMap.get('id');
        this.service.getRootID(id).subscribe(function (res) {
            var getInfo = res.json();
            _this.members = [getInfo];
            console.log("info user", res.json());
        });
    };
    MemberidComponent.prototype.toClubMem = function () {
        this.router.navigate(["club-members"]);
    };
    MemberidComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "info",
            template: __webpack_require__(/*! ./memberid.component.html */ "./src/app/pages/club-members/memberid/memberid.component.html"),
            styles: [__webpack_require__(/*! ./memberid.component.scss */ "./src/app/pages/club-members/memberid/memberid.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_post_service__WEBPACK_IMPORTED_MODULE_1__["PostService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], MemberidComponent);
    return MemberidComponent;
}());



/***/ }),

/***/ "./src/app/pages/club-members/send-email/send-email.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/pages/club-members/send-email/send-email.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header pb-8 pt-8 d-flex align-items-center\" style=\"min-height: 600px; background-image: url(assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;\">\n  <!-- Mask -->\n  <span class=\"mask bg-gradient-danger opacity-8\"></span>\n  <!-- Header container -->\n  <div *ngIf=\"member\" class=\"container-fluid d-flex align-items-center mt-6\">\n    <div class=\"row\">\n      <div class=\"col-12 col-lg-7 col-md-5 mb-4\">\n        <h1 class=\"display-2 text-white\">{{member.personData.name}}</h1>\n        <div *ngIf=\"error\" class=\"alert alert-danger\">\n          {{error}}\n        </div>\n        <form>\n          <hr class=\"my-4\"/>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"form-group\">\n                <label class=\"form-control-label text-white\" for=\"subject\">Subject</label>\n                <input [(ngModel)]=\"subject\" name=\"subject\" id=\"subject\" class=\"form-control form-control-alternative\" placeholder=\"An invitation letter from Club\" type=\"text\">\n              </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"text-white form-control-label\">Message</label>\n            <textarea [(ngModel)]=\"body\" name=\"body\" rows=\"4\" class=\"form-control form-control-alternative\" placeholder=\"Hello Mr Bean, I am very happy to get to know you. Shall we have a coffee some time together? Yours sincerely.\"></textarea>\n          </div>\n          <div class=\"row text-white\">\n            <div class=\"col-6\"></div>\n            <div class=\"col-6 text-right\">\n              <button class=\"btn btn-info \" (click)=\"send()\" [disabled]=\"loading\">Send</button>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"col-12 col-lg-5 col-md-7 order-xl-2 mb-5 mb-xl-0\">\n        <div class=\"card card-profile shadow\">\n          <div class=\"row justify-content-center\">\n            <div class=\"col-lg-3 order-lg-2\">\n              <div class=\"card-profile-image\">\n                <a href=\"javascript:void(0)\">\n                  <img src=\"{{this.member.profilePicture}}\" class=\"rounded-circle\">\n                </a>\n              </div>\n            </div>\n          </div>\n          <div class=\"card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4\">\n            <div class=\"d-flex justify-content-center mt-8 mb-0\">\n              <a hidden href=\"javascript:void(0)\" class=\"btn btn-sm btn-info mr-4\">Connect</a>\n              <a href=\"javascript:void(0)\" class=\"btn btn-sm btn-default\">Message</a>\n            </div>\n          </div>\n          <div class=\"card-body pt-0 pt-md-4 ml-2\">\n            <div class=\"row\">\n              <div hidden class=\"col\">\n                <div class=\"card-profile-stats d-flex justify-content-center mt-md-5\">\n                  <div>\n                    <span class=\"heading\">22</span>\n                    <span class=\"description\">Friends</span>\n                  </div>\n                  <div>\n                    <span class=\"heading\">10</span>\n                    <span class=\"description\">Photos</span>\n                  </div>\n                  <div>\n                    <span class=\"heading\">89</span>\n                    <span class=\"description\">Comments</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"d-flex flex-column text-center \">\n              <h1 class=\"font-weight-bold\">\n                {{member.personData.name}}<span class=\"font-weight-light\">, 27</span>\n              </h1>\n              <div class=\"h2 mt-4\">\n                <i class=\"ni business_briefcase-24 mr-2\"></i>{{member.personData.jobTitle}}\n              </div>\n              <div class=\"h2\">\n                <i class=\"ni education_hat mr-2\"></i>{{member.personData.employerName}}\n              </div>\n              <hr class=\"my-4\" />\n              <p style=\"visibility: hidden;\">Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and\n                records\n                all of his own music.</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/club-members/send-email/send-email.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/pages/club-members/send-email/send-email.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NsdWItbWVtYmVycy9zZW5kLWVtYWlsL3NlbmQtZW1haWwuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/club-members/send-email/send-email.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/club-members/send-email/send-email.component.ts ***!
  \***********************************************************************/
/*! exports provided: SendEmailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendEmailComponent", function() { return SendEmailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_post_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _services_organisation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/organisation.service */ "./src/app/services/organisation.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SendEmailComponent = /** @class */ (function () {
    function SendEmailComponent(service, orgService, router, routes) {
        this.service = service;
        this.orgService = orgService;
        this.router = router;
        this.routes = routes;
        this.loading = false;
        this.subject = '';
        this.body = '';
        this.error = '';
    }
    SendEmailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.routes.snapshot.paramMap.get('id');
        this.service.getRootID(id).subscribe(function (res) {
            var getInfo = res.json();
            _this.member = getInfo;
        });
    };
    SendEmailComponent.prototype.send = function () {
        var _this = this;
        this.loading = true;
        var memberId = this.member['@id'];
        var id = memberId.substring(memberId.lastIndexOf('/') + 1);
        this.orgService.connectToMember(id, this.subject, this.body).subscribe(function (res) {
            _this.loading = false;
            _this.router.navigate(["/club-members/" + id + "/connect"]);
        }, function (err) {
            _this.error = err.error['hydra:description'];
            _this.loading = false;
        });
    };
    SendEmailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-send-email',
            template: __webpack_require__(/*! ./send-email.component.html */ "./src/app/pages/club-members/send-email/send-email.component.html"),
            styles: [__webpack_require__(/*! ./send-email.component.scss */ "./src/app/pages/club-members/send-email/send-email.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_post_service__WEBPACK_IMPORTED_MODULE_1__["PostService"],
            _services_organisation_service__WEBPACK_IMPORTED_MODULE_2__["OrganisationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], SendEmailComponent);
    return SendEmailComponent;
}());



/***/ }),

/***/ "./src/app/pages/login/qr-code/qr-code.component.html":
/*!************************************************************!*\
  !*** ./src/app/pages/login/qr-code/qr-code.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12 text-center\">\n          <img [src]=\"qrLink\" alt=\"\">\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/login/qr-code/qr-code.component.scss":
/*!************************************************************!*\
  !*** ./src/app/pages/login/qr-code/qr-code.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2xvZ2luL3FyLWNvZGUvcXItY29kZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/login/qr-code/qr-code.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/login/qr-code/qr-code.component.ts ***!
  \**********************************************************/
/*! exports provided: QrCodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QrCodeComponent", function() { return QrCodeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_post_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QrCodeComponent = /** @class */ (function () {
    function QrCodeComponent(service, route) {
        this.service = service;
        this.route = route;
    }
    QrCodeComponent.prototype.ngOnInit = function () {
        var id = +this.route.snapshot.paramMap.get('id');
        this.qrLink = "https://qrcode.magentapulse.com/qr-code/https://www.trivesg.com/club-members/" + id + "/connect.png";
    };
    QrCodeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'qr-code',
            template: __webpack_require__(/*! ./qr-code.component.html */ "./src/app/pages/login/qr-code/qr-code.component.html"),
            styles: [__webpack_require__(/*! ./qr-code.component.scss */ "./src/app/pages/login/qr-code/qr-code.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_post_service__WEBPACK_IMPORTED_MODULE_1__["PostService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], QrCodeComponent);
    return QrCodeComponent;
}());



/***/ }),

/***/ "./src/app/pages/member-connect/member-connect.component.html":
/*!********************************************************************!*\
  !*** ./src/app/pages/member-connect/member-connect.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\n    <div class=\"container-fluid\">\n      <div class=\"header-body\">\n        <!-- Card stats -->\n        <div class=\"row\">\n          <div *ngFor=\"let member of members\" class=\"col-12\">\n            <div class=\"card card-stats mb-2\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-auto\">\n                    <img class=\"icon bg-warning text-white rounded-circle shadow\"\n                      [src]=member.fromMember.profilePicture alt=\"\">\n                  </div>\n                  <div class=\"col text-muted\">\n                    <h2 class=\"h2 font-weight-bold\">{{member.toMember.personData.name}}</h2>\n                    <h5 class=\"card-title text-uppercase mb-0\">{{member.toMember.personData.company}}</h5>\n                    <span>{{member.toMember.personData.jobTitle}}</span><br>\n                    <span>{{member.toMember.personData.employerName}}</span><br>\n                    <span>{{member.toMember.personData.email}}</span>\n                  </div>\n                </div>\n                <p class=\"mt-2 mb-0 text-sm text-right\">\n                  <a [routerLink]=\"'/club-members/' + injectNumber(member.fromMember['@id']) + '/send-email'\" class=\"text-uppercase btn btn-primary text-white mr-2\"><i\n                      class=\"ni ni-send\"></i>CONNECT</a>\n                </p>\n              </div>\n            </div>\n          </div>\n          <!-- <div class=\"col-12 mb-2\">\n            \n          </div> -->\n        </div>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/pages/member-connect/member-connect.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/pages/member-connect/member-connect.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21lbWJlci1jb25uZWN0L21lbWJlci1jb25uZWN0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/member-connect/member-connect.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/member-connect/member-connect.component.ts ***!
  \******************************************************************/
/*! exports provided: MemberConnectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberConnectComponent", function() { return MemberConnectComponent; });
/* harmony import */ var src_app_services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/post.service */ "./src/app/services/post.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MemberConnectComponent = /** @class */ (function () {
    function MemberConnectComponent(service) {
        this.service = service;
        this.showForm = false;
    }
    MemberConnectComponent.prototype.injectNumber = function (s) {
        return s.substring(s.lastIndexOf('/') + 1);
    };
    MemberConnectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getConnect().subscribe(function (res) {
            var get = res.json()["hydra:member"];
            _this.members = get;
        });
    };
    MemberConnectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-member-connect",
            template: __webpack_require__(/*! ./member-connect.component.html */ "./src/app/pages/member-connect/member-connect.component.html"),
            styles: [__webpack_require__(/*! ./member-connect.component.scss */ "./src/app/pages/member-connect/member-connect.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_post_service__WEBPACK_IMPORTED_MODULE_0__["PostService"]])
    ], MemberConnectComponent);
    return MemberConnectComponent;
}());



/***/ }),

/***/ "./src/app/pages/qr-scanner/qr-scanner.component.html":
/*!************************************************************!*\
  !*** ./src/app/pages/qr-scanner/qr-scanner.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-8\">\n    <span class=\"mask bg-gradient-danger opacity-8\"></span>\n    <div class=\"row\">\n        <div class=\"col-12 col-md-6\">\n            <zxing-scanner #scanner [device]=\"currentDevice\" (scanSuccess)=\"handleQrCodeResult($event)\" [formats]=\"['EAN_13', 'CODE_128', 'QR_CODE']\" [tryHarder]=\"true\"></zxing-scanner>\n        </div>\n        <div class=\"col-12 col-md-6\">\n            <div class=\"scanner-shell\" [hidden]=\"!hasDevices\">\n                <select (change)=\"onDeviceSelectChange($event.target.value)\">\n                    <option value=\"\" [selected]=\"!currentDevice\">No Device Selected</option>\n                    <option *ngFor=\"let device of availableDevices\" [value]=\"device.deviceId\" [selected]=\"currentDevice && device.deviceId === currentDevice.deviceId\">{{device.label}}</option>\n                </select>\n                <section class=\"results\" *ngIf=\"qrResultString\">\n                    <small>Result</small>\n                    <strong>{{ qrResultString }}</strong>\n                </section>\n            </div>\n            <ng-container *ngIf=\"hasPermission === undefined\">\n                <h2 class=\"\">Waiting for permissions.</h2>\n                <blockquote>\n                    If your device does not has cameras, no permissions will be asked.\n                </blockquote>\n            </ng-container>\n            <ng-container *ngIf=\"hasPermission === false\">\n                <h2 class=\"\">You denied the camera permission, we can't scan anything without it. 😪</h2>\n            </ng-container>\n            <ng-container *ngIf=\"hasDevices === undefined\">\n                <h2 class=\"\">Couldn't check for devices.</h2>\n                <blockquote>\n                    This may be caused by some security error.\n                </blockquote>\n            </ng-container>\n            <ng-container *ngIf=\"hasDevices === false\">\n                <h2 class=\"\">No devices were found.</h2>\n                <blockquote>\n                    I believe your device has no media devices attached to.\n                </blockquote>\n            </ng-container>\n            <footer>\n                <table class=\"table-scanner-state\">\n                    <thead>\n                        <tr>\n                            <th>Status</th>\n                            <th>Property</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                            <td>{{ stateToEmoji(hasDevices) }}</td>\n                            <td>Devices</td>\n                        </tr>\n                        <tr>\n                            <td>{{ stateToEmoji(hasPermission) }}</td>\n                            <td>Permissions</td>\n                        </tr>\n                    </tbody>\n                </table>\n                <p class=\"ng-version\">Angular version: {{ ngVersion }}</p>\n            </footer>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/qr-scanner/qr-scanner.component.scss":
/*!************************************************************!*\
  !*** ./src/app/pages/qr-scanner/qr-scanner.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3FyLXNjYW5uZXIvcXItc2Nhbm5lci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/qr-scanner/qr-scanner.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/qr-scanner/qr-scanner.component.ts ***!
  \**********************************************************/
/*! exports provided: QrScannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QrScannerComponent", function() { return QrScannerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _zxing_ngx_scanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zxing/ngx-scanner */ "./node_modules/@zxing/ngx-scanner/esm5/zxing-ngx-scanner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QrScannerComponent = /** @class */ (function () {
    function QrScannerComponent() {
        this.ngVersion = _angular_core__WEBPACK_IMPORTED_MODULE_0__["VERSION"].full;
    }
    QrScannerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scanner.camerasFound.subscribe(function (devices) {
            _this.hasDevices = true;
            _this.availableDevices = devices;
            _this.currentDevice = devices[0];
            _this.scanner.changeDevice(_this.currentDevice);
            // selects the devices's back camera by default
            for (var _i = 0, devices_1 = devices; _i < devices_1.length; _i++) {
                var device = devices_1[_i];
                if (/back|rear|environment/gi.test(device.label)) {
                    _this.scanner.changeDevice(device);
                    _this.currentDevice = device;
                    break;
                }
            }
        });
        this.scanner.camerasNotFound.subscribe(function () { return _this.hasDevices = false; });
        this.scanner.scanComplete.subscribe(function (result) { return _this.qrResult = result; });
        this.scanner.permissionResponse.subscribe(function (perm) { return _this.hasPermission = perm; });
    };
    QrScannerComponent.prototype.displayCameras = function (cameras) {
        console.debug('Devices: ', cameras);
        this.availableDevices = cameras;
    };
    QrScannerComponent.prototype.handleQrCodeResult = function (resultString) {
        console.debug('Result: ', resultString);
        this.qrResultString = resultString;
        location.href = resultString;
    };
    QrScannerComponent.prototype.onDeviceSelectChange = function (selectedValue) {
        console.debug('Selection changed: ', selectedValue);
        this.currentDevice = this.scanner.getDeviceById(selectedValue);
    };
    QrScannerComponent.prototype.stateToEmoji = function (state) {
        var states = {
            // not checked
            undefined: '❔',
            // failed to check
            null: '⭕',
            // success
            true: '✔',
            // can't touch that
            false: '❌'
        };
        return states['' + state];
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('scanner'),
        __metadata("design:type", _zxing_ngx_scanner__WEBPACK_IMPORTED_MODULE_1__["ZXingScannerComponent"])
    ], QrScannerComponent.prototype, "scanner", void 0);
    QrScannerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-qr-scanner',
            template: __webpack_require__(/*! ./qr-scanner.component.html */ "./src/app/pages/qr-scanner/qr-scanner.component.html"),
            styles: [__webpack_require__(/*! ./qr-scanner.component.scss */ "./src/app/pages/qr-scanner/qr-scanner.component.scss")]
        })
    ], QrScannerComponent);
    return QrScannerComponent;
}());



/***/ }),

/***/ "./src/app/pages/qr-start/qr-start.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/qr-start/qr-start.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header bg-gradient-danger py-7 py-lg-8\">\n  <div class=\"container\">\n    <div class=\"header-body text-center\">\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <a routerLink=\"['qr-start']\">\n            <div class=\"text-center\" style=\"margin:auto\">\n              <img title=\"logo.png\" alt=\"logo.png\" width=\"200\" style=\"margin:auto; display: block; \" class=\"img-polaroid media-object\" id=\"user-pic-preview\" src=\"https://magenta-consulting.s3.amazonaws.com/live/default/0001/01/thumb_4_admin.png\"  />\n              <h2 class=\"text-white\">World Job Fair 2015</h2>\n            </div>\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"separator separator-bottom separator-skew zindex-100\">\n    <svg x=\"0\" y=\"0\" viewBox=\"0 0 2560 100\" preserveAspectRatio=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n      <polygon class=\"fill-default\" points=\"2560 0 2560 100 0 100\"></polygon>\n    </svg>\n  </div>\n</div>\n<!-- Page content -->\n<div class=\"container mt--8 pb-5\">\n  <div class=\"row justify-content-center\">\n    <div class=\"col-lg-8 col-md-10 col-12\">\n      <div class=\"card bg-secondary shadow border-0\">\n        <div class=\"card-body\">\n          <div *ngIf=\"!loading && !finish\" class=\"container ml-auto mr-auto\">\n            <ngb-progressbar type=\"success\" [value]=\"step*100/totalStep\" [striped]=\"true\" [animated]=\"true\" [height]=\"10\"></ngb-progressbar>\n            <div *ngIf=\"validating\" class=\"alert alert-danger\">\n              Please fill in all the necessary information.\n            </div>\n            <form *ngIf=\"step == 1\" #step1Form=\"ngForm\">\n              <h3>Let us know how we can be in contact with you</h3>\n              <div class=\"row\">\n                <div class=\"col-12 col-md-6\">\n                  <div class=\"form-group\">\n                    <div class=\"input-group input-group-alternative mb-3\">\n                      <div class=\"input-group-prepend\">\n                        <span class=\"input-group-text\"><i class=\"ni ni-hat-3\"></i></span>\n                      </div>\n                      <input class=\"form-control\" name=\"Name\" placeholder=\"Name\" type=\"text\" [(ngModel)]=\"model.name\" #name=\"ngModel\" required>\n                    </div>\n                    <label *ngIf=\"validating && name.invalid\" class=\"text-red\">This field is required.</label>\n                  </div>\n                </div>\n                <div class=\"col-12 col-md-6\">\n                  <div class=\"form-group\">\n                    <div class=\"input-group input-group-alternative mb-3\">\n                      <div class=\"input-group-prepend\">\n                        <span class=\"input-group-text\"><i class=\"ni ni-mobile-button\"></i></span>\n                        <span *ngIf=\"!editPhoneCode\" (click)=\"editPhoneCode = true\" class=\"form-control input-group-text\">+{{model.phoneCode}}</span>\n                      </div>\n                      <input width=\"50px\" *ngIf=\"editPhoneCode\" class=\"form-control\" name=\"phoneCode\" type=\"number\" [(ngModel)]=\"model.phoneCode\" #phoneCode=\"ngModel\" required (blur)=\"finishEditPhoneCode()\" (keyup.enter)=\"finishEditPhoneCode()\">\n                      <input class=\"form-control\" name=\"contactNumber\" placeholder=\"Contact Number\" type=\"text\" [(ngModel)]=\"model.contactNumber\" #contactNumber=\"ngModel\" required>\n                    </div>\n                    <label *ngIf=\"validating && contactNumber.invalid\" class=\"text-red\">This field is required.</label>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <div class=\"input-group input-group-alternative mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"ni ni-email-83\"></i></span>\n                  </div>\n                  <input class=\"form-control\" name=\"email\" placeholder=\"Email Address\" type=\"email\" [(ngModel)]=\"model.email\" #email=\"ngModel\" required email>\n                </div>\n                <label *ngIf=\"validating && email.invalid\" class=\"text-red\">\n                  <span *ngIf=\"email.errors.required\">This field is required.</span>\n                  <span *ngIf=\"!email.errors.required && email.errors.email\">Please enter a valid email address.</span>\n                </label>\n              </div>\n              <div class=\"form-group\">\n                <div class=\"input-group input-group-alternative mb-3\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"ni ni-email-83\"></i></span>\n                  </div>\n                  <input class=\"form-control\" name=\"confirmEmail\" placeholder=\"Confirm Email Address\" type=\"email\" [(ngModel)]=\"model.confirmEmail\" #confirmEmail=\"ngModel\" required email>\n                </div>\n                <label *ngIf=\"validating && confirmEmail.invalid\" class=\"text-red\">\n                  <span *ngIf=\"confirmEmail.errors.required\">This field is required.</span>\n                  <span *ngIf=\"!confirmEmail.errors.required && confirmEmail.errors.email\">Please enter a valid email address.</span>\n                </label>\n                <label class=\"text-red\" *ngIf=\"validating && !confirmEmail.invalid && model.email != model.confirmEmail\">Confirm email not match.</label>\n              </div>\n            </form>\n            <form class=\"text-center\" *ngIf=\"step == 2\" #step2Form=\"ngForm\">\n              <h3>Select Your Areas of Expertise (skills, experience, interest)</h3>\n              <p>You may select more than one</p>\n              <button type=\"button\" (click)=\"model.expertise.it = !model.expertise.it\" class=\"btn {{model.expertise.it ? 'btn-info' : ''}}\">Information Technology</button>\n              <button type=\"button\" (click)=\"model.expertise.hr = !model.expertise.hr\" class=\"btn {{model.expertise.hr ? 'btn-info' : ''}}\">Human Resources</button>\n            </form>\n            <form class=\"text-center\" *ngIf=\"step == 3\" #step3Form=\"ngForm\">\n              <h3>Which jobs are you interested in?</h3>\n              <p>Select Jobs within the following Industry Spaces:</p>\n              <app-job [(ngModel)]=\"model.jobs.job2\" name=\"Job 2\">\n                Job 2\n                <ol>\n                  <li>Interview is required</li>\n                  <li>Resume is not</li>\n                </ol>\n              </app-job>\n              <app-job [(ngModel)]=\"model.jobs.job1\" name=\"Job 1\">\n                Job 1 no Interview required\n              </app-job>\n            </form>\n            <form class=\"text-center\" *ngIf=\"step == 4\" #step4Form=\"ngForm\">\n              <h3>Did you speak with someone at the event?</h3>\n              <button type=\"button\" (click)=\"model.spoken = true; next()\" class=\"btn btn-block {{model.spoken == true ? 'btn-info' : ''}}\">Yes, I’ve spoken to someone already</button>\n              <button type=\"button\" (click)=\"model.spoken = false; next()\" class=\"btn btn-block {{model.spoken == false ? 'btn-info' : ''}}\">No, I have not spoken to anyone</button>\n            </form>\n            <form class=\"text-center\" *ngIf=\"step == 5\" #step5Form=\"ngForm\">\n              <h3>Who did you speak to at the booth?</h3>\n              <p>Please select the person(s) that you have spoken to.</p>\n              <button type=\"button\" (click)=\"model.spokenTo.bonjour = !model.spokenTo.bonjour\" class=\"btn {{model.spokenTo.bonjour ? 'btn-info' : ''}}\">Bonjour<br/>(OK)</button>\n              <button type=\"button\" (click)=\"model.spokenTo.binhLe = !model.spokenTo.binhLe\" class=\"btn {{model.spokenTo.binhLe ? 'btn-info' : ''}}\">Binh Le<br/>(TRST)</button>\n            </form>\n            <form class=\"text-center\" *ngIf=\"step == 6\" #step6Form=\"ngForm\">\n              <h3>Would you like to drop us a note?</h3>\n              <div class=\"form-group\">\n                <textarea name=\"note\" [(ngModel)]=\"model.note\" class=\"form-control\" rows=\"6\" placeholder=\"Just leave this field blank if you don't want to send us any note\"></textarea>\n              </div>\n            </form>\n\n\n            <div class=\"text-center\">\n                <button *ngIf=\"step > 1\" (click)=\"back()\" class=\"btn mt-4\">Previous Step</button>\n                <button *ngIf=\"step < totalStep\" (click)=\"next()\" class=\"btn btn-primary mt-4\">Next Step</button>\n                <button *ngIf=\"step == totalStep\" (click)=\"submit()\" class=\"btn btn-success mt-4\">Submit Application</button>\n            </div>\n          </div>\n          <div *ngIf=\"loading\" class=\"container ml-auto mr-auto text-center\">\n            <img class=\"car\" src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/car.svg\" alt=\"\"/>\n            <img class=\"poof\" src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/poof.svg\" alt=\"\"/>\n            <img class=\"sign\" src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/sign.svg\" alt=\"\"/>\n            <p><em>PATIENCE IS A VIRTUE<br/>We're processing your application ...</em></p>\n          </div>\n          <div *ngIf=\"finish\" class=\"container ml-auto mr-auto\">\n            <p>Thank you for visiting our booth and for registering your interest with us. Please feel free to chat with our corporate representatives that are currently on-site.</p>\n            <div class=\"text-center\">\n              <h2>Sunrise. Vn</h2>\n              <button [routerLink]=\"['/']\" class=\"btn btn-success mt-4\">Done</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/qr-start/qr-start.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/qr-start/qr-start.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3FyLXN0YXJ0L3FyLXN0YXJ0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/qr-start/qr-start.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/qr-start/qr-start.component.ts ***!
  \******************************************************/
/*! exports provided: QrStartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QrStartComponent", function() { return QrStartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QrStartComponent = /** @class */ (function () {
    function QrStartComponent() {
        this.model = {
            name: '',
            contactNumber: '',
            phoneCode: 65,
            email: '',
            confirmEmail: '',
            expertise: {
                it: false,
                hr: false
            },
            jobs: {
                job1: false,
                job2: false
            },
            spoken: null,
            spokenTo: {
                bonjour: false,
                binhLe: false
            },
            note: ''
        };
        this.step = 1;
        this.totalStep = 6;
        this.validating = false;
        this.loading = false;
        this.finish = false;
        this.editPhoneCode = false;
    }
    QrStartComponent.prototype.ngOnInit = function () {
    };
    QrStartComponent.prototype.back = function () {
        this.validating = false;
        if (this.step == 6) {
            this.step = 4;
        }
        else {
            this.step--;
        }
    };
    QrStartComponent.prototype.next = function () {
        this.validating = true;
        if (this.step == 1 && !this.step1Form.valid)
            return;
        else if (this.step == 2 && !this.model.expertise.it && !this.model.expertise.hr)
            return;
        else if (this.step == 3 && !this.model.jobs.job1 && !this.model.jobs.job2)
            return;
        else if (this.step == 4 && !this.model.spoken)
            this.step++;
        else if (this.step == 5 && !this.model.spokenTo.bonjour && !this.model.spokenTo.binhLe)
            return;
        this.validating = false;
        this.step++;
    };
    QrStartComponent.prototype.submit = function () {
        var _this = this;
        this.loading = true;
        console.log(this.model);
        setTimeout(function () {
            _this.loading = false;
            _this.finish = true;
        }, 2000);
    };
    QrStartComponent.prototype.finishEditPhoneCode = function () {
        this.editPhoneCode = false;
        if (!this.model.phoneCode) {
            this.model.phoneCode = 65;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('step1Form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"])
    ], QrStartComponent.prototype, "step1Form", void 0);
    QrStartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-qr-start',
            template: __webpack_require__(/*! ./qr-start.component.html */ "./src/app/pages/qr-start/qr-start.component.html"),
            styles: [__webpack_require__(/*! ./qr-start.component.scss */ "./src/app/pages/qr-start/qr-start.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], QrStartComponent);
    return QrStartComponent;
}());



/***/ }),

/***/ "./src/app/services/organisation.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/organisation.service.ts ***!
  \**************************************************/
/*! exports provided: OrganisationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganisationService", function() { return OrganisationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrganisationService = /** @class */ (function () {
    function OrganisationService(http) {
        this.http = http;
        this.apiBase = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].orgApiBase;
    }
    OrganisationService.prototype.connectToMember = function (id, subject, body) {
        var url = this.apiBase + "/individual_members/" + id + "/email";
        var data = {
            emailSubject: subject,
            emailBody: body
        };
        return this.http.put(url, data, { headers: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"].getHeaders() });
    };
    OrganisationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], OrganisationService);
    return OrganisationService;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-admin-layout-admin-layout-module.js.map