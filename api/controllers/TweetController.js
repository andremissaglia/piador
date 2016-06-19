module.exports={
	tweet:function(req, res){
		var tweet = req.body.tweet;
		tweet.user = req.options.authPayload.user;
		TweetService.new(tweet, function(){
			res.json({status:'success'});
		})
	},
	get:function(req,res){
		var uid = req.body.user;
		TweetService.listFromUser(uid, function(tweets) {
			res.json(tweets);
		})
	},
	timeline:function(req, res){
		var uid = req.options.authPayload.user;
		TweetService.getTimeline(uid, function(tweets) {
			res.json(tweets);
		})
	},
	react:function(req, res){
		var uid = req.options.authPayload.user;
		var tweet = req.body.tweet;
		var value = req.body.value;
		ReactionService.vote(uid, tweet, value, function(){
			res.json({status:'success'});
		});
	},
	share:function(req, res){
		var uid = req.options.authPayload.user;
		var tweet = req.body.post;
		ShareService.share(tweet, uid, function(){
			res.json({status:'success'});
		});
	}, 
	search:function(req, res){
		TweetService.search(['fulano','andre'],['teste','teste2'], function(){

		});
	}

}