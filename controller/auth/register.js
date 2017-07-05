/**
 * Created by prasanna_d on 7/4/2017.
 */
var user = require('../../models/user');

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
        var first_name= req.query.firstname;
        var last_name= req.query.lastname;
        var email= req.query.email;
        var password = req.query.password;

        //Authentication data
        if(typeof  first_name==="undefined"){return res.json({error : 'firstname field is required'});}
        if(typeof  last_name==="undefined"){return res.json({error : 'lastname field is required'});}
        if(typeof  email==="undefined"){return res.json({error : 'email field is required'});}
        if(typeof  password==="undefined"){return res.json({error : 'password field is required'});}
        if(first_name===""){return res.json({error : 'firstname field cannot left blank'});}
        if(last_name===""){return res.json({error : 'lastname field cannot left blank'});}
        if(email===""){return res.json({error : 'email field cannot left blank'});}
        if(password===""){return res.json({error : 'password field cannot left blank'});}

        user.register(first_name,last_name,email,password,function (err,error,message) {
            if(err){return res.json({error : err});}
            else{
                if(error){
                    return res.json({error : message});
                }else{
                    return res.json({status : "user successfully inserted"});
                }
            }
        });
    }
};


