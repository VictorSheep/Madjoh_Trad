let $ = require('jquery');
import {translator} from './translate.js';
import * as nav from './nav';

export let game = {
	// Instance Vue.js correspondant au mot francais à traduire
	v_requestedWord : new Vue({
		el: '#requested-word',
		data: {
			requestedWord: 'traduire',
			fontSize: 2
		}
	}),
	// Instance Vue.js correspondant au score
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
	// Taille du mot écrit par l'utilisateur
	wordWrittenSize: 0,

	sizeIndication:{
		text: '',
		validColor:'#55855A',
		invalidColor: $('#size-answer').css("color")
	},
	// Eléments jquery utiles
	$inputAnswer: $('#game #answer'),
	$sizeIndication: $('#size-answer'),

	init(){
		let self = this;
		this.getRandWord();
		// Lorsque l'utilisateur écrit une réponse
		this.$inputAnswer.on("change paste keyup",(e)=> {
			this.wordWrittenSize = e.target.value.length;
			if (this.isSizeOk()){
				this.$sizeIndication.css("color",this.sizeIndication.validColor);
			}else{
				this.$sizeIndication.css("color",this.sizeIndication.invalidColor);
			}
		});

		// Lorsque l'utilisateur valide
		$(document).keypress((e)=>{
			if($('#game').css('display')=="block"){
				// à l'appuis sur la touche ENTER
				if( e.which == 13 ){
					// la vérification ne s'effectu que si la taille de la réponse
					// de l'utilisateur est égale à celle de la traduction
					if(self.isSizeOk()) self.validButton();
				}
			}
		});
		$('#game').on('click','button#verify',(event)=>{
			// la vérification ne s'effectu que si la taille de la réponse
			// de l'utilisateur est égale à celle de la traduction
			if(this.isSizeOk()) this.validButton();
		});
		$('#game-over').on('click','button',(event)=>{
			nav.hideGameOverMessages();
		});
	},
	/**
	 * setScore - Attribu une valeur au score
	 * @param {Number} nb : 	nouvelle valeur du score
	 */
	setScore(nb){
		this.v_score.score = nb;
	},
	/**
	 * addScore - Ajoute une valeur au score
	 * @param {Number} nb : 	valeur à ajouter
	 */
	addScore(nb){
		this.v_score.score += nb;
	},
	validButton(){
		this.word.written = this.$inputAnswer[0].value;
		this.updateScore();
		this.getRandWord();
		this.$inputAnswer[0].value='';
		this.gameOver();
	},
	checkSize(){
	},
	/**
	 * isTranslationOk - Compare la réponse avec la traduction retourné par l'API
	 * @return {Boolean} true: si la traduction et correct, false: si elle est fausse
	 */
	isTranslationOk(){
		return (this.word.translated==this.word.written)? true : false;
	},
	/**
	 * isSizeOk - Compare la taille de la réponse avec celle de la traduction retourné par l'API
	 * @return {Boolean} true: si la taille et la même, false: si elle est différente
	 */
	isSizeOk(){
		return (this.wordWrittenSize==this.wordTranslatedSize)? true : false;
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
		nav.goTo('game-over');
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
			this.$inputAnswer[0].value = this.word.translated[0];
			//console.log(this.word.translated);
			// On engegistre la longueur du mot traduit
			this.wordTranslatedSize = this.word.translated.length;
			// On affiche la longueur
			this.sizeIndication.text = '';
			for (var i = 0; i < this.wordTranslatedSize; i++) {
				this.sizeIndication.text += '-';
			}
			this.$sizeIndication.text(this.sizeIndication.text);
			// On bloque le nombre de carartere max de l'input
			this.$inputAnswer.attr("maxlength", this.wordTranslatedSize);
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
