(function() {
   angular
       .module('app')
       .controller('DeleteInventoryCtrl', DeleteInventoryCtrl);

   function DeleteInventoryCtrl($scope, $rootScope, $http, $window, toastr) {
       $rootScope.charChoose = JSON.parse(sessionStorage.getItem(LOCALSTORAGE_CHARCHOOSE));

       $scope.submit = function () {
           var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;
           var url = SERVER_API + "character/deleteInventory";

           var data = {
               account: account,
               name: $rootScope.charChoose.Name,
               pass2: $scope.pass2
           };
           $http.post(url, data, set_header(), {
               withCredentials: true
           }).then(function (response) {
                $scope.res = response.data;
                $scope.pass2 = '';
                if(response.data.status === RESPONSE_STATUS_SUCCESS) {
                    toastr.success(response.data.message, {
                        closeButton: true
                    });
                } else {
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