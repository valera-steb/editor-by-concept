/**
 * Created on 22.12.2015.
 */
angular.module('eDemo', ['ngSanitize']);
angular.module('eDemo')
    .provider('demoRouts', function () {
        this.setUpRoutes = function ($routeProvider) {
            $routeProvider.
                when('/demo', {
                    templateUrl: 'ui/demo/demoHome.html'
                }).
                when('/demo/draggable', {
                    controller: 'draggableDemoCtrl',
                    templateUrl: 'ui/demo/draggable/v.html'
                }).
                when('/demo/network_process_model', {
                    controller: 'npmConceptCtrl',
                    templateUrl: 'ui/demo/npm_concept/v.html'
                });
        };
        this.$get = function(){};
    });