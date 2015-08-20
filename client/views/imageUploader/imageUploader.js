Template.imageUploader.events({
	
	'change .imageInput': function(event, template){
		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function (err, fileObj) {
				if (err){
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					console.log(fileObj);
				}
			});
		});
	}

});