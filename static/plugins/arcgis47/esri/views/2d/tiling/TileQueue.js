// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../core/QueueProcessor"],function(r,t,p){function q(b,a){b.length=0;a.forEach(function(a){return b.push(a)});return b}var l=new Set,f=[],d=new Map;return function(){function b(a){var c=this;this.tileInfoView=null;this.tileInfoView=a.tileInfoView;this._queues=a.tileServers&&0<a.tileServers.length?a.tileServers.map(function(){return new p({concurrency:a.concurrency||6,process:a.process,peeker:function(a){return c._peek(a)}})}):[new p({concurrency:a.concurrency||6,
process:a.process,peeker:function(a){return c._peek(a)}})]}Object.defineProperty(b.prototype,"length",{get:function(){return this._queues.reduce(function(a,c){return a+c.length},0)},enumerable:!0,configurable:!0});b.prototype.clear=function(){for(var a=0,c=this._queues;a<c.length;a++)c[a].clear()};b.prototype.find=function(a,c){c=0;for(var b=this._queues;c<b.length;c++){var d=b[c].find(a);if(d)return d}};b.prototype.has=function(a){for(var c=0,b=this._queues;c<b.length;c++)if(b[c].has(a))return!0;
return!1};b.prototype.pause=function(){for(var a=0,c=this._queues;a<c.length;a++)c[a].pause()};b.prototype.push=function(a){return this._queues[a.row%this._queues.length].push(a)};b.prototype.reset=function(){for(var a=0,c=this._queues;a<c.length;a++)c[a].reset()};b.prototype.resume=function(){for(var a=0,c=this._queues;a<c.length;a++)c[a].resume()};b.prototype._peek=function(a){var c=this;if(!this.state)return a[0];var b=this.tileInfoView,m=Number.NEGATIVE_INFINITY,n=Number.POSITIVE_INFINITY;a.forEach(function(a){var b=
c.tileInfoView.getTileScale(a);d.has(b)||(d.set(b,[]),m=Math.max(b,m),n=Math.min(b,n));d.get(b).push(a);l.add(b)});var e=this.state.scale;d.has(e)||(q(f,l),f.sort(),e=f.reduce(function(a,b,c,d){return Math.abs(b-e)<Math.abs(a-e)?b:a},f[0]));e=Math.min(e,m);e=Math.max(e,n);a=d.get(e);var g=b.getClosestInfoForScale(e),h=g.getColumnForX(this.state.center[0]),k=g.getRowForY(this.state.center[1]);a.sort(function(a,b){var c=g.denormalizeCol(a.col,a.world),d=g.denormalizeCol(b.col,b.world);return Math.sqrt((h-
c)*(h-c)+(k-a.row)*(k-a.row))-Math.sqrt((h-d)*(h-d)+(k-b.row)*(k-b.row))});l.clear();d.clear();return a[0]};return b}()});