// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/awaiterHelper ../../core/tsSupport/extendsHelper ../../core/tsSupport/generatorHelper dojo/_base/lang dojo/promise/all ../../core/Error ../../core/promiseUtils ../../geometry/Multipoint ../../geometry/Point ../../geometry/Polyline ../../geometry/support/scaleUtils ../../geometry/support/webMercatorUtils ./ElevationSampler ./ElevationTile ../../views/3d/support/aaBoundingRect".split(" "),function(v,t,l,y,m,u,z,n,p,A,B,G,C,q,D,E,w){Object.defineProperty(t,
"__esModule",{value:!0});v=function(){function f(){}f.prototype.queryAll=function(a,b,c){return l(this,void 0,void 0,function(){var d,e,g,h,k;return m(this,function(f){switch(f.label){case 0:a=c&&c.ignoreInvisibleLayers?a.filter(function(a){return a.visible}):a.slice();if(!a.length)return[2,p.reject(new n("elevation-query:invalid-layer","Elevation queries require at least one elevation layer to fetch tiles from"))];d=r.fromGeometry(b);e=!1;c&&c.returnSampleInfo||(e=!0);g=u.mixin({noDataValue:0,maximumAutoTileRequests:20},
c,{returnSampleInfo:!0,demResolution:"auto"});return[4,this.query(a[a.length-1],d,g)];case 1:return h=f.sent(),[4,this._queryAllContinue(a,h,g)];case 2:return k=f.sent(),k.geometry=k.geometry.export(),e&&delete k.sampleInfo,[2,k]}})})};f.prototype.query=function(a,b,c){return l(this,void 0,void 0,function(){var d;return m(this,function(e){switch(e.label){case 0:if(!a)return[2,p.reject(new n("elevation-query:invalid-layer","Elevation queries require an elevation layer to fetch tiles from"))];if(!b||
!(b instanceof r)&&"point"!==b.type&&"multipoint"!==b.type&&"polyline"!==b.type)return[2,p.reject(new n("elevation-query:invalid-geometry","Only point, polyline and multipoint geometries can be used to query elevation"))];c=u.mixin({noDataValue:0,demResolution:"auto",maximumAutoTileRequests:20,returnSampleInfo:!1},c);d=new H(a,b.spatialReference,c);return[4,a.load()];case 1:return e.sent(),this._createGeometryDescriptor(d,b),[4,this._selectTiles(d)];case 2:return e.sent(),[4,this._populateElevationTiles(d)];
case 3:return e.sent(),this._sampleGeometryWithElevation(d),[2,this._createQueryResult(d)]}})})};f.prototype.createSampler=function(a,b,c){return l(this,void 0,void 0,function(){return m(this,function(d){switch(d.label){case 0:if(!a)return[2,p.reject(new n("elevation-query:invalid-layer","Elevation queries require an elevation layer to fetch tiles from"))];if(!b||"extent"!==b.type)return[2,p.reject(new n("elevation-query:invalid-extent","Invalid or undefined extent"))];c=u.mixin({noDataValue:0,demResolution:"auto",
maximumAutoTileRequests:20,returnSampleInfo:!1},c);return[4,this._createSampler(a,b,c)];case 1:return[2,d.sent()]}})})};f.prototype.createSamplerAll=function(a,b,c){return l(this,void 0,void 0,function(){var d,e,g;return m(this,function(h){switch(h.label){case 0:a=c&&c.ignoreInvisibleLayers?a.filter(function(a){return a.visible}):a.slice();if(!a.length)return[2,p.reject(new n("elevation-query:invalid-layer","Elevation queries require at least one elevation layer to fetch tiles from"))];if(!b||"extent"!==
b.type)return[2,p.reject(new n("elevation-query:invalid-extent","Invalid or undefined extent"))];d=u.mixin({noDataValue:0,maximumAutoTileRequests:20},c,{returnSampleInfo:!0,demResolution:"auto"});return[4,this._createSampler(a[a.length-1],b,d)];case 1:return e=h.sent(),[4,this._createSamplerAllContinue(a,b,e,d)];case 2:return g=h.sent(),[2,g]}})})};f.prototype._createSampler=function(a,b,c,d){return l(this,void 0,void 0,function(){var e,g,h;return m(this,function(k){switch(k.label){case 0:return[4,
a.load()];case 1:k.sent();e=b.spatialReference;g=a.tileInfo.spatialReference;if(!e.equals(g)){if(!q.canProject(e,g))return[2,p.reject(new n("elevation-query:invalid-extent","Extent spatial reference ("+e.wkid+") must be compatible with tile spatial reference ("+g.wkid+")"))];b=q.project(b,g)}h=new I(a,b,c,d);return[4,this._selectTiles(h)];case 2:return k.sent(),[4,this._populateElevationTiles(h)];case 3:return k.sent(),[2,new D.MultiTileElevationSampler(h.elevationTiles,h.layer.tileInfo)]}})})};f.prototype._createSamplerAllContinue=
function(a,b,c,d){return l(this,void 0,void 0,function(){var e,g,h,k;return m(this,function(f){switch(f.label){case 0:a.pop();if(!a.length)return[2,c];e=c.samplers.map(function(a){return w.fromExtent(a.extent)});return[4,this._createSampler(a[a.length-1],b,d,e)];case 1:g=f.sent();if(0===g.samplers.length)return[2,c];h=c.samplers.concat(g.samplers);k=new D.MultiTileElevationSampler(h);return[4,this._createSamplerAllContinue(a,b,k,d)];case 2:return[2,f.sent()]}})})};f.prototype._queryAllContinue=function(a,
b,c){return l(this,void 0,void 0,function(){var d,e,g,h,k,f,l;return m(this,function(x){switch(x.label){case 0:d=a.pop();b.geometry.coordinates.forEach(function(a,c){0<=b.sampleInfo[c].demResolution&&!b.sampleInfo[c].source&&(b.sampleInfo[c].source=d)});if(!a.length)return[2,b];e=b.geometry.coordinates;g=[];h=[];for(k=0;k<e.length;k++)0>b.sampleInfo[k].demResolution&&(g.push(e[k]),h.push(k));if(0===g.length)return[2,b];f=b.geometry.clone(g);return[4,this.query(a[a.length-1],f,c)];case 1:return l=
x.sent(),h.forEach(function(a,c){e[a].z=l.geometry.coordinates[c].z;b.sampleInfo[a].demResolution=l.sampleInfo[c].demResolution}),[4,this._queryAllContinue(a,b,c)];case 2:return[2,x.sent()]}})})};f.prototype._createQueryResult=function(a){var b={geometry:(a.outSpatialReference.equals(a.geometry.spatialReference)?a.geometry:a.geometry.project(a.outSpatialReference)).export(),noDataValue:a.options.noDataValue};a.options.returnSampleInfo&&(b.sampleInfo=this._extractSampleInfo(a));a.geometry.coordinates.forEach(function(a){a.tile=
null;a.elevationTile=null});return b};f.prototype._createGeometryDescriptor=function(a,b){var c,d=a.layer.tileInfo.spatialReference;c=b instanceof r?b.project(d):q.project(b,d);if(!c)throw new n("elevation-query:spatial-reference-mismatch","Cannot query elevation in '"+b.spatialReference.wkid+"' on an elevation service in '"+d.wkid+"'");a.geometry=r.fromGeometry(c)};f.prototype._selectTiles=function(a){return l(this,void 0,void 0,function(){var b;return m(this,function(c){switch(c.label){case 0:b=
a.options.demResolution;"geometry"===a.type&&this._preselectOutsideLayerExtent(a);if("number"!==typeof b)return[3,1];this._selectTilesClosestResolution(a);return[3,6];case 1:return"finest-contiguous"!==b?[3,3]:[4,this._selectTilesFinestContiguous(a)];case 2:return c.sent(),[3,6];case 3:return"auto"!==b?[3,5]:[4,this._selectTilesAuto(a)];case 4:return c.sent(),[3,6];case 5:throw new n("elevation-query:invalid-dem-resolution","Invalid dem resolution value '"+b+'\', expected a number, "finest-contiguous" or "auto"');
case 6:return[2]}})})};f.prototype._preselectOutsideLayerExtent=function(a){var b=new E.ElevationTile(null);b.sample=function(b,c){return a.options.noDataValue};a.outsideExtentTile=b;var c=a.layer.fullExtent;a.geometry.coordinates.forEach(function(a){var d=a.x,g=a.y;if(d<c.xmin||d>c.xmax||g<c.ymin||g>c.ymax)a.elevationTile=b})};f.prototype._selectTilesClosestResolution=function(a){var b=this._findNearestDemResolutionLODIndex(a.layer.tileInfo,a.options.demResolution);a.selectTilesAtLOD(b)};f.prototype._findNearestDemResolutionLODIndex=
function(a,b){var c=C.getMetersPerUnitForSR(a.spatialReference);b/=c;for(var c=a.lods[0],d=0,e=1;e<a.lods.length;e++){var g=a.lods[e];Math.abs(g.resolution-b)<Math.abs(c.resolution-b)&&(c=g,d=e)}return d};f.prototype._selectTilesFinestContiguous=function(a){return l(this,void 0,void 0,function(){return m(this,function(b){switch(b.label){case 0:return[4,this._selectTilesFinestContiguousAt(a,a.layer.tileInfo.lods.length-1)];case 1:return b.sent(),[2]}})})};f.prototype._selectTilesFinestContiguousAt=
function(a,b){return l(this,void 0,void 0,function(){var c,d,e;return m(this,function(g){switch(g.label){case 0:c=a.layer;a.selectTilesAtLOD(b);if(0>b)return[2];d=c.tilemapCache;e=a.getTilesToFetch();g.label=1;case 1:return g.trys.push([1,6,,8]),d?[4,z(e.map(function(a){return d.fetchAvailability(a.level,a.row,a.col)}))]:[3,3];case 2:return g.sent(),[3,5];case 3:return[4,this._populateElevationTiles(a)];case 4:g.sent();if(!a.allElevationTilesFetched())throw a.clearElevationTiles(),new n("elevation-query:has-unavailable-tiles");
g.label=5;case 5:return[3,8];case 6:return g.sent(),[4,this._selectTilesFinestContiguousAt(a,b-1)];case 7:return g.sent(),[3,8];case 8:return[2]}})})};f.prototype._populateElevationTiles=function(a){return l(this,void 0,void 0,function(){var b,c,d,e;return m(this,function(g){switch(g.label){case 0:return b=a.options.noDataValue,c=a.getTilesToFetch(),d={},e=c.map(function(c){return a.layer.fetchTile(c.level,c.row,c.col,b).then(function(a){return d[c.id]=new E.ElevationTile(c,a)})}),[4,p.eachAlways(e)];
case 1:return g.sent(),a.populateElevationTiles(d),[2]}})})};f.prototype._selectTilesAuto=function(a){return l(this,void 0,void 0,function(){var b=this,c,d,e,g;return m(this,function(h){switch(h.label){case 0:this._selectTilesAutoFinest(a);this._reduceTilesForMaximumRequests(a);c=a.layer.tilemapCache;if(!c)return[3,2];d=a.getTilesToFetch();e={};g=d.map(function(a){return l(b,void 0,void 0,function(){var b;return m(this,function(d){switch(d.label){case 0:b={id:null,level:0,row:0,col:0,extent:[0,0,
0,0]},d.label=1;case 1:return d.trys.push([1,3,,4]),[4,c.fetchAvailabilityUpsample(a.level,a.row,a.col,b)];case 2:return d.sent(),e[a.id]=b,[3,4];case 3:return d.sent(),[3,4];case 4:return[2]}})})});return[4,z(g)];case 1:return h.sent(),a.remapTiles(e),[3,3];case 2:return[2,this._selectTilesAutoPrefetchUpsample(a)];case 3:return[2]}})})};f.prototype._reduceTilesForMaximumRequests=function(a){var b=a.layer.tileInfo,c=0,d={},e=function(a){a.id in d?d[a.id]++:(d[a.id]=1,c++)},g=function(a){var b=d[a.id];
1===b?(delete d[a.id],c--):d[a.id]=b-1};a.forEachTileToFetch(e,g);for(var h=!0;h&&(h=!1,a.forEachTileToFetch(function(d){c<=a.options.maximumAutoTileRequests||(g(d),b.upsampleTile(d)&&(h=!0),e(d))},g),h););};f.prototype._selectTilesAutoFinest=function(a){a.selectTilesAtLOD(a.layer.tileInfo.lods.length-1,a.options.maximumAutoTileRequests)};f.prototype._selectTilesAutoPrefetchUpsample=function(a){return l(this,void 0,void 0,function(){var b,c;return m(this,function(d){switch(d.label){case 0:return b=
a.layer.tileInfo,[4,this._populateElevationTiles(a)];case 1:return d.sent(),c=!1,a.forEachTileToFetch(function(a,d){b.upsampleTile(a)?c=!0:d()}),c?[4,this._selectTilesAutoPrefetchUpsample(a)]:[3,3];case 2:d.sent(),d.label=3;case 3:return[2]}})})};f.prototype._sampleGeometryWithElevation=function(a){a.geometry.coordinates.forEach(function(b){var c=b.elevationTile,d=a.options.noDataValue;c&&(c=c.sample(b.x,b.y),void 0!==c?d=c:b.elevationTile=null);b.z=d})};f.prototype._extractSampleInfo=function(a){var b=
a.layer.tileInfo,c=C.getMetersPerUnitForSR(b.spatialReference);return a.geometry.coordinates.map(function(d){var e=-1;d.elevationTile&&d.elevationTile!==a.outsideExtentTile&&(e=b.lodAt(d.elevationTile.tile.level).resolution*c);return{demResolution:e}})};return f}();t.ElevationQuery=v;var r=function(){function f(){}f.prototype.export=function(){return this._exporter(this.coordinates,this.spatialReference)};f.prototype.clone=function(a){var b=this,c=new f;c.geometry=this.geometry;c.spatialReference=
this.spatialReference;c.coordinates=a||this.coordinates.map(function(a){return b._cloneCoordinate(a)});c._exporter=this._exporter;return c};f.prototype.project=function(a){var b=this;if(this.spatialReference.equals(a))return this.clone();if(q.canProject(this.spatialReference,a)){var c=a.isWGS84?q.xyToLngLat:q.lngLatToXY,d=[0,0],e=this.coordinates.map(function(a){a=b._cloneCoordinate(a);c(a.x,a.y,d);a.x=d[0];a.y=d[1];return a}),e=this.clone(e);e.spatialReference=a;return e}return null};f.prototype._cloneCoordinate=
function(a){return{x:a.x,y:a.y,z:a.z,tile:null,elevationTile:null}};f.fromGeometry=function(a){var b=new f;b.geometry=a;b.spatialReference=a.spatialReference;if(a instanceof f)b.coordinates=a.coordinates.map(function(a){return b._cloneCoordinate(a)}),b._exporter=function(b,c){b=a.clone(b);b.spatialReference=c;return b};else switch(a.type){case "point":b.coordinates=a.hasM?[{x:a.x,y:a.y,m:a.m}]:[{x:a.x,y:a.y}];b._exporter=function(b,c){return a.hasM?new B(b[0].x,b[0].y,b[0].z,b[0].m,c):new B(b[0].x,
b[0].y,b[0].z,c)};break;case "multipoint":b.coordinates=a.points.map(function(b){return a.hasM?{x:b[0],y:b[1],m:b[a.hasZ?3:2]}:{x:b[0],y:b[1]}});b._exporter=function(b,c){return a.hasM?new A({points:b.map(function(a){return[a.x,a.y,a.z,a.m]}),hasZ:!0,hasM:!0,spatiaReference:c}):new A(b.map(function(a){return[a.x,a.y,a.z]}),c)};break;case "polyline":var c=[],d=[],e=0;a.paths.forEach(function(b){d.push([e,e+b.length]);e+=b.length;c.push.apply(c,b.map(function(b){return a.hasM?{x:b[0],y:b[1],m:b[a.hasZ?
3:2]}:{x:b[0],y:b[1]}}))});b.coordinates=c;b._exporter=function(b,c){var e=a.hasM?b.map(function(a){return[a.x,a.y,a.z,a.m]}):b.map(function(a){return[a.x,a.y,a.z]});b=d.map(function(a){return e.slice(a[0],a[1])});return new G({paths:b,hasM:a.hasM,hasZ:!0,spatialReference:c})}}return b};return f}();t.GeometryDescriptor=r;var F=function(){return function(f,a){this.layer=f;this.options=a}}(),H=function(f){function a(a,c,d){a=f.call(this,a,d)||this;a.type="geometry";a.outSpatialReference=c;return a}
y(a,f);a.prototype.selectTilesAtLOD=function(a,c){if(0>a)this.geometry.coordinates.forEach(function(a){return a.tile=null});else{var b=this.layer.tileInfo,e=b.lods[a].level;this.geometry.coordinates.forEach(function(a){a.tile=b.tileAt(e,a.x,a.y)})}};a.prototype.allElevationTilesFetched=function(){return!this.geometry.coordinates.some(function(a){return!a.elevationTile})};a.prototype.clearElevationTiles=function(){for(var a=0,c=this.geometry.coordinates;a<c.length;a++){var d=c[a];d.elevationTile!==
this.outsideExtentTile&&(d.elevationTile=null)}};a.prototype.populateElevationTiles=function(a){for(var b=0,d=this.geometry.coordinates;b<d.length;b++){var e=d[b];!e.elevationTile&&e.tile&&(e.elevationTile=a[e.tile.id])}};a.prototype.remapTiles=function(a){for(var b=0,d=this.geometry.coordinates;b<d.length;b++){var e=d[b];e.tile=a[e.tile.id]}};a.prototype.getTilesToFetch=function(){for(var a={},c=[],d=0,e=this.geometry.coordinates;d<e.length;d++){var g=e[d],f=g.tile;g.elevationTile||!g.tile||a[f.id]||
(a[f.id]=f,c.push(f))}return c};a.prototype.forEachTileToFetch=function(a,c){c=function(b){b.tile&&!b.elevationTile&&a(b.tile,function(){return b.tile=null})};for(var b=0,e=this.geometry.coordinates;b<e.length;b++)c(e[b])};return a}(F),I=function(f){function a(a,c,d,e){d=f.call(this,a,d)||this;d.type="extent";d.elevationTiles=[];d.candidateTiles=[];d.fetchedCandidates=new Set;d.extent=c.intersection(a.fullExtent);d.maskExtents=e;return d}y(a,f);a.prototype.selectTilesAtLOD=function(a,c){c=this._maximumLodForRequests(c);
a=Math.min(c,a);0>a?this.candidateTiles.length=0:this._selectCandidateTilesCoveringExtentAt(a)};a.prototype._maximumLodForRequests=function(a){var b=this.layer.tileInfo;if(!a)return b.lods.length-1;for(var d=this.extent,e=b.lods.length-1;0<=e;e--){var g=b.lods[e];if(Math.ceil(d.width/(g.resolution*b.size[0]))*Math.ceil(d.height/(g.resolution*b.size[1]))<=a)return e}return-1};a.prototype.allElevationTilesFetched=function(){return this.candidateTiles.length===this.elevationTiles.length};a.prototype.clearElevationTiles=
function(){this.elevationTiles.length=0;this.fetchedCandidates.clear()};a.prototype.populateElevationTiles=function(a){for(var b=0,d=this.candidateTiles;b<d.length;b++){var e=d[b],g=a[e.id];g&&(this.fetchedCandidates.add(e),this.elevationTiles.push(g))}};a.prototype.remapTiles=function(a){this.candidateTiles=this._uniqueNonOverlappingTiles(this.candidateTiles.map(function(b){return a[b.id]}))};a.prototype.getTilesToFetch=function(){return this.candidateTiles};a.prototype.forEachTileToFetch=function(a,
c){var b=this,e=this.candidateTiles;this.candidateTiles=[];e.forEach(function(d){if(b.fetchedCandidates.has(d))c&&c(d);else{var e=!1;a(d,function(){return e=!0});e?c&&c(d):b.candidateTiles.push(d)}});this.candidateTiles=this._uniqueNonOverlappingTiles(this.candidateTiles,c)};a.prototype._uniqueNonOverlappingTiles=function(a,c){for(var b={},e=[],g=0;g<a.length;g++){var f=a[g];b[f.id]?c&&c(f):(b[f.id]=f,e.push(f))}var k=e.sort(function(a,b){return a.level-b.level});return k.filter(function(a,b){for(var d=
0;d<b;d++)if(w.contains(k[d].extent,a.extent))return c&&c(a),!1;return!0})};a.prototype._selectCandidateTilesCoveringExtentAt=function(a){this.candidateTiles.length=0;var b=this.layer.tileInfo,d=b.lods[a],e=this.extent;a=b.tileAt(d.level,e.xmin,e.ymin);for(var f=Math.ceil((e.xmax-a.extent[0])/(d.resolution*b.size[0])),d=Math.ceil((e.ymax-a.extent[1])/(d.resolution*b.size[1])),e=0;e<d;e++)for(var h=0;h<f;h++){var k={id:null,level:a.level,row:a.row-e,col:a.col+h};b.updateTileInfo(k);this._tileIsMasked(k)||
this.candidateTiles.push(k)}};a.prototype._tileIsMasked=function(a){return this.maskExtents?this.maskExtents.some(function(b){return w.contains(b,a.extent)}):!1};return a}(F);t.default=v});