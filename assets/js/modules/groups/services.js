'use strict';
 
angular.module('groups')
.factory('GroupService', function(auth, ApiService){
	var listCallback = undefined;
	return {
		list:function(){
			ApiService.easypost('/group/list',{},listCallback);
		},
		new:function(nome){
			var self = this;
			ApiService.easypost('/group/new',{
				nome:nome
			},function(status){
				if(listCallback){
					self.list();
				}
			});
		},
		get:function(gid, callback){
			ApiService.easypost('/group/get',{
				id:gid
			},callback);
		},
		destroy:function(gid, callback){
			ApiService.easypost('/group/destroy',{
				id:gid
			},callback);
		},
		setCallback:function(c){
			listCallback = c;
		}
	}
})