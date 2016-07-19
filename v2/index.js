$(function(){

	var pos, lastpos;
	var bg = $("#mainbg");
	var nav = $("nav");
	var navpos = nav.offset().top;

	$(window).scroll(function(){
		pos = $(window).scrollTop();
		bgParallax(bg, pos);
		navFix(nav, navpos, pos)
	
	});

});

var fixed = false;

function navFix(nav, navpos, pos){
	if(fixed && pos < navpos){
		nav.addClass("abs bottom");
		nav.removeClass("fix top");
		fixed = false;
	}else if(!fixed && pos > navpos){
		nav.removeClass("abs bottom");
		nav.addClass("fix top");
		fixed = true;
	}
}

function bgParallax(bg, pos){
	var offset = pos/2;
	bg.css("background-position", "center " + offset + "px");
}