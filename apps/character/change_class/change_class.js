/**
 * Created by TuanLe on 10/9/2017.
 * Website: http://hoangtueck94.com
 */
(function () {
    angular
        .module('app')
        .controller('ChangeClassCtrl', ChangeClassCtrl);

    function ChangeClassCtrl($scope, $rootScope, $http, $window, toastr) {
        
        $scope.sliverNeed = 500;

        $scope.submit = function () {
            $scope.isCalling = true;
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var url = SERVER_API + "character/changeClass";

            var data = {
                account: account,
                name: $rootScope.charChoose.Name,
                classType: $scope.classType,
                pass2: $scope.pass2
            };
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
                $scope.isCalling = false;
                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                    toastr.success(response.data.message, {
                        closeButton: true
                    });
                } else {
                    $scope.pass2 = '';
                    toastr.error(response.data.message, {
                        closeButton: true
                    });
                }
            }, function (err) {
                $scope.isServerError = false;
            });
        };
    }
})();