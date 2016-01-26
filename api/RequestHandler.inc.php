<?php

/**
 * Created by PhpStorm.
 * User: cwalonka
 * Date: 30.09.15
 * Time: 09:08
 */
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
        
        //lösche Benutzername und Passwort, aktueller Abschnitt = route[0], neuer handle für route
        $route = $this->rmFirstParam($route);
        $route = $this->rmFirstParam($route);
        $section = $route[0];
        $handle = $this->rmFirstParam($route);


        switch($section){
            /*
             * Handles all Requests for Locations
             * /location = Liste aller Locations die freigegeben sind incl. events
             * /location/{id} = Location der id incl. events
             */
            case 'location':
                $return = $this->handleLocations($handle);
                $return['topnav'] = array(/*Zweck: überschreiben der Navigationselemente (oben)*/
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
                /*soll in die DB, zweck: dass jeder Kunde sein design ändern kann
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
</form>
<script type="text/javascript" src="../EduMs/api/jscn.js"></script>'
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
        $return['content'] = array(array("text"=>"Hier gibt es eine Übersicht der möglichen Kurse"));
        return $return;
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

    /*Eine Location ist ein Ort an dem eine Schulung abgehalten werden kann*/
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
        $query = "SELECT * FROM `package` WHERE TRUE";
        if($id!=-1){
            $query .= " AND topic_id='$id'";
        }
        $return['packagelist'] = $this->getResultArray($query);
        return $return;
    }

    /*Zweck: Rückgabe eines oder aller Topics aus der Datenbank*/
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

    /*Ein Event ist eine Schulung zu einen bestimmten Zeitpunkt und an einem bestimmten Ort*/
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


    /*Eine CourseList ist die Liste aller möglichen Teilbereiche von Schulungen*/
    private function getCourseList(){
        $return = array();
        $sql = "SELECT * FROM `course` WHERE deprecated = 0";
        $return['topiclist'] = $this->getResultArray($query);
        $return['nextEvents'] = $this->getAllEvents();
        return $return;
    }

    /*Jeder Kurs ist einem Topic (einer Schulung) zugeordnet. Jeder Kurs hat seine eigene ID*/
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
        $result = $db->query("SELECT * FROM `brand_location` WHERE brand_id = ".$this->userid);
        $query = "SELECT * FROM `apieventdata`";
        if($result->num_rows>0){
            $query .= " WHERE location_id IN (SELECT location_id FROM `brand_location` WHERE brand_id = ".$this->userid.")";
        }
        $query .= "
                    ORDER BY start_date
                    LIMIT 0,5";
        return $this->getResultArray($query);
    }




    //Anker1: neue Getter vom 21.1.16 (ungetestet)

    //tbl->trainer _ GETTRAINER
        /*Eine TrainerList ist die Liste aller registrieten Trainer*/ 
    /*private function getTrainerList(){
        $return = array();
        $sql = "SELECT * FROM `trainer` WHERE trainer_id = TRUE";
        $return['trainerlist'] = $this->getResultArray($query);
        return $return;
    }*/

    /*Aufruf eines Trainers anhand der id*/
    /*private function getTrainerById($id){
        $return = array();
        $query = "SELECT * FROM `trainer`
                WHERE
                    trainer_id =".$id;
        $return['trainer'] = $this->getResultArray($query);
        return $return;
    }*/

    /*Aufruf eines Trainers anhand des Namens*/
    /*private function getTrainerByName($name){
        $return = array();
        $query = "SELECT * FROM `trainer`
                WHERE
                    trainer_name =".$name;
        $return['trainer'] = $this->getResultArray($query);
        return $return;
    }*/

    /*Aufruf aller Trainer anhand einer Teilinfo. Zweck: Suchfunktion für Bruchstückhafte Eingaben*/
    /*private function getTrainerByIndicator($inidcator){
        $return = array();

        //lade Liste aller Trainer
        $all = getTrainerList();
        
        //suche in jedem Feld nach dem $indicator. Lege jeden Fund in $return
        for ($x = 0; $x < count($all['trainerlist']); $x++) {
            for ($i=0; $i < count($all['trainerlist'][$x]); $i++) { 
                if (preg_match($inidcator, $all['trainerlist'][$x][$i])) {
                    array_push($return, $all['trainerlist'][$x]);
                    $i = count($all['trainerlist'][$x]);
                }
            }
        } 
        return $return;
    }*/

    //tbl-participant _ GETPARTICIPANT
        /*Eine Participantlist ist die Liste aller registrieten Partizipanten (Teilnehmer)*/ 
    /*private function getParticipantList(){
        $return = array();
        $sql = "SELECT * FROM `participant` WHERE participant_id = TRUE";
        $return['participantlist'] = $this->getResultArray($sql);
        return $return;
    }*/

    /*Aufruf eines Participants anhand der id*/
    /*private function getParticipantById($id){
        $return = array();
        $query = "SELECT * FROM `participant`
                WHERE
                    trainer_id =".$id;
        $return['participant'] = $this->getResultArray($query);
        return $return;
    }*/

    /*Aufruf eines Participants anhand des Namens*/
    /*private function getParticipantByName($name){
        $return = array();
        $query = "SELECT * FROM `participant`
                WHERE
                    first_name =".$name" OR last_name =".$name;
        $return['participant'] = $this->getResultArray($query);
        return $return;
    }*/

    /*Aufruf aller Participants anhand einer Teilinfo. Zweck: Suchfunktion für Bruchstückhafte Eingaben*/
    /*private function getParticipantByIndicator($inidcator){
        $return = array();

        //lade Liste aller Participants
        $all = getParticipantList();
        
        //suche in jedem Feld nach dem $indicator. Lege jeden Fund in $return
        for ($x = 0; $x < count($all['participantlist']); $x++) {
            for ($i=0; $i < count($all['participantlist'][$x]); $i++) { 
                if (preg_match($inidcator, $all['participantlist'][$x][$i])) {
                    array_push($return, $all['participantlist'][$x]);
                    $i = count($all['participantlist'][$x]);
                }
            }
        } 
        return $return;
    }*/

    //tbl-participation _ GETPARTICIPATION  
    //Eine participationList gibt Auskunft, wer an welchem Event teilnimmt
    /*private function getParticipationList(){
        $return = array();
        $sql = "SELECT * FROM `participation` WHERE event_id = TRUE";//event_id = true evtl hinderlich
        $return['participationlist'] = $this->getResultArray($sql);
        return $return;
    }*/

    //Aufruf aller Participanten eines bestimmten Events
    /*private function getParticipantsByEvent($eventId)
    {
        $return = array();
        if (!$eventId) {
            $return['participantsonevent'] = 'Bitte Event-ID angeben.';
            return $return;
        }
        $sql = "SELECT * FROM `participation` WHERE event_id =".$eventId;
        $return['participantsonevent'] = $this->getResultArray($sql);
        return $return;
    }*/

    //Aufruf aller Events an denen ein bestimmer Participant registriert ist
    /*private function getEventsByParticipants($participantId)
    {
        $return = array();
        if (!$participantId) {
            $return['eventsonparticipant'] = 'Bitte Participant-ID angeben.'
            return $return;
        }
        $sql = "SELECT * FROM `participation` WHERE participant_id =".$participantId;
        $return['eventsonparticipant'] = $this->getResultArray($sql);
        return $return;
    }*/

    //tbl-brand _ GETBRAND
    //Eine Brandlist gibt Auskunft welche Firmen für Topics registriert wurden
    /*private function getBrandList()
    {
        $return = array();
        $sql = "SELECT * FROM `brand` WHERE brand_id = TRUE";
        $return['brandlist'] = $this->getResultArray($sql);
        return $return;
    }*/

    //Aufruf aller Informationen zu einem Firmennamen
    /*private function getBrandByName($brandname)
    {
        $return = array();
        $sql = "SELECT * FROM `brand` WHERE brand_name =".$brandname;
        $return['brand'] = $this->getResultArray($sql);
        return $return;
    }*/

    //tbl-event _ GETEVENT
    // Ein Event ist eine geplantes Ereignis, dass mit einem Trainer und n Participanten and einem Standort zu in einem definierten Zeitraum stattfindet
    /*private function getEventByCourse($courseId)
    {
        //wenn $course etwas anderes als eine Zahl enthält 
        if (preg_match(/\D/, $courseId)) {
            $return['courseonevent'] = 'Eine valide ID enthält nur Ziffern';
            return $return;
        }else {
            $sql = "SELECT * FROM `event` WHERE course_id =".$courseId;
            $return['courseonevent'] = $this->getResultArray($sql);
            return $return;            
        } 
    }*/

    //Aufruf aller Events zu denen ein Firmenname registriert ist
    /*private function getEventByBrand($brandId)
    {
        //wenn $brandId etwas anderes als eine Zahl enthält ist es eine Fehlerhafte Eingabe
        if (preg_match(/\D/, $brandId)) {
            $return['brandonevent'] = 'Eine valide ID enthält nur Ziffern';
            return $return;
        }else {
            $sql = "SELECT * FROM `event` WHERE brand_id =".$brandId;
            $return['brandonevent'] = $this->getResultArray($sql);
            return $return;             
        } 
    }*/

    //Aufruf aller Events die einer bestimmten Lokation zugeordnet sind
    /*private function getEventByLocation($locationId)
    {
        //wenn $locationId etwas anderes als eine Zahl enthält ist es eine Fehlerhafte Eingabe
        if (preg_match(/\D/, $locationId)) {
            $return['locationonevent'] = 'Eine valide ID enthält nur Ziffern';
            return $return;
        }else {
            $sql = "SELECT * FROM `event` WHERE location_id =".$locationId;
            $return['locationonevent'] = $this->getResultArray($sql);
            return $return;             
        } 
    }*/

    //alle Tabellen _ GET
    //Eine Allgemeine Funktion zur Rückgabe einer Tabelle
    /*private function getTblByName($name)
    {
        //Definition aller validen Tabellennamen
        $tables = array('course','trainer_course','trainer','status_trainer','trainer_event_assignment','registration_events',
            'registration','course_test','brand_topic','brand','event','topic_course','topic','brand_location','package','participation',
            'status_participation','feedback','status_event','status_billing','location','status_eventguarantee',
            'gender','participant','status_buch','status_sales_interests','apieventdata','organization','all_events_participant_participation',
            'all_events_web','contact_channel','status_sales','packageview','all_events','candidate_selection');

        //Prüfe ob übergebener String ein valider Tabellenname
        for ($i=0; $i < count($tables); $i++) { 
            if ($name===table($i)) {//evtl. 'preg_match($name,$table($i))' besser 
                $sql = "SELECT * FROM ".$name;
                $return['table'] = $this->getResultArray($sql);
                return $return; 
            }
        }

        //Falls kein valider Tabellenname gefunden wurde
        $return['table'] = 'Es ist keine Tabelle mit dieser Bezeichnung in de Datenbank';
        return $return;
    }*/



