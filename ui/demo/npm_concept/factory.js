/**
 * Created on 05.01.2016.
 */
angular.module('eDemo').factory('npmConceptFactory', function () {
    var npmConceptFactory = {};


    npmConceptFactory.clipboardController = function ($scope) {
        var
            m = {
                weHaveDataToCopy: function () {

                }
            },
            f = {

                validateClipboard: function () {

                },

                subscribeToBeforeEvents: function () {
                    document.addEventListener('beforecopy', function (e) {
                        if (m.weHaveDataToCopy()) { // use your web app's internal logic to determine if something can be copied
                            e.preventDefault(); // enable copy UI and events
                        }
                        console.log(e);
                    });
                    document.addEventListener('beforecut', function (e) {
                        console.log(e);
                    });
                    document.addEventListener('beforepaste', function (e) {
                        console.log(e);
                    });

                    return f;
                },

                subscribeToClipboardEvents: function () {

                    document.addEventListener('paste', function (e) {
                        console.log(e);
                    });

                    document.addEventListener('copy', function (e) {
                        console.log(e);

                        e.clipboardData.setData('text/plain', 'Hello, world!');
                        e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
                        e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
                    });

                    document.addEventListener('cut', function (e) {
                        console.log(e);

                        e.clipboardData.setData('text/plain', JSON.stringify({x: 10, y: 20}));
                        //e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
                        e.clipboardData.setData('application/json', JSON.stringify({x: 10, y: 20}));
                        e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
                    });
                }
            };


        f
            .subscribeToBeforeEvents()
            .subscribeToClipboardEvents();

        return {}
    };

    return npmConceptFactory;
});