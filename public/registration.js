	$('.registration_form').submit(function(e){
		e.preventDefault();
		console.log('hello world');
		const newUser = {
		username : $('#username').val(),
		password : $('#password').val(),
		firstName: $('#firstName').val(),
		lastName: $('#lastName').val()
		};
		console.log(newUser);
	$.ajax({
      type: 'POST',
      url: '/users',
      data: newUser,
      success: function() {
      	window.location = '/login.html';
      }
		});
	})