/**
 * Created by steb on 10.03.2016.
 */
define(['c/predActionSelector'], function (PredActionSelector) {

    describe('PredActionSelector', function () {

        var selectPredAction;

        beforeEach(function () {
            selectPredAction = new PredActionSelector();
        });


        it('sould be', function () {
            expect(PredActionSelector).toBeDefined();

            var
                publicFactors = ["hasSuchBrunchItem", "hasSuchLinkItem", "hasNoSuchRef"].sort(),
                factors = Object.keys(PredActionSelector.facts).sort();

            expect(factors).toEqual(publicFactors);
        });


        describe('hasNoSuchRef factor', function () {

            it('выявлять при пустой таблице - первое добавление', function () {
                var found = selectPredAction(undefined, []);

                expect(found.position).toBe(0);
                expect(found.key()).toBe(PredActionSelector.facts.hasNoSuchRef());
            });


            it('выявлять при заполненной таблице - случай с висячей вершиной', function () {
                var found = selectPredAction(3, [12, {type: 'link', to: 2}]);

                expect(found.position).toBe(2);
                expect(found.key()).toBe(PredActionSelector.facts.hasNoSuchRef());
            });

        });


        describe('hasSuchLinkItem - со списком линков', function () {

            it('выявлять один линк', function () {
                var found = selectPredAction(2, [12, {type: 'link', to: 2}]);

                expect(found.position).toBe(1);
                expect(found.params).toBeUndefined();
                expect(found.key()).toBe(PredActionSelector.facts.hasSuchLinkItem());
            });


            it('выявлять несколько линков - когда идёт сбор с нескольких ветвей', function () {
                var found = selectPredAction(2, [
                    12,
                    {type: 'link', to: 2}, {type: 'link', to: 3},
                    {type: 'link', to: 2}, {type: 'brunch', to: 7}
                ]);

                expect(found.position).toBe(1);
                expect(found.params).toEqual([3]);
                expect(found.key()).toBe(PredActionSelector.facts.hasSuchLinkItem());
            });

        });


        describe('hasSuchBrunchItem', function(){

            it('выявлять один определённый бранч', function () {
                var found = selectPredAction(2, [12, {type: 'brunch', to: 2}, {type: 'link', to: 2}]);

                expect(found.position).toBe(1);
                expect(found.params).toBeUndefined();
                expect(found.key()).toBe(PredActionSelector.facts.hasSuchBrunchItem());
            });


            it('выявлять один динамический бранч - при этом резолвить самый первый из динамических', function () {
                var found = selectPredAction(2, [12, {type: 'brunch', to: [4, 2]}, {type: 'link', to: 2}]);

                expect(found.position).toBe(1);
                expect(found.params).toBeUndefined();
                expect(found.key()).toBe(PredActionSelector.facts.hasSuchBrunchItem());
            });


            it('выявлять несколько разнотипных бранчей - появляеться, ' +
                'когда с верху несколько точек разветвились', function () {
                var found = selectPredAction(2, [
                    12,
                    {type: 'brunch', to: [4, 2]}, {type: 'link', to: 2},
                    {type: 'brunch', to: 2}, {type: 'link', to: 2}
                ]);

                expect(found.position).toBe(1);
                expect(found.params).toEqual([3]);
                expect(found.key()).toBe(PredActionSelector.facts.hasSuchBrunchItem());
            });

        });


        describe('приоритет проверки/нахождения факторов', function () {

            xit('в начале искать ветку');

            xit('потом искать линт');

            xit('и если нет - hasNoSuchRef');
        })
    });

});