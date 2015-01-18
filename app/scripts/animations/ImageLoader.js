var EventEmitter2 = require('eventemitter2').EventEmitter2;

/**
 * @param {String} filenamePattern
 * @param {Number} numImages
 * @extends EventEmitter2
 * @constructor
 */
function ImageLoader(filenamePattern, numImages) {
  EventEmitter2.call(this);

  /**
   * pattern for image filenames, should contain a printf-like
   * `%05d`-placeholder that will be replaced with the filename.
   *
   * @type {String}
   * @private
   */
  this.filenamePattern_ = filenamePattern;

  /**
   * number of images to be loaded
   * @type {Number}
   * @private
   */
  this.numImages_ = numImages;

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
   * @type {Array.<String>}
   * @private
   */
  this.remainingImageUrls_ = [];

  /**
   * loaded images
   *
   * @type {Array}
   * @private
   */
  this.images_ = [];

  for(var i=0; i<this.numImages_; i++) {
    this.remainingImageUrls_.push(this.getFilename(i));
  }
}

ImageLoader.prototype = Object.create(EventEmitter2.prototype);
ImageLoader.prototype.constructor = ImageLoader;

var __ = ImageLoader.prototype;

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
 * @param {Number} idx
 * @returns {String}
 */
__.getFilename = function(idx) {
  return this.filenamePattern_.replace('%05d', (idx + 1e5).toString().slice(1))
};


/**
 * take next image from the queue and start loading
 *
 * @private
 */
__.loadNextImage_ = function() {
  var file;

  // no images left...
  file = this.remainingImageUrls_.shift();
  if(!file) { return; }

  this.numLoading_++;

  (function(file) {
    var img = new Image();

    img.onload = function() {
      this.numLoading_--;
      this.imageLoadingComplete_(img);
      this.loadNextImage_();

      this.images_.push(img);
    }.bind(this);

    img.onerror = img.onabort = function() {
      console.error('problem!');
      this.numLoading_--;
      this.imageLoadingComplete_(img);
      this.loadNextImage_();

      this.images_.push(img);
    }.bind(this);

    img.src = file;
  }.call(this, file));
};

/**
 * called when an image completes loading
 *
 * @param {Image} img
 * @private
 */
__.imageLoadingComplete_ = function(img) {
  var numLoaded = this.numImages_ - this.remainingImageUrls_.length - this.numLoading_;

  if(numLoaded === this.numImages_) {
    this.emit('ready');
  } else {
    this.emit('progress', img, numLoaded, this.numImages_);
  }
};

module.exports = ImageLoader;
