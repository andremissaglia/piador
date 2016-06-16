module.exports = {
	attributes: {
		tema: {
			type: 'string',
			primaryKey: true,
			required:true
		},
		posts: {
			collection:'Tweet',
			via:'themes',
			dominant:true
		}
	}
};
