var path             = require('path');
var express          = require('express');
var webpack          = require('webpack');
var bodyParser 			 = require('body-parser');
var crud						 = require('./routers/crud');
var router 					 = require('./routers/route');
var devMid           = require('webpack-dev-middleware');
var hotMid           = require('webpack-hot-middleware');

var app              = express();
var port             = process.env.PORT || 1994;
var env              = process.env.NODE_ENV || 'development';
var config           = require('./config/config.json')[env];
var client           = require('redis').createClient(config.redis);
var config           = "";
var compiler         = "";

if(env == 'development') {
	config    = require('./webpack-dev-server.config.js');
	compiler  = webpack(config);
	app.use(devMid(compiler, {publicPath: config.output.publicPath, stats: { colors: true }}));
	app.use(hotMid(compiler));
}

//to remove the express branding
app.disable('x-powered-by');

// static files to be served
app.use(express.static('./build'));
app.use(express.static('./src/'));

//bodyparser for post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//to get rid of the cors err. 
//TODO: add proper control over this.
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "accept, content-type");
  next();
});

app.use('/api/v1', router);
app.use('/api/v1', crud);

app.use('/', function (req, res) {
	if(env == 'development') 
		res.sendFile(path.resolve('src/www/index.html'));
	else
		res.sendFile(path.resolve('build/index.html'));
});

app.listen(port, function(error) {
	if (error) throw error;
	console.log("Express server listening on port " + port + " in " + env);
});
