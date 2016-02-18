<?php
/**
 * API für rein lesenden Zugriff
 * User: cwalonka
 * Date: 04.10.15
 * Time: 12:39
 */
require_once 'untestetgetter.php';
require_once '../../DB_config/login_credentials_DB_bpmspace_edums_API.inc.php';
require_once 'functions.inc.php';


$routes = getRoute();// .../api/index.php/x/y --> array('x','y')
$response = array("respone" => "no data");

if(sizeof($routes)<2){ 
    //$response = $handler->showStartPage();
    //echo noLogin;
    exit;
}
//Start incl. LogIn
elseif(sizeof($routes)<3){

    $handler = new DBHandler($db);
    $response = $handler->getTrainerList();
}
//Aufruf mit topnav-Ziel
else{
    $handler = new DBHandler($db);
    $response = $handler->getTrainerList();
}

//echo "Debug - print variable 'response' in JSON";
echo json_encode($response);


?>