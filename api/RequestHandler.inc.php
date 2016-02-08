<?php

/**
 * Created by PhpStorm.
 * User: cwalonka
 * Date: 30.09.15
 * Time: 09:08
 */
/*löschen--> $handler = new RequestHandler($user,$token,$db);
    $response = $handler->handle($routes); <--löschen*/
class RequestHandler 
{
    /*Allgemeines Konzept: Jede Ressource bekommt eine Handlefunction diese definiert ob ein Defaultwert oder Parametergebundener Wert zurrück gegeben
    werden soll. Der Handle ruft eine Getfunction auf. Die Getfunction definiert ein spezifisches Query und ruft getResultArray auf. getResultArray
    führt ein beliebiges Query aus und gibt das Ergebnis zurrück.*/
    private $userid = -1;
    private $token = -1;
    private $validLogin = false;
    private $db;
    private $discount = 0;

    private function getResultArray($query){
        global $db; 
        /*Zweck: Ausgabe einer Debugvariante der Seite*/
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
        
        //Beispiel uri -> $route: .../api/index.php/Benutzername/Passwort/section?a=A&b=B
        $route = $this->rmFirstParam($route); //lösche Benutzername
        $route = $this->rmFirstParam($route); //lösche Passwort
        $section = $route[0]; // $section = 'section'
        $handle = $this->rmFirstParam($route); //$handle = array('A','B')


        switch($section){
            /*
             * Handles all Requests for Locations
             * /location = Liste aller Locations die freigegeben sind incl. events
             * /location/{id} = Location der id incl. events
             */
            case 'location':
                $return = $this->handleLocations($handle);
                return $return;
                break;

            case 'boot':
                //$return['sidebar'] = array(array("text"=>"requ-handler>handleBoot()>sidebar."));
                //$return['content'] = file_get_contents('../../EduMS-client/boot.html');
                //$return['topics'] = $this->handleTopic(3);
                $return['a']= array('b' => 'b' );
                return $return;
                break;

            case 'getTopics':                
                return $this->getTopicList();
                break;

            case 'getCourses':                
                return $this->getCourseList();
                break;

            case 'getFutureCourses':                
                return $this->getFutureCourses();
            break;

            case 'countParticipantsOnEvent':                
                return $this->countParticipantsOnEvent();
            break;

            case 'getBrand':
                return $this->getBrandList();
                break;

  
            case 'getBrandTopic':
                return $this->getBrandTopicList();
                break;
            case 'getEvent':
                return $this->getEventList();
                break;
            case 'getNextFiveEvents':
                return $this->getNextFiveEvents();
                break;


            case 'getLocation':
                return $this->getLocationList();
                break;

            case 'getAllLocations':
                return $this->getAllLocationsList();
                break;

            case 'getOrganization':
                return $this->getOraganizationList();
                break;

            case 'getStatusEvent':
                return $this->getStatusEventList();
                break;

            case 'getStatusEventGuarantee':
                return $this->getStatusEventGuaranteeList();
                break;

            case 'getStatusTrainer':
                return $this->getStatusTrainerList();
                break;

            case 'getTrainerEventAssignment':
                return $this->getTrainerEventAssignmentList();
                break;



            case 'getBrandLocation':
                return $this->getBrandLocationList();
                break;

            case 'monitor':
                return $this->handleMonitor($handle);
                break;


            case 'events':
                /*events = Liste aller Events die freigegben sind
                /events/id = Daten des Events*/
                return $this->handleEvents($handle);
                break;

            case 'topics':
                /*topics = Liste aller Topics
                /topics/{id} = Daten eines Topics incl. events*/
                return $this->handleTopic($handle);
                break;

            case 'package':
                return $this->handlePackage($handle);
                break;


            case "signup":
                $return['content'] = array(
                    array("text"=>file_get_contents('../custom/signupcontent.html'))
                );
                return $return;
            break;
        
            default: echo "Requesthandler>handle>defaultRequest";
            exit;
            break;

        }
    }

    ###################################################################################################################
    ####################### Definition der Handles
    ###################################################################################################################


    public function showStartPage(){
        $return['sidebar'] = array(array("text"=>"requ-handler>showStartpage()>Startpage>sidebar."));
        $return['content'] = array(array("text"=>"showStartpage()>Startpage>Content"));
        return $return;
    }

    private function handleBoot(){

        //echo $return['topics'];
        return ;//$return;
    }

    /*Ein Topic ist eine Schulungsart. Entweder wurden keine Parameter übergeben dann soll die ganze verfügbare Liste ausgegeben werden
    oder es wurde ein Parameter angegeben dann nur dieses Topic ausgeben.*/
    private function handleTopic($handle){

        $parameters = sizeof($handle); //wie viele Parameter wurden übergeben? sizeof=count
        if($parameters==0){ //api/usr/token/topics/
            return $this->getTopicList(); //done
        }
        elseif($parameters == 1){ //api/usr/token/topics/12345
            $param = intval($handle[0]);//Zwang zu Integer
            return $this->getTopicList($param);
        }

        //@TODO
    }

    private function handleMonitor($handle){

        $parameters = sizeof($handle); //wie viele Parameter wurden übergeben? sizeof=count
        if($parameters==0){ //api/usr/token/monitor
            $out = array();
            $out['topics'] = $this->getTopicList(); //done
            return $out;
        }
        elseif($parameters == 1){ //api/usr/token/monitor/var+?
            //$param = intval($handle[0]);//Zwang zu Integer
            //return $this->getTopicList($param);
        }

        //@TODO
    }

