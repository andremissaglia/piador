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
					for (var i = 0;users && i < users.length; i++) {
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
					for (var i = 0;tweets && i < tweets.length; i++) {
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
					for (var i = 0;follows && i < follows.length; i++) {
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
			//groups
			function(){
				var groups = [];
				Group.find({
					select:['id', 'nome', 'dono'],
					sort:'dono'
				}).populate('users')
				.exec(function(err, grupos){
					if(err){
						throw err;
					}
					console.log(grupos);
					var ultimoDono = -1;
					var usergroups = [];
					function getIds(users){
						var ids = [];
						for (var i = users.length - 1; i >= 0; i--) {
							ids.push(users[i].userid);
						}
						return ids;
					}
					for (var i = grupos.length - 1; i >= 0; i--) {
						if(grupos[i].dono != ultimoDono){
							if(ultimoDono != -1){
								groups.push({
									id:ultimoDono,
									list:usergroups
								});
							}
							usergroups = [];
							ultimoDono = grupos[i].dono;
						}
						usergroups.push({
							relativeId:grupos[i].id,
							nome:grupos[i].nome,
							users:getIds(grupos[i].users)
						});
					}
					if(grupos.length > 0){
						usergroups.push({
							relativeId:ultimoDono,
							nome:grupos[0].nome,
							users:getIds(grupos[0].users)
						});
						groups.push({
							id:ultimoDono,
							list:usergroups
						});
					}
					output.group = groups;
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
		GroupUser.destroy().exec(nullCallback);
		Group.destroy().exec(nullCallback);
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
		if(data.group){
			for (var i = data.group.length - 1; i >= 0; i--) {
				var pessoa = data.group[i];
				for (var j = pessoa.list.length - 1; j >= 0; j--) {
					var group = pessoa.list[j];
					Group.create({
							dono:pessoa.id,
							nome:group.nome,
							id:group.relativeId
						}).exec(function(err, grupo){
						if(err){
							throw err;
						}
						for (var k = group.users.length - 1; k >= 0; k--) {
							GroupUserService.associar(group.users[i],group.id, function(status){});
						}
					});
				}
			}
		}
		res.json('sucesso');
	}
}