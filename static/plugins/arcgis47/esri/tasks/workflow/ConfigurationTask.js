// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["dojo/_base/lang","../../request","./WMBaseTask","./support/Enum","./support/Util"],function(d,e,k,l,m){var h=new l,f=new m;return k.createSubclass({declaredClass:"esri.tasks.workflow.ConfigurationTask",properties:{url:{}},getServiceInfo:function(a){var b=this.parsedUrl.path,c=this._encode(d.mixin({},this.parsedUrl.query,{f:"json"}));a=this._generateOptions(c,a);return e(b,a).then(function(a){for(var b=a.data.jobTypes,g=0;g<b.length;g++)b[g].state&&(b[g].state=h.jobTypeStateJsonDict.fromJSON(b[g].state));
return a.data})},getJobTypeDetails:function(a,b){a=this.parsedUrl.path+"/jobTypes/"+a;var c=this._encode(d.mixin({},this.parsedUrl.query,{f:"json"}));b=this._generateOptions(c,b);return e(a,b).then(function(a){a=a.data;a.state&&(a.state=h.jobTypeStateJsonDict.fromJSON(a.state));a.defaultAssignedType&&(a.defaultAssignedType=h.jobAssignmentTypeJsonDict.fromJSON(a.defaultAssignedType));a.defaultStartDate&&(a.defaultStartDate=f._convertToDate(a.defaultStartDate));a.defaultDueDate&&(a.defaultDueDate=f._convertToDate(a.defaultDueDate));
return a})},getVisibleJobTypes:function(a,b){var c=this.parsedUrl.path+"/visibleJobTypes";a={user:f._formatDomainUsername(a),f:"json"};a=this._encode(d.mixin({},this.parsedUrl.query,a));b=this._generateOptions(a,b);return e(c,b).then(function(a){for(var b=a.data.jobTypes,c=0;c<b.length;c++)b[c].state&&(b[c].state=h.jobTypeStateJsonDict.fromJSON(b[c].state));return a.data.jobTypes})},getDataWorkspaceDetails:function(a,b){var c={user:f._formatDomainUsername(a.user)};return this._sendRequest(c,"/dataWorkspaces/"+
a.dataWorkspaceId+"/info",b)},getTableRelationshipsDetails:function(a){var b=this.parsedUrl.path+"/tableRelationships",c=this._encode(d.mixin({},this.parsedUrl.query,{f:"json"}));a=this._generateOptions(c,a);return e(b,a).then(function(a){return a.data.tableRelationships})},getPublicJobQueryDetails:function(a,b){return this._sendRequest({},"/publicQueries/"+a,b)},getUserJobQueryDetails:function(a,b){return this._sendRequest({},"/community/users/"+f._formatDomainUsername(a.user)+"/queries/"+a.queryId,
b)},getAllUsers:function(a){var b=this.parsedUrl.path+"/community/users",c=this._encode(d.mixin({},this.parsedUrl.query,{f:"json"}));a=this._generateOptions(c,a);return e(b,a).then(function(a){return a.data.users})},getUser:function(a,b){return this._sendRequest({},"/community/users/"+f._formatDomainUsername(a),b)},getAllGroups:function(a){var b=this.parsedUrl.path+"/community/groups",c=this._encode(d.mixin({},this.parsedUrl.query,{f:"json"}));a=this._generateOptions(c,a);return e(b,a).then(function(a){return a.data.groups})},
getGroup:function(a,b){return this._sendRequest({},"/community/groups/"+a,b)}})});