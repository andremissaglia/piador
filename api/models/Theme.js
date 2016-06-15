module.exports = {
	attributes: {
		tema: {
			type: 'string',
			primaryKey: true
		},
		posts: {
			collection:'Tweet',
			via:'themes',
			dominant:true
		}
	}
};
