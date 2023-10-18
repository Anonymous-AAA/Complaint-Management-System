const express = require('express')
const sequelize = require("./database")
const CORS = require('cors')

const app= express()

const User=require('./models/user')
const Section=require('./models/section')
const Section_Comments=require('./models/section_comments')
const Complaints=require('./models/complaints')
const Committee_Head=require('./models/committee_head')


app.use(express.json())

app.use(CORS())



User.hasMany(Complaints, { foreignKey: 'User_id' });
Committee_Head.hasMany(Complaints, { foreignKey: 'Committee_Head_id' });
Committee_Head.hasMany(Section, { foreignKey: 'Committee_Head_id' });
Complaints.belongsTo(User, { foreignKey: 'User_id' });
Complaints.belongsTo(Committee_Head, { foreignKey: 'Committee_Head_id' });
Section_Comments.belongsTo(Section, { foreignKey: 'Section_id' });
Section_Comments.belongsTo(Complaints, { foreignKey: 'Complaint_id' });
Section.belongsTo(Committee_Head, { foreignKey: 'Committee_Head_id' });

// Synchronize the models with the database
sequelize.sync()
  .then(() => console.log('Database & tables created!'))

  Committee_Head.hasMany(Complaints, { foreignKey: 'Committee_Head_id' });
Committee_Head.hasMany(Section, { foreignKey: 'Committee_Head_id' });
Complaints.belongsTo(User, { foreignKey: 'User_id' });
Complaints.belongsTo(Committee_Head, { foreignKey: 'Committee_Head_id' });
Section_Comments.belongsTo(Section, { foreignKey: 'Section_id' });
Section_Comments.belongsTo(Complaints, { foreignKey: 'Complaint_id' });
Section.belongsTo(Committee_Head, { foreignKey: 'Committee_Head_id' });
User.hasMany(Complaints, { foreignKey: 'User_id' });



const router=require('./routes')
app.use('/',router)
app.listen(5000,()=>{
  console.log("Server is running on port 3000");
}
  )