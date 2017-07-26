/**
 * Created by prasanna_d on 7/26/2017.
 */
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

//Chai configurations
chai.use(chaiHttp);
chai.config.includeStack = true;
const asserts = chai.assert;
const should = chai.should();
const expect = chai.expect;

//Import server and other modules
const app = require('../app');
const models = require('../db/models');
const hashPass = require('password-hash');

//Import controller to test functions
const login = require('../app/controller/auth/login');

describe('Sign up with', function() {
    //Stored user configurations [email and hashed password]
    let stored_email = 'prasannadeshappriya@gmail.com';
    let stored_password = hashPass.generate('12345678');

    it("correct credentials should return 200 respond", async function () {
        //Input details
        let email = 'prasannadeshappriya@gmail.com';
        let password = '12345678';

        //Stub database call and return dummy data
        models.user.findOne = sinon.stub().returns({
            id: 1, email: stored_email, password: stored_password,
            verify: 1,   //1 - email is verified via email verification link
            firstname: 'Prasanna', lastname: 'Deshappriya'
        });

        //Create a fake request data to call change password function
        let req = {body: {email: email, password: password}};

        //Create a fake response object to hold the test response
        let status = sinon.stub().returnsThis();
        let json = sinon.spy();
        let res = {
            status: status, json: json
        };

        //Call the function with parameters
        await login.login(req, res);

        //Testing results
        asserts.equal(status.called, true);                     //Set the status correctly
        asserts.equal((models.user.findOne).calledOnce, true);  //Check weather database query only called once
        asserts.equal(status.calledWith(200), true);            //Check status is set with 200
        asserts.equal(json.called, true);                       //Check weather json is called
        //get the response arguments
        let jsonResponse = json.args[0][0];                     //Get the response object
        //Check all the parameters at the response
        expect(jsonResponse).to.have.property('status');
        expect(jsonResponse).to.have.property('userid');
        expect(jsonResponse).to.have.property('firstname');
        expect(jsonResponse).to.have.property('lastname');
        expect(jsonResponse).to.have.property('verified');
        expect(jsonResponse).to.have.property('token');
        expect(jsonResponse).to.have.property('email');
    });
});