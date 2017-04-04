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
	// Taille du mot traduit
	wordTranslatedSize: 0,
	sizeIndicationText: '',
	$answer: $('#game #answer')[0],
	$sizeIndication: $('#size-answer'),
	init(){
		let self = this;
		console.log('init');
		$(document).keypress(function(e){
			if($('#game').css('display')=="block"){
				// à l'appuis sur la touche ENTER
				if( e.which == 13 ){
					self.validButton();
				}
			}
		});
		$('#game').on('click','button#verify',(event)=>{
			this.validButton();
		});
		$('#game-over').on('click','button',(event)=>{
			$('#win-message').hide();
			$('#loose-message').hide();
		});
	},
	setScore(nb){
		this.v_score.score = nb;
	},
	addScore(nb){
		this.v_score.score += nb;
	},
	validButton(){
		this.word.written = this.$answer.value;
		this.updateScore();
		this.getRandWord();
		this.$answer.value='';
		this.gameOver();
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
			this.addScore(2);
		}else{
			this.addScore(-2);
		}
	},
	gameOver(){
		// Si on a 20 pts ou plus c'est gagné
		if(this.v_score.score>=20){
			$('#win-message').show(); // on affiche le message correspondant
		}
		// Si on a 0 pts ou moins c'est perdu
		else if(this.v_score.score<=0){
			$('#loose-message').show(); // on affiche le message correspodant
		}
		// Si non on quite la methode gameOver()
		else{
			return;
		}
		// On passe à l'écran de fin de jeu
		$('section').hide();
		$('#game-over').fadeIn();
		this.setScore(10);
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
			// On affiche la première lettre du mot traduit dans l'input
			this.$answer.value = this.word.translated[0];
			console.log(this.word.translated);
			// On engegistre la longueur du mot traduit
			this.wordTranslatedSize = this.word.translated.length;
			console.log(this.$sizeIndication.text());
			this.sizeIndicationText = '';
			for (var i = 0; i < this.wordTranslatedSize; i++) {
				this.sizeIndicationText += '-';
			}
			this.$sizeIndication.text(this.sizeIndicationText);
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
