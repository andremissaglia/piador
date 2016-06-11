'use strict';
 
angular.module('search')
.controller('SearchController', ['$scope', '$routeParams', 'SearchService', function($scope, $routeParams, SearchService){
	$scope.users = [];
	var termo = $routeParams.termo;
	SearchService.search(termo, function(users){
		$scope.users = users;
	});
}])
.controller('SearchBarController', ['$scope', '$location', function($scope, $location){
	$scope.termo = '';
	$scope.search = function(){
		if($scope.termo == '') return;
		$location.path('/search/'+$scope.termo);
	}
}]);;