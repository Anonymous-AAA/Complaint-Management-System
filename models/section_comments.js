const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database")

// Define the Section_Comments model
const Section_Comments = sequelize.define('Section_Comments', {
  Section_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  Complaint_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  Comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Section_Comments.belongsTo(Section, { foreignKey: 'Section_id' });
Section_Comments.belongsTo(Complaints, { foreignKey: 'Complaint_id' });
module.exports=Section_Comments