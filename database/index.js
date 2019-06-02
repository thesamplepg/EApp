const mongoose = require('mongoose');

module.exports.connect = () =>
  new Promise(async (resolve, reject) => {

    if (process.env.NODE_ENV === "test") {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongod = new MongoMemoryServer();

      mongod.getConnectionString().then((mongoURI) => {
        mongoose
          .connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true
          })
          .then((res) => {
            resolve();
          })
          .catch(err => reject(err));
      })
      .catch(err => console.log(err));
    } else {
      mongoose.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true }
      )
        .then(res => resolve('__[ Mongo connected ]__'))
        .catch(err => reject());
    }
  });

module.exports.close = () => {
  return mongoose.disconnect();
};
