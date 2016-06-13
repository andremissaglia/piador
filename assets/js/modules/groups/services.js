'use strict';
 
angular.module('groups')
.factory('GroupService', function(auth, ApiService){
	return {
		list:function(callback){
			ApiService.post('/group/list',{},
			function(response){
				callback(response.data);
			}, function(response){})
		}
	}
})