require('dotenv').config()

const express = require ('express')
const http = require ('http')
const cookieParser = require ('cookie-parser')
const session = require ('express-session')
const mongoStore = require ('connect-mongo')
const connectDB = require ('./config/db')

connectDB()

const app = express()
const PORT = 3000 || process.env.PORT 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(session({
    secret : 'keyboard cat',
    saveUninitialized : true ,
    resave : false ,
    store : mongoStore.create({
        mongoUrl : process.env.mongoURI
    })
}))

app.use('/', require('./routes/Users'))

http.createServer(app).listen(PORT,()=>{
    console.log(`server is running on PORT : ${PORT}`)
})