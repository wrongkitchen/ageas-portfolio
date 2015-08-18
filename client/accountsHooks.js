AutoForm.addHooks('register-form', {
	before: {
		method: function(doc){
			var _this = this;
			var result = AutoForm.validateForm('register-form');
			if(!result){
				return result;
			} else {
				Meteor.call('pairEmailPhoneNumber', function(err, result){
					if(!err){
						if(result)
							_this.result(doc);
					}
				});
			}
		}
	},
    onSuccess: function(method, result) {
    	Router.go('/');
    }
});