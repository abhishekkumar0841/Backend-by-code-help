const mongoose = require('mongoose');

require('dotenv').config();

function dbConnect(){
    mongoose.connect(process.env.DATABASE_URI).then(()=>{
        console.log("Data connected successfully...")
    }).catch((err)=>{
        console.log("Something wrong while database connection!")
        console.log(err)
        process.exit(1)
    })
};

module.exports = dbConnect;