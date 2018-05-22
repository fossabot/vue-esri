// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/Evented ../../../core/Handles ../../../core/accessorSupport/decorators ../../../geometry/ScreenPoint ./DrawAction ./input/DrawEvents ./input/Keys".split(" "),function(r,t,k,e,l,m,n,d,h,p,f,q){return function(g){function c(){var a=null!==g&&g.apply(this,arguments)||this;a._cursorMoved=!1;a._cursorScreenPoint=null;a._pointerDownEvent=null;a._viewHandles=new n;
a.vertices=[];a.view=null;return a}k(c,g);c.prototype.initialize=function(){this._addViewHandles()};c.prototype.destroy=function(){this._removeViewHandles();this._viewHandles.destroy();this.emit("destroy")};c.prototype.complete=function(){this._completeDrawing()};c.prototype._addViewHandles=function(){var a=this;this._removeViewHandles();this._viewHandles.add([this.view.on("click",function(b){b.stopPropagation();a._set("vertices",[[b.mapPoint.x,b.mapPoint.y]]);a._drawCompleteHandler(b)}),this.view.on("pointer-down",
function(b){a._pointerDownEvent=b;a._cursorMoved=!1;a._cursorScreenPoint=new h(b.x,b.y);a._set("vertices",[]);a._vertexAddHandler(b)}),this.view.on("pointer-move",function(b){a._cursorMoved&&a.vertices.pop();a._cursorMoved=!0;a._cursorScreenPoint=new h(b.x,b.y);a._pointerDownEvent?a._vertexAddHandler(b):a._cursorUpdateHandler(b)}),this.view.on("pointer-up",function(b){a._cursorMoved?a._drawCompleteHandler(b):(a.vertices.pop(),a._pointerDownEvent=null)}),this.view.on("key-down",function(b){b.key===
q.KEYS.drawCompleteKey&&a._cursorScreenPoint&&a._drawCompleteHandler(b)}),this.view.on("drag",function(b){a._pointerDownEvent&&b.stopPropagation()})])};c.prototype._removeViewHandles=function(){this._viewHandles.removeAll()};c.prototype._addVertex=function(a,b){this.isDuplicateVertex(this.vertices,a)?this._cursorMoved=!1:(this.vertices.push(a),a=this.vertices.indexOf(a),b=new f.VertexAddEvent(this.view,b,a,this.vertices),this.emit("vertex-add",b),b.defaultPrevented&&(this._cursorMoved=!0))};c.prototype._updateCursor=
function(a,b){this.isDuplicateVertex(this.vertices,a)?this._cursorMoved=!1:(this.vertices.push(a),a=this.vertices.indexOf(a),b=new f.CursorUpdateEvent(this.view,b,a,this.vertices),this.emit("cursor-update",b))};c.prototype._completeDrawing=function(a){this._cursorMoved=!1;this._cursorScreenPoint=this._pointerDownEvent=null;a=new f.DrawCompleteEvent(a,this.vertices);this.emit("draw-complete",a);a.defaultPrevented||this._removeViewHandles()};c.prototype._vertexAddHandler=function(a){this._addVertex(this.getCoordsFromScreenPoint(this._cursorScreenPoint),
a.native)};c.prototype._cursorUpdateHandler=function(a){this._updateCursor(this.getCoordsFromScreenPoint(this._cursorScreenPoint),a.native)};c.prototype._drawCompleteHandler=function(a){this._completeDrawing(a.native)};e([d.property({readOnly:!0})],c.prototype,"vertices",void 0);e([d.property()],c.prototype,"view",void 0);return c=e([d.subclass("esri/views/2d/engine/markup/SegmentDrawAction")],c)}(d.declared(p,l,m))});