/**
 * Created by TuanLe on 10/10/2017.
 * Website: http://hoangtueck94.com
 */
(function() {
    angular
        .module('app')
        .controller('WareHouseCtrl', WareHouseCtrl);

    function WareHouseCtrl($scope, $rootScope, $http, $window, toastr) {
        $scope.listItemChoose = [];
        $scope.actionType = 'upToSupperMarket';
        $scope.getItemWareHouseList = function () {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var url = SERVER_API + "webshop/getItemWareHouseList";

            var data = {
                account: account
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                console.log(response);
                if (response.data.status == RESPONSE_STATUS_SUCCESS) {
                    // $scope.message = "<font color=\"green\">" + response.data.message + "</font>";
                    $scope.listItem = response.data.data;
                    angular.forEach($scope.listItem, function (value, key) {
                        value.selectedItem = false;
                        value.style = {
                            // 'border': '1px solid #c0c0c0',
                            'height': '68px',
                            'width': '68px',
                            'position': 'relative',
                            'margin': '0 9px 10px 0',
                            'float': 'left'
                        }
                    });

                } else if (response.data.status == RESPONSE_STATUS_ERROR) {
                    // $scope.message = "<font color=\"red\">" + response.data.message + "</font>";
                }
            }, function (err) {
                $scope.isServerError = false;
            });
            $window.scrollTo(0, 0);
        };

        $scope.getItemWareHouseList();

        $scope.changeSelected = function (index) {
            $scope.listItem[index].selectedItem = !$scope.listItem[index].selectedItem;
            $scope.step2 = true;
            if ($scope.listItem[index].selectedItem) {
                $scope.listItem[index].style = {
                    'height': '68px',
                    'width': '68px',
                    'position': 'relative',
                    'margin': '0 9px 10px 0',
                    'float': 'left',
                    'overflow': 'hidden',
                    'background': 'rgb(255, 235, 232)'
                };
                toastr.success('Chọn ' + $scope.listItem[index].name, {
                    closeButton: true
                });
            } else {
                $scope.listItem[index].style = {
                    'height': '68px',
                    'width': '68px',
                    'position': 'relative',
                    'margin': '0 9px 10px 0',
                    'float': 'left'
                };
                toastr.info('Bỏ chọn ' + $scope.listItem[index].name, {
                    closeButton: true
                });
            }
        };

        $scope.submit = function () {
            console.log($scope.actionType);
            $scope.listItemChoose = [];

            switch ($scope.actionType) {
                case 'upToSupperMarket':
                    angular.forEach($scope.listItem, function (value, key) {
                        if (value.selectedItem) {
                            value.price = 1;
                            $scope.listItemChoose.push(value);
                        }
                    });
                    $('#sellItemToMarket').modal('show');
                    break;
            }

        };

        $scope.removeItem = function (index) {
            $scope.listItemChoose.splice(index, 1);
        };

        $scope.postItemToMarket = function () {
            console.log($scope.listItemChoose);

            if ($scope.listItemChoose.length === 0) {
                $('#sellItemToMarket').modal('hide');
                return;
            }

            var url = SERVER_API + "webshop/addItemToSuperMarket";
            var list_item = [];
            angular.forEach($scope.listItemChoose, function (value, key) {
                var tmp = {
                    code: value.image,
                    item_price: value.price,
                    item_code: value.item_code,
                    item_type: value.item_group,
                    dw: value.dw,
                    dk: value.dk,
                    elf: value.elf,
                    mg: value.mg,
                    dl: value.dl,
                    sum: value.sum,
                    rf: value.rf
                };
                list_item.push(tmp);
            });

            var data = {
                account: JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id,
                name: $rootScope.charChoose.Name,
                list_item: list_item
            };

            console.log(data);
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                if (response.data.status == RESPONSE_STATUS_SUCCESS) {
                    $scope.getItemWareHouseList();
                    $('#sellItemToMarket').modal('hide');
                    toastr.success(response.data.message, {
                        closeButton: true
                    });
                } else if (response.data.status == RESPONSE_STATUS_ERROR) {
                    toastr.error('Bỏ chọn ' + $scope.listItem[index].name, {
                        closeButton: true
                    });
                }
            }, function (err) {
                $scope.isServerError = false;
            });

        };
    }
})();