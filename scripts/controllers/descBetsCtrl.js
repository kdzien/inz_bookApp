angular.module('betApp').controller('descBetsCtrl', [
'$scope','$location','$http','cuponFactory','$timeout',
function($scope,$location,$http,cuponFactory,$timeout){

	$scope.bets = new Array();
	$http.get("/bets/desc").success(function(data) {
			$scope.bets = data;
			console.log(data);
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