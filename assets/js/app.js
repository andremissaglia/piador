'use strict';
angular.module('account',[]);
angular.module('profile', []);
angular.module('menu', []);
angular.module('utils', []);
angular.module('friends', []);
angular.module('search', []);
var myApp = angular.module('piadorApp', [
	'account',
	'profile',
	'menu',
	'utils',
	'friends',
	'search',
	'ngRoute',
	'ui.bootstrap',
	'ngAnimate',
	'ngSanitize'
]);
myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'templates/loginform.html',
		})
		.when('/logout', {
			controller: 'LogoutController',
			templateUrl: 'templates/logout.html',
			protected: true,
		})
		.when('/signup', {
			controller: 'SignupController',
			templateUrl: 'templates/signupform.html',
		})
		.when('/settings', {
			controller: 'SettingsController',
			templateUrl: 'templates/settings.html',
			protected: true,
		})
		.when('/dashboard', {
			templateUrl: 'templates/dashboard.html',
			protected: true,
		})
		.when('/grupo', {
			templateUrl: 'templates/grupo.html',
		})
		.when('/followers', {
			templateUrl: 'templates/followers.html',
			protected: true,
		})
		.when('/following', {
			templateUrl: 'templates/following.html',
			protected: true,
		})
		.when('/search/:termo', {
			templateUrl: 'templates/search.html',
			controller: 'SearchController',
			protected: true,
		})
		.when('/user/:userid', {
			templateUrl: 'templates/userprofile.html',
			protected: true,
		})
		.otherwise({ redirectTo: '/login' });
}]).run(function($rootScope, SessionService){
	$rootScope.$on('$routeChangeStart', SessionService.validate);
});