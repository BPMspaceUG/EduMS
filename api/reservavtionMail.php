<?php

$mTeilnehmerZahl="? ";
if (isset($_POST['mTeilnehmerZahl'])) {
  $mTeilnehmerZahl = json_decode($_POST['mTeilnehmerZahl'], true);
}

$subject=$mTeilnehmerZahl;

// $contactpersonemail="echo@tu-berlin.de";
$contactpersonemail=false;
if (isset($_POST['contactpersonemail'])) {
  $contactpersonemail = json_decode($_POST['contactpersonemail'], true);
  $to = json_decode($_POST['contactpersonemail'], true);
}

$courses = false;
if (isset($_POST['courses'])) {
   $courses = json_decode($_POST['courses'], true);  
}

$brandMailInfo = false;
// error_log(print_r(json_decode($_POST['brandid'],true)));
// error_log($_POST['brandid']);
if (isset($_POST['brandid'])) {
  $brandMailInfo = $this -> getResultArray("SELECT * FROM `v_brand_and_partner_reservationmail` WHERE brand_id =".json_decode($_POST['brandid']),true);
  if (isset($brandMailInfo[0]['brandmail'])) {
    $partnermail = $brandMailInfo[0]['partnermail'];
    $brandMail = $brandMailInfo[0]['brandmail'];
  }
}

$eventList= false;
if (isset($_POST['eventIds'])) {
  if ($_POST['eventIds']) {
    $eveids = json_decode($_POST['eventIds'], true);
    // error_log(print_r($_POST['eventIds'],true));
    $eventList = $this -> vEventcourselocationReservationmail($eveids);

  }
}
// error_log(print_r($_POST,true));

$brandMailInfo = $this -> getResultArray("SELECT * FROM `v_brand_and_partner_reservationmail` WHERE brand_id =".$_POST['brandid']);

$confirmationBody ='';

  $confirmationBody .= '<div style="color:red;">confirmationBody<br>Sie haben für '.$mTeilnehmerZahl.
  ' Personen bei '.$brandMailInfo[0]['brand_name'].' folgende Kurse reserviert:<br></div>';
  $brandBody = '<div style="color:green;">brandBody<br>'.$contactpersonemail.' hat ';
  $brandPartnerBody = '<div style="color:blue;">brandPartnerBody<br>'.$contactpersonemail.' hat '.
    'bei '.$brandMailInfo[0]['brand_name'];

  $price=0;

  foreach($eventList as $e) {
   $subject  .=  ', '.$e['course_name'].' '. $e['start_date'];

   $price += intval($e['coursePrice']);

   $confirmationBody .= 
   '<br>Kurs: '.$e['course_name'].', von '. $e['start_date'].' bis '.$e['finish_date'].', '.
   $e['start_time'].' - '.$e['finish_time'].'Uhr. <br>'.
   '<h3>Standort:</h3>'.'Der Kurs findet '.$e['internet_location_name'].' statt. <br>'.
   $e['location_description'];

   $brandBody .= $e['course_name'].' am '. $e['start_date'].'  & ';

   $brandPartnerBody .= $e['course_name'].' am '. $e['start_date'].'  & ';
  }

  $price=$price*intval($mTeilnehmerZahl);

   $confirmationBody .='<h3>Preis:</h3>'.'Netto: '.$price.' | incl. Mwst.: '.
   $price*1.19.' <br>'.$e['event_status_id'].',  '.$e['eventguaranteestatus'].',  '.$e['eventinhouse'];

   $brandBody .= 'für '.$_POST['mTeilnehmerZahl'].'Personen ('.'Netto: '.$price.' | incl. Mwst.: '.
    $price*1.19.') reserviert.</div>';

   $brandPartnerBody .= 'für '.$_POST['mTeilnehmerZahl'].'Personen ('.'Netto: '.$price.' | incl. Mwst.: '.
    $price*1.19 .') reserviert.</div>';
    



  $body=$confirmationBody.
  ' ~~~~~~~ '.print_r($eventList,true).
  ' ~~~~~~~ '.print_r($brandMailInfo[0],true).'. ';

//cleanflag test php mail-function: mail(to, subject, message, headers, parameters) //headers und parameters sind optional
	//Info setzen
	$to = $contactpersonemail.', '.$partnermail.', '.$brandMail;
	
	// $subject = "Betreff";
	//Reservierungsanfrage brand, course
	
	$message = $body;

	$header = "From:".$brandMail." \r\n";

	$result = mail($to, $subject, $message, $header); //Abschlussprüfung
	if($result = true)
	{
		error_log("To: ".$to.", wurde versand. ", 0);
				
		// error_log("\n\l\rSubject: ".$subject, 0);
		
		// error_log("\n\l\rMessage: ".$message, 0);
		
		// error_log("\n\l\rHeader: ".$header, 0);

	}
	else
	{
		error_log("Mail an ".$to." wurde nicht gesendet.", 0);
	}

?>

