(function () {
    'use strict';
    angular
        .module('app')
        .controller('CharInfoCtrl', CharInfoCtrl);

    CharInfoCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$stateParams'];
    function CharInfoCtrl($scope, $rootScope, $http, $window, $stateParams) {
        if ($stateParams.data === 'login-redirect') {
            var memb___id = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var login_token = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).login_token;

            var url = SERVER_API + "getInfoCharacter";
            var data = {
                memb___id: memb___id,
                login_token: login_token
            };
            
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
                    $rootScope.listChar = $scope.charList;
                    $window.sessionStorage.setItem(LOCALSTORAGE_CHARCHOOSE, JSON.stringify($scope.charList[0]));
                    $rootScope.charChoose = $rootScope.listChar[0];
                } else if (response.data.status == RESPONSE_STATUS_ERROR) {
                    $scope.message = response.data.message;
                }
            }, function (err) {
                $scope.isServerError = false;
            });
        } else if($stateParams.data === 'update-char') {
            var memb___id = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var login_token = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).login_token;

            var url = SERVER_API + "getInfoCharacter";
            var data = {
                memb___id: memb___id,
                login_token: login_token
            };
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
                    $rootScope.listChar = $scope.charList;

                    angular.forEach($scope.charList, function (value, key) {
                        if (value['Name'] === $rootScope.charChoose['Name']) {
                            $window.sessionStorage.setItem(LOCALSTORAGE_CHARCHOOSE, JSON.stringify(value));
                            $rootScope.charChoose = $rootScope.listChar[key];
                        }
                    });
                } else if (response.data.status == RESPONSE_STATUS_ERROR) {
                    $scope.message = response.data.message;
                }
            }, function (err) {
                $scope.isServerError = false;
            });
        }
    }
})();