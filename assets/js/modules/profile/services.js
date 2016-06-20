'use strict';

angular.module('profile')

.factory('postService', function(auth, ApiService){
	var callback  = undefined; //monitora novos posts
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
		share: function(post){
			ApiService.post('tweet/share',{
				'post': post
			}, function(response) {
				if(callback != undefined){
					callback();
				}
			}, function(response) {})
		},
		fetchTimeline: function(callback){
			ApiService.easypost('tweet/timeline',{},callback);
		},
		fetchPosts: function(uid, callback){
			ApiService.easypost('tweet/get',{
				user:uid
			},callback);
		},
		setCallback: function(setCall){
			callback = setCall;
		},
		vote:function(post, value){
			ApiService.easypost('tweet/react', {
				tweet:post,
				value:value
			}, function(response){});
		},
		parsePost:function(post){
			//tema
			post = post.replace(/#[a-zA-Z0-9]+/g, function(m){
				var tema = m.slice(1);
				return '<a href="#/search/%23'+tema+'">'+m+'</a>';
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
			post = post.replace(/\n+/g, function(m){
				return '</p><p>';
			});
			return post;
		}
	};
})
.factory('MentionService', function($location, usermodel, GroupService){
	return function(username){
		GroupService.getByName(username, function(id){
			if(id >= 0){
				$location.path('#/grupos/'+id);
				return;
			}
			usermodel.getByLogin(username, function(id){
				if(id >= 0){
					$location.path('#/user/'+id);
				} else {
					$location.path('#/dashboard');
				}
				
			});
		});
		
	}
});