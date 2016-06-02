module.exports = {
	getFollowers:function(req, res) {
		var follows = req.options.authPayload.user;
		FollowService.getFollowers(follows, function(followers){
			res.json(followers);
		});
	},
	getFollows:function(req, res) {
		var follower = req.options.authPayload.user;
		FollowService.getFollows(follower, function(follows){
			res.json(follows);
		});
	},
	follow:function(req, res) {
		var follower = req.options.authPayload.user;
		FollowService.insert(follower, req.body.userid, function(){
			res.json({status:"success"});
		});
	},
	unfollow:function(req, res) {
		var follower = req.options.authPayload.user;
		FollowService.remove(follower, req.body.userid, function(){
			res.json({status:"success"});
		});
	}
}