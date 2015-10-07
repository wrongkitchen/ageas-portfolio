Accounts.onResetPasswordLink(function(_token, _done){
	Session.set('resetToken', _token);
});
Accounts.onEmailVerificationLink(function(token, done){
	Accounts.verifyEmail(token, function(err){
		if(!err){
			Bert.alert('Email verified', 'success')
			done();
		}
	});
});
AutoForm.addHooks('register-form', {
	before: {
		method: function(doc){
			var _this = this;
			var result = AutoForm.validateForm('register-form');
			if(!result){
				return result;
			} else {
				Meteor.call('pairEmailPhoneNumber', function(err, result){
					if(err){
						Bert.alert(err.reason, 'danger');
						return false;
					}
					if(result)
						_this.result(doc);
				});
			}
		}
	},
	onSuccess: function(method, result) {
		Bert.alert('Please check email and verify your email address', 'success')
		Router.go('/');
	}
});