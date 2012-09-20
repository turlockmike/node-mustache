
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , pg = require('pg')
  , cons = require('consolidate');
  

var query = function(q, callback) {
  pg.connect(app.get('database_url'), function(err, client) {
    client.query(q, function(err, result) {
      callback(result);
    });
  });
};
 
  
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('database_url', process.env.HEROKU_POSTGRESQL_CHARCOAL_URL || "postgres://postgres:michael@127.0.0.1:5432/galli_development"); 
  app.set('query', query);
  app.set('view engine', 'html');
  app.set('view options', { layout: 'application.html' });
  app.engine(".hbs", cons.handlebars);
    app.engine(".html", cons.handlebars);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  
});



app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
