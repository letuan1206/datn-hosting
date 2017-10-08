(function () {
    angular.module('app')
        .controller('BankInfoCtrl', BankInfoCtrl);

    function BankInfoCtrl($scope, $http, $window) {
        var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

        var url = SERVER_API + 'bank/getBankInfo?account=' + account;

        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.res = response.data;
        }, function (err) {
            $scope.isServerError = false;
        });
    }
})();
