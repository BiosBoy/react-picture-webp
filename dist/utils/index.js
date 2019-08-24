"use strict";

exports.__esModule = true;
exports.stringifySrcSet = exports.normalizedDensity = void 0;

var normalizedDensity = function normalizedDensity(value) {
  return value + 1;
};

exports.normalizedDensity = normalizedDensity;

var stringifySrcSet = function stringifySrcSet(setArray) {
  return setArray.join(", ");
};

exports.stringifySrcSet = stringifySrcSet;
