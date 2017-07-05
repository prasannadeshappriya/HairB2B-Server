/**
 * Created by prasanna_d on 7/4/2017.
 */
var db = require('../db');
var connection = db.getConnection();

exports.register = function(name, password,callback) {
    isUserExist(name,function (err,data) {
        if(err){callback(err,true,"");}
        else {
            if(data.length===0) {
                var values = [name, password];
                var query = 'INSERT INTO user (name,password) VALUES (?,?)';
                connection.query(query, values, function (err,rows) {
                    if (err) {
                        callback(err,true,"");
                    }
                    else {
                        callback(null,false,"");
                    }
                });
            }else{
                callback(null,true,"user already exist in the database");
            }
        }
    });
};

function isUserExist(name,callback) {
    var query = 'SELECT id FROM user WHERE name=?';
    connection.query(query, name, function (err,rows) {
        if(err){
            callback(err,null);
        } else {
            callback(null,rows);
        }
    });
}

exports.isUserExist = function (name, callback) {
    var query = 'SELECT id FROM user WHERE name=?';
    connection.query(query, name, function (err,rows) {
       if(err){
           callback(err,null);
       } else {
           callback(null,rows);
       }
    });
};

exports.login = function(name, password,callback) {
    var values = [name, password];
    var query = 'SELECT name FROM user WHERE name=? AND password=?';
    connection.query(query, values, function(err, result) {
        if (err){
            callback(err, null);
        }else{
            callback(null,result);
        }
    });
};