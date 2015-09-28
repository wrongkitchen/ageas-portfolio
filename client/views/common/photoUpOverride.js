Template.photoUpCaller.onRendered(function(){
	if(Session.get('isPhotoUploadPopup')){
		$(Session.get('isPhotoUploadPopup') + ' .photoUpPreview').modal({
			backdrop: 'static'
		});
		$(Session.get('isPhotoUploadPopup') + ' .photoUpPreview').on('hidden.bs.modal', function (e) {
			PhotoUp.set(null);
		});
	}
});