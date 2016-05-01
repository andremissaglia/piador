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
.controller('LogoutController',["$rootScope", "$location", "auth",function($rootScope, $location, auth){
	$rootScope.hideMenu = true;
	$auth.logout();
	$location.path('/login');
}]);