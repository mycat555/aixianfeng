angular.module('banner',[])
.directive("banner",function(){
	return {
		templateUrl: 'component/banner.html',
		replace: true,
		restrict: "E",
		controller: function($scope,$http){
			$scope.slider = [];
			$http({
				method: "GET",
				url: "http://h5.yztctech.net/api/axf/apihome.php"
			}).success(function(res){
				$scope.slider = res.data;
//				console.log($scope.slider);
			})
		},
		link: function(scope,element,attr){
			
			var index = 0;
			setInterval(function(){
				if(index >= scope.slider.slide.length-1){
					index = 0;
				}else{
					index++;
				}
				element.children().removeClass('active').eq(index).addClass('active');
			},2000);
			

		}
	}
});