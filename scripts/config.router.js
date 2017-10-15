/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
(function() {
    'use strict';
    angular
      .module('app')
      .run(runBlock)
      .config(config);

      runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
      function runBlock($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;

          $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
              if (toState.name !== 'app.login' && toState.name !== 'app.register' && toState.name !== 'app.forgot-pass') {
                  var value = [];
                  value.isLogin = sessionStorage.getItem(LOCALSTORAGE_USER) || false;
                  if(!value.isLogin) {
                      setTimeout(() => { $state.go('app.login') }, 0);
                  }
              }
            //   console.log("$stateChangeSuccess " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
          });
      }

      config.$inject =  ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG', '$locationProvider', 'toastrConfig'];
      function config( $stateProvider,   $urlRouterProvider,   MODULE_CONFIG , $locationProvider, toastrConfig) {

        angular.extend(toastrConfig, {
          autoDismiss: false,
          containerId: 'toast-container',
          maxOpened: 0,
          newestOnTop: true,
          positionClass: 'toast-bottom-right',
          preventDuplicates: false,
          preventOpenDuplicates: false,
          target: 'body'
        });

        var p = getParams('layout'),
            l = p ? p + '.' : '',
            layout = 'views/layout/layout.'+l+'html';
            // dashboard = 'views/dashboard/dashboard.'+l+'html';

        // $locationProvider.html5Mode(true);
        $urlRouterProvider
          .otherwise('/app/login');

        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: 'views/layout/layout.1.html'
              }
            },
            resolve: load(['ui.bootstrap', 'scripts/controllers/bootstrap.js'])
          })

            .state('app.register', {
                url: '/register',
                templateUrl: 'apps/account/register/register.html',
                data : { title: 'Register' },
                controller: "RegisterCtrl",
                resolve: load('apps/account/register/register.js')
            })

            .state('app.login', {
                url: '/login',
                templateUrl: 'apps/account/login/login.html',
                data : { title: 'Login' },
                controller: "LoginCtrl",
                resolve: load('apps/account/login/login.js')
            })

            .state('app.forgot-pass', {
                url: '/forgot-pass',
                templateUrl: 'apps/account/forgot_pass/forgot_pass.html',
                data : { title: 'Forgot Pass' },
                controller: "ForgotPassCtrl",
                resolve: load('apps/account/forgot_pass/forgot_pass.js')
            })

            // account router
            .state('app.account', {
                url: '/account',
                template: '<div ui-view></div>'
            })
            .state('app.account.info', {
                url: '/info',
                templateUrl: 'apps/account/account.html',
                data : { title: 'Account Info' },
                controller: "AccountCtrl",
                resolve: load('apps/account/account.js')
            })
            .state('app.account.change-pass-1', {
                url: '/change-pass-1',
                templateUrl: 'apps/account/change_account_info/change_account_info.html',
                data : { title: 'Đổi mật khẩu cấp 1', action_type : 1, lable_text: 'Mật khẩu cấp 1 mới' },
                controller: "ChangeAccountInfoCtrl",
                resolve: load('apps/account/change_account_info/change_account_info.js')
            })
            .state('app.account.change-pass-2', {
                url: '/change-pass-2',
                templateUrl: 'apps/account/change_account_info/change_account_info.html',
                data : { title: 'Đổi mật khẩu cấp 2', action_type : 2, lable_text: 'Mật khẩu cấp 2 mới' },
                controller: "ChangeAccountInfoCtrl",
                resolve: load('apps/account/change_account_info/change_account_info.js')
            })
            .state('app.account.change-sno-number', {
                url: '/change-sno-number',
                templateUrl: 'apps/account/change_account_info/change_account_info.html',
                data : { title: 'Đổi 7 số bí mật', action_type : 3, lable_text: '7 Số bí mật mới' },
                controller: "ChangeAccountInfoCtrl",
                resolve: load('apps/account/change_account_info/change_account_info.js')
            })
            .state('app.account.change-phone-number', {
                url: '/change-phone-number',
                templateUrl: 'apps/account/change_account_info/change_account_info.html',
                data : { title: 'Đổi số điện thoại', action_type : 4, lable_text: 'Số điện thoại mới' },
                controller: "ChangeAccountInfoCtrl",
                resolve: load('apps/account/change_account_info/change_account_info.js')
            })
            .state('app.account.change-email', {
                url: '/change-email',
                templateUrl: 'apps/account/change_account_info/change_account_info.html',
                data : { title: 'Đổi Email', action_type : 5, lable_text: 'Email mới'},
                controller: "ChangeAccountInfoCtrl",
                resolve: load('apps/account/change_account_info/change_account_info.js')
            })

            // bank router
            .state('app.bank', {
                url: '/bank',
                template: '<div ui-view></div>'
            })
            .state('app.bank.info', {
                url: '/info',
                templateUrl: 'apps/bank/bank_info.html',
                data : { title: 'Bank Info' },
                controller: "BankInfoCtrl",
                resolve: load('apps/bank/bank_info.js')
            })
            .state('app.bank.transfer', {
                url: '/transfer',
                templateUrl: 'apps/bank/transfer/transfer.html',
                data : { title: 'Bank Transfer' },
                controller: "TransferCtrl",
                resolve: load('apps/bank/transfer/transfer.js')
            })
            .state('app.bank.change-money', {
                url: '/change-money',
                templateUrl: 'apps/bank/change_money/change_money.html',
                data : { title: 'Bank Change Money' },
                controller: "ChangeMoneyCtrl",
                resolve: load('apps/bank/change_money/change_money.js')
            })
            .state('app.bank.item-sliver', {
                url: '/item-sliver',
                templateUrl: 'apps/bank/item_sliver/item_sliver.html',
                data : { title: 'Buy Sell Item Sliver' },
                controller: "ItemSliverCtrl",
                resolve: load('apps/bank/item_sliver/item_sliver.js')
            })
            .state('app.bank.jewel-action', {
                url: '/jewel-action',
                templateUrl: 'apps/bank/jewel_action/jewel_action.html',
                data : { title: 'Jewel Action' },
                controller: "JewelActionCtrl",
                resolve: load('apps/bank/jewel_action/jewel_action.js')
            })
            // ui router
            .state('app.character', {
                url: '/character',
                template: '<div ui-view></div>'
            })
            .state('app.character.info', {
                url: '/info',
                templateUrl: 'apps/character/charinfo.html',
                data : { title: 'Char Info' },
                controller: "CharInfoCtrl",
                params: {
                    'data': null,
                },
                resolve: load('apps/character/charinfo.js')
            })
            .state('app.character.add-point', {
                url: '/add-point',
                templateUrl: 'apps/character/add_point/add_point.html',
                data: { title: 'Add Point' },
                controller: "AddPointCtrl",
                resolve: load('apps/character/add_point/add_point.js')
            })
            .state('app.character.delete-inventory', {
                url: '/delete-inventory',
                templateUrl: 'apps/character/delete_inventory/delete_inventory.html',
                data: { title: 'Delete Inventory' },
                controller: "DeleteInventoryCtrl",
                resolve: load('apps/character/delete_inventory/delete_inventory.js')
            })
            .state('app.character.reset-point', {
                url: '/reset-point',
                templateUrl: 'apps/character/reset_point/reset_point.html',
                data: { title: 'Reset Point' },
                controller: "ResetPointCtrl",
                resolve: load('apps/character/reset_point/reset_point.js')
            })
            .state('app.character.reset-skill-master', {
                url: '/reset-skill-master',
                templateUrl: 'apps/character/reset_skill_master/reset_skill_master.html',
                data: { title: 'Reset Skill Master' },
                controller: "ResetSkillMasterCtrl",
                resolve: load('apps/character/reset_skill_master/reset_skill_master.js')
            })
            .state('app.character.lock-item', {
                url: '/lock-item',
                templateUrl: 'apps/character/lock_item/lock_item.html',
                data: { title: 'Lock Item' },
                controller: "LockItemCtrl",
                resolve: load('apps/character/lock_item/lock_item.js')
            })
            .state('app.character.move-lorencia', {
                url: '/move-lorencia',
                templateUrl: 'apps/character/move_lorencia/move_lorencia.html',
                data: { title: 'Move Lorencia' },
                controller: "MoveLorenciaCtrl",
                resolve: load('apps/character/move_lorencia/move_lorencia.js')
            })
            .state('app.character.clear-pk', {
                url: '/clear-pk',
                templateUrl: 'apps/character/clear_pk/clear_pk.html',
                data: { title: 'Clear PK' },
                controller: "ClearPKCtrl",
                resolve: load('apps/character/clear_pk/clear_pk.js')
            })
            .state('app.character.resets', {
                url: '/resets',
                templateUrl: 'apps/character/resets/reset.html',
                data: { title: 'Reset Character' },
                controller: "ResetsCtrl",
                resolve: load('apps/character/resets/reset.js')
            })
            // bank router
            .state('app.event', {
                url: '/event',
                template: '<div ui-view></div>'
            })
            .state('app.event.check-in', {
                url: '/check-in',
              templateUrl: 'apps/event/event_check_in/main.html',
              data : { title: 'Calendar' },
              controller: 'FullcalendarCtrl',
              resolve: load(['moment', 'fullcalendar', 'ui.calendar','apps/event/event_check_in/calendar.js'])
            })
            // web shop
            .state('app.shop', {
                url: '/shop',
                template: '<div ui-view></div>'
            })
            .state('app.shop.ware-house', {
                url: '/ware-house',
                templateUrl: 'apps/webshop/ware_house/ware_house.html',
                data: { title: 'Ware House' },
                controller: "WareHouseCtrl",
                resolve: load('apps/webshop/ware_house/ware_house.js')
            })
            .state('app.shop.super-market', {
                url: '/super-market',
                templateUrl: 'apps/webshop/super_market/super_market.html',
                data: { title: 'Super Market' },
                controller: "SuperMarketCtrl",
                resolve: load('apps/webshop/super_market/super_market.js')
            })
          ;

        function load(srcs, callback) {
          return {
              deps: ['$ocLazyLoad', '$q',
                function( $ocLazyLoad, $q ){
                  var deferred = $q.defer();
                  var promise  = false;
                  srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                  if(!promise){
                    promise = deferred.promise;
                  }
                  angular.forEach(srcs, function(src) {
                    promise = promise.then( function(){
                      angular.forEach(MODULE_CONFIG, function(module) {
                        if( module.name == src){
                          src = module.module ? module.name : module.files;
                        }
                      });
                      return $ocLazyLoad.load(src);
                    } );
                  });
                  deferred.resolve();
                  return callback ? promise.then(function(){ return callback(); }) : promise;
              }]
          }
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
      }
})();
