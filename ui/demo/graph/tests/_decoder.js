/**
 * Created by steb on 11.03.2016.
 */
define(['c/dynamicBrunch'], function (DynamicBrunch) {

    var st = {
        hasDynamicBrunches: function (l) {
            var description = l.match(/ - .+?\]/);
            if (description == null)
                return null;

            var item,
                reg = /(.):\[(.+?)]/g,
                res = [];

            while ((item = reg.exec(description)) != null) {
                res.push({
                    name: item[1],
                    to: item[2]
                        .split(/,[^\d]+/)
                        .map(Number)
                });
            }

            return {
                line: l.match(/(.+?) -/)[1],
                brunches: res
            };
        },

        hasDynamicBrunchesKeys: function (d) {
            if (!d || !d.brunches)
                return undefined;

            return {
                data: d.brunches
                    .map(function (x) {
                        return x.name;
                    })
                    .join('')
            };
        },


        isVertex: function (cell) {
            return /^\d+$/.test(cell)
                ? Number(cell)
                : null;
        },

        isLine: function (cell) {
            var d = cell.toLowerCase().match(/l\((\d+)\)/);

            return d == null
                ? null
                : {"type": "link", "to": Number(d[1])}
        },

        isBrunch: function (cell) {
            var d = cell.toLowerCase().match(/b\((\d+)\)/);

            return d == null
                ? null
                : {"type": "brunch", "to": Number(d[1])}
        },

        isDynamicBrunch: function (cell, params) {
            if (!params || !params.xKeys)
                return null;

            var
                reg = new RegExp('b\\(([' + params.xKeys + '])\\)'),
                d = cell.toLowerCase().match(reg);

            return d == null
                ? null
                : params.dBrunches[d[1]];
        },

        isCut: function (cell) {
            var d = cell.toLowerCase().match(/c\((\d+)\)/);

            return d == null
                ? null
                : {"type": "cut", "to": Number(d[1])}
        },

        isError: function (i) {
            throw new Error(i);
        }
    };

    return function extract(d) {
        var
            items = d.split(/\| +/);

        return items.map(function (line) {
            var
                dBranches = st.hasDynamicBrunches(line),
                toTest = ['isVertex', 'isLine',
                    'isBrunch', 'isCut', 'isError'];

            if (dBranches) {
                toTest.splice(0, 0, 'isDynamicBrunch');
                line = dBranches.line;
            }


            return line
                .split(/, +/)
                .map(buildCellExtractor(toTest, dBranches));
        });
    };


    function buildCellExtractor(factorsToTest, db) {
        var params = {};

        addDynamicBrunchesData(db, params);

        return function (cell) {
            for (var i in factorsToTest) {
                var factor = factorsToTest[i],
                    test = st[factor](cell, params);

                if (test != null)
                    return test;
            }
        }
    }


    function addDynamicBrunchesData(s, params) {
        var hasKeys = st.hasDynamicBrunchesKeys(s);

        if (!hasKeys)
            return;

        params.xKeys = hasKeys.data;
        params.dBrunches = {};

        for (var i in s.brunches) {
            var b = s.brunches[i];
            params.dBrunches[b.name] = new DynamicBrunch(b.to)
        }
    }

});
