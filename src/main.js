let $ = require('jquery');
import {player} from './player';
import {game} from './game';
import {translator} from './translate.js';
import * as nav from './nav';

$(document).ready(()=>{
	$('section').hide();
	$('#home').fadeIn();
	game.getRandWord();
});