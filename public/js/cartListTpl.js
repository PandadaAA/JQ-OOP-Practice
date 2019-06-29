/************
 *date=201707
 *author:pan
 *info:购物车产品列表的templete模板
 */

 function createGoodsListTpl(_cartList){
	var _html='';//拼接字符串的方式

	for(var i=0; i<_cartList.length; i++){
		_html += '<div class="cartItem">';
		_html += '<input type="checkbox" checked class="check cbBox" data-num='+ _cartList[i].num+' data-total='+ _cartList[i].total+'>';
		_html += '<label>';
			_html += '<img src="'+ _cartList[i].goodsimg +'">';
		_html += '</label>';
		_html += '<p class="info">'+ _cartList[i].name +'</p>';
		_html += '<p class="props">'+ _cartList[i].introduce +'</p>';
		_html += '<p class="price">￥'+ _cartList[i].unit +'</p>';
		_html += '<div class="quantity_form">';
			_html += '<input data-unit='+ _cartList[i].unit+' class="reduceGoodsBtn left fl" type="button" value="-">';
			_html += '<input data-unit='+ _cartList[i].unit+' class="center iTxt" type="text" value='+ _cartList[i].num +' >';
			_html += '<input data-unit='+ _cartList[i].unit+' class="addGoodsBtn right fl" type="button" value="+">';
		_html += '</div>';
		_html += '<p class="sum">￥'+ _cartList[i].total +'</p>';
		_html += '<p class="del delBtn">删除</p>';
		_html += '</div>';
		_html += '<div class="aaaLine"></div>';
		_html += '</div>';
	}
	return _html;
 }