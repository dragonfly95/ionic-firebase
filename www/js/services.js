angular.module('starter.services', [])
/*
 * https://firebase.google.com/support/guides/firebase-web#get_a_database_reference_numbered
*/

.factory('Auth', function($firebaseAuth) {
  var auth = $firebaseAuth();
  return auth;
})

.factory('Users', function($q){

  return {
    getUser: function() {

      var deferred = $q.defer();

      var auth = firebase.auth();
      auth.onAuthStateChanged(function(user) {
        if (user) {
          deferred.resolve(user);
        } else {
          deferred.reject('User logged out');
          // User logged out
          console.log('User logged out');
        }
      });

      return deferred.promise;
    }
  }
})

/*Faq */
.factory('FaqFactory', ['$firebaseObject',function($firebaseObject) {
  var rootRef = firebase.database().ref();
  var faqRef = rootRef.child('faq');

  var faq = $firebaseObject(faqRef);

  return faqRef;

}])

/*Helpme */
.factory('HelpmeFactory', ['$firebaseObject',function($firebaseObject) {
  var rootRef = firebase.database().ref();
  var helpmeRef = rootRef.child('helpme');

  return helpmeRef;

}])
/*Resolve */
.factory('ResolveFactory', ['$firebaseObject',function($firebaseObject) {
  var rootRef = firebase.database().ref();
  var resolveRef = rootRef.child('helpme');

  return resolveRef;

}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
