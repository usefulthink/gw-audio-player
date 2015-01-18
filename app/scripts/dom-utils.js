'use strict';
/**
 * @type {Object.<String, function(Object): String>}
 * @private
 */
var tplCache_ = {};

/**
 * @param {String} name
 * @param {function(Object): String} renderFn
 * @private
 */
function registerTemplate_(name, renderFn) {
  tplCache_[name] = renderFn;
}

/**
 * @param {String} templateName
 * @param {Object} data
 * @returns {HTMLElement}
 * @private
 */
function renderTemplate_(templateName, data) {
  var tpl =  tplCache_[templateName],
    fragment = document.createElement('div');

  fragment.innerHTML = '<br>' + tpl(data);

  return fragment.lastElementChild;
}

/**
 * @param {String} html
 * @returns {HTMLElement}
 * @private
 */
function createFragment_(html) {
  var fragment = document.createElement('div');
  fragment.innerHTML = '<br>' + html;

  return fragment.lastElementChild;
}

module.exports = {
  /**
   * @param {String} html
   * @returns {HTMLElement}
   */
  createFragment: createFragment_,

  /**
   * @param {String} name
   * @param {function(Object): String} renderFn
   */
  registerTemplate: registerTemplate_,

  /**
   * @param {String} templateFile
   * @param {Object} data
   * @returns {HTMLElement}
   */
  renderTemplate: renderTemplate_
};
