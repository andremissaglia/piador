'use strict';
 
angular.module('friends')
.factory('FriendService', function(ApiService){
	return {
		getFollows:function(callback){
			ApiService.post('/follow/getFollows',{}, function(response){
				console.log(response.data[0]);
				callback(response.data);
			}, function(response){
				callback([]);
			});
		},
		getFollowers:function(callback){
			ApiService.post('/follow/getFollowers',{}, function(response){
				callback(response.data);
			}, function(response){
				callback([]);
			});
		},
		unfollow:function(id, callback){
			ApiService.post('/follow/unfollow',{
				userid:id
			}, function(response){
				callback();
			}, function(response){});
		},
	}
});