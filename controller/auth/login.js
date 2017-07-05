/**
 * Created by prasanna_d on 7/4/2017.
 */
var user = require('../../models/user');
var hashPass = require('password-hash');

module.exports = {
    login : function (req, res) {
        var email = req.query.email;
        var password = req.query.password;

        if(typeof email==="undefined"){
            return res.json({status : 'email field is required'});
        }
        if(typeof password==="undefined"){
            return res.json({status : 'password field is required'});
        }

        if(email!==""){
            if(password!==""){
                user.login(email,function (err,data) {
                    if(err){
                        return res.json({error : err});
                    }else{
                        var dataa = JSON.stringify(data);
                        if(data.length===0){
                            return res.json({error : 'no match'});
                        }else{
                            var _password = data[0].password;
                            if(hashPass.verify(password, _password)){
                                return res.json({status : 'user authenticated'});
                            }else{
                                return res.json({status : 'username or password is invalid'});
                            }
                        }
                    }
                });
            }else{
                return res.json({status : 'username or password cannot be blank'});
            }
        }
    }
};