Meteor.methods({
	pairEmailPhoneNumber: function(pEmail, pPhoneNumber){
		var phone = Phone.findOne({ email: pEmail, mphone: pPhoneNumber + "" });
		return (phone) ? true : false;
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
		var readStream = Images.findOne(imageID).createReadStream('images');
		var writeStream = Images.findOne(imageID).createWriteStream('images');
		if(cp.w == 0 || cp.h == 0) return false;
		gm(readStream).crop(cp.w, cp.h, cp.x, cp.y).stream(function(err, stdout, stderr){
			console.log(err);
			console.log(stderr);
			stdout.pipe(writeStream);
		});
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
	},
	saveCoverImage: function(pDataString){
		var imgID = CoverImages.insert(pDataString);
		return (imgID && imgID._id) ? imgID._id : false;
	},
	getEmailByPhoneNumber: function(pNumber){
		var user = Meteor.users.findOne({ 'profile.phoneNumber': pNumber });
		return (user) ? user.emails[0].address : false;
	},
	updateUserProfile: function(pObj){
		if(pObj){
			return Meteor.users.update({ _id:Meteor.userId() }, { $set : { "profile.name": pObj.name } });
		} else {
			return false;
		}
	}
});