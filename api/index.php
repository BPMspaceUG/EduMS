<?php
/*Activate the server, split url, start requesthandler*/
require_once 'RequestHandler.inc.php';
require_once '../../DB_config/login_credentials_DB_bpmspace_edums_API.inc.php';
require_once 'functions.inc.php';

const noLogin = "no Login parameters submitted, try '...EduMS/api/index.php/Partner1/abc'";

/*Split the url in its routing parts*/
$routes = getRoute();// .../api/index.php/x/y --> array('x','y')
$response = array("response" => "no data");

if(sizeof($routes)<2){ 
    echo noLogin;
    file_put_contents('failLogInLog.txt', date("d.m.Y - H:i:s",time())."\nnoLogin/fail request: ".implode($routes)."\n-----------\n", FILE_APPEND | LOCK_EX);
    exit;
}
//minimal valid request
elseif(sizeof($routes)<3){
    $user = $routes[0];
    $token = $routes[1];
    $handler = new RequestHandler($user,$token,$db);
    $response = $handler->showStartPage();
}
//extended request
else{
    $user = $routes[0];
    $token = $routes[1];
    $handler = new RequestHandler($user,$token,$db);
    $response = $handler->handle($routes);// 0 = Benutzer | 1 = Passwort | 2 = section
}

//Call a debug-funktion with the url-ending:'.../api/index.php/x/y?debug=1'
if(isset($_REQUEST['debug']) && $_REQUEST['debug']){
    echo "<pre>";
    //echo "Debug - print variable 'response':\n";
    var_dump($response);
    echo "<hr>JSON<br>";
}

/*Generate a default navigation*/
if (is_array($response)) {
    if(!array_key_exists('topnav',$response)){
        $response['topnav']  = array(
            array("text"=>"Standorte","path"=>"?navdest=locations"),
            array("text"=>"Anmeldung","path"=>"?navdest=signup"),
            array("text"=>"Pakete","path"=>"?navdest=packages"),
            array("text"=>"Themen","path"=>"?navdest=topics"),
            array("text"=>"Brand","path"=>"?navdest=Brand"),
            array("text"=>"Monitor","path"=>"?navdest=Monitor"));
    }
    if(!array_key_exists('footer',$response)){
        $response['footer'][0]['text']  = $config['text']['defaultfooter'];
    }
}

/*Finally send a JSON-encoded, handled response.*/
echo json_encode($response);
?>