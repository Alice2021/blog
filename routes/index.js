var express = require('express');
var router = express.Router();

const IndexController = require('../controllers/index');  //引入控制路由
router.get('/', IndexController.index); //定义首页路由
router.get('/cate/:cateId', IndexController.cate); //定义分类路由
router.get('/article/:articleId', IndexController.article); //定义文章路由
router.get('/about', IndexController.about); //定义关于我们路由
module.exports = router;
