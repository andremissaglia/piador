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
		getByName:function(name, callback){
			ApiService.post('/group/getByName',{
				nome:name
			},function(response){
				callback(response.data.id);
			},function(response){
				callback(-1);
			});
		},
		getUsers:function(gid, callback){
			ApiService.easypost('/group/getUsers',{
				id:gid
			},callback);
		},
		destroy:function(gid, callback){
			ApiService.easypost('/group/destroy',{
				id:gid
			},callback);
		},
		associate:function(gid, username, callback){
			ApiService.easypost('/group/associar', {
				gid:gid,
				username:username
			}, callback);
		},
		desassociate:function(gid, uid, callback){
			ApiService.easypost('/group/desassociar', {
				gid:gid,
				uid:uid
			}, callback);
		},
		timeline:function(gid, callback){
			ApiService.easypost('/tweet/grouptimeline', {
				gid:gid,
			}, callback);	
		},
		setCallback:function(c){
			listCallback = c;
		}
	}
})