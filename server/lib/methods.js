Meteor.methods({
	pairEmailPhoneNumber: function(){
		// check is meteor user exist
		// compare phone and email
		return true;
	},
	register: function(doc){
		var result = check(doc, Schemas.User);
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
			return TemplateData.update({ user: Meteor.userId() }, { $set: pObj });
		} else {
			pObj.user = Meteor.userId();
			return TemplateData.insert(pObj);
		}
	},
	saveImage: function(imgSrc, dbKey){
		var imgID = Images.insert(imgSrc);
		var pObj = {};
			pObj[dbKey] = imgID._id;
		if(imgID){
			var savedModel = TemplateData.findOne({ user: Meteor.userId() });
			if(savedModel){
				return TemplateData.upsert({ user: Meteor.userId() }, { $set: pObj });
			} else {
				pObj.user = Meteor.userId();
				return TemplateData.insert(pObj);
			}
		}
	}

});