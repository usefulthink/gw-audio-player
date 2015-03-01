'use strict';

var AudioPlayer = require('./AudioPlayer'),
  animations = require('./animations'),
  config = require('./config.json');

/**
 * @param {HTMLElement} rootEl
 * @constructor
 */
function App(rootEl) {
  this.el_ = rootEl;

  var options = null;
  try {
    options = JSON.parse(decodeURIComponent(document.location.hash.slice(1)))
  } catch(ex) {
    alert('fehlerhafte URL. Bitte embed-code überprüfen.');
    return;
  }

  var animationConfigs = config.animations;

  // parse URL-Params:
  //  - audioFile
  //  - animationType

  this.audioPlayer_ = new AudioPlayer(options);
  this.animation_ = new animations.ImageSequence(
    this.audioPlayer_, animationConfigs[options.theme]
  );

  this.el_.insertBefore(this.audioPlayer_.rootEl, this.el_.firstChild);
}

module.exports = App;
