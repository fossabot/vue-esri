// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","./unitUtils"],function(g,h,e){var f;(function(d){d.formatDecimal=function(a,c,b,d){void 0===b&&(b=2);void 0===d&&(d="abbr");return e.formatDecimal(a.toUnit(c).value,c,b,d)};d.formatMetricLength=function(a,c,b){void 0===c&&(c=2);void 0===b&&(b="abbr");if("length"!==a.measure)throw Error("quantity is not a length");return e.formatMetricLength(a.value,a.unit,c,b)};d.formatMetricVerticalLength=function(a,c,b){void 0===c&&(c=2);void 0===b&&(b="abbr");if("length"!==a.measure)throw Error("quantity is not a length");
return e.formatMetricVerticalLength(a.value,a.unit,c,b)};d.formatMetricArea=function(a,c,b){void 0===c&&(c=2);void 0===b&&(b="abbr");if("area"!==a.measure)throw Error("quantity is not an area");return e.formatMetricArea(a.value,a.unit,c,b)};d.formatImperialLength=function(a,c,b){void 0===c&&(c=2);void 0===b&&(b="abbr");if("length"!==a.measure)throw Error("quantity is not a length");return e.formatImperialLength(a.value,a.unit,c,b)};d.formatImperialVerticalLength=function(a,c,b){void 0===c&&(c=2);
void 0===b&&(b="abbr");if("length"!==a.measure)throw Error("quantity is not a length");return e.formatImperialVerticalLength(a.value,a.unit,c,b)};d.formatImperialArea=function(a,c,b){void 0===c&&(c=2);void 0===b&&(b="abbr");if("area"!==a.measure)throw Error("quantity is not an area");return e.formatImperialArea(a.value,a.unit,c,b)};d.formatDMS=function(a){if("angle"!==a.measure)throw Error("quantity is not an angle");return e.formatDMS(a.value,a.unit)}})(f||(f={}));return f});