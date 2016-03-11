/**
 * Created by steb on 10.03.2016.
 */
define(['./globalStereotypes'], function (globalSt) {
    var resultWrappers;

    function PredActionSelector() {

        var stereotypes = {

                hasSuchBrunchItem: function (line, num) {
                    var arr = [];

                    for (var i in line) {
                        if (globalSt.isBrunchTo(line[i], num))
                            arr.push(Number(i));
                    }

                    return ou.wrapTestArray(arr);
                },

                hasSuchLinkItem: function (line, num) {
                    var arr = [];

                    for (var i in line) {
                        if (globalSt.isLinkTo(line[i], num))
                            arr.push(Number(i));
                    }

                    return ou.wrapTestArray(arr);
                },

                hasNoSuchRef: function (line) {
                    return ou.wrapTest(line.length);
                },


                hasData: function (x) {
                    return x && x.position > -1;
                }
            },
            ou = {
                wrapTest: function (position, params) {
                    return {
                        position: position,
                        params: params
                    }
                },

                wrapTestArray: function (arr) {
                    var last = arr.length &&  arr.slice(1, arr.length);

                    return arr.length
                        ? ou.wrapTest(arr[0], last.length ? last : undefined)
                        : ou.wrapTest(-1);
                }
            };


        return function (item, lastLine) {

            var
                factsToCheck = ["hasSuchBrunchItem", "hasSuchLinkItem", "hasNoSuchRef"];


            for (var i in factsToCheck) {
                var fact = factsToCheck[i],
                    test = stereotypes[fact](lastLine, item);

                if (stereotypes.hasData(test))
                    return resultWrappers[fact](test);
            }
        };
    };

    function lit(x) {
        return function () {
            return Math.pow(2, x);
        }
    };

    PredActionSelector.facts = {
        hasSuchLinkItem: lit(1),
        hasSuchBrunchItem: lit(2),
        hasNoSuchRef: lit(3) // аналог если с верху ещё пусто
    };

    resultWrappers = (function () {
        var ret = {};

        function wrap(key) {
            return function make(test) {
                return {
                    key: key,
                    position: test.position,
                    params: test.params
                }
            }
        }

        for (var i in PredActionSelector.facts)
            ret[i] = wrap(PredActionSelector.facts[i]);

        return ret;
    })();

    return PredActionSelector;
});
