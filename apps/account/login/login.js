(function(){
    'use strict';
    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state'];
    function LoginCtrl($scope, $rootScope, $http, $filter, $window, $state) {
        var vm = $scope;

        $scope.submit = function () {
            $.getJSON('//freegeoip.net/json/?callback=?', function(result) {
                console.log(result);
                var url = SERVER_API + "login";
                var data = {
                    account: vm.account,
                    pass: vm.pass,
                    ip: result.ip
                };

                $http.post(url, data, {
                    withCredentials: true
                }).then(function (response) {
                    if (response.data.status === RESPONSE_STATUS_SUCCESS) {

                        $window.sessionStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(response.data.data));
                        $rootScope.user = JSON.parse(JSON.stringify(response.data.data));
                        $rootScope.isLogin = true;

                        var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

                        var url = SERVER_API + 'bank/getBankInfo?account=' + account;

                        $http.get(url, set_header(), {
                            withCredentials: true
                        }).then(function (res) {
                            $rootScope.bankInfo = res.data.data;
                            console.log($rootScope.bankInfo);
                            $window.sessionStorage.setItem(LOCALSTORAGE_BANKINFO, JSON.stringify(res.data.data));
                        }, function (err) {
                            $scope.isServerError = false;
                        });

                        // var memb___id = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
                        // var login_token = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).login_token;

                        // var url = SERVER_API + "getInfoCharacter";
                        // var data = {
                        //     memb___id: memb___id,
                        //     login_token: login_token
                        // };

                        // $http.post(url, data, {
                        //     withCredentials: true
                        // }).then(function (response) {
                        //     if (response.data.status == RESPONSE_STATUS_SUCCESS) {
                        //         $scope.charList = (response.data.data);
                        //         angular.forEach($scope.charList, function (value, key) {
                        //             value['avatar'] = get_link_avatar_character(value.Class);
                        //             value['class_name'] = get_class_name(value.Class);
                        //             value['MDate'] = moment(value.MDate).format('DD/MM/YYYY');
                        //             value['SealItem'] = get_seal_item(value.SCFSealItem);
                        //         });

                        //         $window.sessionStorage.setItem(LOCALSTORAGE_CHARLIST, JSON.stringify($scope.charList));
                        //         $rootScope.listChar = get_list_char();
                        //         $rootScope.charChoose = $scope.listChar[0];

                        //         sessionStorage.setItem(LOCALSTORAGE_CHARCHOOSE, JSON.stringify($rootScope.charChoose));

                        $state.go('app.character.info', {data: 'login-redirect'}, {reload: true});
                        //     } else if (response.data.status == RESPONSE_STATUS_ERROR) {
                        //         $scope.message = response.data.message;
                        //     }
                        // }, function (err) {
                        //     $scope.isServerError = false;
                        // });

                    } else if (response.data.status === RESPONSE_STATUS_ERROR) {
                        $scope.message = response.data.message;
                    }
                }, function (err) {
                    $scope.isServerError = false;
                });
            });

        };
    }
})();