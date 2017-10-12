(function() {
    angular
        .module('app')
        .controller('SuperMarketCtrl', SuperMarketCtrl);
    function SuperMarketCtrl($scope, $rootScope, $http, $window, toastr) {
        $scope.selectClass = '0';
        $scope.page = 0;
        $scope.selectGroup = '';
        $scope.searchKey = '';

        $scope.submit = function (page, selectClass, selectGroup, searchKey) {
            var url = SERVER_API + "webshop/getItemInSuperMarketList";
            var data = {
                account: $rootScope.user.memb___id,
                page: page,
                selectClass: selectClass,
                selectGroup: selectGroup,
                searchKey: searchKey
            };
            console.log(data);
            $scope.selectClass = selectClass;
            $scope.page = page;
            $scope.selectGroup = selectGroup;
            $scope.searchKey = searchKey;
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                // console.log(response);
                if (response.data.status == RESPONSE_STATUS_SUCCESS) {
                    $scope.listItem = response.data.data;
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
        $scope.submit($scope.page);

        $scope.selectItem = function (item) {
            $scope.itemChoose = item;
        };

        $scope.buyItem = function () {
            var url = SERVER_API + "webshop/buyItemSuperMarket";
    
            var data = {
                account: $rootScope.user.memb___id,
                pass2: $scope.pass2,
                item_id: $scope.itemChoose.item_id
            };
            console.log(data);
    
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                    $scope.pass2 = '';
                    $('#buyItemModal').modal('hide');
                    $('#buyItemModalSuccess').modal('show');
                    toastr.success(response.data.message, {
                        closeButton: true
                    });
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