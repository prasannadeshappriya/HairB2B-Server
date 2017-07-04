/**
 * Created by prasanna_d on 7/4/2017.
 */
var user = require('../models/user');

module.exports = {
    test : function (req, res) {
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
                user.insert(name,password);
                res.json({ status : 'User successfully inserted'});
            }else{
                return res.json({status : 'username or password cannot be blank'});
            }
        }
    }
};