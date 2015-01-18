'use strict';
var domUtils = require('./dom-utils');

var playerTemplate = require('../jade/audio-player.jade');

/**
 * audioPlayer is responsible for
 *  - handling audio-playback and the audio-player GUI.
 *  - Will forward events from the audio-element (state / progress)
 *
 * Implementation:
 *  - HTML5-Audio with WebAudio (AudioElementSourceNode) integration
 *  -
 *
 * GUI-Elements:
 *  - Animation-Container (seperately implemented)
 *  - simple element for Progress / Seek
 *
 * @param {HTMLElement} rootEl
 * @constructor
 */
function AudioPlayer() {
  /**
   * @type {HTMLElement}
   */
  this.rootEl = null;

  /**
   * @type {HTMLElement}
   * @private
   */
  this.audioEl_ = null;

  this.audioSrc_ = '/audio/test.mp3';
  this.title_ = 'I\'m a maschine';
  this.metadata_ = [
    { label: 'Artist', value: 'Glass Lux' },
    { label: 'Album', value: 'Glass Lux – Singles' },
    { label: 'Source', value: 'freemusicarchive.org'},
    { label: 'Why?', value: 'Just a random Creative-Commons Track' }
  ];

  this.initDomElements_();
  this.bindEvents_();

  window.ap = this;
}

var __ = AudioPlayer.prototype;

__.play = function() {
  this.audioEl_.play();
};

__.pause = function() {
  this.audioEl_.pause();
};

__.toggle = function() {
  if(this.audioEl_.paused) {
    this.audioEl_.play();
  } else {
    this.audioEl_.pause();
  }
};

__.getAudioEl = function() {
  return this.audioEl_;
};


/**
 * @param {Number} currentTime
 * @param {Number} duration
 * @private
 */
__.updateProgress_ = function(currentTime, duration) {
  var pct = -100+(currentTime/duration * 100);

  this.progressEl_.style.transform = 'translateX('+pct+'%)';
};

/**
 * @private
 */
__.initDomElements_ = function() {
  var root = domUtils.createFragment(playerTemplate({
    title: this.title_,
    metadata: this.metadata_
  }));

  this.progressBarEl_ = root.querySelector('.progress-bar');
  this.progressEl_ = root.querySelector('.progress-bar-progress');

  this.audioEl_ = new Audio();
  this.audioEl_.src = this.audioSrc_;

  root.appendChild(this.audioEl_);

  this.rootEl = root;
};

/**
 * @private
 */
__.bindEvents_ = function() {
  this.audioEl_.addEventListener(
    'timeupdate', this.onTimeUpdate_.bind(this), false);
  this.audioEl_.addEventListener(
    'loadedmetadata', this.onTimeUpdate_.bind(this), false);
  this.progressBarEl_.addEventListener(
    'click', this.onProgressBarClick_.bind(this), false);

  this.rootEl.addEventListener('click', this.toggle.bind(this), false);
};

/**
 * @param {Event} ev
 * @private
 */
__.onTimeUpdate_ = function(ev) {
  this.updateProgress_(this.audioEl_.currentTime, this.audioEl_.duration);
};

/**
 * @param {Event} ev
 * @private
 */
__.onProgressBarClick_ = function(ev) {
  var boundingBox = this.progressBarEl_.getBoundingClientRect(),
    x = ev.clientX - boundingBox.left,
    xRel = x / boundingBox.width;

  if(this.audioEl_.readyState > 0) {
    this.audioEl_.currentTime = xRel * this.audioEl_.duration;
  }

  ev.stopPropagation();
};

module.exports = AudioPlayer;
