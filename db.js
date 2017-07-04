/**
 * Created by prasanna_d on 7/4/2017.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1000',
    database: 'sample'
});

exports.connect = function () {
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected");
        } else {
            console.log("Error connecting database");
        }
    });
};

exports.getConnection = function () {
    return connection;
};
