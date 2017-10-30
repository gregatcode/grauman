import { STEREOSCOPIC_LAYOUTS } from 'consts';

/**
 * Construct a new MediaFile, which is an object that tells the MediaPlayer
 * how to display a file at a given URL.
 *
 * @class MediaFile
 * @classdesc A File for the MediaPlayer to display
 *
 * @param {Object} file A hash to initialize the MediaFile with.
 * @param {string} file.mimeType MIME Type of the file.
 * @param {string} file.url URL of the file to display.
 * @param {number} [file.duration] Total playback length, in seconds.
 * @param {string} [file.poster=null] URL to an image to use as a poster image.
 * @param {boolean} [file.is360=false] Is the file content formatted for a 360/panoramic viewer?
 * @param {STEREOSCOPIC_LAYOUTS} [file.stereoscopicLayout=NONE] The stereoscopic layout of the content, if applicable.
 * @param {number} [file.height=0] The intended display height, in pixels, of the file.
 * @param {number} [file.width=0] The intended display width, in pixels, of the file.
 * @param {number} [file.fps=0.0] Frames-per-second playback speed of video content.
 * @param {number} [file.channels=0] Number of audio channels.
 * @param {string} [file.waveform=""] URL to the waveform image for this file generated by [waveform](https://github.com/rzurad/waveform).
 *
 * @throws {TypeError} Thrown if a required property on the `file` object hash is of the wrong type.
 *
 * @returns {MediaFile} The newly instantiated MediaFile object.
 */
function MediaFile(file) {
    if (!file) {
        throw new TypeError('MediaFile requires `file` object argument.');
    }

    if (!file.mimeType || typeof file.mimeType !== 'string') {
        throw new TypeError('MediaFile `mimeType` required');
    }

    if (!file.url || typeof file.url !== 'string') {
        throw new TypeError('MediaFile `url` required');
    }

    /**
     * Is the file intended to be displayed in a 360 or panoramic viewer?
     *
     * @property {boolean} is360
     */

    this.is360 = Boolean(file.is360);
    /**
     * The MIME Type of the file.
     *
     * @property {string}
     * @example
     * "video/mp4"
     * "audio/m4a"
     */
    this.mimeType = file.mimeType;

    /**
     * A URL to an image that will be used as a poster image.
     *
     * @property {string} poster
     */
    this.poster = file.poster;

    if (Object.values(STEREOSCOPIC_LAYOUTS).indexOf(file.stereoscopicLayout) === -1) {
        file.stereoscopicLayout = STEREOSCOPIC_LAYOUTS.NONE;
    }

    /**
     * What is the 360 content's stereoscopic format?
     *
     * This property is ignored by the MediaPlayer if `is360` is `false`.
     *
     * @property {STEREOSCOPIC_LAYOUTS} [stereoscopicLayout=NONE]
     */
    this.stereoscopicLayout = file.stereoscopicLayout;

    /**
     * The URL of the file. Subject to CORS restrictions. See {@link #cors.md}
     *
     * @property {string}
     */
    this.url = file.url;

    /**
     * The intended display height, in pixels, of the file.
     *
     * The media player will never scale the viewer for this file past this height, e.g. if
     * you had a MediaFile of size 500x500 rendering in a MediaPlayer whose container is 800x800,
     * you will see the 500x500 MediaAsset vertically and horizontally centered within the 800x800
     * container
     *
     * @property {number}
     * @default 0
     */
    this.height = parseInt(file.height, 10) || 0;

    /**
     * The intended display width, in pixels, of the file.
     *
     * The media player will never scale the viewer for this file past this width, e.g. if
     * you had a MediaFile of size 500x500 rendering in a MediaPlayer whose container is 800x800,
     * you will see the 500x500 MediaAsset vertically and horizontally centered within the 800x800
     * container
     *
     * @property {number}
     * @default 0
     */
    this.width = parseInt(file.width, 10) || 0;

    /**
     * Frames-per-second playback speed of the file.
     *
     * @property {number}
     * @default 0.0
     */
    this.fps = file.fps || 0;

    /**
     * Total playback length of the file, in seconds.
     *
     * @property {number}
     * @default -1
     */
    this.duration = file.duration || -1;

    /**
     * Number of audio channels.
     *
     * @property {number}
     * @default 0
     */
    this.channels = file.channels || 0;

    /**
     * Title of the File.
     *
     * @property {string}
     * @default ""
     */
    this.title = file.title || '';

    /**
     * URL to the waveform image for this file generated by [waveform](https://github.com/rzurad/waveform)
     *
     * @property {string}
     * @default ""
     */
    this.waveform = file.waveform || '';

    /**
     * Is this a PDF file, determined by its mimeType.
     *
     * @name isPDF
     * @type boolean
     * @memberof MediaFile
     * @property
     * @instance
     */
    Object.defineProperty(this, 'isPDF', {
        enumerable: true,
        get() {
            const types = ['application/pdf', 'application/x-pdf'];
            return types.includes(this.mimeType.toLowerCase());
        }
    });

    /**
     * Is this an HLS playlist, determined by its mimeType.
     *
     * @name isHLS
     * @type boolean
     * @memberof MediaFile
     * @property
     * @instance
     */
    Object.defineProperty(this, 'isHLS', {
        enumerable: true,
        get() {
            const types = ['application/mpegurl', 'application/x-mpegurl', 'application/vnd.apple.mpegurl'];
            return types.includes(this.mimeType.toLowerCase());
        }
    });
}

export default MediaFile;
