//引入所需模块
const async = require('async');
const db = require('../db');
const Constant = require('../constant/constant');
const dateFormat = require('dateformat');
const CateModel = require('../models/cate');
const InfoModel = require('../models/info');
const ArticleModel = require('../models/article');
//构建导出对象
const exportObj = {
    autoFn,
    getNavigation,
    getRandomArticle,
    getBlogInfo
};
module.exports = exportObj;
/*
* 返回公共方法
* tasks 当前controller执行tasks
* res 当前controller response
* returnObj 当前controller返回json对象
* */
function autoFn (tasks, res, returnObj) {
    //调用async的自动执行方法
    async.auto(tasks, function (err) {
        if(err){
            console.log(err);       //如有错误则打印错误
            res.render('error', {
                msg: '出错了'
            })
        } else {
            //定义一个async的子任务
            let _tasks = {
                //获取导航
                getNavigation: cb => {
                    getNavigation (cb)
                },
                //获取随机文章
                getRandomArticle: cb => {
                    getRandomArticle (cb)
                },
                //获取博客基本信息
                getBlogInfo: cb => {
                    getBlogInfo (cb)
                }
            };
            async.auto(_tasks, function(err, result){
                if(err){
                    console.log(err);       //如有错误则打印错误
                    res.render('error', {
                        msg: '出错了'
                    })
                } else {        //如果没有错误，则渲染数据到模板上
                    res.render(returnObj.template, {
                        cateList: result['getBlogInfo'],    //导航分类列表
                        randomArticleList: result['getRandomArticle'],  //侧边栏随机文章列表
                        blogInfo: result['getBlogInfo'],    //博客基本信息
                        curCate: returnObj.curCate,     //当前分类
                        path: returnObj.path,       //当前访问路径
                        title: returnObj.title,     //当前标题
                        data: returnObj.data        //页面数据
                    });
                }
            })
        }
    })
}
function getNavigation (cb) {
    //获取导航栏方法
    //cb 回调函数
    //查询cate表种所有数据
    CateModel
        .findAll()
        .then (function (result){
            //查询处理结果
            let list = [];
            result.forEach((v, i) => {
                let obj = {
                    id: v.id,
                    name: v.name,
                    path: v.path
                };
                list.push (obj);
            });
            cb(null, list);
        })
        .catch (function (err) {
            //错误处理
            console.log(err);
            cb (Constant.DEFAULT_ERROR);
        });
}
function getRandomArticle (cb) {
    //查询article表种的五条信息
    ArticleModel
        .findAll({
            limit: 5,
            order: db.random()
        })
        .then(
            function (result){
            let list = [];
            result.forEach((v, i) => {
                let obj = {
                id: v.id,
                title: v.title
                };
                list.push(obj);
            });
            cb(null, list);
        })
        .catch(function (err) {
            //错误处理
            console.log(err);
            cb (Constant.DEFAULT_ERROR);
        });
}
function getBlogInfo (cb) {
    /**
     * 获取博客基本信息的方法
     * cb 回调函数
     */
    InfoModel
        .findByPk(1)   //寻找主键为1的数据
        .then(function (result) {
            let list = [];
            let obj = {
                id: result.id,
                title: result.title,
                subtitle: result.subtitle,
                about: result.about,
                createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
            };
            list.push(obj);
            cb(null, list);
        })
        .catch(function (err) {
            //错误处理
            console.log(err);
            cb (Constant.DEFAULT_ERROR);
        });
}