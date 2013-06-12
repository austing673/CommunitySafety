$(function(){
	// Removes jquery mobile padding
	$("#pageBody").css('padding','0px');
	// Refreshes page by setting it equal to itself (so that padding 0 can be applied)
	$("#pageBody").html($("#pageBody").html());

	var menuStatus;
	
	$("a.showMenu").click(function(){
		if(menuStatus != true){				
		$(".ui-page-active").animate({
			marginLeft: $("#menu").width(),
		  }, 300, function(){menuStatus = true});
		  return false;
		  } else {
			$(".ui-page-active").animate({
			marginLeft: "0px",
		  }, 300, function(){menuStatus = false});
			return false;
		  }
	});

	$('.pages').live("swipeleft", function(event){
		// Stops bug where triggered too much on iOS
		event.stopImmediatePropagation();
		if (menuStatus){	
		$(".ui-page-active").animate({
			marginLeft: "0px",
		  }, 300, function(){menuStatus = false});
		  }
	});
	
	$('.pages').live("swiperight", function(event){
		event.stopImmediatePropagation();
		if (!menuStatus){	
		$(".ui-page-active").animate({
			marginLeft: $("#menu").width(),
		  }, 300, function(){menuStatus = true});
		  }
	});
	
	$("#menu li a").live('click',function(){
		// Gets rid of persistent loading message
		$.mobile.hidePageLoadingMsg();
		var p = $(this).parent();
		// Makes it so active element won't be re clicked
//		if(!$(p).hasClass('active')){
			// Does not allow for sliding list to be selected
			if($(this).attr('id') != 'nList'){
				$(".active").removeClass('active');
				$(p).addClass('active');
				// Gets menu to hide
				{$(".ui-page-active").animate({marginLeft: "0px",}, 300, function(){menuStatus = false});return false;}
			}
//		}
	});
	$(document).ajaxStart(function() {
		$.mobile.showPageLoadingMsg();
	});
	$(document).ajaxStop(function() {
		$.mobile.hidePageLoadingMsg();
	});
		
});	