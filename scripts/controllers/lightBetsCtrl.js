angular.module('betApp').controller('lightBetsCtrl', [
'$scope','$location', '$http','cuponFactory','$timeout','auth',
function($scope,$location,$http,cuponFactory,$timeout,auth){

	$scope.bets = new Array();
	$scope.errorMessage=""


	function getData(){
		$http.get("/bets/light").success(function(data) {
			$scope.bets = data;
		});		
	}
	getData();
	$scope.addItem = function(obj){
		if(cuponFactory.addMecz(obj)==1){
			var warning = document.querySelector('.cupon-warning');
			warning.style.display="block";
			$timeout(function(){
				warning.style.display="none";
			},1500)
		}else{
		};
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
		if(x.user.name==auth.currentUser().name){
			return true;
		}
		return false;
	}
	$scope.convertType = function(type){
		if(type=="1"){
			return "wygrana gospodarzy"
		}else if(type=="2"){
			return "wygrana gości"
		}else{
			return "remis"
		}
	}
}]);