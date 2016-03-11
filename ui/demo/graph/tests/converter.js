/**
 * Created by steb on 11.03.2016.
 */
define(['c/converter', 'c/utils'], function (convert, utils) {
    var datas = {
        t01: [
            {
                name: 1,
                outs: [2, 3]
            },
            {
                name: 2,
                outs: [3]
            },
            {name: 3}
        ]
    };

    var results = {
        t01: [
            [1],
            [{"type": "link", "to": 2}, {"type": "link", "to": 3}],
            [2, {"type": "link", "to": 3}],
            [{"type": "link", "to": 3}, {"type": "link", "to": 3}],
            [3, {"type": "link", "to": 3}]
        ]
    };


    describe('converter', function () {

        it(utils.incomingGraphToS(datas.t01) + ' to ' + utils.resultTableToS(results.t01), function () {
            var table = convert(datas.t01);

            expect(table).toEqual(results.t01);
        });

    });
});
