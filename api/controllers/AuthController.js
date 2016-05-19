module.exports = {
	login: function(req, res){
		UserService.login(req.body.email, req.body.senha,
			function(id){
				var token = AuthService.issue({user:id});
				res.json({token:token});
			},
			function(){
				res.status(403);
				res.json({status:'login failed'});
			});
	},
}