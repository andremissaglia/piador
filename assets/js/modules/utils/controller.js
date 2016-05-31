'use strict';

angular.module('utils')
.directive('messages', function(){
    return {
        restrict:'E',
        templateUrl:'templates/messages.html',
        controller: 'MessagesController'
    }
})
.controller('MessagesController', ['$scope', 'MessagesService',function($scope, MessagesService){
	$scope.messages = [];
	var setMsg = function(msg){
		switch(msg.type){
			case 'success': msg.class='bg-success';break;
			case 'warning': msg.class='bg-warning';break;
			case 'error': msg.class='bg-danger';break;
			default: msg.class='bg-info';break;
		}
		$scope.messages = [msg]; //só suporta 1 mensagem no momento
	};
	MessagesService.subscribe(setMsg);
	$scope.close = function(){
		$scope.messages = [];
	}
	$scope.$on('$destroy', function(){
		MessagesService.unsubscribe(setMsg);
	})
}]);