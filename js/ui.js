$(function(){
    /* ex_menu atv */
    var $ex_menu = $(".ex_menu > li > a");
	
    //scroll_move(0, 0);
    $ex_menu.each(function(i){
        $(this).on("click", function(e){
            var $target = $(this).attr("href"),
                $target_top = $($target).offset().top - $(".ex_header").innerHeight();

            scroll_move($target_top, i);
            e.preventDefault();
        });
    });
    
    
	$(window).scroll(function(){
        var $scroll_top  = $(this).scrollTop(),
			$go_top = $(".go_top"),
        	$val = ($(document).height() - $(window).height()) - $(".ex_footer").outerHeight();
		
		/* header fixed */
        if ($scroll_top > 0){
            $(".ex_header").addClass("scroll");
            $go_top.show();
			
        } else{
            $(".ex_header").removeClass("scroll");
            $go_top.hide();
        }
        
		/* go top */
		$go_top.on("click", function(){
            scroll_move(0, 0);
        });
		
        /* top button fixed */		
        if ($scroll_top >= $val)
            $go_top.addClass("btm");
        else
            $go_top.removeClass("btm");
		
        /* scroll bottom */
        /*
        var $val = $(document).height() - $scroll_top;
        if ($val == $(this).innerHeight())
            console.log("scroll 끝!!");
        */
    });
    
    /* scroll move - ex_menu click, top btn 클릭 시 */
    function scroll_move(val, nth){
        $("html, body").stop().animate({scrollTop: val}, 300);
        $ex_menu.removeClass("atv").eq(nth).addClass("atv");
    }
    
    /* invert */
    var $btn_invert = $(".invert > button"),
        $html = $("html");

    $btn_invert.click(function(){
        if (!$(this).hasClass("atv")){
            $(this).addClass("atv");
            $html.addClass("invert_atv");
        } else{
            $(this).removeClass("atv");
            $html.removeClass("invert_atv");
        }
    });
    
    	
	/* slick slider */
	//slider01
	$(".slider01 .slide_box").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		dots: true,
		prevArrow: "#slick_prev",
		nextArrow: "#slick_next"
	});

	var $btn_slick_prev = $("#slick_prev > img"),
		$btn_slick_next = $("#slick_next > img");
	$(".slider01 .slide_box").on("afterChange", function(event, slick, currentSlide){
		if (currentSlide == 0){								//first slide
			$btn_slick_prev.attr("src", "../img/btn_slick_prev_off.png");			
		} else if (slick.slideCount == currentSlide+1){		//last slide
			$btn_slick_next.attr("src", "../img/btn_slick_next_off.png");
		} else{
			$btn_slick_prev.attr("src", "../img/btn_slick_prev.png");
			$btn_slick_next.attr("src", "../img/btn_slick_next.png");
		}
	});
	
	//slider02
	$(".slider02 .slide_box").on("init", function(event, slick){
		var $slick_current = $(this).find(".slick-current");
		slick_bg_chage($slick_current);
	});
	$(".slider02 .slide_box").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		//fade: true,
		autoplay: true,
		autoplaySpeed: 2000
	});
	$(".slider02 .slide_box").on("afterChange", function(event, slick, currentSlide){
		var $slick_current = $(this).find(".slick-current");
		slick_bg_chage($slick_current);
	});
	
	//slider03
	var slider03 = {
		slideReview: function(){
			var targetSlide = $(".slider03 .slide_box");
			targetSlide.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				autoplay: true,
				autoplaySpeed: 3000,
				dots: true,
				appendDots: targetSlide.siblings(".slider_indicator").addClass("type-title"),
				customPaging: function(slider, i){
					var i_title = $(slider.$slides[i]).attr("data-title");
					
					return "<button type='button'><span>" + i_title + "</span></button>";
					//return "<button>" + i + "</button>";
				}
			});
		},
		init: function(){
			var that = this;
			this.slideReview();
		}		
	}
	slider03.init();
			
	$(".slider03 .btn_play").click(function(){
		$(this).parents(".slide_wrap").find(".slide_box").slick("slickPlay");
		$(this).parents(".slider_indicator").removeClass("paused");
		$(this).hide().siblings(".btn_pause").show();
	});		
	$(".slider03 .btn_pause").click(function(){
		$(this).parents(".slide_wrap").find(".slide_box").slick("slickPause");
		$(this).parents(".slider_indicator").addClass("paused");
		$(this).hide().siblings(".btn_play").show();
	});
	
	
	/* gnb */
	var $nav_wrap = $(".nav"),
		$nav = $(".nav > .menu"),
		$gnb_depth01 = $(".nav .menu .depth01 > a"),
		$gnb_depth02 = $(".nav .menu .depth02");
	
	function gnb_init(){
		if ($gnb_depth01.parent("li").hasClass("atv"))			
			$gnb_depth01.parent("li.atv").find(".depth02").addClass("atv");
	}
	
	$gnb_depth01.on("click", function(e){
		var i = $(this).parent("li").index();
		
		$gnb_depth01.parent("li").removeClass("atv").eq(i).addClass("atv");
		$gnb_depth02.removeClass("atv");
		$(this).siblings(".depth02").addClass("atv");
		e.preventDefault();
	});
	$gnb_depth01.on("mouseover focusin", function(){
		$gnb_depth01.parent("li").find(".depth02").removeClass("atv");
		$gnb_depth02.hide();
		$(this).siblings(".depth02").show();
		
		$gnb_depth01.removeClass("atv");
		$(this).addClass("atv");
	});
	$gnb_depth01.on("focusout", function(){
		$gnb_depth01.removeClass("atv");
		$gnb_depth02.hide();
	});
	$nav_wrap.on("mouseleave", function(){
		$gnb_depth01.removeClass("atv");
		$gnb_depth02.hide();
		gnb_init();
	});
	
	
	open_layer();
	fixed_btm_box();
	open_tab();
});


