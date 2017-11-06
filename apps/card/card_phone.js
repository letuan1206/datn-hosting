(function () {
    angular
        .module('app')
        .controller('CardPhoneCtrl', CardPhoneCtrl);

    function CardPhoneCtrl($scope, $rootScope, $http, $window, toastr) {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withOption('lengthChange', false)
            .withOption('searching', false)
            .withDisplayLength(50);
    }
})();