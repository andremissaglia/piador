module.exports = {
	vote:function(user_id, tweet_id, value, callback){
		Reactions.findOne({tweet:tweet_id, user:user_id})
		.exec(function(err, reaction){
			if(err){
				throw err;
			}
			if(reaction){
				Reactions.update({
					tweet:tweet_id,
					user:user_id
				}, {reaction:value})
				.exec(function(err, reaction){
					if (err) { 
						throw err; 
					}
					callback();
				});
			} else {
				Reactions.create({
					tweet:tweet_id,
					user:user_id,
					reaction:value})
				.exec(function(err, reaction){
					if (err) { 
						throw err; 
					}
					callback();
				});
			}
		})
	}
}