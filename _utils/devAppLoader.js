$(function () {
    function loadScripts(files) {
        var st = $.Deferred();
        st.resolve();
        st = st.promise();
        $.map(files, function (file) {
            st = st.then(function () {
                return $.loadScript(file);
            }, function() {
                //console.log('faile ', arguments);
            });
        });

        //$.when.apply($, filesD)
        st.then(function () {
            angular.bootstrap(document, ['app']);
        });
    };

    $.get('_utils/appFiles.json', loadScripts);
});
