angular.module('mine',[])
.controller('mineCtrl',['$scope','$http','localStore',function ($scope,$http,localStore) {
	
	localStore.setDisplay(true);
	
	$scope.local = localStore;
	$scope.quit = function  () {
		localStore.setLogState(false,'');
	}
}]);