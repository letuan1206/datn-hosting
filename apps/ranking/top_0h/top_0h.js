(function () {
    angular.module('app')
        .controller('Top0hCtrl', Top0hCtrl);

    function Top0hCtrl($scope, $rootScope, $http, $window, toastr, DTOptionsBuilder, DTColumnBuilder, $q, $stateParams) {
        $scope.guildName = $stateParams.guild_name;
        $scope.rankData = [];
        $scope.yesterday = moment().subtract(1, 'days').format('DD/MM/YYYY');
        $scope.getListTop = function () {
            var url = SERVER_API + 'ranking/getRankTop';

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
        $scope.getListTop();

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withOption('lengthChange', false)
            .withOption('searching', false)
            .withDisplayLength(50);
    }
})();