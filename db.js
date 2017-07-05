/**
 * Created by prasanna_d on 7/4/2017.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'internship',
    password: '1000',
    database: 'hairb2b_database'
});


connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error connecting database");
    }
});

module.exports = connection;
