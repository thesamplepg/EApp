const database = require("./database");
const app = require("./app");

const port = process.env.PORT || 5000;

database
    .connect()
    .then(message => {
        console.log(message);

        app.listen(port, err => {
            if (err) return console.log(err);

            console.log("__[ Server started ]__");
        });
    })
    .catch(err => {
        console.log(err);
    });
