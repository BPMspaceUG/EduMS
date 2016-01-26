<?php
/**
 * API für rein lesenden Zugriff
 * User: cwalonka
 * Date: 04.10.15
 * Time: 12:39
 */
require_once 'RequestHandler.inc.php';
require_once '../../DB_config/login_credentials_DB_bpmspace_edums_API.inc.php';
require_once 'functions.inc.php';

const noLogin = "no Login parameters submitted, try '...EduMS/api/index.php/Partner1/abc'";
const helptext = "fail";


$routes = getRoute();// .../api/index.php/x/y --> array('x','y')
$response = array("respone" => "no data");

if(sizeof($routes)<2){ 
    echo noLogin;
    exit;
}
//Start incl. LogIn
elseif(sizeof($routes)<3){
    $user = $routes[0];
    $token = $routes[1];
    $handler = new RequestHandler($user,$token,$db);
    $response = $handler->showStartPage();
}
//Aufruf mit topnav-Ziel
else{
    $user = $routes[0];
    $token = $routes[1];
    $handler = new RequestHandler($user,$token,$db);
    $response = $handler->handle($routes);
}

//Aufruf der Debug-Funktion durch '.../api/index.php/x/y?debug=18234'
if(isset($_REQUEST['debug']) && $_REQUEST['debug']){
    echo "<pre>";
    echo "Debug - print variable 'response':\n";
    var_dump($response);
    echo "<hr>JSON<br>";
}


if(!array_key_exists('topnav',$response)){
    $response['topnav']  = array(
        array("text"=>"Standorte","path"=>"?navdest=locations"),
        array("text"=>"Anmeldung","path"=>"?navdest=signup"),
        array("text"=>"Pakete","path"=>"?navdest=packages"),
        array("text"=>"Themen","path"=>"?navdest=topics"));
}
if(!array_key_exists('footer',$response)){
    $response['footer'][0]['text']  = $config['text']['defaultfooter'];
}
/*
if(!array_key_exists('nextEvents',$response)){
    $response['nextEvents'] = $handler->getNextEvents();
}*/

echo "Debug - print variable 'response' in JSON";
echo json_encode($response);


?>