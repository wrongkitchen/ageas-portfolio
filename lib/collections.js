Images = new FS.Collection("images", {
	stores: [ 
		new FS.Store.FileSystem("images", {
			beforeWrite: function (fileObj) {
				return {
					name: new Date().getTime() + '_' + Math.floor(Math.random() * 100000000000) + '.jpg'
				};
			},
			transformWrite: function(fileObj, readStream, writeStream){
				gm(readStream)
				.setFormat('jpg')
				.compress('JPEG')
				.autoOrient()
				.noProfile()
				.stream()
				.pipe(writeStream);
			}
		}) 
	],
	filter: {
		allow: {
			contentTypes: ['image/*'] //allow only images in this FS.Collection
		}
	}
});

TemplateData = new Mongo.Collection("templatesData");

Phone = new Mongo.Collection("phone");

TemplateDefauleText = {
    coverCircle: "<p class=\"transparent\">My Passion And Innovation</p>",
    coverFooterText: "<p class=\"transparent\">By taking part in this intern program, I hope to gain better understanding about myself.</p>",
    coverKeywords: "<p class=\"transparent\">Creativity｜Adaptation｜Perceptive｜Insight</p>",
    coverSubTitle1: "<p class=\"transparent\">Be Extraordinary In a Class by Yourself</p>",
    coverSubTitle2: "<p class=\"transparent\">Successfully Obtained Academic Credits</p>",
    coverSubTitle3: "<p class=\"transparent\">The Five Things I Want to Accomplish in 2016.</p>",
    coverTitle: "<p class=\"transparent\">Endless passion for ideals</p>",
    profileBlueContent: "<p class=\"transparent\">I have a clear vision of how the world should be, and respect law and tradition because they exist for a reason. I tend to believe the best of others, and sensitive to their needs and desires. I am considerate, generous, and very reliable.</p> ",
    profileDescription: "<p class=\"transparent\">By taking part in this intern program, I hope to gain better understanding about mvyself. Through a series of opportunities and challenges I want to increase self-awareness, and advance my expertise so as to benefit my future career development.</p> ",
    profileGreenContent: "<p class=\"transparent\">I wanted to live the life, a different life. I didn't want to go to the same place every day and see the same people and do the same job. I wanted interesting challenges.</p>",
    profileGreenName: "<p class=\"transparent\">“Dare to Differ”</p>",
    profileName: "<p class=\"transparent\">I am Amy Chan.</p>",
    speaker1Content: "<p class=\"transparent\">From Sammy Leung I learned how to train my own quick responses. In my mind he is a smart person. I used to feel being smart is an endowed characteristic. But today he shared some interesting examples in real-time, making me to realize quick responses can be improved by increasing mental awareness of the cause-effect relationship on matters in daily life.</p> ",
    speaker2Content: "<p class=\"transparent\">From Vennis Ma I learned a lot about how to best present self image. I used to feel I don't need to pay much attention on self image so long as I am very able in substance. But what the teacher said has influenced me a great deal: \"Focus on self image is not to please others but to respect both others and oneself.\" Looking at how a person presents himself you can infer his ability of managing self.</p>",
    speaker3Content: "<p class=\"transparent\">I learned a lot from Wing Lee I really wish someday I could become a successful person like him. Later some schoolmates told me he and I had something in common. That made me very happy. I will double my effort from now on so that I hope someday I can achieve as much as he does.</p> ",
    speaker4Content: "<p class=\"transparent\">From speaker Mr. Lai I learned how to deal with pressure. I admire his/her achievement in mountain climbing. Although I usually do not care for athletic activities, B taught me interesting formulas and tips. That makes me feel like wanting to try jogging sometime myself to see whether strengthening faith would help me not give up too easily.</p> ",
    speaker5Content: "<p class=\"transparent\">From speaker Mr. Wong I learned to improve my money management quotient. I was not good at managing money before. After learning his tips I feel I can accumulate more wealth by changing a lot of my small habits in daily life. The investment know-hows for beginners he taught also helps me become more reflective.</p> ",
    speechName: "<p>Kenji Wong</p>",
    speechText: "<p>See more, work more, and you will gain more</p>",
    thumbnail1Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail2Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail3Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail4Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail5Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail6Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail7Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail8Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail9Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail10Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail11Text: "<p class=\"transparent\">Your Caption</p>",
    thumbnail12Text: "<p class=\"transparent\">Your Caption</p>"
};

