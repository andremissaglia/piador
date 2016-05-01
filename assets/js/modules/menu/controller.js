'use strict';
angular.module('menu')
.controller('MenuController', ['$scope', '$location', 'auth', function($scope, $location, auth){
	$scope.itens = [
		{
			title:'Home',
			path:'/posts'
		},
		{
			title:'Preferências',
			path:'/settings'
		},
		{
			title:'Logout',
			path:'logout'
		},
	];
	$scope.go = function(path){
		if(path=='logout'){
			auth.logout();
			$location.path('/');
		} else {
			$location.path(path);
		}
	};
}])
.directive('topmenu', function(){
    return {
        restrict:'E',
        templateUrl:'templates/menu.html',
        controller:'MenuController'
    }
});