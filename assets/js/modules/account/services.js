'use strict';

angular.module('account')
.factory('auth', function($http, $window, $rootScope){
	var user = {};
	user.token='';
	if($window.localStorage.token && $window.localStorage.currentUser){
		user.token = $window.localStorage.token;
		user.currentUser = JSON.parse($window.localStorage.currentUser);
	}
	user.login = function(login, senha, callback){
		$http.post('auth/login',{
			login:login,
			senha:senha
		}).then(function(response){
			user.token = response.data.token;
			user.currentUser = response.data.user;

			$window.localStorage.token = response.data.token;
			$window.localStorage.currentUser = JSON.stringify(response.data.user);

			$rootScope.$emit('loginEvent');
			callback()
		}, function(response){
			user.currentUser = {};
			$rootScope.$emit('logoutEvent');
			// TODO avisar o usuario do erro
		})
	}
	user.logout = function(){
		user.token = '';
		user.currentUser = {};

		$window.localStorage.token = '';
		$window.localStorage.currentUser = '';

		$rootScope.$emit('logoutEvent');
	}
	user.logado = function(){
		return user.token != '';
	}
	return user;
})
.factory('usermodel', function($http, auth){
	var model = {};
	model.get = function(id){
		
	};
	model.save = function(user, senhaAtual, callback){
		$http.post('user/update',{
			user:user,
			token:auth.token,
			senhaAtual:senhaAtual
		}).then(function(response){
			if(response.data.status == 'success'){
				if(user.id == auth.currentUser.id){
					auth.currentUser = response.data.user;
				}
			}
			callback(response.data.status);
		}, function(response){
			callback("fail");
		})
	};
	model.new = function(formdata){
		
	};
	model.delete = function(id, callback){
		$http.post('user/destroy',{
			user:id,
			token:auth.token
		}).then(function(response){
			callback({status:"success"});
		}, function(response){
			callback({status:"fail"});
		})
	}
	return model;
});