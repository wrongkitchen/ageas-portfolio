
Session.set('unsave', false);
Tracker.autorun(function(){
    var templateData = TemplateData.findOne({ user: Meteor.userId() });
    _.each(TemplateDefauleText, function(data, index){
        if(templateData && templateData[index])
            $('.editable[data-modal-key=' + index +']').html(templateData[index]);
        else 
            $('.editable[data-modal-key=' + index +']').html(data);
    });
});

Template.editTemplate.helpers({
    "saveOrPreview": function(){
        return (Session.get('unsave')) ? "儲存" : "預覽";
    }
});
Template.editTemplate.events({
    'click .shareFacebook': function(event){
        href = $(event.currentTarget).data('href');
        FB.ui({
            method: 'share',
            href: 'http://103.253.146.233/preview-template/' + Meteor.userId() + '#' + href,
        }, function(response){

        });
    },
    'click #coverDownloadCaller': function(){
        var userData = TemplateData.findOne({ user: Meteor.userId() });
        var coverImage = Images.findOne(userData.coverTemplateBg);
        var coverImageUrl = (coverImage) ? coverImage.url() : '/images/demo/cover-image-1.jpg';
        var img = new Image();
            img.onload = function() {
                // console.log(this.width);
                // console.log(this.height);
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
                    text: (userData.coverKeywords || TemplateDefauleText.coverKeywords).replace(/<\/?[^>]+(>|$)/g, ""),
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
                    text: (userData.coverTitle || TemplateDefauleText.coverTitle).replace(/<\/?[^>]+(>|$)/g, ""),
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
                    text: (userData.coverSubTitle1 || TemplateDefauleText.coverSubTitle1).replace(/<\/?[^>]+(>|$)/g, ""),
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
                    text: (userData.coverSubTitle2 || TemplateDefauleText.coverSubTitle2).replace(/<\/?[^>]+(>|$)/g, ""),
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
                    text: (userData.coverSubTitle3 || TemplateDefauleText.coverSubTitle3).replace(/<\/?[^>]+(>|$)/g, ""),
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
                    text: (userData.coverFooterText || TemplateDefauleText.coverFooterText).replace(/<\/?[^>]+(>|$)/g, ""),
                    fromCenter: false
                })
                .drawText({
                    fillStyle: '#ffffff',
                    x: 1165, y: 650,
                    fontStyle: 'bold',
                    maxWidth: 258,
                    fontSize: '36px',
                    fontFamily: 'Source Sans Pro, MHei, Helvetica, Arial, sans-serif',
                    text: (userData.coverCircle || TemplateDefauleText.coverCircle).replace(/<\/?[^>]+(>|$)/g, ""),
                    fromCenter: false
                });
                function OpenInNewTab(url) {
                    var win = window.open(url, '_blank');
                    win.focus();
                }
                var imgData = $('#downloadCoverCanvas').getCanvasImage('jpeg');
                OpenInNewTab(imgData);
            }
            img.src = coverImageUrl;
    },
    'click .tabButton': function(event){
        var href = $(event.currentTarget).attr('href');
        if(href === '#speech'){
            Session.set('isPhotoUploadPopup', '.speechTemplate');
        } else {
            Session.set('isPhotoUploadPopup', false);
        }
    },
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

    Session.set('isPhotoUploadPopup', false);

    var templateData = TemplateData.findOne({ user: Meteor.userId() });
    _.each(TemplateDefauleText, function(data, index){
        if(templateData && templateData[index])
            $('.editable[data-modal-key=' + index +']').html(templateData[index]);
        else
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