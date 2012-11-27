var _ = require('underscore')._
    , routes = require("express-http-routes")
    , pgSimple = require("pg-simple");


indexRoutes = {
    /*
     * GET home page.
     */
    "GET /":function (req, res) {
        res.render('index.html', {layout:'application.html' });
    }
}

_.extend(routes.all, indexRoutes);
_.extend(routes.all, require('./api/user'));
_.extend(module.exports, routes);