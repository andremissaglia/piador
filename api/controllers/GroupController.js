module.exports={
	new:function (req,res) {
		var uid = req.options.authPayload.user;
		var group = req.body.nome;
		GroupService.new(group,uid,function(status){
			res.json(status);
		});
	},
	list:function(req, res){
		var uid = req.options.authPayload.user;
		GroupService.list(uid, function(groups){
			res.json(groups);
		});
	},
	get:function(req, res){
		var gid = req.body.id;
		GroupService.get(gid,function(group){
			res.json(group);
		});
	},
	destroy:function(req, res){
		var gid = req.body.id;
		GroupService.destroy(gid,function(){
			res.json({status:'success'});
		});	
	},
	getUsers:function(req, res){
		var gid = req.body.id;
		GroupUserService.getUsers(gid, function(users){
			res.json(users);
		});
	},
	associar:function(req, res){
		var dono = req.options.authPayload.user;
		var pessoa = req.body.username;
		var gid = req.body.gid;
		GroupService.get(gid, function(group){
			if(!group || group.dono != dono){
				res.status(403);
				return;
			}
			UserService.findByUsername(pessoa, function(user){
				if(!user){
					res.json({status:'User not found'});
					return;
				}
				GroupUserService.associar(user.id, gid, function(status){
					status.user = {
						id:user.id,
						login:user.login
					};
					res.json(status);
				});
			});
		});
	},
	desassociar:function(req, res){
		var dono = req.options.authPayload.user;
		var pessoa = req.body.uid;
		var gid = req.body.gid;
		GroupService.get(gid, function(group){
			if(!group || group.dono != dono){
				res.status(403);
				return;
			}
			GroupUserService.desassociar(pessoa, gid, function(status){
				res.json(status);
			});
		});
	},
}