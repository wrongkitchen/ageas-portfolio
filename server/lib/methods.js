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
	resetCoverImage: function(){
		var savedModel = TemplateData.findOne({ user: Meteor.userId() });
		if(savedModel){
			return TemplateData.update({ user: Meteor.userId() }, { $set: { coverTemplateBg : '' } });
		} else {
			return false;
		}
	},
	cropImage: function(imageID, cp){
		var image = Images.findOne(imageID);
		var readStream = image.createReadStream('images');
		var writeStream = image.createWriteStream('images');
		if(cp.w == 0 || cp.h == 0) return false;
		gm(readStream).crop(cp.w, cp.h, cp.x, cp.y).stream().pipe(writeStream);
		return imageID;
	},
	saveCharacter: function(pType){
		var savedModel = TemplateData.findOne({ user: Meteor.userId() });
		if(pType >=0 && pType <= 8){
			if(savedModel){
				return TemplateData.update({ user: Meteor.userId() }, { $set: { characterType: pType } });
			} else {
				var obj = {};
					obj.user = Meteor.userId();
					obj.characterType = pType;
				return TemplateData.insert(obj);
			}
		} else {
			return false;
		}
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