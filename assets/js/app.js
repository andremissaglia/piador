'use strict';
angular.module('account',[]);
angular.module('posts', []);
angular.module('menu', []);
angular.module('utils', []);
angular.module('friends', []);
var myApp = angular.module('piadorApp', [
	'account',
	'posts',
	'menu',
	'utils',
	'friends',
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
		.when('/followers', {
			templateUrl: 'templates/followers.html',
		})
		.when('/following', {
			templateUrl: 'templates/following.html',
			controller: 'FollowingController',
		})
		.otherwise({ redirectTo: '/login' });
}])