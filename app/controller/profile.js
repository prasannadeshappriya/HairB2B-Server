/**
 * Created by prasanna_d on 7/19/2017.
 */
const models = require('../../db/models');

async function addProfileData(user_id,description,callback) {
    let arrResult = await models.stylist.findOrCreate({
        where: {
            user_id: user_id
        },
        defaults: {
            user_id: user_id,
            description: description,
            rates: 0.0,
            order_completion: 0.0
        }
    });

    try{
        if(arrResult[1]){
            console.log('Stylist profile created for user_id: ' + user_id);
            return callback(true,arrResult[0].id);
        }else{
            console.log('Stylist profile already exist for user_id: ' + user_id);
            return callback(false, 0);
        }
    }catch (err){
        console.log('Error occurred: ', err);
        return callback(false, 0);
    }

}

module.exports = {
    getProfilePublic: async function (req, res) {
        let user_id = req.query.id;
        let users = [];
        let stylists = [];
        let jobtypes = [];
        let skilltypes = [];

        try {
            let user = await models.user.findAll({
                where: {
                    id: user_id
                }
            });
            let stylist = await models.stylist.findAll({
                where: {
                    user_id: user[0].dataValues.id
                }
            });

            if (stylist && stylist.length !== 0) {
                users.push(user);
                stylists.push(stylist);

                try {
                    let user_jobtypes_arr = await models.user_jobtype.findAll({
                        where: {
                            user_id: stylist[0].dataValues.id
                        }
                    });
                    if (user_jobtypes_arr) {jobtypes.push(user_jobtypes_arr);}

                    let user_skills = await models.user_skill.findAll({
                        where: {
                            user_id: stylist[0].dataValues.id
                        }
                    });
                    if (user_skills) {skilltypes.push(user_skills);}

                    return res.status(200).json({
                        user: user,
                        stylist: stylist,
                        jobtypes: jobtypes,
                        skilltypes: skilltypes
                    });
                } catch (err) {
                    console.log('Error occurred: ', err);
                    return res.status(504).json({error: "Server error occurred"});
                }
            }else{
                return res.status(200).json({
                    user: [],
                    stylist: []
                });
            }
        }catch(err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        }
    },

    createProfile : async function (req, res) {
        let user_id = req.user.id;
        let description = req.body.description;
        let skills = req.body.skills;
        let job_type = req.body.job_types;
        //var pament_email = req.body.payment_email;
        let price_job_types = req.body.price_job_types;

        addProfileData(
            user_id,
            description,
            async function (callback, stylist_id) {
                if(callback){
                    let user_skill_obj = [];
                    let job_type_obj = [];
                    for(let i=0; i<skills.length; i++) {
                        user_skill_obj.push({user_id: stylist_id, skill_id: skills[i]});
                    }
                    for(let j=0; j<job_type.length; j++) {
                        job_type_obj.push({user_id: stylist_id, job_id: job_type[j], price: price_job_types[j]});
                    }
                    try {
                        let func;
                        func = await models.user_skill.bulkCreate(user_skill_obj);
                        if (func) {console.log('Skills insert success for user: ' + user_id);}
                        func = await models.user_jobtype.bulkCreate(job_type_obj);
                        if (func) {console.log('Jobtypes insert success for user: ' + user_id);}
                        func = await models.user_role.bulkCreate([
                            {user_id: user_id, role_id: 1}
                        ]);
                        if(func){return res.status(200).send("Profile Created");}
                    }catch (err){
                        console.log('Error occurred: ', err);
                        return res.status(504).send("Server Error");
                    }
                }else{
                    return res.status(504).send("Server Error");
                }
            }
        );
    },

    getProfileStatus : async function (req, res) {
        let user_id = req.user.id;
        try {
            let user_role = await models.user_role.findAll({
                where: {
                    user_id: user_id
                }
            });
            //No match for given email address
            if (user_role === null || user_role.length === 0) {
                return res.status(404).json({error: "Profile Not found"});
            }
            return res.status(200).json({error: "Profile for user: " + user_id});
        }catch (err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        }
    },

    getProfile : async function (req, res) {
        let user_id = req.user.id;
        try {
            let user_role = await models.user_role.findAll({
                where: {
                    user_id: user_id
                }
            });

            //No match for given email address
            if (user_role === null || user_role.length === 0) {
                return res.status(404).json({error: "Profile Not found"});
            }

            let stylist = await models.stylist.findOne(
                {where: {user_id: user_id}}
            );
            let user_skills = [];
            let user_jobtypes = [];
            let user_jobtype_price = [];

            let user_skill = await models.user_skill.findAll({
                where: {
                    user_id: stylist.dataValues.id
                }
            });

            for (let i = 0; i < user_skill.length; i++) {
                user_skills.push(user_skill[i].dataValues.skill_id)
            }

            let user_jobtype = await models.user_jobtype.findAll({
                where: {
                    user_id: stylist.dataValues.id
                }
            });

            for (let i=0; i<user_jobtype.length; i++){
                user_jobtypes.push(user_jobtype[i].dataValues.job_id);
                user_jobtype_price.push(user_jobtype[i].dataValues.price);
            }

            return res.status(200).json(
                {price: user_jobtype_price,
                    skills: user_skills,
                    job_types: user_jobtypes,
                    description: stylist.dataValues.description}
            );
        }catch (err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        }
    },

    getBusyDates : async function (req, res) {
        let user_id = req.user.id;
        try {
            let stylist = await models.stylist.findOne(
                {where: {user_id: user_id}}
            );
            if(stylist){
                let busy_dates = await models.busy_dates.findAll({
                    where: {
                        user_id: stylist.dataValues.id
                    }
                });
                let ret = [];
                if(busy_dates){
                    for(let i=0; i<busy_dates.length; i++){
                        ret.push(busy_dates[i].dataValues.date);
                    }
                    return res.status(200).json({busy_dates: ret});
                }
                return res.status(200).json({busy_dates: ret});
            }else{
                return res.status(400).json({error : "No profile found"});
            }
        }catch (err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        }
    },

    getBusyDatesPublic : async function (req, res) {
        let user_id = req.query.id;
        try {
            let stylist = await models.stylist.findOne(
                {where: {user_id: user_id}}
            );
            if(stylist){
                let busy_dates = await models.busy_dates.findAll({
                    where: {
                        user_id: stylist.dataValues.id
                    }
                });
                let ret = [];
                if(busy_dates){
                    for(let i=0; i<busy_dates.length; i++){
                        ret.push(busy_dates[i].dataValues.date);
                    }
                    return res.status(200).json({busy_dates: ret});
                }
                return res.status(200).json({busy_dates: ret});
            }else{
                return res.status(400).json({error : "No profile found"});
            }
        }catch (err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        }
    },

    updateBusyDates : async function (req, res) {
        let new_busy_dates = req.body.busydates;
        let user_id = req.user.id;
        try {
            let stylist = await models.stylist.findOne(
                {where: {user_id: user_id}}
            );
            if(stylist){
                let result;
                result = await models.busy_dates.destroy({
                    where: {user_id: stylist.dataValues.id}
                });
                let busy_dayes_arr = [];
                for(i=0; i<new_busy_dates.length; i++) {
                    busy_dayes_arr.push({
                        user_id: stylist.dataValues.id,
                        date: new_busy_dates[i]
                    });
                }
                let func;
                func = await models.busy_dates.bulkCreate(busy_dayes_arr);
                if (func) {console.log('busy dates insert success for user: ' + user_id);}
                return res.status(200).json({status: 'updated'});
            }else{
                return res.status(400).json({error : "No profile found"});
            }
        }catch (err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        }
    }
};

