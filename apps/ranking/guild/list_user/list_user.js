(function () {
    angular.module('app')
        .controller('UserGuildCtrl', UserGuildCtrl);

    function UserGuildCtrl($scope, $rootScope, $http, $window, toastr, DTOptionsBuilder, DTColumnBuilder, $q, $stateParams) {
        $scope.guildName = $stateParams.guild_name;
        $scope.rankData = [];

        $scope.getListUserInGuild = function () {
            var url = SERVER_API + 'ranking/getCharInGuild?guild_name=' + $scope.guildName;

            $http.get(url, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.rankData = response.data.data;
            }, function (err) {
                $scope.isServerError = false;
            })
        }
        $scope.getListUserInGuild();

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withOption('lengthChange', false)
            .withOption('searching', false)
            .withDisplayLength(50);
    }
})();