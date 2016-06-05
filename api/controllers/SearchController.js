module.exports={
	search: function(req, res){
		var term = req.body.term;
		UserService.search(term, function(users){
			res.json(users);
		});
	}
}