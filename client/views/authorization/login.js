function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
Template.login.events({
	'submit #login-form': function(e){
		e.preventDefault()
		var email = $('#login-email').val(),
			password = $('#login-password').val();
			email = (email) ? email.toLowerCase() : '';
		if(validateEmail(email)){
			Meteor.loginWithPassword(email, password, function(err){
				if(err){
					Bert.alert(err.reason, 'danger');
				}
			});
		} else {
			Meteor.call('getEmailByPhoneNumber', email, function(err, result){
				console.log('You email is' + result);
				if(err){
					Bert.alert(err.reason, 'danger');
				} else if(result){
					Meteor.loginWithPassword(result, password, function(err){
						if(err){
							Bert.alert(err.reason, 'danger');
						}
					});
				} else {
					Bert.alert('Email / Phone number not vaild', 'danger');
				}
			});
		}
		return false;
	}
});