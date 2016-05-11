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

			case 'update_course':
				$res = $this->updateTopic(
					$params["ID"],
					$params["name"]
				);
				if ($res != 1) return ''; else return $res;
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

	private function updateTopic($id, $name) {
		$query = "UPDATE sqms_topic SET name = ? WHERE sqms_topic_id = ?;";
		$stmt = $this->db->prepare($query); // prepare statement
		$stmt->bind_param("si", $name, $id); // bind params
        $result = $stmt->execute(); // execute statement
		return (!is_null($result) ? 1 : null);
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
    min_participants AS 'MinPart',
    c.deprecated AS 'Depr',
    coursePrice AS 'Price'
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