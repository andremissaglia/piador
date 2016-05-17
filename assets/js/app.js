'use strict';
angular.module('account', ['ngCookies']);
angular.module('posts', []);
angular.module('menu', []);
var myApp = angular.module('piadorApp', [
	'account',
	'posts',
	'menu',
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
			controller: 'PostController',
			templateUrl: 'templates/posts.html',
		})
		.when('/grupo', {
			templateUrl: 'templates/grupo.html',
		})
		.otherwise({ redirectTo: '/login' });
}])