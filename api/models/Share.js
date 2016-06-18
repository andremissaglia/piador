module.exports = {
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement:true
		},
		tweet: {
			model: 'Tweet',
			required:true
		},
		user: {
			model: 'User',
			required:true
		},
		timestamp: {
			type: 'datetime'
		}
	}
};
