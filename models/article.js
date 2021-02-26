const Sequelize = require('sequelize');
const db = require('../db');
const CateModel = require('./cate');
//建立数据库表的映射
const Article = db.define('Article',{
    id:{type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.STRING(30), allowNull: true},
    desc: {type: Sequelize.STRING(255), allowNull: true},
    cate: {type: Sequelize.INTEGER, allowNull: false},
    content: {type: Sequelize.TEXT, allowNull: true}},{underscored: true, tableName: 'article'
});
module.exports = Article;
// 文章所属于分类，一个分类包含多个文章，将文章表和分类表进行关联
Article.belongsTo(CateModel, {foreignKey: 'cate', constraints: false});