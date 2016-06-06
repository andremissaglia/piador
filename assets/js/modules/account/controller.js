'use strict';
 
angular.module('account')
.directive('miniprofile', function(){
    return {
        restrict:'E',
        templateUrl:'templates/miniprofile.html',
        controller: 'MyProfileController'
    }
})
.controller('LoginController',["$scope", "$rootScope", "$location", "auth", "MessagesService",function($scope, $rootScope, $location, auth, MessagesService){
	$scope.user='';
	$scope.senha='';
	$scope.login = function(){
		auth.login($scope.user, $scope.senha, function(){
			$location.path('/dashboard');
		}, function(){
			MessagesService.error('Falha no login: Os dados estão certos?');
		})
	}
	$scope.cadastrar = function(){
		$location.path('/signup');
	}
}])
.controller('LogoutController',['auth', function(auth){
	auth.logout();
}])
.controller('MyProfileController',["$scope", "$rootScope","auth",function($scope, $rootScope, auth){
	$scope.user=auth.currentUser;
	$rootScope.$on('loginEvent', function(event){
		$scope.user = auth.currentUser;
	});
}])
.controller('SignupController',["$scope", "$rootScope", "$location","usermodel", "auth", "MessagesService",function($scope, $rootScope, $location, usermodel, auth, MessagesService){
	$scope.dateOptions = {
		formatYear: 'yyyy',
		maxDate: new Date(),
		minDate: new Date(1900,0,1),
		startingDay: 1
	};
	$scope.openPopup = function() {
		$scope.popup.opened = true;
	};
	$scope.popup = {opened: false};

	$scope.login = '';
	$scope.nome='';
	$scope.nascimento=null;
	$scope.senha1 = '';
	$scope.senha2 = '';
	$scope.cadastrar = function(){
		$scope.mensagem='';
		var user = {
			login:$scope.login,
			nome:$scope.nome,
			nascimento:$scope.nascimento,
			password:$scope.senha1
		};
		if(!$scope.signupform.$valid){
			MessagesService.error("Prencha todos os campos!");
			$scope.senha1 = '';
			$scope.senha2 = '';
			return;
		} else if($scope.senha1 != $scope.senha2){
			MessagesService.error("As senhas não coincidem");
			$scope.senha1 = '';
			$scope.senha2 = '';
			return;
		}
		usermodel.new(user, function(){
			$location.path('/login');
		}, function(){
			MessagesService.error('Ocorreu um erro, tente novamente');
		})
			
		
	}
	$scope.voltar = function(){
		$location.path('/login');
	}
}])
.controller('SettingsController',["$scope", "auth", "$location", "usermodel",function($scope, auth, $location, usermodel){
	$scope.dateOptions = {
		formatYear: 'yyyy',
		maxDate: new Date(),
		minDate: new Date(1900,0,1),
		startingDay: 1
	};
	$scope.openPopup = function() {
		$scope.popup.opened = true;
	};
	$scope.popup = {opened: false};

	$scope.form = {}
	var resetForm = function(){
		$scope.form = {
			nome:auth.currentUser.nome,
			login:auth.currentUser.login,
			nascimento:auth.currentUser.nascimento,
			descricao:auth.currentUser.descricao,
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
			id:auth.currentUser.id,
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
				$location.path('/dashboard');
			} else{
				$scope.form.senhaAtual = '';
				alert("Erro ao atualizar perfil: sua senha está correta?"); //TODO exibir o erro decentemente
			}
		});
	}
	$scope.delete = function(){
		if(confirm("Tem certeza que deseja apagar sua conta? Isso é irreversível.")){
			usermodel.delete(auth.currentUser.id, function(result){
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