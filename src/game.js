let $ = require('jquery');
import {translator} from './translate.js';

export let game = {
	v_requestedWord : new Vue({
		el: '#requested-word',
		data: {
			requestedWord: 'traduire',
			fontSize: 2
		}
	}),
	v_score : new Vue({
		el: '#score',
		data: {
			score: 10
		}
	}),
	currentState: null,

	// Mot à traduire et sa traduction
	word: {
		requested: '',
		translated: '',
		written: ''
	},
	init(){
		let self = this;
		$(document).keypress(function(e){
			console.log($('#game').css.display);
			// à l'appuis sur la touche ENTER
			if( e.which == 13 ){
				console.log("Vous avez appuyé sur la touche entrée.");
				self.validButton();
			}
		});
		$('#game').on('click','button#verify',(event)=>{
			this.validButton();
		});
	},
	setScore(nb){
		this.v_score.score = nb;
	},
	addScore(nb){
		this.v_score.score += nb;
	},
	validButton(){
		this.word.written = $('#game #answer')[0].value;
		this.updateScore();
		this.getRandWord();
	},
	/**
	 * isTranslationOk - Compare la réponse avec la traduction retourné par l'API
	 * @return {Bool} true: si la traduction et correct, false: si elle est fausse
	 */
	isTranslationOk(){
		return (this.word.translated==this.word.written)? true : false;
	},
	/**
	 * updateScore - Augmente ou diminu le score en fonction de la traduction proposé
	 */
	updateScore(){
		if(this.isTranslationOk()){
			this.addScore(1);
		}else{
			this.addScore(-1);
		}
	},
	/**
	 * setWord - Enregister un mot à traduire, ainsi que sa traduction
	 * @param {String} w : 	mot français à traduire
	 */
	setWord(w){
		// Modifie l'instance de Vue pour que le mot s'affiche dynamiquement à l'écran
		this.v_requestedWord.requestedWord = w;

		this.word.requested = w;
		translator.translate(w, ()=>{
			this.word.translated = translator.result.text[0];
			console.log(this.word.translated);
		});
	},

	/**
	 * getRandWord - Récupère un mot aléatoire de la bdd
	 * @param  {Function} callback
	 */
	getRandWord(callback){
		$.get('/word', (data) => {
			this.setWord(data.name);
			if (callback) callback(data);
		});
	}
}
