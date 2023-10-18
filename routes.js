const express = require('express')
const router = express.Router()
const idFromType = require('./constants')



router.put('/authorize/:id',(req,res)=>{
  res.json({Response:"User Authorized Successfully"})  
})


router.delete('/rmUser/:id',(req,res)=>{
    res.json({Response:"User Removed"})
})


router.put('/changeStatus/:id',(req,res)=>{
    res.json({Response:"Complaint Status Updated"})
})





router.post('/complaint',(req,res)=>{
    
    res.json({Response:"Complaint Added Successfully"})
})


router.get('/complaints',(req,res)=>{
    res.json({Response:"Success",Complaints:"ans"})
})


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




router.get('/user/current',(req,res)=>{
    res.json({Response :"Successful"})
})


router.post('/signup',(req,res)=>{
    let data = req.body
    res.status(201).json(
        {
            //Response:"User Created Successfully",
            token:"token"
        }
    )
})


router.post('/login',(req,res)=>{
    res.json({token:"token"})
})


router.post('/comment/:id',(req,res)=>{
    res.json({Response:"New Commment Added"})
})

router.put('/resolve/:id',(req,res)=>{
    res.json({Response:"Complaint Resolved"})
})

router.get('/test',(req,res)=>{
    res.json({Response:"Request successful"})
})


module.exports=router