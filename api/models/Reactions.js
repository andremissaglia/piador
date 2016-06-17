module.exports = {
	attributes: {
		tweet: {
			model: 'Tweet',
			required:true
		},
		user: {
			model: 'User',
			required:true
		},
		reaction: {
			type: 'integer',
			required:true
		},
		timestamp: {
			type: 'datetime'
		}
	}
};