    /*Ein Package ist eine frei kofigurierbare Sammlung von von Schulungen und Kursen*/
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
        $query = "SELECT * FROM `package` WHERE TRUE";
        if($id!=-1){
            $query .= " AND topic_id='$id'";
        }
        $return['packagelist'] = $this->getResultArray($query);
        return $return;
    }

    /*Zweck: Rückgabe eines oder aller Topics aus der Datenbank*/
    private function getTopicList($id=-1){
        $query = "SELECT * FROM `vtopic` WHERE `deprecated`=0";
        if($id!=-1){
            $query .= " AND topic_id='$id'";
        }
        $return['topiclist'] = $this->getResultArray($query);
        $return['nextEvents'] = $this->getEvents();
        return $return;
    }

    //alle DB-getter für view-AngularContoller
    private function getAllLocationsList(){   
        return $this->getResultArray("SELECT * FROM `vlocation`");
    }
    private function getBrandList(){   
        return $this->getResultArray("SELECT * FROM `vbrand`");
    }
     private function getBrandLocationList(){   
        return $this->getResultArray("SELECT * FROM `vbrandlocation`");
    }
    private function getBrandTopicList(){   
        return $this->getResultArray("SELECT * FROM `vbrandtopic`");
    }
    private function getOraganizationList(){   
        return $this->getResultArray("SELECT * FROM `vorganization`");
    }
    private function getStatusEventList(){   
        return $this->getResultArray("SELECT * FROM `vstatusevent`");
    }    
    private function getStatusEventGuaranteeList(){   
        return $this->getResultArray("SELECT * FROM `vstatuseventguarantee`");
    }
    private function getStatusTrainerList(){   
        return $this->getResultArray("SELECT * FROM `vstatustrainer`");
    }
    private function getTrainerEventAssignmentList(){   
        return $this->getResultArray("SELECT * FROM `vtrainereventassignment`");
    }
    private function getFutureCourses(){   
        return $this->getResultArray("SELECT * FROM `v_futurecourses`");
    }    
    private function countParticipantsOnEvent(){   
        return $this->getResultArray("SELECT * FROM `v_countParticipantOnEvent`");
    }


    /*Eine CourseList ist die Liste aller möglichen Teilbereiche von Schulungen*/
    private function getCourseList(){     
        $query = "SELECT * FROM `vcourse`";
        $return['courselist'] = $this->getResultArray($query);
        return $return;
    }

    

    public function getNextEvents(){
        return $this->getEvents();
    }

    /*Ein Event ist eine Schulung zu einen bestimmten Zeitpunkt und an einem bestimmten Ort*/
    private function getEvents($id=-1,$test=0){
        $sql = "SELECT * FROM `apieventdata` WHERE test = '$test' ";
        if($id!=-1){
            $sql .=  "AND course_id = $id";
        }
        $sql .= "ORDER BY start_date Limit 0,5";

        return $this->getResultArray($sql);
    }
    
    private function getNextFiveEvents(){
        return $this->getResultArray("SELECT * FROM bpmspace_edums_v3.all_events WHERE start_date > now() limit 5");
    }



    /*Jeder Kurs ist einem Topic (einer Schulung) zugeordnet. Jeder Kurs hat seine eigene ID*/
    private function getCoursecById($id){
        $return = array();
        $query = "SELECT * FROM `course` WHERE deprecated = 0 AND course_id = $id";
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
        $query = " SELECT * FROM `apieventdata` WHERE test = 0 AND course_id = $id
                ORDER BY start_date Limit 0,5";
        return $this->getResultArray($query);
    }

    /**
     * Gibt alle Zukünftigen Veranstaltungen eines Themas, welche nicht inhouse sind, aus.
     * @param $id Thema
     * @return mixed
     */
    private function getAllEvents(){
        global $db;
        $result = $db->query("SELECT * FROM `brand_location` WHERE brand_id = ".$this->userid);
        $query = "SELECT * FROM `apieventdata`";
        if($result->num_rows>0){
            $query .= " WHERE location_id IN (SELECT location_id FROM `brand_location` WHERE brand_id = ".$this->userid.")";
        }
        $query .= " ORDER BY start_date LIMIT 0,5";
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
        $result = $db->query("SELECT * FROM `brand_location` WHERE brand_id = ".$this->userid);
        $query = "SELECT distinct location_id, location_name, location_description FROM `apieventdata` WHERE location_description<>'' ";
        if($result->num_rows>0){
            $query .= " AND location_id IN (SELECT location_id FROM `brand_location` WHERE brand_id = ".$this->userid.")";
        }
        /* //!ÄNDERN! weil location_id nicht mehr in brand_topic vorhanden 
        $result = $db->query("SELECT * FROM `brand_topic_limit` WHERE brand_id = ".$this->userid);
        if($result->num_rows>0){
            $query .= " AND topic_id_id IN (SELECT location_id FROM `brand_topic` WHERE brand_id = ".$this->userid.")";
        }*/

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

    private function getEventList(){
        $query = "SELECT * FROM `event` WHERE start_date > NOW() AND inhouse = 0";
        return $this->getResultArray($query);
    }
}