
Session.set('unsave', false);
Session.set('coverImageDownloadable', false);

Tracker.autorun(function(){
    var templateData = TemplateData.findOne({ user: Meteor.userId() });
    $('.editable').removeClass('notEmpty');
    _.each(templateData, function(data, index){
        if(typeof(data) === 'string'){
            if(data && data.replace(/<\/?[^>]+(>|$)/g, "").length)
                $('.editable[data-modal-key=' + index +']').html(data).addClass('notEmpty');
            else
                $('.editable[data-modal-key=' + index +']').html('');
        }
    });
});

Template.editTemplate.helpers({
    "isDocumentSaveable": function(){
        return Session.get('isDocumentSaveable');
    },
    "saveOrPreview": function(){
        return (Session.get('unsave')) ? "儲存" : "預覽";
    },
    "coverImageDownloadable": function(){
        if(!Session.get('coverImageDownloadable'))
            return false;
        else
            return !Session.get('unsave');
    }
});
Template.editTemplate.events({
    'keyup .editable': function(event){
        $target = $(event.currentTarget);
        var text = $target.html().replace(/<\/?[^>]+(>|$)/g, "");
        if(text.length > 0)
            $target.addClass('notEmpty');
        else 
            $target.removeClass('notEmpty');
    },
    'click .shareFacebook': function(event){
        href = $(event.currentTarget).data('href');
        FB.ui({
            method: 'share',
            caption: '即刻登入：http://ageasinternship.com/',
            description: '想知道更多關於 「星級財策領袖實習計劃2015」嘅精彩詳情',
            picture: Meteor.settings['public'].ROOT_URL + '/images/fb-share-200x200.png',
            href: Meteor.settings['public'].ROOT_URL + '/preview-template/' + Meteor.userId() + '#' + href,
        }, function(response){

        });
    },
    'click #coverDownloadCaller': function(){
        var newWindow = window.open('', '_blank');
            newWindow.document.write('Loading cover image...');
        Meteor.call('saveCoverImage', $('#downloadCoverCanvas')[0].toDataURL(), function(err, result){
            if(err){
                newWindow.close();
                Bert.alert(err.reason, 'danger');
                return false;
            } else {
                if(result){
                    var coverImage = CoverImages.findOne(result);
                    var imageLoadInterval = Meteor.setInterval(function(){
                        if(coverImage.url()){
                            Meteor.clearInterval(imageLoadInterval);
                            newWindow.location.href = coverImage.url();
                        }
                    }, 100);
                } else {
                    newWindow.close();
                }
            }
        });
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
                    Session.set('coverImageDownloadable', false);
                    DrawCoverCanvas(function(){
                        Session.set('unsave', false);
                        Bert.alert('儲存成功', 'success');
                    });
                } else {
                    Bert.alert(err.reason, 'danger');
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

    DrawCoverCanvas(function(){
        Session.set('coverImageDownloadable', true);
    });

    var templateData = TemplateData.findOne({ user: Meteor.userId() });
    _.each(templateData, function(data, index){
        if(typeof(data) === 'string'){
            if(data && data.replace(/<\/?[^>]+(>|$)/g, "").length)
                $('.editable[data-modal-key=' + index +']').html(data).addClass('notEmpty');
            else
                $('.editable[data-modal-key=' + index +']').html('');
        }
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
            $target.addClass('error');
        } else {
            $target.removeClass('error');
        }
        Session.set('unsave', true);
        Session.set('isDocumentSaveable', ($('.editable.error').length > 0) ? false : true);
	});

    Session.set('isDocumentSaveable', ($('.editable.error').length > 0) ? false : true);
    
});