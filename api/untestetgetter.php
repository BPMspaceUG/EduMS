<?php
  //Anker1: neue Getter vom 21.1.16 (ungetestet)
class DBHandler  
{
    private $db;

    private function getResultArray($query){
        global $db;
        $results_array = array();
        $result = $db->query($query);
        while ($row = $result->fetch_assoc()) {
            $results_array[] = $row;
        }
        return $results_array;
    }
    public function __construct($db){
        $this->db = $db;
    }
    //tbl->trainer _ GETTRAINER
        /*Eine TrainerList ist die Liste aller registrieten Trainer*/ 
    private function getTrainerList(){
        $return = array();
        $sql = "SELECT * FROM `trainer` WHERE trainer_id = TRUE";
        $return['trainerlist'] = $this->getResultArray($query);
        return $return;
    }

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


}//ende von class
?>