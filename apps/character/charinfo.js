(function () {
    'use strict';
    angular
        .module('app')
        .controller('CharInfoCtrl', CharInfoCtrl);

    CharInfoCtrl.$inject = ['$scope', '$rootScope', '$http', '$window'];
    function CharInfoCtrl($scope, $rootScope, $http, $window) {

        var memb___id = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
        var login_token = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).login_token;

        var url = SERVER_API + "getInfoCharacter";
        var data = {
            memb___id: memb___id,
            login_token: login_token
        };

        $rootScope.charChoose = JSON.parse(sessionStorage.getItem('charChoose'));
        console.log($rootScope.charChoose);

        $http.post(url, data, {
            withCredentials: true
        }).then(function (response) {
            if (response.data.status == RESPONSE_STATUS_SUCCESS) {
                $scope.charList = (response.data.data);
                angular.forEach($scope.charList, function (value, key) {
                    value['avatar'] = get_link_avatar_character(value.Class);
                    value['class_name'] = get_class_name(value.Class);
                    value['MDate'] = moment(value.MDate).format('DD/MM/YYYY');
                    value['SealItem'] = get_seal_item(value.SCFSealItem);
                });

                $window.sessionStorage.setItem(LOCALSTORAGE_CHARLIST, JSON.stringify($scope.charList));
            } else if (response.data.status == RESPONSE_STATUS_ERROR) {
                $scope.message = response.data.message;

            }
        }, function (err) {
            $scope.isServerError = false;
        });

    }
})();