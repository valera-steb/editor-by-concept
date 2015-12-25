/**
 * Created by steb on 24.12.2015.
 */
angular.module('draggable').service('draggableService', function () {
    this.containerStorage = (function () {
        var containers = [];

        return {
            addContainer: function (container) {
                var id = container.push(container);

                return function () {
                    containers.slice(id - 1, 1);
                }
            },
            getContainers: function () {
                return m.slice(0, m.length);
            }
        }
    })();
});