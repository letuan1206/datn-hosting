(function() {
    angular
        .module('app')
        .controller('AddPointCtrl', AddPointCtrl);

    function AddPointCtrl($scope, $rootScope, $http, $window) {
        $rootScope.charChoose = JSON.parse(sessionStorage.getItem('charChoose'));
        console.log($rootScope.charChoose)
    }
})();