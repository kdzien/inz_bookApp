var express = require('express');
var bodyParser = require('body-parser');

var logger = require('morgan');
require('./models/Bet');
require('./models/Events');
require('./scraperScripts/scraper.js');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require('./expr_routes/routes.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/baza_inzynierka', {
  useMongoClient: true,
});

app.use('/scripts', express.static(__dirname + '/scripts/'));
app.use('/views', express.static(__dirname + '/views/'));
app.use('/styles', express.static(__dirname + '/styles/'));
app.use('/images', express.static(__dirname + '/images/'));

app.use('/',routes);


app.listen(3000);

module.exports = app;