angular.module('betApp').controller('rankingCtrl', [
'$scope','$location', '$http','cuponFactory','$timeout','auth',

function($scope,$location,$http,cuponFactory,$timeout,auth){

	$scope.stats = new Array();
	$scope.currentUser=auth.currentUser().name;
	$http.get("/rank").success(function(data) {
		$scope.stats = data;
		$scope.checkCurrentUser()
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
	$scope.checkCurrentUser = function(){
		for (var elem of $scope.stats) {
			if(elem.user.name==$scope.currentUser){
				if(elem.betCount==0){
					return true;
				}
			}	
		}
		return false;
	}
}]);