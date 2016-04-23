'use strict';
angular.module('account', []);
angular.module('posts', []);
var myApp = angular.module('piadorApp', [
	'account',
	'posts',
	'ngRoute',
]);
myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'templates/loginform.html',
			hideMenus: true
		})

		.when('/posts', {
			controller: 'PostController',
			templateUrl: 'templates/posts.html',			
		})

		.otherwise({ redirectTo: '/login' });
}])