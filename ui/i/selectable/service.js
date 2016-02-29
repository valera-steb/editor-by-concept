/**
 * Created on 11.01.2016.
 */
angular.module('infrastructure').service('selectableService', function () {
    var
        selectableService = this,
        deactivate;


    selectableService.setActive = function (newDeactivator) {
        selectableService.deactivate();

        deactivate = newDeactivator;

        return function destroyLastActive() {
            deactivate = null;
        };
    };

    selectableService.deactivate = function () {
        if (deactivate)
            deactivate();

        deactivate = null;
    };
});