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
			type: 'boolean', // true = positivo, false = negativo
			required:true
		},
		timestamp: {
			type: 'datetime'
		}
	}
};
