(function() {
    'use strict';
    angular
        .module('app')
        .controller('FullcalendarCtrl', FullcalendarCtrl);

        function FullcalendarCtrl($scope, $window, $http, toastr) {
          var vm = $scope;
          var date = new Date();
          var d = date.getDate();
          var m = date.getMonth();
          var y = date.getFullYear();

          vm.events = [];
          /* event source that pulls from google.com */
          /* event source that contains custom events on the scope */
          vm.viewRender = function (view) {
            var start_date = moment(view.start).format('YYYY-MM-DD');
            var end_date = moment(view.end).format('YYYY-MM-DD');
            var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

            var url = SERVER_API + 'event/checkInEventList';
            var data = {
              start_date: start_date,
              end_date: end_date,
              account: account
            };
            $http.post(url, data, set_header(), {
              withCredentials: true
            }).then(function (response) {
              if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                $scope.eventCount = response.data.data.length;
                $scope.stillEvent = response.data.data[$scope.eventCount - 1].day_check;
                var colorEvent = 'lime-500';
                response.data.data.map(function(result) {
                  if(result.day_check > 7 && result.day_check <=14) {
                    colorEvent = 'light-green-500';
                  } else if (result.day_check > 14 && result.day_check <= 21) {
                    colorEvent = 'green-500';
                  } else if (result.day_check > 21 && result.day_check <= 28) {
                    colorEvent = 'teal-500';
                  } else if (result.day_check > 28) {
                    colorEvent = 'blue-500';
                  }

                  var events = {
                    title: 'Checked',
                    start: new Date(result.time),
                    className: [colorEvent],
                    location: result.location,
                    info: result.description
                  };
                  vm.events.push(events);
                });
              }
            }, function (err) {
              $scope.isServerError = false;
            });
          };

          vm.submit = function () {
            $.getJSON('//freegeoip.net/json/?callback=?', function (result) {
              var account = JSON.parse($window.sessionStorage.getItem(LOCALSTORAGE_USER)).memb___id;

              var url = SERVER_API + "event/addCheckIn";
              var data = {
                account: account,
                location: result.region_name
                // time: moment.utc().format('YYYY-MM-DD HH:mm:ss')
              };
              $http.post(url, data, set_header(), {
                withCredentials: true
              }).then(function (response) {
                vm.res = response.data;

                if (response.data.status === RESPONSE_STATUS_SUCCESS) {
                  var colorEvent = 'lime-500';
                  if (response.data.data.day_check > 7 && response.data.data.day_check <= 14) {
                    colorEvent = 'light-green-500';
                  } else if (response.data.data.day_check > 14 && response.data.data.day_check <= 21) {
                    colorEvent = 'green-500';
                  } else if (response.data.data.day_check > 21 && response.data.data.day_check <= 28) {
                    colorEvent = 'teal-500';
                  } else if (response.data.data.day_check > 28) {
                    colorEvent = 'blue-500';
                  }

                  vm.events.push({
                    title: 'Checked',
                    start: new Date(response.data.data.time),
                    className: [colorEvent],
                    location: response.data.data.location,
                    info: response.data.data.description
                  });

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

              $window.scrollTo(0, 0);
            });
          };
          // vm.events = [
          //   {title:'All Day Event', start: new Date(y, m, 1), className: ['white'], location:'New York', info:'This a all day event that will start from 9:00 am to 9:00 pm, have fun!'},
          //   {title:'Dance class', start: new Date(y, m, 3), end: new Date(y, m, 4, 9, 30), allDay: false, className: ['danger'], location:'London', info:'Two days dance training class.'},
          //   {title:'Game racing', start: new Date(y, m, 6, 16, 0), className: ['white'], location:'Hongkong', info:'The most big racing of this year.'},
          //   {title:'Soccer', start: new Date(y, m, 8, 15, 0), className: ['info'], location:'Rio', info:'Do not forget to watch.'},
          //   {title:'Family', start: new Date(y, m, 9, 19, 30), end: new Date(y, m, 9, 20, 30), className: ['white'], info:'Family party'},
          //   {title:'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), className: ['success'], location:'HD City', info:'It is a long long event'},
          //   {title:'Play game', start: new Date(y, m, d - 1, 16, 0), className: ['white'], location:'Tokyo', info:'Tokyo Game Racing'},
          //   {title:'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, className: ['white'], location:'New York', info:'Party all day'},
          //   {title:'Repeating Event', start: new Date(y, m, d + 4, 16, 0), alDay: false, className: ['white'], location:'Home Town', info:'Repeat every day'},      
          //   {title:'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: ['white']},
          //   {title:'Feed cat', start: new Date(y, m+1, 6, 18, 0), className: ['success']}
          // ];

          /* alert on dayClick */
          vm.precision = 400;
          vm.lastClickTime = 0;
          vm.alertOnEventClick = function( date, jsEvent, view ){
            // var time = new Date().getTime();
            // if(time - vm.lastClickTime <= vm.precision){
            //     vm.events.push({
            //       title: 'New Event',
            //       start: date,
            //       className: ['white b-l-2x b-l-info']
            //     });
            // }
            // vm.lastClickTime = time;
          };
          /* alert on Drop */
          vm.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
             vm.alertMessage = ('Event Droped to make dayDelta ' + delta);
          };
          /* alert on Resize */
          vm.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
             vm.alertMessage = ('Event Resized to make dayDelta ' + delta);
          };

          vm.overlay = $('.fc-overlay');
          vm.alertOnMouseOver = function( event, jsEvent, view ){
            vm.event = event;
            vm.overlay.removeClass('left right top').find('.arrow').removeClass('left right top pull-up');
            var wrap = $(jsEvent.target).closest('.fc-event');
            var cal = wrap.closest('.calendar');
            var left = wrap.offset().left - cal.offset().left;
            var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
            var top = cal.height() - (wrap.offset().top - cal.offset().top + wrap.height());
            if( right > vm.overlay.width() ) { 
              vm.overlay.addClass('left').find('.arrow').addClass('left pull-up')
            }else if ( left > vm.overlay.width() ) {
              vm.overlay.addClass('right').find('.arrow').addClass('right pull-up');
            }else{
              vm.overlay.find('.arrow').addClass('top');
            }
            if( top < vm.overlay.height() ) { 
              vm.overlay.addClass('top').find('.arrow').removeClass('pull-up').addClass('pull-down')
            }
            (wrap.find('.fc-overlay').length == 0) && wrap.append( vm.overlay );
          }

          /* config object */
          vm.uiConfig = {
            calendar:{
              height: 450,
              // editable: true,
              header:{
                left: 'prev',
                center: 'title',
                right: 'next'
              },
              defaultView: 'month',
              dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
              viewRender: vm.viewRender,
              dayClick: vm.alertOnEventClick,
              eventDrop: vm.alertOnDrop,
              eventResize: vm.alertOnResize,
              eventMouseover: vm.alertOnMouseOver
            }
          };
          
          /* add custom event*/
          vm.addEvent = function() {
            vm.events.push({
              title: 'New Event',
              start: new Date(y, m, d),
              className: ['white b-l-info b-l-2x']
            });
          };

          /* remove event */
          vm.remove = function(index) {
            vm.events.splice(index,1);
          };

          /* Change View */
          vm.changeView = function(view, calendar) {
            $('.calendar').fullCalendar('changeView', view);
          };

          vm.today = function(calendar) {
            $('.calendar').fullCalendar('today');
          };

          /* event sources array*/
          vm.eventSources = [vm.events];
        }
})();
