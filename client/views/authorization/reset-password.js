Template.resetPassword.events({
	'submit #reset-password': function(e){
		e.preventDefault();
		var newPassword = $('#reset-newPassword').val(),
			rePassword = $('#reset-rePassword').val();
		if(!newPassword) $('#reset-newPassword').parent().addClass('has-error');
		if(!rePassword) $('#reset-rePassword').parent().addClass('has-error');
		if(!rePassword || !newPassword) return false;
		if(newPassword != rePassword){
			Bert.alert('密碼錯誤', 'danger');
			return false;
		} else {
			var token = Session.get('resetToken');
			Accounts.resetPassword(token, newPassword, function(err){
				if(err){
					Bert.alert(err.reason, 'danger');
				} else {
					Session.set('resetToken', null);
					Bert.alert('密碼已重置', 'success');
				}
			});
		}
		return false;
	}
});