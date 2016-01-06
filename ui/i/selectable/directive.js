/**
 * Created on 05.01.2016.
 */
angular.module('infrastructure').directive('selectable', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'ui/i/draggable/element/v.html',
        scope: {
            multiselect: '=',
            selected: '',
            item: '='
        },

        link: function (scope, element, attrs) {
            var
                windowEl = angular.element($window);

            function contains(arr, el) {
                for (var i in arr) {
                    if (arr[i] == el)
                        return true;
                }
                return false;
            }

            scope.onClick = function() {
                if (contains(scope.selected, scope.item)) {

                }else {
                    scope.selected.push(scope.item);
                }
            };
        }
    };

});