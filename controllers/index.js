const Common = require('./common');
const async = require('async');
const dateFormat = require('dateformat');
const CateModel = require('../models/cate');
const InfoModel = require('../models/info');
const ArticleModel = require('../models/article');
const Constant = require('../constant/constant');
let exportObj = {
    index,
    cate,
    article,
    about
};
module.exports = exportObj; //导出对象，供其他模块使用
function index (req, res) {
    //首页渲染方法
    let returnObj = {}; //设定一个对象，用于返回方法返回的数据
    let rows = 2;   //sql中需要的数据，即查询多少条
    let page = req.query.page || 1; //当前页码
    let tasks = {
        //查询文章方法
        queryArticle: cb => {
            //根据前端提交的参数计算sql语句需要的offset,即从多少条开始查询
            let offset = rows * (page - 1);
            //根据offset和limit使用admin的model到数据库中查询
            ArticleModel
                .findAndCountAll({
                    offset: offset,
                    limit: rows,
                    order: [['created_at', 'DESC']],
                    //关联cate表进行连表查询
                    include: [{
                        model: CateModel
                    }]
                })
                .then(function (result){
                    //查询处理结果
                    let list = [];
                    //将查询出来的结果装入list
                    result.rows.forEach((v, i) => {
                        //将结果的每一项给数组每一项list赋值
                        let obj = {
                            id: v.id,
                            title: v.title,
                            desc: v.desc,
                            cate: v.cate,
                            cateName: v.Cate.name,
                            createdAt: dateFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
                        };
                        list.push(obj);
                    });
                    //推给公共方法的参数
                    returnObj.template = 'index';
                    returnObj.path = 'index';
                    returnObj.data = {
                        list: list,
                        page: Number (page),
                        pageCount: Math.ceil (result.count / rows)
                    };
                    cb (null);
                })
                .catch(function (err) {
                    //错误处理
                    console.log(err);
                    cb (Constant.DEFAULT_ERROR);
                });
        }
    };
    Common.autoFn(tasks, res, returnObj);
}
function cate (req, res) {
    //分类页渲染方法
    let returnObj = {}; //设定一个对象，用于返回方法返回的数据
    let rows = 2;   //sql中需要的数据，即查询多少条
    let page = req.query.page || 1; //当前页码
    let curCate = req.params.cateId;    //当前分类id
    //定义一个async方法
    let tasks = {
        //查询文章方法
        queryArticle: cb => {
            //根据前端提交的参数计算sql语句需要的offset,即从多少条开始查询
            let offset = rows * (page - 1);
            //根据offset和limit使用admin的model到数据库中查询
            ArticleModel
                .findAndCountAll({
                    //按分类查询
                    where: {
                        cate: curCate
                    },
                    offset: offset,
                    limit: rows,
                    order: [['created_at', 'DESC']],
                    //关联cate表进行连表查询
                    include: [{
                        model: CateModel
                    }]
                })
                .then(function (result){
                    //查询处理结果
                    let list = [];
                    let curCateName = '';   //设定变量，保存当前分类名称
                    //将查询出来的结果装入list
                    result.rows.forEach((v, i) => {
                        //查询出当前分类对应的分类名称
                        if (v.cate == curCate){
                            curCateName = v.Cate.Name
                        }
                        //将结果的每一项给数组每一项list赋值
                        let obj = {
                            id: v.id,
                            title: v.title,
                            desc: v.desc,
                            cate: v.cate,
                            cateName: v.Cate.name,
                            createdAt: dateFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
                        };
                        list.push(obj);
                    });
                    //推给公共方法的参数
                    returnObj.template = 'cate';
                    returnObj.path = 'cate';
                    returnObj.curCate = curCate;
                    returnObj.name = curCateName;
                    returnObj.data = {
                        list: list,
                        page: Number (page),
                        pageCount: Math.ceil (result.count / rows)
                    };
                    cb (null);
                })
                .catch(function (err) {
                    //错误处理
                    console.log(err);
                    cb (Constant.DEFAULT_ERROR);
                });
        }
    };
    Common.autoFn(tasks, res, returnObj);
}
function article (req, res) {
    //文章页渲染方法
    let returnObj = {}; //设定一个对象，用于返回方法返回的数据
    //定义一个async任务
    let tasks = {
        //查询文章方法
        queryArticle: cb => {
            ArticleModel
                .findByPk(
                    req.params.articleId,
                    {
                        include: [{
                            model: CateModel    //关联cate表进行查询
                        }]
                    })
                .then(function (result){
                    //查询处理结果
                    let obj = {
                        id: result.id,
                        title: result.title,
                        content: result.content,
                        cate: result.cate,
                        cateName: result.Cate.name,
                        createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
                    };
                    //推给公共方法的参数
                    returnObj.template = 'article';
                    returnObj.curCate = obj.cate;
                    returnObj.title = obj.cateName;
                    returnObj.path = 'article';
                    returnObj.title = obj.title;
                    returnObj.data = obj;
                    cb (null);
                })
                .catch(function (err) {
                    //错误处理
                    console.log(err);
                    cb (Constant.DEFAULT_ERROR);
                });
        }
    };
    Common.autoFn(tasks, res, returnObj);
}
function about (req, res) {
    //关于页渲染方法
    let returnObj = {}; //设定一个对象，用于返回方法返回的数据
    //定义一个async任务
    let tasks = {
        //查询文章方法
        query: cb => {
            InfoModel
                .findByPk(1)
                .then(function (result){
                    //查询处理结果
                    let obj = {
                        id: result.id,
                        subtitle: result.subtitle,
                        about: result.about,
                        createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
                    };
                    //推给公共方法的参数
                    returnObj.template = 'about';
                    returnObj.path = 'about';
                    returnObj.data = obj;
                    cb (null);
                })
                .catch(function (err) {
                    //错误处理
                    console.log(err);
                    cb (Constant.DEFAULT_ERROR);
                });
        }
    };
    Common.autoFn(tasks, res, returnObj);
};