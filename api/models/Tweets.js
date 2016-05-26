module.exports = {
        attributes: {
                id: {
                        type: 'integer',
                        primaryKey: true
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
                        type: 'date'
                }
        }
};
