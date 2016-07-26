angular.module('starter.controllers', [])

.controller('DashCtrl', function(Auth,$ionicLoading, $ionicPopup,$scope, $state) {

  $state.reload();
  $scope.login = login;

  function login(user) {

    $ionicLoading.show({
      template:'Loading...'
    }).then(function(){

      Auth.$signInWithEmailAndPassword(user.email, user.password)
        .then(function(user) {
          // $state.go('tab.profile');

          $state.go('tab.faqList');
          $ionicLoading.hide();

        },function(error) {
          console.log('failure');
          $ionicLoading.hide();

          $ionicPopup.alert({
            title: '로그인 오류',
            template: '로그인 정보가 맞지 않습니다.\n계정정보를 확인해주세요.'
          });

        });

    }); // ionicLoading...

  }

  $scope.register = function(user) {

    registerDevice()
      .then(function(deviceToken) {

        Auth.$createUserWithEmailAndPassword(user.email, user.password)
          .then(function(user) {
            login(user);
          },function(error){
            console.log(error);
            $scope.error = error;
          });

      }); // registerDevice



  }

  //====================================================
  //  Helper
  //====================================================
  function registerDevice() {
    var push = new $window.Ionic.Push({
      onNotification: function() {
        $window.alert('새로운 댓글이 달렸습니다.');
      }
    });
    var deferred = $q.defer();
    push.register(function(callbackData) {
      var deviceToken = callbackData._token;
      deferred.resolve(deviceToken);
    });
    return deferred.promise;
  }


})
.controller('ProfileCtrl', function(Auth, Users, $scope) {
// .controller('ProfileCtrl', function(Auth, Users, md5, $scope) {
  console.log(Users.getUser());


  var params = {
    uid : Users.uid,
    email : Users.email,
    displayName : Users.displayName
  };

  $scope.profile = params;

  $scope.profileUpdate = function(user) {
    // $scope.profile.emailHash = md5.createHash(auth.password.email);
    $scope.profile.$save();
  };

})

//==========================
// Faq
//==========================
.controller('FaqListCtrl', function(availableAccess,faqList,$scope,$state) {

  $scope.faqList = faqList;


  // $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
  //   // angular.copy(faqList, $scope.faqList);
  //   alert('');
  // });


  $scope.remove = function(faq) {
    console.log(faq);
    alert('삭제했다 칩시다.');
  };

  $scope.goFaq = function() {
    $state.go('tab.faqCreate');
  };
})

.controller('FaqDetailCtrl', function(Auth, faqObject ,$scope) {

  $scope.faqObject = faqObject.val();
  $scope.faqId = faqObject.key;

})

.controller('FaqCreateCtrl', function(Auth, Users, FaqFactory,
   $ionicLoading, $scope, $state, $location) {

  $scope.faqCreate = function(faq) {

    $ionicLoading.show({
      template: 'Faq saving..'
    }).then(function() {

      // Get a key for a new Post.
      var newPostKey = FaqFactory.push().key;
      // faq.faqId = newPostKey;
      // console.log(newPostKey);

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/' + newPostKey] = faq;

      FaqFactory.update(updates).then(function() {
        $ionicLoading.hide();
        $state.go('tab.faqList');
      });

    });


  }
})

.controller('FaqUpdateCtrl', function(Auth, faqObject, FaqFactory, $ionicLoading, $scope, $state) {

  $scope.faq = faqObject.val();

  $scope.faqUpdate = function(faq) {

    $ionicLoading.show({
      template:'Update faq'
    }).then(function() {
      var updates = {};
      updates['/' + faqObject.key] = faq;

      FaqFactory.update(updates).then(function() {
        $state.go('tab.faqList');
        $ionicLoading.hide();
      });
    });
  };

  $scope.faqUpdateCancel = function(){
    $state.go('tab.faqList');
  };

})

