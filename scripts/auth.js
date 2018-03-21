angular.module('betApp').factory('auth', ['$http', '$window','$state', function($http, $window,$state){

var auth = {};

auth.saveToken = function (token){
  $window.localStorage['bet-token'] = token;
};

auth.getToken = function (){
  return $window.localStorage['bet-token'];
};
auth.isLoggedIn = function(){
  var token = auth.getToken();

  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

auth.currentUser = function(){
  if(auth.isLoggedIn()){
    var token = auth.getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload;
  }
};

auth.register = function(user){

    return $http.post('/register', user).success(function(data){
      auth.saveToken(data.token);
    })
    .error(function(err){
      console.log(err);
    });

};
auth.logIn = function(user){

    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    })
    .error(function(err){

    });

};
auth.logOut = function(){
  $window.localStorage.removeItem('bet-token');
  $state.go('landingpage');
};

  return auth;
}])