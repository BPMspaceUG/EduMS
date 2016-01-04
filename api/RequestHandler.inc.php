<?php

/**
 * Created by PhpStorm.
 * User: cwalonka
 * Date: 30.09.15
 * Time: 09:08
 */
class RequestHandler
{
    private $userid = -1;
    private $token = -1;
    private $validLogin = false;
    private $db;
    private $discount = 0;


    private function getResultArray($query){
        global $db;
        if(isset($_REQUEST['debug']) && $_REQUEST['debug']){
            echo "<pre>";
            echo "<hr>Query:<br>";
            var_dump($query);
            echo "</pre>";

        }
        $results_array = array();
        $result = $db->query($query);
        while ($row = $result->fetch_assoc()) {
            $results_array[] = $row;
        }
        return $results_array;
    }

    /**
     * @param $userid
     * @param $token
     * @param $db
     */
    public function __construct($userid, $token, $db)
    {
        $this->db = $db;
        $this->validLogin=$this->validateCredentials($userid,$token);
    }

    /**
     * Validates the Login of an User
     * @param $userid
     * @param $token
     * @return bool is Valid?
     */
    private function validateCredentials($userid,$token){
        global $db;
        $sql = "SELECT * FROM `brand`
                  WHERE accesstoken = '".$db->real_escape_string($token)."' AND
                  login = '".$db->real_escape_string($userid)."'";
        $result = $db->query($sql);
        if($result->num_rows>0){
            $result = $this->discount = $result->fetch_array();
            $this->discount = $result['discount'];
            $this->userid = $result['brand_id'];
            return true;
        }
        return false;
    }

    /**
     * removes the first element from an array
     * @param $handle Array
     * @return array Result
     */
    private function rmFirstParam($handle){
        unset($handle[0]);
        $result = array();
        foreach($handle as $key){
            $result[]=$key;
        }
        return $result;
    }

    /**
     * Switches between the URL-called functions
     * @param $route URL
     * @return array|bool|mixed|mysqli_result
     */
    public function handle($route){
        if(!$this->validLogin){
            return array ("response"=>"invalidCredentials");
        }
        $route = $this->rmFirstParam($route);
        $route = $this->rmFirstParam($route);
        $section = $route[0];
        $handle = $this->rmFirstParam($route);


        switch($section){
            /*
             * Handles all Requests for Locations
             * /location = Liste aller Locations die freigegeben sind incl. events
             * /location/{id} = Location der id incl. incl. events
             */
            case 'location':
                $return = $this->handleLocations($handle);
                $return['topnav'] = array(
                    array("text"=>"Anmeldung","path"=>"?navdest=signup"),
                    array("text"=>"Standorte","path"=>"?navdest=locations"),
                    array("text"=>"Pakete","path"=>"?navdest=packages"),
                    array("text"=>"Themen","path"=>"?navdest=topics"));
                return $return;
                break;

            case 'events':
                /*
                /events = Liste aller Events die freigegben sind
                /events/id = Daten des Events
                */
                return $this->handleEvents($handle);
                break;

            case 'topics':
                /*
                /topics == Liste aller Topics
                /topics/{id} = Daten eines Topics incl. events
                */
                return $this->handleTopic($handle);
                break;

            case 'package':
                /*
                 *
                */
                return $this->handlePackage($handle);
                break;


            case 'css':
                /*
                 *
                */
                echo $css = '
                        #seite {
            width: 780px;
            margin: 0 auto;
        }

        #kopfbereich {
            background-color:lightblue;
        }

