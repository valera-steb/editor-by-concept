/**
 * Created by steb on 10.03.2016.
 */
define([], function () {

    var
        marks = new window.WeakMap(),
        id = 0;

    function DynamicBrunch(outs) {
        this.type = 'brunch';
        this.to = outs;

        id++;
        marks.set(this, id);
    }

    DynamicBrunch.isSame = function(a, b){
        return marks.has(a) && marks.has(b) && marks.get(a) === marks.get(b);
    };

    return DynamicBrunch;
});