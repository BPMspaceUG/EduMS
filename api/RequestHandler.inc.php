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
        $sql = "SELECT * FROM `v_brand__notdepercated_loginnotempty_accesstokennotempty` WHERE accesstoken = '".$db->real_escape_string($token)."' AND login = '".$db->real_escape_string($userid)."'";
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
                'controller'=>"<script type=\"text/javascript\">var app = angular.module('application', ['ngSanitize']); bname = '".$bname."', pw = '".$pw."';</script>",
                'css'=>file_get_contents('custom/3.3.6 bootstrap.min.css'),
                'directive'=>file_get_contents('directives/monitor.js'),
                'ct'=>file_get_contents('monitor.html'));   
                return $return;
                break;             
            //show all Data for handleMonitor
            case 'getMonitor': return $this->getMonitor();
                break;

            //database getters
            case 'getTopics': $response = array('topiclist' => $this->vTopicNotdepercated(), 'topiccourseCourselist'  => $this->vTopiccourseNotdepercatedlevelnotzero(), 'eventcourselocationFuture'  => $this->vEventcourselocationFuturepublicnotdepercatednotstornonotnew());               
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
            

            //returns: brandinfo topiclist topiccourselist courselist eventlist 
            case 'getBrandInfo': return $this->getbrandtopics($bname);
                break;

            case "reserve":
                //$return['content'] = array( array("text"=>file_get_contents('../custom/signupcontent.html')) );
                $to      = 'cnu301@mitsm.de';
                $subject = 'Reservierungsanfrage: Nachname Vorname, Courseabkürzung, Datum, Anzahl';
                $message = 'Buttons für zusagen, ablehnen und erneut erinnern'.
                    'Die Windows-Implementierung von mail() unterscheidet sich auf mehrere Arten von der Unix-Implementation. \
                    Zum einen benutzt sie kein lokales Programm, um die Mails zu erstellen, sondern sie arbeitet auf Sockets. D.h.,\
                    dass ein MTA benötigt wird, der auf einem Netzwerk-Socket lauscht (entweder auf dem eigenen oder einem entfernten Rechner).';
                mail($to, $subject, $message);
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
    private function handleMonitor($handle=array('a' => 'default' )){
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

    //vTopicNotdepercated vTopiccourseNotdepercatedlevelnotzero vEventcourselocationFuturepublicnotdepercatednotstornonotnew
    /*Definition of all getters for the database*/
    //topic_id  deprecated  topicName   topicHeadline   topicDescription    topicDescriptionSidebar topicImage  footer  responsibleTrainer_id
    private function vTopicNotdepercated($id=-1){
        $return['topiclist'] = $this->getResultArray("SELECT * FROM `v_topic_notdepercated`");
        return $return;
    }
    /*private function getAllLocationsList(){   
        return $this->getResultArray("SELECT * FROM `v_location` limit 25");
    }*/
    
    private function getFutureCourses(){   
        return $this->getResultArray("SELECT * FROM `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew` limit 50");
    }    
    private function vTopiccourseNotdepercatedlevelnotzero(){ 
    //topic_course_id   topic_id    topicName   course_id   course_name level   rank  
        return $this->getResultArray("SELECT * FROM `v_topiccourse_notdepercatedlevelnotzero` ");
    }
    private function getNextFiveEvents(){
    //event_id    start_date  finish_date start_time  finish_time course_id   course_name test    coursedeprecated    courseMaxParticipants   
    //location_id location_name   internet_location_name  location_description    locationMaxParticipants event_status_id eventguaranteestatus    eventinhouse
        return $this->getResultArray("SELECT * FROM `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew`  limit 5");
    }    
    private function vEventcourselocationFuturepublicnotdepercatednotstornonotnew(){
        //event_id  start_date  finish_date start_time  finish_time course_id   course_name test    coursedeprecated    courseMaxParticipants   location_id location_name   internet_location_name  
        //location_description    locationMaxParticipants event_status_id eventguaranteestatus    eventinhouse
        return $this->getResultArray("SELECT * FROM `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew` ");
    }
    /*The courselist contains all not deprecated couses */
    private function getCourseList(){     
        $query = "SELECT * FROM `v_course_notdepercated`";
        //course_id course_name number_of_days  internet_course_article_id  min_participants    courseHeadline  courseDescription   courseDescriptionMail   coursePrice courseDescriptionCertificate
        $return['courselist'] = $this->getResultArray($query);
        return $return;
    }

    private function getbrandtopics($brandname){
        $return['brandinfo'] = $this->getResultArray("SELECT * FROM `v_brand__notdepercated_loginnotempty_accesstokennotempty` WHERE login = '".$brandname."'");
        
        //Hole Brandinfo
        file_put_contents('getBrandLog.txt', date("d.m.Y - H:i:s",time())."\nBrandID: ".$return['brandinfo'][0]['brand_id']."\nBrand Name: ".$brandname."\n-----------\n", FILE_APPEND | LOCK_EX);
        
        $brandId = $return['brandinfo'][0]['brand_id'];//$return['brandInfo']['brand_id'];

        //Hole Topics zu Brand
        $topicsInBrand = $this->getResultArray("SELECT `topic_id` FROM `v_brandtopic` WHERE brand_id = '".$brandId."'");

        $queryTopics='';
        $rootquery = 'SELECT * FROM `v_topic_notdepercated` WHERE';
            foreach ($topicsInBrand as $val) {
                $queryTopics .= ' or topic_id = '.implode($val);
            }
        $queryTopics = substr($queryTopics,3,strlen($queryTopics));        
        $return['topiclist'] = $this->getResultArray($rootquery.$queryTopics);

        //Hole Course zu den Topics
        $queryCourses='';
        $rootquery = 'SELECT * FROM `v_topiccourse_notdepercatedlevelnotzero` WHERE';
            foreach ($topicsInBrand as $val) {
                $queryCourses .= ' or topic_id = '.implode($val);
            }
        $queryCourses = substr($queryCourses,3,strlen($queryCourses));
        $return['topiccourselist'] = $this->getResultArray($rootquery.$queryCourses);
        
        $queryCourses='';
        $rootquery = 'SELECT * FROM `v_course_notdepercated` WHERE ';        
        for ($i=0; $i < count($return['topiccourselist']); $i++) {                     
            $queryCourses .= ' or course_id = '.$return['topiccourselist'][$i]['course_id'];
        }
        $queryCourses = substr($queryCourses,3,strlen($queryCourses));
        $return['courselist'] = $this->getResultArray($rootquery.$queryCourses);

        //Hole Events zu Courses
        $return['eventlist'] = $this->getResultArray("SELECT * FROM `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew` WHERE ".$queryCourses);
        
        return $return;
    }

 
    private function getMonitor(){ 
        $tables = array('v_topic_notdepercated',
            'v_eventcourselocation_futurepublicnotdepercatednotstornonotnew',
            'v_topiccourse_notdepercatedlevelnotzero',
            'v_course_notdepercated','v_brand__notdepercated_loginnotempty_accesstokennotempty', 'v_brandtopic', 
            'v_participationevent_count_futurepublicnotstornonotnew', 
            'v_statusevent', 'v_statuseventguarantee', 'v_statustrainer', 'v_testcourse');
        for ($i=0; $i < count($tables); $i++) { 
            $query = "SELECT * FROM ".$tables[$i]." limit 1";
            $return[$tables[$i]] = $this->getResultArray($query);
          }  
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
            case 'vTopiccourseNotdepercatedlevelnotzero': return $this->vTopiccourseNotdepercatedlevelnotzero();
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