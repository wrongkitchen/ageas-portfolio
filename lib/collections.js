Images = new FS.Collection("images", {
	stores: [ 
		new FS.Store.FileSystem("images", {
			transformWrite: function(fileObj, readStream, writeStream){
				gm(readStream, fileObj.name())
				.autoOrient()
				.noProfile()
				.stream()
				.pipe(writeStream);
			}
		}) 
	]
});

TemplateData = new Mongo.Collection("templatesData");