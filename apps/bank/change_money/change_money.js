(function () {
    angular
        .module('app')
        .controller('ChangeMoneyCtrl', ChangeMoneyCtrl);

    function ChangeMoneyCtrl($scope, $http, $window) {
        $scope.submit = function() {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

            var url = SERVER_API + "bank/changeMoney";

            var data = {
                account: account,
                pass2: $scope.pass2,
                quality: $scope.quality,
                typez: $scope.typez,
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
                $scope.quality = 0;
                $scope.pass2 = '';
            }, function (err) {
                $scope.isServerError = false;
            });
        }
    }
})();