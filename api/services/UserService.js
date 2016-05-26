module.exports = {
	create: function(user, callback){
		User.create(user).exec(function(err, usr){
			if(err){
				throw err;
			}
			callback(usr);
		})
	},
	destroy: function(id, callback){
		User.destroy({id:id}).exec(function(err, usr){
			if(err){
				throw err;
			}
			callback();
		})
	},
	find: function(id, callback){
		User.findOne({id:id}).exec(function(err, usr){
			if(err){
				throw err;
			}
			if(!user){
				return; // TODO fail function
			}
			delete usr.password;
			delete user.createdAt;
			delete user.updatedAt;
			callback(usr);
		})
	},
	login: function(login, senha, success, fail){
		User.findOne({login:login,senha:senha}).exec(function(err, user){
			if(err){
				throw err;
			}
			if(!user){
				return fail();
			}
			delete user.password;
			delete user.createdAt;
			delete user.updatedAt;
			return success(user);
		});
	},
}