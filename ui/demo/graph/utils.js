/**
 * Created by steb on 11.03.2016.
 */
define(['./globalStereotypes'], function (globalSt) {
    var _ = {};

    _.resultTableItemToS = function (i) {
        if (!i.type)
            return i;

        switch (i.type){
            case 'brunch':
                return 'b('+ JSON.stringify(i.to) + ')';
            case 'link':
                return 'l('+ JSON.stringify(i.to) + ')';
            default:
                return '!error!';
        }
    };

    _.resultTableToS = function (t) {
        var is = t.map(function(r){
            return r.map(_.resultTableItemToS).join(',');
        });
        return '[' + is.join('| ') + ']';
    };


    _.incomingGraphItemToS = function (i) {
        return i.name + (i.outs ? '-' + i.outs.join(',') : '');
    };

    _.incomingGraphToS = function (t) {
        var is = t.map(_.incomingGraphItemToS);
        return '[' + is.join('| ') + ']';
    };


    return _;
});