Accounts.config({
	forbidClientAccountCreation: true
});
Accounts.onCreateUser(function(options, user) {

	user.profile = {
		name: options.name,
		phoneNumber: options.phoneNumber
	};

	// Meteor.setTimeout(function() {
	// 	Accounts.sendVerificationEmail(user._id);
	// }, 2 * 1000);

	return user;
});
