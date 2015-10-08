window.fbAsyncInit = function() {
	FB.init({
		appId      : '891317910955142',
		status     : true,
		xfbml      : true
	});
};

Template.photoUpOverride.replaces("photoUp");

Template.photoUpImagePreviewOverride.replaces("photoUpImagePreview");

DrawCoverCanvas = function(pCallback){
		var userData = TemplateData.findOne({ user: Meteor.userId() });
		var coverImage = (userData && userData.coverTemplateBg && userData.coverTemplateBg) ? Images.findOne(userData.coverTemplateBg) : null;
		var coverImageUrl = (coverImage) ? coverImage.url() : '/images/demo/cover-image-1.jpg';
		var img = new Image();
			img.onload = function() {
					$("#downloadCoverCanvas").clearCanvas()
					$('#downloadCoverCanvas').drawRect({
							fillStyle: '#d9d9d9',
							x: (1920 / 2), y: (975 / 2),
							width: 1920,
							height: 975
					})
					.drawImage({
							source: coverImageUrl,
							x: (1920 / 2), y: (975 / 2)
					})
					.drawImage({
							source: '/images/cover-circle.png',
							x: 1138, y: 570,
							fromCenter: false
					})
					.drawText({
							fillStyle: '#FFF',
							fontStyle: 'bold',
							x: 491, y: 41,
							fontSize: '10.5pt',
							fontFamily: 'Times New Roman, Times, serif',
							text: ((userData && userData.coverKeywords && userData.coverKeywords.replace(/<\/?[^>]+(>|$)/g, "")) ? userData.coverKeywords.replace(/&nbsp;/gi,'').replace(/<\/p>/g, '</p>\n') : TemplateDefauleText.coverKeywords).replace(/<\/?[^>]+(>|$)/g, ""),
							fromCenter: false
					})
					.drawText({
							fillStyle: '#FFF',
							fontStyle: 'bold',
							x: 491, y: 108,
							maxWidth:658,
							align: 'left',
							fontSize: '90px',
							fontFamily: 'Times New Roman, Times, serif',
							text: ((userData && userData.coverTitle && userData.coverTitle.replace(/<\/?[^>]+(>|$)/g, "")) ? userData.coverTitle.replace(/&nbsp;/gi,'').replace(/<\/p>/g, '</p>\n') : TemplateDefauleText.coverTitle).replace(/<\/?[^>]+(>|$)/g, ""),

							fromCenter: false
					})
					.drawText({
							fillStyle: '#996699',
							x: 491, y: 506,
							fontStyle: 'bold',
							maxWidth: 608,
							align: 'left',
							fontSize: '50px',
							fontFamily: 'Source Sans Pro, MHei, Helvetica, Arial, sans-serif',
							text: ((userData && userData.coverSubTitle1 && userData.coverSubTitle1.replace(/<\/?[^>]+(>|$)/g, "")) ? userData.coverSubTitle1.replace(/&nbsp;/gi,'').replace(/<\/p>/g, '</p>\n') : TemplateDefauleText.coverSubTitle1).replace(/<\/?[^>]+(>|$)/g, ""),

							fromCenter: false
					})
					.drawText({
							fillStyle: '#cc3366',
							x: 491, y: 665,
							fontStyle: 'bold',
							maxWidth: 608,
							align: 'left',
							fontSize: '30px',
							fontFamily: 'Source Sans Pro, MHei, Helvetica, Arial, sans-serif',
							text: ((userData && userData.coverSubTitle2 && userData.coverSubTitle2.replace(/<\/?[^>]+(>|$)/g, "")) ? userData.coverSubTitle2.replace(/&nbsp;/gi,'').replace(/<\/p>/g, '</p>\n') : TemplateDefauleText.coverSubTitle2).replace(/<\/?[^>]+(>|$)/g, ""),

							fromCenter: false
					})
					.drawText({
							fillStyle: '#ff9933',
							x: 491, y: 745,
							fontStyle: 'bold',
							maxWidth: 608,
							align: 'left',
							fontSize: '35px',
							fontFamily: 'Source Sans Pro, MHei, Helvetica, Arial, sans-serif',
							text: ((userData && userData.coverSubTitle3 && userData.coverSubTitle3.replace(/<\/?[^>]+(>|$)/g, "")) ? userData.coverSubTitle3.replace(/&nbsp;/gi,'').replace(/<\/p>/g, '</p>\n') : TemplateDefauleText.coverSubTitle3).replace(/<\/?[^>]+(>|$)/g, ""),

							fromCenter: false
					})
					.drawText({
							fillStyle: '#ffffff',
							x: 491, y: 885,
							fontStyle: 'bold',
							maxWidth: 608,
							align: 'left',
							fontSize: '14px',
							fontFamily: 'Source Sans Pro, MHei, Helvetica, Arial, sans-serif',
							text: ((userData && userData.coverFooterText && userData.coverFooterText.replace(/<\/?[^>]+(>|$)/g, "")) ? userData.coverFooterText.replace(/&nbsp;/gi,'').replace(/<\/p>/g, '</p>\n') : TemplateDefauleText.coverFooterText).replace(/<\/?[^>]+(>|$)/g, ""),

							fromCenter: false
					})
					.drawText({
							fillStyle: '#ffffff',
							x: 1165, y: 650,
							fontStyle: 'bold',
							maxWidth: 260,
							fontSize: '36px',
							respectAlign: true,
							fontFamily: 'Source Sans Pro, MHei, Helvetica, Arial, sans-serif',
							text: ((userData && userData.coverCircle && userData.coverCircle.replace(/<\/?[^>]+(>|$)/g, "")) ? userData.coverCircle.replace(/&nbsp;/gi,'').replace(/<\/p>/g, '</p>\n') : TemplateDefauleText.coverCircle).replace(/<\/?[^>]+(>|$)/g, ""),

							fromCenter: false
					});
					if(pCallback) pCallback();
			}
			img.src = coverImageUrl;
}
