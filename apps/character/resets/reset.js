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
                console.log(response);
                $scope.resetInfo = response.data.data;
                for(var i = $scope.resetInfo.length - 1; i >= 0; i--) {
                    console.log($rootScope.charChoose.Resets);
                    if($scope.resetNext > $scope.resetInfo[i].reset) {
                        $scope.resetSelect = $scope.resetInfo[i];
                        console.log($scope.resetSelect);
                    }
                }
            }, function (err) {
                $scope.isServerError = false;
            });
        };

        $scope.getResetInfo();
        $scope.resetChoose = 'reset';
        $scope.selectReset = function () {
            console.log( $scope.resetChoose)
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
                console.log(response);
            }, function (err) {
                $scope.isServerError = false;
            });
        }
    }
})();