Template.resetPassword.events({
	'submit #reset-password': function(e){
		e.preventDefault();
		var newPassword = $('#reset-newPassword').val(),
			rePassword = $('#reset-rePassword').val();
		if(!newPassword) $('#reset-newPassword').parent().addClass('has-error');
		if(!rePassword) $('#reset-rePassword').parent().addClass('has-error');
		if(!rePassword || !newPassword) return false;
		if(newPassword != rePassword){
			Bert.alert('Password not match', 'danger', 'growl-top-right');
			return false;
		} else {
			var token = Session.get('resetToken');
			Accounts.resetPassword(token, newPassword, function(err){
				if(err){
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					Session.set('resetToken', null);
					Bert.alert('Password reset', 'success', 'growl-top-right');
				}
			});
		}
		return false;
	}
});