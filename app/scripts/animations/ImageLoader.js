var EventEmitter = require('node-event-emitter');

/**
 * @param {String} filenamePattern
 * @param {Number} numImages
 * @extends EventEmitter
 * @constructor
 */
function ImageLoader() {
  EventEmitter.call(this);

  /**
   * @type {{}}
   * @private
   */
  this.sequences_ = {};

  /**
   * number of images currently being loaded
   *
   * @type {number}
   * @private
   */
  this.numLoading_ = 0;

  /**
   * URLs left to be loaded.
   *
   * @type {Array.<object>}
   * @private
   */
  this.remainingImages_ = [];

  this.numImages_ = 0;
}

ImageLoader.prototype = Object.create(EventEmitter.prototype);
ImageLoader.prototype.constructor = ImageLoader;

var __ = ImageLoader.prototype;


__.add = function(id, urlPattern, numImages) {
  this.sequences_[id] = {
    urlPattern: urlPattern,
    numImages: numImages,
    images: []
  };

  for(var i=0; i<numImages; i++) {
    this.remainingImages_.push({
      sequenceId: id,
      index: i,
      url: this.getFilename(id, i)
    });
  }

  this.numImages_ += numImages;
};


/**
 * starts loading images via `numConnections` parallel connections
 *
 * @param {Number} numConnections
 */
__.start = function(numConnections) {
  while(numConnections--) {
    this.loadNextImage_();
  }
};

/**
 * creates image-filenames from the filename-pattern
 *
 * @param id
 * @param {Number} idx
 * @returns {String}
 */
__.getFilename = function(id, idx) {
  var pattern = this.sequences_[id].urlPattern;

  return pattern.replace('%05d', (idx + 1e5).toString().slice(1))
};


/**
 * take next image from the queue and start loading
 *
 * @private
 */
__.loadNextImage_ = function() {
  if(this.remainingImages_.length === 0) { return; }

  var data = this.remainingImages_.shift();

  this.numLoading_++;

  (function(sequenceId, url, idx) {
    var img = new Image();

    img.onload = function() {
      this.numLoading_--;
      this.sequences_[sequenceId].images[idx] = img;
      this.imageLoadingComplete_(img);

      this.loadNextImage_();
    }.bind(this);

    img.onerror = img.onabort = function() {
      console.error('problem!');
      this.numLoading_--;
      this.sequences_[sequenceId].images[idx] = img;
      this.imageLoadingComplete_(img);
      this.loadNextImage_();
    }.bind(this);

    img.src = url;
  }.call(this, data.sequenceId, data.url, data.index));
};

/**
 * called when an image completes loading
 *
 * @param {Image} img
 * @private
 */
__.imageLoadingComplete_ = function(img) {
  var numLoaded = this.numImages_ - this.remainingImages_.length - this.numLoading_;

  if(numLoaded === this.numImages_) {
    this.emit('ready', this.sequences_);
  } else {
    this.emit('progress', img, numLoaded, this.numImages_);
  }
};

module.exports = ImageLoader;
