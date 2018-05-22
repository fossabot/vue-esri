//>>built
define(["dojo","../util/oo","dojox/gfx"],function(b,f,c){return f.declare(function(a){b.mixin(this,a);var d=b.contentBox(this.srcRefNode);this.height=this.parentHeight=a.height||d.h;this.width=this.parentWidth=a.width||d.w;this.domNode=b.create("div",{id:"canvasNode"},this.srcRefNode);b.style(this.domNode,{width:this.width,height:"auto"});b.setSelectable(this.domNode,!1);this.id=this.id||this.util.uid("surface");console.info("create canvas");this.gfxSurface=c.createSurface(this.domNode,this.width,
this.height);this.gfxSurface.whenLoaded(this,function(){setTimeout(b.hitch(this,function(){this.surfaceReady=!0;b.isIE||"silverlight"!=c.renderer||(this.id=this.domNode.firstChild.id);this.underlay=this.gfxSurface.createGroup();this.surface=this.gfxSurface.createGroup();this.overlay=this.gfxSurface.createGroup();this.surface.setTransform({dx:0,dy:0,xx:1,yy:1});this.gfxSurface.getDimensions=b.hitch(this.gfxSurface,"getDimensions");a.callback&&a.callback(this.domNode)}),500)});this._mouseHandle=this.mouse.register(this)},
{zoom:1,useScrollbars:!0,baseClass:"drawingCanvas",resize:function(a,b){this.parentWidth=a;this.parentHeight=b;this.setDimensions(a,b)},setDimensions:function(a,d,g,c){var e=this.getScrollWidth();this.width=Math.max(a,this.parentWidth);this.height=Math.max(d,this.parentHeight);this.height>this.parentHeight&&(this.width-=e);this.width>this.parentWidth&&(this.height-=e);this.mouse.resize(this.width,this.height);this.gfxSurface.setDimensions(this.width,this.height);this.domNode.parentNode.scrollTop=
c||0;this.domNode.parentNode.scrollLeft=g||0;this.useScrollbars?b.style(this.domNode.parentNode,{overflowY:this.height>this.parentHeight?"scroll":"hidden",overflowX:this.width>this.parentWidth?"scroll":"hidden"}):b.style(this.domNode.parentNode,{overflowY:"hidden",overflowX:"hidden"})},setZoom:function(a){this.zoom=a;this.surface.setTransform({xx:a,yy:a});this.setDimensions(this.width*a,this.height*a)},onScroll:function(){},getScrollOffset:function(){return{top:this.domNode.parentNode.scrollTop,left:this.domNode.parentNode.scrollLeft}},
getScrollWidth:function(){var a=b.create("div");a.innerHTML='\x3cdiv style\x3d"width:50px;height:50px;overflow:hidden;position:absolute;top:0;left:-1000px;"\x3e\x3cdiv style\x3d"height:100px;"\x3e\x3c/div\x3e';a=a.firstChild;b.body().appendChild(a);var d=b.contentBox(a).h;b.style(a,"overflow","scroll");var c=d-b.contentBox(a).h;b.destroy(a);this.getScrollWidth=function(){return c};return c}})});