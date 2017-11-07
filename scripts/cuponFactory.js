angular.module('betApp').service('cuponFactory', [

function(){

	var kupon = new Array();

	var getKupon = function(){
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
  return {
    getKupon: getKupon,
    addMecz: addMecz,
    removeMecz: removeMecz,
    checkMecz: checkMecz
  };
}]);