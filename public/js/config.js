/************
 *date=201707
 *author:pan
 *info:整站配置信息
 */


 //站点跟链接
 var SITEURL='http://www.xxx.com/';


 //api接口列表
 var APILIST={
 	//首页本地数据
 	sliderImg:'../data/sliderImg.js',
	topNavColumn:'../data/topNavColumn.js',
	subNavApi:'../data/navNavColumn.js',
	productBlock :'../data/productBlock.js',
	//商品详情
	param : '../data/param.js',
 	//商品预览图
 	smallImgData : '../data/smallImgData.js',
 	//省市县
	province : '../data/province.js',
	city :  '../data/city.js',
	area : '../data/area.js',
	//购物车列表
	cartUlLi : '../data/cartUlLi.js',

	//(现实业务中关于金钱的计算应该交给后端处理)
	//计算单个商品总数和总价
	cart : SITEURL + 'woshishei',
	//check被选中的商品的总数和总价
	goodsCheck : SITEURL + 'wozaina',
 }