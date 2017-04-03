let mongoose = require('mongoose');
let Word = require('./Word.model');
let csv = require('./csv');

// connexion à la bdd
mongoose.connect('mongodb://sheep:madsheep@ds149040.mlab.com:49040/madjoh_trad');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to madjoh_trad DB');

	csv.importFile(__dirname + '/verbes.txt', 'Word');
});
