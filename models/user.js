const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database")
const Complaints = require("./complaints")


// Define the User model
const User = sequelize.define('User', {
  User_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Department: {
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

User.hasMany(Complaints, { foreignKey: 'User_id' });

module.exports=User