module.exports = {
	attributes: {
		tema: {
			type: 'string',
			unique:true
		},
		posts: {
			collection:'Tweet',
			via:'themes',
			dominant:true
		}
	}
};
