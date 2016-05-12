<?php
  //===============================================================
  //                          EduMS Header
  //===============================================================
  include_once '../phpSecureLogin/includes/db_connect.inc.php';
  include_once '../phpSecureLogin/includes/functions.inc.php';
  
  sec_session_start(); 
  if(login_check($mysqli) != true) {
    header("Location: ../index.php?error_messages='You are not logged in!'");
    exit();
  }
  else
    $logged = 'in';
  
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" ng-app="phonecatApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>BPMspace EduMS</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link rel="stylesheet" href="http://www.fuelcdn.com/fuelux/3.13.0/css/fuelux.min.css">
<link rel="stylesheet" href="custom/custom.css">
<!----- js scripts are loadede in the footer -------------------->
  <!-- AngularJS -->
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
  <script type="text/javascript" src="https://code.angularjs.org/1.4.9/angular-sanitize.min.js"></script>
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
  <!-- BootstrapUI -->
	<script type="text/javascript" src="js/ui-bootstrap-1.3.1.min.js"></script>
	<script type="text/javascript" src="js/ui-bootstrap-tpls-1.3.1.min.js"></script>
  <!-- TinyMCE -->
  <script src="https://cdn.tinymce.com/4/tinymce.min.js"></script>
  <script src="js/tinymceng.js"></script>
	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/xeditable.min.js"></script>
  <script type="text/javascript" src="./jquery_plugin/tablesorter-master/jquery.tablesorter.js"></script> 
  <script type="text/javascript" src="https://www.fuelcdn.com/fuelux/3.13.0/js/fuelux.min.js"></script>
</head>
<body ng-controller="PhoneListCtrl">
<?php

?>
<div class="container">
	<div class="container">
		<div class="col-md-8"></div>
	  	<div class="col-md-4"><?php include_once '../_header_LIAM.inc.php'; ?></div>
	</div>

    <div class="container text-right">
	<a href='#' class="btn collapsed row" data-toggle="collapse" data-target="#logo"><i class="fa fa-caret-square-o-down"></i></a>
	</div>
	<div class="row collapse in" id="logo">
	  <div class="col-md-6"><img src="../images/yourLogo.png" alt="mITSM Logo Partner-Network"></div>
	  <div class="col-md-6"><img class="pull-right" src="../images/bpmspace_icon-EduMS-right-200px-text.png" alt="mITSM Logo Partner-Network" width=80% height=80%></div>
	</div>
</div>
</br>
<div class="clearfix"></div>
<!--------------- MAIN MENU --------->
<?php
  include_once("inc/RequestHandler.inc.php");
?>
<div class="container">
  <nav class="navbar">
    <ul role="navigation" class="nav nav-pills">
      <li><a href="dashboard.php" title='Dashboard' class="btn btn-large btn-primary"><i class="fa fa-tachometer"></i>&nbsp;Dashboard</a></li>
      <li><a href="event.php" title='Show all Events' class="btn btn-large btn-primary"><i class="fa fa-calendar"></i>&nbsp;Events</a></li> 
      <li><a href="participant.php" title='Show all Participants' class="btn btn-large btn-primary"><i class="fa fa-user"></i>&nbsp;Participant</a></li>  
      <li><a href="organization.php" title='Show all Organizations' class="btn btn-large btn-primary"><i class="fa fa-cubes"></i>&nbsp;Organization</a></li>
      <li><a href="location.php" title='Show all Locations' class="btn btn-large btn-primary"><i class="fa fa-location-arrow"></i>&nbsp;Location</a></li>  
      <li><a href="sales.php" title='Start Sales activity' class="btn btn-large btn-primary"><i class="fa fa-usd"></i>&nbsp;Sales</a></li>  
      <li class="dropdown">
        <a title='Admin'  data-toggle="dropdown" class="dropdown-toggle btn btn-large btn-primary"><i class="fa fa-user-secret"></i>&nbsp;Admin<b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="user.php" title='user'  class="btn btn-large btn-primary"><i class="fa fa-user-plus"></i>&nbsp;User</a></li>
            <li><a href="topic.php" title='Topic'  class="btn btn-large btn-primary"><i class="fa fa-folder-o"></i>&nbsp;Topic</a></li>
            <li><a href="trainer.php" title='Trainer' class="btn btn-large btn-primary"><i class="fa fa-graduation-cap"></i>&nbsp;Trainer</a></li>
            <li><a href="course.php" title='Course' class="btn btn-large btn-primary"><i class="fa fa-university"></i>&nbsp;Course</a></li>
            <li><a href="brand.php" title='Brand' class="btn btn-large btn-primary"><i class="fa fa-star"></i>&nbsp;Brand</a></li>
          </ul>
      </li>
      <li><a href="../phpSecureLogin/includes/logout.php" title='Logout' class="btn btn-large btn-primary"><i class="fa fa-sign-out"></i>&nbsp;Logout</a></li>
    </ul>
  </nav>
</div>
<?php
/* presente $error_messages when not empty */
if (!empty($_GET["error_messages"])) {
	  echo '<div class="container alert alert-danger 90_percent" role="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' ;
		echo '&nbsp;error:&nbsp;' . htmlspecialchars($_GET["error_messages"]);
		echo '</br></div>';
}
?>
<!--------------- END MAIN MENU --------->
<!--------------- SUB MENU --------->
<div class="clearfix"></div>
<div class="container 90_percent" >
	<a href="#" class="btn btn-default" title='Add new Participant'><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-user"></i></a>  
	<a href="#" class="btn btn-default" title='Add new Event'><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-calendar"></i></a>  
	<a href="#" class="btn btn-default" title='Add new Organization'><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-cubes"></i></a>  
	<a href="#" class="btn btn-default" title='Add new Location'><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-location-arrow"></i></a>  
	<a href="#" class="btn btn-default" title='book participant on event'><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-user"></i>&nbsp;<i class="fa fa-calendar"></i></a>
	<a href="#" class="btn btn-default" title='book trainer on event'><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-graduation-cap"></i>&nbsp;<i class="fa fa-calendar"></i></a>
	<a href="#" title='switch help on/off' class="btn btn-large btn-default navbar-right">
			<span class="fa-stack  ">
				  <i class="fa fa-question fa-stack-1x"></i>
				  <i class="fa fa-ban fa-stack-1x text-danger"></i>
			</span>Help</a>
</div>
<div class="clearfix"></br></div>
<!--------------- END SUB MENU --------->
<?php
  $help_text = "true";
  /* presente file with helptxt if $help_text = "true" (or set) when not empty */
  if ($help_text) {
    echo '<div class="container bg-info 90_percent" >' ;
    echo "<a data-toggle=\"collapse\" data-target=\"#collapse_help_header\" >PSEUDO CODE FOR HEADER PHP - Later here will be the helptext&nbsp;<i class=\"fa fa-chevron-down\"></i></a>";
    echo "<div id=\"collapse_help_header\" class=\"collapse\"> ";
    include_once '_header_helptxt.inc.php';
    echo "</div>";
    echo "</div><p></p><p></p>";      
  }
?>



