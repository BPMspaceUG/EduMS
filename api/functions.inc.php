<?php
/**
 * Created by PhpStorm.
 * User: cwalonka
 * Date: 06.10.15
 * Time: 19:11
 */

/**
 * Gibt die in der Adressleiste als Adresse übergebenen Paramer zurück
 * @return array Pfad mit übergebenen Parametern
 */
function getRoute()
{
    $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
    $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
    if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
    $uri = '/' . trim($uri, '/');
    $routes = array();
    $routes = explode('/', $uri);
    $result = array();
    foreach($routes as $route)
    {
        if(trim($route) != '' && strrpos(trim($route),'.php')==0)
            array_push($result, $route);
    }
    return $result;
}

?>