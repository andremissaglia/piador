module.exports = {
	create: function(user){

	},
	destroy: function(id){

	},
	find: function(id){

	},
	login: function(email, senha, success, fail){
		User.findOne({email:email,senha:senha}).exec(function(err, user){
			if(err){
				return fail();
			}
			return success(user.id);
		});
	},
}