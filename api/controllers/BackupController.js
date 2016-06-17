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
			//reactions
			function(){
				Reactions.find({
					select:['tweet','user', 'reaction', 'timestamp']
				}).exec(function(err, reactions){
					output.reactions = reactions;
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
		var nextCallback = function(err, x){
			if(err){
				throw err;
			}
			next();
		}
		
		var pipeline = [ 
		//apaga dados antigos
		function(){
			User.destroy().exec(nextCallback);
		},
		function(){
			Tweet.destroy().exec(nextCallback);
		},
		function(){
			Follow.destroy().exec(nextCallback);
		},
		function(){
			GroupUser.destroy().exec(nextCallback);
		},
		function(){
			Group.destroy().exec(nextCallback);
		},
		function(){
			Reactions.destroy().exec(nextCallback);
		},
		//insere os novos
		function(){
			if(data.users){
				var list = [];
				for (var i = 0; i < data.users.length; i++) {
					list.push({
						id:data.users[i].id,
						nome:data.users[i].nome,
						login:data.users[i].login,
						password:data.users[i].password,
						nascimento:data.users[i].birthday,
						descricao:data.users[i].bio,
						foto:'images/passaros/'+(Math.floor(Math.random()*15)+1)+'.png'
					});
				}
				User.create(list).exec(nextCallback);
			}
		},
		function(){
			if(data.tweets){
				for (var i = data.tweets.length - 1; i >= 0; i--) {
					data.tweets[i].reaction=0;
				}
				Tweet.create(data.tweets).exec(nextCallback);
			}
		},
		function(){
			if(data.follow){
				Follow.create(data.follow).exec(nextCallback);
			}
		},
		function(){
			if(data.group){
				var associar = function(users, gid){
					var membros = []
					for (var i = users.length - 1; i >= 0; i--) {
						membros.push({userid:users[i], groupid:gid});
					}
					GroupUser.create(membros).exec(function(err, val){
						if(err){
							throw err;
						}
					});

				};
				var criarGrupo = function(dono_id, grupo){
					Group.create({
						dono:dono_id,
						nome:grupo.nome,
						id:grupo.relativeId
					}).exec(function(err, g){
						if(err){
							throw err;
						}
						associar(grupo.users, grupo.relativeId);
					});
				};
				for (var i = data.group.length - 1; i >= 0; i--) {
					var gruposDono = data.group[i];
					for (var j = gruposDono.list.length - 1; j >= 0; j--) {
						criarGrupo(gruposDono.id, gruposDono.list[j]);					
					}
					next();
				}
			}
		},
		function(){
			if(data.reactions){
				Reactions.create(data.reactions).exec(nextCallback);
			}
		},
		function(){
			res.json('sucesso');
		}];

		var i = 0;
		var next = function(){
			if(i < pipeline.length){
				pipeline[i++]();
			}
		}

		next();
	}
}