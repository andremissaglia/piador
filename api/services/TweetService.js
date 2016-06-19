var getTemas = function(texto){
	var matches = texto.match(/#[a-zA-Z0-9]+/g);
	for (var i = matches.length - 1; i >= 0; i--) {
		matches[i] = matches[i].slice(1);
	}
	return matches;
}
module.exports = {
	new: function(tweet, callback){
		tweet.timestamp=new Date();
		Tweet.create(tweet).exec(function(err, post) {
			if (err) { 
				throw err; 
			}
			var temas = getTemas(tweet.text);
			temas = temas.filter(function(item, pos){
				return temas.indexOf(item) == pos;
			})
			var count = temas.length;
			for (var i = temas.length - 1; i >= 0; i--) {
				ThemeService.setTheme(post.id, temas[i], function(){
					if(--count == 0){
						callback();
					}
				})
			}
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
				t.reaction, \
				u.id uid, \
				u.nome, \
				u.foto, \
				coalesce(r.reaction, 0) vote, \
				null :: integer as shareuid, \
				null as shareuname \
			FROM tweet t \
				INNER JOIN public.user u ON u.id = t.user \
				INNER JOIN follow f ON f.follows = t.user \
				LEFT JOIN reactions r ON r.tweet = t.id \
					AND r.user = ' + user_id +' \
			WHERE f.follower = '+user_id +' \
				AND f.timestamp < t.timestamp \
			UNION ALL SELECT \
				t.id tid, \
				t.title, \
				t.text, \
				t.timestamp, \
				t.reaction, \
				u.id uid, \
				u.nome, \
				u.foto, \
				coalesce(r.reaction, 0) vote, \
				null :: integer as shareuid, \
				null as shareuname \
			FROM tweet t \
				INNER JOIN public.user u ON u.id = t.user \
				LEFT JOIN reactions r ON r.tweet = t.id \
					AND r.user = ' + user_id +' \
			WHERE t.user = '+user_id +' \
			UNION ALL SELECT \
				t.id tid, \
				t.title, \
				t.text, \
				s.timestamp, \
				t.reaction, \
				u.id uid, \
				u.nome, \
				u.foto, \
				coalesce(r.reaction, 0) vote, \
				u2.id as shareuid, \
				u2.nome as shareuname \
			FROM tweet t \
				INNER JOIN public.user u ON u.id = t.user \
				INNER JOIN share s on s.tweet = t.id \
				INNER JOIN follow f ON f.follows = s.user \
				INNER JOIN public.user u2 on s.user = u2.id \
				LEFT JOIN reactions r ON r.tweet = t.id \
					AND r.user = ' + user_id +' \
			WHERE f.follower = '+user_id +' \
				AND f.timestamp < s.timestamp \
			UNION ALL SELECT \
				t.id tid, \
				t.title, \
				t.text, \
				s.timestamp, \
				t.reaction, \
				u.id uid, \
				u.nome, \
				u.foto, \
				coalesce(r.reaction, 0) vote, \
				u2.id as shareuid, \
				u2.nome as shareuname \
			FROM tweet t \
				INNER JOIN public.user u ON u.id = t.user \
				INNER JOIN share s on s.tweet = t.id \
				INNER JOIN public.user u2 on u2.id  = ' + user_id +'\
				LEFT JOIN reactions r ON r.tweet = t.id \
					AND r.user = ' + user_id +' \
			WHERE s.user = '+user_id +' \
			ORDER BY timestamp desc \
			LIMIT 100;',
		function(err, tweets){
			if (err) { 
				throw err; 
			}
			var list = [];
			for (var i = 0; i < tweets.rows.length; i++) {
				var  tweet = tweets.rows[i];
				var share = undefined;
				if(tweet.shareuid != null){
					share = {
						id:tweet.shareuid,
						nome:tweet.shareuname
					};
				}
				list.push({
					id:tweet.tid,
					title:tweet.title,
					text:tweet.text,
					timestamp:tweet.timestamp,
					votes:tweet.reaction,
					user_vote:tweet.vote,
					owner:{
						id:tweet.uid,
						nome:tweet.nome,
						foto:tweet.foto
					},
					share:share
				})
			}
			callback(list);
		});
	},
	search:function(mentions, temas, callback){
		callback();
	}
}