'use strict';
angular.module('menu')
.controller('MenuController', ['$scope', '$rootScope', 'auth','$location', function($scope, $rootScope, auth, $location){
	$scope.hideMenu=!auth.logado();
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
	$rootScope.$on('loginEvent', function(event){
		$scope.hideMenu=false;
	});
	$rootScope.$on('logoutEvent', function(event){
		$scope.hideMenu=true;
	});
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