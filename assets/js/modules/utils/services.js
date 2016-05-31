'use strict';

angular.module('utils')
.factory('MessagesService', function(){
	var callbacks = [];
	var publica = function(msg){
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
		},
		unsubscribe:function(callback){
			var index = callbacks.indexOf(callback);
			if (index > -1) {
				callback.splice(index, 1);
			}
		}
	};
});