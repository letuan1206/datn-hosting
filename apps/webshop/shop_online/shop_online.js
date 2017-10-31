(function() {
    angular
        .module('app')
        .controller('ShopOnlineCtrl', ShopOnlineCtrl);
    function ShopOnlineCtrl($scope, $rootScope, $http, $window, toastr) {
        $scope.selectClass = '0';
        $scope.page = 0;
        $scope.selectGroup = '';

        $scope.submit = function (page, selectClass, selectGroup) {
            var url = SERVER_API + "webshop/itemWebShopList";
            var data = {
                account: $rootScope.user.memb___id,
                page: page,
                selectClass: selectClass,
                selectGroup: selectGroup
            };
            $scope.selectClass = selectClass;
            $scope.page = page;
            $scope.selectGroup = selectGroup;

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                console.log(response);
                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                    $scope.listItem = response.data.data;

                } else if (response.data.status === RESPONSE_STATUS_ERROR) {

                }
            }, function (err) {
                $scope.isServerError = false;
            });
            $window.scrollTo(0, 0);
        };
        
        $scope.submit($scope.page);

        $scope.selectItem = function (item) {
            $scope.itemChoose = item;
        };

        $scope.buyItem = function () {
            var url = SERVER_API + "webshop/buyItemWebShop";

            var data = {
                account: $rootScope.user.memb___id,
                pass2: $scope.pass2,
                item_id: $scope.itemChoose.item_id
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                console.log(response);
                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                    toastr.success(response.data.message, {
                        closeButton: true
                    });
                    $scope.pass2 = '';
                    $('#buyItemModal').modal('hide');
                    $('#buyItemModalSuccess').modal('show');
                } else if (response.data.status === RESPONSE_STATUS_ERROR) {
                    toastr.error(response.data.message, {
                        closeButton: true
                    });
                }
            }, function (err) {
                $scope.isServerError = false;
            });
            $window.scrollTo(0, 0);
        };
    }    
})();