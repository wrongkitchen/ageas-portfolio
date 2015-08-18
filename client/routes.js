Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', { name: 'home', controller: 'MainController' });
Router.route('/register', { name: 'register', controller: 'RegisterController' });

MainController = RouteController.extend({
	action: function() {
		this.render('home');
	}
});

RegisterController = RouteController.extend({
	action: function() {
		this.render('register');
	}
});