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

app.listen(3000);