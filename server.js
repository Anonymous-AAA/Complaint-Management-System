const express = require('express')
const sequelize = require("./database")
const User = require('./models/user')
const Section=require('./models/section')
const Section_Comments=require('./models/section_comments')
const Complaints=require('./models/complaints')
const Committee_Head=require('./models/committee_head')

const app= express()



// Synchronize the models with the database
sequelize.sync({ force: true }).then((result) => {
  console.log(result)
  console.log('Models synchronized with the database');
});



const router=require('./routes')
app.use('/',router)
app.listen(3000)