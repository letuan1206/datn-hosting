(function () {
    angular
        .module('app')
        .controller('CardPhoneCtrl', CardPhoneCtrl);

    function CardPhoneCtrl($scope, $rootScope, $http, $window, toastr) {
        $scope.listCard = [
            {
                "type": "Viettel",
                "k10000": 100,
                "k20000": 200,
                "k30000": 300,
                "k50000": 520,
                "k100000": 1040,
                "k200000": 2080,
                "k300000": 3120,
                "k500000": 5200,
                "k1000000": 10400
            },
            {
                "type": "Mobiphone",
                "k10000": 100,
                "k20000": 200,
                "k30000": 300,
                "k50000": 520,
                "k100000": 1040,
                "k200000": 2080,
                "k300000": 3120,
                "k500000": 5200,
                "k1000000": 10400
            },
            {
                "type": "Vinaphone",
                "k10000": 100,
                "k20000": 200,
                "k30000": 300,
                "k50000": 520,
                "k100000": 1040,
                "k200000": 2080,
                "k300000": 3120,
                "k500000": 5200,
                "k1000000": 10400
            },
            {
                "type": "GATE",
                "k10000": 100,
                "k20000": 200,
                "k30000": 300,
                "k50000": 550,
                "k100000": 1100,
                "k200000": 2200,
                "k300000": 3300,
                "k500000": 5500,
                "k1000000": 11000
            }
        ]

        $scope.submit = function () {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var url = SERVER_API + 'card/chargeCard';

            var data = {
                account: account,
                cardType: $scope.cardType,
                cardCode: $scope.cardCode,
                cardSeri: $scope.cardSeri,
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                    $scope.cardCode = '';
                    $scope.cardSeri = '';
                    toastr.success(response.data.message, {
                        closeButton: true
                    });
                } else if (response.data.status === RESPONSE_STATUS_ERROR) {
                    toastr.error(response.data.message, {
                        closeButton: true
                    });
                }
            }, function (err) {
                $scope.isServerError = false;
            });
        }
    }
})();