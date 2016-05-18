angular.module('posts')

.factory('postService', function(){
	var callback  = undefined;
	var posts = [];
	return {
		new: function(title,post){
			var post = {
				id:1,
				user:1,
				title: title,
				text: post,
				timestamp: "2016-05-10 10:23:45 TZ=-3"
			};
			posts.unshift(post);
			if(callback != undefined){
				callback();
			}
		},
		get: function(){
			return posts;
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