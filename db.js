const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

async function conntectToDB() { //connection to the database
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Connected to Database")
    }
    catch (error) {
        console.log("Error Occured", error)
    }
}

module.exports = conntectToDB
