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