Template.speechTemplate.helpers({
	speechImage: function(){
		var userId = (this.previewUserId) ? this.previewUserId : Meteor.userId();
		var userData = TemplateData.findOne({ user:userId });
		if(userData && userData.speechPhoto){
			var bgImage = Images.findOne(userData.speechPhoto);
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
				maxWidth: 308,
				maxHeight: 308
			},
			crop: true,
			jCrop: { aspectRatio: 1 / 1, boxWidth: 308 },
			showInfo: false,
			showReset: false,
			showClear: false,
			callback: function(err, photo){
				if(err) {
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					if(!photo.newImage){
						Meteor.call('saveImage', photo.src, 'speechPhoto', function(err, result){
							if (err){
								Bert.alert(err.reason, 'danger', 'growl-top-right');
							} else {
								$('.speechTemplate .photoUpPreview').modal('hide');
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