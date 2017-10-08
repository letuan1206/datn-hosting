(function () {
    'use strict';
    angular.module('app')
        .controller('TransferCtrl', TransferCtrl);

    function TransferCtrl($scope, $http, $window) {

        $scope.submit = function () {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var url = SERVER_API + "bank/bankTransfer";

            var data = {
                account: account,
                to_account: $scope.to_account,
                quality: $scope.quality,
                typez: $scope.typez,
                purpose: $scope.purpose,
            };
            console.log(data);

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
                $scope.to_account = '';
                $scope.quality = 0;
                $scope.purpose = '';
            }, function (err) {
                $scope.isServerError = false;
            });
        };
    }
})();