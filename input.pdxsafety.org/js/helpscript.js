$(document).ready( function() {

$(".menuItem").click( function() {
	location.href=$(this).children().attr("href");
});

});