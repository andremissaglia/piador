module.exports = {
	share: function (tweet, uid, callback) {
		Share.create({
			tweet:tweet,
			user:uid,
			timestamp:new Date()
		}).exec(function(err, share){
			if(err){
				throw err;
			}
			callback();
		});
	}
}