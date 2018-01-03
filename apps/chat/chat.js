(function () {
    'use strict';
    angular
        .module('app')
        .factory('socketIO', socketIO)
        .controller('ChatCtrl', ChatCtrl);

    function socketIO($rootScope) {
        var socket = io.connect(SERVER_CHAT);
        // return {
        //     on: function (eventName, callback) {
        //         socket.on(eventName, function () {
        //             var args = arguments;
        //             $rootScope.$apply(function () {
        //                 callback.apply(socket, args);
        //             });
        //         });
        //     },
        //     emit: function (eventName, data, callback) {
        //         socket.emit(eventName, data, function () {
        //             var args = arguments;
        //             $rootScope.$apply(function () {
        //                 if (callback) {
        //                     callback.apply(socket, args);
        //                 }
        //             });
        //         })
        //     }
        // };
        return socket;
    };

    function ChatCtrl($scope, $rootScope, $http, socketIO) {

        $.getJSON('//freegeoip.net/json/?callback=?', function (result) {
            $scope.ipAddress = result.ip;
        });

        var url = SERVER_CHAT + "/listMessage/-1";
        
        $http.get(url, {
            withCredentials: true
        }).then(function (response) {
            $scope.contentList = response.data.reverse();
            $scope.lastMessage = $scope.contentList[0];
        }, function (err) {
            $scope.isServerError = false;
        });

        $scope.loadMore = function() {
            if($scope.lastMessage.id > 0) {
                var url = SERVER_CHAT + "/listMessage/" + $scope.lastMessage.id;

                $http.get(url, {
                    withCredentials: true
                }).then(function (response) {
                    var results = response.data.reverse();
                    $scope.contentList = results.concat($scope.contentList);
                    $scope.lastMessage = results[0];
                }, function (err) {
                    $scope.isServerError = false;
                });
            }
        }

        $scope.sendMessage = function () {
            if ($scope.message === '') {
                return;
            }

            var data = {
                account: $rootScope.user.memb___id,
                name: $rootScope.charChoose.Name,
                content: $scope.message,
                ip_address: $scope.ipAddress || '',
                server_id: 0,
                status: 1,
                permission: 0
            }
            socketIO.emit('send-message-to-server', data);
            $scope.message = '';
        }

        socketIO.on('server-reply-client', function (data) {
            $scope.$apply(function () {
                $scope.contentList.push(data);
            });
        })
    }
})();