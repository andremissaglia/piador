'use strict';

angular.module('search')
.factory('SearchService', function(ApiService){
	return {
		searchUsers: function(term, callback){
			ApiService.post('/search/users',{
				term:term
			}, function(response){
				callback(response.data)
			}, function(response){
				callback([]);
			});
		},
		searchPosts: function(term, callback){
			ApiService.post('/search/posts',{
				term:term
			}, function(response){
				callback(response.data)
			}, function(response){
				callback([]);
			});
		}
	};
});