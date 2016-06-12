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
		fetchTimeline: function(callback){
			ApiService.post('tweet/timeline',{},
			function (response) {
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
			post = post.replace(/#[a-zA-Z0-9]+/g, function(m){
				var tema = m.slice(1);
				return '<a href="#/temas/'+tema+'">'+m+'</a>';
			});
			//mention -- nao da pra saber se eh usuario ou grupo
			post = post.replace(/@[a-zA-Z0-9]+/g, function(m){
				var mention = m.slice(1);
				return '<a href="#/mention/'+mention+'">'+m+'</a>';
			});
			//link
			post = post.replace(/\$l:"[^" <>]+"/g, function(m){
				var link = m.slice(4,-1);
				return '<a href="'+link+'">'+link+'</a>';
			});
			//imagem
			post = post.replace(/\$i:"[^" <>]+"/g, function(m){
				var link = m.slice(4,-1);
				return '<img src="'+link+'" />';
			});
			//video
			post = post.replace(/\$v:"[^" <>]+"/g, function(m){
				var link = m.slice(4,-1);
				return '</p><video controls><source src="'+link+'"></video><p>';
			});
			//quebra de linha com dois enters
			post = post.replace(/\n{2,}/g, function(m){
				return '</p><p>';
			});
			return post;
		}
	};
});