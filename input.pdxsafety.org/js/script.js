var districtNumbers = ["510","520","530","540","550","560","570","580","590","610","620","630","641","642","651","652","660","670","680","690","711","712","720","730","741","742","800","810","821","822","830","841","850","860","871","872","881","882","890","901","902","911","912","921","922","923","931","932","941","942","951","952","961","962","971","972","981","982","990"];
var centralDistricts = ["711","712","720","730","741","742","800","810","821","822","830","841","850","860","871","872","881","882","890","1337"];
var eastDistricts =    ["901","902","911","912","921","922","923","931","932","941","942","951","952","961","962","971","972","981","982","990"];
var northDistricts =   ["510","520","530","540","550","560","570","580","590","610","620","630","641","642","651","652","660","670","680","690"];
var inputTypes = ["Neighborhood Safety", "Announcement", "BOLO"];
var subTypes = ["Special Events","Traffic","Criminal Activity", "Radar and Traffic Enforcement","Public Meeting","Crime Tip","LGBTQ"];
var url = 'php/mysql_parse.php?postnum=20&type=2';
var date = new Date(); date=date.getFullYear().toString().substr(2,2); //Gets last two digits of the year
var htmlStr = "";
var formPart = 1;

$(document).ready( function() {

LoadForm();

$(".menuItem").click( function() {
	location.href=$(this).children().attr("href"); //Links menu items at top to proper html file
});

/*$(".menuItem#menuBolo").click( function() {
	$("#dContent").html(htmlStr+boloStr);
	$(".preview").hide();
	$(".formPart2").hide();
	$(".formPart1").hide();
	$(".L1").hide();
	$(".bolo").show()
	
});*/

/*$(".menuItem#menuHelp, .menuItem#menuHelp a").click( function(e) {
	e.preventDefault(); //*prevents loading page
	$(this).blur();     //*subtle niceties
	$("#dContent").load( $(".menuItem#menuHelp a").attr("href") );
});*/

$("#backButton").click( function() {
	stepBack();
});

$(".checkboxLabel,.checkboxLabelchecked").click( function() { //steps forward from district select page
	step2(this);
});

$(".radioLabel,.radioLabelchecked").click( function() { //steps forward from Title/Content page
	step3(this);
});
$(".subTypeLabel,.subTypeLabelchecked").click( function() { //steps forward from subType page
	step4(this);
});

$(window).resize(function() {
  //resize just happened
  	showFormParts();
  	styleText();
	hideFormParts();
});		


$(".ddWrapper").click( function () { 								// When drops down box on district select page is clicked
	if($(this).next(".L1").css('display') === 'none') {				// Runs if drop down box is closed
		$(".L1").slideUp(500);										// Slides up all drop down boxes
		$(".ddarrow").attr("src",'img/ddarrow_down.png');
		$(this).next(".L1").slideDown(500);							// Slides down the proper drop down box
		$(this).find(".ddarrow").attr('src','img/ddarrow_up.png');
	}
	else {															// Runs if drop down box is open
		$(this).next(".L1").slideUp(500);							// Slides up the proper drop down box
		$(this).find("img").attr("src",'img/ddarrow_down.png');
	}
});

$("textarea[name=title]").focus( function () {						// Runs when Title textarea is clicked
	if($("textarea[name=title]").text() === 'Title') {				// If text is Title the text is removed
		$("textarea[name=title]").text('');
	}
});

$("textarea[name=content]").focus( function () {					// Runs when message content textarea is clicked
	if(	$("textarea[name=content]").text() === 'Enter your message here.') {	// If text is default then it is removed
		$("textarea[name=content]").text('');
	}
});

$("textarea[name=title]").blur( function () {						// Runs when Title textarea is deselected
	if($("textarea[name=title]").text() === '') {					// If there is nothing entered text is reset to default
		$("textarea[name=title]").text("Title");
	}
});

$("textarea[name=content]").blur( function () {						// Runs when message/content area is selected
	if(	$("textarea[name=content]").text() === '') {
		$("textarea[name=content]").text("Enter your message here.");		// If there is nothing entered text is reset to default
	}
});

});


