(function () {
    angular.module('app')
        .controller('RankGuildCtrl', RankGuildCtrl);

    function RankGuildCtrl($scope, $rootScope, $http, $window, toastr, DTOptionsBuilder, DTColumnBuilder, $q) {
        $scope.rankData = [];

        $scope.getRankGuild = function () {
            var url = SERVER_API + 'ranking/getRankGuild';

            $http.get(url, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.rankData = response.data.data;
            }, function (err) {
                $scope.isServerError = false;
            })
        }
        $scope.getRankGuild();

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withOption('lengthChange', false)
            .withOption('searching', false)
            .withDisplayLength(50);

        $scope.drawLogo = function (key, logo_mark) {

            var canv = 'canvas[' + key + ']';
            var canvas = document.getElementById(canv);
            var context = canvas.getContext('2d');

            canvas.width = 32;
            canvas.height = 32;

            $scope.data = [

            ];

            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    var p = {
                        x: j * 4,
                        y: i * 4,
                        color: color(logo_mark[i * 8 + j]),
                        amount: 5
                    };
                    $scope.data.push(p);
                    draw($scope.data);
                }
            }

            function draw(data) {
                for (var i = 0; i < data.length; i++) {
                    drawDot(data[i]);
                }
            }

            function drawDot(data) {
                context.beginPath();
                context.rect(data.x, data.y, 4, 4);
                context.fillStyle = data.color;
                context.fill();
            }
        }
    }
})();