/**
 * Created on 04.01.2016.
 */
angular.module('eDemo').controller('npmConceptCtrl', ['$scope', 'npmConceptFactory', '$timeout', function ($scope, npmConceptFactory, $timeout) {
    var datas = {
        subTreeData: [
            {key: '*', text: 'точка контроля - начало'},
            {key: '├', text: 'комментарий к переходу'},
            {key: '*', text: 'точка<br/>контроля<br/>внутренняя'},
        ],

        items: [
            {key: '*', text: 'точка контроля - начало'},
            {key: '├', text: 'комментарий к переходу'},
            {key: '*', text: 'точка<br/>контроля<br/>внутренняя'},
            {key: '├──┐ ', text: 'ветвление'},
            {key: '├  │', text: 'комментарий к переходу левому'},
            {key: '*  │', text: 'комментарий к точке левой'},
            {key: '│  ├', text: 'комментарий к <br/>переоходу правому'},
            {key: '│  *', text: 'комментарий к точке правой'},
            {key: '├  │', text: 'комментарий к переходу левому'},
            {key: '│  ├', text: 'комментарий к <br/>переоходу правому'},
            {key: '* ─┘', text: 'коммент к точке + слияние в точку'},
            {key: '├', text: 'some text'},
            {key: '*', text: 'some text'}
        ]
    };


    npmConceptFactory.clipboardController($scope);

    $scope.content = datas.items;


    $scope.on = {
        key: function () {

        },

        paste: function () {
            $timeout(function () {
                angular.element('#f').trigger('focus');
                $timeout(function () {
                    //document.execCommand('paste');
                    angular.element('#f').trigger('paste');
                }, 100);
            }, 100);
        }
    }
}]);