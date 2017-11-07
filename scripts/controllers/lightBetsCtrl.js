angular.module('betApp').controller('lightBetsCtrl', [
'$scope','$location', '$http','cuponFactory','$timeout',

function($scope,$location,$http,cuponFactory,$timeout){

	$scope.bets = new Array();
	$http.get("/bets/light").success(function(data) {
			$scope.bets = data;
	});

	$scope.addItem = function(obj){
		if(cuponFactory.addMecz(obj)==1){
			var warning = document.querySelector('.cupon-warning');
			warning.style.display="block";
			$timeout(function(){
				warning.style.display="none";
			},1500)
		};
	}
}]);