        #inhalt {
            background-color: lightgreen;
            margin-right: 250px;
        }

        #steuerung {
            float: right;
            width:250px;
            background-color: yellow;
        }

        #fussbereich {
            clear: both;
            background-color:lightblue;
        }
        ';
                exit;
                break;

            case "signup":
                $return['content'] = array(
                    array(
                        "text"=>
                            '
<p>Kursanmeldung</p>
<form method="POST" action form.php>
Name          <input type="text" name="name" \>
Vorname          <input type="text" name="vorname" \>
E-Mail          <input type="email" name="email" \>
</form>'
                    )
                );
                return $return;
                break;


            default:
                echo "fail";
                exit;
                break;

        }
    }

    ###################################################################################################################
    ####################### Definition der Handles
    ###################################################################################################################


    public function showStartPage(){
        $return['sidebar'] = array(array("text"=>"Der Standard ISO 27000 beschäftigt sich mit der Einführung von den Mindestanforderungen an und dem Risikomanagement bei einem Informationssicherheitsmanagementsystem (ISMS) einer IT Organisation."));
        $return['content'] = array(array("text"=>"Hier gibt es eine übersicht der möglichen Kurse"));
        return $return;
    }

    private function handleTopic($handle){

        $parameters = sizeof($handle); //wie viele Parameter wurden übergeben?
        if($parameters==0){ //api/usr/token/topics/
            return $this->getTopicList(); //done
        }
        elseif($parameters == 1){ //api/usr/token/topics/12345
            $param = intval($handle[0]);
            return $this->getTopicList($param);
        }

        //@TODO
    }


    private function handlePackage($handle){

        $parameters = sizeof($handle); //wie viele Parameter wurden übergeben?
        if($parameters==0){ //api/usr/token/package/
            $return = $this->getPackageList();
            $return['nextEvents'] = $this->getEvents();
            $return['sidebar'] = array(array("text"=>"Der Standard ISO 27000 beschäftigt sich mit der Einführung von den Mindestanforderungen an und dem Risikomanagement bei einem Informationssicherheitsmanagementsystem (ISMS) einer IT Organisation."));
            $return['footer'] = array(array("text"=>"Alle Preise verstehen sich zzgl. 19% MwSt. Auf Schulungen in englischer Sprache erheben wir eine einmaligen Aufschlag von 150€."));
            return $return;
        }
        elseif($parameters == 1){ //api/usr/token/topics/12345
            $param = intval($handle[0]);
            $return = $this->getPackageList($param);
            $return['nextEvents'] = $this->getEvents();
            $return['topnav'] = array(array("text"=>"Anmeldung","path"=>"signup/"),array("text"=>"Standorte","path"=>"locations/"),array("text"=>"Themen","path"=>"topics/"));
            $return['sidebar'] = array(array("text"=>"Der Standard ISO 27000 beschäftigt sich mit der Einführung von den Mindestanforderungen an und dem Risikomanagement bei einem Informationssicherheitsmanagementsystem (ISMS) einer IT Organisation."));
            return $return;
        }

        //@TODO
    }

    private function handleLocation($handle){
        //@TODO
    }



    ###################################################################################################################
    ####################### Definition der Helper-Funktionen
    ############################################## Topic
    ###################################################################################################################
    /**
     * Gibt eine Liste aller Pakete aus, ist ein Thema festgelegt, so werden nur die passenden Pakete angezeigt
     * @param int $id ID des Topics das angezeigt werden soll
     * @return mixed
     */
    private function getPackageList($id=-1){
        $query = "SELECT * FROM `packageview` WHERE TRUE";
        if($id!=-1){
            $query .= " AND topic_id='$id'";
        }
        $return['packagelist'] = $this->getResultArray($query);
        return $return;
    }

    private function getTopicList($id=-1){
        $query = "SELECT * FROM `topic` WHERE `deprecated`=0";
        if($id!=-1){
            $query .= " AND topic_id='$id'";
        }
        $return['topiclist'] = $this->getResultArray($query);
        $return['nextEvents'] = $this->getEvents();
        return $return;
    }


    public function getNextEvents(){
        return $this->getEvents();
    }

    private function getEvents($id=-1,$test=0){
        $sql = "
                SELECT * FROM `apieventdata`
                WHERE test = '$test' ";
        if($id!=-1){
            $sql .=  "AND course_id = $id";
        }
        $sql .= "ORDER BY start_date
                Limit 0,5";

        return $this->getResultArray($sql);
    }


    private function getCourseList(){
        $return = array();
        $sql = "SELECT * FROM `course` WHERE deprecated = 0";
        $return['topiclist'] = $this->getResultArray($query);
        $return['nextEvents'] = $this->getAllEvents();
        return $return;
    }

    private function getCoursecById($id){
        $return = array();
        $query = "SELECT * FROM `course`
                WHERE
                    deprecated = 0 AND
                    course_id = $id
                    ";
        $return['topic'] = $this->getResultArray($query);
        $return['nextEvents'] = $this->getEventsByTopic($id);
        return $return;
    }

    /**
     * Gibt alle Zukünftigen Veranstaltungen eines Themas, welche nicht inhouse sind, aus.
     * @param $id Thema
     * @return mixed
     */
    private function getEventsByTopic($id){
        $query = "
                SELECT * FROM `apieventdata`
                WHERE test = 0 AND
                  course_id = $id
                ORDER BY start_date
                Limit 0,5";
        return $this->getResultArray($query);
    }

    /**
     * Gibt alle Zukünftigen Veranstaltungen eines Themas, welche nicht inhouse sind, aus.
     * @param $id Thema
     * @return mixed
     */
    private function getAllEvents(){
        global $db;
        $result = $db->query("SELECT * FROM `brand_location_limit` WHERE brand_id = ".$this->userid);
        $query = "SELECT * FROM `apieventdata`";
        if($result->num_rows>0){
            $query .= " WHERE location_id IN (SELECT location_id FROM `brand_location_limit` WHERE brand_id = ".$this->userid.")";
        }
        $query .= "
                    ORDER BY start_date
                    LIMIT 0,5";
        return $this->getResultArray($query);
    }


    ###################################################################################################################
    ####################### Definition der Helper-Funktionen
    ############################################## Location
    ###################################################################################################################



    /**
     * Verarbeitet den Location-Handle
     * Wenn keine Location angegeben wird wird die Liste aller Locations angegeben
     * @param $handle
     * @return array
     */
    private function handleLocations($handle){
        global $db;
        if(sizeof($handle)==0){
            return $this->getLocationList();
        }
        else{
            return $this->getLocationInformation($handle);
        }
    }

    private function getLocationList(){
        global $db;
        $result = $db->query("SELECT * FROM `brand_location_limit` WHERE brand_id = ".$this->userid);
        $query = "SELECT distinct location_id, location_name, location_description FROM `apieventdata` WHERE location_description<>'' ";
        if($result->num_rows>0){
            $query .= " AND location_id IN (SELECT location_id FROM `brand_location_limit` WHERE brand_id = ".$this->userid.")";
        }
        $result = $db->query("SELECT * FROM `brand_topic_limit` WHERE brand_id = ".$this->userid);
        if($result->num_rows>0){
            $query .= " AND topic_id_id IN (SELECT location_id FROM `brand_topic` WHERE brand_id = ".$this->userid.")";
        }

        $return = array();
        $return['locations'] = $this->getResultArray($query);
        $return['nextEvents'] = $this->getAllEvents();
        return $return;
    }

    private function getLocationInformation($handle){
        //anhand des handles Location suchen
        if(sizeof($handle==1)){
            $return = array();
            $query ="SELECT distinct location_id, location_name, location_description FROM `apieventdata` WHERE location_id = '".intval($handle[0])."'";
            $return['locations'] = $this->getResultArray($query);
            $return['nextEvents'] = $this->getEventsByLocationId(intval($handle[0]));
            return $return;
        }
        return array("location"=>"Munich","description"=>"München ist die schönste Stadt der Welt");
    }

    private function getEventsByLocationId($id){
        $query = "SELECT * FROM `apieventdata` WHERE location_id = '$id' LIMIT 0,5";
        return $this->getResultArray($query);
    }

    private function handleEvents($handle){
        if(sizeof($handle)==0){
            return $this->getEventList();
        }
        else{
            if($handle[0]=='location'){
                return $this->getEventList($handle[1]);

            }
            elseif($handle[0]=='limit'){

            }
            return $this->getEventList();
        }
    }

    private function getEventList($location="",$limit=-1){
        $query = "SELECT * FROM `event`
                WHERE
                    start_date > NOW() AND
                    inhouse = 0
        ";
        return $this->getResultArray($query);;
    }

}