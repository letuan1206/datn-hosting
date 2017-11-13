(function () {
    angular
        .module('app')
        .controller('CardPhoneCtrl', CardPhoneCtrl);

    function CardPhoneCtrl($scope, $rootScope, $http, $window, toastr) {
        
        var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

        var url = SERVER_API + 'bank/getBankInfo?account=' + account;

        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.res = response.data;
            $rootScope.bankInfo = response.data.data;
            $window.sessionStorage.setItem(LOCALSTORAGE_BANKINFO, JSON.stringify(response.data.data));
        }, function (err) {
            $scope.isServerError = false;
        });
       
    }
})();