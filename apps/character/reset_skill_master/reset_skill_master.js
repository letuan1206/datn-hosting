/**
 * Created by TuanLe on 10/9/2017.
 */
(function() {
    angular
        .module('app')
        .controller('ResetSkillMasterCtrl', ResetSkillMasterCtrl);

    function ResetSkillMasterCtrl($scope, $rootScope, $http, $window) {
        $rootScope.charChoose = JSON.parse(sessionStorage.getItem(LOCALSTORAGE_CHARCHOOSE));
        console.log($rootScope.charChoose)
    }
})();