// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/extendsHelper ../3d/lib/glMatrix ./FilteredFiniteDifference ./Momentum".split(" "),function(g,f,k,e,d,l){Object.defineProperty(f,"__esModule",{value:!0});var h=function(b){function a(c,a,d,e,f){c=b.call(this,c,a,d)||this;c.sceneVelocity=e;c.direction=f;return c}k(a,b);a.prototype.value=function(a){return b.prototype.valueFromInitialVelocity.call(this,this.sceneVelocity,a)};return a}(l.Momentum);f.PanPlanarMomentum=h;g=function(){function b(a,c,b){void 0===
a&&(a=300);void 0===c&&(c=12);void 0===b&&(b=.84);this.minimumInitialVelocity=a;this.stopVelocity=c;this.friction=b;this.time=new d.FilteredFiniteDifference(.6);this.screen=[new d.FilteredFiniteDifference(.4),new d.FilteredFiniteDifference(.4)];this.scene=[new d.FilteredFiniteDifference(.6),new d.FilteredFiniteDifference(.6),new d.FilteredFiniteDifference(.6)];this.tmpDirection=e.vec3d.create()}b.prototype.add=function(a,c,b){this.time.hasLastValue&&.015>this.time.computeDelta(b)||(this.screen[0].update(a[0]),
this.screen[1].update(a[1]),this.scene[0].update(c[0]),this.scene[1].update(c[1]),this.scene[2].update(c[2]),this.time.update(b))};b.prototype.reset=function(){this.screen[0].reset();this.screen[1].reset();this.scene[0].reset();this.scene[1].reset();this.scene[2].reset();this.time.reset()};b.prototype.evaluateMomentum=function(){if(!this.screen[0].hasFilteredDelta)return null;var a=this.screen[0].filteredDelta,c=this.screen[1].filteredDelta,a=Math.sqrt(a*a+c*c)/this.time.filteredDelta;return Math.abs(a)<
this.minimumInitialVelocity?null:this.createMomentum(a,this.stopVelocity,this.friction)};b.prototype.createMomentum=function(a,c,b){e.vec3d.set3(this.scene[0].filteredDelta,this.scene[1].filteredDelta,this.scene[2].filteredDelta,this.tmpDirection);var d=e.vec3d.length(this.tmpDirection);0<d&&e.vec3d.scale(this.tmpDirection,1/d);return new h(a,c,b,d/this.time.filteredDelta,this.tmpDirection)};return b}();f.PanPlanarMomentumEstimator=g});