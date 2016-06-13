module.exports = {
	associar:function(user, group, callback){
		GroupUser.create({userid:user, groupid:group}).exec(function(err, val){
			if(err){
				callback({status:'fail'});
			} else{
				callback({status:'success'});
			}
		})
	},
	desassociar:function(user, group, callback){
		GroupUser.destroy({userid:user, groupid:group}).exec(function(err, val){
			if(err){
				callback({status:'fail'});
			} else{
				callback({status:'success'});
			}
		})
	},
	getUsers:function(gid, callback){
		GroupUser.find({groupid:gid})
		.populate('userid', {
			select:['id', 'nome']
		}).exec(function(err, users){
			if(err){
				throw err;
			}
			var list=[];
			for (var i = users.length - 1; i >= 0; i--) {
				list.push({
					id:users[i].userid.id,
					login:users[i].userid.login,
				});
			}
			callback(list);
		})
	}
}