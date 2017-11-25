var mongoose = require('mongoose');

var rankSchema = mongoose.Schema({
	betCount: {type: Number, default: 0},
	rank: {type: Number, default: 0},
	user:{ type: mongoose.Schema.Types.ObjectId,ref:'Users' }
});


rankSchema.methods.upBetCount = function(cb){
	this.betCount +=1;
	this.save(cb);
}
rankSchema.methods.downBetCount = function(cb){
	this.betCount -=1;
	this.save(cb);
}
rankSchema.methods.upRank = function(cb){
	this.rank +=1;
	this.save(cb)
}

var Rank = mongoose.model("Rank", rankSchema);