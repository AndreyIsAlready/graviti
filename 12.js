$(document).ready(function(){
	for(let elem of $('p')){
		elem.innerHTML = '!';
	}
	console.log($('p')[Symbol.iterator])
})
