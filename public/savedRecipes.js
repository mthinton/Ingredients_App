    function displayData(user) {
        let item = '';
        for (let i = 0; i < user.savedRecipes.length; i++) {
            item += '<div class="Display" >';
            item += '<input type="hidden" value="' + i + '" class="recindex">';
            item += '<a src="#">' + user.savedRecipes[i].label + '</a>';
            item += '<img src=' + user.savedRecipes[i].image + ' class="display_image">';
            item += '<button type="button" class="delete_button btn btn-link">Delete Recipe </button>';
            item += '</div>';
        }
        
        $('.savedResultsSection').html(item);

        

        $('.delete_button').click(function() {
            const recipeValue = ($(this).parent().find(".recindex").val());
            const recToBeDeleted = user.savedRecipes[recipeValue];
            $.ajax({
                type: 'PUT',
                url: 'users/deleteRecipe',
                data: recToBeDeleted,
                success: function(res) {
                    console.log(res.user);
                    alert('Recipe Deleted');
                    displayData(res.user);
                }
            })
        });
    }
    $.ajax({
        type: 'GET',
        url: '/users',
        success: function(user) {
            displayData(user);
        }
    })
