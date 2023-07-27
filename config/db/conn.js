const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`MongoDB connected with the server : ${data.connection.host}`);
    }).catch((e) => {
        console.log(e);
        console.log(`no connection`);
    });
}

module.exports = connectDatabase;




