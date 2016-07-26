// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','firebase', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.constant('FirebaseUrl','https://onnurihelpdesk.firebaseio.com')

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-login' : {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  //===============================
  // FAQ
  //===============================
  .state('tab.faqCreate', {
    url: '/faqCreate',
    views: {
      'tab-dash' : {
        templateUrl: 'templates/faq/tab-faqCreate.html',
        controller: 'FaqCreateCtrl'
      }
    }
  })

  .state('tab.faqList', {
    url: '/faqList',
    views: {
      'tab-dash' : {
        templateUrl: 'templates/faq/tab-faqList.html',
        controller: 'FaqListCtrl',
        resolve: {
          faqList: function(FaqFactory,$q, $state) {

            var deferred = $q.defer();
            FaqFactory.on('value',function(res){
              deferred.resolve(res.val());
            },function(err){
              deferred.reject(err);
            });

            return deferred.promise;
          },
          availableAccess: fn_availableAccess
        }
      }
    }
  })

  .state('tab.faqDetail', {
    url: '/faqDetail/:faqId',
    views: {
      'tab-dash' : {
        templateUrl: 'templates/faq/tab-faqDetail.html',
        controller: 'FaqDetailCtrl',
        resolve: {
          faqObject: function(FaqFactory, $stateParams) {
            return FaqFactory.child($stateParams.faqId).once('value');
          }
        }
      }
    }
  })


  .state('tab.faqUpdate', {
    url: '/faqUpdate/:faqId',
    views: {
      'tab-dash' : {
        templateUrl: 'templates/faq/tab-faqUpdate.html',
        controller: 'FaqUpdateCtrl',
        resolve: {
          faqObject: function(FaqFactory, $stateParams) {
            return FaqFactory.child($stateParams.faqId).once('value');
          }
        }
      }
    }
  })

  //=======================================
  // helpme
  //=======================================
  .state('tab.helpmeCreate', {
    url: '/helpmeCreate',
    views: {
      'tab-helpme' : {
        templateUrl: 'templates/helpme/tab-helpmeCreate.html',
        controller: 'HelpmeCreateCtrl'
      }
    }
  })

  .state('tab.helpmeList', {
    url: '/helpmeList',
    views: {
      'tab-helpme' : {
        templateUrl: 'templates/helpme/tab-helpmeList.html',
        controller: 'HelpmeListCtrl',
        resolve: {
          helpmeList: function(HelpmeFactory, $q) {

            var deferred = $q.defer();
            HelpmeFactory.on('value',function(res){
              deferred.resolve(res.val());
            },function(err){
              deferred.reject(err);
            });


            return deferred.promise;

          }, // helpmeList

          availableAccess: fn_availableAccess

        } // resolve
      }
    }
  })


  .state('tab.helpmeDetail', {
    url: '/helpmeDetail/:helpmeId',
    views: {
      'tab-helpme' : {
        templateUrl: 'templates/helpme/tab-helpmeDetail.html',
        controller: 'HelpmeDetailCtrl',
        resolve: {
          helpmeObject: function(HelpmeFactory, $stateParams) {
            return HelpmeFactory.child($stateParams.helpmeId).once('value');
          }
        } // resolve;
      }
    }
  })


  .state('tab.helpmeUpdate', {
    url: '/helpmeUpdate/:helpmeId',
    views: {
      'tab-helpme' : {
        templateUrl: 'templates/helpme/tab-helpmeUpdate.html',
        controller: 'HelpmeUpdateCtrl',
        resolve: {
          helpmeObject: function(HelpmeFactory, $stateParams) {
            return HelpmeFactory.child($stateParams.helpmeId).once('value');
          }
        } // resolve;
      }
    }
  })

  //==============================
  // resolve
  //==============================
  .state('tab.listAndResolved', {
      url: '/listAndResolved',
      views: {
        'tab-resolve': {
          templateUrl: 'templates/troubleshooter/tab-ListAndResolved.html',
          controller: 'ListAndResolvedCtrl'
        }
      }
    })
  .state('tab.detailAndResolving', {
      url: '/detailAndResolving',
      views: {
        'tab-resolve': {
          templateUrl: 'templates/troubleshooter/tab-DetailAndResolving.html',
          controller: 'DetailAndResolvingCtrl'
        }
      }
    })

  //==============================
  // chat
  //==============================
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  function fn_availableAccess(Users, $state,$ionicPopup,$location) {

    Users.getUser().catch(function(msg){
      var alertPopup = $ionicPopup.alert({
         title: '로그아웃',
         template: msg
       });
     alertPopup.then(function(res){
         $state.go('tab.dash');
        // $location.path('/tab/dash');
         console.log(msg);
       })

    });  // Users.getUser();
  }

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
