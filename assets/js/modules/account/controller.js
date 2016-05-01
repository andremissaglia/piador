'use strict';
 
angular.module('account')
.controller('LoginController',["$scope", "$rootScope", "$location", "auth",function($scope, $rootScope, $location, auth){
	$rootScope.hideMenu = true;
	$scope.email='';
	$scope.senha='';
	$scope.login = function(){
		if(auth.login($scope.email, $scope.senha)){
			$location.path('/posts');
			$rootScope.hideMenu = false;
		}
	}
}])
.controller('SettingsController',["$scope", "$location", "auth", "usermodel",function($scope, $location, auth, usermodel){
	$scope.user = usermodel.get(auth.current);
	$scope.save = function(){
		usermodel.save(auth.current, $scope.user);
		$location.path('/posts');
	}
}]);