(function () {
    angular.module('app').controller('ItemSliverCtrl', ItemSliverCtrl);

    function ItemSliverCtrl($scope, $http, $window) {
        $scope.slgChoises = [
            {name: 1, value: 1},
            {name: 2, value: 2},
            {name: 3, value: 3},
            {name: 4, value: 4},
            {name: 5, value: 5},
            {name: 6, value: 6},
            {name: 7, value: 7},
            {name: 8, value: 8}
        ];
        $scope.slg = $scope.slgChoises[0];

        $scope.itemChoises = {
            name: '1k'
        };

        $scope.charList = get_list_char();
        $scope.charChoose = $scope.charList[0];

        $scope.buyItemSliver = function () {

            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

            var url = SERVER_API + "bank/buyItemSliver";

            var data = {
                account: account,
                pass2: $scope.pass2,
                slg: $scope.slg.value,
                item: $scope.itemChoises.name,
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
               $scope.res = response.data;
               $scope.pass2 = '';
            }, function (err) {
                $scope.isServerError = false;
            });
        };

        $scope.sellItemSliver = function () {

            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

            var url = SERVER_API + "bank/sellItemSliver";

            var data = {
                account: account,
                pass2: $scope.pass2,
                name: $scope.charChoose.Name,
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
                $scope.pass2 = '';
            }, function (err) {
                $scope.isServerError = false;
            });
        };
    }
})();