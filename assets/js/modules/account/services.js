'use strict';

angular.module('account')
.factory('auth', function($http, $rootScope){
	var user = {};
	user.login = function(login, senha, callback){
		$http.post('auth/login',{
			login:login,
			senha:senha
		}).then(function(response){
			$rootScope.token = response.data.token;
			$rootScope.currentUser = response.data.user;
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
.factory('usermodel', function($http, $rootScope){
	var model = {};
	model.get = function(id){
		
	};
	model.save = function(id, user){
		
	};
	model.new = function(formdata){
		
	};
	model.delete = function(id, callback){
		$http.post('user/destroy',{
			user:id,
			token:$rootScope.token
		}).then(function(response){
			console.log(response);
			callback({status:"success"});
		}, function(response){
			callback({status:"fail"});
		})
	}
	return model;
});