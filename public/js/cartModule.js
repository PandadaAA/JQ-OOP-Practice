/************
 *date=20170605
 *author:pan
 *info:购物车模块
 */

//模块入口
$(function(){
	new CartModule();
});

//购物车入口
function CartModule(){
	this.cartBodyWrapId=$('#cartBodyWrapId');
	this.totalGoodsId=$('#totalGoodsId');
	this.checkedGoodsId=$('#checkedGoodsId');
	this.totalMoneyId=$('#totalMoneyId');

	this.init();
}

CartModule.prototype={
	init:function(){
		var _self=this;
		_self.getData();
	},
	//获取数据
	getData:function(){
		var _self=this;
		
		getAjaxJsonp(APILIST.cartUlLi,function(d){
			if(d.error.code==0){
				//生成商品列表
				_self.createDom(d);
				_self.totalGoodsId.html(d.total.num);
				_self.checkedGoodsId.html(d.total.num);
				_self.totalMoneyId.html(d.total.totalMoney);
			}else{
				console.log(d.error.msg);
				return false;
			}
		});
	},
	//生成商品列表
	createDom:function(d){
		var _self=this;

		var _cartList=d.cartList;
		//生成购物车，产品列表Tpl
		_self.cartBodyWrapId.html( createGoodsListTpl(_cartList) );
		//添加商品按钮
		_self.addGoodsEvent();
		//商品数量输入框
		_self.writeGoodsNumEvent();
		//减少商品按钮
		_self.reduceGoodsEvent();
		//商品单选按钮事件
		_self.checkEvent();
		//全选按钮
		_self.checkAllEvent();
		//删除按钮事件
		_self.delBtnEvent();
	},
	//添加商品按钮
	addGoodsEvent:function(){
		var _self=this;
		var _cartItem=_self.cartBodyWrapId.find('.cartItem');
		var _addGoodsBtn=_cartItem.find('.addGoodsBtn');
		//console.log(_cartItem);

		_addGoodsBtn.on('click',function(){
			var _this=$(this);
			var _val=_this.prev().val();
			var _unit=_this.attr('data-unit');
			var _sum=_this.parent().next();

			if(_val<999){
				_val++;
				$(this).prev().val(_val);
				//单个商品价格合计
				_self.cartCalculate(_val, _unit, _sum);
			}
		});
	},
	//减少商品按钮
	reduceGoodsEvent:function(){
		var _self=this;
		var _cartItem=_self.cartBodyWrapId.find('.cartItem');
		var _reduceGoodsBtn=_cartItem.find('.reduceGoodsBtn');

		_reduceGoodsBtn.on('click',function(){
			var _this=$(this);
			var _val=_this.next().val();
			var _unit=_this.attr('data-unit');
			var _sum=_this.parent().next();

			if(_val>1){
				_val--;
				$(this).next().val(_val);
				//单个商品价格合计
				_self.cartCalculate(_val, _unit, _sum);
			}
		});
	},
	//商品数量输入框
	writeGoodsNumEvent:function(){
		var _self=this;
		var _iTxt=_self.cartBodyWrapId.find('input.iTxt');
		//console.log(_iTxt);
		_iTxt.on('blur',function(){
			var _this=$(this);
			var _val=_this.val();
			var _unit=_this.attr('data-unit');
			var _sum=_this.parent().next();

			//单个商品价格合计
			_self.cartCalculate(_val, _unit, _sum);
		});
	},
	//单个商品价格合计
	cartCalculate:function(_v, _u, _sum){
		var _self=this;
		var _d='[{"num":'+ _v+',"price":'+ _u+'}]';

		getCartJsonp(APILIST.cart, _d ,function(d){
			_sum.html('￥'+d);

			//点击按钮时更新复选框input的商品属性
			var _goodsCbBox=_sum.parents('.cartItem').children('input,cbBox');
			_goodsCbBox.attr({
				'data-num':_v,
				'data-total':d
			});

			//点击按钮时更新底部商品合计栏的信息
			var _d=_self.ischeckedInfo();
			checkGoodsJsonp(APILIST.goodsCheck, JSON.stringify(_d), function(d){
				_self.totalGoodsId.html(d.num);
				_self.checkedGoodsId.html(d.num);
				_self.totalMoneyId.html(d.price);
			});		
		});
	},
	//返回被选中商品信息，更新商品栏单选按钮属性
	ischeckedInfo:function(){
		var _self=this;
		var _cbBox=_self.cartBodyWrapId.find('input.cbBox');
		var _tempArr=[];

		for(var i=0; i<_cbBox.length; i++){
			var tem={};
			if(_cbBox.eq(i).is(':checked')){
			tem["price"]=_cbBox.eq(i).attr('data-total');
			tem["num"]=_cbBox.eq(i).attr('data-num');
			_tempArr.push(tem);
			}
		}
		//全选按钮未选中状态
		if(_tempArr==0){
			var tem={};
			tem["price"]=0;
			tem["num"]=0;
			_tempArr.push(tem);			
		}

		return _tempArr;
	},
	//单选按钮点击事件
	checkEvent:function(){
		var _self=this;
		var _cbBoxBtn=_self.cartBodyWrapId.find('input.cbBox');

		_cbBoxBtn.on('click',function(){
			//所有被选中商品的总计，在右下角更新
			_self.goodsFootInfo();
			_self.checkAllState(_cbBoxBtn);
		});		
	},
	//所有被选中商品的总计，在右下角合计栏更新
	goodsFootInfo:function(){
		//返回被选中商品信息
		var _self=this;
		var _d=_self.ischeckedInfo();

		checkGoodsJsonp(APILIST.goodsCheck, JSON.stringify(_d), function(d){
			_self.totalGoodsId.html(d.num);
			_self.checkedGoodsId.html(d.num);
			_self.totalMoneyId.html(d.price);
		})
	},
	//全选按钮事件
	checkAllEvent:function(){
		var _self=this;
		var _checkAllBtn=$('.checkAllBtn');
		var _cbBoxBtn=_self.cartBodyWrapId.find('input.cbBox');

		_checkAllBtn.on('click',function(){
			var _is=$(this).is(':checked');

			if(_is==false){
				_checkAllBtn.removeAttr('checked');
				_cbBoxBtn.removeAttr('checked');
			}else{
				_checkAllBtn.attr('checked',true);
				_cbBoxBtn.attr('checked',true);
			}
			//所有被选中商品的总计，在右下角更新
			_self.goodsFootInfo();
		});
	},
	//全选与单选状态切换
	checkAllState:function(){
		var _self=this;
		var _checkAllBtn=$('.checkAllBtn');
		var _cb=_self.cartBodyWrapId.find('input.cbBox');
			
		for(var i=0; i<_cb.length; i++){
			if(_cb.eq(i).is(':checked')==false){
				_checkAllBtn.removeAttr('checked');
				break;
			}
			_checkAllBtn.attr('checked',true);
		}
	},
	//删除按钮事件
	delBtnEvent:function(){
		var _self=this;
		var _delBtn=_self.cartBodyWrapId.find('p.delBtn');

		_delBtn.on('click',function(){
			var _thisP=$(this).parents('.cartItem')

			_thisP.next().remove();//删除横线
			_thisP.remove();
			_self.checkAllState();
			_self.goodsFootInfo();
		})
	}
}

//整个购物车逻辑以商品栏单选按钮里的属性data-num,data-total为扭点

