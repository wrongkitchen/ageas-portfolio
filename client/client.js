window.fbAsyncInit = function() {
	FB.init({
		appId      : '891317910955142',
		status     : true,
		xfbml      : true
	});
};

Template.photoUpOverride.replaces("photoUp");