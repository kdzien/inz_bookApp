var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
   league: String,
   home: String,
   score: String,
   away: String,
   time: String,
   discipline:String
});
var Events = mongoose.model("Events", eventSchema);