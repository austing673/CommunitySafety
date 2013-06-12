$(function(){
	// If cookie already set
	if (typeof $.cookie('dSubscribed') != "undefined") {
		// Change to alerts by running function
		displayAlerts();
		// Change menu to show Alerts as active
		$("#menu li").removeClass('active');
		$('#alerts').parent().addClass('active');
	}
	// Slides the posts if they are clicked
	// Live instead of click allows it to work after html is changed to settings
	$('.title').live('click',function(){

		/*Not sure if eq(0) is needed, gets first element*/
		visibleElement=$(".content:visible");//.eq(0); // Elements that are visible
		clickedElement=$(this).next(); // Element that was clicked
		// If all elements are hidden
		if($(".content:visible").length == 0){
			clickedElement.slideDown("medium");
		}
		// If element is the element visible hide it
		else if(visibleElement[0]==clickedElement[0]){
			clickedElement.slideUp("medium");
		}
		// If the element is another element, show it and hide the currently visible element
		else if(visibleElement[0]!=clickedElement[0]){
			visibleElement.slideUp("medium");
			clickedElement.slideDown("medium");
		}
	});
	// Slides the settings if they are clicked
	$('.settings').live('click',function(){
		$(this).next().slideToggle("medium");
	});
	// What settings does when it is clicked
	$('#settings').click(function(){
		if($('#theTitle').html() != "Settings"){
			// Change title to settings
			$('#theTitle').html("Settings");
			// Change page content
			$.get('pages/settings.php', function(data) {
				$('#pageBody').html(data);
				setSettings();
			});
		}
	});
	// Sets the settings
	function setSettings(){
		// Sets districts selected to cookie, if it exists
		var theDistricts="";
		if($.cookie('dSubscribed') != null){
			theDistricts=$.cookie('dSubscribed');
			// Next make all of those that were selected earlier appear active
			var districtIds=theDistricts.split(',');
			for (var i=0;i<districtIds.length;i++){
				$("#d"+districtIds[i]).addClass('dActive');
			}
		}
		// Sets type to cookie, if it exists
		var theTypes="";
		if($.cookie('sTypes') == null){
			theTypes="0,1,2";
		}
		else {
			theTypes=$.cookie('sTypes');
		}
		// Next make all of those that were selected earlier appear active
		var types=theTypes.split(',');
		for (var i=0;i<types.length;i++){
			$("#t"+types[i]).addClass('tActive');
		}
	}
	// If districts clicked, add it to districts selected by getting its id, and show it is selected by adding class dActive
	$('.dSettings').live('click',function(){
		if($(this).hasClass('dActive')){
			$(this).removeClass('dActive');
		}
		else {
			$(this).addClass('dActive');
		}
		// Cycles through elements if there are any
		$('.dActive').each(function(i){
			if(i==0){
				theDistricts=$(this).attr('id').substring(1);
			}
			else {
				theDistricts+="," + $(this).attr('id').substring(1);
			}
		});
		// If exists set cookie, if not remove cookie
		if ($(".dActive")[0]){
			$.cookie('dSubscribed', theDistricts, {expires: 10 * 365, path: "/",});
		}
		else {
			$.removeCookie('dSubscribed', { path: '/' });
		}
	});
	// If types clicked, add class tActive and add it to the cookie
	$('.tSettings').live('click',function(){
		if($(this).hasClass('tActive')){
			$(this).removeClass('tActive');
		}
		else {
			$(this).addClass('tActive');
		}
		// Cycles through elements if there are any
		$('.tActive').each(function(i){
			if(i==0){
				theTypes=$(this).attr('id').substring(1);
			}
			else {
				theTypes+="," + $(this).attr('id').substring(1);
			}
		});
		// If exists set cookie, if not remove cookie
		if ($(".tActive")[0]){
			$.cookie('sTypes', theTypes, {expires: 10 * 365, path: "/",});
		}
		else {
			$.removeCookie('sTypes', { path: '/' });
		}
	});
	// Get if Alerts button is clicked
	$('#alerts').click(function(){
		if( ($('#theTitle').html() != "Alerts") && ($('#theTitle').html() != "All Alerts") && ($('#theTitle').html() != "My Alerts")){
			displayAlerts();
			setTimeout(function() {
			addSlideRefresh();
		}, 5000);
		}
	});
	// Displays the Alerts
	function displayAlerts(){
		// Change title to alerts
		$('#theTitle').html("My Alerts");
		$('#pageBody').html('<ul class="menu"></ul>');
		var dVal;
		if (typeof $.cookie('dSubscribed') === "undefined") {
			dVal="";
			$('#theTitle').html("All Alerts");
		}
		else {
			dVal=$.cookie('dSubscribed');
		}
		var tVal;
		if (typeof $.cookie('sTypes') === "undefined") {
			tVal="";
		}
		else {
			tVal=$.cookie('sTypes');
		}
		var url = 'mysql_parse.php?districts=' + dVal + '&type=' + tVal;
		//console.log(url);
		$.getJSON(url, function(data) {
			$.each(data.posts, function(index, posts) {
				$('.menu').eq(0).append(
				  '<li class="boxPosts">' +
				    '<p class="title">' + posts.title.toUpperCase() + '</p>' +
				    '<div class="content">' +
				      '<div class="info">' + posts.content + '</div>' +
				      '<div class="moreInfo"><b>Author: </b>' + posts.authorName + '<br />&nbsp;&nbsp;<b>Date: </b>' + posts.date +'</div>' +
				    '</div>' +
				  '</li>'
				);
			});
			//$('.menu').eq(0).prepend('<div id="refresh">REFRESH</div>');
		});
		/*setTimeout(function() {
			$('#refresh').fadeIn("slow");
		}, 5000);*/
	}
	$('#refresh').live('click',function(){	
		displayAlerts();
	});
		
	//alert($('#pageBody').scrollTop());
	/*$('body').live("swipeleft", function(){
		alert("Swiped Down");
		displayAlerts();
	});*/
	$('#gStarted').click(function(){
		if($('#theTitle').html() != "Getting Started"){
			gStarted();
		}
	});
	function gStarted(){
		// Change title to Getting Started
		$('#theTitle').html("Getting Started");
		$.get('pages/main.html', function(data) {
			$('#pageBody').html(data);
		});
	}
	function addSlideRefresh(){
		// Changes height for slide down to refresh
		$('body').height( $('body').height()+40 );
		$("#pageBody").html($("#pageBody").html());
		alert($('#home').height());
	}
});