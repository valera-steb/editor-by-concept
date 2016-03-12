/**
 * Created on 02.03.2016.
 */
define([
    './globalStereotypes',
    './predActionSelector'], function (stereotypes, PredActionSelector) {

    var selectPredAction = new PredActionSelector();

    var ou = {
        replaceLinksToCuts: function (line, positions, name) {
            if (!positions || !positions.length)
                return;

            positions.forEach(function(i){
                line.splice(i, 1, {
                    type: 'cut',
                    to: name
                });
            });
        }
    };

    function execute(d) {
        var table = [[]];

        d.forEach(function (level) {
            var lastLine = stereotypes.extractLastLine(table),
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

        return table.slice(1, table.length);
    };

    return execute;
});