/**
 * Created by TuanLe on 10/9/2017.
 * Website: http://hoangtueck94.com
 */
(function() {
    angular
        .module('app')
        .controller('MoveLorenciaCtrl', MoveLorenciaCtrl);

    function MoveLorenciaCtrl($scope, $rootScope, $http, $window) {
        $rootScope.charChoose = JSON.parse(sessionStorage.getItem('charChoose'));
        console.log($rootScope.charChoose)
    }
})();