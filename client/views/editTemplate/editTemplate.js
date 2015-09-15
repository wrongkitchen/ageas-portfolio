
Session.set('unsave', false);

var templateDefauleText = {
    coverCircle: "<p>My Passion And Innovation</p>",
    coverFooterText: "<p>By taking part in this intern program, I hope to gain better understanding about myself.</p>",
    coverKeywords: "<p>Creativity｜Adaptation｜Perceptive｜Insight</p>",
    coverSubTitle1: "<p>Be Extraordinary In a Class by Yourself</p>",
    coverSubTitle2: "<p>Successfully Obtained Academic Credits</p>",
    coverSubTitle3: "<p>The Five Things I Want to Accomplish in 2016.</p>",
    coverTitle: "<p>Endless passion for ideals</p>",
    profileBlueContent: "<p>I have a clear vision of how the world should be, and respect law and tradition because they exist for a reason. I tend to believe the best of others, and sensitive to their needs and desires. I am considerate, generous, and very reliable.</p> ",
    profileDescription: "<p>By taking part in this intern program, I hope to gain better understanding about mvyself. Through a series of opportunities and challenges I want to increase self-awareness, and advance my expertise so as to benefit my future career development.</p> ",
    profileGreenContent: "<p>I wanted to live the life, a different life. I didn't want to go to the same place every day and see the same people and do the same job. I wanted interesting challenges.</p>",
    profileGreenName: "<p>“Dare to Differ”</p>",
    profileName: "<p>I am Amy Chan.</p>",
    profilePurpleContent: "<p>People of this personality type essentially feel that they are worthy in so far as they are helpful to others. Love is their highest ideal. Selflessness is their duty. Giving to others is their reason for being. Involved, socially aware, usually extroverted, Twos are the type of people who remember everyone's birthday and who go the extra mile to help out a co-worker, spouse or friend in need.</p>",
    speaker1Content: "<p>From Sammy Leung I learned how to train my own quick responses. In my mind he is a smart person. I used to feel being smart is an endowed characteristic. But today he shared some interesting examples in real-time, making me to realize quick responses can be improved by increasing mental awareness of the cause-effect relationship on matters in daily life.</p> ",
    speaker2Content: "<p>From Vennis Ma I learned a lot about how to best present self image. I used to feel I don't need to pay much attention on self image so long as I am very able in substance. But what the teacher said has influenced me a great deal: \"Focus on self image is not to please others but to respect both others and oneself.\" Looking at how a person presents himself you can infer his ability of managing self.</p>",
    speaker3Content: "<p>I learned a lot from Wing Lee I really wish someday I could become a successful person like him. Later some schoolmates told me he and I had something in common. That made me very happy. I will double my effort from now on so that I hope someday I can achieve as much as he does.</p> ",
    speaker4Content: "<p>From speaker Mr. Lai I learned how to deal with pressure. I admire his/her achievement in mountain climbing. Although I usually do not care for athletic activities, B taught me interesting formulas and tips. That makes me feel like wanting to try jogging sometime myself to see whether strengthening faith would help me not give up too easily.</p> ",
    speaker5Content: "<p>From speaker Mr. Wong I learned to improve my money management quotient. I was not good at managing money before. After learning his tips I feel I can accumulate more wealth by changing a lot of my small habits in daily life. The investment know-hows for beginners he taught also helps me become more reflective.</p> ",
    speechName: "<p>Kenji Wong</p>",
    speechText: "<p>See more, work more, and you will gain more</p>",
    thumbnail1Text: "<p>Your Caption</p>",
    thumbnail2Text: "<p>Your Caption</p>",
    thumbnail3Text: "<p>Your Caption</p>",
    thumbnail4Text: "<p>Your Caption</p>",
    thumbnail5Text: "<p>Your Caption</p>",
    thumbnail6Text: "<p>Your Caption</p>",
    thumbnail7Text: "<p>Your Caption</p>",
    thumbnail8Text: "<p>Your Caption</p>",
    thumbnail9Text: "<p>Your Caption</p>",
    thumbnail10Text: "<p>Your Caption</p>",
    thumbnail11Text: "<p>Your Caption</p>",
    thumbnail12Text: "<p>Your Caption</p>"
}

Tracker.autorun(function(){
    var templateData = TemplateData.findOne({ user: Meteor.userId() });
        templateData = (templateData) ? templateData : templateDefauleText;
    _.each(templateData, function(data, index){
        $('.editable[data-modal-key=' + index +']').html(data);
    });
});

Template.editTemplate.helpers({
    "saveOrPreview": function(){
        return (Session.get('unsave')) ? "儲存" : "預覽";
    }
});
Template.editTemplate.events({
    'click .savePreviewBtn': function(){
        if(Session.get('unsave')){
            // save event
            var saveObj = {};
            $('.editableTemplate .editable').each(function(pIndex, pObj){
                var instance = $(this);
                if(instance.data('modal-key')){
                    saveObj[instance.data('modal-key')] = instance.html();
                }
            });
            Meteor.call('saveTemplateDatas', saveObj, function(err){
                if(!err){
                    Session.set('unsave', false);
                    Bert.alert('儲存成功', 'success', 'growl-top-right');
                } else {
                    Bert.alert(err.reason, 'danger', 'growl-top-right');
                }
            });
        } else {
            var curTemplate = $('.editableTemplate.active').attr('id');
            window.open('/preview-template' + "#" + curTemplate, '_blank');
        }
    },
    'focus .editable': function(){
        Session.set('unsave', true);
    }
});

Template.editTemplate.onRendered(function(){
    
    $('[data-toggle="tooltip"]').tooltip();

    var templateData = TemplateData.findOne({ user: Meteor.userId() });
        templateData = (templateData) ? templateData : templateDefauleText;
    _.each(templateData, function(data, index){
        $('.editable[data-modal-key=' + index +']').html(data);
    });

    medium = new MediumEditor('.editable', {
        mode: MediumEditor.richMode,
        attributes: null,
        tags: null,
        toolbar: false,
        placeholder: false
    });

    medium.subscribe('editableInput', function (event, editable) {
    	var $target = $(event.target);
    	if($target.hasClass('heightFree')){
    		return false;
    	}
    	if ($target[0].scrollHeight > $target.innerHeight()) {
			$target.css('border', '1px solid red');
			$target.css('overflow-y', 'scroll');
		} else {
			$target.css('border', '1px dashed black');
			$target.css('overflow', 'hidden');
		}
	});
    
});