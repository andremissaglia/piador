'use strict';
 
angular.module('account')
.controller('LoginController',["$scope", "$rootScope", "$location", "auth",function($scope, $rootScope, $location, auth){
	$rootScope.hideMenu = true;
	$scope.user='';
	$scope.senha='';
	$scope.login = function(){
		auth.login($scope.user, $scope.senha, function(){
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
.controller('SettingsController',["$scope", "$rootScope", "auth", "$location", "usermodel",function($scope, $rootScope, auth, $location, usermodel){
	$scope.form = {}
	var resetForm = function(){
		$scope.form = {
			nome:$rootScope.currentUser.nome,
			login:$rootScope.currentUser.login,
			nascimento:$rootScope.currentUser.nascimento,
			descricao:$rootScope.currentUser.descricao,
			senhaAtual:'',
			senha1:'',
			senha2:''
		}
	}
	resetForm();
	$scope.save = function(){
		if($scope.form.senha1 != $scope.form.senha2){
			return;
		}
		var user = {
			id:$rootScope.currentUser.id,
			nome:$scope.form.nome,
			login:$scope.form.login,
			nascimento:$scope.form.nascimento,
			descricao:$scope.form.descricao
		}
		if($scope.form.senha1 != ''){
			user.password = $scope.form.senha1;
		}
		usermodel.save(user, $scope.form.senhaAtual, function(status){
			if(status == 'success'){
				resetForm();
				$location.path('/posts');
			} else{
				$scope.form.senhaAtual = '';
				alert("Erro ao atualizar perfil: sua senha está correta?"); //TODO exibir o erro decentemente
			}
		});
	}
	$scope.delete = function(){
		if(confirm("Tem certeza que deseja apagar sua conta? Isso é irreversível.")){
			usermodel.delete($scope.user.id, function(result){
				if(result.status == 'success'){
					auth.logout();
					$location.path('/');
					alert('Tchau!');
				} else {
					alert('Desculpe, ocorreu um erro!');
				}
			});
		}
	}
}]);