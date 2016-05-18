angular.module('posts', [])

.directive('post', function(){
    return {
        restrict:'E',
        templateUrl:'templates/post.html'
    }
})
.controller('PostsController', ['$scope', 'postService', function($scope, postService) {
	$scope.posts = [];
	postService.setCallback(function(){
		$scope.posts = postService.get();
	});
	$scope.posts = postService.get();
/*	if(auth.logado){
		$scope.user=usermodel.get(auth.current);
	} else {
		$location.path('/login');
	}

	var postTitleArray = new Array("Lorem ipsum", "Dolor sit amet", "Consectetur adipisicing");
	var postTimeArray = new Array("06/03/2013 13:00", "04/04/2014 14:00", "05/05/2015 15:00");
	var postContentArray = new Array("Ut enim ad minim veniam", "Excepteur sint occaecat cupidatat", "deserunt mollit anim id est laborum.");
	var postCommentsArray = new Array("15", "42", "360");

	$scope.posts = [];
	for (var i = 0; i < 3; i++) {
		$scope.posts[i] = {
			postTitle: postTitleArray[i],
			postTime:postTimeArray[i],
			postContent:postContentArray[i],
			numberComments:postCommentsArray[i]
		}
	}*/
}])

.controller('NewPostController', ['$scope', 'postService', function($scope, postService){
	$scope.message = '';

	$scope.post = function(){
		console.log($scope.message);
		postService.new($scope.title, $scope.message);
		$scope.title = '';
		$scope.message = '';
	};
}]);