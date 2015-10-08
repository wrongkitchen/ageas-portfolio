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
    var templateData = TemplateData.findOne({ user: previewID });
    _.each(TemplateDefauleText, function(data, index){
        if(templateData && templateData[index]){
            $('.editable[data-modal-key=' + index +']').html(templateData[index]);
            $('.adminEditable[data-modal-key=' + index +']').html(templateData[index]);
        } else {
            $('.editable[data-modal-key=' + index +']').html(data);
            $('.adminEditable[data-modal-key=' + index +']').html(data);
        }
    });
});

Tracker.autorun(function(){
    var templateData = TemplateData.findOne({ user: previewID });
    _.each(TemplateDefauleText, function(data, index){
        if(templateData && templateData[index])
            $('.editable[data-modal-key=' + index +']').html(templateData[index]);
        else 
            $('.editable[data-modal-key=' + index +']').html(data);
    });
});