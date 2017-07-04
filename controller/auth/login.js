/**
 * Created by prasanna_d on 7/4/2017.
 */
var user = require('../../models/user');

module.exports = {
    login : function (req, res) {
        var name = req.query.name;
        var password = req.query.password;

        if(typeof name==="undefined"){
            return res.json({status : 'name field is required'});
        }
        if(typeof password==="undefined"){
            return res.json({status : 'password field is required'});
        }

        if(name!==""){
            if(password!==""){
                user.login(name,password,function (err,data) {
                    if(err){
                        return res.json({error : err});
                    }else{
                        if(data.length===0){
                            return res.json({error : 'no match'});
                        }else{
                            return res.json({status : 'match'});
                        }


                        return res.json({user : 'prasanna'});
                    }
                });
            }else{
                return res.json({status : 'username or password cannot be blank'});
            }
        }
    }
};