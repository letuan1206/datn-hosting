(function() {
   angular
       .module('app')
       .controller('DeleteInventoryCtrl', DeleteInventoryCtrl);

   function DeleteInventoryCtrl($scope, $rootScope, $http, $window) {
       $rootScope.charChoose = JSON.parse(sessionStorage.getItem('charChoose'));
       console.log($rootScope.charChoose)
   }
})();