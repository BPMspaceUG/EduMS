<?php
// http://dev.bpmspace.org:4040/~cedric/EduMS/api/reservemail.php
require_once 'PHPMailer/PHPMailerAutoload.php';
 
 $subject="subjecDefault";
 $contactpersonemail="echo@tu-berlin.de";
 $courses="";
 $mTeilnehmerZahl="";
$results_messages = array();
 
$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';
ini_set('default_charset', 'UTF-8');
 
class phpmailerAppException extends phpmailerException {}
$rinfo= 'Typ: '.gettype($_POST).count($_POST).'--- ';
foreach($_POST as $x => $x_value) {
    $rinfo .= "Key: " . $x . ", Value:" . $x_value.' | ';
}
if (isset($_POST['contactpersonemail'])) {
   $contactpersonemail = $_POST['contactpersonemail'];

   $courses = $_POST['courses'];
    // $validEvents = v_eventcourselocationReservationmail($courses);
	 // $courses = gettype($_POST['courses']);
	//  foreach($_POST['courses'] as $x => $x_value) {
	//     $courses .= "Key=" . $x . ", Value=" . $x_value.' ++**~~ ';
	// }
 	$mTeilnehmerZahl = $_POST['mTeilnehmerZahl'];
}


try {
$to = 'cnu301@mitsm.de';
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
$mail->setFrom("mustername.musernachname@gmx.de", "name");
$mail->addAddress("cnu301@mitsm.de", "aName");
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



//debug $body='type of $_POST - '.gettype($_POST).'|| (keys : values)s of $_POST - '.$postvals.' || '

$body='$eventidvals '.$eventidvals.
  ' ||  $_POST[mTeilnehmerZahl]: '. $_POST['mTeilnehmerZahl'].
  ' ||  $_POST[contactpersonemail]: '. $_POST['contactpersonemail'].
  ' ||  $_POST[brand] (login): '. $_POST['brand'];
//  ' || v_eventcourselocationReservationmail($eventidvals): '.v_eventcourselocationReservationmail($eventidvals);






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
 
if (count($results_messages) > 0) {
  echo "<h2>Run results</h2>\n";
  echo "<ul>\n";
foreach ($results_messages as $result) {
  echo "<li>$result</li>\n";
}
echo "</ul>\n";
}
