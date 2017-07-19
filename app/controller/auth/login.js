/**
 * Created by prasanna_d on 7/4/2017.
 */

var hashPass = require('password-hash');
var config = require('../../../config/config');
var jwt = require('jsonwebtoken');
var models = require('../../../db/models');

module.exports = {
    login : function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

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
                        var token = jwt.sign({email : user.email}, config.secret,{
                            expiresIn: 60*60*24   //Token expire in 24 Hours
                        });
                        var varify_status=0;
                        if(user.verify){varify_status = 1;}
                        return res.json({
                            error: "Login Success",
                            status: "success",
                            userid: user.id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            verified: varify_status,
                            token: token,
                            email: email
                        });
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