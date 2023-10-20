const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    logging: false,
  })


module.exports=sequelize

