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
		email: {
			type:'email',
			unique:true
		},
		sexo: {
			type:'string',
			enum:['M','F'],
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
			// Sem segurança nenhuma porque quero evitar a fadiga
			type:'string' 
		},
	}
}