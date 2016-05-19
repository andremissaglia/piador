'use strict';
 
angular.module('account')
.controller('LoginController',["$scope", "$rootScope", "$location", "auth",function($scope, $rootScope, $location, auth){
	$rootScope.hideMenu = true;
	$scope.email='';
	$scope.senha='';
	$scope.login = function(){
		auth.login($scope.email, $scope.senha, function(){
			$location.path('/posts');
			$rootScope.hideMenu = false;
		})
	}
	$scope.cadastrar = function(){
		$location.path('/signup');
	}
}])
.controller('SignupController',["$scope", "$rootScope", "$location","usermodel", "auth",function($scope, $rootScope, $location, usermodel, auth){
	$rootScope.hideMenu = true;
	$scope.formdata = {
		email:'',
		nome:'',
		nascimento:new Date(2000,0,1),
		senha:'',
		senha2:''
	}
	$scope.mensagem='';
	$scope.cadastrar = function(){
		if(!$scope.signupform.$valid){
			$scope.mensagem = "Prencha todos os campos!";
			return;
		}
		if($scope.formdata.senha != $scope.formdata.senha2){
			$scope.mensagem = "As senhas não coincidem";
			return;
		}
		if(usermodel.new($scope.formdata)){
			$location.path('/posts');
			$rootScope.hideMenu = false;
		}
	}
}])
.controller('SettingsController',["$scope", "$location", "auth", "usermodel",function($scope, $location, auth, usermodel){
	$scope.user = usermodel.get(auth.current);
	$scope.save = function(){
		usermodel.save(auth.current, $scope.user);
		$location.path('/posts');
	}
	$scope.delete = function(){
		if(confirm("Tem certeza que deseja apagar sua conta? Isso é irreversível.")){
			var mensagem = '';
			if($scope.user.sexo == 'M'){
				mensagem = 'Tchau querido!';
			} else {
				mensagem = 'Tchau querida!';
			}

			usermodel.delete(auth.current);
			auth.logout();
			$location.path('/');
			alert(mensagem);
		}
	}
}]);