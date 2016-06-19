'use strict';
angular.module('account',[]);
angular.module('profile', []);
angular.module('menu', []);
angular.module('utils', []);
angular.module('friends', []);
angular.module('search', []);
angular.module('groups', []);
angular.module('relatorio', []);
var myApp = angular.module('piadorApp', [
	'account',
	'profile',
	'menu',
	'utils',
	'friends',
	'search',
	'groups',
	'relatorio',
	'ngRoute',
	'ui.bootstrap',
	'ngAnimate',
	'ngSanitize'
]);
myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'templates/public/loginform.html',
		})
		.when('/logout', {
			controller: 'LogoutController',
			templateUrl: 'templates/user/logout.html',
			protected: true,
		})
		.when('/signup', {
			controller: 'SignupController',
			templateUrl: 'templates/public/signupform.html',
		})
		.when('/settings', {
			controller: 'SettingsController',
			templateUrl: 'templates/user/settings.html',
			protected: true,
		})
		.when('/dashboard', {
			templateUrl: 'templates/user/dashboard.html',
			protected: true,
		})
		.when('/grupo', {
			templateUrl: 'templates/public/grupo.html',
		})
		.when('/followers', {
			templateUrl: 'templates/user/followers.html',
			protected: true,
		})
		.when('/following', {
			templateUrl: 'templates/user/following.html',
			protected: true,
		})
		.when('/search/:termo', {
			templateUrl: 'templates/search.html',
			controller: 'SearchController',
			protected: true,
		})
		.when('/user/:userid', {
			templateUrl: 'templates/user/userprofile.html',
			controller: 'ProfileController',
			protected: true,
		})
		.when('/grupos/:groupid', {
			templateUrl: 'templates/grouphome.html',
			controller: 'GroupController',
			protected: true,
		})
		.when('/temas/:tema', {
			templateUrl: 'templates/temas.html',
			protected: true,
		})
		.when('/relatorio', {
			templateUrl: 'templates/relatorio/relatorio.html',
			protected: true,
		})
		.when('/relatorio/:page', {
			templateUrl: 'templates/relatorio/relatorio.html',
			controller:'RelatorioController',
			protected: true,
		})
		.otherwise({ redirectTo: '/login' });
}]).run(function($rootScope, SessionService){
	$rootScope.$on('$routeChangeStart', SessionService.validate);
});