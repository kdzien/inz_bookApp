angular.module('betApp').controller('landingCtrl', [
'$scope','$location','$http','auth','$state','$timeout',
function($scope,$location,$http,auth,$state,$timeout){

	$scope.user = {};
	$scope.userRegister = {};
  $scope.loginModal=false;

  $scope.showLoginModal = function(){
    console.log("clicked")
    $scope.loginModal=!$scope.loginModal;
  }
  $scope.register = function(callback){
    auth.register($scope.userRegister).error(function(error){
      $scope.errors = error;
      $timeout(()=>{
        $scope.errors = []  
      },2000)
    }).then(function(){
      $state.go('main.descBets');
    });
  };

  $scope.login = function(){

    auth.logIn($scope.user).error(function(error){
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