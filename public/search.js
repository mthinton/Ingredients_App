	$( document ).ready(function() {
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