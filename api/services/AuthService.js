var jwt = require('jsonwebtoken'),
	tokenSecret = "chave-super-secreta";
module.exports = {
	issue: function(payload){
		return jwt.sign(
			payload,
			tokenSecret,
			{
				expiresIn:60*60*24*7
			}
			)
	},
	verify: function(token){
		return jwt.verify(
				token,
				tokenSecret
		);
	}
};