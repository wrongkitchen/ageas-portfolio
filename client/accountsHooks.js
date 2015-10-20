Accounts.onResetPasswordLink(function(_token, _done){
	Session.set('resetToken', _token);
});
Accounts.onEmailVerificationLink(function(token, done){
	Accounts.verifyEmail(token, function(err){
		if(!err){
			Bert.alert('電郵已驗證', 'success')
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
				Meteor.call('pairEmailPhoneNumber', doc.email, doc.phoneNumber, function(err, result){
					if(err){
						Bert.alert(err.reason, 'danger');
						return false;
					}
					if(result){
						_this.result(doc);
					} else {
						Bert.alert('電話號碼不存在 (請先登記成為「星級財策領袖實習計劃 2015」! 或使用已登記之電話號碼)', 'danger');
						// $('#register-form button[type=submit]').attr('disabled', false);
						_this.result(false);
					}
				});
			}
		}
	},
	onSuccess: function(method, result) {
		Bert.alert('請檢查電子郵件並驗證您的電郵地址', 'success')
		$('#register').modal('hide');
	},
	onError: function(method, err){
		Bert.alert(err.reason, 'danger')
	}
});