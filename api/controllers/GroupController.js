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
		var uid = req.options.authPayload.user;
		var gid = req.body.id;
		GroupService.get(gid,function(group){
			res.json(group);
		});
	}
}