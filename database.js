const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'appdb.sqlite3',
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    //logging: false,
  })


module.exports=sequelize

