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