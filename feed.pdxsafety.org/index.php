<!DOCTYPE html> 
<html> 
	<head> 
	<title>Poliapp</title> 
	<meta charset="UTF-8">
	<link rel="icon" href="poliappfavicon.ico" type="image/x-icon" />
	<meta id="extViewportMeta" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />	
	<link rel="stylesheet" href="css/jquery.mobile-1.0rc2.min.css" />
	<link rel="stylesheet" href="css/main.css" />
	<script type="text/javascript" src="js/jquery-1.6.4.min.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.0rc2.min.js"></script>
	<script type="text/javascript" src="js/jquery.cookie.js"></script>
	<script type="text/javascript" src="js/slider.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
</head> 

<body> 
<div id="menu">
<h3>Menu</h3>
	<ul>
		<li><a href="#" class="contentLink" id="cAlerts">City Wide</a></li>
		<li><a href="#" class="contentLink" id="nList">My Neighborhoods</a></li>
		<ul id="nBreakdown">
			<li><a href="#" class="contentLink" id="alerts">All Alerts</a></li>
			<div id="nChangeable">
				<!--<li><a href="#" class="contentLink" id="n1">Neighborhood 1</a></li>-->
			</div>
		</ul>
		<!--<li><a href="#" class="contentLink" id="resources">Resources</a></li>-->
		<li><a href="#" class="contentLink" id="settings">Settings</a></li>		<li class="active"><a href="#" class="contentLink" id="gStarted">Getting Started</a></li>
	</ul>
</div>
<div data-role="page" class="pages" id="home">
	<div data-role="header">
	<a href="#" class="showMenu">Menu</a>
		<h1 id="theTitle">Getting Started</h1>
	</div><!-- /header -->
	<div data-role="content" id="pageBody">
<?php
echo file_get_contents('pages/main.html');
?>
	</div><!-- /content -->
</div><!-- /page -->
</body>
</html>