//'oneclick' Testfunktion für alle Getter seit 21.1.16 
/*public function testAnker1()
{
    $str = '';
    $str .=getTrainerList().'\n\n-----------\n';
    $str .=getTrainerById(1).'\n\n-----------\n';
    $str .=getTrainerByName('Amataju Kovifar').'\n\n-----------\n';
    $str .=getTrainerByIndicator('@wihuc').'\n\n-----------\n';
    $str .=getParticipantList().'\n\n-----------\n';
    $str .=getParticipantById(420).'\n\n-----------\n';
    $str .=getParticipantByName('Yewe').'\n\n-----------\n';
    $str .=getParticipantByIndicator('ex@roq').'\n\n-----------\n';
    $str .=getParticipationList().'\n\n-----------\n';
    $str .=getParticipantsByEvent(148).'\n\n-----------\n';
    $str .=getEventsByParticipants(427).'\n\n-----------\n';
    $str .=getBrandList().'\n\n-----------\n';
    $str .=getBrandByName('Orga 5').'\n\n-----------\n';
    $str .=getEventByCourse(9).'\n\n-----------\n';
    $str .=getEventByBrand(1).'\n\n-----------\n';
    $str .=getEventByLocation(13).'\n\n-----------\n';
    $str .=getTblByName('status_billing').'\n\n-----------\n';

    echo 'GetterTest:\n'.$str;
 
}*/




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
        $query = "SELECT * FROM `event`
                WHERE
                    start_date > NOW() AND
                    inhouse = 0
        ";
        return $this->getResultArray($query);;
    }

}