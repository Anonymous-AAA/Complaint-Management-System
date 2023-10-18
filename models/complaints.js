const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database")
const User = require('./user')
const Committee_Head=require('./committee_head')


// Define the Complaints model
const Complaints = sequelize.define('Complaints', {
  Complaint_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Date_posted: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Remarks: {
    type: DataTypes.STRING,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Location: {
    type: DataTypes.STRING,
  },
  User_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'User_id',
    },
  },
  Committee_Head_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Committee_Head,
      key: 'Committee_Head_id',
    },
  },
});

Complaints.belongsTo(User, { foreignKey: 'User_id' });
Complaints.belongsTo(Committee_Head, { foreignKey: 'Committee_Head_id' });
module.exports=Complaints