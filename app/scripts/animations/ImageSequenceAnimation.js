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
   *
   */
  this.animationQueue_ = [];

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
ImageSequenceAnimation.prototype.loadImages_ = function (options) {
  this.imageLoader_ = new ImageLoader();

  if(options.intro) {
    this.imageLoader_.add(
      'intro',
      options.intro.filenamePattern,
      options.intro.numImages
    );
  }

  this.imageLoader_.add(
    'loop',
    options.filenamePattern,
    options.numImages
  );

  if(options.outro) {
    this.imageLoader_.add(
      'outro',
      options.outro.filenamePattern,
      options.outro.numImages
    );
  }


  // FIXME: extract to some common load-progress-monitor
  this.$progressBar_ = document.querySelector('.img-loader-progress .progress-bar-progress');

  this.imageLoader_.on('progress', function (img, numLoaded, numTotal) {
    this.$progressBar_.style.transform = 'translateX(' + (-100 + numLoaded / numTotal * 100) + '%)';
  }.bind(this));

  this.imageLoader_.on('ready', function (sequences) {
    this.$progressBar_.style.transform = 'translateX(0)';
    this.$progressBar_.style.opacity = 0;

    this.imagesLoaded_ = true;
    this.sequences_ = sequences;
  }.bind(this));

  if(options.intro) {
    this.$img_.src = this.imageLoader_.getFilename('intro', 0);
  } else {
    this.$img_.src = this.imageLoader_.getFilename('loop', 0);
  }
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
    if(this.animationQueue_.length === 0) {
      this.scheduleIntro();
    }

    this.audioIsPlaying_ = true;
    this.tick_();
  }.bind(this), false);

  this.audioEl_.addEventListener('pause', function() {
    this.scheduleOutro();
    this.audioIsPlaying_ = false;
  }.bind(this), false);
};

ImageSequenceAnimation.prototype.scheduleIntro = function() {
  if(this.sequences_.intro) {
    this.animationQueue_.push.apply(
        this.animationQueue_, this.sequences_.intro.images.slice(0));
  }
};

ImageSequenceAnimation.prototype.scheduleOutro = function() {
  if(this.sequences_.outro) {
    this.animationQueue_.push.apply(
        this.animationQueue_, this.sequences_.outro.images.slice(0));
  }
};

ImageSequenceAnimation.prototype.scheduleLoop = function() {
  this.animationQueue_.push.apply(
      this.animationQueue_, this.sequences_.loop.images.slice(0));
};

/**
 * main animation-loop
 *
 * @private
 */
ImageSequenceAnimation.prototype.tick_ = function() {
  window.requestAnimationFrame(
    this.tick_.bind(this),
    this.$animationContainer_
  );

  if(!this.imagesLoaded_) { return; }

  if(this.animationQueue_.length === 0) {
    // if the queue is empty and audio isn't playing we stop.
    if(!this.audioIsPlaying_) { return; }

    // otherwise we reschedule the loop-part
    this.scheduleLoop();
  }

  var now = Date.now(),
    dt = now - this.lastFrameTime_;

  if(dt > 1000/30) {
    var next = this.animationQueue_.shift();

    this.$img_.src = next.src;
    this.lastFrameTime_ = now;
  }
};


module.exports = ImageSequenceAnimation;
