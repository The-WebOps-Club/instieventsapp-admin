var app = angular.module('MyApp', ['ngRoute', 'ngMaterial','ngStorage']);

var server = 'http://192.168.0.7:9000/';

app.config(function ($routeProvider){
  $routeProvider
  .when('/index',
  {
    controller:'CoreCtrl',
    templateUrl:'views/core.html'
    })
  .when('/login',
  {
    controller:'LoginCtrl',
    templateUrl:'views/login-material.html'
    })
  .otherwise({ redirectTo:'/login'});

});

app.service('userService', function() {
  var user = {
    role : {
      name : 'Not defined'
    }
  };

  var saveUser = function(userObj) {
      user = userObj;
  };

  var getUser = function(){
      return user;
  };

  

  return {
    saveUser: saveUser,
    getUser: getUser
  };

});

app.controller('LoginCtrl', function($scope, $http, $location, userService,  $localStorage) {
  $scope.login = function(){
    var username = $scope.username;
    var password = $scope.password;
    if (username && password){
      $http.post( server + 'auth/local/admin/', 
        {rollNumber: username, password : password}).
      then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data);
        $localStorage.user = response.data.user;
        $localStorage.token = response.data.token;
        userService.saveUser(response.data.user);
        $location.path('index');
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(response.data.message);
    });
    } else {
      alert("Don't leave fields empty");
    }
  }
});

app.controller('CoreCtrl', function($scope, $http, $location, $mdSidenav, userService,  $localStorage) {
  // $scope.user = userService.getUser();
  $scope.user = $localStorage.user;
  $scope.openSideNavPanel = function() {
    $mdSidenav('left').open();
  };
  $scope.closeSideNavPanel = function() {
    $mdSidenav('left').close();
  };
  $scope.action = 'addClub';
  $scope.addClub = function(club){
    var req = {
     method: 'POST',
     url: server + 'api/clubs',
     headers: {
       'Authorization': 'Bearer ' + $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: { 'name' : club.name, 
      'description' : club.description 
     }
    }
    $http(req).then(function(response){
        alert('successfully added');
      }, 
      function(response){
        alert(response.data.errors.message);
        console.log(response.data.errors);
      });
  }

});