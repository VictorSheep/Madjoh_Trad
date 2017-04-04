let express = require('express');
let mongoose = require('mongoose');

let Word = require('./src/database/Word.model');
let app = express();
port = 8020;

// connexion à la bdd
mongoose.connect('mongodb://sheep:madsheep@ds149040.mlab.com:49040/madjoh_trad');

console.log("Serveur lancé: app écoute le port " + port);
app.use('/', express.static(__dirname + '/dist'));

app.listen(port);

app.get('/', function(req, res) {
    //res.setHeader('200', 'text/plain');
    res.sendFile(__dirname + '/index.html');
});

app.get('/word', (req, res) => {
	// On génere un id pour selectionner un mot aléatoirement dans la bdd
	let idRand = Math.round(Math.random()*499);
	/*console.log();*/
	Word.find({id:idRand}).exec((err, data)=>{
		res.send(data[0]);
	})
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});
