/************
 *date=20170524
 *author:pan
 *info:整站配置信息
 */


 //站点跟链接
 var SITEURL='http://www.webfeel.org/';


 //api接口列表
 var APILIST={
 	//本地假数据
 	sliderImg:'../data/sliderImg.js',
 	topNavColumn:'../data/topNavColumn.js',

 	//远程接口
 	oneapi:SITEURL + 'zuoye/php/oneapi.php',
 	titleNavData : SITEURL + 'zuoye/php/titleNavData.php',
 	subNavApi : SITEURL + 'zuoye/php/subNavApi.php',
 	productBlock : SITEURL + 'zuoye/php/productBlock.php',
 	smallImgData : SITEURL + 'zuoye/php/smallImgData.php',

 	//商品详情页pid
 	param : SITEURL + 'zuoye/php/param.php',
 	//商品详情页addressMenu
	province : SITEURL + 'zuoye/php/province.php',
	city : SITEURL + 'zuoye/php/city.php',
	area : SITEURL + 'zuoye/php/area.php',

	//购物车列表
	cartUlLi : SITEURL + 'zuoye/php/cartUlLi.php',
	//计算单个商品总数和总价
	cart : SITEURL + 'zuoye/php/cart.php',
	//check被选中的商品的总数和总价
	goodsCheck : SITEURL + 'zuoye/php/goodsCheck.php',
 }