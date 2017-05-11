const MOCK_RECIPES =
{//Here we create schema for what client expects in return from API request

	"hits": [	
	{
		"label": "Teriyaki Chicken",
		"url": "http://www.davidlebovitz.com/chicken-teriyaki-recipe-japanese-farm-food/",
		"image": "https://www.edamam.com/web-img/c8e/c8e021a608c2f51b6af1e20e6d58fb3b.jpg",
		"ingredientLines": [ 
		"1/2 cup (125ml) mirin",
		"1/2 cup (125ml) soy sauce",
		"One 2-inch (5cm) piece of fresh ginger, peeled and grated",
		"2-pounds (900g) boneless chicken thighs (4-8 thighs, depending on size)"
		]
	},

	{
		"label": "Chicken Vesuvio",
		"url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
		"image": "https://www.edamam.com/web-img/eb5/eb5985a8a19a9fc72b0cf627282199ed.jpg",
		"ingredientLines":[
		"1/2 cup olive oil",
        "5 cloves garlic, peeled",
         "2 large russet potatoes, peeled and cut into chunks",
         "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
         "3/4 cup white wine",
         "3/4 cup chicken stock",
         "3 tablespoons chopped parsley",
         "1 tablespoon dried oregano",
         "Salt and pepper",
         "1 cup frozen peas, thawed"
			]
	}
	]
};

function getRecipes(callbackFn){
	setTimeout(function(){callbackFn(MOCK_RECIPES)},100);
}

function displayRecipeResults(data){
		data.hits.forEach(function(recipe){
			$('.results').append('<li>' + recipe.label + '<img src=" '+ recipe.image+'">' +'<br>' +  ' Ingredients: ' + recipe.ingredientLines + '</n>' + '<br>' + '<a href=" '+recipe.url+'">Link to Instructions</a>' + '</li>');
	})
}

function getAndDisplayRecipeResults(){
	getRecipes(displayRecipeResults);
}

$(function(){
	getAndDisplayRecipeResults();
})

