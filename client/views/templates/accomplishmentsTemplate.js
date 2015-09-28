Template.accomplishmentsTemplate.helpers({
	accomplishImage: function(pModelKey, pDefaultImage){
		var userId = (this.previewUserId) ? this.previewUserId : Meteor.userId();
		var userData = TemplateData.findOne({ user: userId });
		if(userData && userData[pModelKey]){
			var bgImage = Images.findOne(userData[pModelKey]);
			if(bgImage) 
				return bgImage.url();
			else
				return pDefaultImage;
		} else {
			return pDefaultImage;
		}
	},
	photoUpOptions: function(pID){
		return {
			loadImage: {
				maxWidth: 300,
				maxHeight: 300
			},
			crop: true,
			jCrop: { aspectRatio: 1 / 1, boxWidth: 300 },
			showInfo: false,
			showReset: false,
			showClear: false,
			callback: function(err, photo){
				if(err) {
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					if(!photo.newImage){
						Meteor.call('saveImage', photo.src, Session.get('accomplishImageKey'), function(err, result){
							if (err){
								Bert.alert(err.reason, 'danger', 'growl-top-right');
							} else {
								$(Session.get('isPhotoUploadPopup') + ' .photoUpPreview').modal('hide');
								Bert.alert('Image saved', 'success', 'growl-top-right');
							}
						});
					} else {
						Bert.alert('Please select an area', 'success', 'growl-top-right');
					}
				}
			}
		}
	}
});


Template.accomplishmentsTemplate.events({
	'click .uploadBtn': function(event){
		imageKey = $(event.currentTarget).data('image-key');
		Session.set('accomplishImageKey', imageKey);
		Session.set('isPhotoUploadPopup', '.accomplishmentsTemplate .uploadBtn[data-image-key='+ imageKey +']');
	}
});