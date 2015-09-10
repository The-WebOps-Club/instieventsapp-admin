var app = angular.module('MyApp', ['ngRoute', 'ngMaterial','ngStorage']);


var server = 'http://10.21.211.165:9000/';


app.config(function ($routeProvider){
  $routeProvider
  
  .when('/login',
  {
    controller:'LoginCtrl',
    templateUrl:'views/login-material.html'
    })
  .when('/core',
  {
    controller:'coreCtrl',
    templateUrl:'views/core.html'
    })
  .when('/sec',
  {
    controller:'secCtrl',
    templateUrl:'views/sec.html'
    })
  .when('/convenor',
  {
    controller:'convenorCtrl',
    templateUrl:'views/convenor.html'
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
        if (response.data.user.role.name=="core") {$location.path('/core');};
        if (response.data.user.role.name=="convenor") {$location.path('/convenor');};
        if (response.data.user.role.name=="sec") {$location.path('/sec');};

        
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

app.controller('convenorCtrl', function($scope, $http, $location, userService,  $localStorage,$mdSidenav) {
  
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

  $scope.hostels = ["Alakananda","Brahmaputra","Bhadra","Cauvery","Ganga","Godavari","Jamuna","Krishna","Mahanadi","Mandakini","Narmada","Pampa","Sabarmathi","Saraswathi","Sarayu","Sharavathi","Sindhu","Tamiraparani","Tapti","Tunga"];

  $scope.updateClub = function(currentClub){
    
    var req = {
     method: 'PUT',
     url: server + 'api/clubs/'+ currentClub._id,
     headers: {
       'Authorization': 'Bearer '+ $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: currentClub
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully updated');
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

   $scope.changePassword = function(newPassword){
    
    var req = {
     method: 'PUT',
     url: server + '/api/admins/' + $localStorage.user._id + '/password',
     headers: {
       'Authorization': 'Bearer '+ $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: newPassword
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully changed');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }



});

app.controller('secCtrl', function($scope, $http, $location, userService,  $localStorage,$mdSidenav) {
  
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

  $scope.hostels = ["Alakananda","Brahmaputra","Bhadra","Cauvery","Ganga","Godavari","Jamuna","Krishna","Mahanadi","Mandakini","Narmada","Pampa","Sabarmathi","Saraswathi","Sarayu","Sharavathi","Sindhu","Tamiraparani","Tapti","Tunga"];

  $scope.updateClub = function(currentClub){
    
    var req = {
     method: 'PUT',
     url: server + 'api/clubs/'+ currentClub._id,
     headers: {
       'Authorization': 'Bearer '+ $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: currentClub
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully updated');
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

   $scope.changePassword = function(newPassword){
    
    var req = {
     method: 'PUT',
     url: server + 'api/admins/' + $localStorage.user._id + '/password',
     headers: {
       'Authorization': 'Bearer '+ $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: newPassword
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully changed');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }

  $scope.addSec = function(sec){

    sec.password="";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for( var i=0; i < 6; i++ )
        sec.password += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(sec);
    var req = {
     method: 'POST',
     url: server + 'api/admins/sec/sec',
     headers: {
       'Authorization': 'Bearer ' + $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data : sec
    }
    $http(req).then(function(response){
        alert('successfully added');
        console.log(response);
      }, 
      function(response){
        console.log(response);
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }

  $scope.addCore = function(core){
    core.password="";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for( var i=0; i < 6; i++ )
        core.password += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(core);
    var req = {
     method: 'POST',
     url: server + 'api/admins/sec/core',
     headers: {
       'Authorization': 'Bearer ' + $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data : core
    }
    $http(req).then(function(response){
        alert('successfully added');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
      
       $scope.removeExistingConvenor = function(convenor) { 
       var index = $scope.currentClub.convenors.indexOf(convenor);
       $scope.currentClub.convenors.splice(index, 1);     
       }
  }

    $scope.changePassword = function(newPassword){
    
    var req = {
     method: 'PUT',
     url: server + 'api/admins/' + $localStorage.user._id + '/password',
     headers: {
       'Authorization': 'Bearer '+ $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: newPassword
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully changed');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }


});

app.controller('coreCtrl', function($scope, $http, $location, $mdSidenav, userService,  $localStorage) {
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

  $scope.hostels = ["Alakananda","Brahmaputra","Bhadra","Cauvery","Ganga","Godavari","Jamuna","Krishna","Mahanadi","Mandakini","Narmada","Pampa","Sabarmathi","Saraswathi","Sarayu","Sharavathi","Sindhu","Tamiraparani","Tapti","Tunga"];

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
    convenor.password="";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for( var i=0; i < 6; i++ )
        convenor.password += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(convenor);
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

    $scope.pushnewConvenor = function(newConvenor){
    $scope.currentClub.convenors.push(angular.copy(newConvenor));
  }


 $scope.removeConvenor = function(convenor) { 
  var index = $scope.convenors.indexOf(convenor);
  $scope.convenors.splice(index, 1);     
}

  $scope.removeExistingConvenor = function(convenor) { 
  var index = $scope.currentClub.convenors.indexOf(convenor);
  $scope.currentClub.convenors.splice(index, 1);     
}

$scope.removeEvent = function(event) { 
  var index = $scope.events.indexOf(event);
  $scope.events.splice(index, 1);     
}
  $scope.updateClub = function(currentClub){
    
    var req = {
     method: 'PUT',
     url: server + 'api/clubs/'+ currentClub._id,
     headers: {
       'Authorization': 'Bearer '+ $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: currentClub
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully updated');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }
  
  $scope.updateEvent = function(currentEvent){
    
    var req = {
     method: 'PUT',
     url: server + 'api/events/'+ currentEvent._id,
     headers: {
       'Authorization': 'Bearer '+ $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: currentEvent
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully updated');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }

  $scope.changePassword = function(newPassword){
    
    var req = {
     method: 'PUT',
     url: server + 'api/admins/' + $localStorage.user._id + '/password',
     headers: {
       'Authorization': 'Bearer '+ $localStorage.token,
       'Content-Type' : 'application/json'
     },
     data: newPassword
    }
    $http(req).then(function(response){
        console.log(response);
        alert('successfully changed');
      }, 
      function(response){
        if (response.status == 401){
          $location.path('login');
        } else alert(response.data.errors.message);
      });
  }

});