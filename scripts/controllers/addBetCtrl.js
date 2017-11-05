angular.module('betApp').controller('addBetCtrl', [
'$scope','$location', '$http',

function($scope,$location,$http){
	$scope.currentChoice="basketball";
	$scope.events=new Array();
	$scope.descChecked=false;

	$http.get("/events").success(function(data) {
		$scope.events=data;
		console.log($scope.events);
	});

	$scope.setCurrentChoice = function(choice){
		$scope.currentChoice=choice;
	}
	$scope.postBet = function(){
		$scope.formJson={
			nazwa: $scope.betEvent,
			typ: $scope.betType,
			kurs: $scope.betCourse,
			isAnalize:$scope.descChecked,
			analiza: $scope.betAnalyse,
			category:$scope.currentChoice,
			user:"dzieniu"
		}
		console.log($scope.descChecked);
			$http.post("/bets", $scope.formJson).success(function(data,status) {
				console.log(data);
			});			
		}

	function cleanForm() {
		$scope.betEvent="";
		$scope.betType="";
		$scope.betCourse="";
		$scope.betAnalyse="";
		$scope.currentChoice="";
	}

}]);