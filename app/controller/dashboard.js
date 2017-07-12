/**
 * Created by prasanna_d on 7/4/2017.
 */

module.exports = {
    /* GET home page. */
    getIndexView : function (req, res) {
        res.render('index', { title: 'Express' });
    },

    test : function (req, res) {
        console.log('Test: ' + req.user.email);
        return res.json({status : "test route working :P"});
    }
};