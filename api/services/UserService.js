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
			if(!usr){
				return; // TODO fail function
			}
			delete usr.password;
			delete usr.createdAt;
			delete usr.updatedAt;
			callback(usr);
		})
	},
	update:function(user, senhaAtual, callback){
		User.update({id:user.id, password:senhaAtual},user).exec(function(err, usr){
			if(err){
				throw err;
			}
			if(usr.length == 1){
				delete usr[0].password;
				delete usr[0].createdAt;
				delete usr[0].updatedAt;
				callback(usr[0]);
			} else {
				callback(undefined);
			}
		})
	},
	login: function(login, senha, success, fail){
		User.findOne({login:login,password:senha}).exec(function(err, user){
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