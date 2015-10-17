Images.allow({
	insert: function(userId) {
		return (userId) ? true : false;
	},
	update: function(userId) {
		return (userId) ? true : false;
	},
	download: function(userId){
		return true;
	}
});
CoverImages.allow({
	insert: function(userId) {
		return (userId) ? true : false;
	},
	update: function(userId) {
		return false;
	},
	download: function(userId){
		return true;
	}
});