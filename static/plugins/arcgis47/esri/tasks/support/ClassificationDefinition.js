// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/JSONSupport ../../core/kebabDictionary ../../core/accessorSupport/decorators ../../symbols/Symbol ./ColorRamp".split(" "),function(m,n,f,c,g,h,b,k,l){var e=h({classBreaksDef:"class-breaks-definition",uniqueValueDef:"unique-value-definition"});return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;a.baseSymbol=null;a.colorRamp=null;a.type=null;return a}f(a,d);c([b.property({type:k,
json:{write:!0}})],a.prototype,"baseSymbol",void 0);c([b.property({type:l,json:{write:!0}})],a.prototype,"colorRamp",void 0);c([b.property({json:{read:e.read,write:e.write}})],a.prototype,"type",void 0);return a=c([b.subclass("esri.tasks.support.ColorRamp")],a)}(b.declared(g))});