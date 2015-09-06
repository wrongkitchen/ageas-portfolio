Template.previewTemplate.onRendered(function(){
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
});