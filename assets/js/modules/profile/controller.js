'use strict';

angular.module('profile', [])

.directive('post', function(){
    return {
        restrict:'E',
        templateUrl:'templates/post.html',
        controller:'PostController'
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
.controller('TimelineController', ['$scope', 'postService', function($scope, postService) {
	$scope.posts = [];
	var setPosts = function(){
		postService.fetchTimeline(function(tweets){
			$scope.posts = tweets;
		});
	};
	postService.setCallback(setPosts);
	setPosts();
}])
.controller('PostsController', ['$scope', 'postService','$routeParams', function($scope, postService, $routeParams) {
	var id = $routeParams.userid;
	$scope.posts = [];
	postService.fetchPosts(id, function(tweets){
		$scope.posts = tweets;
	});
}])
.controller('PostController', ['$scope', 'postService','$sce', function($scope, postService, $sce) {
	$scope.getParsedPost = function(){
		var text = $scope.post.text.replace(/</g,'&lt;');
		text = text.replace(/>/g,'&gt;');
		return $sce.trustAsHtml(postService.parsePost(text));
	}
	if($scope.post.owner){
		$scope.user = $scope.post.owner;
	}
	$scope.upvote = function(){
		if($scope.post.user_vote == 1){
			$scope.post.votes--;
			$scope.post.user_vote = 0;
		} else if($scope.user_vote == -1){
			$scope.post.votes=$scope.post.votes+2;
			$scope.post.user_vote = 1;
		} else{
			$scope.post.votes++;
			$scope.post.user_vote = 1;
		}
		postService.vote($scope.post.id, $scope.post.user_vote);
	}
	$scope.downvote = function(){
		if($scope.post.user_vote == -1){
			$scope.post.votes++;
			$scope.post.user_vote = 0;
		} else if($scope.post.user_vote == 1){
			$scope.post.votes=$scope.post.votes-2;
			$scope.post.user_vote = -1;
		} else{
			$scope.post.votes--;
			$scope.post.user_vote = -1;
		}
		postService.vote($scope.post.id, $scope.post.user_vote);
	}
	$scope.share = function(){
		postService.share($scope.post.id);
	}
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