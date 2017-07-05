angular.module('lightning',[])
.controller('lightningCtrl',['$scope','$http','shopCart','localStore',function  ($scope,$http,shopCart,localStore) {
	
	localStore.setDisplay(false);
	
	$scope.shopList = ['热销榜<div/>','端午粽子','优选水果','卤味熟食','牛奶面包<div/>','冰镇饮料','进口食品','冰激凌','饮料酒水','休闲零食','方便速食','粮油调味','生活服用品','代购星巴克'];
	$scope.shopSpecifics = {};//商品明细列表
	$scope.addClass;//左边栏被点击 标记
	$scope.show = false;
	
	$scope.choseclassify = function  (i,index) {
		$scope.addClass = index;
		switch (i){//因为接口不全,这里是数据过滤
			case '热销榜<div/>':
				i = '热销榜';
				break;
			case '端午粽子':
				i = '天天特价'
				break;
			case '优选水果':
				break;
			case '优选水果<div/>':
				i = '优选水果';
				break;
			case '牛奶面包<div/>':
				i = '牛奶面包';
				break;
			default:
				i = '热销榜';
				break;
		}
		$http.get('http://h5.yztctech.net/api/axf/apicategory.php?category='+i).success(function  (res) {
		for (var i=0;i<res.data.length;i++) {//将响应数据加入到 商品明细列表 中
			$scope.shopSpecifics[res.data[i].id] = res.data[i];
		}
	});
	}//左侧栏点击响应
	
	//初始化页面
	$scope.choseclassify('热销榜<div/>',0);
	
	$scope.addshop = function  (shop) {
		shopCart.addShop(shop);
	}//加入商品到购物车
}])