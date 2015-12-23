/**
 * Created on 23.12.2015.
 */
angular.module('draggable').factory('draggableElementFactory', ['$document', function ($document) {
    var draggableElementFactory = {},
        fStub = function () {
        };

    function makeStubbing(obj, keys) {
        if (!obj)
            throw new Error('Must pass obj to stub');

        angular.forEach(keys, function (key) {
            if (!obj[key])
                obj[key] = fStub;
        });
    }


    draggableElementFactory.MoveController = function (callbacks) {
        var
            startX = 0, startY = 0, x = 0, y = 0, state = 'inactive';

        makeStubbing(callbacks, ['onStartMove', 'onMoving', 'onDrop']);

        function clearState(){
            state = 'inactive';

            x = 0;
            y = 0;
        }

        function isMoving(event, params) {
            if (state == 'moving')
                return true;

            if (params.length < 5)
                return false;

            state = 'moving';
            callbacks.onStartMove(event, params);
            return false;
        }


        function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;

            var params = {
                length: Math.sqrt(x * x + y * y),
                y: y,
                x: x
            };

            if (isMoving(event, params))
                callbacks.onMoving(event, params);
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);

            clearState();

            callbacks.onDrop();
        }


        return {
            onMouseDown: function (event) {
                event.preventDefault();

                startX = event.pageX;
                startY = event.pageY;

                clearState();

                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);

            }
        };
    };


    return draggableElementFactory;
}]);