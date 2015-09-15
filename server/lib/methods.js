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
		var image = Images.findOne(imageID);
		var readStream = image.createReadStream('images');
		var writeStream = image.createWriteStream('images');
		if(cp.w == 0 || cp.h == 0) return false;
		gm(readStream).crop(cp.w, cp.h, cp.x, cp.y).stream().pipe(writeStream);
		return imageID;
	},
	saveTemplateDatas: function(pObj){
		var savedModel = TemplateData.findOne({ user: Meteor.userId() });
		if(savedModel){
			return TemplateData.update({ user: Meteor.userId() }, pObj);
		} else {
			pObj.user = Meteor.userId();
			return TemplateData.insert(pObj);
		}
	}
});