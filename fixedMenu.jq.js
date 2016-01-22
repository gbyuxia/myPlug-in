(function($){ 
	$.fn.fixedMenu = function(options){
		var defaults = { //默认属性、参数 
			row:".row", 
			activeClass:"on", 
			child:"li",
			autoFirstChoosed:true,
			offsetH:0
		} 		
		var options = $.extend(defaults, options); //合并属性
		
		var $menu = $(this),$menuLi =$menu.find(options.child),$row = $(options.row),activeC=options.activeClass, offsetT = options.offsetH;
		
		if ($menu.length<1 ||$row.length<1 ||$menuLi.length<1 ){return false;}
		if (options.autoFirstChoosed){$menuLi.eq(0).addClass(activeC).siblings().removeClass(activeC);}
		//if ($menu.length < $row.length){return false;}
		
			 $menuLi.on('click',function(){
				var index=$(this).index();
				var top=$row.eq(index).offset().top -offsetT;	
				$('html,body').animate({scrollTop:top},200,function(){
					$menuLi.eq(index).addClass(activeC).siblings().removeClass(activeC);
				});
			});	

				var navSize = $menuLi.length,arrT = [],k=navSize;			
				while (k--){
					arrT[k] = $row.eq(k).offset().top-offsetT; 
				}				
				arrT.push(arrT[navSize-1] + $row.eq(navSize-1).height());
				
				$(window).scroll(function(){ 
					var H2 = $(this).scrollTop();
					if (H2>arrT[navSize] || H2<arrT[0]){
						$menuLi.removeClass(activeC)					
					}else{
						for (var i=navSize;i>=0;i--){
							if (arrT[i]<H2 && H2<arrT[i+1]){	
								$menuLi.eq(i).addClass(activeC).siblings().removeClass(activeC);						
							}
						}
					}
				});

			
			
		 
	}; 
})(jQuery); 
