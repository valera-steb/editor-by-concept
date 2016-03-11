/**
 * Created by steb on 10.03.2016.
 */
define(['./dynamicBrunch'], function (dynamicBrunch) {
    var _ = {};

    _.extractLastLine = function (table) {
        var last = table[table.length - 1];
        return last.slice(0, last.length);
    };


    _.isArray = function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };

    _.isLink = function (item) {
        return item && item.type == 'link';
    };
    _.isLinkTo = function (item, id) {
        return _.isLink(item) && item.to == id;
    };

    _.isBrunch = function (item) {
        return item && item.type == 'brunch'
    };
    _.isDefinedBrunch = function (item) {
        return _.isBrunch(item) && item.to && !_.isArray(item.to);
    };
    _.isBrunchTo = function (item, num) {
        if (!_.isBrunch(item))
            return false;

        function equalToNum(x) {
            return x == num;
        }

        return _.isArray(item.to)
            ? item.to.some(equalToNum)
            : item.to == num;
    };
    _.isSameBrunch = function (a, b) {
        return a && b && dynamicBrunch.isSame(a, b);
    };

    return _;
});
