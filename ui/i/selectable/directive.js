/**
 * Created on 05.01.2016.
 */
angular.module('infrastructure').directive('selectable', function (selectableService) {
    return {
        //restrict: 'E',
        transclude: true,
        templateUrl: 'ui/i/selectable/v.html',
        //scope: {
        //    multiselect: '=',
        //    selected: '=',
        //    item: '='
        //},
        scope: {
            //item: '&selectable'
            callback: '&selectable'
        },

        link: function (scope, element, attrs) {
            //var
            //    windowEl = angular.element($window);

            //function contains(arr, el) {
            //    for (var i in arr) {
            //        if (arr[i] == el)
            //            return true;
            //    }
            //    return false;
            //}
            //
            //scope.onClick = function() {
            //    if (contains(scope.selected, scope.item)) {
            //
            //    }else {
            //        scope.selected.push(scope.item);
            //    }
            //};

            var
                disposeDeactivate;

            function deactivate() {
                disposeDeactivate = null;
                scope.active = false;
            }

            function onClick() {
                if (!scope.callback())
                    return;

                disposeDeactivate = selectableService.setActive(deactivate);
                scope.active = true;
            };

            element.on('click', '*', onClick);

            scope.$on('$destroy', function () {
                element.off('click', onClick);

                if (disposeDeactivate)
                    disposeDeactivate();
            });
        }
    };

});