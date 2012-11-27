/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , cons = require('consolidate');
require("pg-simple").defaults.database_url = process.env.HEROKU_POSTGRESQL_CHARCOAL_URL || "postgres://postgres:michael@127.0.0.1:5432/galli_development";

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('view options', { layout:'application.html' });
    app.engine(".mustache", cons.mustache);
    app.engine(".html", cons.mustache);

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser('Galli9000'));
    app.use(express.cookieSession());
    app.use(function(req, res, next) {
        console.log("request", req.session);
        next();
    })
    app.use(express.methodOverride());
    app.use(app.router);

    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

routes.attach(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
