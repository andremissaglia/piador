'use strict';
 
angular.module('groups')
.directive('grupos', function(){
    return {
        restrict:'E',
        templateUrl:'templates/grupos.html',
        controller:'MeusGruposController'
    }
})
.controller('MeusGruposController', ['$scope', 'GroupService', function($scope, GroupService){
	$scope.grupos = [];
	GroupService.setCallback(function(grupos){
		$scope.grupos = grupos;
	});
	GroupService.list();
}])
.controller('NewGroupController', ['$scope', 'GroupService', 'MessagesService', function($scope, GroupService, MessagesService){
	$scope.nome = '';
	$scope.add=function(){
		for (var i = $scope.grupos.length - 1; i >= 0; i--) {
			if($scope.grupos[i].nome==$scope.nome){
				MessagesService.error('Esse grupo já existe!');
				return;
			}
		}
		GroupService.new($scope.nome);
		$scope.nome = '';
	}
}])
.controller('GroupController', ['$scope', '$routeParams','GroupService', function($scope, $routeParams, GroupService){
	var id = $routeParams.groupid;
	GroupService.get(id, function(group){
		$scope.group = group;
	})
}])
.controller('GroupAdminController', ['$scope', 'GroupService', function($scope, GroupService){
	$scope.delete = function(){
		alert();
	}
}]);