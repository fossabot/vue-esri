// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper dojo/has dojo/errors/CancelError dojo/promise/all ../../../core/Accessor ../../../core/Evented ../../../core/Handles ../../../core/Logger ../../../core/Promise ../../../core/promiseUtils ../../../core/watchUtils ../../../core/accessorSupport/decorators ../../../core/sql/WhereClause ../../../layers/IntegratedMeshLayer ../../../layers/SceneLayer ../../../views/3d/layers/SceneLayerView3D ../../../views/3d/layers/i3s/I3SIndexTraversal ../../../views/3d/layers/i3s/I3SLodHandling ../../../views/3d/layers/i3s/I3SNodeLoader ../../../views/3d/layers/i3s/I3SUtil ../../../views/3d/layers/i3s/I3SViewportQueries ../../../views/3d/layers/i3s/IdleQueue ../../../views/3d/lib/glMatrix ../../../views/3d/support/projectionUtils ../../../views/3d/support/PromiseLightweight ../../../views/3d/support/ResourceController".split(" "),
function(Q,R,B,f,q,r,C,D,E,F,G,H,w,t,d,I,x,m,y,J,K,n,p,L,M,k,N,O,P){function z(d,b){return d.length===b.length&&d.every(function(a){return 0<=u(b,a.name)})}function u(d,b){b=b.toLowerCase();for(var a=0;a<d.length;a++)if(d[a].name.toLowerCase()===b)return a;return-1}var h=G.getLogger("esri.layers.graphics.controllers.I3SOnDemandController");return function(A){function b(a){a=A.call(this)||this;a.nodeIndex={};a.screenSizeFactor=0;a.updating=!0;a.updatingPercentage=0;a._lodFactorProperty=null;a._isIdle=
!1;a._cameraDirty=!0;a._alwaysLoadEverythingModeEnabled=!1;a._uncompressedTextureDownsamplingEnabled=!1;a._processLambda=null;a._loadingNodes=new Map;a._updatingNodes=new Map;a._dirtyNodes=!1;a._numUnloadedNodes=0;a._progressMaxNumNodes=1;a._unloadedMemoryEstimate=0;a._poi=null;a._requiredAttributesDirty=!0;a._updatesDisabled=!1;a.disableCache=!1;a._restartNodeLoading=!1;a._fields=null;a._attributeStorageInfo=null;a._handles=new F;a._idleQueue=new M.IdleQueue;a._errorCount=0;return a}B(b,A);Object.defineProperty(b.prototype,
"isMeshPyramid",{get:function(){return"mesh-pyramids"===this.layer.profile||"MeshPyramid"===this.layer.store.lodType},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"streamDataSupplier",{get:function(){return this.layerView.view.resourceController.registerClient(this.layerView,P.ClientType.SCENE,{trackRequests:!0})},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"parsedDefinitionExpression",{get:function(){if(this.layer instanceof m&&this.layer.definitionExpression)try{var a=
I.create(this.layer.definitionExpression);if(!a.isStandardized())return h.error("definitionExpression is using non standard function"),null;var c=[],b=a.getFields();p.findFieldsCaseInsensitive(b,this.layer.fields,{missingFields:c});return 0<c.length?(h.error("definitionExpression references unknown fields: "+c.join(", ")),null):a}catch(e){return h.error("Failed to parse definitionExpression: "+e),null}else return null},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"definitionExpressionFields",
{get:function(){if(this.parsedDefinitionExpression){var a=this.parsedDefinitionExpression.getFields();return p.findFieldsCaseInsensitive(a,this._fields)}return null},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"crsVertex",{get:function(){return p.getVertexCrs(this.layer)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"crsIndex",{get:function(){return p.getIndexCrs(this.layer)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"rootNodeVisible",
{get:function(){var a=this._rootNodeId&&this.nodeIndex[this._rootNodeId];return a&&this._viewportQueries?this._viewportQueries.isNodeVisible(a):!0},enumerable:!0,configurable:!0});b.prototype.initialize=function(){var a=this;this.updateEventListener={needsUpdate:function(){return a._needsAnimationFrameHandler()},idleFrame:function(c){return a._processLogError(c)},idleBegin:function(){a._updateIdleState(!0)},idleEnd:function(){a._updateIdleState(!1)}};this.updateEventListenerWhileSuspended={idleBegin:function(){return a._startNodeLoadingWhileSuspended()}};
this._lodHandling=new K(this.layerViewRequiredFunctions,this.layerViewOptionalFunctions,function(){return a._evaluateUpdatingState()});this.layerView._controller=this;var c=this.layer;this._defaultGeometrySchema=c.store.defaultGeometrySchema;this._rootNodeUrl=c.store.rootNode;var b=this._rootNodeUrl.split("/");this._rootNodeId=b[b.length-1];this.disableCache=q("disable-feature:idb-cache");c instanceof m?("mesh"===c.geometryType?this._lodFactorProperty="qualitySettings.sceneService.3dObject.lodFactor":
"point"===c.geometryType&&(this._lodFactorProperty="qualitySettings.sceneService.point.lodFactor"),this._fields=c.fields,this._attributeStorageInfo=c.attributeStorageInfo):c instanceof x&&(this._lodFactorProperty="qualitySettings.sceneService.integratedMesh.lodFactor");c=C([this.layer.when(),this.layerView.when()]).then(function(){if(!a.destroyed&&a.layerView&&!a.layerView.destroyed){var c=a.layerView.view;a.setClippingArea(c.clippingArea);a._centerOnSurface=c.pointsOfInterest.centerOnSurfaceFrequent;
a._handles.add(a._centerOnSurface.watch("renderLocation",function(){return a._pointOfInterestChanged()}));var b=a.layerView.view.resourceController;b.getMemoryEvents().on("quality-changed",function(){return a._setCameraDirty()});var l=!1;a._processLambda=a._frame.bind(a);a._handles.add(t.init(a.layerView,"suspended",function(c){l&&(b.deregisterIdleFrameWorker(a),a.restartNodeLoading());c?(b.registerIdleFrameWorker(a,a.updateEventListenerWhileSuspended),b.deregisterFrameWorker(a._processLambda)):(b.registerIdleFrameWorker(a,
a.updateEventListener),b.registerFrameWorker(a._processLambda));l=!0}),"layerview");a._handles.add(a.layer.watch("elevationInfo",function(c){return a._elevationInfoChanged(c)}),"layer");a.layerView instanceof y&&a._handles.add([t.init(a.layerView,"alwaysLoadEverythingModeEnabled",function(c){a._alwaysLoadEverythingModeEnabled=c;a.restartNodeLoading()}),t.init(a.layerView,"uncompressedTextureDownsamplingEnabled",function(c){a._uncompressedTextureDownsamplingEnabled=c;a.restartNodeLoading()})],"layer");
a._handles.add(c.state.watch("camera",function(){return a._setCameraDirty()}));a._lodFactorProperty&&a._handles.add(a.layerView.view.watch(a._lodFactorProperty,function(){return a._setCameraDirty()}),"quality")}});this.addResolvingPromise(c);this.when(function(){return a._startNodeLoading()})};b.prototype.destroy=function(){this.layerView.view.resourceController.deregisterIdleFrameWorker(this);this.layerView.view.resourceController.deregisterFrameWorker(this._processLambda);this.layerView.view.resourceController.deregisterClient(this.layerView);
this._handles.destroy();this._nodeLoader=null};b.prototype._getRequiredAttributes=function(){if(!(null!=this._attributeStorageInfo&&this.layer instanceof m&&this._fields))return[];var a=Object.create(null);this.layer.renderer&&this.layer.renderer.collectRequiredFields(a);this.layer.labelsVisible&&this.layer.labelingInfo&&this.layer.labelingInfo.forEach(function(c){c._collectRequiredFields(a)});if(null!=this.definitionExpressionFields)for(var c=0,b=this.definitionExpressionFields;c<b.length;c++)a[b[c]]=
!0;var e=this._attributeStorageInfo,v=this._fields,d=this.layer.objectIdField;return Object.keys(a).map(function(a){var c=u(e,a);a=u(v,a);return 0<=c&&0<=a?{index:c,name:v[a].name,field:v[a],attributeStorageInfo:e[c]}:null}).filter(function(a){return null!=a&&a.name!==d}).sort(function(a,c){return c.index-a.index}).filter(function(a,c,b){return 0===c||b[c-1].index!==a.index})};b.prototype._requiredFieldsChange=function(){this._requiredAttributesDirty=!0;this.restartNodeLoading()};b.prototype._labelingChanged=
function(){var a=this._requiredAttributes,c=this._getRequiredAttributes();z(a,c)||this._requiredFieldsChange()};b.prototype.setClippingArea=function(a){var c=[];N.extentToBoundingBox(a,c,this.layerView.view.renderSpatialReference)?this._clippingArea=c:this._clippingArea=null};b.prototype._pointOfInterestChanged=function(){this._poi&&(this._calculatePointOfInterest(this._poi),this._viewportQueries&&this._viewportQueries.updatePointOfInterest(this._poi),this._indexLoader&&(this._indexLoader.progressiveLoadPenalty=
10*this._viewportQueries.distCameraToPOI(),this._indexLoader.requestReload()))};b.prototype._calculatePointOfInterest=function(a){void 0===a&&(a=k.vec3d.create());var c=this._centerOnSurface.renderLocation,b=k.vec3d.create();k.vec3d.subtract(c,this.camPos,b);k.vec3d.normalize(b);var e=this.layerView.view.renderCoordsHelper,d=k.vec3d.create();e.worldUpAtPosition(c,d);b=Math.acos(k.vec3d.dot(d,b))-.5*Math.PI;k.vec3d.lerp(this.camPos,c,Math.max(0,Math.min(1,b/(.5*Math.PI))),a);return a};b.prototype.updateClippingArea=
function(a){this.setClippingArea(a);this._cameraDirty=!0;this._viewportQueries&&this._viewportQueries.updateExtent(this._clippingArea)};b.prototype._setCameraDirty=function(){this._cameraDirty=!0;this._evaluateUpdatingState()};b.prototype.getBaseUrl=function(){return this.layer.parsedUrl.path};b.prototype.updateElevationChanged=function(a,c,b){p.findIntersectingNodes(a,c,this.nodeIndex.root,this.crsIndex,this.nodeIndex,b);for(a=0;a<b.length;a++)c=b.data[a],this._viewportQueries.invalidateCache(c.id),
c.id===this._rootNodeId&&this.notifyChange("rootNodeVisible");b.length&&this.restartNodeLoading()};b.prototype._elevationInfoChanged=function(a){this._viewportQueries.invalidateCache();this._initViewData()};b.prototype.restartNodeLoading=function(){this._restartNodeLoading=!0;this._evaluateUpdatingState()};b.prototype.schedule=function(a){return this._idleQueue.push(a)};b.prototype.getUnloadedMemoryEstimate=function(){return.8*this._unloadedMemoryEstimate*this._getLodDropFactor()};b.prototype._needsAnimationFrameHandler=
function(){return!0};b.prototype._frame=function(a){null!==this._viewportQueries&&this._viewportQueries.setCameraIdle(!this._cameraDirty);this.layerView.visible&&this._processLogError(a,!1)};b.prototype._processLogError=function(a,c){void 0===c&&(c=!0);try{this._process(a,c)}catch(l){50>this._errorCount?h.error("Error during processing: "+l):50===this._errorCount&&h.error("Too many errors for this layer. Further errors will not be displayed."),this._errorCount++}};b.prototype._process=function(a,
c){this._restartNodeLoading&&(this.cancelNodeLoading(),this._startNodeLoading());if(null!=this._nodeLoader&&null!=this._indexLoader){this._updateViewData();var b=this._indexLoader.isLoading();this._processIndex()&&(c=!1);b||this._dirtyNodes?c=this._processNodes(a,c):this._unloadedMemoryEstimate=this._numUnloadedNodes=0;for(;0<this._idleQueue.length()&&(c||!a.done());)c=!1,this._idleQueue.process();this._evaluateUpdatingState();this._lodHandling.lodGlobalHandling()}};b.prototype._processIndex=function(){var a=
Math.min(10-this._indexLoader.getNumLoading(),this._getAvailableLoadTokens(1));return 0<a?this._indexLoader.update(a):!1};b.prototype._processNodes=function(a,c){var b=this,e=Math.min(5-this._loadingNodes.size,this._getAvailableLoadTokens(2));if(0>=e)return this._dirtyNodes=!0,!1;e=this._collectUpdates(e);e.cancel.forEach(this._cancelNodeIdLoading,this);e.update.forEach(function(l){if(c||!a.done())c=!1,b._updateLoadedNode(l.id)});e.add.forEach(function(l,e){if(c||!a.done())c=!1,b._loadNode(b.nodeIndex[e])});
this._dirtyNodes=0<e.update.length||0<e.add.size;return c};b.prototype._cancelNodeLoading=function(){var a=this;this._loadingNodes.forEach(function(c,b){return a._cancelNodeIdLoading(b)});this._loadingNodes.clear();this._updatingNodes.forEach(function(c,b){return a._updatingNodes.get(b).cancel()});this._updatingNodes.clear()};b.prototype._cancelNodeIdLoading=function(a){this._loadingNodes.get(a).cancel();this._loadingNodes.delete(a)};b.prototype._getAvailableLoadTokens=function(a){return Math.floor((12-
1*this._indexLoader.getNumLoading()-2*this._loadingNodes.size)/a)};b.prototype._collectUpdates=function(a){var c=this,b=new Map,e=[],d=p.mapToKeys(this._loadingNodes),f=Number.NEGATIVE_INFINITY,k=0,h=0,m=0,n=0,q=0;this._numUnloadedNodes=0;this._indexLoader.traverseVisible(function(l){var g=c.nodeIndex[l.id];if(!g)return f=Math.max(f,c._indexLoader.entryPriority(l)),!0;if(g.failed||!g.featureData||0===g.featureData.length)return!0;if(c.layerViewRequiredFunctions.isBundleLoaded(g))return k+=g.memory,
++h,c._shouldLoadNode(g)||(q+=g.memory),c._needsUpdate(g)&&e.push({prio:c._indexLoader.entryPriority(g),id:g.id}),!0;g.memory&&(k+=g.memory,++h);if(!c._shouldLoadNode(g))return!0;++c._numUnloadedNodes;g.memory?n+=g.memory:++m;if(c._loadingNodes.has(g.id))return d=d.filter(function(a){return a!==g.id}),!0;p.buildTopNodeMap(b,a,g.id,c._indexLoader.entryPriority(l));return!0});this._unloadedMemoryEstimate=n-q;3<h&&(this._unloadedMemoryEstimate+=m*k/h);this._unloadedMemoryEstimate=Math.max(0,this._unloadedMemoryEstimate);
b.forEach(function(a,c){a<f&&b.delete(c)});e.sort(function(a,c){return c.prio-a.prio});return{update:e,add:b,cancel:d}};b.prototype._evaluateUpdatingState=function(){var a=(this._indexLoader?this._indexLoader.getNumPending():0)+3*this._numUnloadedNodes+2*this._loadingNodes.size,c=!(!(0<a||0<this._updatingNodes.size||this._indexLoader&&this._indexLoader.isLoading()||this._restartNodeLoading||this._cameraDirty||0<this._idleQueue.length()||this._lodHandling&&this._lodHandling.requiresLODGlobalHandling)&&
this._isIdle);0===a&&(this._progressMaxNumNodes=1);this._progressMaxNumNodes=Math.max(a,this._progressMaxNumNodes);c!==this._get("updating")&&this._set("updating",c);a=100*a/this._progressMaxNumNodes;a!==this._get("updatingPercentage")&&this._set("updatingPercentage",a)};b.prototype._initViewData=function(){var a=this.layerView.view,c=a.state.camera,b=a.renderCoordsHelper;this.camPos=k.vec3d.create(a.pointsOfInterest.renderPointOfView);this.screenSizeFactor=1/c.perPixelRatio;this._poi=this._calculatePointOfInterest();
var e=(this._lodFactorProperty&&this.layerView.view.get(this._lodFactorProperty)||1)*this._getLodMemoryFactor();this._viewportQueries=new L(this.crsIndex,b,c,this._poi,this._clippingArea,null!=this.layerViewOptionalFunctions.traversalOptions?this.layerViewOptionalFunctions.traversalOptions.errorMetricPreference:null,a.elevationProvider,this.layer.elevationInfo,{progressiveLoadFactor:this._getProgressiveLoadFactor(this.layer,e),screenspaceErrorBias:e,angleDependentLoD:.5>e,disableLod:this._alwaysLoadEverythingModeEnabled});
this._cameraDirty=!1;this.notifyChange("rootNodeVisible")};b.prototype._updateViewData=function(){if(this._cameraDirty&&this._indexLoader){var a=this.layerView.view,c=a.state.camera;this.camPos=k.vec3d.create(a.pointsOfInterest.renderPointOfView);this.screenSizeFactor=1/c.perPixelRatio;this._poi=this._calculatePointOfInterest(this._poi);this._viewportQueries.updateCamera(c);this._viewportQueries.updatePointOfInterest(this._poi);a=(this._lodFactorProperty&&this.layerView.view.get(this._lodFactorProperty)||
1)*this._getLodMemoryFactor();this._viewportQueries.updateScreenSpaceErrorBias(a);this._indexLoader.progressiveLoadPenalty=10*this._viewportQueries.distCameraToPOI();this._indexLoader.requestReload();this._alwaysLoadEverythingModeEnabled||this._removeInvisibleNodes();this._cameraDirty=!1;this.notifyChange("rootNodeVisible")}};b.prototype._getProgressiveLoadFactor=function(a,c){return a instanceof m&&"mesh"===a.geometryType?(a=1<=c&&q("enable-feature:progressive-3dobject"))?.05:1:a instanceof x?(a=
1<=c&&!q("disable-feature:progressive-im"))?.2:1:1};b.prototype._getLodMemoryFactor=function(){return this.layerView.view.resourceController.getMemoryFactor()};b.prototype._getLodDropFactor=function(){return Math.min(this._getLodMemoryFactor(),.5)/.5};b.prototype._startNodeLoadingWhileSuspended=function(){this._initViewData();this._alwaysLoadEverythingModeEnabled&&this.layerView.visible&&!this.layerView.get("parent.suspended")||this._removeInvisibleNodes()};b.prototype.isGeometryVisible=function(a){return this._viewportQueries.isGeometryVisible(a)};
b.prototype._shouldLoadNode=function(a){if(!this._lodHandling.shouldLoadNode(a))return!1;var c=this._getLodDropFactor();return 0<c&&0<this._viewportQueries.maxDistance&&this._lodHandling.childrenEmpty(a)&&this._viewportQueries.distToPOI(a)>this._viewportQueries.maxDistance*c?!1:a.obb?this._viewportQueries.isGeometryVisible(a):!0};b.prototype._startNodeLoading=function(){var a=this;this._restartNodeLoading=!1;if(!this._updatesDisabled&&null!=this.streamDataSupplier){this._initViewData();null!=this.layerViewOptionalFunctions.getLoadedAttributes&&
this._requiredAttributesDirty&&(this._requiredAttributes=this._getRequiredAttributes(),this._requiredAttributesDirty=!1,this._handles.add([this.layer.watch("renderer",function(){return a._requiredFieldsChange()}),this.layer.watch("definitionExpression",function(){return a._requiredFieldsChange()}),this.layer.watch("labelsVisible",function(){return a._labelingChanged()}),this.layer.watch("labelingInfo",function(){return a._labelingChanged()})],"requiredAttributes"));var c=this.layerViewOptionalFunctions.textureOptions,
b=n.TextureFormat.Normal;c&&c.useCompressedTextures?b=n.TextureFormat.Compressed:this._uncompressedTextureDownsamplingEnabled&&(b=n.TextureFormat.Downsampled);c=this._defaultGeometrySchema;this._nodeLoader=new n(this.streamDataSupplier,h,c,this._requiredAttributes,{textureFormat:b,loadTextureData:this.layerView instanceof y&&this.layerView.rendererNeedsTextures,loadFeatureData:!this.isMeshPyramid||null==c||null==c.ordering});b=10*this._viewportQueries.distCameraToPOI();this._indexLoader=new J(this.getBaseUrl(),
this._rootNodeUrl,this._rootNodeId,b,this.nodeIndex,this.streamDataSupplier,this._viewportQueries,h);this._alwaysLoadEverythingModeEnabled||this._removeInvisibleNodes();this._lodHandling.startNodeLoading(function(c){return a._viewportQueries.isNodeVisible(c)},function(c){return a._viewportQueries.isGeometryVisible(c)},function(c){return a._indexLoader.nodeTraversalState(c)},this.nodeIndex,this._rootNodeId,{maxLodLevel:this._viewportQueries.maxLodLevel});this.layerViewOptionalFunctions.additionalStartNodeLoadingHandler&&
this.layerViewOptionalFunctions.additionalStartNodeLoadingHandler();this._evaluateUpdatingState()}};b.prototype.isNodeLoading=function(){return null!=this._nodeLoader&&null!=this._indexLoader};b.prototype.cancelNodeLoading=function(){this.isNodeLoading()&&(this._indexLoader.cancel(),this._nodeLoader.cancel(),this.streamDataSupplier.cancelAll(),this._idleQueue.cancelAll(),this._cancelNodeLoading(),this._poi=this._indexLoader=this._nodeLoader=null,this.layerViewOptionalFunctions.additionalCancelNodeLoadingHandler&&
this.layerViewOptionalFunctions.additionalCancelNodeLoadingHandler(),this._evaluateUpdatingState())};b.prototype._removeInvisibleNodes=function(){for(var a=this.layerViewRequiredFunctions.getAddedNodeIDs(),c=this._getLodDropFactor(),b=this._viewportQueries.maxDistance*c,c=0<c&&0<b,e=0;e<a.length;e++){var d=this.nodeIndex[a[e]];if(!this._viewportQueries.isGeometryVisible(d)||c&&this._lodHandling.childrenEmpty(d)&&this._viewportQueries.distToPOI(d)>b)this._lodHandling.setLodGlobalDirty(),this.layerViewRequiredFunctions.removeNodeData(d)}};
b.prototype._needsUpdate=function(a){if(null==a.featureData||0===a.featureData.length||this._updatingNodes.has(a.id))return!1;var c=this.layerViewOptionalFunctions.getLoadedAttributes;a=null!=c?c(a):void 0;return null!=a&&a!==this._requiredAttributes};b.prototype._updateLoadedNode=function(a){var c=this,b=this.nodeIndex[a],d=b.baseUrl,f=this.layerViewOptionalFunctions.getLoadedAttributes(b),d=z(f,this._requiredAttributes)?w.resolve(this.layerViewOptionalFunctions.getAttributeData(b)):this._nodeLoader.loadAttributes(b,
d,this._requiredAttributes);this._updatingNodes.set(a,d);d.then(function(a){return c.schedule().then(function(){return c.layerViewOptionalFunctions.setAttributeData(b,c._requiredAttributes,a)})}).catch(function(a){a instanceof r||c.layerViewOptionalFunctions.setAttributeData(b,c._requiredAttributes,{})}).always(function(){c._updatingNodes.delete(a);c._evaluateUpdatingState()});this._evaluateUpdatingState()};b.prototype._loadNode=function(a){var c=this,b=new O.Promise;this._loadingNodes.set(a.id,b);
this._evaluateUpdatingState();this._loadAndAddBundle(a).always(function(){c._loadingNodes.delete(a.id);c._evaluateUpdatingState();b.done()});return b};b.prototype._loadAndAddBundle=function(a){var c=this;1!==a.featureData.length&&h.warn("Node ${node.id} has ${node.featureData.length} bundles. Only the first bundle will be loaded.");return this._loadCached(a).then(function(b){if(!b)return c._loadUncached(a)}).catch(function(b){if(!(b instanceof r))return c._loadUncached(a)})};b.prototype._loadCached=
function(a){var c=this,b=this.disableCache?null:this.layerViewOptionalFunctions.loadCachedBundle,d=this.disableCache?null:this.layerViewOptionalFunctions.addCachedBundle;return b&&d?this.schedule().then(function(){return b(a,function(a,b){return c._nodeLoader.loadTextures(a,b)})}).then(function(b){if(null==b)return!1;var e=c._requiredAttributes;return c.schedule().then(function(){return c._nodeLoader.loadAttributes(a,a.baseUrl,e)}).then(function(a){return c.schedule({loadedAttributes:e,attributeData:a})}).then(function(c){return d(a,
b,c)}).then(function(){c._lodHandling.lodSwapBundleLoaded(a);return!0})}):w.resolve(!1)};b.prototype._loadUncached=function(a){var b=this;return this.schedule().then(function(){return b._nodeLoader.loadBundleData(a,0)}).then(function(a){return b.schedule(a)}).then(function(c){return b.layerViewRequiredFunctions.addBundle(a,c)}).then(function(){return b._lodHandling.lodSwapBundleLoaded(a)}).catch(function(b){b instanceof r||(h.error("Failed to load node '"+a.id+"' bundle 0: "+b),a.failed=!0)})};b.prototype._updateIdleState=
function(a){a!==this._isIdle&&(this._isIdle=a,this._viewportQueries&&this._viewportQueries.setCameraIdle(!0),this._evaluateUpdatingState())};f([d.property({readOnly:!0})],b.prototype,"isMeshPyramid",null);f([d.property({readOnly:!0})],b.prototype,"streamDataSupplier",null);f([d.property({readOnly:!0,dependsOn:["layer.definitionExpression"]})],b.prototype,"parsedDefinitionExpression",null);f([d.property({readOnly:!0,dependsOn:["parsedDefinitionExpression"]})],b.prototype,"definitionExpressionFields",
null);f([d.property({readOnly:!0})],b.prototype,"crsVertex",null);f([d.property({readOnly:!0})],b.prototype,"crsIndex",null);f([d.property({readOnly:!0})],b.prototype,"nodeIndex",void 0);f([d.property()],b.prototype,"camPos",void 0);f([d.property()],b.prototype,"screenSizeFactor",void 0);f([d.property()],b.prototype,"layerView",void 0);f([d.property()],b.prototype,"layerViewRequiredFunctions",void 0);f([d.property()],b.prototype,"layerViewOptionalFunctions",void 0);f([d.property()],b.prototype,"layer",
void 0);f([d.property({readOnly:!0})],b.prototype,"updating",void 0);f([d.property({readOnly:!0})],b.prototype,"updatingPercentage",void 0);f([d.property({readOnly:!0})],b.prototype,"rootNodeVisible",null);return b=f([d.subclass("esri.layers.graphics.controllers.I3SOnDemandController")],b)}(d.declared(D,H,E))});