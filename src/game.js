let $ = require('jquery');

export let game = {
	v_requestedWord : new Vue({
		el: '#requested-word',
		data: {
			requestedWord: 'Grandir'
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
	pickWord(callback){
		$.get('/words', (data) => {
			console.log(data);
			callback(data);
		})
	}
}