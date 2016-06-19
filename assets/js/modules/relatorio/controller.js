'use strict';
 
angular.module('relatorio')
.directive('topusers', function(){
    return {
        restrict:'E',
        templateUrl:'templates/relatorio/topusers.html',
    }
})
.directive('flutuacao', function(){
    return {
        restrict:'E',
        templateUrl:'templates/relatorio/topusers.html',
    }
})
.directive('toptweets', function(){
    return {
        restrict:'E',
        templateUrl:'templates/relatorio/topusers.html',
    }
})
.directive('zonainfluencia', function(){
    return {
        restrict:'E',
        templateUrl:'templates/relatorio/topusers.html',
    }
})
.directive('similares', function(){
    return {
        restrict:'E',
        templateUrl:'templates/relatorio/topusers.html',
    }
})
.controller('RelatorioController', ['$scope', '$routeParams', function ($scope, $routeParams) {
	$scope.page = $routeParams.page;
}]);