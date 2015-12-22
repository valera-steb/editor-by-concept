/**
 * Created on 22.12.2015.
 */
angular.module('eDemo', []);
angular.module('eDemo')
    .provider('demoRouts', function () {
        this.setUpRoutes = function ($routeProvider) {
            $routeProvider.
                when('/demo/draggable', {
                    controller: 'draggableDemoCtrl',
                    templateUrl: 'ui/demo/draggable/v.html'
                });
        };
        this.$get = function(){};
    });