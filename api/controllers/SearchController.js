module.exports={
	users: function(req, res){
		var term = req.body.term;
		UserService.search(term, function(users){
			res.json(users);
		});
	},
	posts: function(req, res){
		var term = req.body.term;
		var user = req.options.authPayload.user;
		TweetService.search(user,term, function(posts){
			res.json(posts);
		});
	}
}