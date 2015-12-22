/**
 * Created on 22.12.2015.
 */
var app = angular.module('app', [
    'ngRoute', 'draggable',
    'eDemo'
]);


app.config(['$routeProvider', 'demoRoutsProvider', function ($routeProvider, demoRoutsProvider) {

    demoRoutsProvider.setUpRoutes($routeProvider);


    $routeProvider.
        when('/', {
            controller: 'homeCtrl',
            templateUrl: 'ui/parts/home/v.html'
        }).
        otherwise({
            templateUrl: 'ui/parts/page404/v.html',
            is404: true
        });


    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: true
    //});
}]);