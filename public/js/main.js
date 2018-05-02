/************
 *date=20170518
 *author:pan
 *info:文件入口
 */

//js版本
/*window.onload=function(){
	searchFn();
	slideFn();
}*/

//jq版本
$(function(){

//搜索框
	//searchFn();
	
//ajax生成head栏目导航
	topNavColumn();

//subNav侧边菜单
	//createSubNav();

//ajax生成轮播图片
	//ereateSliderImg();

//享品质产品列表
	productBlockFn();

//测试远程接口
	getAjaxJsonp( APILIST.oneapi,function(d){
	 	//console.log(d);
	});
	getAjaxJsonp( APILIST.titleNavData,function(d){
	 	//console.log(d);
	});
	getAjaxJsonp( APILIST.subNavApi,function(d){
		//console.log(d);
	});
});
