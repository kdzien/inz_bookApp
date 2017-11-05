angular.module('betApp').controller('lightBetsCtrl', [
'$scope','$location', '$http','cuponFactory',

function($scope,$location,$http,cuponFactory){

	$scope.bets = new Array();
	$http.get("/bets/light").success(function(data) {
			$scope.bets = data;
	});

	$scope.addItem = function(obj){
		console.log(obj);
		cuponFactory.addMecz(obj);
	}
}]);