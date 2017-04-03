let mongoose = require('mongoose');

//Schema d'un mot
let wordSchema = mongoose.Schema({
	id: Number,
    name: String
});
//Model d'un mot
var Word = mongoose.model('Word', wordSchema);

module.exports = Word;