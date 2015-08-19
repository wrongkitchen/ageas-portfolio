Template.landing.helpers({
	isResetPassword: function(){
		return Session.get('resetToken')
	}
});