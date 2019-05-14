// 实现与MySQL交互 
var mysql = require('mysql'); 
var $conf = require('../conf/db'); 
//var $util = require('../util'); 
var $sql = require('./sqlMapping'); 

// 使用连接池，提升性能 
// var pool = mysql.createPool($util.extend({}, $conf.mysql)); 
var pool = mysql.createPool($conf.mysql); 

// 向前台返回JSON方法的简单封装 
var jsonWrite = function (res, ret) { 
    if(typeof ret === 'undefined') { 
        res.json({'header':{'code':1,'msg':'操作失败'},'body':ret}); 
    } else { 
        res.json({'header':{'code':0,'msg':''},'body':ret}); 
    } 
};

module.exports = { 
    queryAll: function (req, res, next) { 
        pool.getConnection(function(err, connection) { 
            connection.query($sql.queryAll, function(err, result) { 
                if(err){
                    console.log(err);
                }else{
                    jsonWrite(res, result);
                }
                connection.release(); 
            }); 
        }); 
    },

    add: function (req, res, next) { 
        pool.getConnection(function(err, connection) { 
            // 获取前台页面传过来的参数 
            var param = req.body;
            // 建立连接，向表中插入值 
            // 'INSERT INTO user(name, startDate, endDate, curMon, nextMon) VALUES(?,?,?,?,?)', 
            connection.query($sql.insert, [param.name, param.startDate, param.endDate, param.curMon, param.nextMon], function(err, result) { 
                if(err) { 
                    console.log(err); 
                } 
                // 以json形式，把操作结果返回给前台页面 
                jsonWrite(res, result); 
                // 释放连接 
                connection.release(); 
            }); 
        }); 
    }, 

    update: function (req, res, next) { 
        var param = req.body; 
        pool.getConnection(function(err, connection) { 
            connection.query($sql.update, [param.name, param.startDate, param.endDate, param.curMon, param.nextMon, param.id], function(err, result) { 
                if(err) { 
                    console.log(err); 
                } 
                jsonWrite(res, result); 
                connection.release(); 
            }); 
        }); 
    }, 

    delete: function (req, res, next) { 
        // delete by Id 
        pool.getConnection(function(err, connection) { 
            var id = req.query.id; 
            connection.query($sql.delete, id, function(err, result) { 
                if(err) { 
                    console.log(err); 
                } 
                jsonWrite(res, result); 
                connection.release(); 
            }); 
        }); 
    }, 
    
    queryById: function (req, res, next) { 
        var id = req.query.id; 
        pool.getConnection(function(err, connection) { 
            connection.query($sql.queryById, id, function(err, result) { 
                if(err) { 
                    console.log(err); 
                } 
                jsonWrite(res, result); 
                connection.release(); 
            }); 
        }); 
    }
};