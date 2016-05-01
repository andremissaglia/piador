'use strict';
angular.module('menu')
.controller('MenuController', ['$scope', '$location', function($scope, $location){
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
			path:'/logout'
		},
	];
	$scope.go = function(path){
		$location.path(path);
	};
}])
.directive('topmenu', function(){
    return {
        restrict:'E',
        templateUrl:'templates/menu.html',
        controller:'MenuController'
    }
});