var districtCount = 0;
function LoadForm() {
	
	htmlStr += "<form name='submitForm' method='post' action='php/contact.php'>";
	
	htmlStr += "<div id='statusBar' class='formPart2 formPart3 preview'> <h3 id='backButton' class='formPart2 formPart3 preview' > << Previous </h3> </div>";
	
	//North Precinct
	htmlStr += "<div class='ddWrapper formPart1'> <h2 class = 'formPart1'> North Precinct </h2>";
	
	htmlStr += "</div>";
	
	htmlStr += "<ul class = 'formPart1 L1'>";
	
	for(var i = 0; i < northDistricts.length; i++) {
		htmlStr += "<li><label class = 'checkboxLabel' for='checkbox-" + districtCount + "'> <input type='radio' class='neighborhoods' value='" + northDistricts[i] + "' name='district' id='checkbox-" + districtCount + "' style='display:none'/> <span class='labelText' id='checkboxspan-" + districtCount + "'>" + northDistricts[i] + " </span> </label></li>";
		districtCount++;
	}
	
	htmlStr += "</ul>";
	
	//Central Precinct
	htmlStr += "<div class='ddWrapper formPart1'> <h2 class = 'formPart1'> Central Precinct </h2>";
	
	htmlStr += "</div>";
	
	htmlStr += "<ul class = 'formPart1 L1'>";
	
	for(var i = 0; i < centralDistricts.length; i++) {
		htmlStr += "<li><label class = 'checkboxLabel' for='checkbox-" + districtCount + "'> <input type='radio' class='neighborhoods' value='" + centralDistricts[i] + "' name='district' id='checkbox-" + districtCount + "' style='display:none'/> <span class='labelText' id='checkboxspan-" + districtCount + "'>" + centralDistricts[i] + " </span> </label></li>";
		districtCount++;
	}
	
	htmlStr += "</ul>";
	
	//East Precinct
	htmlStr += "<div class='ddWrapper formPart1'> <h2 class = 'formPart1' > East Precinct </h2>";
	
	htmlStr += "</div>";
	
	htmlStr += "<ul class = 'formPart1 L1'>";
	
	for(var i = 0; i < eastDistricts.length; i++) {
		htmlStr += "<li><label class = 'checkboxLabel' for='checkbox-" + districtCount + "'> <input type='radio' class='neighborhoods' value='" + eastDistricts[i] + "' name='district' id='checkbox-" + districtCount + "' style='display:none'/> <span class='labelText' id='checkboxspan-" + districtCount + "'>" + eastDistricts[i] + " </span> </label></li>";
		districtCount++;
	}
	
	htmlStr += "</ul>";
	
	/*htmlStr += "<div class='ddWrapper formPart1'> <h2 class='formPart1'> City Wide </h2>";*/

        htmlStr += "<label class = 'checkboxLabel ddWrapper formPart1' for='checkbox-" + districtCount + "'>";
	
	htmlStr += "<input type='radio' class='neighborhoods' name='district' value='1' id='checkbox-" + districtCount + "' style='display:none'>";
	
	htmlStr += "<h2> City Wide </h2> </label>";
	
	districtCount++;
	
	//htmlStr += "<div><a class='formPart1' href='#' onclick='step2();return false;'>Next</a></div>";

	htmlStr += "<textarea class ='formPart2 textarea' name='title' rows='1' cols='50' maxLength='60'></textarea> <br />";

	htmlStr += "<textarea class ='formPart2 textarea' name='content' rows='9' cols='50'></textarea> <br />";
	
	for (var i = 0; i < inputTypes.length; i++) {
		htmlStr += "<label for='radio-" + i + "' class='formPart2 radioLabel'> <input type='radio' class='alertType' value='" + i + "' name='alertType' id='radio-" + i + "' style='display:none'> <span class='labelText' id='radiospan-" + i + "'>" + inputTypes[i] + " </span> </label>";
	}
	
	//htmlStr += "<a class='formPart2' style='display:none;' href='#' onclick='step3();return false;'>Next</a>"
	
	for (var i = 0; i < subTypes.length; i++) {
		htmlStr += "<label for='subType-" + i + "' class='formPart3 subTypeLabel'> <input type='radio' class='' name='subType' id='subType-" + i + "' value='" + i + "' style='display:none'> <span class='labelText' id='subTypespan-" + i + "'>" + subTypes[i] + " </span> </label>";
	}
	
	htmlStr += "<p class='preview previewParagraph' id='previewDistrict'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewTitle'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewContent'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewType'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewSubType'> </p>";
	
	htmlStr += "<label class='preview' id='previewCaseLabel'>Case Number (required for BOLO's): <b>" + date + "</b></label>";
	
	htmlStr += "<textarea class ='preview' name='caseNum' rows='1' cols='20' style='vertical-align:bottom;'> </textarea> </br>";
	
	htmlStr += "<label class='preview' id='previewAuthorName'> Author Name: </label>";
	
	htmlStr += "<textarea class ='preview' name='author' rows='1' cols='20' style='vertical-align:bottom;'> </textarea> </br>";
	
	htmlStr += "<label class='preview' id='password' > Password: </label>";
	
	htmlStr += "<input type='password' class='preview' name='pass' style='vertical-align:bottom;'> </textarea> </br>";
	
	htmlStr += "<input type='hidden' name='input' value='True'>";
	
	htmlStr += "<input type='submit' class='preview' id='submitButton' value='Submit' />";
	
	htmlStr += "</form>";
	
	$("#dContent").html(htmlStr);
	
	$("textarea[name=title]").text("Title");
	
	$("textarea[name=content]").text("Enter your message here.");
	
	styleText();
	
	hideFormParts();
	
	/*htmlStr += "<ul class='bolo' id='boloFeed'>";
	
	for(int i = 0; i< ; i++) {
	
		htmlStr += "<li class='bolo boloItem' id='boloItem" + i + "'>";
	
		htmlStr += "</li>";
	
	}
	
	htmlStr += "</ul>";*/
	
}

