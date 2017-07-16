/**
 * Created by prasanna on 7/16/17.
 */
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'devservicehelp@gmail.com',
        pass: 'a@a123456789'
    }
});

module.exports = transporter;