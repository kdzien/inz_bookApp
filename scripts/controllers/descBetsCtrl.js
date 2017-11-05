angular.module('betApp').controller('descBetsCtrl', [
'$scope','$location','$http',
function($scope,$location,$http){

	$scope.bets = new Array();
	$http.get("/bets/desc").success(function(data) {
			$scope.bets = data;
			console.log(data);
	});
}]);