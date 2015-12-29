<?php

echo "<h3>PSEUDO CODE FOR HEADER PHP</h3>";
echo "<div>Later here will be the helptext</div>";
echo "<ol>";
echo "<li> check if user is loged in - IF NOT go to ../index.php </li>";
echo "<li> If _header.inc.php is opened directtly open index.php instead</li>";
echo "<li> if hedaer.php is called (included) from dashboard.php, trainer.php, topic,php, course.php or sales.php do NOT present the SUB MENU</li>";
echo "<li> if User is not member of ROLE admin not not present menu admin</li>";
echo "<li> in case a button is pressed in  the main menu</li>";
echo "<ol>";
echo "	<li>Dashboard - will be defined later</li>";
echo "	<li>Event - laod event_grid.php</li>";
echo "	<li>Participant - loasd participant_grid.php</li>";
echo "	<li>Organization - load organization_grid.php</li>";
echo "	<li>Location<- load location_grid.php/li>";
echo "	<li>Location<- load location_grid.php/li>";
echo "	<li>sales - integarte \"candidate script\" of Martin PzP</li>";
echo "	<li>admin - a dropdown with a submenue is presented</li>";
echo "<ol>";
echo "	<li>Trainer</li>";
echo "	<li>Topic</li>";
echo "	<li>Course</li>";
echo "</ol>";
echo "<li>Logout - - use http://ethaizone.github.io/Bootstrap-Confirmation/# to confirm then logout an present Login.php</li>";
echo "</ol>";
echo "<li>in case a button is pressed in  the sub menu</li>";
echo "<ol>";
echo "<li>add participant - load EMPTY participamt_form.php in modal </li>";
echo "<li>add event - load EMPTY event_form.php in modal </li>";
echo "<li>add organization - load EMPTY organization_form.php in modal </li>";
echo "<li>add location - load EMPTY locatrion_form.php in modal </li>";
echo "<li>Help - the varable is set to true and the helptext will be presented on all pages as lon as the button is not pressed again - change the menue item so the ? is not crossed in red</li>";
echo "</ol>";
echo "</ol>";


?>