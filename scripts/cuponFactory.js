angular.module('betApp').service('cuponFactory', [

function(){

	var kupon = [];

	var getKupon = function(){
		return kupon
	}
	var addMecz = function(mecz){
		kupon.push(mecz);
	}
  return {
    getKupon: getKupon,
    addMecz: addMecz
  };
}]);