var getEspeciais = function(texto, delimitador){
	var matches;
	//captura temas/mentions
	if(delimitador=='#'){
		matches = texto.match(/#[a-zA-Z0-9]+/g);
	} else if(delimitador=='@') {
		matches = texto.match(/@[a-zA-Z0-9]+/g);
	} else {
		throw "Você ta usando a função errado...";
	}
	if(!matches){
		return [];
	}
	//retira os "#" ou "@""
	for (var i = matches.length - 1; i >= 0; i--) {
		matches[i] = matches[i].slice(1);
	}
	//filtra os repetidos
	matches = matches.filter(function(item, pos){
		return matches.indexOf(item) == pos;
	})
	return matches;
}
//executa uma query e formata a saida em um padrão
var queryTweets = function(query, callback){
	Tweet.query(query, function(err, tweets){
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
		sails.log.debug(list);
		callback(list);
	});
}
module.exports = {
	new: function(tweet, callback){
		tweet.timestamp=new Date();
		tweet.reaction=0;
		Tweet.create(tweet).exec(function(err, post) {
			if (err) { 
				throw err; 
			}
			var temas = getEspeciais(tweet.text,'#');
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
		queryTweets('\
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
			LIMIT 100;',callback);
	},
	search:function(user_id, termo, callback){
		var mentions = getEspeciais(termo, '@');
		for (var i = mentions.length - 1; i >= 0; i--) {
			mentions[i] = "'"+mentions[i]+"'";
		}
		mentions = mentions.join(',');
		var wherementions = mentions ? 'WHERE u.login in ('+mentions+')': 'true';

		var temas = getEspeciais(termo, '#');
		for (var i = temas.length - 1; i >= 0; i--) {
			temas[i] = "'"+temas[i]+"'";
		}
		temas = temas.join(',');
		var wheretemas = temas ? 'WHERE th.tema in ('+temas+')': 'true';

		queryTweets('\
			SELECT DISTINCT \
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
				INNER JOIN theme_posts__tweet_themes tp\
					ON tp.tweet_themes = t.id \
				INNER JOIN theme th ON th.id=tp.theme_posts \
			'+wheretemas+' AND '+wherementions+'\
			ORDER BY timestamp desc \
			LIMIT 100;', callback);
	}
}