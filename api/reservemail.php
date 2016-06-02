<?php
// http://dev.bpmspace.org:4040/~cedric/EduMS/api/reservemail.php
require_once 'PHPMailer/PHPMailerAutoload.php';
 
$to = 'cedric.neuland@bpmspace.com'; //default

$mTeilnehmerZahl="? ";
if (isset($_POST['mTeilnehmerZahl'])) {
  $mTeilnehmerZahl = $_POST['mTeilnehmerZahl'];
}

$subject=$mTeilnehmerZahl;

// $contactpersonemail="echo@tu-berlin.de";
$contactpersonemail=false;
if (isset($_POST['contactpersonemail'])) {
  $contactpersonemail = $_POST['contactpersonemail'];
  $to = $_POST['contactpersonemail'][0];
}

$courses = false;
if (isset($_POST['courses'])) {
   $courses = $_POST['courses'];  
}

$brandMailInfo = false;
if (isset($_POST['brandid'])) {
  $brandMailInfo = $this -> getResultArray("SELECT * FROM `v_brand_and_partner_reservationmail` WHERE brand_id =".$_POST['brandid']);
}

$eventList= false;
if (isset($_POST['eventIds'])) {
  if ($_POST['eventIds']) {
    $eventList = $this -> vEventcourselocationReservationmail($_POST['eventIds']);
  }
}

$results_messages = array();
 
$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';
ini_set('default_charset', 'UTF-8');
 
class phpmailerAppException extends phpmailerException {}

