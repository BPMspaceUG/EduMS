<?php
function getResultArray($result) {
	$results_array = array();
  if (!$result) return false;
	while ($row = $result->fetch_assoc()) {
		$results_array[] = $row;
	}
	return $results_array;
}

class RequestHandler 
{
    private $db;

    public function __construct() {
      // Get global variables here
      global $DB_host;
      global $DB_user;
      global $DB_pass;
      global $DB_name;
      
      $db = new mysqli($DB_host, $DB_user, $DB_pass, $DB_name);
      /* check connection */
      if($db->connect_errno){
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
      }
      $db->query("SET NAMES utf8");
      $this->db = $db;
    }
    public function handle($command, $params) {
        switch($command) {

			case 'courses':
				$return = $this->getCourseList();
				return json_encode($return);
				break;
				
			case 'create_course':
				return $this->addTopic($params["name"]);
				break;
				
			case 'delete_course':
				return $this->delTopic($params["sqms_topic_id"]);
				break;

			case 'update_course_name':
				$res = $this->updateCourseName(
					$params["ID"],
					$params["Name"]
				);
				if ($res != 1) return ''; else return $res;
				break;
        
			case 'update_course':
        $id = $params["ID"];
				$res = $this->updateCourseName($id, $params["Name"]);
				$res += $this->updateCourseHeadline($id, $params["courseHeadline"]);
				$res += $this->updateCourseNbrOfDays($id, $params["number_of_days"]);
				$res += $this->updateCourseNbrOfTrainers($id, $params["number_of_trainers"]);
				$res += $this->updateCourseMinParticipants($id, $params["MinPart"]);
				$res += $this->updateCourseDeprecated($id, $params["Depr"]);
				$res += $this->updateCourseDescription($id, $params["courseDescription"]);
				$res += $this->updateCourseImage($id, $params["courseImage"]);
				$res += $this->updateCourseDescriptionMail($id, $params["courseDescriptionMail"]);
				$res += $this->updateCoursePrice($id, $params["Price"]);
				$res += $this->updateCourseDescriptionCertificate($id, $params["courseDescriptionCertificate"]);
				if ($res != 11) return ''; else return $res;
				break;

      default:
				return ""; // empty string
				exit;
				break;
        }
    }

    ###################################################################################################################
    ####################### Definition der Handles
    ###################################################################################################################

	private function updateCourseName($id, $name) {
    $query = "UPDATE course SET course_name = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("si", $name, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseHeadline($id, $text) {
    $query = "UPDATE course SET courseHeadline = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("si", $text, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseNbrOfDays($id, $nbr) {
    $query = "UPDATE course SET number_of_days = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("ii", $nbr, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseNbrOfTrainers($id, $nbr) {
    $query = "UPDATE course SET number_of_trainers = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("ii", $nbr, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseMinParticipants($id, $nbr) {
    $query = "UPDATE course SET min_participants = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("ii", $nbr, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseDeprecated($id, $nbr) {
    $query = "UPDATE course SET deprecated = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("ii", $nbr, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseDescription($id, $text) {
    $query = "UPDATE course SET courseDescription = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("si", $text, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseImage($id, $text) {
    $query = "UPDATE course SET courseImage = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("si", $text, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseDescriptionMail($id, $text) {
    $query = "UPDATE course SET courseDescriptionMail = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("si", $text, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCoursePrice($id, $nbr) {
    $query = "UPDATE course SET coursePrice = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("ii", $nbr, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
	private function updateCourseDescriptionCertificate($id, $text) {
    $query = "UPDATE course SET courseDescriptionCertificate = ? WHERE course_id = ?;";
    $stmt = $this->db->prepare($query); // prepare statement
    $stmt->bind_param("si", $text, $id); // bind params
    $result = $stmt->execute(); // execute statement
    return (!is_null($result) ? 1 : 0);
	}
  
	private function addTopic($name) {
		$query = "INSERT INTO sqms_topic (name) VALUES (?);";
		$stmt = $this->db->prepare($query); // prepare statement
		$stmt->bind_param("s", $name); // bind params
        $result = $stmt->execute(); // execute statement
		return (!is_null($result) ? 1 : null);
	}
	private function delTopic($id) {
		// Deleten darf der user dann sowieso nicht
		// TODO: Prepare statement
		$query = "UPDATE sqms_topic SET name = 'XXXXXXX' WHERE sqms_topic_id = ".$id.";";
        $result = $this->db->query($query);
		//if (!$result) $this->db->error;
		return (!is_null($result) ? 1 : null);
	}
	private function getCourseList() {
        $query = "SELECT 
    c.course_id AS 'ID',    
    course_name AS 'Name',
    aa.topicName AS 'Topic',
    c.courseHeadline,
    c.number_of_days,
    c.number_of_trainers,
    min_participants AS 'MinPart',
    c.deprecated AS 'Depr',
    c.courseDescription,
    c.courseImage,
    c.courseDescriptionMail,
    coursePrice AS 'Price',
    c.courseDescriptionCertificate,
    max_participants
FROM
    (SELECT 
        course_id, topicName
    FROM
        topic_course AS a
    INNER JOIN topic AS b ON a.topic_id = b.topic_id) AS aa
        INNER JOIN
    course AS c ON aa.course_id = c.course_id;";
		$res = $this->db->query($query);
        $return['courselist'] = getResultArray($res);
        return $return;
    }
}