module.exports = {
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement:true
		},
		user: {
			type: 'integer'
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
