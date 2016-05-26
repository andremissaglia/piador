module.exports = {
        attributes: {
                id: {
                        type: 'integer',
                        primaryKey: true,
                        autoIncrement: true
                },
                follower: {
                        type: 'integer'
                },
                follow: {
                        type: 'integer'
                },
                timestamp: {
                        type: 'date'
                }
        }
};
