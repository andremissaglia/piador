'use strict';

angular.module('profile')

.factory('postService', function(auth, ApiService, $sce){
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
		},
		parsePost:function(post){
			//tema
			post = post.replace(/#([a-zA-Z0-9]+)/g, function(m){
				var tema = m.slice(1);
				return '<a href="#/temas/'+tema+'">'+m+'</a>';
			});
			//mention
			post = post.replace(/@([a-zA-Z0-9]+)/g, function(m){
				var mention = m.slice(1);
				return '<a href="#/user/'+mention+'">'+m+'</a>';
			});
			return post;
		}
	};
});