"use strict";

exports.__esModule = true;
exports.sourcesGenerator = exports.srcIterator = exports.srcCreator = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils");

var _constants = require("../constants");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var srcCreator = function srcCreator(srcProps) {
  var name = srcProps.name,
    path = srcProps.path,
    _srcProps$currentPixe = srcProps.currentPixelDensity,
    currentPixelDensity =
      _srcProps$currentPixe === void 0
        ? _constants.DESKTOP_PIXEL_DESTINY
        : _srcProps$currentPixe,
    _srcProps$srcWithPixe = srcProps.srcWithPixelsPostfic,
    srcWithPixelsPostfic =
      _srcProps$srcWithPixe === void 0 ? true : _srcProps$srcWithPixe,
    _srcProps$layout = srcProps.layout,
    layout =
      _srcProps$layout === void 0
        ? _constants.DESKTOP_LAYOUT
        : _srcProps$layout,
    _srcProps$type = srcProps.type,
    type = _srcProps$type === void 0 ? _constants.WEBP_FORMAT : _srcProps$type;
  var src =
    "" + path + layout + "/" + name + "@" + currentPixelDensity + "x." + type;
  var srcWithPostfics = src + " " + currentPixelDensity + "x";
  return srcWithPixelsPostfic ? srcWithPostfics : src;
};

exports.srcCreator = srcCreator;

var srcIterator = function srcIterator(srcProps) {
  var _srcProps$isMain = srcProps.isMain,
    isMain = _srcProps$isMain === void 0 ? false : _srcProps$isMain,
    _srcProps$pixelDensit = srcProps.pixelDensity,
    pixelDensity =
      _srcProps$pixelDensit === void 0
        ? _constants.DESKTOP_PIXEL_DESTINY
        : _srcProps$pixelDensit,
    props = _objectWithoutPropertiesLoose(srcProps, ["isMain", "pixelDensity"]);

  var srcList = [];
  var iterationArray = Array.from(Array(pixelDensity).keys());
  iterationArray.forEach(function(pixelDensity) {
    var mainRegularPixelDestiny = isMain && pixelDensity === 0;

    if (mainRegularPixelDestiny) {
      return;
    }

    srcList.push(
      srcCreator({
        ...props,
        currentPixelDensity: (0, _utils.normalizedDensity)(pixelDensity)
      })
    );
  });
  return (0, _utils.stringifySrcSet)(srcList);
};

exports.srcIterator = srcIterator;

var sourcesGenerator = function sourcesGenerator(sourceProps) {
  var isWebpSupported = sourceProps.isWebpSupported,
    type = sourceProps.type,
    mediaBreakpoint = sourceProps.mediaBreakpoint,
    props = _objectWithoutPropertiesLoose(sourceProps, [
      "isWebpSupported",
      "type",
      "mediaBreakpoint"
    ]); // returning webp image format if the browser can serve them or png/jpg/etc.

  var imageFormat = isWebpSupported ? _constants.WEBP_FORMAT : type;
  var layoutBreakpoint = mediaBreakpoint ? "(" + mediaBreakpoint + ")" : "";
  var srcset = srcIterator({
    ...props,
    type: imageFormat
  });
  return _react.default.createElement("source", {
    key: layoutBreakpoint,
    type: "image/" + imageFormat,
    media: layoutBreakpoint,
    srcSet: srcset
  });
};

exports.sourcesGenerator = sourcesGenerator;
