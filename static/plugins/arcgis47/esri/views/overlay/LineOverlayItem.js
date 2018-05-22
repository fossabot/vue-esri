// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/accessorSupport/decorators ./ViewOverlayItem maquette".split(" "),function(l,m,f,d,g,a,h,k){return function(e){function b(){var c=null!==e&&e.apply(this,arguments)||this;c.startX=0;c.startY=0;c.endX=0;c.endY=0;c.width=1;c.color=[0,0,0,1];c.visible=!0;return c}f(b,e);Object.defineProperty(b.prototype,"startPosition",{get:function(){return[this.startX,this.startY]},set:function(c){this._set("startX",
c[0]);this._set("startY",c[1])},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"endPosition",{get:function(){return[this.endX,this.endY]},set:function(c){this._set("endX",c[0]);this._set("endY",c[1])},enumerable:!0,configurable:!0});b.prototype.render=function(){var c=Math.min(this.startX,this.endX),b=Math.min(this.startY,this.endY),a=this.width,d=Math.max(this.startX,this.endX)-c+2*a,e=Math.max(20,Math.max(this.startY,this.endY)-b+2*a);return k.h("div",{classes:{"esri-line-overlay-item":!0},
styles:{left:c-a+"px",top:b-a+"px",width:d+"px",height:e+"px",visibility:this.visible?"visible":"hidden"},innerHTML:"\x3csvg width\x3d"+d+" height\x3d"+e+"\x3e"+("\x3cline x1\x3d"+(this.startX-c+a)+" y1\x3d"+(this.startY-b+a)+" x2\x3d"+(this.endX-c+a)+" y2\x3d"+(this.endY-b+a)+' style\x3d"stroke: rgba(0, 0, 0, 0.5); stroke-width: '+this.width+'; stroke-linecap: round;"\x3e\x3c/line\x3e')+"\x3c/svg\x3e"})};d([a.property()],b.prototype,"startX",void 0);d([a.property()],b.prototype,"startY",void 0);
d([a.property()],b.prototype,"endX",void 0);d([a.property()],b.prototype,"endY",void 0);d([a.property({dependsOn:["startX","startY"]})],b.prototype,"startPosition",null);d([a.property({dependsOn:["endX","endY"]})],b.prototype,"endPosition",null);d([a.property()],b.prototype,"width",void 0);d([a.property()],b.prototype,"color",void 0);d([a.property()],b.prototype,"visible",void 0);return b=d([a.subclass("esri.views.overlay.LineOverlayItem")],b)}(a.declared(g,h))});