"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var Loader = require("./loader");

/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 * @function
 */
function throwIfMissing() {
  throw new Error("Missing parameter");
}

var audioContext = new AudioContext();

/**
 * AudioBufferLoader
 * @class
 * @classdesc Promise based implementation of XMLHttpRequest Level 2 for GET method and decode audio data for arraybuffer.
 * Inherit from Loader class
 */

var AudioBufferLoader = (function (_Loader) {

  /**
   * @constructs
   * Set the responseType to 'arraybuffer' and initialize options.
   */

  function AudioBufferLoader() {
    _classCallCheck(this, AudioBufferLoader);

    this.options = {
      wrapAroundExtension: 0
    };
    this.responseType = "arraybuffer";
    _get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "constructor", this).call(this, this.responseType);
  }

  _inherits(AudioBufferLoader, _Loader);

  _createClass(AudioBufferLoader, {
    load: {

      /**
       * @function - Method for promise audio file loading and decoding.
       * @param {(string|string[])} fileURLs - The URL(s) of the audio files to load. Accepts a URL pointing to the file location or an array of URLs.
       * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining
       * at the end of the returned AudioBuffer
       * @returns {Promise}
       */

      value: function load() {
        var fileURLs = arguments[0] === undefined ? throwIfMissing() : arguments[0];
        var options = arguments[1] === undefined ? {} : arguments[1];

        this.options = options;
        this.options.wrapAroundExtension = this.options.wrapAroundExtension || 0;
        return _get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "load", this).call(this, fileURLs);
      }
    },
    loadOne: {

      /**
       * @function - Load a single audio file, decode it in an AudioBuffer, return a Promise
       * @private
       * @param {string} fileURL - The URL of the audio file location to load.
       * @returns {Promise}
       */

      value: function loadOne(fileURL) {
        return _get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "loadOne", this).call(this, fileURL).then(this.decodeAudioData.bind(this), function (error) {
          throw error;
        });
      }
    },
    loadAll: {

      /**
       * @function - Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a Promise.
       * @private
       * @param {string[]} fileURLs - The URLs array of the audio files to load.
       * @returns {Promise}
       */

      value: function loadAll(fileURLs) {
        var _this = this;

        return _get(_core.Object.getPrototypeOf(AudioBufferLoader.prototype), "loadAll", this).call(this, fileURLs).then(function (arraybuffers) {
          return _core.Promise.all(arraybuffers.map(function (arraybuffer) {
            return _this.decodeAudioData.bind(_this)(arraybuffer);
          }));
        }, function (error) {
          throw error; // TODO: better error handler
        });
      }
    },
    decodeAudioData: {

      /**
       * @function - Decode Audio Data, return a Promise
       * @private
       * @param {arraybuffer} - The arraybuffer of the loaded audio file to be decoded.
       * @returns {Promise}
       */

      value: function decodeAudioData(arraybuffer) {
        var _this = this;

        return new _core.Promise(function (resolve, reject) {
          audioContext.decodeAudioData(arraybuffer, // returned audio data array
          function (buffer) {
            if (_this.options.wrapAroundExtension === 0) resolve(buffer);else resolve(_this.__wrapAround(buffer));
          }, function (error) {
            reject(new Error("DecodeAudioData error"));
          });
        });
      }
    },
    __wrapAround: {

      /**
       * @function - WrapAround, copy the begining input buffer to the end of an output buffer
       * @private
       * @param {arraybuffer} inBuffer {arraybuffer} - The input buffer
       * @returns {arraybuffer} - The processed buffer (with frame copied from the begining to the end)
       */

      value: function __wrapAround(inBuffer) {
        var length = inBuffer.length + this.options.wrapAroundExtension * inBuffer.sampleRate;
        var outBuffer = audioContext.createBuffer(inBuffer.numberOfChannels, length, inBuffer.sampleRate);
        var arrayChData, arrayOutChData;

        for (var channel = 0; channel < inBuffer.numberOfChannels; channel++) {
          arrayChData = inBuffer.getChannelData(channel);
          arrayOutChData = outBuffer.getChannelData(channel);

          arrayOutChData.forEach(function (sample, index) {
            if (index < inBuffer.length) arrayOutChData[index] = arrayChData[index];else arrayOutChData[index] = arrayChData[index - inBuffer.length];
          });
        }

        return outBuffer;
      }
    }
  });

  return AudioBufferLoader;
})(Loader);

