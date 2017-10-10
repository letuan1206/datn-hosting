/**
 * Created by TuanLe on 10/9/2017.
 * Website: http://hoangtueck94.com
 */
(function() {
    angular
        .module('app')
        .controller('MoveLorenciaCtrl', MoveLorenciaCtrl);

    function MoveLorenciaCtrl($scope, $rootScope, $http, $window, toastr) {
        $scope.submit = function () {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var url = SERVER_API + "character/moveLorencia";

            var data = {
                account: account,
                name: $rootScope.charChoose.Name
            };
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
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