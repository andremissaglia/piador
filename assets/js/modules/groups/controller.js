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
	GroupService.list(function(grupos){
		$scope.grupos = grupos;
	})
}]);