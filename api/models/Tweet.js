module.exports = {
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement:true,
			required:true
		},
		user: {
			model: 'User',
			required:true
		},
		title: {
			type: 'string'
		},
		text: {
			type: 'string'
		},
		timestamp: {
			type: 'datetime'
		},
		reaction: {
			type: 'integer'
		},
		themes: {
			collection: 'Theme',
			via: 'posts'
		}
	}
};
