angular.module('betApp').controller('rankingCtrl', [
'$scope','$location', '$http','cuponFactory','$timeout','auth',

function($scope,$location,$http,cuponFactory,$timeout,auth){

	$scope.stats = new Array();
	$scope.currentUser=auth.currentUser();
	$http.get("/rank").success(function(data) {
		$scope.stats = data;
		console.log($scope.stats);
	});

	$scope.getPercentage = function(item){
	
		var betCount=item.betCount;
		var rank = item.rank;
		var precent = (rank/betCount)*100 
		var rest = 100-precent;
		return [precent,rest];
	}

	$scope.order = function(item){
		if(item!=undefined){
			return item.rank/item.betCount;
		}
	}
}]);