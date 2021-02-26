const config = {    //配置数据库
    DEBUG: true,
    MYSQL: {
        host: 'localhost',
        database: 'blog',
        username: 'root',
        password: 'root'
    }
};
if (process.env.NODE_ENV === 'production') {
    config.MYSQL = {
        host: 'aaa.mysql.rds.aliyuncs.com',
        database: 'aaa',
        username: 'aaa',
        password: 'aaa'
    };
}
module.exports = config;