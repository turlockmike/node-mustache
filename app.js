/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , cons = require('consolidate')
    ,mustache = require("./lib/mustache");
require("pg-simple").defaults.database_url = process.env.HEROKU_POSTGRESQL_CHARCOAL_URL || "postgres://postgres:michael@127.0.0.1:5432/galli_development";
var redis, RedisStore;
if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
}

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('view options', { layout:'application.html' });
    app.engine(".mustache", mustache);
    app.engine(".html", mustache);

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser('Galli9000'));
});
app.configure('development', function () {
    app.use(express.errorHandler());
    app.use(express.session({secret: 'lolcatsz'}));
});
app.configure('production', function() {
    app.use(express.session({ store: new RedisStore({client: redis}), secret: 'lolcat' }));
})

app.configure(function() {
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
})


routes.attach(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
