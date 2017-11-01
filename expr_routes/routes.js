var express = require('express');
var path    = require("path");
var router = express.Router();
var mongoose = require('mongoose');
var Bet = mongoose.model("Bet");
var Events = mongoose.model("Events");


router.get('/', function(req, res){
	res.sendFile(__dirname.replace("expr_routes", "views") + '/index.html');
});

router.get('/bets', function(req,res,next){
	Bet.find(function(err, bets){
		if(err){return next(err); }
		res.json(bets);
	});
});

router.post('/bets', function(req,res,next){
	var bet = new Bet(req.body);
	bet.save(function(err,bets){
		if(err){return next(err);}
		res.json(bet);
	});
});

router.get('/events', function(req, res){
	Events.find(function(err, events){
		if(err){return next(err); }
		res.json(events);
	});
})
module.exports = router;