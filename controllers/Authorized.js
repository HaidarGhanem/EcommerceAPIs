require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWTsecret = process.env.JWTsecret

const Authorized = async (req,res) =>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decode = jwt.verify(token , JWTsecret)
        req.userId = decode.userId
        next()
    } catch (error) {
        console.log(error)
    }
}   

module.exports = {Authorized}