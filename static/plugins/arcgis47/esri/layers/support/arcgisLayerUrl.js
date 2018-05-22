// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","../../core/urlUtils"],function(l,d,e){function g(a){var b=e.urlToObject(a).path.match(d.match);if(!b)return null;a=b[1];var c=b[2],k=b[3],b=b[4],f=c.indexOf("/");return{title:h(-1!==f?c.slice(f+1):c),serverType:k,sublayer:null!=b&&""!==b?parseInt(b,10):null,url:{path:a}}}function h(a){a=a.replace(/\s*[/_]+\s*/g," ");return a[0].toUpperCase()+a.slice(1)}Object.defineProperty(d,"__esModule",{value:!0});d.serverTypes="MapServer ImageServer FeatureServer SceneServer StreamServer VectorTileServer".split(" ");
d.match=new RegExp("^((?:https?:)?\\/\\/\\S+?\\/rest\\/services\\/(.+?)\\/("+d.serverTypes.join("|")+"))(?:\\/(?:layers\\/)?(\\d+))?","i");d.test=function(a){return!!d.match.test(a)};d.parse=g;d.cleanTitle=h;d.titleFromUrlAndName=function(a,b){var c=[];a&&(a=g(a))&&a.title&&c.push(a.title);b&&(b=h(b),c.push(b));if(2===c.length){if(-1!==c[0].toLowerCase().indexOf(c[1].toLowerCase()))return c[0];if(-1!==c[1].toLowerCase().indexOf(c[0].toLowerCase()))return c[1]}return c.join(" - ")};d.isHostedAgolService=
function(a){if(!a)return!1;a=a.toLowerCase();var b=-1!==a.indexOf(".arcgis.com/");a=-1!==a.indexOf("//services")||-1!==a.indexOf("//tiles")||-1!==a.indexOf("//features");return b&&a};d.isHostedSecuredProxyService=function(a,b){return b&&a&&-1!==a.toLowerCase().indexOf(b.toLowerCase())};d.sanitizeUrl=function(a,b){return a?e.removeTrailingSlash(e.removeQueryParameters(a,b)):a};d.sanitizeUrlWithLayerId=function(a,b,c){if(!b)return{url:b};b=e.removeQueryParameters(b,c);c=e.urlToObject(b);c=g(c.path);
var d;c&&null!=c.sublayer&&(null==a.layerId&&(d=c.sublayer),b=c.url.path);return{url:e.removeTrailingSlash(b),layerId:d}};d.writeUrlWithLayerId=function(a,b,c,d){var f=null;d?f=c:d=c;e.writeOperationalLayerUrl(b,d);d.url&&null!=a.layerId&&(d.url=e.join(d.url,f,a.layerId.toString()))}});