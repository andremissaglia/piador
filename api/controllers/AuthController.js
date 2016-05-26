module.exports = {
	login: function(req, res){
		UserService.login(req.body.login, req.body.senha,
			function(user){
				var token = AuthService.issue({user:user.id});
				res.json({
					token:token,
					user:user
				});
			},
			function(){
				res.status(403);
				res.json({status:'login failed'});
			});
	},
}