var _ = require('underscore')._
    , routes = require("express-http-routes")
    , pgSimple = require("pg-simple");

routes = {
    /*
     * GET home page.
     */

    "GET /user":function (req, res) {
        if (req.session && req.session.user) {
            res.json(200, {login:req.session.user.login});
        } else {
            res.json(404, {});
        }
    },


    "PUT /user":function (req, res) {
        req.session.user = {email:req.body.email, password:req.body.password, password_confirmation:req.body.password_confirmation, login:req.body.login};
        res.json(200, req.session.user);
    }
}

module.exports = routes;