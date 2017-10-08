(function () {
    'use strict';
    angular
        .module('app')
        .controller('ChangeAccountInfoCtrl', ChangeAccountInfoCtrl);

    function ChangeAccountInfoCtrl($scope, $http, $state, $window) {
        $scope.title = $state.current.data.title;
        $scope.lable_text = $state.current.data.lable_text;
        $scope.action_type = $state.current.data.action_type;
        $scope.placeholder_text = $state.current.data.lable_text;
        switch($scope.action_type) {
            case 1:
            case 2:
                $scope.input_type = 'password';
                break;
            case 3:
            case 4:
                $scope.input_type = 'text';
                break;
            case 5:
                $scope.input_type = 'email';
                $scope.placeholder_text = 'example@gmail.com';
                break;
            default:
                $scope.input_type = 'text';
                break;
        }

        $scope.submitSMS = function () {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

            var url = SERVER_API + "account/changeAccountInfoUseSMS";
            var data = {
                account: account,
                info_change: $scope.info_change,
                action_type: $scope.action_type
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
                if (response.data.status == RESPONSE_STATUS_SUCCESS) {
                    $scope.info_change = '';
                } else if (response.data.status == RESPONSE_STATUS_ERROR) {
                    $scope.info_change = '';
                }
            }, function (err) {
                $scope.isServerError = false;
            });
        }
    }
})();