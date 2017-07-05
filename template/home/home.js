angular.module('home',[])
.controller('homeCtrl',['$scope','localStore',function  ($scope,localStore) {
	localStore.setDisplay(false);
}]);
