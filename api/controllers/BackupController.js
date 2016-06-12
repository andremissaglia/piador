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
					next();
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
	},
	import: function(req, res){
		if(req.method == "GET"){
			res.view('importbackup', {layout:false});
			return;
		} else if(req.method != "POST"){
			res.staus(404);
			return;
		}
		var data = JSON.parse(req.body.import);
		var nullCallback = function(err, x){
			if(err){
				throw err;
			}
		}
		//apaga dados antigos
		User.destroy().exec(nullCallback);
		Tweet.destroy().exec(nullCallback);
		Follow.destroy().exec(nullCallback);
		//insere os novos
		var list = [];
		if(data.users){
			list = [];
			for (var i = 0; i < data.users.length; i++) {
				list.push({
					id:data.users[i].id,
					nome:data.users[i].nome,
					login:data.users[i].login,
					password:data.users[i].password,
					nascimento:data.users[i].birthday,
					descricao:data.users[i].bio,
					foto:'images/passaros/'+(Math.floor(Math.random()*16)+1)+'.png'
				});
			}
			User.create(list).exec(nullCallback);
		}
		if(data.tweets){
			Tweet.create(data.tweets).exec(nullCallback);
		}
		if(data.follow){
			Follow.create(data.follow).exec(nullCallback);
		}
		res.json('sucesso');
	}
}