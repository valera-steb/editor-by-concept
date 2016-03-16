/**
 * Created by steb on 11.03.2016.
 */
define([
    'c/converter', 'c/utils',
    './testDatas',
    './decoders/graphDecoder', './decoders/resultDecoder'], function (convert, utils, datas, graphDecoder, resultDecoder) {


    describe('converter', function () {

        ['t01', 't03'].forEach(function(i){

            it(datas[i].s+ ' -> '+ datas[i].r, function () {
                var table = convert(
                    graphDecoder(datas[i].s)
                );

                expect(table).toEqual(
                    resultDecoder(datas[i].r)
                );
            });

        });


    });
});
