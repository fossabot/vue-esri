// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","./arcadeAsyncRuntime","./parser"],function(f,a,d,e){Object.defineProperty(a,"__esModule",{value:!0});a.compileScript=function(c,b){return function(b,a){return d.executeScript(c,b,a)}};a.extend=function(c){d.extend(c)};a.parseScript=function(c){return e.parseScript(c)};a.validateScript=function(c,b){return e.validateScript(c,b,"full")};a.scriptCheck=function(c,b,a){return e.scriptCheck(c,b,a,"full")};a.parseAndExecuteScript=function(c,b,a){return d.executeScript(e.parseScript(c),
b,a)};a.executeScript=function(c,b,a){return d.executeScript(c,b,a)};a.referencesMember=function(a,b){return d.referencesMember(a,b)};a.referencesFunction=function(a,b){return d.referencesFunction(a,b)};a.extractFieldLiterals=function(a,b){void 0===b&&(b=!1);return e.extractFieldLiterals(a,b)}});