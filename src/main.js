import {player} from './player';
import {game} from './game';
import {translator} from './translate.js';
import {nav} from './nav';

translator.translate('Bonjour tout le monde !', ()=>{
	console.log(translator.result.text[0]);
});

game.pickWord((w)=>{
	console.log('Zbraduck');
});