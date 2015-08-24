var app = angular.module('MyApp', ['ngRoute', 'ngMaterial','ngStorage']);


var server = 'http://127.0.0.1:9000/';


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

var compare = function() {

    return {
        require: "ngModel",
        restrict: 'A',
        scope: {
            otherModelValue: "=compare"
        },
        link: function(scope, element, attributes, ngModel) {
          console.log(scope, element);
            
            ngModel.$validators.compare = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

app.directive("compare", compare);

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
  $scope.action = 'home';

  // Request to get all events
  var eventsReq = {
     method: 'GET',
     url: server + 'api/events',
     headers: {
       'Authorization': 'Bearer ' + $localStorage.token,
     }
  }
  $http(eventsReq).then(function(response){
        console.log(response);
        $localStorage.events = response.data;
        $scope.events = response.data;
      }, 
      function(response){
          console.log(response);
          if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });

  // Request to load all clubs
  var clubReq = {
     method: 'GET',
     url: server + 'api/clubs',
     headers: {
       'Authorization': 'Bearer ' + $localStorage.token,
     }
  }
  $http(clubReq).then(function(response){
        console.log(response);
        $localStorage.clubs = response.data;
        $scope.clubs = response.data;
      }, 
      function(response){
          console.log(response);
          if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });


  $scope.addClub = function(club){
    club.convenors = $scope.convenors;
    var req = {
     method: 'POST',
     url: server + 'api/clubs',
     headers: {
       'Authorization': 'Bearer ' + $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: club
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully added');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }

    $scope.addEvent = function(event){
    
    var req = {
     method: 'POST',
     url: server + 'api/events',
     headers: {
       'Authorization': 'Bearer ' + $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: event
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully added');
      }, 
      function(response){
        console.log(response);
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }

  $scope.editEvent = function(event){
    $scope.action = 'editEvent';
    $scope.currentEvent = event;
  }

    $scope.editClub = function(club){
    $scope.action = 'editClub';
    $scope.currentClub = club;
  }

  $scope.addConvenor = function(convenor){
    convenor.password="asdf";
    var req = {
     method: 'POST',
     url: server + 'api/admins/addConvenor',
     headers: {
       'Authorization': 'Bearer ' + $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data : convenor
    }
    $http(req).then(function(response){
        alert('successfully added');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }

  $scope.convenors = [];
  $scope.pushConvenor = function(newConvenor){
    $scope.convenors.push(angular.copy(newConvenor));
  }

 $scope.removeConvenor = function(convenor) { 
  var index = $scope.convenors.indexOf(convenor);
  $scope.convenors.splice(index, 1);     
}

$scope.removeEvent = function(event) { 
  var index = $scope.events.indexOf(event);
  $scope.events.splice(index, 1);     
}

});