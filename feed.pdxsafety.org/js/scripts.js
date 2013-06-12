$(function(){
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
				// Trigger create loads jquery mobile styling
				$('#pageBody').html(data).trigger("create");
				setSettings();
			});
		}
	});
	// Sets the settings
	function setSettings(){
		// Sets districts selected to cookie, if it exists
		var theDistricts="";
		if($.cookie('dSubscribed') != null){
			theDistricts=$('#nChangeable').find('input[type="hidden"][name="allNames"]').val();
			// Next make all of those that were selected earlier appear active
			var districtIds=theDistricts.split(',');
			for (var i=0;i<districtIds.length;i++){
				$("ul ul li:contains('" + districtIds[i] + "')").addClass('dActive');
			}
		}
		// Sets type to cookie, if it exists. Otherwise set cookie to all types of posts
		var theTypes="";
		if($.cookie('sTypes') == null){
			$.cookie('sTypes', "0,1,2", {expires: 10 * 365, path: "/",});
			theTypes=$.cookie('sTypes');
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
		console.log("N Settings was clicked");
		if($(this).hasClass('dActive')){
			$(this).removeClass('dActive');
		}
		else {
			$(this).addClass('dActive');
		}
		// Cycles through elements if there are any
		$('.dActive').each(function(i){
			if(i==0){
				//theDistricts=$(this).attr('id').substring(1);
				theDistricts=$(this).text() + ":" + $(this).find('input[type="hidden"]').val();
				console.log(theDistricts);
			}
			else {
				//theDistricts+="," + $(this).attr('id').substring(1);
				theDistricts+="/" + $(this).text() + ":" + $(this).find('input[type="hidden"]').val();
				console.log(theDistricts);
			}
			i++;
		});
		// If exists set cookie, if not remove cookie
		if ($(".dActive")[0]){
			$.cookie('dSubscribed', theDistricts, {expires: 10 * 365, path: "/",});
		}
		else {
			$.removeCookie('dSubscribed', { path: '/' });
		}
		console.log("Refreshing nav bar");
		refreshNBar();
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
	// Slide out list in the menu
	$('#nList').click(function(){
		// If currently sliding fixes bug where active class added at top but after second click, where two elements are active. Change this by looking to see if currently sliding, if so attach the removal of class active to the top
		if( ($('#nBreakdown').is(":animated")) && ($('#nBreakdown').is(":visible")) ){
			console.log("Currently animated");
			// If currently animated don't allow for events to be triggered
			return;
			/*$("#nBreakdown").promise().done(function() {
				console.log("Done with promise");
				$('#nList').removeClass('active');
			});*/
		}
		$(this).parent().next().slideToggle("slow",function(){
			// If hiding wait until hidden to change state
			if(!$(this).is(":visible")){
			console.log("Sliding up");
				if($('#nBreakdown .active').length != 0){
					$('#nList').addClass('active');
				}
			}
		});
		// If showing drop down change state right away
		if($(this).is(":visible")){
			console.log("Sliding down");
			$('#nList').removeClass('active');
		}
	});
	// Displays the Alerts
	function displayAlerts(districtId){
		// Change title to alerts
		$('#theTitle').html("My Alerts");
		$('#pageBody').html('<ul class="menu"></ul>');
		var dVal;
		/*
		if (typeof $.cookie('dSubscribed') === "undefined") {
			dVal="";
			$('#theTitle').html("All Alerts");
		}
		else {
			dVal=$.cookie('dSubscribed');
		}*/
		dVal=districtId;
		console.log(dVal);
		if(dVal===undefined || dVal==""){
			dVal="";
			$('#theTitle').html("All Alerts");
		}
		var tVal;
		if (typeof $.cookie('sTypes') === "undefined") {
			tVal="";
		}
		else {
			tVal=$.cookie('sTypes');
		}
		var url = 'mysql_parse.php?districts=' + dVal + '&type=' + tVal;
		console.log(url);
		$.getJSON(url, function(data) {
			$.each(data.posts, function(index, posts) {
				$('.menu').eq(0).append(
				  '<li class="boxPosts">' +
				    '<p class="title">' + 
				    checkCitywide(dVal,posts.districtId) +
				    posts.title.toUpperCase() + '</p>' +
				    '<div class="content">' +
				      '<div class="info">' + posts.content + '</div>' +
				      '<div class="moreInfo"><b>Author: </b>' + posts.authorName + '<br />&nbsp;&nbsp;<b>Date: </b>' + posts.date +'</div>' +
				    '</div>' +
				  '</li>'
				);
			});
			$('.menu').eq(0).prepend('<div id="refresh">REFRESH</div>');
			$('.menu').eq(0).prepend('<input type="hidden" name="currentDistricts" value="' + dVal + '">');
		});
		setTimeout(function() {
			$('#refresh').fadeIn("slow");
		}, 5000);
	}
	// Changes post to citywide
	function checkCitywide(allDistricts,currentDistrict){
		if((allDistricts!=1)&&(currentDistrict==1)){
			return "CITYWIDE: ";
		}
		else{return "";}
	}
	$('#refresh').live('click',function(){	
		var currentD=$('#pageBody').find('input[type="hidden"][name="currentDistricts"]').val();
		displayAlerts(currentD);
	});
	$('#gStarted').click(function(){
		//if($('#theTitle').html() != "Getting Started"){
			gStarted();
		//}
	});
	function gStarted(){
		// Change title to Getting Started
		$('#theTitle').html("Getting Started");
		$.get('pages/main.html', function(data) {
			$('#pageBody').html(data);
		});
	}
	function refreshNBar(){
		var dRaw=$.cookie('dSubscribed');
		if(dRaw!==undefined){
			var dRawSplit=dRaw.split("/");
			var dNum = new Array();
			var dName = new Array();
			for(var i=0;i<dRawSplit.length;i++){
				var dSplit=dRawSplit[i].split(":");
				if(dName.indexOf(dSplit[0]) === -1){
					dName.push(dSplit[0]);
					dNum.push(dSplit[1]);
				}
			}
			console.log(dNum);
			var theHTML="";
			for(var i=0;i<dName.length;i++){
				theHTML+='<li><a href="#" class="contentLink">' + 
				dName[i] + 
				'</a>' +
				'<input type="hidden" value="' +
				dNum[i] +
				'">' +
				'</li>';
			}
			theHTML+='<input type="hidden" value="' + dNum.join() + '" name="allSubscribed">';
			theHTML+='<input type="hidden" value="' + dName.join() + '" name="allNames">';
		}
		else{theHTML=""}
		$("#nChangeable").html(theHTML);
	}
	// Get if Alerts button is clicked
/*	$('#alerts').click(function(){
		var allSubscribed=$('#nChangeable').find('input[type="hidden"][name="allSubscribed"]').val();
		displayAlerts(allSubscribed);
	});*/
	$('#nBreakdown li a').live('click',function(){
		console.log("At neighborhood menubar");
		var currentDistrict=$(this).parent().find('input[type="hidden"]').val();
		if($(this).attr('id')=="alerts"){
			currentDistrict=$('#nChangeable').find('input[type="hidden"][name="allSubscribed"]').val();
		}
		if(currentDistrict!==undefined && currentDistrict.indexOf(',') !== -1){currentDistrict+=",1";}
		console.log(currentDistrict);
		displayAlerts(currentDistrict);
	});
	$('#cAlerts').live('click',function(){
		displayAlerts(1);
	});
	$('#resources').live('click',function(){
		rLoad();
	});
	function rLoad(){
		$('#theTitle').html("Resources");
		$.get('pages/resources.html', function(data) {
			$('#pageBody').html(data);
		});
	}
	// Initializes settings if they are already set
	if (typeof $.cookie('dSubscribed') != "undefined") {
		// Change to alerts by running function
		refreshNBar();
		$('#alerts').trigger('click');
		$('#nList').addClass('active');
		// Change menu to show Alerts as active
		//$("#menu li").removeClass('active');
		//$('#alerts').parent().addClass('active');
	}
});