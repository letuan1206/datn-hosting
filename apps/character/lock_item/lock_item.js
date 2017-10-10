/**
 * Created by TuanLe on 10/9/2017.
 * Website: http://hoangtueck94.com
 */
(function() {
    angular
        .module('app')
        .controller('LockItemCtrl', LockItemCtrl);

    function LockItemCtrl($scope, $rootScope, $http, $window, toastr) {
        // $rootScope.charChoose = JSON.parse(sessionStorage.getItem(LOCALSTORAGE_CHARCHOOSE));
        // console.log($rootScope.charChoose)
        $scope.submit = function (actionType) {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var url = SERVER_API + "character/lockItem";

            var data = {
                account: account,
                name: $rootScope.charChoose.Name,
                keyLock: $scope.keyLock,
                reKeyLock: $scope.reKeyLock,
                actionType: actionType
            };
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
                $scope.keyLock = '';
                $scope.reKeyLock = '';
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
        };
    }
})();