/**
 * Created by prasanna_d on 7/4/2017.
 */
var passhash = require('password-hash');
var models = require('../../../db/models');
var config = require('../../../config/config');
var jwt = require('jsonwebtoken');
var transporter = require('../auth/email.service');

function createEmailBody(email, firstname, lastname, link) {
    var mailOptions = {
        from: 'devservicehelp@gmail.com',
        to: email,
        subject: 'Verify your email address!',
        html: '<h1 class="text-center text-info">HairB2B</h1>' +
        '<br>' +
        '<h3>Hi ' + firstname + ' ' + lastname + ',</h3>' +
        '<p>Complete your registration to get started on HairB2B. ' +
        'Just verify your email address by click on below link <br>' +
        '<a href='+link+'>' + link + '</a></p>' +
        '<br>' +
        '<p>Thanks,</p>' +
        '<p>HairB2B Team</p>'
    };
    return mailOptions;
}

function sendVerifyEmail(mailOptions, callback) {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            callback(false);
        } else {
            console.log('Email sent: ' + info.response);
            callback(true);
        }
    });

}

module.exports = {
    register : function (req, res) {
        var first_name= req.body.firstname;
        var last_name= req.body.lastname;
        var email= req.body.email;
        var password = req.body.password;

        password = passhash.generate(password);
        models.user.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                    firstname: first_name,
                    lastname: last_name,
                    email: email,
                    password: password,
                    role_id: 2,
                    location_id: 1,
                    verify: 0,
                    profilepic: 'null',
                    profilebannerpic: 'null'
                }
        }).spread(function(user, created){
            if(created){
                var token = jwt.sign({email : user.email}, config.secret,{
                    expiresIn: 60*60*24   //Token expire in 24 Hours
                });
                var accValidateLink = "http://localhost:3000/auth/verify?token=" + token;
                var mailOptions = createEmailBody(email,first_name, last_name,accValidateLink);
                sendVerifyEmail(mailOptions,function (callback) {
                    if(callback){
                        console.log('Registration success');
                    }else{
                        console.log('Registration success, There is an error on sending verification link');
                    }
                });
                return res.json({
                    error: "Registration success",
                    status: "success",
                    firstname: user.firstname,
                    lastname: user.lastname,
                    verified:0,
                    token: token,
                    email: email
                });

            }
            return res.json({error : "User already exist", status : "fail"});
        }).catch(function(err){
            console.log('Error occured: ', err);
            return res.json({error : "Server error occurred", status : "fail"});
        });
    },

    getVerifyStatus: function (req,res) {
        return res.json({verify: req.user.verify});
    },

    verify: function (req,res) {
        var token = req.query.token;
        var decoded = jwt.decode(token);

        models.user.update({
                verify: 1}, {
            where: {
                    email: decoded.email,
                    verify: 0
                }
            }
        ).spread(function (status) {
            if(status){
                //User Verified
                return res.redirect('http://localhost:63342/HairB2B/#!/');
            }else{
                return res.send("Link is expired or something wrong, Try again");
            }
        }).catch(function (err) {
            console.log('Error occurred while processing the request: ' + err);
            return res.send("Server Error");
        });
    }
};
