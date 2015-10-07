function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

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
				maxWidth: 600,
				maxHeight: 600
			},
			crop: true,
			jCrop: { aspectRatio: 1 / 1, boxWidth: 300 },
			showInfo: false,
			showReset: false,
			showClear: false,
			showFilter: true,
			getFilter: function(pDataSrc, pImageID, pColor){
				var image = new Image();
					image.onload = function(){
						var canvasID = 'canvas_' + Math.floor(Math.random() * 100000);
						var canvas = $('<canvas style="display:none;" id="' + canvasID + '" width="' + image.width +'" height="' + image.height + '"></canvas>');
						var ctx = canvas[0].getContext('2d');
						ctx.drawImage(image, 0, 0);
						$('body').append(canvas);
						if(pColor === 'bubble' || pColor === 'ageasLine'){
							$('#' + canvasID).drawImage({
								source: (pColor === 'bubble') ? '/images/filter-01.png' : '/images/filter-02.png',
								x: 0, y: 0,
								width: image.width,
								height: image.height,
								fromCenter: false
							});
							var filterImage = new Image();
								filterImage.onload = function(){
									setTimeout(function(){
										$('#' + pImageID).attr('src', canvas[0].toDataURL());
									}, 1000);
								}
								filterImage.src = (pColor === 'bubble') ? '/images/filter-01.png' : '/images/filter-02.png';
						} else {
							$('#' + canvasID).drawRect({
								fillStyle: 'rgba(' + hexToRgb(pColor) + ',.5)',
								x: 0, y: 0,
								width: image.width,
								height: image.height,
								fromCenter: false
							});
							$('#' + pImageID).attr('src', canvas[0].toDataURL());
							// Caman("#" + canvasID, function () {
							// 	if(pColor){
							// 		this.newLayer(function () {
							// 			this.opacity(50);
							// 			this.fillColor(pColor);
							// 		});
							// 	}
							// 	this.render(function () {
							// 		$('#' + pImageID).attr('src', canvas[0].toDataURL());
							// 		canvas.remove();
							// 	});
							// });
						}
					}
					image.src = pDataSrc;
				return pDataSrc;
			},
			callback: function(err, photo){
				if(err) {
					Bert.alert(err.reason, 'danger');
				} else {
					if(!photo.newImage){
					} else {
						Bert.alert('Please select an area', 'success');
					}
				}
			}
		}
	}
});


Template.accomplishmentsTemplate.events({
	'click .accomp_filter_image': function(event){
		$('.accomp_filter_image').removeClass('active');
		$(event.currentTarget).addClass('active');
	},
	'click #filterConfirm': function(event){
		if($('.accomp_filter_image.active').length){
			var src = $('.accomp_filter_image.active').attr('src');
			Meteor.call('saveImage', src, Session.get('accomplishImageKey'), function(err, result){
				if (err){
					Bert.alert(err.reason, 'danger');
				} else {
					$(Session.get('isPhotoUploadPopup') + ' .photoUpPreview').modal('hide');
					$('.accomp_filter_image').removeClass('active');
					Bert.alert('Image saved', 'success');
				}
			});
		} else {
			Bert.alert('Please select an image', 'danger');
		}
	},
	'click .uploadBtn': function(event){
		imageKey = $(event.currentTarget).data('image-key');
		Session.set('accomplishImageKey', imageKey);
		Session.set('isPhotoUploadPopup', '.accomplishmentsTemplate .uploadBtn[data-image-key='+ imageKey +']');
	}
});