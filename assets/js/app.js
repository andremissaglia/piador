'use strict';
angular.module('account',[]);
angular.module('posts', []);
angular.module('menu', []);
angular.module('utils', []);
angular.module('friends', []);
angular.module('search', []);
var myApp = angular.module('piadorApp', [
	'account',
	'posts',
	'menu',
	'utils',
	'friends',
	'search',
	'ngRoute',
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
		.when('/followers', {
			templateUrl: 'templates/followers.html',
		})
		.when('/following', {
			templateUrl: 'templates/following.html',
		})
		.when('/search/:termo', {
			templateUrl: 'templates/search.html',
			controller: 'SearchController',
		})
		.otherwise({ redirectTo: '/login' });
}])