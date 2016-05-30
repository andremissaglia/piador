module.exports={
	new:function(req, res){
		var tweet = req.body.tweet;
		TweetService.new(tweet, function(){
			res.json({status:'success'});
		})
	},
	get:function(req,res){
		var uid = req.body.user;
		TweetService.listFromUser(uid, function(tweets) {
			res.json(tweets);
		})
	}
}