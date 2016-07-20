var nav;
var win;
var bg;
var fixed = false;
var navpos;

$(function(){
	bg = $("#mainbg");
	nav = $("nav");	

	win = $(window);

	var desktop = true;

	
	navpos = nav.offset().top;

	win.resize(function(){

		if(!fixed) navpos = nav.offset().top;
		checkWidth();

	});

	function checkWidth(){

		var limit = 700;

		var width = win.width();



		if(desktop && width<limit){
			desktop = false;

			unsetDesktop();
			setupMobile();

		}else if (!desktop && width>limit){
			desktop = true;

			unsetMobile();
			setupDesktop();

		}
	}

	setupDesktop();
	checkWidth();


});


function setupMobile(){

	bg.css("background-position", "-70px center");

	console.log("switch to mobile view");

	/*
	<!--nav class="brightOverlay abs bottom rigth left flex fh fcenter uppercase crop z10 centertext "   DESKTOP DEFAULT, 700+ px screenwidth -->
	<nav class="brightOverlay fix top right navContracted uppercase crop z10 centertext">
	*/

	nav.removeClass("abs bottom left flex fh fcenter");
	nav.addClass("fix top navContracted");
	$("#navtoggle").removeClass("hidden");


	var extended = false;
	nav.removeClass("navExtended");
	nav.addClass("navContracted");


	$("#navtoggle").click(function(){
		toggleNav();
	});

	function toggleNav(){
		if(!extended){
			nav.removeClass("navContracted");
			nav.addClass("navExtended");
			extended = true;
		}else{
			nav.removeClass("navExtended");
			nav.addClass("navContracted");
			extended=false;
		}
	}
}

function unsetMobile(){

	nav.removeClass("fix top navContracted navExtended");
	nav.addClass("abs bottom left flex fh fcenter");	
	$("#navtoggle").addClass("hidden");

	nav.unbind();
}

function unsetDesktop(){
	win.unbind("scroll");
}


function setupDesktop(){

	console.log("switch to desktop view");

	var pos, lastpos;

	

	win.scroll(function(){
		pos = win.scrollTop();
		bgParallax(bg, pos);
		navFix(nav, navpos, pos)
	
	});

	fixed = false;
	
	nav.addClass("abs bottom");
	nav.removeClass("fix top");

	navFix(nav, navpos, win.scrollTop());

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


}

