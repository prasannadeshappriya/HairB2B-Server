/**
 * Created by prasanna_d on 7/4/2017.
 */
var connection = require('../config/db');

exports.register = function(first_name, last_name, email, password, callback) {
    isUserExist(email,function (err,data) {
        if(err){callback(err,true,"");}
        else {
            if(data.length===0) {
                var values = [first_name, last_name, email, password];
                var query = 'INSERT INTO user (firstname, lastname, email, password) VALUES (?,?,?,?)';
                connection.query(query, values, function (err,rows) {
                    if (err) {callback(err,true,"");}
                    else {callback(null,false,"");}
                });
            }else{
                callback(null,true,"User already exist");
            }
        }
    });
};

function isUserExist(email,callback) {
    var query = 'SELECT id FROM user WHERE email=?';
    connection.query(query, [email], function (err,rows) {
        if(err){callback(err,null);}
        else {callback(null,rows);}
    });
}

exports.isUserExist = function (email, callback) {
    var query = 'SELECT id FROM user WHERE email=?';
    connection.query(query, [email], function (err,rows) {
       if(err){callback(err,null);}
       else {callback(null,rows);}
    });
};

exports.login = function(email,callback) {
    var values = [email];
    var query = 'SELECT password FROM user WHERE email=?';
    connection.query(query, values, function(err, result) {
        if (err){callback(err, null);}
        else{callback(null,result);}
    });
};