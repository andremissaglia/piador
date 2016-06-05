module.exports={
	insert:function(follower, follows, callback){
		Follow.find({follower:follower, follows:follows})
		.exec(function(err, vec){
			if(err){
				throw err;
			}
			if(vec.length > 0){
				callback();
				return;
			}
			Follow.create({follower:follower, follows:follows})
			.exec(function(err, obj){
				if(err){
					throw err;
				}
				callback();
			});
		});
	},
	remove:function(follower, follows, callback){
		Follow.destroy({follower:follower, follows:follows})
		.exec(function(err, usr){
			if(err){
				throw err;
			}
			callback();
		});
	},
	getFollowers:function(follows, callback){
		Follow.find({follows:follows}).populate('follower',{
			select:['id', 'nome', 'foto']
		})
		.exec(function(err, followers){
			var list = [];
			for (var i = 0; i < followers.length; i++) {
				list.push({
					pessoa:followers[i].follower,
					timestamp:followers[i].timestamp
				});
			}
			callback(list);
		});
	},
	getFollows:function(follower, callback){
		Follow.find({follower:follower}).populate('follows',{
			select:['id', 'nome', 'foto']
		})
		.exec(function(err, follows){
			var list = [];
			for (var i = 0; i < follows.length; i++) {
				list.push({
					pessoa:follows[i].follows,
					timestamp:follows[i].timestamp
				});
			}
			callback(list);
		});
	}
}