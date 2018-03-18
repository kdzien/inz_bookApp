var express = require('express');
var path    = require("path");
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Users');
var Bet = mongoose.model("Bet");
var Cupon = mongoose.model("Cupons");
var Events = mongoose.model("Events");
var Rank = mongoose.model("Rank");
var validator = require('validator');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.get('/', function(req, res){
	res.sendFile(__dirname.replace("expr_routes", "views") + '/index.html');
});
router.get('/bets', auth, function(req,res,next){
	Bet.find(function(err, bets){
		if(err){return next(err); }
		res.json(bets);
	});
});
router.get('/bets/:choice', function(req,res,next){
	if(req.params.choice=="light"){
		Bet.find({isAnalize: {$ne: true}}).populate('user').exec(function(err, bets){
			if(err){return next(err); }
			res.json(bets);
		});
	}else if(req.params.choice=="desc"){
		Bet.find({isAnalize: {$ne: false}}).populate('user').exec(function(err, bets){
			if(err){return next(err); }
			res.json(bets);
		});
	}
});

router.post('/bets/', function(req,res,next){
	var currentUserId=req.body.user;
	var errors = new Array();
	if(req.body.nazwa==undefined || req.body.nazwa=='' || req.body.nazwa=='Nie wybrano wydarzenia'){
		errors.push("Nie wybrałeś wydarzenia")
	}
	if(req.body.typ==undefined || req.body.typ==''){
		errors.push("Nie wprowadziłeś typu")
	}
	if(req.body.kurs==undefined  || req.body.kurs==''){
		errors.push("Nie wprowadziłeś kursu")
	}
	if(req.body.isAnalize==true && (req.body.analiza==undefined || req.body.analiza=='') ){
		errors.push("Nie wprowadziłeś analizy")
	}

	Bet.findOne({nazwa : req.body.nazwa, user: currentUserId},function(err,bet){
		if(bet){
			res.status(403).send(["Dodałeś już typ na to wydarzenie"]);
		}
		else{
			if(errors.length!=0){res.status(403).send(errors)}
			else{
				var bet = new Bet(req.body);
				bet.save(function(err,bets){
					if(err){return next(err);}
					Rank.findOne({ 'user':currentUserId}).populate('user').exec(function(err, rank){
						rank.upBetCount(function(err,post){
						})
					})
					res.json("Dodano typ");
				});
				
			}
		}
	})
	

});


router.get('/events', function(req, res){
	var currentDate = new Date();
	var stringDate =currentDate.getHours()+":"+currentDate.getMinutes();
	if(stringDate[0]!="1"||stringDate[0]!="2"){stringDate="0"+stringDate}
	Events.find({"time": { $gte: stringDate}},function(err, events){
		console.log(events)
		if(err){return next(err); }
		res.json(events);
	});
})

router.get('/rank', function(req,res){
	var users = new Array;
	Rank.find({}).populate('user').exec(function(err, ranks){
		if(err){return next(err);}
		res.json(ranks)
	})
})

router.get('/cupon/:user', function(req,res,next){
	Cupon.findOne({'user':req.params.user}).populate('user').exec(function(err,cupon){
		if(err){return next(err);}
		res.json(cupon);
	})
})
router.post('/cupon/:user',function(req,res,next){
	Cupon.findOne({'user':req.params.user}).populate('user').exec(function(err,cupon){
		cupon.updateC(req.body,function(err,post){
			if(err){return next(err);}
			res.json("kupon zapisany")
		})
	})
})
router.delete('/cupon/:user',function(req,res,next){
	Cupon.findOne({'user':req.params.user}).populate('user').exec(function(err,cupon){
		cupon.removeC(function(err,post){
		})
	})
})
router.delete('/bets/:id',function(req,res,next){
	Bet.findOne({_id:req.params.id}, function(err,bet){
		var currentUser=bet.user;
		var dateDiffrence = new Date()-bet.data
		var diffMins = Math.round(((dateDiffrence % 86400000) % 3600000) / 60000);
		console.log(diffMins)
		if(diffMins<5){
			Bet.findOneAndRemove({_id: req.params.id}, function(err){
				res.json("usunięto typ")
			});
			Rank.findOne({ 'user':currentUser}).populate('user').exec(function(err, rank){
				rank.downBetCount(function(err,post){
				})
			})
		}
		else{
			res.json("Za późno na usunięcie typu");
		}
	});
})

//logowanie-rejestracja
router.post('/register', function(req,res){
	var errors = [];
	User.findOne({ name: req.body.username }, function (err, user) {
		if(!user){
			User.findOne({ email: req.body.email }, function (err, userx) {
				if(!userx){
					if(!validator.isEmail(req.body.email)){
						errors.push("niepoprawny adres email")
					}
					if (errors.length!=0) {
						res.status(403).send(errors);
					}
					else{
						var user = new User();
						user.name = req.body.username;
						user.email = req.body.email;
						var password = req.body.password;
						user.setPassword(password);
						user.save(function(err,user){
							var cupon = new Cupon();
							cupon.user=user._id;
							cupon.matches=[];
							cupon.date=new Date();
							cupon.save(function(err,cupon){
								if(err){return next(err);}
								var rank = new Rank();
								rank.user=user._id;
								rank.save(function(err,rank){
									var token;
									token=user.generateJwt();
									res.status(200);
									res.json({
											"token" : token
									});				
								})
							})
						});
					}
				}else{
					errors.push("Ten adres email jest już w systemie");
					res.status(403).send(errors);
				}
			})
		}
		else{
			errors.push("Zajęta nazwa użytkownika")
			res.status(403).send(errors);
		}
	})	
});


router.post('/login',function(req,res){
	passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
})


module.exports = router;