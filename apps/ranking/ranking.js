(function () {
    angular.module('app')
        .controller('RankingCtrl', RankingCtrl);

    function RankingCtrl($scope, $rootScope, $http, $window, toastr) {
        $scope.getRankAll = function () {
            var url = SERVER_API + 'ranking/getRankAll';

            $http.get(url, set_header(), {
                withCredentials: true
            }).then(function (response) {
                console.log(response);
            }, function (err) {
                $scope.isServerError = false;
            })
        }
        $scope.getRankAll();
    }
})();