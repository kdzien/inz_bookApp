var mongoose = require('mongoose');

var betSchema = mongoose.Schema({
   nazwa: String,
   typ: String,
   kurs: Number,
   data: { type: Date, default: Date.now },
   isAnalize: Boolean,
   analiza: String,
   category:String,
   user:String
});
var Bet = mongoose.model("Bet", betSchema);