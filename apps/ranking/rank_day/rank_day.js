(function () {
    angular.module('app')
        .controller('RankResetInDayCtrl', RankResetInDayCtrl);

    function RankResetInDayCtrl($scope, $rootScope, $http, $window, toastr, DTOptionsBuilder, DTColumnBuilder, $q, $stateParams) {
        $scope.guildName = $stateParams.guild_name;
        $scope.rankData = [];
        $scope.today = moment().format('DD/MM/YYYY');

        $scope.getListRankResetInDay = function () {
            var url = SERVER_API + 'ranking/getRankDay';

            $http.get(url, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.rankData = response.data.data;
                angular.forEach($scope.rankData, function (value, key) {
                    value['Class'] = get_class_name(value.Class);
                });
            }, function (err) {
                $scope.isServerError = false;
            })
        }
        $scope.getListRankResetInDay();

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withOption('lengthChange', false)
            .withOption('searching', false)
            .withDisplayLength(50);
    }
})();