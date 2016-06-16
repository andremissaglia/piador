module.exports = {
	new: function(tweet, callback){
		tweet.timestamp=new Date();
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
	},
	getTimeline: function(user_id, callback){
		user_id = 1*user_id; //impede SQL injection (nao aceita strings)
		Tweet.query('\
			SELECT \
				t.id tid,\
				t.title, \
				t.text, \
				t.timestamp, \
				u.id uid, \
				u.nome, \
				u.foto \
			FROM tweet t \
				INNER JOIN public.user u ON u.id = t.user \
				INNER JOIN follow f ON f.follows = t.user \
			WHERE f.follower = '+user_id +' \
				AND f.timestamp < t.timestamp \
			UNION ALL SELECT \
				t.id tid, \
				t.title, \
				t.text, \
				t.timestamp, \
				u.id uid, \
				u.nome, \
				u.foto \
			FROM tweet t \
				INNER JOIN public.user u ON u.id = t.user \
			WHERE t.user = '+user_id +' \
			ORDER BY timestamp desc \
			LIMIT 100;',
		function(err, tweets){
			if (err) { 
				throw err; 
			}
			var list = [];
			for (var i = 0; i < tweets.rows.length; i++) {
				var  tweet = tweets.rows[i];
				list.push({
					id:tweet.tid,
					title:tweet.title,
					text:tweet.text,
					timestamp:tweet.timestamp,
					owner:{
						id:tweet.uid,
						nome:tweet.nome,
						foto:tweet.foto
					}
				})
			}
			callback(list);
		});
	},
	react:function(user_id, tweet_id, value, callback){
		Reactions.findOne({tweet:tweet_id, user:user_id}).exec(function(err, reaction){
			if(err){
				throw err;
			}
			if(reaction){
				Reactions.update({tweet:tweet_id, user:user_id}, {reaction:value})
				.exec(function(err, reaction){
					if (err) { 
						throw err; 
					}
					callback();
				})
			} else {
				
			}
		})
	}
}