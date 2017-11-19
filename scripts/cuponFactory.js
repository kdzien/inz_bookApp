angular.module('betApp').service('cuponFactory', ['auth','$http',

function(auth,$http){

	var kupon = new Array();

	$http.get("/cupon/"+auth.currentUser()).success(function(data){
		kupon=data.matches;
	})

	var getKupon = function(){
		console.log(kupon)
		return kupon
	}
	var addMecz = function(mecz){
		var exist = checkMecz(mecz);
		if(exist==true){
			kupon.push(mecz);	
			return 0;
		}
		return 1;
	}
	var removeMecz = function(mecz){
		var index = kupon.indexOf(mecz);
		kupon.splice(index,1);
	}
	var checkMecz = function(mecz){
		var index = kupon.indexOf(mecz)
		if(index==-1){
			return true;
		}
		return false;
	}

	var saveCupon = function(){
		$http.post("/cupon/"+auth.currentUser(),kupon).success(function(data) {
		});
	}

	var removeCupon = function(){
		$http.delete("/cupon/"+auth.currentUser()).success(function(data) {
		});
	}
  return {
    getKupon: getKupon,
    addMecz: addMecz,
    removeMecz: removeMecz,
    checkMecz: checkMecz,
    saveCupon: saveCupon,
    removeCupon: removeCupon
  };
}]);