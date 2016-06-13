module.exports = {
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement:true
		},
		nome: {
			type: 'string'
		},
		dono: {
			type: 'integer'
		},
		users:{
			collection: 'GroupUser',
			via:'userid'
		}
	}
};
