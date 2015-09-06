Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});
Router.route('/', { name: 'landing', controller: 'MainController' });
Router.route('/about', { name: 'about' });
Router.route('/register', { name: 'register', controller: 'GuestController' });
Router.route('/forget-password', { name: 'forgetPassword', controller: 'GuestController' });
Router.route('/reset-password', { name: 'resetPassword', controller: 'GuestController' });
Router.route('/edit-template', { 
	name: 'editTemplate', 
	controller: 'MemberController', 
	data: function(){ 
		return TemplateData.findOne({ user: Meteor.userId() }) 
	} 
});
Router.route('/preview-template', { 
	name: 'previewTemplate', 
	controller: 'MemberController',
	onAfterAction: function(){
        Session.set('hash', this.params.hash);
	}
});
// testing
Router.route('/image-uploader', { name: 'imageUploader', controller: 'MemberController' });
Router.route('/photo-up', { name: 'photoup', controller: 'MemberController' });

MemberController = RouteController.extend({
	onBeforeAction: function () {
		if(Meteor.userId())
			this.next();
		else
			Router.go('/');
	}
});
GuestController = RouteController.extend({
	onBeforeAction: function () {
		if(Meteor.userId())
			Router.go('/');
		else
			this.next();
	}
});
MainController = RouteController.extend({
	action: function() {
		if(Meteor.userId())
			this.render('home');
		else
			this.render('landing');
	}
});