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
            $scope.search_key = searchKey;
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
    }
})();