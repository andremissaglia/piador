'use strict';
 
angular.module('search')
.controller('PostSearchController', ['$scope', 'SearchService', function($scope, SearchService){
	$scope.posts = [];
	// SearchService.searchUsers($scope.termo, function(users){
	// 	$scope.users = users;
	// });
}])
.controller('UserSearchController', ['$scope', 'SearchService', function($scope, SearchService){
	$scope.users = [];
	SearchService.searchUsers($scope.termo, function(users){
		$scope.users = users;
	});
}])
.controller('SearchController', ['$scope', '$routeParams', function($scope, $routeParams){
	$scope.termo = $routeParams.termo;
	if($scope.termo.indexOf('#') >= 0 || $scope.termo.indexOf('@') >= 0){
		$scope.tipo='posts';
	} else {
		$scope.tipo='users';
	}
	$scope.select = function(tipo){
		$scope.tipo = tipo;
	}
}])
.controller('SearchBarController', ['$scope', '$location','$rootScope', function($scope, $location, $rootScope){
	$scope.termo = '';
	$scope.search = function(){
		if($scope.termo == '') return;
		$location.path('/search/'+$scope.termo);
	}
	$rootScope.$on('logoutEvent', function(event){
		$scope.termo = '';
	});
}]);;