angular.module('betApp').controller('mainCtrl', [
'$scope','$location','cuponFactory','auth','$timeout',

function($scope,$location,cuponFactory,auth,$timeout){

	$scope.currentUser=auth.currentUser().name;
	console.log($scope.currentUser)
	
	$timeout(function(){
		$scope.kupony = cuponFactory.getKupon();
	},100)

	var isListHide=true;
	$scope.isActive = function (viewLocation) {
 		var active = (viewLocation === $location.path());
 		return active;
	};

	$scope.runPanel = function(event){
		var kuponElement = document.getElementById("cupon-list")
		if(isListHide==true){
			kuponElement.style.animationName="slideLeft ";
			kuponElement.style.right="300px";
		}else{
			kuponElement.style.animationName="slideRight ";
			kuponElement.style.right="0";
		}
		isListHide=!isListHide;
	}
	$scope.removeElement = function(item){
		cuponFactory.removeMecz(item);
	}
	$scope.logout = function(){
		auth.logOut();
	}
	$scope.save=function(){
		cuponFactory.saveCupon();
	}
	$scope.delete=function(){
		cuponFactory.removeCupon();
	}
}]);