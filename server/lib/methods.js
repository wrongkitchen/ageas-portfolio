Meteor.methods({
	pairEmailPhoneNumber: function(){
		// check is meteor user exist
		// compare phone and email
		return true;
	},
	register: function(doc){
		check(doc, Schemas.User);
		return Accounts.createUser(doc);
	},
	cropImage: function(imageID, cp){
		var readStream = Images.findOne(imageID).createReadStream('images');
		var writeStream = Images.findOne(imageID).createWriteStream('images');
		if(cp.w == 0 || cp.h == 0) return false;
		gm(readStream).crop(cp.w, cp.h, cp.x, cp.y).stream().pipe(writeStream);
		return imageID;
	}
});