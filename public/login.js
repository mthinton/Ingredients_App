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
			success: function(res){
			console.log(res)//data is response from server. I have access to response in callback function
				window.location = '/search.html'
			}
		});
	})