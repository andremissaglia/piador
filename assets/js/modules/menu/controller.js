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
.controller('FooterController', ['$scope', '$location', function($scope, $location){
	$scope.home = function(path){
		$location.path('/');
	};
	$scope.grupo = function(path){
		$location.path('/grupo');
	};
}])
.directive('topmenu', function(){
    return {
        restrict:'E',
        templateUrl:'templates/menu.html',
        controller:'MenuController'
    }
})
.directive('footermenu', function(){
    return {
        restrict:'E',
        templateUrl:'templates/footer.html',
        controller:'FooterController'
    }
});