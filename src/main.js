let $ = require('jquery');
import {game} from './game';
import * as nav from './nav';

$(document).ready(()=>{
	nav.init();
	game.init();
});