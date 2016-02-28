<?php
class RequestHandler 
{
    /*
    Overview - Übersicht
    Eng: For every in the index.php receaved request a requesthandler is called. 
        After validating the user/token, the in the url requested view, controllers and data will collected
        to send it to the browser.

    Deu/Ger: Die index.php leitet alle Anfragen in diesen Requesthandler.
        Nach einer User/Token-Prüfung werden die in der url geforderten Views, Crontroller und Daten bereitgestellt
        um sie an den Browser zu senden. 
    */
        
    private $userid = -1;    private $token = -1;    private $validLogin = false;    private $db;

    /** Handles SQL-querys and returnes the resultdata.
    * - On debug -> show the the query
    * - On fail -> log infodata */
    private function getResultArray($query){
        global $db; 
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
        if((count($results_array)<1)){ //evtl. obsolet
            file_put_contents('failQueryLog.txt', date("d.m.Y - H:i:s",time())."\nQuery: ".$query."\nResult: ".$results_array."\n-----------\n", FILE_APPEND | LOCK_EX);
        }
        return $results_array;
    }
 
    /*The constructor initializes the database and the usercontext*/
    public function __construct($userid, $token, $db)
    {
        $this->db = $db;
        $this->validLogin=$this->validateCredentials($userid,$token);
    }

    /** Validates the receaved login-credentials of an User
    * - expect userId and token in tbl brand-> return true/false 
    * - on fail-> add info to a Logfile */
    private function validateCredentials($userid,$token){
        global $db;
        $sql = "SELECT * FROM `v_brand` WHERE accesstoken = '".$db->real_escape_string($token)."' AND login = '".$db->real_escape_string($userid)."'";
        $result = $db->query($sql);
        if($result->num_rows>0){
            $result = $result->fetch_array();
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

    /* Handles the receaved route-request.
    * - On Login-fail exit the handle and responde fail
    * - Case and route the $route to its specific functions
    * - return array|bool|mixed|mysqli_result  */
    public function handle($route){
        if(!$this->validLogin){
            return array ("response"=>"fail: invalidCredentials");
        }
        
        //Example URI -> $route: .../api/index.php/Benutzername/Passwort/section?a=A&b=B
        $bname = $route[0];
        $pw = $route[1];
        $route = $this->rmFirstParam($route); //delete username
        $route = $this->rmFirstParam($route); //delete token
        $section = $route[0]; // $section = destinypoint
        $handle = $this->rmFirstParam($route); //$handle = array('A','B')

        switch($section){
            case 'location': $return = $this->handleLocations($handle);
                return $return;
                break;
            //default view for a brand 
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

            //show Data in an Administrative mode
            case 'monitor': 
                $return = array(
                'script'=>file_get_contents('custom/scripte.html'),
                'controller'=>"<script type=\"text/javascript\">var app = angular.module('application', []); bname = '".$bname."', pw = '".$pw."';</script>".
                file_get_contents('controllers/monitorCtrl.js'),
                'css'=>file_get_contents('custom/3.3.6 bootstrap.min.css'),
                'directive'=>file_get_contents('directives/monitorDir.js'),
                'ct'=>file_get_contents('monitor.html').handleMonitor($handle));   
                return $return;
                break;             
            //show all Data for handleMonitor
            case 'all': 
                $return = array('get...' => 'all the usefull Administrative data getters');
                return $return;
                break;

            //database getters
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

            case "reserve":
                //$return['content'] = array( array("text"=>file_get_contents('../custom/signupcontent.html')) );
                $to      = 'cnu301@mitsm.de';
                $subject = 'Reservierungsanfrage: Nachname Vorname, Courseabkürzung, Datum, Anzahl';
                $message = 'Buttons für zusagen, ablehnen und erneut erinnern'.
                    'Die Windows-Implementierung von mail() unterscheidet sich auf mehrere Arten von der Unix-Implementation. \
                    Zum einen benutzt sie kein lokales Programm, um die Mails zu erstellen, sondern sie arbeitet auf Sockets. D.h.,\
                    dass ein MTA benötigt wird, der auf einem Netzwerk-Socket lauscht (entweder auf dem eigenen oder einem entfernten Rechner).';
                imap_mail($to, $subject, $message);
                file_put_contents('reserveLog.txt', date("d.m.Y - H:i:s",time())."\nEmpfangene Reservierungsparameter: ".$handle."\n-----------\n", FILE_APPEND | LOCK_EX);
                return $return;
            break;
        
            default: echo "Defaultrequest from: Requesthandler -> handle -> defaultRequest.";
                echo "There is no '".$section."' avaliable try http://localhost:4040/EduMS-client/index.php?navdest=brand";
                file_put_contents('failsectionLog.txt', date("d.m.Y - H:i:s",time())."\nsectionrequest: ".$section."\n-----------\n", FILE_APPEND | LOCK_EX);
            exit;
            break;
        }
    }


    /*Definition of special handling functions.*/
    //cleanflag
    public function showStartPage(){
        $return['sidebar'] = array(array("text"=>"Requesthandler -> function showStartpage() -> sidebar"));
        $return['content'] = array(array("text"=>"Requesthandler -> function showStartpage() -> content"));
        return $return;
    }

    /*Choose by URL($handle) what data the monitor have to responde*/
    private function handleMonitor($handle){
        //wie viele Parameter wurden übergeben? sizeof=count
        $out = array();
        if(sizeof($handle)==0){ //api/usr/token/monitor---
            $out['monitor'] = $this->getAll(); //Monitor everything
            return $out;
        }
        /*If receaved a specific Monitor, responde data for every specification*/
        else{ 
            for ($i=0; $i < sizeof($handle); $i++) { 
                $out[$handle[i]] = $this->handle($handle); //response[handle-1,(..),handle-n]=Data               
            }
            return $out;
        }
    }

    
    /*Definition of all getters for the database*/
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
    /*The courselist contains all not deprecated couses */
    private function getCourseList(){     
        $query = "SELECT * FROM `v_course`";
        $return['courselist'] = $this->getResultArray($query);
        return $return;
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