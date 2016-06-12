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
			type: 'string'
		}
	}
};
