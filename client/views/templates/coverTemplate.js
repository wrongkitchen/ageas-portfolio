Template.coverTemplate.helpers({
	photoUpOptions: function(){
		return {
			loadImage: {
				maxWidth: 1920,
				maxHeight: 1920
			},
			crop: true,
			jCrop: { aspectRatio: 1920 / 975, boxWidth: 928 },
			showInfo: false,
			showReset: false,
			showClear: false,
			callback: function(err, photo){
				if(err) {
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					if(!photo.newImage){
						Images.insert(photo.src, function (err, fileObj) {
							if (err){
								Bert.alert(err.reason, 'danger', 'growl-top-right');
							} else {
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

Template.photoUpCaller.onRendered(function(){
	$('#photoUpPreview').modal();
});