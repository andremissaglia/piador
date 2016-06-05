'use strict';

angular.module('search')
.factory('SearchService', function(ApiService){
	return {
		search: function(term, callback){
			ApiService.post('/search',{
				term:term
			}, function(response){
				callback(response.data)
			}, function(response){
				callback([]);
			});
		}
	};
});