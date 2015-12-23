/**
 * Created on 22.12.2015.
 */
angular.module('draggable').directive('draggableElement', ['$document', 'draggableElementFactory', function ($document, draggableElementFactory) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'ui/i/draggable/element/v.html',

        link: function (scope, element, attrs) {
            var moveController = new draggableElementFactory.MoveController({
                onStartMove: function (e, params) {
                    console.log('moved: ', params);
                },
                onMoving: function (e, params) {
                    console.log('moving: ', params);
                },
                onDrop: function () {
                    console.log('dropped');
                }
            });

            element.on('mousedown', moveController.onMouseDown);
        }
    };
}]);