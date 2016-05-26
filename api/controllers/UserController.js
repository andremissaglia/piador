module.exports = {
	destroy: function(req, res){
		var userid = req.body.user;
		// Verifica se usuario esta tentando deletar ele mesmo.
		// Poderia checar também se é o administrador que está logado
		if(userid == req.options.authPayload.user){
			try {
				User.destroy(user, function(){
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
	}
}