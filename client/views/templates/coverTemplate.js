Template.coverTemplate.helpers({
	coverTemplateBg: function(){
		var userId = (this.previewUserId) ? this.previewUserId : Meteor.userId();
		var userData = TemplateData.findOne({ user: userId });
		if(userData && userData.coverTemplateBg){
			var bgImage = Images.findOne(userData.coverTemplateBg);
			if(bgImage) 
				return bgImage.url();
			else
				return '/images/demo/cover-image-1.jpg';
		} else {
			return '/images/demo/cover-image-1.jpg';
		}
	},
	photoUpOptions: function(){
		return {
			loadImage: {
				maxWidth: 1920,
				maxHeight: 1920
			},
			crop: false,
			jCrop: { aspectRatio: 1920 / 975, boxWidth: 928 },
			showInfo: false,
			showReset: false,
			showClear: false,
			callback: function(err, photo){
				if(err) {
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					// if(!photo.newImage){
						Meteor.call('saveImage', photo.src, 'coverTemplateBg', function(err, result){
							if (err){
								Bert.alert(err.reason, 'danger', 'growl-top-right');
							} else {
								// $('#photoUpPreview').modal('hide');
								PhotoUp.set(null)
								Bert.alert('Image saved', 'success', 'growl-top-right');
							}
						});
					// } else {
						// Bert.alert('Please select an area', 'success', 'growl-top-right');
					// }
				}
			}
		}
	}
});