/*  accordion menu - ex. faq
    type : 1 - 하나만 열고 닫기
    type : 2 - 여러개 열고 닫기   */
function accordion(item, type){
    $(item).each(function(i){
        $(this).on("click", function(e){
            if ($(this).parents("li").hasClass("atv"))
                accordion_close($(this), 300, type);
            else
                accordion_open($(this), 300, type);
            
            e.preventDefault();
        });
    });
}
function accordion_open(target, speed, type){
    if (type == 1)
        target.parents("ul").find("li").removeClass("atv").find(".desc").stop().slideUp(speed);
    
    target.parents("li").addClass("atv");
    target.parent().siblings(".desc").stop().slideDown(speed);
}
function accordion_close(target, speed, type){
    if (type == 1)
        target.parents("ul").find("li").removeClass("atv").find(".desc").stop().slideUp(speed);
    else
        target.parents("li").removeClass("atv");
    
    target.parent().siblings(".desc").stop().slideUp(speed);
}
function accordion_close_all(target){
    // 탭 내부에 accordion 메뉴가 있을 경우, 탭 클릭 시 accordion 초기화
    $(target).parent().find(".accordion li").removeClass("atv").find(".desc").hide();
}


/* tab - 클릭할 탭, 열릴 영역 */
function tab_box(tabs, tab_contents){
    $(tab_contents).hide().eq(0).show();

    $(tabs).each(function(i){
        $(this).on("click", function(e){
            var target = $(this).attr("href");

            $(tabs).parent().removeClass("atv");
            $(this).parent().addClass("atv");
            $(tab_contents).stop().hide();
            accordion_close_all(tab_contents);   //탭 내부에 accordion이 있을 경우

            if (!$(tab_contents).attr("id"))
                $(tab_contents).eq(i).show();
            else
                $(target).show();
            
            e.preventDefault();
        });
    });
}

/* tab - 같은 페이지 내 탭 열기 ex. button 클릭 시 */
function open_tab(clicked_tab, target){
	$(clicked_tab).trigger("click");
	setTimeout(function(){
		$(target).trigger("click");
	}, 300);
	return false;
}


/* layer popup */
function open_layer(){
    $(".openlayer").each(function(){
       $(this).on("click", function(e){
           var $return_focus = this,
               $layer_id;
           
           if ($(this).attr("href"))
               $layer_id = $("#layer_" + $(this).attr("href"));
           else
               $layer_id = $("#layer_" + $(this).attr("btn-href"));
           
           $(".curtain").remove();
           show_layer($layer_id);
           $layer_id.attr("tabindex", "0").focus();
           
           $(".closelayer").on("click", function(){
              hide_layer($layer_id, $return_focus); 
           });
           
           e.preventDefault();
       });
    });
	
	close_layer();
	close_layer_external();
}
function show_layer(obj){
    $("body").append("<div class='curtain'></div>").addClass("scroll_hidden");
    $(".layer_wrap").show().find(".layer").hide();
    obj.show();
}
function hide_layer(obj, return_focus){
    if (obj)
        obj.hide();
    else
        $(".layer").hide();
    
    if (return_focus)
        $(return_focus).attr("tabindex", "0").focus();
    
    $(".layer_wrap").hide();
    $("body").removeClass("scroll_hidden").find(".curtain").remove();
}
function close_layer(){
    $(".layer .closelayer").on("click", function(){
        hide_layer("", ""); 
    });
}
function close_layer_external(){
	$(document).mouseup(function(e){
		var $layer_wrap = $(".layer_wrap");
		
		if ($layer_wrap.has(e.target).length === 0)
			hide_layer();
	});
}


/* toast message */
function toast_msg() {
    var $toast_box = $("#toast_box");
    $toast_box.removeClass("show").addClass(function(){
        $(this).addClass("show");
        setTimeout(function(){
            $toast_box.removeClass("show");
        }, 3000);
    });
}


/* 페이지 하단 고정 영역 */
function fixed_btm_box(){
	var $btn_fixed_btm = $(".fixed_btm .btn_fixed_btm");
	
	if ($btn_fixed_btm){
		$btn_fixed_btm.on("click", function(){
			var $fixed_btm = $(this).parents(".fixed_btm");

			if ($fixed_btm.hasClass("atv"))
				$fixed_btm.removeClass("atv");
			else
				$fixed_btm.addClass("atv");
		});
	}
}


/* slick slider bg chage */
function slick_bg_chage(target){
	if ($(target).hasClass("type02"))
		$(target).parents(".slide_wrap").removeClass().addClass("slide_wrap type02");
	else if ($(target).hasClass("type03"))
		$(target).parents(".slide_wrap").removeClass().addClass("slide_wrap type03");
	else if ($(target).hasClass("type04"))
		$(target).parents(".slide_wrap").removeClass().addClass("slide_wrap type04");
	else if ($(target).hasClass("type05"))
		$(target).parents(".slide_wrap").removeClass().addClass("slide_wrap type05");
	else
		$(target).parents(".slide_wrap").removeClass().addClass("slide_wrap type01");
}
