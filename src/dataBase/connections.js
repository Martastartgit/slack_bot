const mongoose = require('mongoose');

const URI = 'mongodb+srv://dbUser:dbUser@slackcluster.fqo3f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('DB connect!')
}

module.exports = connectDB;
