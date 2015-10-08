
Session.set('unsave', false);
Session.set('coverImageDownloadable', false);

Tracker.autorun(function(){
    var templateData = TemplateData.findOne({ user: Meteor.userId() });
    _.each(TemplateDefauleText, function(data, index){
        if(templateData && templateData[index] && templateData[index].replace(/<\/?[^>]+(>|$)/g, ""))
            $('.editable[data-modal-key=' + index +']').html(templateData[index]);
        else 
            $('.editable[data-modal-key=' + index +']').html(data);
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
    'click .editable': function(event){
        if($(event.currentTarget).children('.transparent').length)
            $(event.currentTarget).children('.transparent').remove();
    },
    'click .shareFacebook': function(event){
        href = $(event.currentTarget).data('href');
        FB.ui({
            method: 'share',
            href: Meteor.settings['public'].ROOT_URL + '/preview-template/' + Meteor.userId() + '#' + href,
        }, function(response){

        });
    },
    'click #coverDownloadCaller': function(){
        $('#downloadCoverCanvas')[0].toBlob(function(blob){
            saveAs(blob, 'cover.png');
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
    _.each(TemplateDefauleText, function(data, index){
        if(templateData && templateData[index] && templateData[index].replace(/<\/?[^>]+(>|$)/g, "")){
            $('.editable[data-modal-key=' + index +']').html(templateData[index]);
            $('.adminEditable[data-modal-key=' + index +']').html(templateData[index]);
        } else {
            $('.editable[data-modal-key=' + index +']').html(data);
            $('.adminEditable[data-modal-key=' + index +']').html(data);
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