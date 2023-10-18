const express = require('express')
const sequelize = require("./database")

const app= express()



// Synchronize the models with the database
sequelize.sync({ force: true }).then((result) => {
  console.log(result)
  console.log('Models synchronized with the database');
});



const router=require('./routes')
app.use('/',router)
app.listen(3000)