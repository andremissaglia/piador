'use strict';
//TODO apagar
var users=[{
	id:1,
	email:'admin@admin.net',
	senha:'123',
	nome:'Administrador Fodão',
	sexo:'M',
	foto:'images/FCKXPMEFCZERDQD.jpg',
	descricao:"Şσμ α αℓєgяiα đє qμєм мє *ÂMÂ Å тяistєzα đє qμєм мє ØÐËIÂ'* Ë å Øcμpαçãσ Ðє Qμєм мє .'IИVËJÂ. Иåø Gøstå Ðє мiм!?! Qμєм ðissє qμє *Ëμ* gøsтø ðє V¢?! Sє Ås Pєssøås Qμє Fåℓåм Måℓ Ðє MiM' Søμвєssєм Ø Qμє Ëμ Åxø ..ðєℓås.. Fåℓåяiåм Åiиðå MåiS!!!!!",
	nascimento:new Date(2000,0,1),
}];
var lastId = 1;

angular.module('account')
.factory('auth', function($http, $rootScope){
	var user = {};
	user.current = users[0]; //TODO apagar
	user.login = function(email, senha, callback){
		$http.post('auth/login',{
			email:email,
			senha:senha
		}).then(function(response){
			console.log(response);
			$rootScope.token = response.token;
			user.logado = true;
			callback()
		}, function(response){
			user.logado = false;
			callback();
		})
	}
	user.logout = function(){
		user.current = {}
		user.logado = false;
		$rootScope.token = '';
	}
	return user;
})
.factory('usermodel', function(){
	var model = {};
	model.get = function(id){
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i].id == id){
				return users[i];
			}
		}
		return undefined;
	};
	model.save = function(id, user){
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i].id == id){
				users[i] = user;
			}
		}
	};
	model.new = function(formdata){
		users.push({
			id:lastId++,
			email:formdata.email,
			senha:formdata.senha,
			nome:formdata.nome,
			sexo:'M',
			foto:'images/FCKXPMEFCZERDQD.jpg',
			descricao:'',
			nascimento:formdata.nascimento,
		});
		return true;
	};
	model.delete = function(id){
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i].id == id){
				users.splice(i,1);
				return;
			}
		}
	}
	return model;
});