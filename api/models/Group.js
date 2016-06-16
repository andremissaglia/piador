module.exports = {
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement:true,
			required:true
		},
		nome: {
			type: 'string',
			required:true
		},
		dono: {
			model: 'User',
			required:true
		},
		users:{
			collection: 'GroupUser',
			via:'userid'
		}
	}
};
