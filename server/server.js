Kadira.connect('GGde9xvxw3NKzCTqi', 'a159b0e5-9d1a-4ca2-bdf7-535957ea815f');

console.log('PORT ' + process.env.PORT + ' | Envoiment : ' + process.env.NODE_ENV);
console.log('PORT ' + process.env.PORT + ' | SMTP URL : ' + process.env.MAIL_URL);
console.log('PORT ' + process.env.PORT + ' | Settings : ');
console.log(Meteor.settings);