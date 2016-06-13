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
	}
}