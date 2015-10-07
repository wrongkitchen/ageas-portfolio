Template.photoup.helpers({
	allImages: function(){ 
		return Images.find(); 
	},
	getURL: function(){ 
		// return '/cfs/files/images/' + this._id; 
		return this.url();
	},
	photoUpOptions: function(){
		return {
			loadImage: {
				maxWidth: 1920,
				maxHeight: 1920
			},
			crop: true,
			jCrop: { aspectRatio: 16 / 9 },
			showInfo: false,
			callback: function(err, photo){
				if(err) {
					Bert.alert(err.reason, 'danger');
				} else {
					if(!photo.newImage){
						Images.insert(photo.src, function (err, fileObj) {
							if (err){
								Bert.alert(err.reason, 'danger');
							} else {
								Bert.alert('Image saved', 'success');
							}
						});
					} else {
						Bert.alert('Please select an area', 'success');
					}
				}
			}
		}
	}
});