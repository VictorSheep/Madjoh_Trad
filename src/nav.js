let $ = require('jquery');

export default $('section').on('click', 'button.nav', (event)=>{
	let target = event.target;
	let page = $(target).data('target');
	$('section').hide();
	$('#'+page).fadeIn();
});