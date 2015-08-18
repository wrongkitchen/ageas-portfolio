Meteor.methods({
	pairEmailPhoneNumber: function(){
		// check is meteor user exist
		// compare phone and email
		return true;
	},
	register: function(doc){
		check(doc, Schemas.User);
		return Accounts.createUser(doc);
	}
});