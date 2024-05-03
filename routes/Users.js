const express = require ('express')
const router = express.Router()
const jwt = require ('jsonwebtoken')
const JWTsecret = process.env.JWTsecret
const {SignUp , SignIn , EditProfile , DeleteProfile} = require ('../controllers/Users')


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

//post SignIn
router.post('/signin', async (req,res,next)=>{
    try {
        const { username , password} = req.body
        const result = await SignIn( username , password )
        if(result){
            const token = jwt.sign({ userId : result._id }, JWTsecret)
            res.cookie('token' , token , {httpOnly : true})
            req.session.userId = result._id;
        }
        console.log(result)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

//put EditProfile
router.put('/editprofile', async (req,res,next)=>{
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

//delete DeleteProfile
router.delete('/deleteprofile', async (req, res) => {
    try {
        const userId = req.session.userId
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const result = await DeleteProfile(userId)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
})

module.exports = router
