angular.module('services',[])
.service('shopCart',[function  () {
	var shopList = {};
	this.total = function  () {
		var sum = 0;
		for (name in shopList) {
			sum += shopList[name].num;
		}
		return sum;
	}//购物车清单统计
	
	this.getShopList = function  () {
		return shopList;
	}//获取shopList方法
	
	this.addShop = function  (shop) {
		if (!shop) {
			return;
		}
		var tag = true;
		for (name in shopList) {//遍历shopList
			if (shop.name == name) {//如果商品在购物车列表中已存在
				shopList[name].num++;//那么给它的数量加1
				tag = false;
				return;
			}
		}
		if(tag){//如果商品为新品
			shop.num = 1;//那么初始化它的数量为1
			shopList[shop.name] = shop;//加入商品购物车列表
		}
		return shopList;
	}//加入购物车方法
	
	this.reduceShop = function  (shopName) {
		for (name in shopList) {//遍历购物车商品列表
			if (shopName == name) {//找到
				if (--shopList[name].num == 0) {//数量--,如果数量为0
					delete shopList[name];//那么移除它
				}
				return;
			}
		}
		return shopList;
	}//减少商品数量方法
	
	this.giveUp = function  (shop) {
		if (!shop) {
			return;
		}
		for (name in shopList) {//遍历购物车商品列表
			if (shop.name == name) {//找到
				if (!shopList[name].giveup) {//如果不存在放弃属性
					shopList[name].giveup = 'true';//给加上此属性
				} else{//如果已经有放弃属性
					delete shopList[name].giveup;//那么去掉此属性
				}
				return;
			}
		}
	}//放弃结算方法
	
	this.allGiveUp = function (tag) {
		for (name in shopList) {//遍历购物车商品列表
			if (tag) {//如果意图是放弃
				shopList[name].giveup = 'true';//加上此属性
			}else{//否则全选
				delete shopList[name].giveup;//去掉此属性
			}
		}
	}//全部放弃方法
}])
.service('localStore',[function  () {//登录/注册/登录状态相关服务
	var disp = false;
	this.setLogState = function  (logState,user) {
		if (typeof(Storage)!=="undefined" ) {
			localStorage.setItem('login',logState);
			localStorage.setItem('user',user);
		}else{
			alert('你的浏览器不支持localstorage');
		}
	}
	this.getLogState = function  () {
		return localStorage.getItem('login')=='true'?true:false;
	}
	this.getUser = function  () {
		return localStorage.getItem('user');
		
	}
	this.setDisplay = function  (whether) {
		disp = whether;
	}
	this.whetherDisplay = function  () {
		return disp;
	}
}]);