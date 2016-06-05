module.exports = {
	destroy: function(req, res){
		var userid = req.body.user;
		// Verifica se usuario esta tentando deletar ele mesmo.
		// Poderia checar também se é o administrador que está logado
		if(userid == req.options.authPayload.user){
			try {
				UserService.destroy(userid, function(){
					res.json({
						status:'success'
					});
				})
			} catch(err){
				res.status(500);
			}
		} else {
			res.status(403)
		}
	},
	update: function(req, res){
		var user = req.body.user;
		if(user.id == req.options.authPayload.user){
			try {
				UserService.update(user, req.body.senhaAtual, function(usr){
					if(usr){
						res.json({
							status:'success',
							user: usr
						});
					} else {
						res.json({
							status:'wrongPassword',
						});
					}
				})
			} catch(err){
				res.status(500);
			}
		} else {
			res.status(403)
		}
	},
	new: function(req, res){
		var user = req.body.user;
		UserService.create(user, function(usr){
			res.json({
				status:"success",
				user:usr
			});
		});
	},
	get: function(req, res){
		var uid = req.body.user;
		UserService.find(uid, function(usr){
			if(!usr){
				res.status(404);
				return;
			}
			res.json(usr);
		});
	}
}