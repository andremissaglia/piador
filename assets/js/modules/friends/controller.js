'use strict';

angular.module('friends')
.controller('FollowController',['$scope', 'FriendService', 'auth', function($scope, FriendService, auth){
	$scope.follows = []
	$scope.followers = []
	var loaded = 0;
	var find = function(array, id){
		for (var i = array.length - 1; i >= 0; i--) {
			if(array[i].pessoa.id==id){
				return i;
			}
		}
		return -1;
	}
	var update = function(){
		loaded = 0;
		FriendService.getFollows(function(follows){
			$scope.follows = follows;
			loaded++;
			followReciproco();
		});
		FriendService.getFollowers(function(followers){
			$scope.followers = followers;
			loaded++;
			followReciproco();
		});
	}
	var followReciproco = function(){
		if(loaded < 2) {
			return;
		}
		// Algoritimo para ver a reciprocidade dos follows.
		// Eh quadratico mesmo, se eu quisesse algo decente
		// eu nao usava sails...
		for (var i = $scope.followers.length - 1; i >= 0; i--) {
			$scope.followers[i].reciproco=false;
		}
		for (var i = $scope.follows.length - 1; i >= 0; i--) {
			$scope.follows[i].reciproco=false;
			var j = find($scope.followers, $scope.follows[i].pessoa.id);
			if(j >= 0){
				$scope.follows[i].reciproco = true;
				$scope.followers[j].reciproco = true;
			}
		}
	}
	update();
	$scope.unfollow = function(id){
		FriendService.unfollow(id, function(){
			var i = find($scope.follows, id);
			if(i >= 0){
				//deixar o usuario na lista, mas constar que não segue mais
				$scope.follows[i].excluido=true;
			}
			i = find($scope.followers, id);
			if(i >= 0){
				$scope.followers[i].reciproco=false;
			}
		});
	}
	$scope.follow = function(id){
		FriendService.follow(id, function(){
			var i = find($scope.follows, id);
			if(i >= 0){
				$scope.follows[i].excluido=false;
			} else {
				update();
				return;
			}
			i = find($scope.followers, id);
			if(i >= 0){
				$scope.followers[i].reciproco=true;
			}
		});
	}
}]);