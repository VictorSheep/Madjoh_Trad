let $ = require('jquery');
import {game} from './game';
import {translator} from './translate.js';
import * as nav from './nav';

$(document).ready(()=>{
	nav.init();
	game.init();
});