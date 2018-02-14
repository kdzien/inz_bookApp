angular.module('betApp').controller('landingCtrl', [
'$scope','$location','$http','auth','$state','$timeout',
function($scope,$location,$http,auth,$state,$timeout){

	$scope.user = {};
	$scope.userRegister = {};
  $scope.loginModal=false;

  $scope.showLoginModal = function(){
    $scope.loginModal=!$scope.loginModal;
  }
  $scope.register = function(){
  	console.log($scope.userRegister);
    auth.register($scope.userRegister).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('main.descBets');
    });
  };

  $scope.login = function(){

    auth.logIn($scope.user).error(function(error){
      console.log(error.message);
      var errorx = document.querySelector('.error');
      errorx.innerHTML=error.message;
      $timeout(function(){
      	errorx.innerHTML=""
      },2000)

    }).then(function(){
      $state.go('main.descBets');
    });

  };

}]);