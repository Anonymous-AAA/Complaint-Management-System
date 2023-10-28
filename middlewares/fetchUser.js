//a middleware to fetch user from jwt token and add user and role to req object

const jwt = require('jsonwebtoken')
const User=require('../models/user')
const Committee_Head=require('../models/committee_head')
const dotenv = require('dotenv')
dotenv.config()

const fetchUser=(req,res,next)=>{

    //get the user from jwt token and add id to req object
    const token=req.header('x-access-token')
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        const data=jwt.verify(token,process.env.JWT_SECRET)
        data.user.id=data.user.Committee_Head_id || data.user.User_id || data.user.Section_id
        req.current_user=data.user
        
        console.log(data)
        next()
    }catch(error){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports=fetchUser