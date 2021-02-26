const Sequelize = require('sequelize');
const Config = require('./config');
var sequelize = new Sequelize(    //创建一个sequelize实例，链接数据库
    Config.MYSQL.database,
    Config.MYSQL.username,
    Config.MYSQL.password,
    {
        host: Config.MYSQL.host,
        dialect: 'mysql',
        logging: Config.DEBUG ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        timezone: '+08:00'
    }
);
module.exports = sequelize;
