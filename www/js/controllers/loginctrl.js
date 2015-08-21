var app = angular.module('MyApp', ['ngRoute', 'ngMaterial']);

var server = 'http://192.168.0.6:9000/';

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

app.controller('LoginCtrl', function($scope, $http, $location) {
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
        $scope.role = response.data.user.role.name;
        // userService.saveUser(response.data.user);
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

app.controller('CoreCtrl', function($scope, $http, $location, $mdSidenav) {
  console.log("CoreCtrl");
  $scope.openSideNavPanel = function() {
    $mdSidenav('left').open();
  };
  $scope.closeSideNavPanel = function() {
    $mdSidenav('left').close();
  };
  $scope.action = 'addClub';
});