<?php
/*Activate the server, split url, start requesthandler*/
require_once 'RequestHandler.inc.php';
require_once '../../DB_config/login_credentials_DB_bpmspace_edums_API.inc.php';

function getRoute()
{
    /* Example-ULR: (http://localhost:4040/EduMS/api/whatami.php/a/j?q=u):
    * SCRIPT_NAME /EduMS/api/whatami.php
    * REQUEST_URI /EduMS/api/whatami.php/a/j?q=u
    
    http://localhost:4040/EduMS-client/index.php/partner1/abc?navdest=topics&contentid=1
    */
    //explode splits URL bsp:'/EduMS/api/whatami.php' and returns an array
    //array_slice 0,-1 deletes the last entry in the array #example:0 |1 EduMS |2 api |3 whatami.php -> 0 | 1 EduMs |2 api
    //implode '/' concat array to String use the seperator '/' #example: 0 | 1 EduMs |2 api -> '/EduMs/api/'
    $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';

    //substr(str,pos) returns reststring after pos
    //create an URI with the length of $basepath #example: '/EduMS/api/whatami.php/a/j?q=u' -> 'whatami.php/a/j?q=u'
    $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));

    //If $uri contains '?', cut everything after ? #example: whatami.php/a/j?q=u -> 'whatami.php/a/j'
    if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));

    // create an uri from '/'+$uri(without '/') #example: 'whatami.php/a/j' -> '/whatami.php/a/j'
    $uri = '/' . trim($uri, '/');

    $routes = array();
    $routes = explode('/', $uri);//#example: '/whatami.php/a/j' -> 0 | 1 whatami.php | 2 a | 3 j

    $result = array();
    //#example:  0 | 1 whatami.php | 2 a | 3 j -> 0 a | 1 j
    foreach($routes as $route)
    {
        //If not NULL AND not containing '.php'
        if(trim($route) != '' && strrpos(trim($route),'.php')==0)// (0==false) -> true
            array_push($result, $route);
    }

    return $result; 
}

const noLogin = "no Login parameters submitted, try '...EduMS/api/index.php/user/token'";

/*Split the url in its routing parts*/
$routes = getRoute();// .../api/index.php/x/y --> array('x','y')
$response = array("response" => "no data");

if(sizeof($routes)<2){ 
    echo noLogin;
    file_put_contents('logs/failLogInLog.log', date("d.m.Y - H:i:s",time())."\nnoLogin/fail request: ".implode($routes)."\n-----------\n", FILE_APPEND | LOCK_EX);
    exit;
}
//minimal valid request
elseif(sizeof($routes)<3){
    $user = $routes[0];
    $token = $routes[1];
    $routes[2] = 'brand';
    $handler = new RequestHandler($user,$token,$db);
    $response = $handler->handle($routes);
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