//==========================
//
//==========================
.controller('HelpmeCreateCtrl', function(Auth, Users, HelpmeFactory, $cordovaCamera, $ionicLoading,$scope,$state) {


  $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;

          // // Create a root reference
          // var storageRef = firebase.storage().ref();
          //
          // // File or Blob, assume the file is called rivers.jpg
          // var file = ...
          //
          // // Upload the file to the path 'images/rivers.jpg'
          // // We can use the 'name' property on the File API to get our file name
          // var uploadTask = storageRef.child('images/' + file.name).put(file);
          //
          // // Register three observers:
          // // 1. 'state_changed' observer, called any time the state changes
          // // 2. Error observer, called on failure
          // // 3. Completion observer, called on successful completion
          // uploadTask.on('state_changed', function(snapshot){
          //   // Observe state change events such as progress, pause, and resume
          //   // See below for more detail
          // }, function(error) {
          //   // Handle unsuccessful uploads
          // }, function() {
          //   // Handle successful uploads on complete
          //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          //   var downloadURL = uploadTask.snapshot.downloadURL;
          // });

      }, function (err) {
          // An error occured. Show a message to the user
      });
  };

  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          // An error occured. Show a message to the user
      });
  };



  $scope.helpmeCreate = function(helpme) {

    $ionicLoading.show({
      template: 'Loading...'
    }).then(function() {

      Users.getUser().then(function(data){
        helpme.uid = data.uid;
        helpme.displayName = data.displayName;
      });
      // helpme.uid = Users.getUser().uid;
      // helpme.displayName = Users.getUser().displayName;

      // Get a key for a new Post.
      var newPostKey = HelpmeFactory.push().key;
      // helpme.helpmeId = newPostKey;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/' + newPostKey] = helpme;

      HelpmeFactory.update(updates).then(function() {
        $state.go('tab.helpmeList');
        $ionicLoading.hide();
      });


    });


  };  // helpmeCreate

})
.controller('HelpmeListCtrl', function(availableAccess, helpmeList, HelpmeFactory, $scope,$state) {

  $scope.helpmeList = helpmeList;

  HelpmeFactory.on('value',function(res){
    angular.copy(res.val(), $scope.helpmeList);
  },function(err){
  });

  HelpmeFactory.on("child_changed", function(snapshot) {
    var changedPost = snapshot.val();
    console.log("The updated post title is " + changedPost);
  });

  // Get the data on a post that has been removed
  HelpmeFactory.on("child_removed", function(snapshot) {
    var deletedPost = snapshot.val();
    console.log("The blog post titled '" + deletedPost + "' has been deleted");
  });

  // Retrieve new posts as they are added to our database
  HelpmeFactory.on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    console.log("Author: " + newPost);
    console.log("Previous Post ID: " + prevChildKey);
  });


  $scope.remove = function(faq) {
    console.log(faq);
    alert('삭제했다 칩시다.');
  };

  $scope.goRegistHelpme = function() {
    $state.go('tab.helpmeCreate');
  };

})
.controller('HelpmeDetailCtrl', function(helpmeObject, $scope,$state) {
  $scope.helpmeObject = helpmeObject.val();
  $scope.helpmeId     = helpmeObject.key;
})
.controller('HelpmeUpdateCtrl', function(helpmeObject, HelpmeFactory, $ionicLoading, $scope,$state) {

  $scope.helpme = helpmeObject.val();

  $scope.helpmeUpdate = function(helpme) {

    $ionicLoading.show({
      template:'Saving...'
    }).then(function(){
      var updates = {};
      updates['/' + helpmeObject.key] = helpme;

      HelpmeFactory.update(updates).then(function() {
        $state.go('tab.helpmeList');
        $ionicLoading.hide();
      });
    }); // ionicLoading ...

  }

})


//==========================
//
//==========================
.controller('ListAndResolvedCtrl',function(ResolveFactory, $scope){

})
.controller('DetailAndResolvingCtrl',function(ResolveFactory, $scope){

})
//==========================
//
//==========================
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function(Auth, $scope, $location) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    $location.path('/tab/dash');
    debugger;
  }
});
