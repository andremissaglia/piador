'use strict';
 
angular.module('groups')
.directive('grupos', function(){
    return {
        restrict:'E',
        templateUrl:'templates/grupos.html',
        controller:'MeusGruposController'
    }
})
.controller('TimelineGruposController', ['$scope', 'GroupService', function($scope, GroupService){
	$scope.posts = [];
	GroupService.timeline($scope.groupid,function(posts){
		$scope.posts = posts;
	});
}])
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
	$scope.groupid = id;
	GroupService.get(id, function(group){
		$scope.group = group;
	})
}])
.controller('GroupAdminController', ['$scope', 'GroupService', '$location', function($scope, GroupService, $location){
	$scope.delete = function(){
		GroupService.destroy($scope.group.id, function(status){
			$location.path('/dashboard');
		});
	}
	GroupService.getUsers($scope.groupid, function(members){
		$scope.members = members;
	});
	$scope.remove = function(uid){
		GroupService.desassociate($scope.groupid,uid, function(){
			for (var i = $scope.members.length - 1; i >= 0; i--) {
				if($scope.members[i].id == uid){
					$scope.members.splice(i,1);
					break;
				}
			}
		})
	}
}])
.controller('AddMemberController', ['$scope', 'GroupService', function($scope, GroupService){
	$scope.username = '';
	$scope.add = function(){
		GroupService.associate($scope.groupid, $scope.username, function(status){
			$scope.members.push(status.user);
		});
		$scope.username='';
	}
}]);