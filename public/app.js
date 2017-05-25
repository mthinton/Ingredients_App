




function getDataFromEdamam(query, callback) {
    $.getJSON('https://api.edamam.com/search?q=' + query + '&app_id=6ede496c&app_key=c92d2cef61b509dc0805cfc788b6a213', callback);
}

function displaySearchResults(data) {
    var resultElement = '';
    if (data) {
        data.hits.forEach(function(item, index) {
        	resultElement += '<div class"recipe-item">'
            resultElement += '<p>' + item.recipe.label + '</p>';
            resultElement += '<p>' + item.recipe.ingredientLines + '</p>';
            resultElement += '<img src=' + item.recipe.image + '>';
            resultElement += '<a href=' + item.recipe.url + '> Link </a>';
            resultElement += '<input value=' + index + ' type="hidden"></input>';
            resultElement += '<button class="x">Save</button>';
            resultElement += '</div>';
        });
    } else {
        resultElement += '<p>' + 'No results' + '</p>';
    }
    $('.results_section').html(resultElement);
}

$(function() {
	    $('.registration_form').submit(function(e) {
        e.preventDefault();
        const newUser = {
            username: $('#username').val(),
            password: $('#password').val(),
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

    $('.login_form').submit(function(e) {
        e.preventDefault();
        const user = {
            username: $('#login_username').val(),
            password: $('#login_password').val()
        };
        $.ajax({
            type: 'GET',
            url: '/users',
            data: user,
            success: function(data) {
                console.log(data);
                window.location = '/search.html'
            }
        })
    })



    //save a recipe will update the user. Do that by doing a post
    //another post endpoint, will send recipe to save and my job is to find user. Update the user by adding.
    //how to get logged in user passport
    //find user in database
    ////Insert object into array



    $('.search_edamam').submit(function(e) {
        e.preventDefault();
        var query = $(this).find('#recipe_name').val();
        getDataFromEdamam(query, displaySearchResults);
    });

    $('.recipe-item').on('click', 'button', function() {
        console.log('hello world');
    })

});