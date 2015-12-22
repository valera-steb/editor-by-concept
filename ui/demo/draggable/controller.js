/**
 * Created on 22.12.2015.
 */
angular.module('eDemo').controller('draggableDemoCtrl', ['$scope', function($scope){
    function f() {
        console.log('noop');
    };


    $scope.onDraggableContainer = {
        onDragEnter: function(){    // перетягиваемый элемент дотянули до данного контейнера

        },
        onDragLeave: f,             // перетягиваемый элемент вытянули за пределы данного контейнера
        onDragging: f,              // тянут над контейнером

        onDragDrop: f,                  // скинули в контейнер

        onStartDrag : f,            // вытягиваем из контейнера
        onCancelDrag: f,            // отменили перетягивание из этого контейнера
        onDroppedOut: f             // елемент данного сбросили в другой
    };
}]);