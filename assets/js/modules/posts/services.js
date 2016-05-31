angular.module('posts')

.factory('postService', function($http, $rootScope){
	var callback  = undefined;
	return {
		new: function(title,post){
			$http.post('tweet/new',{
				'token': $rootScope.token,
				'tweet': {
					'user': $rootScope.currentUser.id,
					'title': title,
					'text': post,
				}
			}).then(function(response) {
				if(callback != undefined){
					callback();
				}
			}, function(response) {})
		},
		fetchUserPosts: function(callback){
			$http.post('tweet/get',{
				token:$rootScope.token,
				user:$rootScope.currentUser.id
			}).then(function (response) {
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