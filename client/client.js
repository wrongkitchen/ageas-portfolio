window.fbAsyncInit = function() {
	FB.init({
		appId      : '891317910955142',
		status     : true,
		xfbml      : true
	});
};

TemplateDefauleText = {
	coverCircle: "My Passion And Innovation",
	coverFooterText: "By taking part in this intern program, I hope to gain better understanding about myself.",
	coverKeywords: "Creativity｜Adaptation｜Perceptive｜Insight",
	coverSubTitle1: "Be Extraordinary In a Class by Yourself",
	coverSubTitle2: "Successfully Obtained Academic Credits",
	coverSubTitle3: "The Five Things I Want to Accomplish in 2016.",
	coverTitle: "Endless passion for ideals",
	profileBlueContent: "I have a clear vision of how the world should be, and respect law and tradition because they exist for a reason. I tend to believe the best of others, and sensitive to their needs and desires. I am considerate, generous, and very reliable. ",
	profileDescription: "By taking part in this intern program, I hope to gain better understanding about mvyself. Through a series of opportunities and challenges I want to increase self-awareness, and advance my expertise so as to benefit my future career development. ",
	profileGreenContent: "I wanted to live the life, a different life. I didn't want to go to the same place every day and see the same people and do the same job. I wanted interesting challenges.",
	profileGreenName: "“Dare to Differ”",
	profileName: "I am Amy Chan.",
	profilePurpleContent: "People of this personality type essentially feel that they are worthy in so far as they are helpful to others. Love is their highest ideal. Selflessness is their duty. Giving to others is their reason for being. Involved, socially aware, usually extroverted, Twos are the type of people who remember everyone's birthday and who go the extra mile to help out a co-worker, spouse or friend in need.",
	speaker1Content: "From Sammy Leung I learned how to train my own quick responses. In my mind he is a smart person. I used to feel being smart is an endowed characteristic. But today he shared some interesting examples in real-time, making me to realize quick responses can be improved by increasing mental awareness of the cause-effect relationship on matters in daily life. ",
	speaker2Content: "From Vennis Ma I learned a lot about how to best present self image. I used to feel I don't need to pay much attention on self image so long as I am very able in substance. But what the teacher said has influenced me a great deal: \"Focus on self image is not to please others but to respect both others and oneself.\" Looking at how a person presents himself you can infer his ability of managing self.",
	speaker3Content: "I learned a lot from Wing Lee I really wish someday I could become a successful person like him. Later some schoolmates told me he and I had something in common. That made me very happy. I will double my effort from now on so that I hope someday I can achieve as much as he does. ",
	speaker4Content: "From speaker Mr. Lai I learned how to deal with pressure. I admire his/her achievement in mountain climbing. Although I usually do not care for athletic activities, B taught me interesting formulas and tips. That makes me feel like wanting to try jogging sometime myself to see whether strengthening faith would help me not give up too easily. ",
	speaker5Content: "From speaker Mr. Wong I learned to improve my money management quotient. I was not good at managing money before. After learning his tips I feel I can accumulate more wealth by changing a lot of my small habits in daily life. The investment know-hows for beginners he taught also helps me become more reflective. ",
	speechName: "Kenji Wong",
	speechText: "See more, work more, and you will gain more",
	thumbnail1Text: "Your Caption",
	thumbnail2Text: "Your Caption",
	thumbnail3Text: "Your Caption",
	thumbnail4Text: "Your Caption",
	thumbnail5Text: "Your Caption",
	thumbnail6Text: "Your Caption",
	thumbnail7Text: "Your Caption",
	thumbnail8Text: "Your Caption",
	thumbnail9Text: "Your Caption",
	thumbnail10Text: "Your Caption",
	thumbnail11Text: "Your Caption",
	thumbnail12Text: "Your Caption"
}
Template.registerHelper("getTemplateText", function(pModalKey, pData){
	return (pData) ? pData : TemplateDefauleText[pModalKey];
});