angular.module('betApp').controller('descBetsCtrl', [
'$scope','$location','$http',
function($scope,$location,$http){

	$http.get("/events").success(function(data) {
			console.log(data)
	});
}]);