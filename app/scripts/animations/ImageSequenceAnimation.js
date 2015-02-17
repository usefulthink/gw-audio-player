var ImageLoader = require('./ImageLoader');

/**
 * @param {AudioPlayer} audioPlayer
 * @param {Object} options
 * @constructor
 */
function ImageSequenceAnimation(audioPlayer, options) {
  /**
   * @type {AudioPlayer}
   * @private
   */
  this.audioPlayer_ = audioPlayer;
  /**
   * @type {Object}
   * @private
   */
  this.options_ = options;

  /**
   * @type {Array.<Image>}
   * @private
   */
  this.images_ = [];

  /**
   * @type {ImageLoader}
   * @private
   */
  this.imageLoader_ = null;

  /**
   * @type {HTMLElement}
   * @private
   */
  this.$progressBar_ = null;

  /**
   * @type {HTMLElement}
   * @private
   */
  this.$animationContainer_ =
      audioPlayer.rootEl.querySelector('.animation-container');

  /**
   * @type {HTMLElement}
   * @private
   */
  this.$img_ = this.$animationContainer_.querySelector('.animation');

  /**
   * @type {boolean}
   * @private
   */
  this.imagesLoaded_ = false;

  /**
   * current image-index
   * @type {number}
   * @private
   */
  this.imageIndex_ = 0;

  /**
   * time (Date.now()) of the last rendered frame
   * @type {number}
   * @private
   */
  this.lastFrameTime_ = 0;

  this.initAudioEvents_();
  this.loadImages_(options);
}

/**
 * initialize the imageloader and start loading files.
 *
 * @private
 */
ImageSequenceAnimation.prototype.loadImages_ = function () {
  // FIXME: extract to some common load-progress-monitor
  this.$progressBar_ = document.querySelector('.img-loader-progress .progress-bar-progress');

  this.imageLoader_ = new ImageLoader(
    this.options_.filenamePattern,
    this.options_.numImages
  );

  this.imageLoader_.on('progress', function (img, numLoaded, numTotal) {
    this.$progressBar_.style.transform = 'translateX(' + (-100 + numLoaded / numTotal * 100) + '%)';
    this.images_.push(img);
  }.bind(this));

  this.imageLoader_.on('ready', function () {
    this.$progressBar_.style.transform = 'translateX(0)';
    this.$progressBar_.style.opacity = 0;

    this.imagesLoaded_ = true;
    this.tick_();
  }.bind(this));

  this.$img_.src = this.imageLoader_.getFilename(0);

  this.imageLoader_.start(6);
};

/**
 * initialize audio-events from the audio-player
 *
 * @private
 */
ImageSequenceAnimation.prototype.initAudioEvents_ = function() {
  this.audioEl_ = this.audioPlayer_.getAudioEl();

  this.audioEl_.addEventListener('playing', function() {
    this.isPlaying_ = true;
    this.tick_();
  }.bind(this), false);

  this.audioEl_.addEventListener('pause', function() {
    this.isPlaying_ = false;
  }.bind(this), false);
};

/**
 * main animation-loop
 *
 * @private
 */
ImageSequenceAnimation.prototype.tick_ = function() {
  if(!this.imagesLoaded_ || !this.isPlaying_) { return; }

  window.requestAnimationFrame(
    this.tick_.bind(this),
    this.$animationContainer_
  );

  var now = Date.now(),
    dt = now - this.lastFrameTime_;

  if(dt > 40) {
    this.imageIndex_ = (this.imageIndex_ + 1) % this.images_.length;
    this.$img_.src = this.images_[this.imageIndex_].src;

    this.lastFrameTime_ = now;
  }
};


module.exports = ImageSequenceAnimation;
