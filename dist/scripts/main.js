!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=a("jade/lib/runtime.js");b.exports=function(b){return b&&(b.require=a),function(a){var b=[{lineno:1,filename:"/Users/martins/local/src/allerzeiten/german-wahnsinn/app/jade/audio-player.jade"}];try{var d,e=[],f=a||{};return function(a,b){e.push('\n<div class="main">'),e.push('\n  <div class="animation-container">'),e.push('<img class="animation"/>'),e.push("</div>"),e.push('\n  <div class="audio-info">'),e.push('\n    <div class="progress-bar">'),e.push('\n      <div class="progress-bar-progress">'),e.push("</div>"),e.push("\n    </div>"),e.push('\n    <div class="title">'+c.escape(null==(d=b)?"":d)),e.push("</div>"),e.push('\n    <ul class="metadata">'),function(){var b=a;if("number"==typeof b.length)for(var f=0,g=b.length;g>f;f++){var h=b[f];e.push("\n      <li>"),e.push("<strong>"+c.escape(null==(d=h.label)?"":d)),e.push("</strong>"),e.push(c.escape(null==(d=h.value)?"":d)),e.push("\n      </li>")}else{var g=0;for(var f in b){g++;var h=b[f];e.push("\n      <li>"),e.push("<strong>"+c.escape(null==(d=h.label)?"":d)),e.push("</strong>"),e.push(c.escape(null==(d=h.value)?"":d)),e.push("\n      </li>")}}}.call(this),e.push("\n    </ul>"),e.push("\n  </div>"),e.push("\n</div>")}.call(this,"metadata"in f?f.metadata:"undefined"!=typeof metadata?metadata:void 0,"title"in f?f.title:"undefined"!=typeof title?title:void 0,"undefined"in f?f.undefined:void 0),e.join("")}catch(g){c.rethrow(g,b[0].filename,b[0].lineno,".main\n  .animation-container\n    img.animation\n\n  .audio-info\n    .progress-bar\n      .progress-bar-progress\n\n    .title= title\n    ul.metadata\n      each m in metadata\n        li\n          strong= m.label\n          = m.value\n")}}(b)}},{"jade/lib/runtime.js":12}],2:[function(a,b){"use strict";function c(a){this.rootEl=null,this.audioEl_=null,this.audioSrc_=a.file,this.title_=a.title,this.metadata_=a.meta,this.initDomElements_(),this.bindEvents_(),window.ap=this}var d=a("./dom-utils"),e=a("./vendor-prefix.js"),f=a("../jade/audio-player.jade"),g=c.prototype;g.play=function(){this.audioEl_.play()},g.pause=function(){this.audioEl_.pause()},g.toggle=function(){this.audioEl_.paused?this.audioEl_.play():this.audioEl_.pause()},g.getAudioEl=function(){return this.audioEl_},g.updateProgress_=function(a,b){var c=-100+a/b*100,d=this.progressEl_.style;d.transform=d[e+"Transform"]="translateX("+c+"%)"},g.initDomElements_=function(){var a=d.createFragment(f({title:this.title_,metadata:this.metadata_}));this.progressBarEl_=a.querySelector(".progress-bar"),this.progressEl_=a.querySelector(".progress-bar-progress"),this.audioEl_=new Audio,this.audioEl_.src=this.audioSrc_,a.appendChild(this.audioEl_),this.rootEl=a},g.bindEvents_=function(){this.audioEl_.addEventListener("timeupdate",this.onTimeUpdate_.bind(this),!1),this.audioEl_.addEventListener("loadedmetadata",this.onTimeUpdate_.bind(this),!1),this.progressBarEl_.addEventListener("click",this.onProgressBarClick_.bind(this),!1),this.rootEl.addEventListener("click",this.toggle.bind(this),!1)},g.onTimeUpdate_=function(){this.updateProgress_(this.audioEl_.currentTime,this.audioEl_.duration)},g.onProgressBarClick_=function(a){var b=this.progressBarEl_.getBoundingClientRect(),c=a.clientX-b.left,d=c/b.width;this.audioEl_.readyState>0&&(this.audioEl_.currentTime=d*this.audioEl_.duration),a.stopPropagation()},b.exports=c},{"../jade/audio-player.jade":1,"./dom-utils":8,"./vendor-prefix.js":10}],3:[function(a,b){function c(){d.call(this),this.sequences_={},this.numLoading_=0,this.remainingImages_=[],this.numImages_=0}var d=a("node-event-emitter");c.prototype=Object.create(d.prototype),c.prototype.constructor=c;var e=c.prototype;e.add=function(a,b,c){this.sequences_[a]={urlPattern:b,numImages:c,images:[]};for(var d=0;c>d;d++)this.remainingImages_.push({sequenceId:a,index:d,url:this.getFilename(a,d)});this.numImages_+=c},e.start=function(a){for(;a--;)this.loadNextImage_()},e.getFilename=function(a,b){var c=this.sequences_[a].urlPattern;return c.replace("%05d",(b+1e5).toString().slice(1))},e.loadNextImage_=function(){if(0!==this.remainingImages_.length){var a=this.remainingImages_.shift();this.numLoading_++,function(a,b,c){var d=new Image;d.onload=function(){this.numLoading_--,this.sequences_[a].images[c]=d,this.imageLoadingComplete_(d),this.loadNextImage_()}.bind(this),d.onerror=d.onabort=function(){console.error("problem!"),this.numLoading_--,this.sequences_[a].images[c]=d,this.imageLoadingComplete_(d),this.loadNextImage_()}.bind(this),d.src=b}.call(this,a.sequenceId,a.url,a.index)}},e.imageLoadingComplete_=function(a){var b=this.numImages_-this.remainingImages_.length-this.numLoading_;b===this.numImages_?this.emit("ready",this.sequences_):this.emit("progress",a,b,this.numImages_)},b.exports=c},{"node-event-emitter":13}],4:[function(a,b){function c(a,b){this.audioPlayer_=a,this.options_=b,this.imageLoader_=null,this.$progressBar_=null,this.$animationContainer_=a.rootEl.querySelector(".animation-container"),this.$img_=this.$animationContainer_.querySelector(".animation"),this.imagesLoaded_=!1,this.imageIndex_=0,this.animationQueue_=[],this.lastFrameTime_=0,this.initAudioEvents_(),this.loadImages_(b)}var d=a("./ImageLoader");c.prototype.loadImages_=function(a){this.imageLoader_=new d,a.intro&&this.imageLoader_.add("intro",a.intro.filenamePattern,a.intro.numImages),this.imageLoader_.add("loop",a.filenamePattern,a.numImages),a.outro&&this.imageLoader_.add("outro",a.outro.filenamePattern,a.outro.numImages),this.$progressBar_=document.querySelector(".img-loader-progress .progress-bar-progress"),this.imageLoader_.on("progress",function(a,b,c){this.$progressBar_.style.transform="translateX("+(-100+b/c*100)+"%)"}.bind(this)),this.imageLoader_.on("ready",function(a){this.$progressBar_.style.transform="translateX(0)",this.$progressBar_.style.opacity=0,this.imagesLoaded_=!0,this.sequences_=a}.bind(this)),this.$img_.src=a.intro?this.imageLoader_.getFilename("intro",0):this.imageLoader_.getFilename("loop",0),this.imageLoader_.start(6)},c.prototype.initAudioEvents_=function(){this.audioEl_=this.audioPlayer_.getAudioEl(),this.audioEl_.addEventListener("playing",function(){0===this.animationQueue_.length&&this.scheduleIntro(),this.audioIsPlaying_=!0,this.tick_()}.bind(this),!1),this.audioEl_.addEventListener("pause",function(){this.scheduleOutro(),this.audioIsPlaying_=!1}.bind(this),!1)},c.prototype.scheduleIntro=function(){this.sequences_.intro&&this.animationQueue_.push.apply(this.animationQueue_,this.sequences_.intro.images.slice(0))},c.prototype.scheduleOutro=function(){this.sequences_.outro&&this.animationQueue_.push.apply(this.animationQueue_,this.sequences_.outro.images.slice(0))},c.prototype.scheduleLoop=function(){this.animationQueue_.push.apply(this.animationQueue_,this.sequences_.loop.images.slice(0))},c.prototype.tick_=function(){if(window.requestAnimationFrame(this.tick_.bind(this),this.$animationContainer_),this.imagesLoaded_){if(0===this.animationQueue_.length){if(!this.audioIsPlaying_)return;this.scheduleLoop()}var a=Date.now(),b=a-this.lastFrameTime_;if(b>1e3/30){var c=this.animationQueue_.shift();this.$img_.src=c.src,this.lastFrameTime_=a}}},b.exports=c},{"./ImageLoader":3}],5:[function(a,b){b.exports={ImageSequence:a("./ImageSequenceAnimation")}},{"./ImageSequenceAnimation":4}],6:[function(a,b){"use strict";function c(a){this.el_=a;var b=null;try{b=JSON.parse(decodeURIComponent(document.location.hash.slice(1)))}catch(c){return void alert("fehlerhafte URL. Bitte embed-code überprüfen.")}var g=f.animations;this.audioPlayer_=new d(b),this.animation_=new e.ImageSequence(this.audioPlayer_,g[b.theme]),this.el_.insertBefore(this.audioPlayer_.rootEl,this.el_.firstChild)}var d=a("./AudioPlayer"),e=a("./animations"),f=a("./config.json");b.exports=c},{"./AudioPlayer":2,"./animations":5,"./config.json":7}],7:[function(a,b){b.exports={playerUrl:"http://usefulthink.github.io/gw-audio-player/dist/",formUrl:"http://usefulthink.github.io/gw-audio-player/dist/form.html",animations:{amp:{filenamePattern:"images/amp-loop/%05d.png",numImages:79},fish:{filenamePattern:"images/fish-loop/%05d.png",numImages:200,intro:{filenamePattern:"images/fish-start/%05d.png",numImages:29},outro:{filenamePattern:"images/fish-end/%05d.png",numImages:29}},mariachi:{filenamePattern:"images/mariachi-loop/%05d.png",numImages:80,intro:{filenamePattern:"images/mariachi-start/%05d.png",numImages:25},outro:{filenamePattern:"images/mariachi-end/%05d.png",numImages:80}},mirrorball:{filenamePattern:"images/mirrorball-loop/%05d.png",numImages:125,intro:{filenamePattern:"images/mirrorball-start/%05d.png",numImages:37},outro:{filenamePattern:"images/mirrorball-end/%05d.png",numImages:37}},turntable:{filenamePattern:"images/turntable-loop/%05d.png",numImages:117,intro:{filenamePattern:"images/turntable-start/%05d.png",numImages:24},outro:{filenamePattern:"images/turntable-end/%05d.png",numImages:86}},walkman:{filenamePattern:"images/walkman-loop/%05d.png",numImages:18,intro:{filenamePattern:"images/walkman-start/%05d.png",numImages:30},outro:{filenamePattern:"images/walkman-end/%05d.png",numImages:38}}}}},{}],8:[function(a,b){"use strict";function c(a,b){f[a]=b}function d(a,b){var c=f[a],d=document.createElement("div");return d.innerHTML="<br>"+c(b),d.lastElementChild}function e(a){var b=document.createElement("div");return b.innerHTML="<br>"+a,b.lastElementChild}var f={};b.exports={createFragment:e,registerTemplate:c,renderTemplate:d}},{}],9:[function(a){"use strict";{var b=a("./app.js");new b(document.body)}},{"./app.js":6}],10:[function(a,b){b.exports=function(){var a=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,b=document.getElementsByTagName("script")[0].style;for(var c in b)if(a.test(c))return c.match(a)[0];return"WebkitOpacity"in b?"Webkit":"KhtmlOpacity"in b?"Khtml":""}()},{}],11:[function(){},{}],12:[function(a,b,c){"use strict";function d(a){return null!=a&&""!==a}function e(a){return(Array.isArray(a)?a.map(e):a&&"object"==typeof a?Object.keys(a).filter(function(b){return a[b]}):[a]).filter(d).join(" ")}c.merge=function f(a,b){if(1===arguments.length){for(var c=a[0],e=1;e<a.length;e++)c=f(c,a[e]);return c}var g=a["class"],h=b["class"];(g||h)&&(g=g||[],h=h||[],Array.isArray(g)||(g=[g]),Array.isArray(h)||(h=[h]),a["class"]=g.concat(h).filter(d));for(var i in b)"class"!=i&&(a[i]=b[i]);return a},c.joinClasses=e,c.cls=function(a,b){for(var d=[],f=0;f<a.length;f++)d.push(b&&b[f]?c.escape(e([a[f]])):e(a[f]));var g=e(d);return g.length?' class="'+g+'"':""},c.style=function(a){return a&&"object"==typeof a?Object.keys(a).map(function(b){return b+":"+a[b]}).join(";"):a},c.attr=function(a,b,d,e){return"style"===a&&(b=c.style(b)),"boolean"==typeof b||null==b?b?" "+(e?a:a+'="'+a+'"'):"":0==a.indexOf("data")&&"string"!=typeof b?(-1!==JSON.stringify(b).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),b&&"function"==typeof b.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+a+"='"+JSON.stringify(b).replace(/'/g,"&apos;")+"'"):d?(b&&"function"==typeof b.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+a+'="'+c.escape(b)+'"'):(b&&"function"==typeof b.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+a+'="'+b+'"')},c.attrs=function(a,b){var d=[],f=Object.keys(a);if(f.length)for(var g=0;g<f.length;++g){var h=f[g],i=a[h];"class"==h?(i=e(i))&&d.push(" "+h+'="'+i+'"'):d.push(c.attr(h,i,!1,b))}return d.join("")},c.escape=function(a){var b=String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return b===""+a?a:b},c.rethrow=function g(b,c,d,e){if(!(b instanceof Error))throw b;if(!("undefined"==typeof window&&c||e))throw b.message+=" on line "+d,b;try{e=e||a("fs").readFileSync(c,"utf8")}catch(f){g(b,null,d)}var h=3,i=e.split("\n"),j=Math.max(d-h,0),k=Math.min(i.length,d+h),h=i.slice(j,k).map(function(a,b){var c=b+j+1;return(c==d?"  > ":"    ")+c+"| "+a}).join("\n");throw b.path=c,b.message=(c||"Jade")+":"+d+"\n"+h+"\n\n"+b.message,b}},{fs:11}],13:[function(a,b){function c(){c.init.call(this)}var d={};d.isObject=function(a){return"object"==typeof a&&null!==a},d.isNumber=function(a){return"number"==typeof a},d.isUndefined=function(a){return void 0===a},d.isFunction=function(a){return"function"==typeof a},b.exports=c,c.EventEmitter=c,c.prototype._events=void 0,c.prototype._maxListeners=void 0,c.defaultMaxListeners=10,c.init=function(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(a){if(!d.isNumber(a)||0>a||isNaN(a))throw TypeError("n must be a positive number");return this._maxListeners=a,this},c.prototype.emit=function(a){var b,c,e,f,g,h;if(this._events||(this._events={}),"error"===a&&!this._events.error)throw b=arguments[1],b instanceof Error?b:Error('Uncaught, unspecified "error" event.');if(c=this._events[a],d.isUndefined(c))return!1;if(d.isFunction(c))switch(arguments.length){case 1:c.call(this);break;case 2:c.call(this,arguments[1]);break;case 3:c.call(this,arguments[1],arguments[2]);break;default:for(e=arguments.length,f=new Array(e-1),g=1;e>g;g++)f[g-1]=arguments[g];c.apply(this,f)}else if(d.isObject(c)){for(e=arguments.length,f=new Array(e-1),g=1;e>g;g++)f[g-1]=arguments[g];for(h=c.slice(),e=h.length,g=0;e>g;g++)h[g].apply(this,f)}return!0},c.prototype.addListener=function(a,b){var e;if(!d.isFunction(b))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",a,d.isFunction(b.listener)?b.listener:b),this._events[a]?d.isObject(this._events[a])?this._events[a].push(b):this._events[a]=[this._events[a],b]:this._events[a]=b,d.isObject(this._events[a])&&!this._events[a].warned){var e;e=d.isUndefined(this._maxListeners)?c.defaultMaxListeners:this._maxListeners,e&&e>0&&this._events[a].length>e&&(this._events[a].warned=!0,d.isFunction(console.error)&&console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[a].length),d.isFunction(console.trace)&&console.trace())}return this},c.prototype.on=c.prototype.addListener,c.prototype.once=function(a,b){function c(){this.removeListener(a,c),e||(e=!0,b.apply(this,arguments))}if(!d.isFunction(b))throw TypeError("listener must be a function");var e=!1;return c.listener=b,this.on(a,c),this},c.prototype.removeListener=function(a,b){var c,e,f,g;if(!d.isFunction(b))throw TypeError("listener must be a function");if(!this._events||!this._events[a])return this;if(c=this._events[a],f=c.length,e=-1,c===b||d.isFunction(c.listener)&&c.listener===b)delete this._events[a],this._events.removeListener&&this.emit("removeListener",a,b);else if(d.isObject(c)){for(g=f;g-->0;)if(c[g]===b||c[g].listener&&c[g].listener===b){e=g;break}if(0>e)return this;1===c.length?(c.length=0,delete this._events[a]):c.splice(e,1),this._events.removeListener&&this.emit("removeListener",a,b)}return this},c.prototype.removeAllListeners=function(a){var b,c;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[a]&&delete this._events[a],this;if(0===arguments.length){for(b in this._events)"removeListener"!==b&&this.removeAllListeners(b);return this.removeAllListeners("removeListener"),this._events={},this}if(c=this._events[a],d.isFunction(c))this.removeListener(a,c);else if(Array.isArray(c))for(;c.length;)this.removeListener(a,c[c.length-1]);return delete this._events[a],this},c.prototype.listeners=function(a){var b;return b=this._events&&this._events[a]?d.isFunction(this._events[a])?[this._events[a]]:this._events[a].slice():[]},c.listenerCount=function(a,b){var c;return c=a._events&&a._events[b]?d.isFunction(a._events[b])?1:a._events[b].length:0}},{}]},{},[9]);