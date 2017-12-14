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
                for(var i = $scope.resetInfo.length - 1; i >= 0; i--) {
                    if($scope.resetNext > $scope.resetInfo[i].reset) {
                        $scope.resetSelect = $scope.resetInfo[i];
                    }
                }
            }, function (err) {
                $scope.isServerError = false;
            });
        };

        $scope.getResetInfo();
        $scope.resetChoose = 'reset';
        $scope.selectReset = function () {
        }

        $scope.reset = function() {
            var url = SERVER_API + "character/reset";
            var data = {
                account: $rootScope.user.memb___id,
                name: $rootScope.charChoose.Name
            };
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                if(response.data.status === RESPONSE_STATUS_SUCCESS) {
                    toastr.success(response.data.message, {
                        closeButton: true
                    });
                } else {
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