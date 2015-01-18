'use strict';

var AudioPlayer = require('./AudioPlayer'),
  animations = require('./animations');

/**
 * @param {HTMLElement} rootEl
 * @constructor
 */
function App(rootEl) {
  this.el_ = rootEl;

  // parse URL-Params:
  //  - audioFile
  //  - animationType
  this.audioPlayer_ = new AudioPlayer(this.el_);
  this.animation_ = new animations.Amp(this.audioPlayer_, {
    loadingImage: '/images/amp-loop/00000.png',
    filenamePattern: '/images/amp-loop/%05d.png',
    numImages: 79,
    numThreads: 4
  });

  this.el_.insertBefore(this.audioPlayer_.rootEl, this.el_.firstChild);
}

module.exports = App;
