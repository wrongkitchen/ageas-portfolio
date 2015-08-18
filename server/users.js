Meteor.users.after.insert(function (err, user) {
	Accounts.sendVerificationEmail(user._id);
});