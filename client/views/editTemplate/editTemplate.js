
Session.set('unsave', false);
Session.set('coverImageDownloadable', false);


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
    },
    "coverImageDownloadable": function(){
        if(!Session.get('coverImageDownloadable'))
            return false;
        else
            return !Session.set('unsave');
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
                        Bert.alert('儲存成功', 'success', 'growl-top-right');
                    });
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

    DrawCoverCanvas(function(){
        Session.set('coverImageDownloadable', true);
    });

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