/**
 * Created by prasanna_d on 7/4/2017.
 */
var user = require('../../models/user');
var passhash = require('password-hash');

module.exports = {
    isUserExist : function (req, res) {
        var email = req.query.email;
        if(typeof email === "undefined"){
            return res.json({ error: 'email required'});
        }
        user.isUserExist(email,function (err,data) {
            if(err){return res.json({error : err});}
            else{
                if(data.length===0){return res.json({status : 'false'});}
                else{ return res.json({status : 'true'});}
            }
        })
    },

    register : function (req, res) {
        var first_name= req.body.firstname;
        var last_name= req.body.lastname;
        var email= req.body.email;
        var password = req.body.password;

        password = passhash.generate(password);
        user.register(first_name,last_name,email,password,function (err,error,message) {
            if(err){console.log(err);
                return res.json({error : "Server error occurred", status : "fail"});}
            else{
                if(error){
                    console.log(message);
                    return res.json({error : message, status : "fail"});
                }else{
                    return res.json({status : "success"});
                }
            }
        });
    }
};