try {

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
  $mail->addReplyTo("cedric.neuland@bpmspace.com", "Replay*Name");
  // $mail->addReplyTo("office@mitsm.de", "Name");
  $mail->setFrom($brandMailInfo[0]['brandmail'], $brandMailInfo[0]['brand_name']);
  $mail->addAddress($brandMailInfo[0]['partnermail'], $brandMailInfo[0]['partnername']);

  $mail->addAddress("cedric.neuland@bpmspace.com", "otherName");
  // $mail->addAddress("Robert.Kuhlig@mitsm.de", "otherName");
  // $mail->addCC("cedric.neuland@bpmspace.com");


  // $eventIdList = json_decode($_POST['eventIds']);
  // $eventidvals='';
  // foreach($eventIdList as $x => $x_value) {
  //     $eventidvals .=  $x . " : " . $x_value.' | ';
  // }

  //debug $body='type of $_POST - '.gettype($_POST).'|| (keys : values)s of $_POST - '.$postvals.' || '
  // $test=$this -> gettestarray();
  // $body=print_r($_POST,true).
  //   ' ||  $_POST[mTeilnehmerZahl]: '. $_POST['mTeilnehmerZahl'].
  //   ' ||  $_POST[contactpersonemail]: '. $_POST['contactpersonemail'].
  //   ' ||  $_POST[brand] (login): '. $_POST['brandid'].
  //  ' || v_eventcourselocationReservationmail($eventidvals): '.
  //  print_r($eventList ,true).'  ##  '.
  //  print_r($brandMailInfo,true);

  // $confirmationBody = file_get_contents('js/Bootstrap v3.3.6.js');

  $confirmationBody .= '<div style="color:red;">confirmationBody<br>Sie haben für '.$mTeilnehmerZahl.
  ' Personen bei '.$brandMailInfo[0]['brand_name'].' folgende Kurse reserviert:<br></div>';
  $brandBody = '<div style="color:green;">brandBody<br>'.$contactpersonemail.' hat ';
  $brandPartnerBody = '<div style="color:blue;">brandPartnerBody<br>'.$contactpersonemail.' hat '.
    'bei '.$brandMailInfo[0]['brand_name'];

  $price=0;

  foreach($eventList as $e) {
   $mail->Subject  .=  $e['course_name'].' '. $e['start_date'];

  $price += intval($e['coursePrice']);

   $confirmationBody .= 
   '<br>Kurs: '.$e['course_name'].', von '. $e['start_date'].' bis '.$e['finish_date'].', '.
   $e['start_time'].' - '.$e['finish_time'].'Uhr. <br>'.
   '<h3>Standort:</h3>'.'Der Kurs findet '.$e['internet_location_name'].' statt. <br>'.
   $e['location_description'];

   $brandBody .= $e['course_name'].' am '. $e['start_date'].'  & ';

   $brandPartnerBody .= $e['course_name'].' am '. $e['start_date'].'  & ';
  }

   $confirmationBody .='<h3>Preis:</h3>'.'Netto: '.$price.' | incl. Mwst.: '.
   $price*1.19.' <br>'.$e['event_status_id'].',  '.$e['eventguaranteestatus'].',  '.$e['eventinhouse'];

   $brandBody .= 'für '.$_POST['mTeilnehmerZahl'].'Personen ('.'Netto: '.$price.' | incl. Mwst.: '.
    $price*1.19.') reserviert.</div>';

   $brandPartnerBody .= 'für '.$_POST['mTeilnehmerZahl'].'Personen ('.'Netto: '.$price.' | incl. Mwst.: '.
    $price*1.19 .') reserviert.</div>';
    



  $body=$confirmationBody.'# '.$brandBody.'# '.$brandPartnerBody.' ~~~~~~~ '.print_r($_POST,true).
  ' ~~~~~~~ '.print_r($eventList,true).' ~~~~~~~ '.print_r($brandMailInfo,true).'. '.isset($_POST['contactpersonemail']).'*'.isset($_POST['contactpersone']);
  $mail->WordWrap = 78;
  $mail->msgHTML($body, dirname(__FILE__), true); //Create message bodies and embed images
   
  try {
    $mail->send();
    $results_messages[] = "Message has been sent using SMTP";
  }
  catch (phpmailerException $e) {
    throw new phpmailerAppException('Unable to send to: ' . $to. ': '.$e->getMessage());
  }



  // if (isset($brandMailInfo[0]['brandmail'])) {
  //   $to = $brandMailInfo[0]['brandmail'];
  //   $body=$brandBody.'# '.$brandPartnerBody;
  //   $mail->WordWrap = 78;
  //   $mail->msgHTML($body, dirname(__FILE__), true); //Create message bodies and embed images
     
  //   try {
  //     $mail->send();
  //     $results_messages[] = "Message has been sent using SMTP";
  //   }
  //   catch (phpmailerException $e) {
  //     throw new phpmailerAppException('Unable to send to: ' . $to. ': '.$e->getMessage());
  //   }
  // }


  // if (isset($brandMailInfo[0]['partnermail'])) {
  //   $to = $brandMailInfo[0]['partnermail'];
  //   $body=$brandPartnerBody;
  //   $mail->WordWrap = 78;
  //   $mail->msgHTML($body, dirname(__FILE__), true); //Create message bodies and embed images
     
  //   try {
  //     $mail->send();
  //     $results_messages[] = "Message has been sent using SMTP";
  //   }
  //   catch (phpmailerException $e) {
  //     throw new phpmailerAppException('Unable to send to: ' . $to. ': '.$e->getMessage());
  //   }
  // }
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








/*
<?php

error_reporting(E_STRICT | E_ALL);

date_default_timezone_set('Etc/UTC');

require '../PHPMailerAutoload.php';

$mail = new PHPMailer;

$body = file_get_contents('contents.html');

$mail->isSMTP();
$mail->Host = 'smtp.example.com';
$mail->SMTPAuth = true;
$mail->SMTPKeepAlive = true; // SMTP connection will not close after each email sent, reduces SMTP overhead
$mail->Port = 25;
$mail->Username = 'yourname@example.com';
$mail->Password = 'yourpassword';
$mail->setFrom('list@example.com', 'List manager');
$mail->addReplyTo('list@example.com', 'List manager');

$mail->Subject = "PHPMailer Simple database mailing list test";

//Same body for all messages, so set this before the sending loop
//If you generate a different body for each recipient (e.g. you're using a templating system),
//set it inside the loop
$mail->msgHTML($body);
//msgHTML also sets AltBody, but if you want a custom one, set it afterwards
$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!';

//Connect to the database and select the recipients from your mailing list that have not yet been sent to
//You'll need to alter this to match your database
$mysql = mysqli_connect('localhost', 'username', 'password');
mysqli_select_db($mysql, 'mydb');
$result = mysqli_query($mysql, 'SELECT full_name, email, photo FROM mailinglist WHERE sent = false');

foreach ($result as $row) { //This iterator syntax only works in PHP 5.4+
    $mail->addAddress($row['email'], $row['full_name']);
    if (!empty($row['photo'])) {
        $mail->addStringAttachment($row['photo'], 'YourPhoto.jpg'); //Assumes the image data is stored in the DB
    }

    if (!$mail->send()) {
        echo "Mailer Error (" . str_replace("@", "&#64;", $row["email"]) . ') ' . $mail->ErrorInfo . '<br />';
        break; //Abandon sending
    } else {
        echo "Message sent to :" . $row['full_name'] . ' (' . str_replace("@", "&#64;", $row['email']) . ')<br />';
        //Mark it as sent in the DB
        mysqli_query(
            $mysql,
            "UPDATE mailinglist SET sent = true WHERE email = '" .
            mysqli_real_escape_string($mysql, $row['email']) . "'"
        );
    }
    // Clear all addresses and attachments for next loop
    $mail->clearAddresses();
    $mail->clearAttachments();
}
*/