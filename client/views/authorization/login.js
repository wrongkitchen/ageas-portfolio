Template.login.events({
	'submit #login-form': function(e){
		e.preventDefault()
		var email = $('#login-email').val(),
			password = $('#login-password').val();
		Meteor.loginWithPassword(email, password, function(err){
			if(err){
				Bert.alert(err.reason, 'danger', 'growl-top-right');
			}
		});
		return false;
	}
});