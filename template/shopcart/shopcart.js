angular.module('shopcart',[])
.controller('shopcartCtrl',['$scope','shopCart','localStore',function  ($scope,shopCart,localStore) {
	$scope.shopList = shopCart.getShopList();//商品列表
	$scope.shopNum = shopCart.total();
	$scope.total;//计算总价方法
	$scope.selectAll;//全选
	
	localStore.setDisplay(true);
	
	$scope.reduceShop = function  (shop) {//减少商品数量
		shopCart.reduceShop(shop.name);
		$scope.shopNum = shopCart.total();
		total();
	}
	$scope.addShop = function  (shop) {//增加商品数量
		shopCart.addShop(shop);
		total();
	}
	$scope.giveUp = function  (shop) {//放弃结算
		shopCart.giveUp(shop);
		total();
	}
	$scope.allGiveUp = function  () {//全选or全弃
		shopCart.allGiveUp($scope.selectAll);
		total();
	}
	
	function total () {
//		if (shopCart.total()) {//如果shopCart商品列表有数据,那么显示购物车部分
//		document.getElementById("emptycart").style.display = 'none';
//		document.getElementById("shopcart").style.display = 'block';
//	} else{//否则,显示空购物车部分
//		document.getElementById("emptycart").style.display = 'block';
//		document.getElementById("shopcart").style.display = 'none';
//		return;//且直接返回,不进行下边的计算
//	}也能实现,但不建议这样写,用ng-if
		$scope.total = 0;
		var sum = 0;
		for (name in $scope.shopList) {//计算结算总价,当然不选的不能算
			if (!$scope.shopList[name].giveup) {
				sum += $scope.shopList[name].num;
				$scope.total += $scope.shopList[name].price*$scope.shopList[name].num;
				$scope.total = Math.round($scope.total*10)/10;
			}
		}
		$scope.selectAll = sum == shopCart.total();//利用当前选中数量与shopCart中商品列表比较判断是否全选
	}
	total();
}])
