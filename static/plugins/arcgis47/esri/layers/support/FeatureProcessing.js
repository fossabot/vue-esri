// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/lang ../../core/accessorSupport/decorators ../../layers/support/Field".split(" "),function(m,n,h,d,k,l,c,g){return function(f){function a(){return null!==f&&f.apply(this,arguments)||this}h(a,f);e=a;a.fromWorker=function(b){if(!b)return null;var a=new e;a.fields=b.fields&&b.fields.map(function(a){return g.fromJSON(a)});a.options=b.options;a.process=new (Function.bind.apply(Function,
[void 0].concat(b.process.args,[b.process.body])));return a};a.prototype.clone=function(){return new e(l.clone({fields:this.fields,options:this.options,process:this.process}))};a.prototype.toWorker=function(){var a=this.process.toString();return{fields:this.fields,options:this.options,process:{body:a.substring(a.indexOf("{")+1,a.lastIndexOf("}")),args:a.slice(a.indexOf("(")+1,a.indexOf(")")).match(/([^\s,]+)/g)}}};d([c.property({type:[g]})],a.prototype,"fields",void 0);d([c.property()],a.prototype,
"options",void 0);d([c.property()],a.prototype,"process",void 0);return a=e=d([c.subclass("esri.layers.support.FeatureProcessing")],a);var e}(c.declared(k))});