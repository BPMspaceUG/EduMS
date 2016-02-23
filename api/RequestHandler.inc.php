<?php
class RequestHandler 
{
    /*Allgemeines Konzept: Jede Ressource bekommt eine Handlefunction diese definiert ob ein Defaultwert oder Parametergebundener Wert zurrück gegeben
    werden soll. Der Handle ruft eine Getfunction auf. Die Getfunction definiert ein spezifisches Query und ruft getResultArray auf. getResultArray
    führt ein beliebiges Query aus und gibt das Ergebnis zurrück.*/
    private $userid = -1;    private $token = -1;    private $validLogin = false;    private $db;    private $discount = 0;

    private function getResultArray($query){
        global $db; 
        /*Zweck: Ausgabe einer Debugvariante der Seite*/
        if(isset($_REQUEST['debug']) && $_REQUEST['debug']){
            echo "<pre><hr>Query:<br>";
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
 
    public function __construct($userid, $token, $db)
    {
        $this->db = $db;
        $this->validLogin=$this->validateCredentials($userid,$token);
    }

    /* Validates the Login of an User -> return true/false */
    private function validateCredentials($userid,$token){
        global $db;
        //var_dump($token);
        //var_dump($userid);
        $sql = "SELECT * FROM `v_brand` WHERE accesstoken = '".$db->real_escape_string($token)."' AND login = '".$db->real_escape_string($userid)."'";
        $result = $db->query($sql);
        //var_dump($sql);
        if($result->num_rows>0){
            $result = $this->discount = $result->fetch_array();
            $this->discount = $result['discount'];
            $this->userid = $result['brand_id'];
            return true;
        }
        else{
            file_put_contents('failLogInLog.txt', date("d.m.Y - H:i:s",time())."\nUserId: ".$userid."\nToken: ".$token."\n-----------\n", FILE_APPEND | LOCK_EX);
            return false;
        }
    }

    /*removes the first element from an array  -  return array Result*/
    private function rmFirstParam($handle){
        unset($handle[0]);
        $result = array();
        foreach($handle as $key){
            $result[]=$key;
        }
        return $result;
    }

    /* Switches between the URL-called functions -  return array|bool|mixed|mysqli_result  */
    public function handle($route){
        if(!$this->validLogin){
            return array ("response"=>"invalidCredentials");
        }
        
        //Beispiel uri -> $route: .../api/index.php/Benutzername/Passwort/section?a=A&b=B
        $bname = $route[0];
        $pw = $route[1];
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
            case 'location': $return = $this->handleLocations($handle);
                return $return;
                break;
            case 'brand': 
                $return = array(
                'script'=>file_get_contents('custom/scripte.html'),
                'controller'=>"<script type=\"text/javascript\">var app = angular.module('application', []); bname = '".$bname."', pw = '".$pw."';</script>".
                file_get_contents('controllers/organizationCtrl.js').file_get_contents('controllers/navCtrl.js').file_get_contents('controllers/modalCtrl.js'),
                'css'=>file_get_contents('custom/3.3.6 bootstrap.min.css').file_get_contents('custom/cssSheets.html'),
                'directive'=>file_get_contents('directives/lawdata.js'),
                'ct'=>file_get_contents('brand.html'));                
                return $return;
                break;
            case 'getTopics': $response = array('topiclist' => $this->getTopicList(), 'topiccourseCourselist'  => $this->getTopiccourseCourse(), 'allNextEvents'  => $this->getAllNextEvents());               
                return $response;
                break;
            case 'getCourses': return $this->getCourseList();
                break;
            case 'getAllLocations': return $this->getAllLocationsList();
                break;
            case 'getFutureCourses': return $this->getFutureCourses();
                break;
            case 'getNextFiveEvents': return $this->getNextFiveEvents();
                break;
            case 'getOrganization': return $this->getOraganizationList();
                break;
            case "signup":
                $return['content'] = array( array("text"=>file_get_contents('../custom/signupcontent.html')) );
                return $return;
            break;
            case 'topics': return $this->handleTopic($handle);
            break;
        
            default: echo "Defaultrequest aus: Requesthandler -> handle -> defaultRequest";
            exit;
            break;
        }
    }
    ###################################################################################################################
    ####################### Definition der Handles
    ###################################################################################################################
    public function showStartPage(){
        $return['sidebar'] = array(array("text"=>"Requesthandler -> function showStartpage() -> sidebar"));
        $return['content'] = array(array("text"=>"Requesthandler -> function showStartpage() -> content"));
        return $return;
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
    }

    ###################################################################################################################
    ####################### Definition der Helper-Funktionen
    ############################################## Topic
    ###################################################################################################################

    //alle DB-getter für view-AngularContoller
    /*Zweck: Rückgabe eines oder aller Topics aus der Datenbank*/
    private function getTopicList($id=-1){
        $return['topiclist'] = $this->getResultArray("SELECT * FROM `v_topic` WHERE `deprecated`=0");
        return $return;
    }
    private function getAllLocationsList(){   
        return $this->getResultArray("SELECT * FROM `v_location` limit 25");
    }
    private function getOraganizationList(){   
        return $this->getResultArray("SELECT * FROM `v_organization` where organization_id = 1");
    }
    private function getFutureCourses(){   
        return $this->getResultArray("SELECT * FROM `v_futurecourses` limit 50");
    }    
    private function getTopiccourseCourse(){   
        return $this->getResultArray("SELECT * FROM `v_topic_courseCourse` ");
    }
    private function getNextFiveEvents(){
        return $this->getResultArray("SELECT * FROM bpmspace_edums_v3.v_all_events WHERE start_date > now() limit 5");
    }    
    private function getAllNextEvents(){
        return $this->getResultArray("SELECT * FROM bpmspace_edums_v3.v_all_events WHERE start_date > now() ");
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
    }

    /*Eine CourseList ist die Liste aller möglichen Teilbereiche von Schulungen*/
    private function getCourseList(){     
        $query = "SELECT * FROM `v_course`";
        $return['courselist'] = $this->getResultArray($query);
        return $return;
    }
    ###################################################################################################################
    ####################### Definition der Helper-Funktionen
    ############################################## Location
    ###################################################################################################################

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
}





