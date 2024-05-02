require('dotenv').config()
const Users = require ('../models/users')
const bcrypt = require ('bcryptjs')


const SignUp = async (username , password , email , phoneNumber) => {
    try{
        const hashedPassword = await bcrypt.hash(password , 10)
        const newUser = await Users.create({ username , password : hashedPassword , email , phoneNumber})
        return newUser
    }
    catch (err) {
        throw new Error (`couldn't create account correctly`)
    }
}

const SignIn = async (username , password) =>{
    try {
        const user = await Users.findOne({username})
        if(!user){
            throw new Error (`couldn't find username : ${username}`)
        }else{
            const IsPassword = await bcrypt.compare(password , user.password)
            if(IsPassword){
                return user
            }else if(!IsPassword){
                throw new Error (`invalid password`)
            }
        }
    } catch (err) {
        console.error('Error in SignIn function:', err)
    }
}

const EditProfile = async (username , password , phoneNumber)=>{
    try {
        const user = await Users.findOne({username})
        if(!user) {
            return { message: "User not found" };
        }
        if(username){
            user.username = username
        }
        if(phoneNumber){
            user.phoneNumber = phoneNumber
        }
        if(password){
            const hashedPassword = await bcrypt.hash(password , 10)
            user.password = hashedPassword
        }
        await user.save()
        return user
        
    } catch (error) {
        console.error('Error in editing function:', error)
    }
}

module.exports = {SignUp , SignIn , EditProfile}