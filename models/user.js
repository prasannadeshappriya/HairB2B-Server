/**
 * Created by prasanna_d on 7/4/2017.
 */
var db = require('../db');
var connection = db.getConnection();

exports.insert = function(name, password) {
    var values = [name, password];
    var query = 'INSERT INTO user (name,password) VALUES (?,?)';
    connection.query(query, values, function(err, result) {
        if (err) throw err;
    });
};

exports.getUsers = function(callback) {
    connection.query('SELECT name FROM user', function (err, rows) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
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