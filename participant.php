<?php
include_once '_dbconfig.inc.php';
?>
<?php
include_once '_header.inc.php';
?>
<div class="clearfix"></div>
<div class="container">
 TABELLE participant
</div>
<?php
include_once '_footer.inc.php';
?>
<div 
 
<?php

echo "<div class=\"container 90_percent\"";

	echo "<ul class=\"nav nav-tabs\">";
	echo "<li class=\"active\"><a data-toggle=\"tab\" href=\"#participations\">participations</a></li>";
	echo" <li><a data-toggle=\"tab\" href=\"#address\">address</a></li>";
	echo" <li><a data-toggle=\"tab\" href=\"#contact\">contact</a></li>";
	echo" <li><a data-toggle=\"tab\" href=\"#sales\">sales</a></li>";
	echo" <li><a data-toggle=\"tab\" href=\"#community\">community</a></li>";
	echo" <ul>";
echo" </div>";

echo "<div class=\"container 90_percent\"";	
	echo" <div class=\"tab-content\">";
		echo" <div id=\"participations\" class=\"tab-pane fade in active\">";
		echo"   <h3>participations</h3>";
		echo"   <p>table of participations</p>";
		echo" </div>";
		
		echo" <div id=\"address\" class=\"tab-pane fade in active\">";
		echo"   <h3>address</h3>";
		echo"   <p>Some content.</p>";
		echo" </div>";
		
		echo" <div id=\"contact\" class=\"tab-pane fade\">";
		echo"   <h3>contact</h3>";
		echo"   <p>Some content in menu 1.</p>";
		echo" </div>";
		
		echo" <div id=\"sales\" class=\"tab-pane fade\">";
		echo"   <h3>sales</h3>";
		echo"   <p>Some content in menu 2.</p>";
		echo" </div>";
		
		echo" <div id=\"community\" class=\"tab-pane fade\">";
		echo"   <h3>community</h3>";
		echo"   <p>Some content in menu 2.</p>";
		echo" </div>";
		
	echo" </div>";
echo" </div>";

?>