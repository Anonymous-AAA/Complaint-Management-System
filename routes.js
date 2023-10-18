const express = require('express')
const router = express.Router()
const idFromType = require('./constants')
const typeFromId = require('./constants')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const Section = require('./models/section')
const Complaint = require('./models/complaints')
// const Comment = require('./models/comment')
// const Committee = require('./models/committee')


//jacky
router.put('/authorize/:id',(req,res)=>{
  res.json({Response:"User Authorized Successfully"})  
})


//jacky
router.delete('/rmUser/:id',(req,res)=>{
    res.json({Response:"User Removed"})
})

//manideep
router.put('/changeStatus/:id',(req,res)=>{
    res.json({Response:"Complaint Status Updated"})
})





//manideep
router.post('/complaint',(req,res)=>{
    
    res.json({Response:"Complaint Added Successfully"})
})

//alen
router.get('/complaints',(req,res)=>{
    res.json({Response:"Success",Complaints:"ans"})
})

//alen
router.route('/compaint/:id')
    .get((req,res)=>{
        res.json({Complaints:"complaint"})
    })
    .put((req,res)=>{
        res.json({Response :"Complaint Updated"})
    })
    .delete((req,res)=>{
        res.json({Response :"Complaint Deleted"})
    })



//gautham
router.get('/user/current',(req,res)=>{
    res.json({Response :"Successful"})
})


//amal
router.post('/signup',(req,res)=>{
    try {
        let data = req.body
    console.log(data)
    let passw=bcrypt.hashSync(data.password,10)
    if(data.role ==="user"){
        //check if user already exists
        if(User.findOne({where:{Email:data.email}})){
            return res.status(400).json({Response:"User Already Exists"})
        }

        
        User.create({
            Name:data.name,
            Department:data.department,
            Email:data.email,
            Password:passw
        })

        //insert into user table
        //send response
    }

    if(data.role=="section head") {
        //check if user already exists
        if(Section.findOne({where:{Email:data.email}})){
            return res.status(400).json({Response:"User Already Exists"})
        }

        Section.create({
            Name:data.name,
            Designation:data.designation,
            Email:data.email,
            Password:passw,
            Committee_Head_id:typeFromId[data.type],
            is_Authorized:false

            
        })

    }

    if(data.role !=="user" && data.role !=="section head") {
        return res.status(400).json({Response:"Invalid Role"})

    }
    return res.status(201).json({Response:"User Created",
   

})
    } catch (error) {

        res.status(500).json({Response:"Error"})
        
    }
    

    
})


//amal
router.post('/login',(req,res)=>{
    res.json({token:"token"})
})


//gautham
router.post('/comment/:id',(req,res)=>{
    res.json({Response:"New Commment Added"})
})

//gautham
router.put('/resolve/:id',(req,res)=>{
    res.json({Response:"Complaint Resolved"})
})

router.get('/test',(req,res)=>{
    res.json({Response:"Request successful"})
})


module.exports=router