module.exports = AudioBufferLoader;
//# sourceMappingURL=data:application/json;base64,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USxDQUFDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEcsWUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDOztBQUVoQyxhQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxFQUFFO0FBQ3BFLHFCQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQyx3QkFBYyxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRW5ELHdCQUFjLENBQUMsT0FBTyxDQUFDLFVBQVMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUM3QyxnQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQ25FLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUNuRSxDQUFDLENBQUM7U0FDSjs7QUFFRCxlQUFPLFNBQVMsQ0FBQztPQUNsQjs7OztTQXRHRyxpQkFBaUI7R0FBUyxNQUFNOztBQTBHdEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyIsImZpbGUiOiJlczYvc3VwZXItbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIExvYWRlciA9IHJlcXVpcmUoJy4vbG9hZGVyJyk7XG5cbi8qKlxuICogR2V0cyBjYWxsZWQgaWYgYSBwYXJhbWV0ZXIgaXMgbWlzc2luZyBhbmQgdGhlIGV4cHJlc3Npb25cbiAqIHNwZWNpZnlpbmcgdGhlIGRlZmF1bHQgdmFsdWUgaXMgZXZhbHVhdGVkLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZNaXNzaW5nKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcGFyYW1ldGVyJyk7XG59XG5cbnZhciBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbi8qKlxuICogQXVkaW9CdWZmZXJMb2FkZXJcbiAqIEBjbGFzc1xuICogQGNsYXNzZGVzYyBQcm9taXNlIGJhc2VkIGltcGxlbWVudGF0aW9uIG9mIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIgZm9yIEdFVCBtZXRob2QgYW5kIGRlY29kZSBhdWRpbyBkYXRhIGZvciBhcnJheWJ1ZmZlci5cbiAqIEluaGVyaXQgZnJvbSBMb2FkZXIgY2xhc3NcbiAqL1xuXG5jbGFzcyBBdWRpb0J1ZmZlckxvYWRlciBleHRlbmRzIExvYWRlciB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RzXG4gICAqIFNldCB0aGUgcmVzcG9uc2VUeXBlIHRvICdhcnJheWJ1ZmZlcicgYW5kIGluaXRpYWxpemUgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIFwid3JhcEFyb3VuZEV4dGVuc2lvblwiOiAwXG4gICAgfTtcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgc3VwZXIodGhpcy5yZXNwb25zZVR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIE1ldGhvZCBmb3IgcHJvbWlzZSBhdWRpbyBmaWxlIGxvYWRpbmcgYW5kIGRlY29kaW5nLlxuICAgKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBmaWxlVVJMcyAtIFRoZSBVUkwocykgb2YgdGhlIGF1ZGlvIGZpbGVzIHRvIGxvYWQuIEFjY2VwdHMgYSBVUkwgcG9pbnRpbmcgdG8gdGhlIGZpbGUgbG9jYXRpb24gb3IgYW4gYXJyYXkgb2YgVVJMcy5cbiAgICogQHBhcmFtIHt7d3JhcEFyb3VuZEV4dGVuc2lvbjogbnVtYmVyfX0gW29wdGlvbnNdIC0gT2JqZWN0IHdpdGggYSB3cmFwQXJvdW5kRXh0ZW5zaW9uIGtleSB3aGljaCBzZXQgdGhlIGxlbmd0aCwgaW4gc2Vjb25kcyB0byBiZSBjb3BpZWQgZnJvbSB0aGUgYmVnaW5pbmdcbiAgICogYXQgdGhlIGVuZCBvZiB0aGUgcmV0dXJuZWQgQXVkaW9CdWZmZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkKGZpbGVVUkxzID0gdGhyb3dJZk1pc3NpbmcoKSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uIHx8IDA7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWQoZmlsZVVSTHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIExvYWQgYSBzaW5nbGUgYXVkaW8gZmlsZSwgZGVjb2RlIGl0IGluIGFuIEF1ZGlvQnVmZmVyLCByZXR1cm4gYSBQcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlVVJMIC0gVGhlIFVSTCBvZiB0aGUgYXVkaW8gZmlsZSBsb2NhdGlvbiB0byBsb2FkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGxvYWRPbmUoZmlsZVVSTCkge1xuICAgIHJldHVybiBzdXBlci5sb2FkT25lKGZpbGVVUkwpXG4gICAgICAudGhlbihcbiAgICAgICAgdGhpcy5kZWNvZGVBdWRpb0RhdGEuYmluZCh0aGlzKSxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGZ1bmN0aW9uIC0gTG9hZCBhbGwgYXVkaW8gZmlsZXMgYXQgb25jZSBpbiBhIHNpbmdsZSBhcnJheSwgZGVjb2RlIHRoZW0gaW4gYW4gYXJyYXkgb2YgQXVkaW9CdWZmZXJzLCBhbmQgcmV0dXJuIGEgUHJvbWlzZS5cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZVVSTHMgLSBUaGUgVVJMcyBhcnJheSBvZiB0aGUgYXVkaW8gZmlsZXMgdG8gbG9hZC5cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsb2FkQWxsKGZpbGVVUkxzKSB7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWRBbGwoZmlsZVVSTHMpXG4gICAgICAudGhlbihcbiAgICAgICAgKGFycmF5YnVmZmVycykgPT4ge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChhcnJheWJ1ZmZlcnMubWFwKChhcnJheWJ1ZmZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlQXVkaW9EYXRhLmJpbmQodGhpcykoYXJyYXlidWZmZXIpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFRPRE86IGJldHRlciBlcnJvciBoYW5kbGVyXG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvbiAtIERlY29kZSBBdWRpbyBEYXRhLCByZXR1cm4gYSBQcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7YXJyYXlidWZmZXJ9IC0gVGhlIGFycmF5YnVmZmVyIG9mIHRoZSBsb2FkZWQgYXVkaW8gZmlsZSB0byBiZSBkZWNvZGVkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGRlY29kZUF1ZGlvRGF0YShhcnJheWJ1ZmZlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKFxuICAgICAgICBhcnJheWJ1ZmZlciwgLy8gcmV0dXJuZWQgYXVkaW8gZGF0YSBhcnJheVxuICAgICAgICAoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53cmFwQXJvdW5kRXh0ZW5zaW9uID09PSAwKSByZXNvbHZlKGJ1ZmZlcik7XG4gICAgICAgICAgZWxzZSByZXNvbHZlKHRoaXMuX193cmFwQXJvdW5kKGJ1ZmZlcikpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiRGVjb2RlQXVkaW9EYXRhIGVycm9yXCIpKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb24gLSBXcmFwQXJvdW5kLCBjb3B5IHRoZSBiZWdpbmluZyBpbnB1dCBidWZmZXIgdG8gdGhlIGVuZCBvZiBhbiBvdXRwdXQgYnVmZmVyXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7YXJyYXlidWZmZXJ9IGluQnVmZmVyIHthcnJheWJ1ZmZlcn0gLSBUaGUgaW5wdXQgYnVmZmVyXG4gICAqIEByZXR1cm5zIHthcnJheWJ1ZmZlcn0gLSBUaGUgcHJvY2Vzc2VkIGJ1ZmZlciAod2l0aCBmcmFtZSBjb3BpZWQgZnJvbSB0aGUgYmVnaW5pbmcgdG8gdGhlIGVuZClcbiAgICovXG4gIF9fd3JhcEFyb3VuZChpbkJ1ZmZlcikge1xuICAgIHZhciBsZW5ndGggPSBpbkJ1ZmZlci5sZW5ndGggKyB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZEV4dGVuc2lvbiAqIGluQnVmZmVyLnNhbXBsZVJhdGU7XG4gICAgdmFyIG91dEJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoaW5CdWZmZXIubnVtYmVyT2ZDaGFubmVscywgbGVuZ3RoLCBpbkJ1ZmZlci5zYW1wbGVSYXRlKTtcbiAgICB2YXIgYXJyYXlDaERhdGEsIGFycmF5T3V0Q2hEYXRhO1xuXG4gICAgZm9yICh2YXIgY2hhbm5lbCA9IDA7IGNoYW5uZWwgPCBpbkJ1ZmZlci5udW1iZXJPZkNoYW5uZWxzOyBjaGFubmVsKyspIHtcbiAgICAgIGFycmF5Q2hEYXRhID0gaW5CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbCk7XG4gICAgICBhcnJheU91dENoRGF0YSA9IG91dEJ1ZmZlci5nZXRDaGFubmVsRGF0YShjaGFubmVsKTtcblxuICAgICAgYXJyYXlPdXRDaERhdGEuZm9yRWFjaChmdW5jdGlvbihzYW1wbGUsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IGluQnVmZmVyLmxlbmd0aCkgYXJyYXlPdXRDaERhdGFbaW5kZXhdID0gYXJyYXlDaERhdGFbaW5kZXhdO1xuICAgICAgICBlbHNlIGFycmF5T3V0Q2hEYXRhW2luZGV4XSA9IGFycmF5Q2hEYXRhW2luZGV4IC0gaW5CdWZmZXIubGVuZ3RoXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRCdWZmZXI7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvQnVmZmVyTG9hZGVyOyJdfQ==