/**
 * Created by prasanna_d on 7/25/2017.
 */
const models = require('../../db/models');
const passhash = require('password-hash');

module.exports = {
    changePassword: async function (req, res) {
        let user_id = req.user.id;
        let email = req.user.email;
        let cPassword = req.body.curPassword;
        let nPassword = req.body.newPassword;

        //Create database call
        let user = await models.user.findAll({
            where: {id: user_id}
        });

        if(user===null || user.length===0){
            return res.status(404).json({error : "User not found!"});
        }

        if(passhash.verify(cPassword,user[0].dataValues.password)){
            let newPassword = passhash.generate(nPassword);
            try {
                //Create database call
                let status = await models.user.update(
                    {password: newPassword},
                    {where: {id: user_id, email: email}
                });

                if(status){return res.status(200).json({message : "Password changed successfully"});}
                else{return res.status(504).json({error : "Server error occurred"});}

            }catch (err){
                console.log('Error occurred: ', err);
                return res.status(504).json({error : "Server error occurred"});
            }
        }else {
            return res.status(401).json({error: "Invalid old password!"});
        }
    },

    getAccountAndSettings: async function(req,res){
        let user_id = req.user.id;
        try {
            let stylists = await models.stylist.findAll({
                where: {user_id: user_id}
            });
            if (stylists) {
                let stylist_id = stylists[0].dataValues.id;
                let jobtypes = await models.user_jobtype.findAll({
                    where: {
                        user_id: stylist_id
                    }
                });
                let skilltypes = await models.user_skill.findAll({
                    where: {
                        user_id: stylist_id
                    }
                });
                return res.status(200).json({
                    jobtypes: jobtypes,
                    skilltypes: skilltypes
                });
            }else{
                return res.status(504).json({error : "Bad gateway"});
            }
        }catch (err){
            console.log(err);
            return res.status(500).json({error : "Server error occurred"});
        }
    }
};
