module.exports = {
        attributes: {
                id: {
                        type: 'integer',
                        primaryKey: true,
                        autoIncrement: true
                },
                follower: {
                        model: 'User',
                        required:true
                },
                follows: {
                        model: 'User',
                        required:true
                },
                timestamp: {
                        type: 'date'
                }
        }
};
