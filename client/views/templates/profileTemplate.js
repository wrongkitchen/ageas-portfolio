Template.profileTemplate.helpers({
	getCharacteristics: function(){
		var userData = TemplateData.findOne({ user: Meteor.userId() });
		if(userData && userData.characterType >= 0)
			return '<strong>' + PersonalTest.types[userData.characterType] + '</strong>' + PersonalTest.description[userData.characterType];
		else
			return false;
	},
	getAboutUserThumbnail: function(){
		var userId = (this.previewUserId) ? this.previewUserId : Meteor.userId();
		var userData = TemplateData.findOne({ user: userId });
		if(userData && userData.aboutUserThumbnail){
			var bgImage = Images.findOne(userData.aboutUserThumbnail);
			if(bgImage) 
				return bgImage.url();
			else
				return false;
		} else {
			return false;
		}
	},
	photoUpOptions: function(){
		return {
			loadImage: {
				maxWidth: 150,
				maxHeight: 150
			},
			crop: false,
			jCrop: { aspectRatio: 1920 / 975, boxWidth: 928 },
			showInfo: false,
			showReset: false,
			showClear: false,
			callback: function(err, photo){
				if(err) {
					Bert.alert(err.reason, 'danger');
				} else {
					// if(!photo.newImage){
						Meteor.call('saveImage', photo.src, 'aboutUserThumbnail', function(err, result){
							if (err){
								Bert.alert(err.reason, 'danger');
							} else {
								// $('#photoUpPreview').modal('hide');
								PhotoUp.set(null)
								Bert.alert('Image saved', 'success');
							}
						});
					// } else {
						// Bert.alert('Please select an area', 'success');
					// }
				}
			}
		}
	}
});
Template.profileTemplate.events({
	'click .editComponent.findType': function(){
		$('#characterTestPopup').modal({
			backdrop: 'static'
		});
	}
});