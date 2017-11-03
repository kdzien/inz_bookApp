var express = require('express');

require('./models/Bet');
require('./models/Events');
require('./scraperScripts/scraper.js');

var app = express();
var routes = require('./expr_routes/routes.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/baza_inzynierka', {
  useMongoClient: true,
});

app.use('/',routes);
app.use('/scripts', express.static(__dirname + '/scripts/'));
app.use('/views', express.static(__dirname + '/views/'));
app.use('/styles', express.static(__dirname + '/styles/'));

app.listen(3000);