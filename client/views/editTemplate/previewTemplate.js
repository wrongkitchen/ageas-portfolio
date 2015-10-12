var previewID = '';

Template.previewTemplate.onRendered(function(){

    previewID = (this.data && this.data.previewUserId) ? this.data.previewUserId : Meteor.userId();

    Deps.autorun(function (){
        var hash =  Session.get('hash');
        if (hash) {
            var offset = $('a[name="'+ hash +'"]').offset();
            if (offset){
                $('html, body').animate({scrollTop: offset.top},400);
            }
        }
        Session.set('hash', '');
    });
    
    var templateData = TemplateData.findOne({ user: Meteor.userId() });
    _.each(templateData, function(data, index){
        if(data && data.replace(/<\/?[^>]+(>|$)/g, "").length)
            $('.editable[data-modal-key=' + index +']').html(data).addClass('notEmpty');
        else
            $('.editable[data-modal-key=' + index +']').html('');
    });
});

Tracker.autorun(function(){
    var templateData = TemplateData.findOne({ user: Meteor.userId() });
    $('.editable').removeClass('notEmpty');
    _.each(templateData, function(data, index){
        if(data && data.replace(/<\/?[^>]+(>|$)/g, "").length)
            $('.editable[data-modal-key=' + index +']').html(data).addClass('notEmpty');
        else
            $('.editable[data-modal-key=' + index +']').html('');
    });
});