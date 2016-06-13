'use strict';

angular.module('utils')
.factory('MessagesService', function(){
	var callbacks = [];
	var tmp;
	var publica = function(msg){
		if(callbacks.length == 0){
			tmp = msg;
			return;
		}
		for (var i = callbacks.length - 1; i >= 0; i--) {
			callbacks[i](msg);
		}
	};
	return {
		error:function(msg){
			publica({
				type:'error',
				msg:msg
			});
		},
		warning:function(msg){
			publica({
				type:'warning',
				msg:msg
			});
		},
		success:function(msg){
			publica({
				type:'success',
				msg:msg
			});
		},
		subscribe:function(callback){
			callbacks.push(callback);
			if(tmp){
				callback(tmp);
				tmp = undefined;
			}
		},
		unsubscribe:function(callback){
			var index = callbacks.indexOf(callback);
			if (index > -1) {
				callbacks.splice(index, 1);
			}
		}
	};
})
.factory('ApiService', function($http, auth, $location, MessagesService){
	var loginPage = '/login';
	return {
		//funciona como o $http, mas envia o token junto,
		// e redireciona para a página de login se não autorizado
		post:function(path, data, success, fail){
			data.token = auth.token;
			$http.post(path, data).then(success,function(response){
				if(response.status==401){
					$location.path('/');
					auth.logout();
					MessagesService.error('Por favor faça login');
					return;
				}
				fail(response);
			});
		},
		easypost:function(path, data, callback){
			this.post(path,data, function(response){
				callback(response.data);
			}, function(response){});
		}
	};
});