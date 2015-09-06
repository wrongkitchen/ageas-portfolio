
Session.set('unsave', false);

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
    
    $('[data-toggle="tooltip"]').tooltip()

	var medium = new MediumEditor('.editable', {
        mode: MediumEditor.richMode,
        attributes: null,
        tags: null,
        toolbar: false
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