module.exports = {
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement:true
		},
		tweet: {
			type: 'integer'
		},
		user: {
			type: 'integer'
		},
		timestamp: {
			type: 'date'
		}
	}
};
