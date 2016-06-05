'use strict';

angular.module('profile')

.factory('postService', function(auth, ApiService){
	var callback  = undefined;
	return {
		new: function(title,post){
			ApiService.post('tweet/tweet',{
				'tweet': {
					'title': title,
					'text': post,
				}
			}, function(response) {
				if(callback != undefined){
					callback();
				}
			}, function(response) {})
		},
		fetchUserPosts: function(callback){
			ApiService.post('tweet/get',{
				user:auth.currentUser.id
			},function (response) {
				callback(response.data);
			},function (response) {});
		},
		fetchPosts: function(uid, callback){
			ApiService.post('tweet/get',{
				user:uid
			},function (response) {
				callback(response.data);
			},function (response) {});
		},
		setCallback: function(setCall){
			callback = setCall;
		}
	};
});

// "id": 7345,
// "user": 1,
// "title": "Titulo desse tweet",
// "text": "Texto desse tweet",
// "timestamp": "2016-05-10 10:23:45 TZ=-3"