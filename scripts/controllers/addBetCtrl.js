angular.module('betApp').controller('addBetCtrl', [
'$scope','$location', '$http','auth','$timeout',

function($scope,$location,$http,auth,$timeout){
	$scope.currentChoice="basketball";
	$scope.events=new Array();
	$scope.descChecked=false;
	$scope.errorMessage=""

	$http.get("/events").success(function(data) {
		console.log(data);
		var all=[]
		for(var i=0;i<=data.length-1;i++){
			var league = {sport:data[i].discipline,league:data[i].league,matches:[]}
			if(containsObject(league,all)==false){
				all.push(league);
			}
			else{
				continue;
			}
		}
		label:
		for(var i=0;i<=data.length-1;i++){
			for(var k=0;k<=all.length-1;k++){
				if(all[k].sport===data[i].discipline && all[k].league==data[i].league){
					all[k].matches.push(data[i]);
					continue label;
				}
			}
		}
		//console.log($scope.events);
		$scope.allE=all;
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
			user:auth.currentUser()._id
		}
		console.log($scope.formJson);
			$http.post("/bets", $scope.formJson).success(function(data,status) {
				$scope.errorMessage=data;
				$timeout(function(){
					$scope.errorMessage = "";
				},3000)
			});			
		}

	function cleanForm() {
		$scope.betEvent="";
		$scope.betType="";
		$scope.betCourse="";
		$scope.betAnalyse="";
		$scope.currentChoice="";
	}

	function containsObject(obj, list) {
    var i;
    for (i = 0; i <= list.length-1; i++) {
        if (list[i].sport == obj.sport && list[i].league==obj.league) {
            return true;
        }
    }
    return false;
}
}]);