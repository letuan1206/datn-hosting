(function () {
    'use strict';
    angular
        .module('app')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state'];
    function AccountCtrl($scope, $rootScope, $http, $filter, $window, $state) {
        $rootScope.user = JSON.parse(sessionStorage.getItem(LOCALSTORAGE_USER));
        console.log($rootScope.user);
    }
})();