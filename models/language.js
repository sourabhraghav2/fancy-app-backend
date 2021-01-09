var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LanguageSchema = new Schema({
		language:{
			type: String,
			trim: true,
			required: true,
			unique:true
		},
		languageMap:{
			type: Object,
			trim: true,
			required: true
		}
});

module.exports = mongoose.model('languages', LanguageSchema);