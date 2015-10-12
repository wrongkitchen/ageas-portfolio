
var userAnswer = [];
Session.set('userAnswer', userAnswer);

var mode = function (array){
	if(array.length == 0) return null;
	var modeMap = {};
	var maxEl = array[0], maxCount = 1;
	for(var i = 0; i < array.length; i++){
		var el = array[i];
		if(modeMap[el] == null)
			modeMap[el] = 1;
		else
			modeMap[el]++;	
		if(modeMap[el] > maxCount){
			maxEl = el;
			maxCount = modeMap[el];
		}
	}
	return maxEl;
}

Template.characterTestTemplate.helpers({
	currentQuestionNumber: function(){ return Session.get('userAnswer').length + 1; },
	totalQuestionNumber: function(){ return PersonalTest.questions.length },
	currentQuestion: function(){
		return (Session.get('userAnswer').length < PersonalTest.questions.length) ? PersonalTest.questions[Session.get('userAnswer').length].q : false;
	},
	isQuestionEnd: function(){
		return Session.get('userAnswer').length === PersonalTest.questions.length;
	},
	getCharType: function(){
		var answers = Session.get('userAnswer');
			answers = _.without(answers, null);
		// console.log(answers);
		// console.log(mode(answers));
		if(answers.length <= 0 ){
			$('#characterTestPopup').modal('hide');
			return false;
		} else {
			return PersonalTest.types[mode(answers)];
		}
	}
});

Template.characterTestTemplate.events({
	'click #characterBack': function(){
		if(Session.get('userAnswer').length > 0){
			userAnswer.pop();
			Session.set('userAnswer', userAnswer);
		}
	},
	'click #characterYes': function(){
		if(Session.get('userAnswer').length < PersonalTest.questions.length){
			userAnswer.push(PersonalTest.questions[userAnswer.length].type);
			Session.set('userAnswer', userAnswer);
		}
	},
	'click #characterNo': function(){
		if(Session.get('userAnswer').length < PersonalTest.questions.length){
			userAnswer.push(null);
			Session.set('userAnswer', userAnswer);
		}
	}
});

Template.characterTestTemplate.onRendered(function(){
	Session.set('userAnswer', []);
	$('#characterTestPopup').on('hidden.bs.modal', function (e) {
		var answers = Session.get('userAnswer');
			answers = _.without(answers, null);
		if(answers.length > 0 ){
			if(Session.get('userAnswer').length === PersonalTest.questions.length){
				Meteor.call('saveCharacter', mode(answers), function(err, result){
					if(err)
						Bert.alert(err.reason, 'danger');
					else
						Bert.alert('Characteristics saved', 'success');
				});
			}
		}
		userAnswer = [];
		Session.set('userAnswer', userAnswer);
	});
});