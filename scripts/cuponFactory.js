angular.module('betApp').service('cuponFactory', ['auth','$http','$timeout',

function(auth,$http,$timeout){

	var kupon = new Array();



	var getKupon = function(callback){
		$http.get("/cupon/"+auth.currentUser()._id).success(function(data){
			kupon=data.matches;
			callback(kupon)
		})
	}
	var addMecz = function(obj){
		var mecz=obj.nazwa;
		var mecz_obj = {nazwa:obj.nazwa,typ:obj.typ}
		var exist = checkMecz(mecz);
		if(exist==true){
			kupon.push(mecz_obj);	
			return 0;
		}
		return 1;
	}
	var removeMecz = function(mecz){
		var index = kupon.indexOf(mecz);
		kupon.splice(index,1);
	}
	var checkMecz = function(mecz){
		var isOnCupon = false;
		kupon.forEach(elem=>{
			if(elem.nazwa===mecz){
				isOnCupon=true;
			}
		})
		if(!isOnCupon){
			return true;
		}
		return false;
	}

	var saveCupon = function(callback){
		$http.post("/cupon/"+auth.currentUser()._id,kupon).then(function(response){
			callback(response)		
		},function(response){
		})
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