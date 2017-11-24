angular.module('betApp').controller('descBetsCtrl', [
'$scope','$location','$http','cuponFactory','$timeout','auth',
function($scope,$location,$http,cuponFactory,$timeout,auth){

	$scope.bets = new Array();
	$scope.errorMessage=""
	getData();

	$scope.addItem = function(obj){
		if(cuponFactory.addMecz(obj)==1){
			var warning = document.querySelector('.cupon-warning');
			warning.style.display="block";
			$timeout(function(){
				warning.style.display="none";
			},1500)
		};
	}
	function getData(){
		$http.get("/bets/desc").success(function(data) {
			$scope.bets = data;
		});	
	}
	$scope.iksde = function(obj){
		$http.delete("/bets/"+obj._id).success(function(data) {
			$scope.errorMessage=data;
			$timeout(function(){
				$scope.errorMessage="";
			},3000)	
			getData();
		});
	}
	$scope.checkUser = function(x){
		if(x.user==auth.currentUser()){
			return true;
		}
		return false;
	}

}]);