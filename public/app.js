const MOCK_RECIPES = {//Here we create schema for what client expects in return from API request
	"results": [	

	{
		"title": "Chicken with broccoli",
		"href": "http://www.allrecipes.com",
		"ingredients": "chicken, onions",
		"thumbnail": "http://img.recipepuppy.com/373064.jpg"
	},
	{
		"title": "Blue Ribbon Meatloaf",
		"href": "http://www.grouprecipes.com",
		"ingredients": "onions",
		"thumbnail": "http://img.recipepuppy.com/694321.jpg"
	},
	{
		"title": "Green Bean Casserole",
		"href": "http://www.eatingwell.com",
		"ingredients": "Green Beans",
		"thumbnail": "http://www.recipepuppy.com/698569.jpg"
	}

	]
};

//.on submit event
//ajax, get back data,

//when add to favorite, POST request and will save to my database

function getRecipes(callbackFn){
	setTimeout(function(){callbackFn(MOCK_RECIPES)},100);
}

function displayRecipeResults(data){
		data.results.forEach(function(recipe){
			$('.results').append('<li>' + recipe.title + '</li>');
	})
}

function getAndDisplayRecipeResults(){
	getRecipes(displayRecipeResults);
}

$(function(){
	getAndDisplayRecipeResults();
})

