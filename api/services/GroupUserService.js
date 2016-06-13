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
			console.log(users);
			callback(users);
		})
	}
}