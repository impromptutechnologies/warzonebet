const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}

const db = mongoose.connection
db.once('open', () => console.log('open'));


