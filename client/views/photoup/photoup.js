Template.photoup.helpers({
	allImages: function(){ 
		return Images.find(); 
	},
	getURL: function(){ return '/cfs/files/images/' + this._id; },
	photoUpOptions: function(){
		return {
			loadImage: {
				maxWidth: 500,
				maxHeight: 1080
			},
			crop: true,
			jCrop: { aspectRatio: 16 / 9 },
			showInfo: false,
			callback: function(err, photo){
				if(err) 
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				else {
					Images.insert(photo.src, function (err, fileObj) {
						if (err){
							Bert.alert(err.reason, 'danger', 'growl-top-right');
						} else {
							Bert.alert('Image saved', 'success', 'growl-top-right');
						}
					});
				}
			}
		}
	}
});