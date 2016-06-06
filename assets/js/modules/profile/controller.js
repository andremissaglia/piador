'use strict';

angular.module('profile', [])

.directive('post', function(){
    return {
        restrict:'E',
        templateUrl:'templates/post.html'
    }
})
.controller('ProfileController', ['$scope', '$routeParams', 'usermodel', 'FriendService', 'auth', function($scope, $routeParams, usermodel, FriendService, auth){
	var id = $routeParams.userid;
	$scope.user = {};
	$scope.amigo = false;
	$scope.segue = {}
	usermodel.get(id, function(usr){
		$scope.user = usr;
	});
	FriendService.getFriendship(auth.currentUser.id, id, function(follow){
		if(follow){
			$scope.amigo = true;
			$scope.segue = follow;
		} else {
			$scope.amigo = false;
		}
	})
	$scope.follow = function(id){
		FriendService.follow(id, function(){
			$scope.amigo = true;
		});
	};
	$scope.unfollow = function(id){
		FriendService.unfollow(id, function(){
			$scope.amigo = false;
		});
	};
}])
//Mostra os posts do usuário logado
.controller('UserPostsController', ['$scope', 'postService', function($scope, postService) {
	$scope.posts = [];
	var setPosts = function(){
		postService.fetchUserPosts(function(tweets){
			$scope.posts = tweets;
		});
	};
	postService.setCallback(setPosts);
	setPosts();
}])
//Mostra os posts
.controller('PostsController', ['$scope', 'postService','$routeParams', function($scope, postService, $routeParams) {
	var id = $routeParams.userid;
	$scope.posts = [];
	postService.fetchPosts(id, function(tweets){
		$scope.posts = tweets;
	});
}])
.controller('NewPostController', ['$scope', 'postService', function($scope, postService){
	$scope.title = '';
	$scope.message = '';

	$scope.post = function(){
		postService.new($scope.title, $scope.message);
		$scope.title = '';
		$scope.message = '';
	};
}]);