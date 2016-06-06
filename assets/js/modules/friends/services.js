'use strict';

function filter(follow){
	//faz parse na data antes de passar adiante
	if(follow.timestamp){
		follow.timestamp = new Date(follow.timestamp)
	}
	return follow;
}
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
		getFriendship:function(uid1, uid2, callback){
			ApiService.post('/follow/view',{
				follower:uid1,
				follows:uid1,
			}, function(response){
				if(response.data.length > 0){
					callback(filter(response.data[0]));
				} else {
					callback(undefined)
				}
			}, function(response){});	
		}
	}
});