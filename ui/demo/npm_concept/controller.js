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


    var m = {
        selectedItem: {},

        move: {
            setActivity: function (a) {
                $scope.move.active = a;
            },

            up: function () {
                var id = m.utils.findItemId(m.selectedItem, $scope.content);

                if (id < 1)
                    return;

                $scope.content.splice(id - 1, 2, $scope.content[id], $scope.content[id - 1]);
            },

            down: function () {
                var id = m.utils.findItemId(m.selectedItem, $scope.content);
                console.log(id);

                if (id >= $scope.content.length - 1)
                    return;

                $scope.content.splice(id, 2, $scope.content[id + 1], $scope.content[id]);

            }
        },

        utils: {
            findItemId: function (item, array) {
                for (var i in array) {
                    if (array[i].$$hashKey === item.$$hashKey)
                        return Number(i);
                }
                return -1;
            }
        }
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
        },

        select: function (v) {
            if (m.selectedItem.$$hashKey === v.$$hashKey)
                return false;

            console.log(v);
            m.selectedItem = v;
            m.move.setActivity(true);
            return true;
        },

        move: {
            up: m.move.up,
            down: m.move.down
        }
    };

    $scope.move = {
        active: false
    };
}]);