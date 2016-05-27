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
				UserService.update(user, function(usr){
					res.json({
						status:'success',
						user: usr
					});
				})
			} catch(err){
				res.status(500);
			}
		} else {
			res.status(403)
		}
	}
}