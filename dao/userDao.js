// 实现与MySQL交互 
var mysql = require('mysql'); 
var $conf = require('../conf/db'); 
//var $util = require('../util'); 
var $sql = require('./sqlMapping'); 

// 使用连接池，提升性能 
// var pool = mysql.createPool($util.extend({}, $conf.mysql)); 
var pool = mysql.createPool($conf.mysql); 

module.exports = { 
    login: function(req, res, next) {
        var param = req.body; 
        if(param.name == null || param.password == null) { 
            jsonWrite(res, undefined); 
            return; 
        } 
        pool.getConnection(function(err, connection) { 
            connection.query($sql.login, [param.name, param.password], function(err, result) {
                if(!result.length) {
                    res.json({'header':{'code':1,'mes':'用户名或密码错误'},'body':null});
                }else{
                    res.json({'header':{'code':0,'msg':'登录成功!'},'body':result[0]});
                }
                connection.release();  
            }); 
        });  
    } 
};