/**
 * Created on 22.12.2015.
 */
angular.module('draggable').directive('draggableContainer', [function (draggableService) {
    return {
        controller: function($scope){
            var self = {
                test: function(element, sourceContainer){

                },
                listenToHover: function(){

                },
                forgetHover: function(){

                }
            },
            removeContainer = draggableService.containerStorage.addContainer(self);

            $scope.$on("$destroy", function(){
                removeContainer();
            });
        }
    };
}]);