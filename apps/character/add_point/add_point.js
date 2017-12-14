(function() {
    angular
        .module('app')
        .controller('AddPointCtrl', AddPointCtrl);

    function AddPointCtrl($scope, $rootScope, $http, $window, toastr) {
        $rootScope.charChoose = JSON.parse(sessionStorage.getItem(LOCALSTORAGE_CHARCHOOSE));
        $scope.strength = '';
        $scope.dexterity = '';
        $scope.vitality = '';
        $scope.energy = '';
        $scope.leadership = '';

        $scope.submit = function () {
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
            var url = SERVER_API + "character/addPoint";

            var data = {
                account: account,
                name: $rootScope.charChoose.Name,
                strength: $scope.strength,
                dexterity: $scope.dexterity,
                vitality: $scope.vitality,
                energy: $scope.energy,
                leadership: $scope.leadership
            };
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                    if ($scope.strength === '')
                        $scope.strength = 0;
                    if ($scope.dexterity === '')
                        $scope.dexterity = 0;
                    if ($scope.vitality === '')
                        $scope.vitality = 0;
                    if ($scope.energy === '')
                        $scope.energy = 0;
                    if ($scope.leadership === '')
                        $scope.leadership = 0;

                    $rootScope.charChoose.LevelUpPoint -= (parseInt($scope.strength) +
                    parseInt($scope.dexterity) +
                    parseInt($scope.vitality) +
                    parseInt($scope.energy) +
                    parseInt($scope.leadership));

                    $rootScope.charChoose.Strength = parseInt($rootScope.charChoose.Strength) + parseInt($scope.strength);
                    $rootScope.charChoose.Dexterity = parseInt($rootScope.charChoose.Dexterity) + parseInt($scope.dexterity);
                    $rootScope.charChoose.Vitality = parseInt($rootScope.charChoose.Vitality) + parseInt($scope.vitality);
                    $rootScope.charChoose.Energy = parseInt($rootScope.charChoose.Energy) + parseInt($scope.energy);
                    $rootScope.charChoose.Leadership = parseInt($rootScope.charChoose.Leadership) + parseInt($scope.leadership);

                    update_character($rootScope.charChoose.Name, $rootScope.charChoose);

                    $scope.strength = '';
                    $scope.dexterity = '';
                    $scope.vitality = '';
                    $scope.energy = '';
                    $scope.leadership = '';

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
        };
    }
})();