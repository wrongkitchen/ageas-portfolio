Meteor.publish("userData", function () {
	if (this.userId) {
		return Meteor.users.find({ _id: this.userId });
	} else {
		this.ready();
	}
});

Meteor.publish('images', function(){ 
	return Images.find(); 
});

Meteor.publish('templatesData', function(){ 
	return TemplateData.find(); 
});