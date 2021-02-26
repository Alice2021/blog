const Sequelize = require('sequelize');
const db = require('../db');
//建立数据库表的映射
const Cate = db.define('Cate',{
    id:{type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING(20), allowNull: false},},{underscored: true, tableName: 'cate'
});
module.exports = Cate;   //导出数据库表供其他模块使用