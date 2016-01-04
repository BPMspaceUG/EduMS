<?php
/**
 * Created by PhpStorm.
 * User: cwalonka
 * Date: 30.09.15
 * Time: 08:49
 */
const noSuchUSer = 1001;
require_once 'DBManager.inc.php';
require_once 'RequestHandler.inc.php';
try{
    $apitoken = $_REQUEST['token'];
    $apiuser = $_REQUEST['user'];
    if(validateUser($apitoken,$apitoken)!=noSuchUSer){
        $requesthandler = new RequestHandler();
        $request = $_REQUEST['request'];
        switch ($request){
            case 'locations':

                break;
            case 'courses':

                break;


            case 'topic':
            default:

                break;
        }


    }
    else{
        echo json_encode(array('error'=>'no such user'));
    }
}
catch (Exception $e){
    print_r($e);
}



function validateUser($token,$user){
    $db = & getDB();
    $query = "";
    $result = $db->query($query);
    if(mysql_num_rows()>0){
        return $result;
    }
    return noSuchUSer;
}