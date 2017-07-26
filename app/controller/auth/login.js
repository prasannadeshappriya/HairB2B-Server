/**
 * Created by prasanna_d on 7/4/2017.
 */

const hashPass = require('password-hash');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');
const models = require('../../../db/models');
const validator = require("email-validator");

module.exports = {
    login : async function (req, res) {
        let email = req.body.email;
        let password = req.body.password;

        //Validate email address
        if(!validator.validate(email)){
            return res.status(400).json({error: "Invalid email address"});
        }

        if(email!==""){
            if(password!==""){
                try{
                    let user = await models.user.findOne({
                        where: {
                            email: email
                        }
                    });

                    //No match for given email address
                    if(user===null){
                        return res.status(400).json({error : "Email address is not associated to any account"});
                    }

                    //Check the password with the hashed password
                    if(hashPass.verify(password,user.password)) {
                        //Create the login token
                        let token = jwt.sign({email : user.email}, config.secret,{
                            expiresIn: 60*60*24   //Token expire in 24 Hours
                        });

                        //Check for user's email verification state
                        let varify_status=0;
                        if(user.verify){varify_status = 1;}

                        //Return response with user details
                        return res.status(200).json({
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
                    return res.status(401).json({error : "Username or password is invalid"});
                }catch(err){
                    console.log('Error occured: ', err);
                    return res.status(504).json({error : "Server error occurred"});
                }
            }else{return res.status(401).json({status : 'Username or password is invalid'});}
        }else{return res.status(401).json({status : 'Username or password is invalid'});}
    }
};