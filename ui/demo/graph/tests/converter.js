/**
 * Created by steb on 11.03.2016.
 */
define([
    'c/converter', 'c/utils',
    './testDatas',
    './decoders/graphDecoder', './decoders/resultDecoder'], function (convert, utils, datas, graphDecoder, resultDecoder) {


    describe('converter', function () {

        it(datas.t01.s+ ' -> '+ datas.t01.r, function () {
            var table = convert(
                graphDecoder(datas.t01.s)
            );

            expect(table).toEqual(
                resultDecoder(datas.t01.r)
                );
        });

    });
});
