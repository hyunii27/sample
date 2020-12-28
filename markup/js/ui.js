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
    
    var $go_top = $(".go_top"),
        $scroll_val = ($(document).height() - $(window).height()) - $(".ex_footer").outerHeight();
    $(window).scroll(function(){
        /* header fixed */
        var $page_top  = $(this).scrollTop();
        if ($page_top > 0){
            $(".ex_header").addClass("scroll");
            $go_top.show();
        } else{
            $(".ex_header").removeClass("scroll");
            $go_top.hide();
        }
        
        /* top button fixed */
        if ($scroll_val <= $page_top)
            $go_top.addClass("btm");
        else
            $go_top.removeClass("btm");
        
        $go_top.on("click", function(){
            scroll_move(0, 0);
        });
        
        /* scroll bottom */
        /*
        var $scroll_val = $(document).height() - $page_top;
        if ($scroll_val == $(this).innerHeight())
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
    
    /* 레이어팝업 강제 닫기 */
    $(".layer .closelayer").on("click", function(){
        hide_layer("", ""); 
    });
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