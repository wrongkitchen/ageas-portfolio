Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});
Router.route('/', { name: 'landing', controller: 'MainController' });
Router.route('/register', { name: 'register', controller: 'GuestController' });

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
			this.render('login');
	}
});