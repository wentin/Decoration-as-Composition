
$(window).load(function() {
	$('#featured').orbit({
		 animation: 'vertical-slide',                  // fade, horizontal-slide, vertical-slide, horizontal-push
		 animationSpeed: 800,                // how fast animtions are
		 timer: true, 			 // true or false to have the timer
		 advanceSpeed: 4000, 		 // if timer is enabled, time between transitions 
		 pauseOnHover: false, 		 // if you hover pauses the slider
		 startClockOnMouseOut: false, 	 // if clock should start on MouseOut
		 startClockOnMouseOutAfter: 1000, 	 // how long after MouseOut should the timer start again
		 directionalNav: false, 		 // manual advancing directional navs
		 captions: true, 			 // do you want captions?
		 captionAnimation: 'fade', 		 // fade, slideOpen, none
		 captionAnimationSpeed: 800, 	 // if so how quickly should they animate in
		 bullets: false,			 // true or false to activate the bullet navigation
		 bulletThumbs: false,		 // thumbnails for the bullets
		 bulletThumbLocation: '',		 // location from this file where thumbs will be
		 afterSlideChange: function(){} 	 // empty function 
	});
	
});

$(function(){
	var leftOpen = false;
	var rightOpen = false;
	var $container = $('.content');
	
	var wrapperWidth = $('.wrapper').width();
	
	$container.imagesLoaded( function(){
	  $container.masonry({
		itemSelector : '.post',
		isFitWidth: true,
		animationOptions: {
			duration: 400
		}
	  });
	  wrapperWidth = $('.wrapper').width();
	});

	$(".post").click(function() {
		if(!leftOpen&&!rightOpen){
			overlay_on('.leftPanel');
			wrapperChange();
		} else if(!leftOpen&&rightOpen) {
			overlay_on('.leftPanel');
			wrapperChange();
		} else if(leftOpen&&!rightOpen) {
			overlay_on('.rightPanel');
			wrapperChange();
		} 
	});
	
	$(".closeBtn.left").click(function() {
	  $('.leftPanel').hide();
	  leftOpen = false;
	  wrapperChange();
	});
	
	$(".closeBtn.right").click(function() {
	  $('.rightPanel').hide();
	  rightOpen = false;
	  wrapperChange();
	});
	
	function overlay_on(id){	
		var windowWitdth = $(window).width();
		var windowHeight = $(window).height();
		var divWidth = $(id).width();
		var divHieght = $(id).height();	
		
		if( id == ".leftPanel") {
			var left = windowWitdth/2 - divWidth;
			$(id).css("left", left+"px");
			$(id).show();		
			leftOpen = true;		
		} else if ( id == ".rightPanel") {
			var left = windowWitdth/2;
			$(id).css("left", left+"px");
			$(id).show();		
			rightOpen = true;	
		} 		
	}
	
	function wrapperChange() {
		if(!leftOpen&&!rightOpen){
			$('.wrapper').width(wrapperWidth).css({"padding-left": "0", "padding-right": "0"});
			$('.content').css({"margin-left": "auto", "margin-right": "auto"});		
			$('.wrapper').css("visibility","visible");
		} else if(!leftOpen&&rightOpen) {
			$('.wrapper').width(wrapperWidth/2).css({"padding-left": "0", "padding-right": wrapperWidth/2});
			$('.content').css({"margin-left": "auto", "margin-right": "0"});	
			$('.wrapper').css("visibility","visible");
		} else if(leftOpen&&!rightOpen) {
			$('.wrapper').width(wrapperWidth/2).css({"padding-left": wrapperWidth/2, "padding-right": "0"});
			$('.content').css({"margin-left": "0", "margin-right": "auto"});	
			$('.wrapper').css("visibility","visible");
		}  else if(leftOpen&&rightOpen) {
			$('.wrapper').css("visibility","hidden");
		} 
		$container.masonry( 'reload', {
		  isAnimated: true
		});
	}
	
});
