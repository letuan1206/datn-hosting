(function () {
    angular
        .module('app')
        .controller('ResetsCtrl', ResetsCtrl);

    function ResetsCtrl($scope, $rootScope, $window, $http, toastr) {
        // $scope.charList = get_list_char();
        // $scope.charChoose = $rootScope.charChoose;
        $scope.resetNext = parseInt($rootScope.charChoose.Resets) + 1;
        $scope.getResetInfo = function () {
            var url = SERVER_API + "getResetInfo";

            $http.get(url, {
                withCredentials: true
            }).then(function (response) {
                $scope.resetInfo = response.data.data;
                for (var i = $scope.resetInfo.length - 1; i >= 0; i--) {
                    if ($scope.resetNext > $scope.resetInfo[i].reset) {
                        $scope.resetSelect = $scope.resetInfo[i];
                    }
                }
                $scope.levelNeed = ((parseInt($rootScope.charChoose.Resets) + 1) * 5 + 200) > 4000 ? 400 : ((parseInt($rootScope.charChoose.Resets) + 1) * 5 + 200);
                if (parseInt($scope.levelNeed) > parseInt($rootScope.charChoose.cLevel) || !$rootScope.charChoose.doinv || $rootScope.charChoose.online) {
                    $scope.isCalling = true;
                }

            }, function (err) {
                $scope.isServerError = false;
            });
        };

        $scope.getResetInfo();
        // $scope.resetChoose = 'reset';
        $scope.selectReset = function () {
            console.log($scope.resetChoose)
        }

        $scope.reset = function () {
            if ($scope.resetChoose === undefined || $scope.resetChoose === '') {
                toastr.error("Chưa chọn kiểu Reset", {
                    closeButton: true
                });

                return;
            }
            $scope.isCalling = true;
            var url = SERVER_API + "character/reset";
            if ($scope.resetChoose === 'reset_vip') {
                url = SERVER_API + "character/resetVIP";
            } else if ($scope.resetChoose === 'reset_vip_po') {
                url = SERVER_API + "character/resetPO";
            }
            var data = {
                account: $rootScope.user.memb___id,
                name: $rootScope.charChoose.Name
            };
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                    toastr.success(response.data.message, {
                        closeButton: true
                    });
                } else {
                    $scope.isCalling = false;
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