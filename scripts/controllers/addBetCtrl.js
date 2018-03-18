angular.module('betApp').controller('addBetCtrl', [
'$scope','$location', '$http','auth','$timeout',

function($scope,$location,$http,auth,$timeout){
	$scope.currentChoice="basketball";
	$scope.currentMatch="Nie wybrano wydarzenia"
	$scope.events=new Array();
	$scope.descChecked=false;
	$scope.errorMessage=""
	$scope.openselect=false;

	$http.get("/events").success(function(data) {
		console.log(data)
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
		$scope.allE=all;
	});
	$scope.setCurrentMatch = function(event){
		$scope.currentMatch = event.match_name
		$scope.openselect=false;
	}
	$scope.setCurrentChoice = function(choice){
		$scope.currentChoice=choice;
	}
	$scope.postBet = function(){
		let isAnalized=true;
		if(!$scope.betAnalyse){
			$scope.betAnalyse=''
			isAnalized=false;
		}
		$scope.formJson={
			nazwa: $scope.currentMatch,
			typ: $scope.selectedType,
			kurs: $scope.betCourse,
			isAnalize:isAnalized,
			analiza: $scope.betAnalyse,
			category:$scope.currentChoice,
			user:auth.currentUser()._id
		};
		console.log($scope.formJson)
		$http.post("/bets", $scope.formJson).success(function(data,status) {
				$scope.errorMessage="Dodano typ"
				$scope.errorMessage=data;
				$scope.selectedType="Nie wybrano wydarzenia"
				$scope.selectedType=""
				$scope.betCourse=""
				$scope.betAnalyse=""
			}).error(err=>{
				$scope.errorMessage= err.join(', ')
			});	
			$timeout(function(){
				$scope.errorMessage = "";
			},3000)		
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