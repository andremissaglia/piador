module.exports = {
	new: function(tweet, callback){
		Tweet.create(tweet).exec(function(err, post) {
			if (err) { 
				throw err; 
			}
			callback();
		})
	},
	listFromUser: function(user_id, callback){
		Tweet.find({user:user_id}).exec(function(err, tweets){
			if (err) { 
				throw err; 
			}
			for (var i = 0; i < tweets.length; i++) {
				delete tweets[i].createdAt;
				delete tweets[i].updatedAt;
			}
			callback(tweets);
		});
	}
}