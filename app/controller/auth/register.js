/**
 * Created by prasanna_d on 7/4/2017.
 */
var passhash = require('password-hash');
var models = require('../../../db/models');
var config = require('../../../config/config');
var jwt = require('jsonwebtoken');

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
                return res.json({
                    error: "Login Success",
                    status: "success",
                    firstname: user.firstname,
                    lastname: user.lastname,
                    token: token,
                    email: email
                });
            }
            return res.json({error : "User already exist", status : "fail"});
        }).catch(function(err){
            console.log('Error occured: ', err);
            return res.json({error : "Server error occurred", status : "fail"});
        });
    }
};


