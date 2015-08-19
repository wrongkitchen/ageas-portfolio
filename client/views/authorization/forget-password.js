Template.forgetPassword.events({
	'submit #forget-password': function(e){
		e.preventDefault();
		var email = $('#forget-email').val(),
			phone = $('#forget-phone').val();
		Meteor.call('pairEmailPhoneNumber', function(err, result){
			if(err) {
				Bert.alert(err.reason, 'danger', 'growl-top-right');
			} else {
				if(result){
					Accounts.forgotPassword({ email: email }, function(err){
						if(err){
							Bert.alert(err.reason, 'danger', 'growl-top-right');
						} else {
							$('#forget-password')[0].reset();
							Bert.alert('Please check email & reset password', 'success', 'growl-top-right');
							Router.go('/');
						}
					});
				}
			}
		});
		return false;
	}
});