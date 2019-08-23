"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
*  @name webpChecker
*  @author 3p-sviat
*  @version 1.0.0
*  @description provides functionality to check if
*               the browser has webP images support and insert
*               the corresponging body class as a result into. (react-apps version)
*
*  @params {object} config - configuration of the watcher
*  @params {boolean} config.disableGlobal - callback accepted
*  @params {boolean} config.injectBodyClass - callback accepted
*  @params {function} config.callback- callback accepted
*  @params {string} config.imgURL - image url to test webP support
*
*  @returns {function} - callback with {boolean} flag provided
*
*/
function webPChecker(config) {
  var _ref = config || {},
      _ref$imgURL = _ref.imgURL,
      imgURL = _ref$imgURL === void 0 ? '' : _ref$imgURL,
      _ref$callback = _ref.callback,
      callback = _ref$callback === void 0 ? function () {} : _ref$callback,
      _ref$injectBodyClass = _ref.injectBodyClass,
      injectBodyClass = _ref$injectBodyClass === void 0 ? false : _ref$injectBodyClass,
      _ref$disableGlobal = _ref.disableGlobal,
      disableGlobal = _ref$disableGlobal === void 0 ? false : _ref$disableGlobal;

  var TEST_IMG = imgURL || 'https://www.gstatic.com/webp/gallery/1.webp';

  function injectBodyClassByWebStatus() {
    // injects class `webp-support` in the `body` tag
    if (!injectBodyClass) {
      return;
    }

    var bodyNode = document && document.body;
    bodyNode.classList.add('webp-support');
  }

  function addGlobalFlag(status) {
    // settings global variable for a whole using
    if (disableGlobal) {
      return;
    } // @ts-ignore


    window.__WEBPSUPPORT__ = status;
  }

  function notifySubscriber(status) {
    // return boolean for a provided callback
    if (!callback || typeof callback !== 'function') {
      return;
    }

    callback && callback(status);
  }

  function detectWebpSupport() {
    var img = new Image();
    img.src = TEST_IMG;

    img.onload = function () {
      var isWebpSupported = !!(img.height > 0 && img.width > 0);
      injectBodyClassByWebStatus();
      addGlobalFlag(true);
      notifySubscriber(isWebpSupported);
    };

    img.onerror = function (e) {
      addGlobalFlag(false);
      notifySubscriber(false);
      console.log('Some error is happen during webP support checking:', JSON.stringify(e));
    };
  }

  detectWebpSupport();
}

var _default = webPChecker;
exports.default = _default;