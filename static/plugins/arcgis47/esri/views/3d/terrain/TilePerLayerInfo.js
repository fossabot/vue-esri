// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ./TerrainConst ./TileAgentBase ./UpsampleInfo ../../vectorTiles/VectorTileDisplayObject ../../webgl/Texture".split(" "),function(k,l,e,f,d,g,h){return function(){function b(a){this.waitingAgents=[];this.rawData=this.requestPromise=this.loadingAgent=this.upsampleFromTile=this.tilemapRequest=this.tilemap=this.data=null;this.pendingUpdates=0;this.elevationBounds=void 0;this.init(a)}b.prototype.init=function(a){this.waitingAgents.length=0;this.data=null;this.dataInvalidated=this.dataMissing=
!1;this.rawData=this.requestPromise=this.loadingAgent=this.upsampleFromTile=this.tilemapRequest=this.tilemap=null;this.pendingUpdates=0;a===e.LayerClass.ELEVATION&&(this.elevationBounds=null)};b.prototype.invalidateSourceData=function(){this.tilemap=null;this.dataInvalidated=!0;this.dataMissing=!1;this.upsampleFromTile&&(d.Pool.release(this.upsampleFromTile),this.upsampleFromTile=null)};b.prototype.dispose=function(){this.loadingAgent&&this.loadingAgent!==f.AGENT_DONE&&(this.loadingAgent.dispose(),
this.loadingAgent=null);this.requestPromise&&(this.requestPromise.cancel(),this.requestPromise=null);this.tilemap=null;this.tilemapRequest&&(this.tilemapRequest.cancel(),this.tilemapRequest=null);this.upsampleFromTile&&(d.Pool.release(this.upsampleFromTile),this.upsampleFromTile=null);this.rawData=null;this.pendingUpdates=0;this.disposeData()};b.prototype.disposeData=function(){var a=this.data;a&&(a instanceof h?a.dispose():a instanceof g&&a.dispose(),this.data=null)};b.makeEmptyLayerInfo=function(a,
c){return c?(c.init(a),c):new b(a)};return b}()});