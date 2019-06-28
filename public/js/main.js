/************
 *date=201707
 *author:pan
 *info:文件入口
 */

//jq版本, 用于jqindex.js
$(function(){
//首页搜索框
	searchFn();
//ajax生成head栏目导航
	topNavColumn();

//ajax生成轮播图片
	//ereateSliderImg();

//subNav侧边菜单
	//createSubNav();


//享品质产品列表
	productBlockFn();

});
