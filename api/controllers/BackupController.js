module.exports = {
	export: function(req, res){
		output = {}
		var next;
		var i = 0;
		var pipeline = [
			//users
			function(){
				User.find().exec(function(err,users){
					var list = [];
					for (var i = 0; i < users.length; i++) {
						list.push({
							id:users[i].id,
							nome:users[i].nome,
							login:users[i].login,
							password:users[i].password,
							birthday:users[i].nascimento,
							bio:users[i].descricao
						});
					}
					output.users = list;
					next();
				})
			}, 
			//tweets
			function(){
				Tweet.find().exec(function(err,tweets){
					var list = [];
					for (var i = 0; i < tweets.length; i++) {
						list.push({
							id:tweets[i].id,
							user:tweets[i].user,
							title:tweets[i].title,
							text:tweets[i].text,
							timestamp:tweets[i].timestamp
						});
					}
					output.tweets = list;
					next();
				})
			}, 
			//follows
			function(){
				Follow.find().exec(function(err, follows){
					var list = [];
					for (var i = 0; i < follows.length; i++) {
						list.push({
							id:follows[i].id,
							follower:follows[i].follower,
							follows:follows[i].follows,
							timestamp:follows[i].timestamp,
						});
					}
					output.follow = list;
				})
			}, 
			//output
			function(){
				res.json(output);
			}
		];
		next = function(){
			if(i < pipeline.length){
				pipeline[i++]();
			}
		};
		next();
	}
}