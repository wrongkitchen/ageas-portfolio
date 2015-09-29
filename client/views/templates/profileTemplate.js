Template.profileTemplate.helpers({
	getCharacteristics: function(){
		var userData = TemplateData.findOne({ user: Meteor.userId() });
		if(userData && userData.characterType >= 0)
			return '<strong>' + PersonalTest.types[userData.characterType] + '</strong>' + PersonalTest.description[userData.characterType];
		else
			return false;
	}
});
Template.profileTemplate.events({
	'click .editComponent.findType': function(){
		$('#characterTestPopup').modal({
			backdrop: 'static'
		});
	}
});