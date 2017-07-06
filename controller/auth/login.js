/**
 * Created by prasanna_d on 7/4/2017.
 */
var user = require('../../models/user');
var hashPass = require('password-hash');
var token_generator = require('rand-token');

module.exports = {
    login : function (req, res) {
        var email = req.query.email;
        var password = req.query.password;

        //Validating data
        if(typeof email==="undefined"){return res.json({status : 'email field is required'});}
        if(typeof password==="undefined"){return res.json({status : 'password field is required'});}

        if(email!==""){
            if(password!==""){
                user.login(email,function (err,data) {
                    if(err){return res.json({error : err});
                    }else{
                        if(data.length===0){return res.json({error : 'invalid username or password'});}
                        else{
                            var _password = data[0].password;
                            if(hashPass.verify(password, _password)){return res.json({token : token_generator.generate(32)});}
                            else{return res.json({status : 'username or password is invalid'});}
                        }
                    }
                });
            }else{return res.json({status : 'username or password cannot be blank'});}
        }else{return res.json({status : 'username or password cannot be blank'});}
    }
};