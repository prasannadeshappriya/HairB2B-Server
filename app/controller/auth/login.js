/**
 * Created by prasanna_d on 7/4/2017.
 */

var hashPass = require('password-hash');
var token_generator = require('rand-token');
var models = require('../../../db/models');

module.exports = {
    login : function (req, res) {
        var email = req.query.email;
        var password = req.query.password;

        //Validating data
        if(typeof email==="undefined"){return res.json({status : 'email field is required'});}
        if(typeof password==="undefined"){return res.json({status : 'password field is required'});}

        if(email!==""){
            if(password!==""){
                models.user.findOne({
                    where: {
                        email: email
                    }
                }).then(function(user){
                    //No match for given email address
                    if(user===null){
                        return res.json({error : "Username or password is invalid", status : "fail"});
                    }
                    //Check the password with the hashed password
                    if(hashPass.verify(password,user.password)) {
                        return res.json({error: "Login Success", status: "success"});
                    }
                    //Unauthorized access
                    return res.json({error : "Username or password is invalid", status : "fail"});
                }).catch(function(err){
                    console.log('Error occured: ', err);
                    return res.json({error : "Server error occurred", status : "fail"});
                });
            }else{return res.json({status : 'username or password cannot be blank'});}
        }else{return res.json({status : 'username or password cannot be blank'});}
    }
};