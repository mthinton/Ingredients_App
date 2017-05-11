var edamam_Endpoint_URL = 'https://www.edamam.com/search';

$('.js_submit_button').submit(function(e){
	e.preventdefault();
	var query = (this).find('#ingredients').val();
})