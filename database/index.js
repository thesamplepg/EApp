const mongoose = require('mongoose');

module.exports.connect = () => new Promise((resolve, reject) => {
    const options = {
        useNewUrlParser: true
    }

    if (process.env.NODE_ENV === 'test') {
        const { Mockgoose } = require('mockgoose');
        const mockgoose = new Mockgoose(mongoose);

        mockgoose.prepareStorage().then(() => {
            mongoose.connect(process.env.MONGO_URI, options)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    } else {
        mongoose.connect(process.env.MONGO_URI, options)
            .then(() => {
                resolve('__[ Mongo connected ]__');
            })
            .catch(err => {
                reject(err);
            });
    }
});

module.exports.disconnect = () => {
    return mongoose.disconnect();
}