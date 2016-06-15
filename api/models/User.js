module.exports = {
	attributes : {
		id: {
			type:'integer',
			primaryKey:true,
			unique:true,
			autoIncrement:true
		},
		nome: {
			type:'string'
		},
		login: {
			type:'string',
			unique:true
		},
		foto: {
			type:'string'
		},
		descricao: {
			type:'text'
		},
		nascimento: {
			type:'date'
		},
		password: {
			type:'string' 
		},
	}
}