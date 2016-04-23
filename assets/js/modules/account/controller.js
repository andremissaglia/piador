'use strict';
 
angular.module('account')
.controller('LoginController',["$scope", "$location", "auth",function($scope, $location, auth){
	$scope.email='';
	$scope.senha='';
	$scope.login = function(){
		auth.login($scope.email, $scope.senha);
		$location.path('/posts')
	}
}]);