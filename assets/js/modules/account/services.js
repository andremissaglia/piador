'use strict';

angular.module('account')
.factory('auth', function($http, $rootScope){
	var user = {};
	user.login = function(login, senha, callback){
		$http.post('auth/login',{
			login:login,
			senha:senha
		}).then(function(response){
			console.log(response);
			$rootScope.token = response.token;
			$rootScope.currentUser = response.user;
			callback()
		}, function(response){
			$rootScope.currentUser = {};
			// TODO avisar o usuario do erro
		})
	}
	user.logout = function(){
		$rootScope.token = '';
	}
	return user;
})
.factory('usermodel', function(){
	var model = {};
	model.get = function(id){
		
	};
	model.save = function(id, user){
		
	};
	model.new = function(formdata){
		
	};
	model.delete = function(id){
	}
	return model;
});