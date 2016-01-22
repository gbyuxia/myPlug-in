(function($){ 
	$.fn.ongoingSlide = function(options){
		var defaults = { //默认属性、参数 
			multiple:60, 
			slide:".slideBd", 
			child:"li",
			speed:150,
			direction:"right" 
		} 		
		var options = $.extend(defaults, options); //合并属性
		this.each(function(){ //插件实现代码 
			var $wrapper = $(this),$scroll =$wrapper.find(options.slide),$child = $scroll.find(options.child),speed = options.speed,thisDirection = options.direction;
			if ($wrapper.length<1 ||$scroll.length<1 ||$child.length<1 ){
				return false;
			}
			var h=$child.height(),l = $child.size(),len = l,w=0, ulW =0,ulH = l*h, step, thisNo=0,startScroll,scrollFun;
			while(len--){
				ulW += $child.eq(len).width();
			}
			w=ulW/l;
			
			$child.clone().appendTo($scroll);
			if (thisDirection == 'left' ||  thisDirection == 'right'){
				$scroll.width(ulW*2).css(thisDirection,0);	
				step = w/options.multiple;
			}else if(thisDirection == 'down'){				
				$scroll.css('bottom',-ulH);
				thisDirection = 'bottom';
				step = h/options.multiple;
			}else{
				thisDirection = 'top';
				step = h/options.multiple;
			}
			l=l*options.multiple;			
					

			scrollFun = function(){
				thisNo--;
				if (thisNo+l <=-2){
					thisNo=-1;					
					$scroll.stop().css(thisDirection,parseFloat($scroll.css(thisDirection))+l*step);
				}else{
					var obj={};
						obj[thisDirection]=thisNo*step;
						$scroll.stop().animate(obj,speed,'linear');
				}
				return thisNo;
			}

			startScroll = window.setInterval(scrollFun,speed);			
			$wrapper.hover(function(){window.clearInterval(startScroll);}
						  ,function(){startScroll = window.setInterval(scrollFun,speed);}
			)		
		}); 
	}; 
})(jQuery); 
