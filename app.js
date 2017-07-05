(function  () {
	angular.module('app',['ui.router','banner','angularCSS','lightning','ngSanitize','services','shopcart','mine','home'])
	.config(['$stateProvider','$urlRouterProvider',function  ($stateProvider,$urlRouterProvider) {
		$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'./template/home/home.html',
			css:'./template/home/home.css'
		})
		.state('lightning',{
			url:'/lightning',
			templateUrl:'./template/lightning/lightning.html',
			css:'./template/lightning/lightning.css'
		})
		.state('shopcart',{
			url:'/shopcart',
			templateUrl:'./template/shopcart/shopcart.html',
			css:'./template/shopcart/shopcart.css'
		})
		.state('mine',{
			url:'/mine',
			templateUrl:'./template/mine/mine.html',
			css:'./template/mine/mine.css'
		});
		$urlRouterProvider.otherwise('/home');
	}])
	.controller('footerCtrl',['$scope','shopCart',function  ($scope,shopCart) {
		$scope.total = shopCart;
		$scope.toblock = function  () {
			document.getElementById("theheader").style.display = 'flex';
			document.getElementById("main").style.top = '1.4375rem';
		}
		$scope.tohidden = function  () {
			document.getElementById("theheader").style.display = 'none';
			document.getElementById("main").style.top = '0rem';
		}
	}])
	.controller('loginCtrl',['$scope','localStore','$http',function  ($scope,localStore,$http) {
		$scope.ctrlShade = localStore;//控制遮罩层(id:shade)显/隐
		$scope.username;
		$scope.pwd;
		$scope.login = function  () {
			var usn = $scope.username;
			var pwd = $scope.pwd;
			$http({
				method : 'post',
				url:'http://10.0.152.232:9001/?login',
				data:{
					usn : usn,
					pwd : pwd
				}
			})
			.success(function  (res) {
				if (res == 'true') {
					localStore.setLogState(true,usn);
				} else{
					alert('账号或密码错误!');
				}
			});
		}
		$scope.signin = function  () {
			var usn = $scope.username;
			var pwd = $scope.pwd;
			$http({
				method : 'post',
				url:'http://10.0.152.232:9001/?signin',
				data:{
					usn : usn,
					pwd : pwd
				}
			})
			.success(function  (res) {
				if (res == 'true') {
					alert('恭喜您,注册成功!');
				} else{
					alert(res);
				}
			});
		}
	}]);
})();
