module.exports = {
	setTheme:function(tweet_id, tema, callback){
		Theme.findOne({tema:tema}).exec(function(err, theme){
			if(err){
				throw err;
			}
			if(theme){
				theme.posts.add(tweet_id);
				theme.save(function(err){
					if(err){
						throw err;
					}
					callback();
				});
			} else {
				Theme.create({tema:tema}).exec(function(err, theme){
					if(err){
						throw err;
					}
					theme.posts.add(tweet_id);
					theme.save(function(err){
						if(err){
							throw err;
						}
						callback();
					});
				});
			}
		})
	}
}