const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database")

const Committee_Head= require('./committee_head')


// Define the Section model
const Section = sequelize.define('Section', {
  Section_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_Authorized: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Committee_Head_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Committee_Head,
      key: 'Committee_Head_id',
    },
  },
});

module.exports=Section