    /* currently not in use getters
    private function getBrandList(){ return $this->getResultArray("SELECT * FROM `v_brand`")};    private function getBrandLocationList(){return $this->getResultArray("SELECT * FROM `v_brandlocation`")};
    private function getBrandTopicList(){return $this->getResultArray("SELECT * FROM `v_brandtopic`")};    private function getStatusEventList(){return $this->getResultArray("SELECT * FROM `v_statusevent`")};
    private function getStatusEventGuaranteeList(){return $this->getResultArray("SELECT * FROM `v_statuseventguarantee`")};    private function getStatusTrainerList(){return $this->getResultArray("SELECT * FROM `v_statustrainer`")};
    private function getTrainerEventAssignmentList(){return $this->getResultArray("SELECT * FROM `v_trainereventassignment`")};    private function countParticipantsOnEvent(){return $this->getResultArray("SELECT * FROM `v_countParticipantOnEvent`")};    
    private function getcoursebytopic(){return $this->getResultArray("SELECT * FROM `v_coursebytopic` ")};    */



            /* currently not in use Requests
            case 'getcoursebytopic': return $this->getcoursebytopic();
            break;            
            case 'getTopiccourseCourse': return $this->getTopiccourseCourse();
            break;
            case 'getBrand': return $this->getBrandList();
                break;  
            case 'getBrandTopic': return $this->getBrandTopicList();
                break;
            case 'getEvent': return $this->getEventList();
                break;
            case 'getLocation': return $this->getLocationList();
                break;
            case 'getStatusEvent': return $this->getStatusEventList();
                break;
            case 'getStatusEventGuarantee': return $this->getStatusEventGuaranteeList();
                break;
            case 'getStatusTrainer': return $this->getStatusTrainerList();
                break;
            case 'getTrainerEventAssignment': return $this->getTrainerEventAssignmentList();
                break;
            case 'getBrandLocation': return $this->getBrandLocationList();
                break;
            case 'monitor': return $this->handleMonitor($handle);
                break; 
            case 'events': return $this->handleEvents($handle);
                break;  
        */