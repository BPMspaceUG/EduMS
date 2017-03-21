<?php
  /*
  Overview - Übersicht
  Eng: For every in the index.php receaved request a requesthandler is called. 
    After validating the user/token, branspecific informatons get fetched from the database. This data,
    scripts and css will finally be send back.
    For Resevationsrequests the eventinformations will be loaded an finally the mail-send script will 
    execute.

  Deu/Ger: Die index.php leitet alle Anfragen in diesen Requesthandler.
    Nach einer User/Token-Prüfung werden die Brandspezifischen Informationen geladen und zusammen 
    mit scripten und css zurrückgesand. 
    Für Reservierungsanfragen werden Eventinformationen aus der Datenbank abgefragt und abschließend
    das Mailversand-script aufgerufen.
  */
class RequestHandler 
{
  private $userid = -1;  private $token = -1;  private $validLogin = false;  private $db; 
  /** Handles SQL-querys and returns the resultdata.
  * @debugmode on: show the the query
  * @fail: log infodata */
  private function getResultArray($query){
    global $db; 
    // if(isset($_REQUEST['debug']) && $_REQUEST['debug']){
    //   echo "<pre><hr>Query:<br>";
    //   var_dump($query);
    //   echo "</pre>";
    // }
    $results_array = array();
    $result = $db->query($query);
    while ($row = $result->fetch_assoc()) {
      $results_array[] = $row;
    }
    if((count($results_array)<1)){ //evtl. obsolet
      file_put_contents('logs/failQueryLog.log', 
        date("d.m.Y - H:i:s",time()).
        "\nQuery: ".
        $query.
        "\nResult: ".
        // print_r($results_array).
        "\n-----------\n", 
        FILE_APPEND | LOCK_EX);
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
  * @fail: add info to a Logfile */    
  private function validateCredentials($userid,$token){
    global $db;
    $this->usercss = '<style> body {background-color: red;}</style>';
    $sql = "SELECT * FROM `v_brand_notdeprecated_loginnotempty_accesstokennotempty` WHERE accesstoken = '".$db->real_escape_string($token)."' AND login = '".$db->real_escape_string($userid)."'";
    $result = $db->query($sql);
    if($result->num_rows>0){

      $result = $result->fetch_array();
      
      if(isset($result['brand_id'])){ //If this is false, the $sql is invalid
        $this->userid = $result['brand_id'];        
        if(isset($result['css-style'])){ //If this is false, the $sql is invalid
          $this->usercss = $result['css-style'];
        }  
        return true;
      }else{
        return 'forbidden';
        file_put_contents('logs/failLogInSQLqueryLog.log', date("d.m.Y - H:i:s",time())."\nReceaved query: ".$sql."\n$result: ".$result."\n-----------\n", FILE_APPEND | LOCK_EX);
      }

       // create new directory with 744 permissions if it does not exist yet
       // owner will be the user/group the PHP script is run under
       // if ( !file_exists('logs') ) {
       //   $oldmask = umask(0); //when used in linux server 
       //   mkdir ('logs', 0744);
       // }
      file_put_contents ('metaLog.log', 'Created logs directory on '.date("d.m.Y - H:i:s",time()).'. ', FILE_APPEND | LOCK_EX);

    }
    else{
      file_put_contents('logs/failLogInLog.log', date("d.m.Y - H:i:s",time())."\nUserId: ".$userid."\nToken: ".$token."\n-----------\n", FILE_APPEND | LOCK_EX);
      exit;
      return 'forbidden';
    }
  }

  /*removes the first element from an array - return result-array*/
  private function rmFirstParam($handle){
    unset($handle[0]);
    $result = array();
    foreach($handle as $key){
      $result[]=$key;
    }
    return $result;
  }

  /* Handles the receaved route-request.
  * @Login-fail: exit the handle and responde fail
  * - Case and route the $route to its specific functions
  * - return array|bool|mixed|mysqli_result */
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
        'script'=>file_get_contents('js/Underscore v1.8.3.js').file_get_contents('js/jQuery 2.2.1.js').file_get_contents('js/AngularJS v1.4.9.js').file_get_contents('js/Bootstrap v3.3.6.js'),
        'controller'=>"<script type=\"text/javascript\">var app = angular.module('application', ['ngSanitize', 'ngLocale']); </script>".file_get_contents('js/EduMS_Ctrl.js'),
        'css'=>file_get_contents('css/3.3.6 bootstrap.min.css').file_get_contents('css/EduMS_custom.css').$this->usercss,
        'directive'=>file_get_contents('js/EduMS_template-directives.js'),
        'htmlCore'=> $this->getResultArray("SELECT `html_core` FROM `v_brand_notdeprecated_loginnotempty_accesstokennotempty` WHERE login = '".$bname."'")
        );
        if (file_exists('brand.html') && count($return['htmlCore'])<10 ) {
          $return['ct']= file_get_contents('brand.html');
        }
        // var_dump($return['ct']);
        // var_dump($return['htmlCore']);

        return $return;
        break;
      
      //returns: brandinfo topiclist topiccourselist courselist eventlist 
      case 'getBrandInfo': return $this->getbrandtopics($bname, $section, $handle);
        break;


      case "reserve":
        require_once 'reservavtionMail.php'; //newer Version for Linux - PHP - sendmail 
        // file_put_contents('logs/reserveLog.log', date("d.m.Y - H:i:s",time())."\nEmpfangene Reservierungsparameter: ".$handle."\n-----------\n", FILE_APPEND | LOCK_EX);
      
      case 'reserveInfo': return 'reserveInfo';
        break;

      case 'salesRepresentive': return 'salesRepresentive';
        break;
      
        return; //$return;
      break;

      default: echo "Defaultrequest from: Requesthandler -> handle -> defaultRequest.";
        echo "There is no section '".$section."' avaliable";
        file_put_contents('logs/failsectionLog.log', date("d.m.Y - H:i:s",time())."\nsectionrequest: ".$section."\n-----------\n", FILE_APPEND | LOCK_EX);
      exit;
      break;
    }
  }

  /*Get topicinformation to an ID
    @fail: log fail*/
  private function vTopicNotdepercated($id=-1){
    $return['topiclist'] = $this->getResultArray("SELECT * FROM `v_topic_notdepercated`");
    for ($i=0; $i < count($return['topiclist']) ; $i++) { 
      if ($return['topiclist'][$i]['deprecated']!=0) {
        file_put_contents('logs/failTopicResponseLog.log', date("d.m.Y - H:i:s",time())."\n$return\['topiclist'\]\[".$i."\] -> deprecatet is not 0 -> ".$section."\n-----------\n", FILE_APPEND | LOCK_EX);
        unset($return['topiclist'][$i]);
      }
    }
    return $return;
  }

  /*
  Get all topics, their courses and events for a specific brand.
    Act by follow the chain to fetch the data from the database:
      1. brandinformation, 2. topics to the brand, 
      3. Only valid topics, 3.2 check for requested topic
      4. valid courses to selected topics, 5. events to courses, 
      6. events for tests, 7. informationcodes to states
  */
  private function getbrandtopics($brandname, $section, $handle){
    
    //1. brandinformation
    $return['brandinfo'] = $this->getResultArray("SELECT * FROM `v_brand_notdeprecated_loginnotempty_accesstokennotempty` WHERE login = '".$brandname."'");
    // file_put_contents('logs/getBrandLog.log', date("d.m.Y - H:i:s",time())."\nBrandID: ".$return['brandinfo'][0]['brand_id']."\nBrand Name: ".$brandname."\n-----------\n", FILE_APPEND | LOCK_EX);
    
    if ($return['brandinfo'][0]['branddeprecated']!=0) {//In case SQL fails exit
      return $return['brandinfo'][0]['brandDescription'] = '- Forbidden - Please contact Admin';
    }
    $brandId = $return['brandinfo'][0]['brand_id'];

    //2. topics to the brand
    $topicsInBrand = $this->getResultArray("SELECT `topic_id` FROM `v_brandtopic` WHERE brand_id = '".$brandId."'");


    $queryTopics='';
    //3. Only valid topics
    $rootquery = 'SELECT * FROM `v_topic_notdepercated` WHERE';
      foreach ($topicsInBrand as $val) {
        $queryTopics .= ' or topic_id = '.implode($val);
      }
    $queryTopics = substr($queryTopics,3,strlen($queryTopics));    
    $return['topiclist'] = $this->getResultArray($rootquery.$queryTopics);

    //3.2 check if there is a requested topic and its existence in the topiclist of the brand
    if (isset($_GET['topic'])) {
      $decoded = $_GET['topic'];
      if ( array_search($decoded, array_column($return['topiclist'], 'topicName')) >= 0) {
        $return['preselectedTopic'] = $decoded;
      }else{
        $return['preselectedTopic'] = 'none';
      }
    }else{
      $return['preselectedTopic'] = 'none';
      //$return['preselectedTopic'] = $section;
    }
    $return['url_GET']=$_GET;

    $queryCourses='';
    //4. valid courses to selected topics
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

    //5. events to courses
    $return['eventlist'] = $this->getResultArray("SELECT * FROM `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew` WHERE ".$queryCourses);
    
    //5.2 set 'meta' to Schema.org/EducationEvent structure tags (startDate, endDate, location, name)
    //returnes true if event is in the future
    // $morgen = mktime(0, 0, 0, date("m")  , date("d")+1, date("Y"));
    function validEvent($event)
    {
      $startDate = $event['start_date'];
      return mktime(0, 0, 0, date("m"), date("d")+1, date("Y")) < strtotime($startDate); //tommorrow < event start date
    }
    $metaEventlist = array_filter($return['eventlist'], "validEvent");
    $return['meta']='  <div itemscope itemtype="http://schema.org/EducationEvent"> ';//debug-print keys of the array: implode(array_keys($metaEventlist[3]),'~');
    $metaFillCounter = 0;
    for ($i=0; $i < sizeof($metaEventlist); $i++) { 
      if (isset($metaEventlist[$i]) && $metaFillCounter < 5) {
         $return['meta'] .= '<meta itemprop="startDate" content="'.$metaEventlist[$i]['start_date'].'"/>';
         $return['meta'] .= '<meta itemprop="endDate" content="'.$metaEventlist[$i]['finish_date'].'"/>';
         $return['meta'] .= '<meta itemprop="location" content="'.$metaEventlist[$i]['internet_location_name'].' '.$metaEventlist[$i]['eventguaranteestatus'].'"/>';
         $return['meta'] .= '<meta itemprop="name" content="'.$metaEventlist[$i]['course_name'].'"/>';
        //debug-print time calculation: $return['meta'].= time().' '.strtotime($metaEventlist[$i]['start_date']).' '.$metaEventlist[$i]['start_date'].' - ';
        $metaFillCounter +=1;
       } 
    }
    $return['meta'].='</div>';

    //6. events for tests
    $return['coursetotestlist'] = $this->getResultArray("SELECT * FROM `v_testcourse`");
    //7. informationcodes to states
    $return['stateinfo'] = $this->getResultArray("SELECT * FROM `v_statuseventguarantee`");
    
    return $return;
  }

  /* Get eventinformation for requestet events (reservation) */
  private function vEventcourselocationReservationmail($eventlist){
    $rootquery = 'SELECT * FROM `v_eventcourselocation_reservationmail` WHERE ';    
    $queryEvents='event_id = ';
    if (count($eventlist)>0) {
      $queryEvents .= implode(' or event_id = ', $eventlist );
    }
    return $this->getResultArray($rootquery.$queryEvents);
  }

}
