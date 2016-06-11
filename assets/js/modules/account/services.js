'use strict';

function filter(user){
	//faz parse na data antes de passar adiante
	user.nascimento = new Date(user.nascimento)
	return user;
}
angular.module('account')
.factory('auth', function($http, $window, $rootScope){
	var user = {};
	user.token='';
	if($window.localStorage.token && $window.localStorage.currentUser){
		user.token = $window.localStorage.token;
		user.currentUser = filter(JSON.parse($window.localStorage.currentUser));
	}
	user.login = function(login, senha, success, fail){
		$http.post('auth/login',{
			login:login,
			senha:senha
		}).then(function(response){
			user.token = response.data.token;
			user.currentUser = filter(response.data.user);

			$window.localStorage.token = response.data.token;
			$window.localStorage.currentUser = JSON.stringify(user.currentUser);

			$rootScope.$emit('loginEvent');
			success();
		}, function(response){
			user.currentUser = {};
			$rootScope.$emit('logoutEvent');
			fail();
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
.factory('usermodel', function($http, auth, ApiService){
	var model = {};
	model.get = function(id, callback){
		ApiService.post('user/get',{
			user:id
		}, function(response){
			callback(filter(response.data));
		}, function(response){});
	};
	model.save = function(user, senhaAtual, callback){
		ApiService.post('user/update',{
			user:user,
			senhaAtual:senhaAtual
		}, function(response){
			if(response.data.status == 'success'){
				if(user.id == auth.currentUser.id){
					auth.currentUser = response.data.user;
				}
			}
			callback(response.data.status);
		}, function(response){
			callback("fail");
		});
	};
	model.new = function(user, success, fail){
		$http.post('user/new',{
			user:user,
		}).then(function(response){
			success();
		}, function(response){
			fail();
		});
	};
	model.delete = function(id, callback){
		ApiService.post('user/destroy',{
			user:id,
		}, function(response){
			callback({status:"success"});
		}, function(response){
			callback({status:"fail"});
		});
	}
	return model;
})
.factory('SessionService',['auth', '$location', 'MessagesService', function(auth, $location, MessagesService){
	return {
		validate:function(event, next, current){
			if(next.protected && !auth.logado()){
				MessagesService.warning('Acesso apenas para usuários autenticados');
				event.preventDefault();
				$location.path("login");
			} else if(next.$$route && next.$$route.originalPath == '/login' && auth.logado()){
				event.preventDefault();
				$location.path("dashboard");
			}
		}
	};
}])
;