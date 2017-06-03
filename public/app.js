let searchResults = [];
let user_id = '';

function getDataFromEdamam (query, callback){
	$.getJSON('https://api.edamam.com/search?q='+query+'&app_id=6ede496c&app_key=c92d2cef61b509dc0805cfc788b6a213', callback);
}

	$('.logout-button').on('click', function(event) {
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


	$('.registration_form').submit(function(e){
		e.preventDefault();
		const newUser = {
		username : $('#username').val(),
		password : $('#password').val(),
		firstName: $('#firstName').val(),
		lastName: $('#lastName').val()
		};
	$.ajax({
      type: 'POST',
      url: '/users',
      data: newUser,
      success: function() {
      	window.location = '/login.html';
      }
		});
	})

	$('.login_form').submit(function(e){
		e.preventDefault();
		const user = {
			username : $('#login_username').val(),
			password : $('#login_password').val()
		};
		$.ajax({
			type: 'GET',
			url: '/users/existing',
			data: user,
			success: function(data){//data is response from server. I have access to response in callback function
				window.location = '/search.html'
			}
		});
	})

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

	//endpoint that does two things
//find what user is logged in passport authenticate using user model

//once i find the user, how to update property for a user, using mongoose

	//save a recipe will update the user. Do that by doing a post
	//another post endpoint, will send recipe to save and my job is to find user. Update the user by adding.
	//how to get logged in user passport
	//find user in database
	////Insert object into array
	

function watchSubmit(){
	$('.search_edamam').submit(function(e){
		e.preventDefault();
		var query = $(this).find('#recipe_name').val();
		getDataFromEdamam(query, displaySearchResults);
	});
}

$(function(){watchSubmit();});
