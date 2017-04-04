let $ = require('jquery');
import {player} from './player';
import {game} from './game';
import {translator} from './translate.js';
import * as nav from './nav';

$(document).ready(()=>{
	// on n'affiche que la section home
	$('section').hide();
	$('#home').fadeIn();
	game.init();
	game.getRandWord();
});