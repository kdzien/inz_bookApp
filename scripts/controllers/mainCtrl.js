angular.module('betApp').controller('mainCtrl', [
'$scope','$location','cuponFactory',

function($scope,$location,cuponFactory){

	$scope.kupony = cuponFactory.getKupon();
	var isListHide=true;
	$scope.isActive = function (viewLocation) {
 		var active = (viewLocation === $location.path());
 		return active;
	};

	$scope.runPanel = function(event){
		var kuponElement = document.getElementById("cupon-list")
		if(isListHide==true){
			kuponElement.style.width="200px";
		}else{
			kuponElement.style.width="0";
		}
		isListHide=!isListHide;
	}
}]);