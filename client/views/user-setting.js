Template.userSetting.events({
	'click #userSettingPopup button.close': function(){
		$('#change-password')[0].reset()
		$('#userSettingPopup .form-group').removeClass('has-error');
	},
	'click #logoutBtn': function(){
		Meteor.logout(function(err){
			if(err) console.log(err);
		});
	},
	'submit #change-password': function(e){
		
		e.preventDefault();

		var current = $('#currentPassword').val(),
			newPassword = $('#newPassword').val(),
			rePassword = $('#reEnterPassword').val();

		if(current == '') $('#currentPassword').parent().addClass('has-error');
		if(newPassword == '') $('#newPassword').parent().addClass('has-error');
		if(rePassword == '') $('#reEnterPassword').parent().addClass('has-error');
		if(!current || !newPassword || !rePassword) return false;

		Meteor.loginWithPassword(Meteor.user().emails[0].address, current, function(err){ 
			if(err){
				Bert.alert(err.reason, 'danger', 'growl-top-right');
			} else if(newPassword != rePassword){
				Bert.alert('Password not match', 'danger', 'growl-top-right');
			} else if(current == newPassword){
				Bert.alert('Current password & new password cannot be the same', 'danger', 'growl-top-right');
			} else {
				Accounts.changePassword(current, rePassword, function(err){
					if(err){
						Bert.alert(err.reason, 'danger', 'growl-top-right');
					} else {
						$('#change-password')[0].reset()
						Bert.alert('Password changed', 'success', 'growl-top-right');
					}
				});
			}
		});
		
		return false;
	}
});