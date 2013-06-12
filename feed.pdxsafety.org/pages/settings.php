
	<ul class="menu">
		<li class="boxPosts">
			<p class="settings">NEIGHBORHOODS</p>
			<ul class="settingsSelect">
<?php
//MySQL information
$mysql_host='mysql.pdxsafety.org';
$mysql_user='poliapp';
$mysql_passwd='safecommunity503';
$mysql_dbname='poliappdb';
$con=mysqli_connect($mysql_host,$mysql_user,$mysql_passwd,$mysql_dbname);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
// Add  AND WHERE type in .. for sorting by type
$sql = "SELECT * FROM `districts` ORDER BY `districtName`";
//echo $sql;
$result = mysqli_query($con, $sql);
$json = array();
while($row = mysqli_fetch_array($result)) {
  $posts = array(
	'dName' => $row['districtName'],
	'dNum' => $row['districtNum'],
  );
  array_push($json, $posts);
}
//var_dump($json);
foreach ($json as $value) {
    echo '<li class="dSettings">' . $value['dName'] . '<input type="hidden" value="' . $value['dNum'] .'">' . '</li>';
}
mysqli_close($con);
?>
			</ul>
		</li>
		<li class="boxPosts">
			<p class="settings">TYPE</p>
			<ul class="settingsSelect">
				<li class="tSettings" id="t0">Crime</li>
				<li class="tSettings" id="t1">PSA: Public Service Announcement</li>
				<li class="tSettings" id="t2">BOLO: Be on the Lookout For</li>
			</ul>
		</li>
	</ul>