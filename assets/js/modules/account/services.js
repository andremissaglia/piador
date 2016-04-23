'use strict';
var defaultUser = {
	email:'admin@admin.net',
	senha:'123',
	nome:'Administrador Fodão',
	foto:'images/FCKXPMEFCZERDQD.jpg',
	descricao:"Şσμ α αℓєgяiα đє qμєм мє *ÂMÂ Å тяistєzα đє qμєм мє ØÐËIÂ'* Ë å Øcμpαçãσ Ðє Qμєм мє .'IИVËJÂ. Иåø Gøstå Ðє мiм!?! Qμєм ðissє qμє *Ëμ* gøsтø ðє V¢?! Sє Ås Pєssøås Qμє Fåℓåм Måℓ Ðє MiM' Søμвєssєм Ø Qμє Ëμ Åxø ..ðєℓås.. Fåℓåяiåм Åiиðå MåiS!!!!!",
	nascimento:'01/01/2000'
}
angular.module('account')
.factory('auth', function(){
	var user = {};
	user.login = function(email, senha){
		if(email==defaultUser.email && senha==defaultUser.senha){
			user.current = defaultUser;
			user.logado = true;
		}
		return user.logado;
	}
	user.logout = function(){
		user.current = {}
		user.logado = false;
	}
	return user;
});