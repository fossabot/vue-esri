// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/lang ../core/accessorSupport/decorators ./Extent ./Geometry ./Point ./SpatialReference ./support/centroid ./support/contains ./support/coordsUtils ./support/intersects ./support/webMercatorUtils ./support/zmUtils".split(" "),function(q,U,M,f,z,g,J,N,h,O,P,Q,R,S,A,K){function L(g){return function(b,k){return null==b?k:null==k?b:g(b,k)}}var n=L(Math.min),l=L(Math.max);q=function(q){function b(){for(var a=
0;a<arguments.length;a++);a=q.call(this)||this;a.rings=[];a.type="polygon";return a}M(b,q);k=b;b.createEllipse=function(a){var d=a.center.x,c=a.center.y,F=a.center.z,e=a.center.m,b=a.center.hasZ,g=a.center.hasM,T=a.longAxis,n=a.shortAxis,l=a.numberOfPoints;a=a.view;for(var r=[],f=2*Math.PI/l,h=b?3:2,u=0;u<l;u++){var p=a.toMap(T*Math.cos(u*f)+d,n*Math.sin(u*f)+c),p=[p.x,p.y];b&&(p[2]=F);g&&(p[h]=e);r.push(p)}r.push(r[0]);return new k({rings:[r],spatialReference:a.spatialReference})};b.createCircle=
function(a){return k.createEllipse({center:a.center,longAxis:a.r,shortAxis:a.r,numberOfPoints:a.numberOfPoints,view:a.view})};b.fromExtent=function(a){var d=a.clone().normalize();a=a.spatialReference;var c=!1,b=!1;d.map(function(a){a.hasZ&&(c=!0);a.hasM&&(b=!0)});d={rings:d.map(function(a){var d=[[a.xmin,a.ymin],[a.xmin,a.ymax],[a.xmax,a.ymax],[a.xmax,a.ymin],[a.xmin,a.ymin]];if(c&&a.hasZ)for(var F=a.zmin+.5*(a.zmax-a.zmin),e=0;e<d.length;e++)d[e].push(F);if(b&&a.hasM)for(a=a.mmin+.5*(a.mmax-a.mmin),
e=0;e<d.length;e++)d[e].push(a);return d}),spatialReference:a};c&&(d.hasZ=!0);b&&(d.hasM=!0);return new k(d)};b.prototype.normalizeCtorArgs=function(a,d){var c=null,b,e,m=null;a&&!Array.isArray(a)?(c=a.rings?a.rings:null,d||(a.spatialReference?d=a.spatialReference:a.rings||(d=a)),b=a.hasZ,e=a.hasM):c=a;c=c||[];d=d||O.WGS84;c.length&&c[0]&&null!=c[0][0]&&"number"===typeof c[0][0]&&(c=[c]);if(m=c[0]&&c[0][0])void 0===b&&void 0===e?(b=2<m.length,e=!1):void 0===b?b=!e&&3<m.length:void 0===e&&(e=!b&&3<
m.length);return{rings:c,spatialReference:d,hasZ:b,hasM:e}};Object.defineProperty(b.prototype,"centroid",{get:function(){var a=P.polygonCentroid(this);if(!a||isNaN(a[0])||isNaN(a[1])||this.hasZ&&isNaN(a[2]))return null;var d=new h;d.x=a[0];d.y=a[1];d.spatialReference=this.spatialReference;this.hasZ&&(d.z=a[2]);return d},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"extent",{get:function(){var a=this.hasZ,d=this.hasM,c=this.spatialReference,b=this.rings,e=a?3:2;if(!b.length||!b[0].length)return null;
for(var m=b[0][0],g=m[0],m=m[1],f=b[0][0],k=f[0],f=f[1],h=void 0,r=void 0,q=void 0,z=void 0,u=[],p=0;p<b.length;p++){for(var B=b[p],w=B[0],G=w[0],w=w[1],x=B[0],H=x[0],x=x[1],C=void 0,D=void 0,A=void 0,v=void 0,I=0;I<B.length;I++){var y=B[I],t=y[0],E=y[1],g=n(g,t),m=n(m,E),k=l(k,t),f=l(f,E),G=n(G,t),w=n(w,E),H=l(H,t),x=l(x,E);a&&2<y.length&&(t=y[2],h=n(h,t),r=l(r,t),C=n(C,t),D=l(D,t));d&&y.length>e&&(v=y[e],q=n(h,v),z=l(r,v),A=n(C,v),v=l(D,v))}u.push(new J({xmin:G,ymin:w,zmin:C,mmin:A,xmax:H,ymax:x,
zmax:D,mmax:v,spatialReference:c}))}b=new J;b.xmin=g;b.ymin=m;b.xmax=k;b.ymax=f;b.spatialReference=c;a&&(b.zmin=h,b.zmax=r);d&&(b.mmin=q,b.mmax=z);b.cache._partwise=1<u.length?u:null;return b},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"isSelfIntersecting",{get:function(){return S.isSelfIntersecting(this.rings)},enumerable:!0,configurable:!0});b.prototype.writePaths=function(a,b,c,f){b.rings=z.clone(this.rings)};b.prototype.addRing=function(a){if(a){this.clearCache();var b=
this.rings,c=b.length;if(Array.isArray(a[0]))b[c]=a.concat();else{for(var f=[],e=0,g=a.length;e<g;e++)f[e]=a[e].toArray();b[c]=f}return this}};b.prototype.clone=function(){var a=new k;a.spatialReference=this.spatialReference;a.rings=z.clone(this.rings);a.hasZ=this.hasZ;a.hasM=this.hasM;return a};b.prototype.contains=function(a){if(!a)return!1;A.canProject(a,this.spatialReference)&&(a=A.project(a,this.spatialReference));return Q.polygonContainsPoint(this,a)};b.prototype.isClockwise=function(a){var b=
this;a=Array.isArray(a[0])?a:a.map(function(a){return b.hasZ?b.hasM?[a.x,a.y,a.z,a.m]:[a.x,a.y,a.z]:[a.x,a.y]});return R.isClockwise(a,this.hasM,this.hasZ)};b.prototype.getPoint=function(a,b){if(!this._validateInputs(a,b))return null;a=this.rings[a][b];b=this.hasZ;var c=this.hasM;return b&&!c?new h(a[0],a[1],a[2],void 0,this.spatialReference):c&&!b?new h(a[0],a[1],void 0,a[2],this.spatialReference):b&&c?new h(a[0],a[1],a[2],a[3],this.spatialReference):new h(a[0],a[1],this.spatialReference)};b.prototype.insertPoint=
function(a,b,c){if(!this._validateInputs(a,b,!0))return this;this.clearCache();K.updateSupportFromPoint(this,c);Array.isArray(c)||(c=c.toArray());this.rings[a].splice(b,0,c);return this};b.prototype.removePoint=function(a,b){if(!this._validateInputs(a,b))return null;this.clearCache();return new h(this.rings[a].splice(b,1)[0],this.spatialReference)};b.prototype.removeRing=function(a){if(!this._validateInputs(a,null))return null;this.clearCache();a=this.rings.splice(a,1)[0];var b=this.spatialReference;
return a.map(function(a){return new h(a,b)})};b.prototype.setPoint=function(a,b,c){if(!this._validateInputs(a,b))return this;this.clearCache();K.updateSupportFromPoint(this,c);Array.isArray(c)||(c=c.toArray());this.rings[a][b]=c;return this};b.prototype._validateInputs=function(a,b,c){void 0===c&&(c=!1);return null==a||0>a||a>=this.rings.length||null!=b&&(a=this.rings[a],c&&(0>b||b>a.length)||!c&&(0>b||b>=a.length))?!1:!0};b.prototype.toJSON=function(a){return this.write(null,a)};f([g.property({dependsOn:["hasM",
"hasZ","rings"]})],b.prototype,"cache",void 0);f([g.property({readOnly:!0,dependsOn:["cache"]})],b.prototype,"centroid",null);f([g.property({dependsOn:["cache"],readOnly:!0})],b.prototype,"extent",null);f([g.property({dependsOn:["cache"],readOnly:!0})],b.prototype,"isSelfIntersecting",null);f([g.property({type:[[[Number]]],json:{write:{isRequired:!0}}})],b.prototype,"rings",void 0);f([g.writer("rings")],b.prototype,"writePaths",null);return b=k=f([g.subclass("esri.geometry.Polygon")],b);var k}(g.declared(N));
q.prototype.toJSON.isDefaultToJSON=!0;return q});