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
  var audioPlayerOpts = {
    src: 'audio/test.mp3',
    title: 'I\'m a maschine',
    metadata: [
      { label: 'Artist', value: 'Glass Lux' },
      { label: 'Album', value: 'Glass Lux – Singles' },
      { label: 'Source', value: 'freemusicarchive.org'},
      { label: 'Why?', value: 'Just a random Creative-Commons Track' }
    ]
  };

  this.audioPlayer_ = new AudioPlayer(audioPlayerOpts);
  this.animation_ = new animations.Amp(this.audioPlayer_, {
    filenamePattern: 'images/amp-loop/%05d.png',
    numImages: 79,
    numThreads: 4
  });

  this.el_.insertBefore(this.audioPlayer_.rootEl, this.el_.firstChild);
}

module.exports = App;
