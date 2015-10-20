Template.forgetPassword.events({
	'submit #forget-password': function(e){
		e.preventDefault();
		var email = $('#forget-email').val(),
			phone = $('#forget-phone').val();
		Meteor.call('pairEmailPhoneNumber', function(err, result){
			if(err) {
				Bert.alert(err.reason, 'danger');
			} else {
				if(result){
					Accounts.forgotPassword({ email: email }, function(err){
						if(err){
							Bert.alert(err.reason, 'danger');
						} else {
							$('#forget-password')[0].reset();
							Bert.alert('請檢查電子郵件並重置密碼', 'success');
							Router.go('/');
						}
					});
				}
			}
		});
		return false;
	}
});