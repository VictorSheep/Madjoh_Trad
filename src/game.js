let $ = require('jquery');
import {translator} from './translate.js';

export let game = {
	v_requestedWord : new Vue({
		el: '#requested-word',
		data: {
			requestedWord: 'traduire' 
		}
	}),
	v_score : new Vue({
		el: '#score',
		data: {
			score: 10
		}
	}),
	currentState: null,

	// Mot à traduire
	word: {
		requested: '',
		translated: '',
		written: ''
	},

	setScore(){

	},
	resetScore(){

	},
	setWord(w){
		this.v_requestedWord.requestedWord = w;
		this.word.requested = w;
		translator.translate(w, ()=>{
			this.word.translated = translator.result.text[0];
			console.log(this.word.translated);
		});
	},
	getRandWord(callback){
		$.get('/word', (data) => {
			this.setWord(data.name);
			if (callback) callback(data);
		});
	}
}