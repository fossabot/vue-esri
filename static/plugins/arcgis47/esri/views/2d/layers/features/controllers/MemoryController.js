// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/assignHelper ../../../../../geometry ../../../../../core/Error ../../../../../core/Logger ../../../../../core/promiseUtils ../../../../../core/workers ../../../../../core/accessorSupport/decorators ../../../../../geometry/support/spatialReferenceUtils ../../../../../layers/support/FeatureProcessing ../../../../../tasks/support/QuantizationParameters ../../../../../tasks/support/Query ../../../ViewState ./BaseController ../../../tiling/TileInfoView ../../../tiling/TileQueue".split(" "),
function(n,p,u,k,q,v,w,x,r,y,g,t,z,A,B,C,D,E,F){Object.defineProperty(p,"__esModule",{value:!0});var G=x.getLogger("esri.views.2d.layers.features.controllers.MemoryController");n=function(m){function b(){var a=null!==m&&m.apply(this,arguments)||this;a.type="memory";a._processingInMainThread=!1;a._promises=new Map;return a}u(b,m);b.prototype.initialize=function(){var a=this;this._tileQueue=new F({tileInfoView:new E(this.tileStore.tileInfo),process:function(d){return a._fetchFeatureSet(d)}});this._memorySource=
y.open(this.service.source,{client:this});this.handles.add(this.watch("processor",this._switchProcessor.bind(this)))};b.prototype.destroy=function(){this._promises.forEach(function(a){return a.cancel()});this._promises.clear()};Object.defineProperty(b.prototype,"processing",{get:function(){return z.fromWorker(this.configuration.processing)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"updating",{get:function(){return 0<this._promises.size},enumerable:!0,configurable:!0});b.prototype.setViewState=
function(a){this._viewState=C.fromJSON(a);this._tileQueue.pause();this._tileQueue.state=this._viewState;this._tileQueue.resume()};b.prototype.queryFeatures=function(a){return this._memorySource.invoke("queryFeatures",a)};b.prototype.queryFeatureCount=function(a){return this._memorySource.invoke("queryFeatureCount",a)};b.prototype.queryObjectIds=function(a){return this._memorySource.invoke("queryObjectIds",a)};b.prototype.queryExtent=function(a){return this._memorySource.invoke("queryExtent",a)};b.prototype.tileAdded=
function(a){this._fetchTile(a)};b.prototype.tileRemoved=function(a){var d=this._promises.get(a);d&&(d.cancel(),this._promises.delete(a),this.notifyChange("updating"))};b.prototype._switchProcessor=function(a,d){this.handles.remove("processor");this._tileQueue.pause();this._tileQueue.reset();a=0;for(d=this.tileStore.tiles;a<d.length;a++){var c=d[a];this._tileQueue.has(c.key)||this._fetchTile(c)}this._tileQueue.resume()};b.prototype._fetchTile=function(a){var d=this,c=this._tileQueue.push(a.key).then(function(c){d._cleanupPromise(a);
d.processor.featureSetReady(a,c)}).catch(function(c){d._cleanupPromise(a);"cancel"!==c.dojoType&&(d.processor.featureSetReady(a,null,c.message),G.error("query-error",{error:c}));return r.reject(c)});this._promises.set(a,c);this.notifyChange("updating")};b.prototype._fetchFeatureSet=function(a){var d=this,c=this.tileStore.findByKey(a);a=this._getQuantizationParameters(c);var l=this.processor.queryInfo,b=l.pixelBuffer*c.resolution,c=c.bounds.slice();c[0]-=b;c[1]-=b;c[2]+=b;c[3]+=b;return this._query(c,
l,a).then(function(a){var c=l.orderByFields;if(c){var c=c[0].split(" "),d=c[0];"DESC"===c[1]&&a.features.sort(function(a,c){return c.attributes[d]-a.attributes[d]})}return a}).then(function(a){return d._wrapPoints(a,l)}).then(function(a){return a.features.length?a:null})};b.prototype._query=function(a,d,c){var b=this,f=this._createQuery(a,c,d);return this.queryFeatures(f.toJSON()).then(function(a){return b._applyProcessing(a,f)})};b.prototype._createQuery=function(a,d,c){var b=new B;b.outFields=this.processor.queryInfo.outFields;
b.where=this.processor.queryInfo.definitionExpression||"1\x3d1";b.geometry=v.Extent.fromJSON({xmin:a[0],ymin:a[1],xmax:a[2],ymax:a[3],spatialReference:this.spatialReference});this.service.capabilities.query.supportsQuantization?(b.quantizationParameters=d,"esriGeometryPolyline"===this.service.geometryType&&(b.maxAllowableOffset=d.tolerance)):b.maxAllowableOffset=d.tolerance;b.resultType="tile";b.returnExceededLimitFeatures=!1;b.returnGeometry=!0;b.returnCentroid=c.returnCentroid;b.orderByFields=c.orderByFields;
return b};b.prototype._applyProcessing=function(a,b){var c=this.processing;if(!c)return a;if(this._processingInMainThread)return this.remoteClient.invoke("executeProcessing",{query:b.toJSON(),featureSet:JSON.stringify(a)}).then(function(a){return JSON.parse(a)});try{var d=c.process(a,b,c.options);return d?d:r.reject(new w("FeatureLayer","invalid processing.process() method, returns nothing"))}catch(f){return this._processingInMainThread=!0,this.remoteClient.invoke("executeProcessing",{query:b.toJSON(),
featureSet:JSON.stringify(a)}).then(function(a){return JSON.parse(a)})}};b.prototype._getQuantizationParameters=function(a){return A.default.fromJSON({mode:"view",originPosition:"upperLeft",tolerance:a.resolution,extent:{xmin:a.bounds[0],ymin:a.bounds[1],xmax:a.bounds[2],ymax:a.bounds[3],spatialReference:this.spatialReference}})};b.prototype._wrapPoints=function(a,b){if(0===a.features.length)return a;var c=b.returnCentroid;b=b.pixelBuffer;var d=a.geometryType,f=a.spatialReference,h=a.transform;if("esriGeometryPoint"!==
d&&"esriGeometryMultipoint"!==d&&!c||!t.isWrappable(f))return a;c=a.features;f=t.getInfo(f);h=Math.round((f.valid[1]-f.valid[0])/h.scale[0]);if(512===h){f=[];for(d=0;d<c.length;d++){var g=c[d],e=g.geometry,g=g.attributes;e&&(e.x<b?(e={geometry:q({},e),attributes:g},e.geometry.x+=h,f.push(e)):e.x>512-b&&(e={geometry:q({},e),attributes:g},e.geometry.x-=h,f.push(e)))}c.push.apply(c,f)}else for(f=0;f<c.length;f++)if(e=c[f].geometry)e.x<-b?e.x+=h:e.x>512+b&&(e.x-=h);return a};b.prototype._cleanupPromise=
function(a){this._promises.delete(a);this.notifyChange("updating")};k([g.property()],b.prototype,"configuration",void 0);k([g.property({readOnly:!0,dependsOn:["configuration"]})],b.prototype,"processing",null);k([g.property()],b.prototype,"updating",null);return b=k([g.subclass()],b)}(g.declared(D.default));p.default=n});