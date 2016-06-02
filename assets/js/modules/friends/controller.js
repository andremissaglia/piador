'use strict';
 
angular.module('friends')
.controller('FollowingController',['$scope', 'FriendService', function($scope, FriendService){
	$scope.follows = []
	FriendService.getFollows(function(follows){
		$scope.follows = follows;
	});
	$scope.unfollow = function(id){
		FriendService.unfollow(id, function(){
			FriendService.getFollows(function(follows){
				$scope.follows = follows;
			});
		});
	}
}]);