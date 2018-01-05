let searchResults = [];

function watchSubmit(){
	$('.search_edamam').submit(function(e){
		e.preventDefault();
		var query = $(this).find('#recipe_name').val();
		getDataFromEdamam(query, displaySearchResults);
	});
}

function getDataFromEdamam (query, callback){
	$.getJSON('https://api.edamam.com/search?q='+query+'&app_id=6ede496c&app_key=c92d2cef61b509dc0805cfc788b6a213', callback);
}

	$('.logout_button').on('click', function(event) {
		$.ajax({
			type: 'GET',
			url: '/users/logout',
			success: function(response){
				if(response.loggedout){
					window.location = '/';
				}
			}
		})

	});

	function displaySearchResults(data){
	var resultElement = '';
	if(data){
		data.hits.forEach(function(item, index){
			resultElement += '<div class="recipe-item">';
			resultElement += '<input type="hidden" value="'+index+'" class="recipe-id">';
			resultElement += '<p>' + item.recipe.label +'</p>';
			resultElement += '<p>' + item.recipe.ingredientLines + '</p>';
			resultElement += '<img src='+item.recipe.image+'>';
			resultElement += '<a href='+ item.recipe.url +'> Link </a>';
			resultElement += '<button class="save-recipe-button">Save</button>';
			resultElement += '</div>'
		});
	}
	else{
		resultElement += '<p>' + 'No results' + '</p>';
	}
	$('.results_section').html(resultElement);

	searchResults = data.hits;


	$('.save-recipe-button').click(function() {
		const favoriteRecipeId = $(this).parent().find('.recipe-id').val();
		const recipe = searchResults[favoriteRecipeId];
		$.ajax({
			type: 'PUT',
			url: '/users',
			data: recipe,
			success: function (){
				alert('Recipe saved!');
			}
		})
        	})

}

	$( document ).ready(function() {//this adds to dropdown menu
    let savedResultElements = '';
    $.ajax({
			type: 'GET',
			url: '/users',
			success: function(res){
				for(let i = 0; i < res.savedRecipes.length; i++){
					$('.dropdown-content').append('<a href="savedRecipes.html">'+ res.savedRecipes[i].label +'</a>');
					$('.dropdown-content').append('<img src='+res.savedRecipes[i].image +'>');
				}
			}
		})
	});

	function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



$(function(){watchSubmit();});