function stepBack() {
	if($(".formPart1").css('display') === 'none' && $(".subTypeLabel").css('display') === 'none' && $('#submitButton').css('display') === 'none') {
		$(".preview").hide();
		$(".formPart2").hide();
		$(".formPart3").hide();
		$(".formPart1").show();
		$(".L1").hide();
		$(".ddarrow").attr("src",'img/ddarrow_down.png');
		formPart = 1;
	}
	else if($(".formPart1").css('display') === 'none' && $(".radioLabel").css('display') === 'none' && $('#submitButton').css('display') === 'none') {
		$(".preview").hide();
		$(".formPart1").hide();
		$(".formPart3").hide();
		$(".formPart2").show();
		formPart = 2;
	}
	else if($('#submitButton').css('display') != 'none') {
		$(".preview").hide();
		$(".formPart1").hide();
		$(".formPart2").hide();
		$(".formPart3").show();
		formPart = 3;
	}
}

function step2(e){
	for(var i = 0; i < districtNumbers.length; i++) {
		$("#checkbox-" + i + "").parent().removeClass('checkboxLabelchecked');
	}
	$(e).addClass('checkboxLabelchecked');
	$(e).children().attr('checked', 'checked');
	if($('#submitButton').css('display') == 'none') {
		$(".preview").hide();
		$(".formPart1").hide();
		$(".formPart3").hide();
		$(".formPart2").show();
		formPart = 2;
	}
	
}

function step3(e) {
	for(var i = 0; i < inputTypes.length; i++) {
		$("#radio-" + i + "").parent().removeClass('radioLabelchecked');
	}
	$(e).addClass('radioLabelchecked');
	$(e).children().attr('checked', 'checked');
	if($('#submitButton').css('display') == 'none') {
		$(".formPart1").hide();
		$(".formPart2").hide();
		$(".preview").hide();
		$(".formPart3").show();
		$(".L1").hide();
		$(".ddarrow").attr("src",'img/ddarrow_down.png');
		formPart = 3;
	}
}

function step4(e) {
	for (var i = 0; i < subTypes.length; i++) {
		$("#subType-" + i + "").parent().removeClass('subTypeLabelchecked')
	}
	$(e).addClass('subTypeLabelchecked');
	$(e).children().attr('checked','checked');
	if($('#submitButton').css('display') == 'none') {
		$(".formPart1").hide();
		$(".formPart2").hide();
		$(".formPart3").hide();
		$(".preview").show();
		$(".L1").hide();
		$(".ddarrow").attr("src",'img/ddarrow_down.png');
		formPart = 4;
	}
	loadPreview();
}
 
function loadPreview() {
	var districtNum;
	var alertType;
	var subType;
	
	for(var i = 0; i < districtCount; i++) {
		if($("#checkbox-" + i + "").prop("checked") === true){
			districtNum = $("#checkbox-" + i + "").val();
			break;
		}
	}
	
	for(var i = 0; i < inputTypes.length; i++) {
		if($("#radio-" + i + "").prop("checked") === true){
			alertType = $("#radio-" + i + "").val();
			break;
		}
	}
	
	for(var i = 0; i < subTypes.length; i++) {
		if($("#subType-" + i + "").prop("checked") === true){
			subType = $("#subType-" + i + "").val();
			break;
		}
	}
	
	if(districtNum === '1') {
		districtNum = 'City Wide';
	}
	
	$("#previewDistrict").text("District: " + districtNum);
	
	$("#previewTitle").text("Title: " + $("textarea[name=title]").val());
	
	$("#previewContent").text("Content: " + $("textarea[name=content]").val());
	
	$("#previewType").text("Type: " + inputTypes[alertType]);
	
	$("#previewType").text("SubType: " +subType);
}

