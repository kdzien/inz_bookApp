var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Events = mongoose.model("Events");
var result = new Array();

function htmlParser(){
	Events.remove(function(err){

	})
	url_soccer = 'http://www.mwyniki.pl/';
	url_basketball = 'http://www.mwyniki.pl/koszykowka/'
	  request(url_soccer, function(error, response, html){

	        if(!error){
	            var $ = cheerio.load(html);
	            $(".status_type_2").find("a[itemprop = 'url']").each(function(i,elem){
	            	var json = { league: "", home : "", score : "", away : "", time:"", discipline:"soccer"};

	        		var league = $(this).parent().parent().parent().children().first().text().trim();
	        		var time = $(this).parent().parent().children();
	        		time = time[2].children[0].children[0].data;
	        		var home=elem.children[0].children[0].data;
	        		var score=elem.children[2].children[0].data;
	        		var away=elem.children[4].children[0].data;


	        		if(league===undefined || away===undefined || home===undefined || score===undefined){
	        			return;
	        		}else{
	        			json.league=league;
		        		json.home=home.trim();
		        		json.score=score.trim();
		        		json.away=away.trim();
		        		json.time=time.trim();
	        		}
	        		
	        		result.push(json);
	            });

	            sendData(result);
	        }
	    })
	  request(url_basketball, function(error, response, html){

	        if(!error){
	            var $ = cheerio.load(html);
	            result = [];
	            $(".status_type_2").each(function(i,elem){
	            	var json = { league: "", home : "", score : "", away : "", time:"", discipline:"basketball"};
	            	var league = $(this).parent().children().first().children('.name').text().trim();
	            	var time = elem.children[2].children[0].data;
	            	var home = elem.children[4].children[0].children[0].children[0].data;
	            	var away = elem.children[4].children[0].children[1].children[0].data;
	            	var score = (elem.children[6].children[1].children[0].children[0].data)+'-'+elem.children[6].children[1].children[1].children[0].data;
	        		if(league===undefined || away===undefined || home===undefined || score===undefined){
	        			return;
	        		}else{
	        			json.league=league;
		        		json.home=home.trim();
		        		json.score=score.trim();
		        		json.away=away.trim();
		        		json.time=time.trim();
		        		result.push(json);
	        		}
	            });
	            sendData(result);
	        }
	    })
}

htmlParser();

var sendData = function(data){
	for(var i=0;i<=data.length-1;i++){
		var event = new Events(data[i]);
		event.save(function(err,events){
			if(err){return next(err);}
		});
	}
}