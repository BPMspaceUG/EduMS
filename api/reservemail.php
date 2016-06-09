<?php


// http://dev.bpmspace.org:4040/~cedric/EduMS/api/reservemail.php
require_once 'PHPMailer/PHPMailerAutoload.php';
 
 $subject="subjecDefault";
 $contactpersonemail="echo@tu-berlin.de";
 $courses="";
 $mTeilnehmerZahl="";
 $brandMail=""; //Defaultemail
 $results_messages = array();
 
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
    // error_log(print_r($eveids,true));
    $eventList = $this -> vEventcourselocationReservationmail($eveids);

  }
}











$mail = new PHPMailer(true);
$mailBrand = new PHPMailer(true);
$mailPartner = new PHPMailer(true);

$mail->CharSet = 'utf-8';
$mailBrand->CharSet = 'utf-8';
$mailPartner->CharSet = 'utf-8';
ini_set('default_charset', 'UTF-8');
 
class phpmailerAppException extends phpmailerException {}


$brandMailInfo = $this -> getResultArray("SELECT * FROM `v_brand_and_partner_reservationmail` WHERE brand_id =".$_POST['brandid']);
























try {
// $to = 'cedric.neuland@bpmspace.com';
if(!PHPMailer::validateAddress($to)) {
  throw new phpmailerAppException("Email address " . $to . " is invalid -- aborting!");
} 
$mail->isSMTP();
$mail->SMTPDebug  = 2;
 //IMAP-Server imap.gmx.net
$mail->Host       = "mail.gmx.net";
$mail->Port       = "587";
$mail->SMTPSecure = "tls";
$mail->SMTPAuth   = true;
$mail->Username   = "mustername.musernachname@gmx.de";
$mail->Password   = "Passworrt";
$mail->addReplyTo("echo@tu-berlin.de", "Name");
// $mail->addReplyTo("office@mitsm.de", "Name");
//change from email -> no email
$mail->setFrom("mustername.musernachname@gmx.de", $brandMailInfo[0]['brand_name']);
$mail->addAddress($contactpersonemail, "aName");
// $mail->addAddress("Robert.Kuhlig@mitsm.de", "otherName");
// $mail->addCC("cnu301@mitsm.de");
$mail->Subject  = "res: ".$subject;
$postvals='';
foreach($_POST as $x => $x_value) {
    $postvals .=  $x . " : " . $x_value.' | ';
}
$eventIdList = json_decode($_POST['eventIds']);
$eventidvals='';
foreach($eventIdList as $x => $x_value) {
    $eventidvals .=  $x . " : " . $x_value.' | ';
}
// $eventList = $this -> vEventcourselocationReservationmail($_POST['eventIds']);


$confirmationBody ='';
  $confirmationBody .= '<div style="color:red;">confirmationBody<br>Sie haben für '.$mTeilnehmerZahl.
  ' Personen bei '.$brandMailInfo[0]['brand_name'].' folgende Kurse reserviert:<br></div>';
  $brandBody = '<div style="color:green;">brandBody<br>'.$contactpersonemail.' hat ';
  $brandPartnerBody = '<div style="color:blue;">brandPartnerBody<br>'.$contactpersonemail.' hat '.
    'bei '.$brandMailInfo[0]['brand_name'];

  $price=0;

  foreach($eventList as $e) {
   $mail->Subject  .=  ', '.$e['course_name'].' '. $e['start_date'];

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


$mail->WordWrap = 78;
$mail->msgHTML($body, dirname(__FILE__), true); //Create message bodies and embed images
 
try {
  $mail->send();
  $results_messages[] = "Message has been sent using SMTP";

}
catch (phpmailerException $e) {
  throw new phpmailerAppException('Unable to send to: ' . $to. ': '.$e->getMessage());
}
}
catch (phpmailerAppException $e) {
  $results_messages[] = $e->errorMessage();
}



























try {
$to = $brandMail;
if(!PHPMailer::validateAddress($to)) {
  throw new phpmailerAppException("Email address " . $to . " is invalid -- aborting!");
} 
$mailBrand->isSMTP();
$mailBrand->SMTPDebug  = 2;
 //IMAP-Server imap.gmx.net
$mailBrand->Host       = "mail.gmx.net";
$mailBrand->Port       = "587";
$mailBrand->SMTPSecure = "tls";
$mailBrand->SMTPAuth   = true;
$mailBrand->Username   = "mustername.musernachname@gmx.de";
$mailBrand->Password   = "Passworrt";
$mailBrand->addReplyTo("echo@tu-berlin.de", "Name");
// $mailBrand->addReplyTo("office@mitsm.de", "Name");
//change from email -> no email
$mailBrand->setFrom("mustername.musernachname@gmx.de", $brandMailInfo[0]['brand_name']);
$mailBrand->addAddress($brandMail, "aName");
// $mailBrand->addAddress("Robert.Kuhlig@mitsm.de", "otherName");
// $mailBrand->addCC("cnu301@mitsm.de");
$mailBrand->Subject  = "BrandBetreff";
$postvals='';
foreach($_POST as $x => $x_value) {
    $postvals .=  $x . " : " . $x_value.' | ';
}
$eventIdList = json_decode($_POST['eventIds']);
$eventidvals='';
foreach($eventIdList as $x => $x_value) {
    $eventidvals .=  $x . " : " . $x_value.' | ';
}
// $eventList = $this -> vEventcourselocationReservationmail($_POST['eventIds']);


$confirmationBody ='';
  $brandBody = '<div style="color:green;">brandBody<br>'.$contactpersonemail.' hat ';

  $price=0;

  foreach($eventList as $e) {
   $mailBrand->Subject  .=  ', '.$e['course_name'].' '. $e['start_date'];

   $price += intval($e['coursePrice']);

   $brandBody .= $e['course_name'].' am '. $e['start_date'].'  & ';
  }
  $price=$price*intval($mTeilnehmerZahl);

   $brandBody .= 'für '.$_POST['mTeilnehmerZahl'].'Personen ('.'Netto: '.$price.' | incl. Mwst.: '.
    $price*1.19.') reserviert.</div>';
    



  $body='partnermail: '.$partnermail.'\n<br>'.$brandBody.
  ' ~~~~~~~ '.print_r($eventList,true).
  ' ~~~~~~~ '.print_r($brandMailInfo[0],true).'. ';


$mailBrand->WordWrap = 78;
$mailBrand->msgHTML($body, dirname(__FILE__), true); //Create message bodies and embed images
 
try {
  $mailBrand->send();
  $results_messages[] = "Message has been sent using SMTP";

}
catch (phpmailerException $e) {
  throw new phpmailerAppException('Unable to send to: ' . $to. ': '.$e->getMessage());
}
}
catch (phpmailerAppException $e) {
  $results_messages[] = $e->errorMessage();
}




















try {

$to= $partnermail;

if(!PHPMailer::validateAddress($to)) {
  throw new phpmailerAppException("Email address " . $to . " is invalid -- aborting!");
} 
$mailPartner->isSMTP();
$mailPartner->SMTPDebug  = 2;
 //IMAP-Server imap.gmx.net
$mailPartner->Host       = "mail.gmx.net";
$mailPartner->Port       = "587";
$mailPartner->SMTPSecure = "tls";
$mailPartner->SMTPAuth   = true;
$mailPartner->Username   = "mustername.musernachname@gmx.de";
$mailPartner->Password   = "Passworrt";
$mailPartner->addReplyTo("echo@tu-berlin.de", "Name");
$mailPartner->setFrom("mustername.musernachname@gmx.de", $brandMailInfo[0]['brand_name']);
$mailPartner->Subject  = "PartnerBetreff";
$mailPartner->addAddress($partnermail, "Partnername");
$postvals='';
foreach($_POST as $x => $x_value) {
    $postvals .=  $x . " : " . $x_value.' | ';
}
$eventIdList = json_decode($_POST['eventIds']);
$eventidvals='';
foreach($eventIdList as $x => $x_value) {
    $eventidvals .=  $x . " : " . $x_value.' | ';
}


  $brandPartnerBody = '<div style="color:blue;">brandPartnerBody<br>'.$contactpersonemail.' hat '.
    'bei '.$brandMailInfo[0]['brand_name'];

  $price=0;

  foreach($eventList as $e) {
   $mail->Subject  .=  ', '.$e['course_name'].' '. $e['start_date'];

   $price += intval($e['coursePrice']);

   $brandPartnerBody .= $e['course_name'].' am '. $e['start_date'].'  & ';
  }
  $price=$price*intval($mTeilnehmerZahl);


   $brandPartnerBody .= 'für '.$_POST['mTeilnehmerZahl'].'Personen ('.'Netto: '.$price.' | incl. Mwst.: '.
    $price*1.19 .') reserviert.</div>';
    



  $body=$brandPartnerBody;



$mailPartner->WordWrap = 78;
$mailPartner->msgHTML($body, dirname(__FILE__), true); //Create message bodies and embed images
 
try {
  $mailPartner->send();
  $results_messages[] = "Message has been sent using SMTP";

}
catch (phpmailerException $e) {
  throw new phpmailerAppException('Unable to send to: ' . $to. ': '.$e->getMessage());
}
}
catch (phpmailerAppException $e) {
  $results_messages[] = $e->errorMessage();
}








if (count($results_messages) > 0) {
  echo "<h2>Run results</h2>\n";
  echo "<ul>\n";
foreach ($results_messages as $result) {
  echo "<li>$result</li>\n";
}
echo "</ul>\n";
}
