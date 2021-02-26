const Sequelize = require('sequelize');
const db = require('../db');
//建立数据库表的映射
const Info = db.define('Info',{
    id:{type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.STRING(20), allowNull: true},
    subtitle: {type: Sequelize.STRING(30), allowNull: true},
    about: {type: Sequelize.TEXT, allowNull: true}},{underscored: true, tableName: 'info'
});
module.exports = Info;   //导出数据库表供其他模块使用