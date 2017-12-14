(function () {
    angular.module('app')
        .controller('JewelActionCtrl', JewelActionCtrl);

    function JewelActionCtrl($scope, $http, $window) {
        $scope.charList = get_list_char();
        $scope.charChoose = $scope.charList[0];

        $scope.bless_to_jewel = 10;
        $scope.soul_to_jewel = 6;
        $scope.life_to_jewel = 12;

        $scope.RutGuiJewel = function () {
            // console.log($scope.quality);
            if ($scope.quality === undefined) {
                $scope.quality = 0;
            }

            $scope.showInfo = true;
            switch ($scope.myAct) {
                case 'guizen':
                    $scope.infoJewelAction = $scope.quality + " triệu Zen trên người = " + $scope.quality + " triệu zen trên bank";
                    break;
                case 'rutzen':
                    $scope.infoJewelAction = $scope.quality + " triệu Zen trên bank = " + $scope.quality + " triệu zen trên người";
                    break;
                case 'guingoc':
                    $scope.infoJewelAction = $scope.quality + " ngọc trị giá = ??? jewel";
                    break;
                case 'rutngoc1':
                    $scope.infoJewelAction = $scope.quality + " ngọc trị giá: " + $scope.bless_to_jewel * $scope.quality + " jewel";
                    break;
                case 'rutngoc2':
                    $scope.infoJewelAction = $scope.quality + " ngọc trị giá: " + $scope.soul_to_jewel * $scope.quality + " jewel";
                    break;
                case 'rutngoc3':
                    $scope.infoJewelAction = $scope.quality + " ngọc trị giá: " + $scope.life_to_jewel * $scope.quality + " jewel";
                    break;
            }
        };

        $scope.submit = function () {

            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var login_token = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).login_token;

            var url = SERVER_API + "bank/jewelAction";

            var data = {
                account: account,
                quality: $scope.quality,
                name: $scope.charChoose.Name,
                action: $scope.myAct
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.res = response.data;
                $scope.quality = '';
            }, function (err) {
                $scope.isServerError = false;
            });
        };
    }
})();