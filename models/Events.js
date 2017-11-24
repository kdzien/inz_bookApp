var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
   league: String,
   match_name: String,
   score_home:Number,
   score_away:Number,
   time: String,
   discipline:String
});

eventSchema.methods.updateScores = function(home,away,cb){
	this.score_home=home;
	this.score_away=away;
	this.save(cb)
}
var Events = mongoose.model("Events", eventSchema);