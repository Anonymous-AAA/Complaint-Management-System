const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database")
const Complaints = require('./complaints')
const Section = require('./section')

// Define the Committee_Head model
const Committee_Head = sequelize.define('Committee_Head', {
  Committee_Head_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Type: {
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
});

Committee_Head.hasMany(Complaints, { foreignKey: 'Committee_Head_id' });
Committee_Head.hasMany(Section, { foreignKey: 'Committee_Head_id' });
module.exports=Committee_Head