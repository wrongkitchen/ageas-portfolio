Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});
Router.route('/', { name: 'landing', controller: 'MainController' });
Router.route('/register', { name: 'register', controller: 'RegisterController' });

MainController = RouteController.extend({
	action: function() {
		if(Meteor.userId())
			this.render('home');
		else
			this.render('login');
	}
});

RegisterController = RouteController.extend({
	action: function() {
		if(Meteor.userId())
			Router.go('/');
		else
			this.render('register');
	}
});