var express = require('express');
var nouns = require('./routes/nouns');
var admin = require('./routes/admin');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// auth
var basicAuth = express.basicAuth(function(user,pass){
	return user === 'admin' && pass === config.password;
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', nouns.list);
app.get('/random/:number', nouns.random);
app.get('/admin', basicAuth, admin.index);
app.post('/admin/import', basicAuth, admin.import);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
