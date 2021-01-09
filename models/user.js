var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username:{
		type: String,
		trim: true,
		required: true,
		unique:true
	},	
	password:{
		type: String,
		trim: true,
		required: true
	},
	language:{
		type: String,
		trim: true,
		required: false,
		unique:false
	},
	privacy:{
		type: String,
		trim: true,
		required: false,
		unique:false
	}
	
});

module.exports = mongoose.model('users', UserSchema);