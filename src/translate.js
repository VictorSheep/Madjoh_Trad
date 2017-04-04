import * as $ from 'jquery';

export let translator = {
	// 'langueDepart-langueArrivé'
	languagePair: 'fr-en',
	// clé de connection pour l'api Yandex
	key: 'trnsl.1.1.20170402T081420Z.2b7b666f5e9db90b.e1e03408d5658285e063dcf21e63166e63122ba0',
	// mot encodé à traduire
	wordEncod: '',
	// resultat de la requête après traduction
	result: null,

	translate(word, callback){
		// Mot à traduire, il faut l'encoder au format URL
		this.wordEncod = encodeURIComponent(word);

		// Requête ajax pour la traduction
		$.ajax({
			//url de la requête
		    url : 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+this.key
		    	+'&text='+this.wordEncod
		    	+'&lang='+this.languagePair,
		    type : 'GET'

		}).done((result)=>{ //Callback de la requête
			//On récupère le résultat de la requête dans l'attribut result
		   	this.result = result;
		   	if(callback){
				callback();
			}
		});
	}
}
