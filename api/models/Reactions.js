module.exports = {
        attributes: {
                tweet: {
                        type: 'integer',
                        primaryKey: true
                },
                user: {
                        type: 'integer'
                },
                reaction: {
                        type: 'boolean'
                },
                timestamp: {
                        type: 'date'
                }
        }
};
