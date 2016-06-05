'use strict';
 
angular.module('friends')
.factory('FriendService', function(ApiService){
	return {
		getFollows:function(callback){
			ApiService.post('/follow/getFollows',{}, function(response){
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
		follow:function(id, callback){
			ApiService.post('/follow/follow',{
				userid:id
			}, function(response){
				callback();
			}, function(response){});
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