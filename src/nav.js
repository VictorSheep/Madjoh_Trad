let $ = require('jquery');

export default $('section').on('click', 'button.nav', (event)=>{
	let target = event.target;
	let page = $(target).data('target');
	goTo(page);
});

export function init(){
	// on n'affiche que la section home
	hideGameOverMessages();
	goTo('home');
};

export function goTo(sectionId){
	$('section').hide();
	$('#'+sectionId).fadeIn();
}

export function hideGameOverMessages(){
	$('#win-message').hide();
	$('#loose-message').hide();	
}