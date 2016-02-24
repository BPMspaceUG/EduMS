<?php
/* Created by cwalonka, explained by cneuland */

/**
 * @return array containing all parameters from URL (...index.php/x/y -> array('x','y'))
 */
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

?>