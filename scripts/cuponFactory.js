angular.module('betApp').service('cuponFactory', ['auth','$http','$timeout',

function(auth,$http,$timeout){

	var kupon = new Array();



	var getKupon = function(callback){
		$http.get("/cupon/"+auth.currentUser()._id).success(function(data){
			kupon=data.matches;
			callback(kupon)
		})
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

	var saveCupon = function(callback){
		console.log(auth.currentUser())
		$http.post("/cupon/"+auth.currentUser()._id,kupon).then(function(response){
			callback(response)		
		},function(response){
			console.log(response)
		})
		// $http.post("/cupon/"+auth.currentUser()._id,kupon).success(function(data) {
		// 	console.log(kupon)
		// 	callback("gitara")
		// });
	}

	var removeCupon = function(callback){
		$http.delete("/cupon/"+auth.currentUser()._id).success(function(data) {
			kupon = new Array()
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