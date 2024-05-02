const mongoose = require ('mongoose')
require ('dotenv').config()

const connectDB = async ()=>{
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.MongoURI)
        if (conn){console.log(`connected successfully to db : ${conn.connection.host}`)}
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB