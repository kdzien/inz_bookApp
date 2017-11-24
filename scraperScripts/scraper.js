var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Events = mongoose.model("Events");
var Bets = mongoose.model("Bet");
var Users = mongoose.model("Users");
url_soccer = 'http://www.mwyniki.pl/';
url_basketball = 'http://www.mwyniki.pl/koszykowka/';
url_volleyball = 'http://www.mwyniki.pl/siatkowka/';
url_handball = 'http://www.mwyniki.pl/pilka_reczna/';


function getNewEvents(callback){
	Events.remove(function(err){
	})
	getSportsEvents(url_volleyball, "volleyball",".status_type_2",function(result){
		sendData(result)
	});
	getSportsEvents(url_basketball, "basketball",".status_type_2",function(result){
		sendData(result)
	});
	getSportsEvents(url_handball, "handball",".status_type_2",function(result){
		sendData(result)
	});
	getFootbalEvents(url_soccer,"soccer",".status_type_2",function(result){
		sendData(result)
	});
}
// getNewEvents(function(){
// 	console.log("ready");
// });

var sendData = function(data){
	for(var i=0;i<=data.length-1;i++){
		var event = new Events(data[i]);
		event.save(function(err,events){
			if(err){return next(err);}
		});
	}
}

function getSportsEvents(url, name,statusType,callback){
	var temp = new Array();
	request(url, function(error, response, html){
	        if(!error){
	            var $ = cheerio.load(html);
	            result = [];
	            $(statusType).each(function(i,elem){
	            	var json = { league: "", match_name : "", score_home : "",score_away : "", time:"", discipline:name};
	            	var league = $(this).parent().children().first().children('.name').text().trim();
	            	var time = elem.children[2].children[0].data;
	            	if(elem.children[4].children[0].children[0].children===undefined){
	            		return;
	            	}
	            	var home=elem.children[4].children[0].children[0].children[0].data;
	            	var away = elem.children[4].children[0].children[1].children[0].data;
	            	var match_name = home+"-"+away;
	            	console.log(match_name);
	            	var score_home = elem.children[6].children[1].children[0].children[0].data;
	            	var score_away = elem.children[6].children[1].children[1].children[0].data;
	        		if(league===undefined || away===undefined || home===undefined || score_home===undefined || score_away===undefined){
	        			return;
	        		}else{
	        			json.league=league;
		        		json.match_name=match_name.trim();
		        		json.score_home=score_home.trim();
		        		json.score_away=score_away.trim();
		        		json.time=time.trim();
	        		}
	        		temp.push(json);
	            });
	            callback(temp);
	        }
	    })
}

function getFootbalEvents(url,name,statusType,callback){
	  var temp = Array();
	  request(url_soccer, function(error, response, html){

        if(!error){
            var $ = cheerio.load(html);
            $(statusType).find("a[itemprop = 'url']").each(function(i,elem){
            	var json = { league: "", match_name : "", score_home : "",score_away : "", time:"", discipline:"soccer"};

        		var league = $(this).parent().parent().parent().children().first().text().trim();
        		var time = $(this).parent().parent().children();
        		time = time[2].children[0].children[0].data;
        		var home=elem.children[0].children[0].data;
        		var away=elem.children[4].children[0].data;
        		var match_name = home+"-"+away;

        		var score=elem.children[2].children[0].data;
        		var score_home = "";
        		var score_away = "";
        		if(score.length==3){
        			score_home=score.charAt(0);
        			score_away=score.charAt(2);
        		}

        		if(league===undefined || match_name===undefined || score_home===undefined || score_away===undefined){
        			return;
        		}else{
        			json.league=league;
	        		json.match_name=match_name.trim();
	        		json.score_home=score_home.trim();
	        		json.score_away=score_away.trim();
	        		json.time=time.trim();
        		}
        		temp.push(json);
            });
            callback(temp);
        }
    })
}


//uaktualnianie wynikow w bazie
function updateScores(){
	getFootbalEvents(url_soccer+"wczorajsze","soccer",".status_type_1",function(result){
		for(var i=0;i<=result.length-1;i++){
			findAndUpdate(result[i].match_name,result[i].score_home,result[i].score_away);
		}
	})
	getSportsEvents(url_basketball+"wczorajsze","soccer",".status_type_1",function(result){
		for(var i=0;i<=result.length-1;i++){
			findAndUpdate(result[i].match_name,result[i].score_home,result[i].score_away);
		}
	})
	getSportsEvents(url_volleyball+"wczorajsze","soccer",".status_type_1",function(result){
		for(var i=0;i<=result.length-1;i++){
			findAndUpdate(result[i].match_name,result[i].score_home,result[i].score_away);
		}
	})
	getSportsEvents(url_handball+"wczorajsze","soccer",".status_type_1",function(result){
		for(var i=0;i<=result.length-1;i++){
			findAndUpdate(result[i].match_name,result[i].score_home,result[i].score_away);
		}
	})
}
var findAndUpdate = function(match_name,h,a){
	Events.findOne({ 'match_name': match_name },function(err,event){
		if(event===null){
			return;	
		}
		event.updateScores(h,a,function(err,post){

		})
	})
}
//updateScores();		



//ustawianie rankingów
function setStats(){
	Bets.find({},function(err,bets){
		var all_bets=bets;
		for(var i=0;i<=all_bets.length-1;i++){
			updateRank(all_bets[i].nazwa,all_bets[i].typ,all_bets[i].user)
		}
	})
}
var updateRank = function(nazwa,typ,user){
	findMatch(nazwa,function(result){
		if(checkScore(typ,result.score_home,result.score_away)===true){
			updateUserRank(user);
		};
	});
}

var findMatch = function(nazwa,callback){
	Events.findOne({ 'match_name': nazwa },function(err,event){
			if(event===null){
				return;	
			}
			callback(event);
	})
}
var checkScore=function(co_obstawil,wynik1,wynik2){
	var score=""
	if(wynik1<wynik2){
		score="1"
	}else if(wynik1>wynik2){
		score="2"
	}else if(wynik1==wynik2){
		score="X"
	}
	if(score==co_obstawil){
		return true;
	}
	return false;
}

var updateUserRank = function(user){
	Users.findOne({ 'name': user },function(err,user){
		user.upRank(function(err,rank){
		})
	})
}

//setStats();