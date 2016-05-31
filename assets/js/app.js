'use strict';
angular.module('account',[]);
angular.module('posts', []);
angular.module('menu', []);
angular.module('utils', []);
var myApp = angular.module('piadorApp', [
	'account',
	'posts',
	'menu',
	'utils',
	'ngRoute',
]);
myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'templates/loginform.html',
		})
		.when('/signup', {
			controller: 'SignupController',
			templateUrl: 'templates/signupform.html',
		})
		.when('/settings', {
			controller: 'SettingsController',
			templateUrl: 'templates/settings.html',
		})
		.when('/posts', {
			templateUrl: 'templates/dashboard.html',
		})
		.when('/grupo', {
			templateUrl: 'templates/grupo.html',
		})
		.otherwise({ redirectTo: '/login' });
}])