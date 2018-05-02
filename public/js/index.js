/************
 *date=20170518
 *author:pan
 *info:首页js
 */

/*搜索框*/
function searchFn(){
	var oheadTxt = getId('inTxt');
	oheadTxt.onfocus=function(){
		this.setAttribute('value','');
	}
	oheadTxt.onblur=function(){
		this.setAttribute('value','抢十亿神券');
	}
}


/*轮播图*/
function slideFn(){
	var numI=0;
	var imgW=780;
	var toLeftBtn = getId('toLeftBtn');
	var toRightBtn = getId('toRightBtn');
	var slideUl = getId('slideUl');

	toLeftBtn.onclick=function(){
		if (numI<3) {	
			numI++;
		}else{
			numI=0;
		}
		slideUl.style.left = '-'+(numI*imgW)+'px';
		slideChildren(numI);
	}
	toRightBtn.onclick=function(){
		if (numI>0) {
			numI--;
		}else{
			numI=3;
		}
		slideUl.style.left = '-'+(numI*imgW)+'px';
		slideChildren(numI);
	}
}

/*轮播小红点*/
function slideChildren(m){
	var n=getId('iconList').children;
	for (var i = 0; i < 4; i++) {
		//console.log(n[i]);
		n[i].removeAttribute('class');
	}
	n[m].setAttribute('class','active');
}
	





