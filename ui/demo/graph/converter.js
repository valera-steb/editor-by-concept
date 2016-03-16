/**
 * Created on 02.03.2016.
 */
define([
    './globalStereotypes',
    './predActionSelector',
    './dynamicBrunch'], function (stereotypes, PredActionSelector, DynamicBrunch) {

    var selectPredAction = new PredActionSelector();

    var st = {
        isBrunchResolution: function (y, lastLine) {
            var db = lastLine[y.position];

            var x = y.params.reduce(function (s, i) {
                if (stereotypes.isSameBrunch(db, lastLine[i]))
                    s++;
                return s;

            }, 0);


            return x == 1 ? db : null;
        }
    };

    var ou = {
        replaceLinksToCuts: function (line, positions, name) {
            if (!positions || !positions.length)
                return;

            positions.forEach(function (i) {
                line.splice(i, 1, {
                    type: 'cut',
                    to: name
                });
            });
        },

        buildBrunchesOrLink: function (to) {

            if (to.length == 1) return [{
                type: 'link',
                to: to[0]
            }];


            var
                db = new DynamicBrunch(to);

            return to.map(function () {
                return db;
            });
        },

        insertOuts: function (to, brunches, position) {
            // хитрый вызов to.splice(position, 1, brunches)
            var
                items = brunches.reverse();

            items.push(1);
            items.push(position);

            Array.prototype.splice.apply(to, items.reverse());
        }
    };

    var concept = {
        processLevel: function (table, level) {
            var
                lastLine = stereotypes.extractLastLine(table),
                y = selectPredAction(level.name, lastLine);

            with (PredActionSelector.facts) switch (y.key()) {
                case (hasNoSuchRef()):
                    lastLine.push(level.name);
                    table.push(lastLine);
                    break;

                case(hasSuchLinkItem()):
                    lastLine.splice(y.position, 1, level.name);
                    ou.replaceLinksToCuts(lastLine, y.params, level.name);
                    table.push(lastLine);
                    break;

                case(hasSuchBrunchItem()):
                    if (st.isBrunchResolution(y, lastLine))
                        concept.resolveBrunch(table, level, y);

                    return concept.processLevel(table, level);
                //lastLine.splice(y.position, 1, level.name);
                //table.push(lastLine);
                //break;

                default:
                    throw new Error(JSON.stringify({l: lastLine, y: y}));
            }

            if (level.outs) {
                var next = lastLine.slice(0, lastLine.length);

                var items = ou.buildBrunchesOrLink(level.outs);
                ou.insertOuts(next, items, y.position);

                table.push(next);
            }
        },

        resolveBrunch: function (table, name, y) {
            table.push([
                {type: 'link', to: 2},
                {type: 'link', to: 3}
            ]);
        }
    };

    function execute(d) {
        var table = [[]];

        d.forEach(function (level) {
            concept.processLevel(table, level);
        });

        return table.slice(1, table.length);
    };

    return execute;
});