Images = new FS.Collection("images", {
	stores: [ 
		new FS.Store.FileSystem("images", {
			beforeWrite: function (fileObj) {
				return {
					name: new Date().getTime() + '_' + Math.floor(Math.random() * 100000000000)
				};
			},
			transformWrite: function(fileObj, readStream, writeStream){
				gm(readStream)
				.autoOrient()
				.noProfile()
				.stream()
				.pipe(writeStream);
			}
		}) 
	],
	filter: {
		allow: {
			contentTypes: ['image/*'] //allow only images in this FS.Collection
		}
	}
});

TemplateData = new Mongo.Collection("templatesData");