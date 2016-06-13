module.exports={
	new:function(name, user, callback){
		Group.create({dono:user, nome:name}).exec(function(err, grupo){
			if(err){
				callback({status:"fail"});
				return;
			}
			GroupUserService.associar(user,grupo.id, function(status){
				callback(status);
			})
		});
	},
	list:function(user, callback){
		Group.find({
			select:['id','nome'],
			where:{
				dono:user
			}
		}).exec(function(err, groups){
			if(err){
				throw err;
			}
			callback(groups);
		});
	},
	get:function(gid, callback){
		Group.findOne({
			select:['id','nome', 'dono'],
			where:{
				id:gid
			}
		}).exec(function(err, group){
			if(err){
				throw err;
			}
			callback(group);
		});	
	}
}