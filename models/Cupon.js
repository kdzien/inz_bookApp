var mongoose = require('mongoose');

var cuponSchema = mongoose.Schema({
	user:{ type: mongoose.Schema.Types.ObjectId,ref:'Users'},
	matches: [{nazwa:String,typ:String}],
	date:Date
});

cuponSchema.methods.updateC = function(matchesx, cb){
	this.matches=matchesx;
	this.date = new Date();
	this.save(cb)
}

cuponSchema.methods.removeC = function(cb){
	this.matches=[];
	this.save(cb)
}

var Cupons = mongoose.model("Cupons", cuponSchema);