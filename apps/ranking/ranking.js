(function () {
    angular.module('app')
        .controller('RankingCtrl', RankingCtrl);

    function RankingCtrl($scope, $rootScope, $http, $window, toastr, DTOptionsBuilder, DTColumnBuilder, $q) {
        $scope.rankData = [];
        $scope.getRankAll = function (class_type) {
            var url = SERVER_API + 'ranking/getRankAll?class_type=' + class_type;

            $http.get(url, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.rankData = response.data.data;
                angular.forEach($scope.rankData, function (value, key) {
                    value['Class'] = get_class_name(value.Class);
                    if (value.LevelUp_Time !== null) {
                        value['LevelUp_Time'] = moment(value.LevelUp_Time).format('DD/MM/YYYY HH:mm:ss');
                    }
                });
            }, function (err) {
                $scope.isServerError = false;
            })
        }
        $scope.getRankAll('all');

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withOption('lengthChange', false)
            .withOption('searching', false)
            .withDisplayLength(50);
    }
})();