const express = require ('express')
const router = express.Router()
const jwt = require ('jsonwebtoken')
const JWTsecret = process.env.JWTsecret
const {SignUp , SignIn , EditProfile} = require ('../controllers/Employees')
const { Authorized } = require ('../controllers/Authorized')


//put SignUp 
router.put('/signup', async (req,res,next)=>{
    try {
        const { username , password , email , phoneNumber } = req.body
        const result = SignUp(username , password , email , phoneNumber)   
        res.json(result)
        console.log(result)

    } catch (error) {
        next(error)
    }
})

//get SignIn
router.get('/signin', async (req,res,next)=>{
    try {
        const { username , password} = req.body
        const result = await SignIn( username , password )
        if(result){
            const token = jwt.sign({ userId : result._id }, JWTsecret)
            res.cookie('token' , token , {httpOnly : true})
        }
        console.log(result)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

//put EditProfile
router.put('/editprofile', Authorized , async (req,res,next)=>{
    try {
        const { username , password , phoneNumber} = req.body
        const result = await EditProfile(username , password , phoneNumber)
        console.log(result)
        res.json(result)
    } catch (err) {
        next(err)
    }
})

//get Logout
router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.json(`logout done successfully`)
})

module.exports = router
