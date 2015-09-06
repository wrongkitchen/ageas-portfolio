var imageEditor = '';

Template.imageUploader.helpers({
	getURL: function(){ return this.url(); },
	allImages: function(){ return Images.find(); },
	imageUploaded: function(){
		return (!!Session.get('previewImageSrc')) ? '' : 'hidden';
	},
	previewImageSrc: function(){
		var imageID = Session.get('previewImageSrc');
		var url = (imageID) ? Images.files.findOne(imageID).url() : '';
		if(url != ''){
			imageEditor.setImage(url);
		}
		return url;
	}
});
Template.imageUploader.events({
	'click #saveImageSize': function(){
		var imageID = Session.get('previewImageSrc');
		var cropArea = imageEditor.tellSelect();
		Meteor.call('cropImage', imageID, cropArea, function(err, result){
			if(err) {
				Bert.alert(err.reason, 'danger', 'growl-top-right');
			} else if(!result){
				Bert.alert('Please select an area', 'danger', 'growl-top-right');
			} else {
				Session.set('previewImageSrc', '');
				Bert.alert('Image cropped', 'success', 'growl-top-right');
			}
			$('#fileUploadForm')[0].reset();
		});
		return false;
	},
	'change #editImage': function(event, template){
		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function (err, fileObj) {
				if (err){
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					Session.set('previewImageSrc', fileObj._id);
				}
			});
		});
	}
});
Template.imageUploader.onRendered(function(){
	imageEditor = $('#previewImage').Jcrop({ boxWidth: 500, boxHeight: 300, aspectRatio: 1 }).data('Jcrop');
	var medium = new MediumEditor('#demo', {
        mode: MediumEditor.richMode,
        attributes: null,
        tags: null,
        toolbar: false
    });
    medium.subscribe('editableInput', function (event, editable) {
    	var $target = $(event.target);
    	if ($target[0].scrollHeight > $target.innerHeight()) {
			$target.addClass('error');
		} else {
			$target.removeClass('error');
		}
	});
});