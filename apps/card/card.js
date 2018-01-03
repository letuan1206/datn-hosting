(function () {
    angular
        .module('app')
        .controller('CardCtrl', CardCtrl);

    function CardCtrl($scope, $rootScope, $http, $window, toastr) {
        $scope.showCard = function () {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var url = SERVER_API + 'card/getCardHistory?account=' + account;

            $http.get(url, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.listCard = response.data.data;
                $scope.show = true;
            }, function (err) {
                $scope.isServerError = false;
            });
        }
    }
})();