function styleText() {
	var arrayLoc,textSize;
	
	$(".labelText").css("font-size", 64);
	
	arrayLoc = selectLongest(districtNumbers);
	textSize = resizeText($("#checkboxspan-" + arrayLoc + ""), $("label[for='checkbox-" + arrayLoc + "']"));
	for(var i = 0; i < districtCount-1; i++) {
		$("#checkboxspan-" + i + "").css("font-size", textSize);
		centerTextVertical($("#checkboxspan-" + i + ""), $("label[for='checkbox-" + i + "']"));
	}
	
	
	arrayLoc = selectLongest(inputTypes);
	textSize = resizeText($("#radiospan-" + arrayLoc + ""),$("label[for='radio-" + arrayLoc + "']"));
	for(var i = 0; i < inputTypes.length; i++) {
		$("#radiospan-" + i + "").css("font-size", textSize);
		centerTextVertical($("#radiospan-" + i + ""),$("label[for='radio-" + i + "']"));
	}
	
	
	arrayLoc = selectLongest(subTypes);
	textSize = resizeText($("#subTypespan-" + arrayLoc + ""),$("label[for='subType-" + arrayLoc + "']"));
	for(var i = 0; i < subTypes.length; i++) {
		$("#subTypespan-" + i + "").css("font-size", textSize);
		centerTextVertical($("#subTypespan-" + i + ""), $("label[for='subType-" + i + "']"));
	}
	
	
	
	/*var textSize;
	for(var i = 0; i < districtCount-1; i++) {
	textSize = $("#checkboxspan-" + i + "").css("font-size");
	textSize = parseInt(textSize.replace("px",""));
		while($("#checkboxspan-" + i + "").height() > $("label[for='checkbox-" + i + "']").height() || $("#checkboxspan-" + i + "").width() > $("label[for='checkbox-" + i + "']").width()) {
			textSize -= 1;
			$("#checkboxspan-" + i + "").css("font-size", textSize);
			//break;
		}
		centerTextVertical($("#checkboxspan-" + i + ""), $("label[for='checkbox-" + i + "']"));
	}
	var textSize;
	for(var i = 0; i < inputTypes.length; i++) {
	textSize = $("#radiospan-" + i + "").css("font-size");
	textSize = parseInt(textSize.replace("px",""));
		while($("#radiospan-" + i + "").height() > $("label[for='radio-" + i + "']").height() || $("#radiospan-" + i + "").width() > $("label[for='radio-" + i + "']").width()) {
			textSize -= 1;
			$("#radiospan-" + i + "").css("font-size", textSize);
			//break;
		}
		centerTextVertical($("#radiospan-" + i + ""),$("label[for='radio-" + i + "']"));
	}
	for(var i = 0; i < subTypes.length; i++) {
	textSize = $("#subTypespan-" + i + "").css("font-size");
	//console.log(textSize);
	textSize = parseInt(textSize.replace("px",""));
	console.log(textSize);
		while(textSize > 4 && ($("#subTypespan-" + i + "").height() > $("label[for='subType-" + i + "']").height() || $("#subTypespan-" + i + "").width() > $("label[for='subType-" + i + "']").width())) {
			textSize -= 2;
			$("#subTypespan-" + i + "").css("font-size", textSize);
			//break;
		}
		centerTextVertical($("#subTypespan-" + i + ""), $("label[for='subType-" + i + "']"));
	}*/
}

function selectLongest(array) {
	var longestLabel = 0;
	for(var i = 0; i < array.length; i++) {
		if(array[i].length > array[longestLabel].length) {
			longestLabel = i;
		}
	}
	return longestLabel;
}

function resizeText(inside, outside) {
	var textSize = inside.css("font-size");
	textSize = parseInt(textSize.replace("px",""));
	while(inside.height() > outside.height() || inside.width() > outside.width()) {
		textSize -= 4;
		inside.css("font-size", textSize);
	}
	return textSize;
}

function centerTextVertical(smaller,larger) {
	var heightDiff = larger.height()-smaller.height();
	smaller.css("margin-top", heightDiff/2);
}

function hideFormParts() {
	if(formPart === 1) {
		$(".preview").hide();
		$(".formPart2").hide();
		$(".formPart3").hide();
		$(".formPart1").show();
		$(".L1").hide();
	}
	else if(formPart === 2) {
		$(".preview").hide();
		$(".formPart1").hide();
		$(".formPart3").hide();
		$(".formPart2").show();
	}
	else if(formPart === 3) {
		$(".formPart1").hide();
		$(".formPart2").hide();
		$(".preview").hide();
		$(".formPart3").show();
		$(".L1").hide();
	}
	else {
		$(".formPart1").hide();
		$(".formPart2").hide();
		$(".formPart3").hide();
		$(".preview").show();
		$(".L1").hide();
		$(".ddarrow").attr("src",'img/ddarrow_down.png');
	}
	
}

function showFormParts() {
	$(".preview").show();
	$(".formPart2").show();
	$(".formPart3").show();
	$(".formPart1").show();
	$(".L1").show();
}