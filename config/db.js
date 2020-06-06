const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async() => {

    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        await mongoose.connect(process.env.DB_MONGO, options);
        console.log('DB running!');


    } catch (error) {
        console.log(error);
        process.exit(1);

    }

}

module.exports = conectarDB;