!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=a("jade/lib/runtime.js");b.exports=function(b){return b&&(b.require=a),function(a){var b=[{lineno:1,filename:"/Users/martins/local/src/german-wahnsinn/app/jade/audio-player.jade"}];try{var d,e=[],f=a||{};return function(a,b){e.push('\n<div class="main">'),e.push('\n  <div class="animation-container">'),e.push('<img class="animation"/>'),e.push("</div>"),e.push('\n  <div class="audio-info">'),e.push('\n    <div class="progress-bar">'),e.push('\n      <div class="progress-bar-progress">'),e.push("</div>"),e.push("\n    </div>"),e.push('\n    <div class="title">'+c.escape(null==(d=b)?"":d)),e.push("</div>"),e.push('\n    <ul class="metadata">'),function(){var b=a;if("number"==typeof b.length)for(var f=0,g=b.length;g>f;f++){var h=b[f];e.push("\n      <li>"),e.push("<strong>"+c.escape(null==(d=h.label)?"":d)),e.push("</strong>"),e.push(c.escape(null==(d=h.value)?"":d)),e.push("\n      </li>")}else{var g=0;for(var f in b){g++;var h=b[f];e.push("\n      <li>"),e.push("<strong>"+c.escape(null==(d=h.label)?"":d)),e.push("</strong>"),e.push(c.escape(null==(d=h.value)?"":d)),e.push("\n      </li>")}}}.call(this),e.push("\n    </ul>"),e.push("\n  </div>"),e.push("\n</div>")}.call(this,"metadata"in f?f.metadata:"undefined"!=typeof metadata?metadata:void 0,"title"in f?f.title:"undefined"!=typeof title?title:void 0,"undefined"in f?f.undefined:void 0),e.join("")}catch(g){c.rethrow(g,b[0].filename,b[0].lineno,".main\n  .animation-container\n    img.animation\n\n  .audio-info\n    .progress-bar\n      .progress-bar-progress\n\n    .title= title\n    ul.metadata\n      each meta in metadata\n        li\n          strong= meta.label\n          = meta.value\n")}}(b)}},{"jade/lib/runtime.js":11}],2:[function(a,b){"use strict";function c(a){this.rootEl=null,this.audioEl_=null,this.audioSrc_=a.src,this.title_=a.title,this.metadata_=a.metadata,this.initDomElements_(),this.bindEvents_(),window.ap=this}var d=a("./dom-utils"),e=a("../jade/audio-player.jade"),f=c.prototype;f.play=function(){this.audioEl_.play()},f.pause=function(){this.audioEl_.pause()},f.toggle=function(){this.audioEl_.paused?this.audioEl_.play():this.audioEl_.pause()},f.getAudioEl=function(){return this.audioEl_},f.updateProgress_=function(a,b){var c=-100+a/b*100;this.progressEl_.style.transform="translateX("+c+"%)"},f.initDomElements_=function(){var a=d.createFragment(e({title:this.title_,metadata:this.metadata_}));this.progressBarEl_=a.querySelector(".progress-bar"),this.progressEl_=a.querySelector(".progress-bar-progress"),this.audioEl_=new Audio,this.audioEl_.src=this.audioSrc_,a.appendChild(this.audioEl_),this.rootEl=a},f.bindEvents_=function(){this.audioEl_.addEventListener("timeupdate",this.onTimeUpdate_.bind(this),!1),this.audioEl_.addEventListener("loadedmetadata",this.onTimeUpdate_.bind(this),!1),this.progressBarEl_.addEventListener("click",this.onProgressBarClick_.bind(this),!1),this.rootEl.addEventListener("click",this.toggle.bind(this),!1)},f.onTimeUpdate_=function(){this.updateProgress_(this.audioEl_.currentTime,this.audioEl_.duration)},f.onProgressBarClick_=function(a){var b=this.progressBarEl_.getBoundingClientRect(),c=a.clientX-b.left,d=c/b.width;this.audioEl_.readyState>0&&(this.audioEl_.currentTime=d*this.audioEl_.duration),a.stopPropagation()},b.exports=c},{"../jade/audio-player.jade":1,"./dom-utils":7}],3:[function(a,b){function c(a,b){this.audioPlayer_=a,this.options_=b,this.images_=[],this.imageLoader_=null,this.$progressBar_=null,this.$animationContainer_=a.rootEl.querySelector(".animation-container"),this.$img_=this.$animationContainer_.querySelector(".animation"),this.imageIndex_=0,this.lastFrameTime_=0,this.initAudioEvents_(),this.loadImages_(b)}var d=a("./ImageLoader");c.prototype.loadImages_=function(){this.$progressBar_=document.querySelector(".img-loader-progress .progress-bar-progress"),this.imageLoader_=new d(this.options_.filenamePattern,this.options_.numImages),this.imageLoader_.on("progress",function(a,b,c){this.$progressBar_.style.transform="translateX("+(-100+b/c*100)+"%)",this.images_.push(a)}.bind(this)),this.imageLoader_.on("ready",function(){this.$progressBar_.style.transform="translateX(0)",this.$progressBar_.style.opacity=0,this.tick_()}.bind(this)),this.$img_.src=this.imageLoader_.getFilename(0),this.imageLoader_.start(this.options_.numThreads)},c.prototype.initAudioEvents_=function(){this.audioEl_=this.audioPlayer_.getAudioEl(),this.audioEl_.addEventListener("playing",function(){this.isPlaying_=!0,this.tick_()}.bind(this),!1),this.audioEl_.addEventListener("pause",function(){this.isPlaying_=!1}.bind(this),!1)},c.prototype.tick_=function(){if(this.isPlaying_){window.requestAnimationFrame(this.tick_.bind(this),this.$animationContainer_);var a=Date.now(),b=a-this.lastFrameTime_;b>40&&(this.imageIndex_=(this.imageIndex_+1)%this.images_.length,this.$img_.src=this.images_[this.imageIndex_].src,this.lastFrameTime_=a)}},b.exports=c},{"./ImageLoader":4}],4:[function(a,b){function c(a,b){d.call(this),this.filenamePattern_=a,this.numImages_=b,this.numLoading_=0,this.remainingImageUrls_=[],this.images_=[];for(var c=0;c<this.numImages_;c++)this.remainingImageUrls_.push(this.getFilename(c))}var d=a("eventemitter2").EventEmitter2;c.prototype=Object.create(d.prototype),c.prototype.constructor=c;var e=c.prototype;e.start=function(a){for(;a--;)this.loadNextImage_()},e.getFilename=function(a){return this.filenamePattern_.replace("%05d",(a+1e5).toString().slice(1))},e.loadNextImage_=function(){var a;a=this.remainingImageUrls_.shift(),a&&(this.numLoading_++,function(a){var b=new Image;b.onload=function(){this.numLoading_--,this.imageLoadingComplete_(b),this.loadNextImage_(),this.images_.push(b)}.bind(this),b.onerror=b.onabort=function(){console.error("problem!"),this.numLoading_--,this.imageLoadingComplete_(b),this.loadNextImage_(),this.images_.push(b)}.bind(this),b.src=a}.call(this,a))},e.imageLoadingComplete_=function(a){var b=this.numImages_-this.remainingImageUrls_.length-this.numLoading_;b===this.numImages_?this.emit("ready"):this.emit("progress",a,b,this.numImages_)},b.exports=c},{eventemitter2:9}],5:[function(a,b){b.exports={Amp:a("./Amp")}},{"./Amp":3}],6:[function(a,b){"use strict";function c(a){this.el_=a;var b={src:"audio/test.mp3",title:"I'm a maschine",metadata:[{label:"Artist",value:"Glass Lux"},{label:"Album",value:"Glass Lux – Singles"},{label:"Source",value:"freemusicarchive.org"},{label:"Why?",value:"Just a random Creative-Commons Track"}]};this.audioPlayer_=new d(b),this.animation_=new e.Amp(this.audioPlayer_,{filenamePattern:"images/amp-loop/%05d.png",numImages:79,numThreads:4}),this.el_.insertBefore(this.audioPlayer_.rootEl,this.el_.firstChild)}var d=a("./AudioPlayer"),e=a("./animations");b.exports=c},{"./AudioPlayer":2,"./animations":5}],7:[function(a,b){"use strict";function c(a,b){f[a]=b}function d(a,b){var c=f[a],d=document.createElement("div");return d.innerHTML="<br>"+c(b),d.lastElementChild}function e(a){var b=document.createElement("div");return b.innerHTML="<br>"+a,b.lastElementChild}var f={};b.exports={createFragment:e,registerTemplate:c,renderTemplate:d}},{}],8:[function(a){"use strict";{var b=a("./app.js");new b(document.body)}},{"./app.js":6}],9:[function(a,b,c){!function(){function a(){this._events={},this._conf&&b.call(this,this._conf)}function b(a){a&&(this._conf=a,a.delimiter&&(this.delimiter=a.delimiter),a.maxListeners&&(this._events.maxListeners=a.maxListeners),a.wildcard&&(this.wildcard=a.wildcard),a.newListener&&(this.newListener=a.newListener),this.wildcard&&(this.listenerTree={}))}function d(a){this._events={},this.newListener=!1,b.call(this,a)}function e(a,b,c,d){if(!c)return[];var f,g,h,i,j,k,l,m=[],n=b.length,o=b[d],p=b[d+1];if(d===n&&c._listeners){if("function"==typeof c._listeners)return a&&a.push(c._listeners),[c];for(f=0,g=c._listeners.length;g>f;f++)a&&a.push(c._listeners[f]);return[c]}if("*"===o||"**"===o||c[o]){if("*"===o){for(h in c)"_listeners"!==h&&c.hasOwnProperty(h)&&(m=m.concat(e(a,b,c[h],d+1)));return m}if("**"===o){l=d+1===n||d+2===n&&"*"===p,l&&c._listeners&&(m=m.concat(e(a,b,c,n)));for(h in c)"_listeners"!==h&&c.hasOwnProperty(h)&&("*"===h||"**"===h?(c[h]._listeners&&!l&&(m=m.concat(e(a,b,c[h],n))),m=m.concat(e(a,b,c[h],d))):m=m.concat(h===p?e(a,b,c[h],d+2):e(a,b,c[h],d)));return m}m=m.concat(e(a,b,c[o],d+1))}if(i=c["*"],i&&e(a,b,i,d+1),j=c["**"])if(n>d){j._listeners&&e(a,b,j,n);for(h in j)"_listeners"!==h&&j.hasOwnProperty(h)&&(h===p?e(a,b,j[h],d+2):h===o?e(a,b,j[h],d+1):(k={},k[h]=j[h],e(a,b,{"**":k},d+1)))}else j._listeners?e(a,b,j,n):j["*"]&&j["*"]._listeners&&e(a,b,j["*"],n);return m}function f(a,b){a="string"==typeof a?a.split(this.delimiter):a.slice();for(var c=0,d=a.length;d>c+1;c++)if("**"===a[c]&&"**"===a[c+1])return;for(var e=this.listenerTree,f=a.shift();f;){if(e[f]||(e[f]={}),e=e[f],0===a.length){if(e._listeners){if("function"==typeof e._listeners)e._listeners=[e._listeners,b];else if(g(e._listeners)&&(e._listeners.push(b),!e._listeners.warned)){var i=h;"undefined"!=typeof this._events.maxListeners&&(i=this._events.maxListeners),i>0&&e._listeners.length>i&&(e._listeners.warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",e._listeners.length),console.trace())}}else e._listeners=b;return!0}f=a.shift()}return!0}var g=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},h=10;d.prototype.delimiter=".",d.prototype.setMaxListeners=function(b){this._events||a.call(this),this._events.maxListeners=b,this._conf||(this._conf={}),this._conf.maxListeners=b},d.prototype.event="",d.prototype.once=function(a,b){return this.many(a,1,b),this},d.prototype.many=function(a,b,c){function d(){0===--b&&e.off(a,d),c.apply(this,arguments)}var e=this;if("function"!=typeof c)throw new Error("many only accepts instances of Function");return d._origin=c,this.on(a,d),e},d.prototype.emit=function(){this._events||a.call(this);var b=arguments[0];if("newListener"===b&&!this.newListener&&!this._events.newListener)return!1;if(this._all){for(var c=arguments.length,d=new Array(c-1),f=1;c>f;f++)d[f-1]=arguments[f];for(f=0,c=this._all.length;c>f;f++)this.event=b,this._all[f].apply(this,d)}if("error"===b&&!(this._all||this._events.error||this.wildcard&&this.listenerTree.error))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");var g;if(this.wildcard){g=[];var h="string"==typeof b?b.split(this.delimiter):b.slice();e.call(this,g,h,this.listenerTree,0)}else g=this._events[b];if("function"==typeof g){if(this.event=b,1===arguments.length)g.call(this);else if(arguments.length>1)switch(arguments.length){case 2:g.call(this,arguments[1]);break;case 3:g.call(this,arguments[1],arguments[2]);break;default:for(var c=arguments.length,d=new Array(c-1),f=1;c>f;f++)d[f-1]=arguments[f];g.apply(this,d)}return!0}if(g){for(var c=arguments.length,d=new Array(c-1),f=1;c>f;f++)d[f-1]=arguments[f];for(var i=g.slice(),f=0,c=i.length;c>f;f++)this.event=b,i[f].apply(this,d);return i.length>0||!!this._all}return!!this._all},d.prototype.on=function(b,c){if("function"==typeof b)return this.onAny(b),this;if("function"!=typeof c)throw new Error("on only accepts instances of Function");if(this._events||a.call(this),this.emit("newListener",b,c),this.wildcard)return f.call(this,b,c),this;if(this._events[b]){if("function"==typeof this._events[b])this._events[b]=[this._events[b],c];else if(g(this._events[b])&&(this._events[b].push(c),!this._events[b].warned)){var d=h;"undefined"!=typeof this._events.maxListeners&&(d=this._events.maxListeners),d>0&&this._events[b].length>d&&(this._events[b].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[b].length),console.trace())}}else this._events[b]=c;return this},d.prototype.onAny=function(a){if("function"!=typeof a)throw new Error("onAny only accepts instances of Function");return this._all||(this._all=[]),this._all.push(a),this},d.prototype.addListener=d.prototype.on,d.prototype.off=function(a,b){if("function"!=typeof b)throw new Error("removeListener only takes instances of Function");var c,d=[];if(this.wildcard){var f="string"==typeof a?a.split(this.delimiter):a.slice();d=e.call(this,null,f,this.listenerTree,0)}else{if(!this._events[a])return this;c=this._events[a],d.push({_listeners:c})}for(var h=0;h<d.length;h++){var i=d[h];if(c=i._listeners,g(c)){for(var j=-1,k=0,l=c.length;l>k;k++)if(c[k]===b||c[k].listener&&c[k].listener===b||c[k]._origin&&c[k]._origin===b){j=k;break}if(0>j)continue;return this.wildcard?i._listeners.splice(j,1):this._events[a].splice(j,1),0===c.length&&(this.wildcard?delete i._listeners:delete this._events[a]),this}(c===b||c.listener&&c.listener===b||c._origin&&c._origin===b)&&(this.wildcard?delete i._listeners:delete this._events[a])}return this},d.prototype.offAny=function(a){var b,c=0,d=0;if(a&&this._all&&this._all.length>0){for(b=this._all,c=0,d=b.length;d>c;c++)if(a===b[c])return b.splice(c,1),this}else this._all=[];return this},d.prototype.removeListener=d.prototype.off,d.prototype.removeAllListeners=function(b){if(0===arguments.length)return!this._events||a.call(this),this;if(this.wildcard)for(var c="string"==typeof b?b.split(this.delimiter):b.slice(),d=e.call(this,null,c,this.listenerTree,0),f=0;f<d.length;f++){var g=d[f];g._listeners=null}else{if(!this._events[b])return this;this._events[b]=null}return this},d.prototype.listeners=function(b){if(this.wildcard){var c=[],d="string"==typeof b?b.split(this.delimiter):b.slice();return e.call(this,c,d,this.listenerTree,0),c}return this._events||a.call(this),this._events[b]||(this._events[b]=[]),g(this._events[b])||(this._events[b]=[this._events[b]]),this._events[b]},d.prototype.listenersAny=function(){return this._all?this._all:[]},"function"==typeof define&&define.amd?define(function(){return d}):"object"==typeof c?c.EventEmitter2=d:window.EventEmitter2=d}()},{}],10:[function(){},{}],11:[function(a,b,c){"use strict";function d(a){return null!=a&&""!==a}function e(a){return(Array.isArray(a)?a.map(e):a&&"object"==typeof a?Object.keys(a).filter(function(b){return a[b]}):[a]).filter(d).join(" ")}c.merge=function f(a,b){if(1===arguments.length){for(var c=a[0],e=1;e<a.length;e++)c=f(c,a[e]);return c}var g=a["class"],h=b["class"];(g||h)&&(g=g||[],h=h||[],Array.isArray(g)||(g=[g]),Array.isArray(h)||(h=[h]),a["class"]=g.concat(h).filter(d));for(var i in b)"class"!=i&&(a[i]=b[i]);return a},c.joinClasses=e,c.cls=function(a,b){for(var d=[],f=0;f<a.length;f++)d.push(b&&b[f]?c.escape(e([a[f]])):e(a[f]));var g=e(d);return g.length?' class="'+g+'"':""},c.style=function(a){return a&&"object"==typeof a?Object.keys(a).map(function(b){return b+":"+a[b]}).join(";"):a},c.attr=function(a,b,d,e){return"style"===a&&(b=c.style(b)),"boolean"==typeof b||null==b?b?" "+(e?a:a+'="'+a+'"'):"":0==a.indexOf("data")&&"string"!=typeof b?(-1!==JSON.stringify(b).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),b&&"function"==typeof b.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+a+"='"+JSON.stringify(b).replace(/'/g,"&apos;")+"'"):d?(b&&"function"==typeof b.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+a+'="'+c.escape(b)+'"'):(b&&"function"==typeof b.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+a+'="'+b+'"')},c.attrs=function(a,b){var d=[],f=Object.keys(a);if(f.length)for(var g=0;g<f.length;++g){var h=f[g],i=a[h];"class"==h?(i=e(i))&&d.push(" "+h+'="'+i+'"'):d.push(c.attr(h,i,!1,b))}return d.join("")},c.escape=function(a){var b=String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return b===""+a?a:b},c.rethrow=function g(b,c,d,e){if(!(b instanceof Error))throw b;if(!("undefined"==typeof window&&c||e))throw b.message+=" on line "+d,b;try{e=e||a("fs").readFileSync(c,"utf8")}catch(f){g(b,null,d)}var h=3,i=e.split("\n"),j=Math.max(d-h,0),k=Math.min(i.length,d+h),h=i.slice(j,k).map(function(a,b){var c=b+j+1;return(c==d?"  > ":"    ")+c+"| "+a}).join("\n");throw b.path=c,b.message=(c||"Jade")+":"+d+"\n"+h+"\n\n"+b.message,b}},{fs:10}]},{},[8]);