/**
 * Created by prasanna_d on 7/4/2017.
 */
var user = require('../../models/user');

module.exports = {
    isUserExist : function (req, res) {
        var name = req.query.name;
        if(typeof name === "undefined"){
            return res.json({ error: 'name required'});
        }
        user.isUserExist(name,function (err,data) {
            if(err){return res.json({error : err});}
            else{
                if(data.length===0){return res.json({status : 'false'});}
                else{ return res.json({status : 'true'});}
            }
        })
    },

    register : function (req, res) {
        var name= req.query.name;
        var password = req.query.password;

        //Authentication data
        if(typeof  name==="undefined"){return res.json({error : 'name field is required'});}
        if(typeof  password==="undefined"){return res.json({error : 'password field is required'});}
        if(name===""){return res.json({error : 'name field cannot left blank'});}
        if(password===""){return res.json({error : 'password field cannot left blank'});}

        user.register(name,password,function (err,error,message) {
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


