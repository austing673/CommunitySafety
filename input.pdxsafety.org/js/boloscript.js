var url = 'php/mysql_parse.php?postnum=20&type=2';
var boloStr = "";
//var postID = [];


$(document).ready( function() {

$(".menuItem").click( function() {
	location.href=$(this).children().attr("href");
});


$.getJSON(url, function(data) {
	
	boloStr += "<ul class='bolo' id='boloFeed'>";
	$.each(data.posts, function(index, posts) {
    	
        /*'<div class="post_title">\n' +
        '  <p class="title">' + posts.title + '</p>\n' +
        '  <p class="date">' + posts.date + '</p>\n' +
        '  <p style="clear: both;"></p>\n' +
        '</div>\n' +
        '<div class="post_message">' + posts.districtId + ": " + posts.content + '</div>\n<br />\n'*/
        
        boloStr += "<li class='bolo boloItem'>";
		
		boloStr += "<div class='bolo boloTitleBar' onclick='boloDropDown(this)'>";
		
		boloStr += "<div class='bolo deleteIcon' onclick='deleteBolo(this)'> </div>";
		
		boloStr += "<input type='checkbox' value='" + posts.id + "' style='display:none'/>";
		
		boloStr += "<div class='bolo boloDistrictNum'> <p>District " + posts.districtId + " </p> </div>";
		
		boloStr += "<div class='bolo boloCaseNum'> <p> Case Number: 13 - " + posts.caseNum.replace(" ", "") + " </p> </div>";
		
		boloStr += "<div class='bolo boloDate'> <p>" + posts.date + " </p></div>";
		
		boloStr += "</div>";
		
		boloStr += "<div class='bolo boloContent'>";
		
		
		boloStr += "<div class='bolo boloTitle'> <h4>" + posts.title + "</h4> </div>";
		
		boloStr += "<div class='bolo boloInfo'> <p>" + posts.content + "</p> </div>";
		
		boloStr += "<div class='bolo boloAuthor'> <p> Author: " + posts.authorName + "</p> </div>";
		
		boloStr += "</div>";
		
		boloStr += "</li>";
		
        });
        boloStr += "</ul>";
        
    	
    	$("#dContent").html(boloStr);
    });
    
});

function boloDropDown(e) {
	if($(e).next().css('display') === 'none') {
		$(e).next().slideDown(200);
	}
	else {
		$(e).next().slideUp(200);
	}
}

function deleteBolo(e) {
	 if (e.stopPropagation){
       e.stopPropagation();
   }
   else if(window.event){
      window.event.cancelBubble=true;
   }
	if(window.confirm("Are you sure you want to delete this BOLO? \n\nDELETING A BOLO IS NOT REVERSIBLE. \n\nDeleting a BOLO will remove the post from the system and users will no longer see the post. \n\nOnly delete a BOLO if you have responded to this BOLO OR you know that the BOLO has been responded to.")) {
		$(e).parent().parent().hide();
		
		$.post('php/contact.php', { id: $(e).next().val(), archive: true});
	}
}