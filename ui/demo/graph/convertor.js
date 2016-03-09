/**
 * Created on 02.03.2016.
 */
var data = [
    {
        name: 1,
        outs: [2, 3]
    },
    {
        name: 2,
        outs: [3]
    },
    {name: 3}
];

var table = [[]];


function execute(d) {
    d.forEach(function (level) {
        console.log(level);
        var lastLine = stereotypes.extractLastLine(table),
            y = selectPredAction.execute(level.name, lastLine);

        with (selectPredAction.facts) switch (y.key()) {
            case (hasNoSuchRef()):
                lastLine.push(level.name);
                table.push(lastLine);
                break;

            case(hasSuchLinkItem()):
                lastLine.splice(y.position, 1, level.name);
                table.push(lastLine);
                break;

            case(hasSuchBrunchItem()):
            //lastLine.splice(y.position, 1, level.name);
            //table.push(lastLine);
            //break;

            default:
                throw new Error();
        }

        if (level.outs) {
            var next = lastLine.slice(0, lastLine.length);

            var items = level.outs.map(function (x) {
                return {
                    type: 'link',
                    to: x
                };
            });
            items = items.reverse();
            items.push(1);
            items.push(y.position);
            Array.prototype.splice.apply(next, items.reverse());

            table.push(next);
        }
    });
}

var stereotypes = new (function () {
    var _ = this;

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

        if (_.isArray(item.to))
            return item.to.some(function (x) {
                return x == num
            });

        return item.to == num;
    };
})();

var selectPredAction = (function (globalSt) {

    function lit(x) {
        return function () {
            return Math.pow(2, x);
        }
    }

    var _ = {
        facts: {
            hasSuchLinkItem: lit(1),
            hasSuchBrunchItem: lit(2),
            hasNoSuchRef: lit(3) // аналог если с верху ещё пусто
        }
    };

    var results = (function () {
        var ret = {};

        function wrap(key) {
            return function (position) {
                return {
                    key: key,
                    position: position
                }
            }
        }

        for (var i in _.facts)
            ret[i] = wrap(_.facts[i]);

        return ret;
    })();


    var stereotypes = {

        hasSuchBrunchItem: function (line, num) {
            for (var i in line) {
                if (globalSt.isBrunchTo(line[i], num))
                    return i;
            }

            return -1;
        },

        hasSuchLinkItem: function (line, num) {
            for (var i in line) {
                if (globalSt.isLinkTo(line[i], num))
                    return i;
            }

            return -1;
        },

        hasNoSuchRef: function (line) {
            return line.length;
        }
    };


    _.execute = function (item, lastLine) {

        var
            factsToCheck = ["hasSuchBrunchItem", "hasSuchLinkItem", "hasNoSuchRef"];


        for (var i in factsToCheck) {
            var fact = factsToCheck[i],
                position = stereotypes[fact](lastLine, item);

            if (position > -1)
                return results[fact](position);
        }
    };

    return _;
})(stereotypes);


var predActions = {
    2: function () { //hasSuchLinkItem

    },
    8: function () {

    }
};


var tests = {
    predAction_noRef1: function () {
        var x = selectPredAction.execute(undefined, []);
        console.log(x.position, x.key());
    },
    predAction_noRef2: function () {
        var x = selectPredAction.execute(3, [12, {type: 'link', to: 2}]);
        console.log(x.position, x.key());
    },

    predAction_linkTo: function () {
        var x = selectPredAction.execute(2, [12, {type: 'link', to: 2}]);
        console.log(x.position, x.key());
    },

    predAction_brunchTo: function () {
        var x = selectPredAction.execute(2, [12, {type: 'brunch', to: 2}, {type: 'link', to: 2}]);
        console.log(x.position, x.key());
    },
    predAction_brunchToUndeterminate: function () {
        var x = selectPredAction.execute(2, [12, {type: 'brunch', to: [4, 2]}, {type: 'link', to: 2}]);
        console.log(x.position, x.key());
    }
};


var z = [
    [],
    [1],
    [{"type": "link", "to": 2}, {"type": "link", "to": 3}],
    [2, {"type": "link", "to": 3}],
    [{"type": "link", "to": 3}, {"type": "link", "to": 3}],
    [3, {"type": "link", "to": 3}]
];

