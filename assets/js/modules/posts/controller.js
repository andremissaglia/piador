angular.module('posts', [])

.directive('post', function(){
    return {
        restrict:'E',
        templateUrl:'templates/post.html'
    }
})
.controller('PostsController', ['$scope', 'postService', function($scope, postService) {
	$scope.posts = [];
	var setPosts = function(){
		postService.fetchUserPosts(function(tweets){
			$scope.posts = tweets;
		});
	};
	postService.setCallback(setPosts);
	setPosts();
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