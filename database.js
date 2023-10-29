const { Sequelize } = require('sequelize')
require('dotenv').config()

//const sequelize = new Sequelize({
    //dialect: process.env.DB_DIALECT,
    //storage: process.env.DB_STORAGE,
    //define: {
        //timestamps: false,
        //freezeTableName: true,
    //},
    //logging: false,
  //})

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  define: {
        timestamps: false,
        freezeTableName: true,
    },
    logging: false,
});


module.exports=sequelize

