var mongoose = require('mongoose');

var betSchema = mongoose.Schema({
   nazwa: String,
   typ: Number,
   kurs: Number,
   data: { type: Date, default: Date.now },
   analiza: String,
   category:String,
   user:String
});
var Bet = mongoose.model("Bet", betSchema);