PersonalTest = {    
    "types": [
        "完美型",
        "忠誠型",
        "思想型",
        "感覺型",
        "奉獻型",
        "成就型",
        "領導型",
        "開朗型",
        "平和型"
    ],
    "description": [
        "性格傾向︰內向、被動、批判、堅守原則<br /><br />世界觀︰我渴望每件事都做得最好，所以不斷改進，令自己和世界變得完美。<br /><br />型格特徵︰道德觀念強，做人處事有原則、守紀律，公平公正，黑白分明，不易妥協。勤奮、認真、有責任感。自我鞭策，有一套自我的標準，對人對己的要求都很高，對瑕疵和缺點很在意，渴望完美。固執，愛批評、挑剔，有時會過於囉唆。每當遇有不符標準或理想的情況，會變得焦躁甚至憤怒，但這種憤怒多會抑制於心內。",
        "性格傾向︰內向、主動、保守、謹慎<br /><br />世界觀︰世界充滿危險，所以我渴望權威的保護，但對權威也會有所懷疑。<br /><br />型格特徵︰為人勤力務實，謹慎可靠、含蓄保守、有責任感。做決定時顧慮頗多，經常猶豫不決，思想理智但行事衝動。多疑，容易焦慮，渴望安全感，卻不易相信別人。會依附強權尋求保護，卻又不絕對信任強權，有時會因為過份焦慮而做出反強權的行為。喜歡群體生活，不愛受注視，安於現狀。",
        "性格傾向︰內向、被動、自我、着重思考分析<br /><br />世界觀︰我喜歡思考、渴求知識，因為知識就是力量。<br /><br />型格特徵︰冷靜理性、沉默寡言，喜歡獨處，重視私人時間及空間。不善表達內心感受，在人群中會顯得不自在，說話時聲線較細。喜歡吸收各方面的資訊，也能專注研究一項專門知識，擅長分析思考，但行動力低。凡事冷眼旁觀，把情感抽離。對物質要求不高，重視精神生活。",
        "性格傾向︰內向、被動、感情豐富、自我<br /><br />世界觀︰我與眾不同，能感受生命的各種情感，拒絕隨波逐流。<br /><br />型格特徵︰   感性浪漫、感覺敏銳，具藝術氣質，有創意，有品味及個性，渴望獨特。具同理心，能感受他人的憂愁和生命的種種，追尋生命的意義和不平凡的人生。妒忌心重、佔有慾強、情緒化、多愁善感，心靈容易受傷。害怕被人拒絕，會覺得別人不明白自己，因而我行我素，不易妥協，忠於自我。",
        "性格傾向︰外向、主動、重情、熱心助人<br /><br />世界觀︰我甘願奉獻自己幫助他人，也深信他們需要我的幫助。<br /><br />型格特徵︰為人熱情，有愛心，善解人意，能討人喜歡。他們慷慨，熱心助人，更不介意犧牲自己成就他人，但對於一些爛泥扶不上壁的人，就絕不理睬。他們藉着對他人的幫助肯定自己，每每期望他人的感激和依賴。他們渴望被愛，甘願遷就他人，使對方需要自己，卻忽略自己的需要。",
        "性格傾向︰外向、主動、擅於交際、有幹勁<br /><br />世界觀︰我努力不懈追求成就，渴望得到別人的掌聲。<br /><br />型格特徵︰勤力自信，口才出眾，注重形象，愛競爭，好勝。喜歡展示自己的能力、成就，以此衡量自己的價值高低。做事以目標為本，行動力高，有效率，能靈活變通，處世圓滑，不介意與人妥協。熱愛工作和挑戰，勤力追求成就和別人的讚賞，怕失敗，不打沒有把握的仗，懼怕表達內心感受。",
        "性格傾向︰外向、主動、果斷、自信<br /><br />世界觀︰我自強不息，充滿正義感。有能力戰勝環境，貢獻社會。<br /><br />型格特徵︰自信、富正義感，有大志，盡心保護家人及下屬，也擅於激勵別人。做事拼搏、盡責，實事求事，討厭虛偽奉承，追求權力。遇強愈強，百折不撓，也不依靠他人。脾氣大，衝動、專制，有時會顯得咄咄逼人，不喜歡將自己軟弱的一面示於人前。",
        "性格傾向︰性格傾向︰ 外向、主動、樂天開朗、怕沉悶<br /><br />世界觀︰我追求快樂、好玩，喜歡探求新奇刺激的事物和體驗。<br /><br />型格特徵︰聰明靈巧，活力充沛，樂天開朗、富幽默感、有魅力，自我也自戀。愛新鮮刺激和好玩之事物，物質主意，追求玩樂、享受，喜歡多姿多彩的生活，創意高，計畫和嗜好多多，卻經常半途而廢。最怕受管束，不喜歡承受壓力，缺乏耐性及責任感，面對挫折和失敗可以很快復原，逃避負面情緒。",
        "性格傾向︰內向、被動、情緒平和、待人親切<br /><br />世界觀︰我喜歡平凡安穩的生活，與他人保持和諧關係。<br /><br />型格特徵︰為人隨和樂觀，與世無爭，喜歡悠閒的生活，能自得其樂。有時予人怠惰、散漫的感覺。待人親切友善，事事以和為貴，有耐性，是個很好的聆聽者。重視他人感受，遷就他人，而忽視自己的感覺。行動力及組織弱，不懂編排事情的先後急緩，經常忙碌一埸卻不見成效。無主見，難於拒絕他人。不懂渲洩憤怒。"
    ],
    "questions": [
        { "type": 0, "q": "工作勤奮，負責任，有效率，擅於找出錯失，凡事愛親力親為。守時、守規則，做事有目標、有計劃，講求實際。"},
        { "type": 0, "q": "喜歡整潔、不論儀容或住處都要乾淨整齊，凌亂、無章令我難以容忍。"},
        { "type": 0, "q": "無論是自己或他人犯錯，也會耿耿於懷，所以我很努力改正缺點。"},
        { "type": 0, "q": "大部份時候都過於嚴肅、不苟言笑，很難令自己放鬆下來。凡事要求正確，對人對己均有要求，別人馬虎的態度會令我生氣。講求原則，並堅持自己的價值觀，難以接受他人批評。"},
        { "type": 0, "q": "經常會說︰應該這樣做、應該那樣做。朋友有時會說我過分挑剔、諸多批評。"},
        { "type": 0, "q": "處事理性，黑白分明，成熟獨立，凡事都有一套準則。處事井然有序，計畫受打亂就會感到焦躁不安。"},


        { "type": 1, "q": "勤奮、忠誠、可靠，渴求安全感，做人做事都很認真。循法守規，有責任感，做事十分謹慎，凡事都計劃周詳。" },
        { "type": 1, "q": "有時善良溫順，有時焦躁易怒，令人難以捉摸。" },
        { "type": 1, "q": "不輕易相信別人，寧可與人保持距離，但內心又渴望得到別人的認同和欣賞。很在意伴侶對自己的想法，並會懷疑伴侶是否忠誠。" },
        { "type": 1, "q": "理財謹慎，會控制伴侶的財政和開支，但卻捨得花費在自己的愛好和興趣上。" },
        { "type": 1, "q": "性格矛盾，時而崇拜權威，時而反抗權威。經常猶豫不決，難下決定。處事方法極端，不是向前衝，就是拖延搖擺。多疑、警覺性高，有時會反應過敏，凡事都作最壞打算。" },
        { "type": 1, "q": "很難承認過失和原諒別人，對於別人的批評，我認為是一種惡意的攻擊。" },


        { "type": 2, "q" : "處事專注，不愛被打擾，投入工作時，會忘記吃飯和睡覺。渴求知識、好奇心強、會每事問，也愛收集一切有用的資料。" },
        { "type": 2, "q" : "討厭思想混亂、情緒激動的人，也討厭喧鬧，所以我從不大聲說話。" },
        { "type": 2, "q" : "沉默寡言，也不擅詞令，拙於表達心中感受，傾向把情感抽離。拙於做決定，不着重物質享受，也不着重外表打扮，只希望別人欣賞我的學問和知識。" },
        { "type": 2, "q" : "冷靜、客觀、獨行獨斷，並會堅持己見。別人覺得我很冷漠。除非別人問我，否則不會主動表達意見，而在開口之前，我必先在心中仔細思考。" },
        { "type": 2, "q" : "分析力強、思緒清晰，對於複雜的問題也能辨明理解。喜歡獨立解決問題，絕少求人幫助，以免欠下人情。" },
        { "type": 2, "q" : "喜歡獨處，很注重私人時間和空間。吝嗇金錢和時間。不喜歡面對陌生人群，寧願與人疏離，但有時候我也渴望擁有更好的社交技巧。" },

        { "type": 3, "q": "浪漫、感性、敏感，相信直覺，而且感情豐富，能體恤他人的情感。有時會很情緒化，容易嫉妒和鬱鬱不歡，並會自怨自憐。" },
        { "type": 3, "q": "我喜愛美麗的人和物，有獨特的品味，對衣著很講究，並有藝術天份。" },
        { "type": 3, "q": "我重視與伴侶的關係和感覺，但又抗拒太親密，因為我認為距離產生美感。" },
        { "type": 3, "q": "喜歡感受生命，愛幻想，創作力強。做事我行我素，有時會任性而行。害怕平凡，渴望與眾不同，有時會沉溺在自我世界中，朋友認為我不設實際。" },
        { "type": 3, "q": "討厭虛偽的交際應酬，對着討厭的人會變得冷漠。別人覺得我高傲，難以接近﹔相反我覺得別人經常誤解我。" },
        { "type": 3, "q": "我抱有很多理想，但自己又很難去設實執行。我的生活比較懶散，做事不太起勁，凡事最怕難為情。" },

        { "type": 4, "q": "能體恤別人的需要和感受，但卻忽視自己的需要。" },
        { "type": 4, "q": "充滿愛心和耐性，重視人際和諧，重情友情。我時常精力充沛，待人誠懇、熱情，而且慷慨。" },
        { "type": 4, "q": "擅於討人喜歡，愛聊天，並樂於傾聽別人感受。付出幫忙之後，會希望得到對方的感激和讚賞。" },
        { "type": 4, "q": "喜歡被人依賴，這樣會令我覺得被重視，並視幫助別人為自己的成就。" },
        { "type": 4, "q": "不會直斥別人，只會向第三者埋怨，但面對敵人時，又會變得毫不客氣。妒忌心頗重，會不自覺地以愛控制別人。會隱藏自己的軟弱和悲傷。事實上，我渴望被需要和認同，而且害怕孤獨。" },
        { "type": 4, "q": "我不懂拒絕別人，有時我會甘願犧牲自己幫助他人。服務人群令我很自豪，並且自信能令別人更加成功。" },

        { "type": 5, "q": "擅於計畫，可同時開展多項工作，但有時會忽視自己的能力，令自己筋疲力竭。" },
        { "type": 5, "q": "會忽略自己的感受，並逃避負面情緒，害怕表達情感。絕少為家事花心思，反而會因為工作，犧牲家人及伴侶。" },
        { "type": 5, "q": "做事有目標，懂得爭取。精於計算和訂立進度。對自己的能力滿有信心。" },
        { "type": 5, "q": "非常重視形象和成就，奮力追求成功，喜歡別人讚賞自己的能力。自信、聰明，喜歡與人比較和競爭。也會羨妒他人的成就。" },
        { "type": 5, "q": "懂得表現自己，有時會賣弄一下才華，並且逃避自己的弱點。傾向報喜不報憂。為了達成目標，不介意走捷徑，並努力避免失敗。" },
        { "type": 5, "q": "勤奮、進取、樂觀。儀表出眾，口才好，有說服力。處事靈巧、果斷、工作賣力、行動迅速，擅於把握機遇。" },

        { "type": 6, "q": "擅於激勵他人，喜歡受人尊重，但討厭虛偽。" },
        { "type": 6, "q": "堅強自信、勇敢果斷，遇有問題就要立即解決，絕不拖泥帶水。" },
        { "type": 6, "q": "獨立、強硬，重視名譽財富，希望藉此鞏固權力。過於主觀，好辯、好戰。認為爭辯能加深彼此的了解。" },
        { "type": 6, "q": "坦率，有話直說，也會直斥人非，凡事要公平、公正。粗心大意，容易衝動，脾氣大，也不懂溫柔，但在家人面前會變得和善。" },
        { "type": 6, "q": "擅於領導和授權，喜歡控制大局，別人會認為我專橫霸道。強權主義者，相信適者生存，有着雄心壯志和百折不撓的精神。" },
        { "type": 6, "q": "真誠，重情義，鋤強扶弱，並會保護家人及下屬。熱心助人，但只會依自己的方式去幫助別人，忽略他人感受和意願。" },

        { "type": 7, "q": "坦率、直接、自信。逃避負面情緒，可以很快從失敗中復原。" },
        { "type": 7, "q": "追求玩樂及美食等生活享受，熱愛自由，最怕受束縛。怕無聊沉悶的生活，每天的工作和娛樂都要安排得滿滿的。" },
        { "type": 7, "q": "有時會很任性，想做就做，以滿足自己的慾望為先。自戀，難以接受別人批評。經常會直抒己見，而忽視他人感受。" },
        { "type": 7, "q": "精於計劃，但行動力弱，計劃經常半途而廢。缺乏耐性，討厭處理繁瑣工作，別人覺得我沒有責任感。" },
        { "type": 7, "q": "經常活力充沛，最愛刺激冒險，凡事都勇於嘗試。熱情、活潑和幽默的個性，令我很得人喜歡，尤其在派對中，更是眾人的開心果。" },
        { "type": 7, "q": "聰明、有創意，興趣廣泛，話題多多，可算是多才多藝。樂觀、開朗、自我，愛聊天，朋友眾多。愛逗人開心和逗自己開心。" },

        { "type": 8, "q": "愛好大自然，追求自己閒靜，不會作冒險的活動。為人被動，別人推一下、我才動一下。被朋友認為反應慢。"},
        { "type": 8, "q": "誠實、客觀，情緒平和。能予人放鬆的感覺，是絕佳的聆聽者。性格隨和友善，對朋友包容、遷就，並容易適應環境。"},
        { "type": 8, "q": "對自己和別人都不會高要求，也不愛命令人，如別人命令我，我會很反感。"},
        { "type": 8, "q": "拙於做決定，處事優柔寡斷。遇有問題時會拖延或逃避。行動力弱，處事拖泥帶水，沒甚麼拼勁，人家認為我做事馬虎、懶散。"},
        { "type": 8, "q": "樂觀、知足，凡事隨遇而安。但面對壓迫時會變得憤怒、倔強。經常因遷就別人而忽視自己需要。抑壓負面情緒，但卻會不自覺地表現出憤怒。"},
        { "type": 8, "q": "喜歡依從自己習慣的模式、追求寫意生活，不願有太大的改變。"}
    ]
};
