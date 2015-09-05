Accounts.config({
	forbidClientAccountCreation: true
});
Accounts.onCreateUser(function(options, user) {

	user.profile = {
		name: options.name,
		phoneNumber: options.phoneNumber
	};
	
	return user;
});
