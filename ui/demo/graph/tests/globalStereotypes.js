/**
 * Created by steb on 10.03.2016.
 */
define(['c/globalStereotypes', 'c/dynamicBrunch'],function(stereotypes, DynamicBrunch){

    describe('globalStereotypes', function(){
        it('has stereotypes', function(){
            expect(stereotypes).toBeDefined();
        });

        it('isSameBrunch', function(){
            var a = new DynamicBrunch([1]),
                b = new DynamicBrunch([1]);

            expect(stereotypes.isSameBrunch(a, a)).toBeTruthy();
            expect(stereotypes.isSameBrunch(a, b)).toBeFalsy();
        })
    });
});

